'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, CornerDownLeft } from 'lucide-react';

export default function Chatbot({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Ayush's AI Assistant. I can answer questions about his projects, technical stack, bootcamp training, and background directly from his portfolio data. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'Tell me about your projects',
    'What are your core skills?',
    'Tell me about FundConnectAI',
    'How can I contact Ayush?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = { role: 'user', content: query.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query.trim() }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply, source: data.source },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "Sorry, I couldn't process that request right now. Please try again or reach out to Ayush directly!",
          },
        ]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'An error occurred while connecting to the assistant. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-toggle-btn"
        aria-label="Open AI Assistant"
      >
        <Sparkles size={22} className="sparkle-icon" />
        <span className="chat-btn-text">Ask AI Assistant</span>
        <span className="online-indicator" />
      </button>

      {/* Floating Chat Drawer / Window */}
      {isOpen && (
        <div className="chat-window animate-fade-in">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="bot-avatar">
                <Bot size={20} color="#fff" />
              </div>
              <div>
                <h3 className="chat-title">Ayush's Portfolio AI</h3>
                <p className="chat-subtitle">Powered by Gemini & Excel RAG</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="chat-close-btn"
              aria-label="Close Chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message-row ${msg.role === 'user' ? 'user-row' : 'bot-row'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="message-avatar bot-bubble-avatar">
                    <Bot size={16} />
                  </div>
                )}
                <div
                  className={`message-bubble ${
                    msg.role === 'user' ? 'user-bubble' : 'bot-bubble'
                  }`}
                >
                  <div style={{ whiteSpace: 'pre-line' }}>{msg.content}</div>
                </div>
                {msg.role === 'user' && (
                  <div className="message-avatar user-bubble-avatar">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="message-row bot-row">
                <div className="message-avatar bot-bubble-avatar">
                  <Bot size={16} />
                </div>
                <div className="message-bubble bot-bubble typing-bubble">
                  <div className="dot-pulse">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length < 3 && (
            <div className="quick-prompts-container">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="quick-prompt-pill"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="chat-input-form"
          >
            <input
              type="text"
              placeholder="Ask anything about Ayush..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="chat-send-btn"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        .chat-toggle-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, #1d4ed8, #7c3aed);
          color: #fff;
          border: none;
          padding: 0.85rem 1.4rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(29, 78, 216, 0.4), 0 0 15px rgba(124, 58, 237, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .chat-toggle-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 30px rgba(29, 78, 216, 0.6), 0 0 20px rgba(124, 58, 237, 0.5);
        }
        .sparkle-icon {
          animation: spin-pulse 3s infinite linear;
        }
        @keyframes spin-pulse {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.15); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .online-indicator {
          width: 8px;
          height: 8px;
          background: #34d399;
          border-radius: 50%;
          box-shadow: 0 0 8px #34d399;
        }
        .chat-window {
          position: fixed;
          bottom: 5.5rem;
          right: 2rem;
          width: 400px;
          max-width: calc(100vw - 4rem);
          height: 560px;
          max-height: calc(100vh - 8rem);
          background: rgba(18, 24, 34, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(37, 99, 235, 0.2);
          overflow: hidden;
        }
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          background: rgba(22, 27, 34, 0.8);
          border-bottom: 1px solid var(--border-color);
        }
        .chat-header-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .bot-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-title {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
        }
        .chat-subtitle {
          font-size: 0.75rem;
          color: #34d399;
        }
        .chat-close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s;
        }
        .chat-close-btn:hover {
          color: #fff;
        }
        .chat-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .message-row {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }
        .user-row {
          justify-content: flex-end;
        }
        .bot-row {
          justify-content: flex-start;
        }
        .message-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bot-bubble-avatar {
          background: rgba(88, 166, 255, 0.15);
          color: var(--accent-color);
        }
        .user-bubble-avatar {
          background: rgba(124, 58, 237, 0.2);
          color: #a78bfa;
        }
        .message-bubble {
          max-width: 80%;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .bot-bubble {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          border-top-left-radius: 4px;
        }
        .user-bubble {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #fff;
          border-top-right-radius: 4px;
        }
        .quick-prompts-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
        }
        .quick-prompt-pill {
          background: rgba(88, 166, 255, 0.1);
          border: 1px solid rgba(88, 166, 255, 0.2);
          color: var(--accent-color);
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .quick-prompt-pill:hover {
          background: rgba(88, 166, 255, 0.2);
          border-color: var(--accent-color);
          color: #fff;
        }
        .chat-input-form {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(22, 27, 34, 0.9);
          border-top: 1px solid var(--border-color);
        }
        .chat-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          padding: 0.65rem 1rem;
          border-radius: 9999px;
          color: #fff;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .chat-input:focus {
          border-color: var(--accent-color);
        }
        .chat-send-btn {
          background: var(--accent-color);
          color: #fff;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
        }
        .chat-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .chat-send-btn:not(:disabled):hover {
          transform: scale(1.08);
        }
        .dot-pulse {
          display: flex;
          gap: 4px;
          padding: 4px;
        }
        .dot-pulse span {
          width: 6px;
          height: 6px;
          background: var(--text-secondary);
          border-radius: 50%;
          animation: pulse 1.2s infinite ease-in-out;
        }
        .dot-pulse span:nth-child(2) { animation-delay: 0.2s; }
        .dot-pulse span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </>
  );
}
