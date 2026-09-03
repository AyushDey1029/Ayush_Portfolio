import { NextResponse } from 'next/server';
import { getPortfolioData } from '@/lib/excelParser';

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const portfolio = await getPortfolioData();
    const ragQueries = portfolio.RAGQueries || [];
    const projects = portfolio.Projects || [];
    const skills = portfolio.Skills || [];
    const education = portfolio.Education || [];
    const training = portfolio.Training || [];
    const certifications = portfolio.Certifications || [];
    const about = portfolio.About || [];

    // Construct structured knowledge base context from Excel
    const contextSections = [];

    // 1. Curated RAG Q&A
    if (ragQueries.length > 0) {
      const qnaText = ragQueries
        .map(q => `Q: ${q.Question}\nA: ${q.Answer}`)
        .join('\n\n');
      contextSections.push(`### Curated Q&A Knowledge Base:\n${qnaText}`);
    }

    // 2. Personal & System Info
    if (about.length > 0) {
      const aboutText = about
        .map(a => `${a.Category} [${a.Key}]: ${a.Value}`)
        .join('\n');
      contextSections.push(`### Personal Background & Contacts:\n${aboutText}`);
    }

    // 3. Skills Summary
    if (skills.length > 0) {
      const skillsText = skills
        .map(s => `${s.Category}: ${s.Items || (s.ItemsList || []).join(', ')}`)
        .join('\n');
      contextSections.push(`### Technical Skills:\n${skillsText}`);
    }

    // 4. Projects
    if (projects.length > 0) {
      const projText = projects.map(p => {
        const desc = p.ParsedDescription?.description?.join('. ') || '';
        const learnings = p.ParsedDescription?.learning?.join('. ') || '';
        const stack = Array.isArray(p.Stack) ? p.Stack.join(', ') : p.Stack || '';
        return `Project: ${p.Title} (${p.Subtitle})\nDuration: ${p.Duration}\nTech Stack: ${stack}\nDetails: ${desc}\nKey Outcomes: ${learnings}\nGitHub: ${p.GithubLink || 'N/A'}`;
      }).join('\n\n');
      contextSections.push(`### Projects Portfolio:\n${projText}`);
    }

    // 5. Training & Certifications
    if (training.length > 0) {
      const trainText = training.map(t => `${t.Title} (${t.Subtitle}): ${t.ParsedDescription?.description?.join('. ') || ''}`).join('\n');
      contextSections.push(`### Training & Bootcamps:\n${trainText}`);
    }

    if (education.length > 0) {
      const eduText = education.map(e => `${e.Degree} from ${e.Institution} (${e.Duration}), CGPA: ${e.GPA}, Focus: ${Array.isArray(e.FocusAreas) ? e.FocusAreas.join(', ') : e.FocusAreas}`).join('\n');
      contextSections.push(`### Education:\n${eduText}`);
    }

    if (certifications.length > 0) {
      const certText = certifications.map(c => `${c.Title} by ${c.Subtitle} (${c.Duration})`).join(', ');
      contextSections.push(`### Certifications:\n${certText}`);
    }

    const fullContext = contextSections.join('\n\n');

    // Rule-based / semantic fallback search in RAG queries
    const queryLower = message.toLowerCase();
    let directMatch = ragQueries.find(q => {
      const qLower = (q.Question || '').toLowerCase();
      const labelLower = (q.Label || '').toLowerCase();
      return queryLower.includes(labelLower) || queryLower.includes(qLower) || qLower.includes(queryLower);
    });

    // Check project match fallback
    const matchedProject = projects.find(p => queryLower.includes((p.Title || '').toLowerCase()));

    // Try Gemini API if API key is provided
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const modelsToTry = [
        'gemini-3.5-flash-lite',
        'gemini-3.5-flash',
        'gemini-3.6-flash',
        'gemini-flash-latest',
        'gemini-pro-latest'
      ];

      for (const modelName of modelsToTry) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 9000);

          const prompt = `You are the intelligent, professional AI assistant for Ayush Dey's portfolio website.
Your role is to answer questions about Ayush Dey accurately, enthusiastically, and concisely based strictly on his verified resume data below.

Knowledge Base:
${fullContext}

User Query: ${message}

Instructions:
- Keep the response friendly, crisp, and informative (2-4 concise paragraphs or bullet points).
- If the user asks about contact details, provide his email (deyayush1029@gmail.com) and GitHub/LinkedIn.
- Always highlight his engineering strengths in Full-Stack development, AI/ML, and PyTorch.`;

          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            }),
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              return NextResponse.json({ reply: text, source: 'gemini' });
            }
          }
        } catch (err) {
          console.warn(`Attempt with ${modelName} failed:`, err.message);
        }
      }
    }

    // Robust Fallback: Synthesize answer from Excel data directly if LLM is unavailable or rate-limited
    if (directMatch) {
      return NextResponse.json({
        reply: directMatch.Answer,
        source: 'excel-rag'
      });
    }

    if (matchedProject) {
      const p = matchedProject;
      const desc = p.ParsedDescription?.description?.join(' ') || p.Description || '';
      const stack = Array.isArray(p.Stack) ? p.Stack.join(', ') : p.Stack;
      return NextResponse.json({
        reply: `**${p.Title}** (${p.Subtitle})\n\n${desc}\n\n**Tech Stack:** ${stack}\n${p.GithubLink ? `\n[View on GitHub](${p.GithubLink})` : ''}`,
        source: 'excel-rag'
      });
    }

    if (queryLower.includes('skill') || queryLower.includes('technology') || queryLower.includes('languages')) {
      const skillsSummary = skills.map(s => `• **${s.Category}:** ${s.Items || (s.ItemsList || []).join(', ')}`).join('\n');
      return NextResponse.json({
        reply: `Here is a summary of Ayush's core technical expertise:\n\n${skillsSummary}`,
        source: 'excel-rag'
      });
    }

    if (queryLower.includes('education') || queryLower.includes('college') || queryLower.includes('degree') || queryLower.includes('gpa')) {
      const edu = education[0];
      return NextResponse.json({
        reply: `Ayush is pursuing **${edu?.Degree || 'B.Tech'} in ${edu?.Major || 'Computer Science and Engineering'}** at **${edu?.Institution || 'Lovely Professional University'}** with a **CGPA of ${edu?.GPA || '8.4'}** (${edu?.Duration || 'Since Aug 2024'}).`,
        source: 'excel-rag'
      });
    }

    if (queryLower.includes('contact') || queryLower.includes('email') || queryLower.includes('hire') || queryLower.includes('reach')) {
      return NextResponse.json({
        reply: `You can reach Ayush Dey directly via:\n\n• **Email:** deyayush1029@gmail.com\n• **LinkedIn:** [linkedin.com/in/ayush--dey](https://linkedin.com/in/ayush--dey)\n• **GitHub:** [github.com/AyushDey1029](https://github.com/AyushDey1029)`,
        source: 'excel-rag'
      });
    }

    // Default friendly assistant response from Excel About data
    const intro = about.find(a => a.Category === 'Narrative' && a.Key === 'intro_1')?.Value || '';
    return NextResponse.json({
      reply: `Ayush Dey is a Full-Stack Developer and AI Enthusiast specializing in React, Node.js, Express, PyTorch, and LLM integrations. ${intro}\n\nFeel free to ask about his projects (FundConnectAI, Vernacular_FD_Advisor, IoT AutoEncoder), technical skills, or education!`,
      source: 'excel-rag'
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
