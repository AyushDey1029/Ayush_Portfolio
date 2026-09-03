# Ayush Dey - Personal Portfolio & AI Assistant

A modern, highly attractive, scalable, and data-driven portfolio website for **Ayush Dey**, featuring an interactive RAG (Retrieval-Augmented Generation) assistant powered by **Google Gemini** and an Excel-backed knowledge base.

---

## 🚀 Key Features

- **Single Source of Truth Data Architecture**: All portfolio content (About, Skills, Education, Experience, Projects, Training, Certifications, and AI Q&A) is managed in `portfolio_data.xlsx`. Updating the spreadsheet automatically updates the website without touching code.
- **RAG AI Chatbot**: Powered by Google Gemini with dynamic context retrieval grounded in resume data and curated Q&A pairs.
- **Vanilla CSS Design System**: Custom glassmorphism, responsive layouts, glowing accents, and micro-animations with zero Tailwind CSS bloat.
- **Modular Components**:
  - `Hero`: Dynamic introduction, academic highlights, and social links.
  - `Skills`: Categorized technology tags (Programming, AI/ML, Full-Stack, Databases, Tools).
  - `Projects`: Detailed cards showcasing FundConnectAI, Vernacular_FD_Advisor, and IoT Sensor AutoEncoder with stack tags, outcomes, and GitHub links.
  - `Training`: AI-Driven MERN Stack Bootcamp.
  - `Education`: Lovely Professional University (B.Tech CSE - 8.4 CGPA).
  - `Experience`: Flexible and scalable experience timeline with graceful empty state handling.
  - `Certifications`: TechVeda React.js, Python, and Linux certifications.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router, Server & Client Components)
- **Styling**: Vanilla CSS with custom design tokens
- **Data Parser**: `xlsx` (SheetJS) with custom normalization rules
- **AI & RAG**: Google Gemini API (`@google/generative-ai`)
- **Icons**: Lucide React & custom SVG icons

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
MIT © Ayush Dey
