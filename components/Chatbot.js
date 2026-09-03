'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, X, Send, CornerDownLeft } from 'lucide-react';

export default function Chatbot({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I am Ayush's Portfolio Assistant, grounded directly in his verified resume data. Feel free to ask about his engineering projects, technical stack, or background.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'Core technical skills',
    'Explain FundConnectAI',
    'IoT AutoEncoder project',
    'Contact information',
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
          { role: 'assistant', content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "I could not retrieve an answer right now. Please reach out to Ayush directly at deyayush1029@gmail.com.",
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
      {/* Floating Toggle Pill */}
      <div className="assistant-pill-fixed">
        <button
          className="assistant-pill"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Portfolio Assistant"
        >
          <Bot size={16} />
          <span>Ask Resume Assistant</span>
          <span className="live-dot" />
        </button>
      </div>

      {/* Clean Drawer */}
      {isOpen && (
        <div className="assistant-modal">
          {/* Header */}
          <div className="assistant-header">
            <div className="header-info">
              <span className="header-title">Ayush's Assistant</span>
              <span className="header-badge">RAG • Gemini</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="close-btn"
              aria-label="Close Assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="messages-area">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`msg-group ${msg.role === 'user' ? 'user-msg' : 'bot-msg'}`}
              >
                <div className="msg-sender">
                  {msg.role === 'user' ? 'You' : 'Assistant'}
                </div>
                <div className="msg-content">
                  <div style={{ whiteSpace: 'pre-line' }}>{msg.content}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="msg-group bot-msg">
                <div className="msg-sender">Assistant</div>
                <div className="msg-content loading-dots">
                  <span>Searching resume context...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length < 3 && (
            <div className="prompts-bar">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="prompt-btn"
                  onClick={() => handleSend(p)}
                >
                  {p}
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
            className="input-row"
          >
            <input
              type="text"
              placeholder="Ask a question about Ayush's background..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-field"
            />
            <button
              type="submit"
              className="send-button"
              disabled={loading || !input.trim()}
              aria-label="Submit"
            >
              <CornerDownLeft size={16} />
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        .assistant-pill-fixed {
          position: fixed;
          bottom: 1.75rem;
          right: 1.75rem;
          z-index: 999;
        }
        .assistant-pill {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          background: rgba(17, 20, 26, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: var(--text-primary);
          padding: 0.6rem 1.15rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 14px rgba(56, 189, 248, 0.15);
          transition: all 0.2s ease;
        }
        .assistant-pill:hover {
          border-color: rgba(129, 140, 248, 0.7);
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.3);
          transform: translateY(-2px);
        }
        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
        }
        .assistant-modal {
          position: fixed;
          bottom: 4.75rem;
          right: 1.75rem;
          width: 390px;
          max-width: calc(100vw - 3.5rem);
          height: 520px;
          max-height: calc(100vh - 7rem);
          background: #0d1117;
          border: 1px solid var(--border-strong);
          border-radius: 12px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7);
          overflow: hidden;
        }
        .assistant-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.9rem 1.1rem;
          border-bottom: 1px solid var(--border-subtle);
          background: #11141a;
        }
        .header-info {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .header-title {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .header-badge {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          padding: 0.15rem 0.45rem;
          background: rgba(37, 99, 235, 0.12);
          border: 1px solid rgba(37, 99, 235, 0.3);
          border-radius: 4px;
          color: #60a5fa;
        }
        .close-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .close-btn:hover {
          color: var(--text-primary);
        }
        .messages-area {
          flex: 1;
          padding: 1.1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .msg-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .msg-sender {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .user-msg .msg-sender {
          text-align: right;
          color: var(--accent-text);
        }
        .msg-content {
          padding: 0.75rem 0.95rem;
          border-radius: 8px;
          font-size: 0.88rem;
          line-height: 1.55;
        }
        .bot-msg .msg-content {
          background: #161b22;
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
        }
        .user-msg .msg-content {
          background: #1e293b;
          border: 1px solid var(--border-strong);
          color: #fff;
          align-self: flex-end;
          max-width: 85%;
        }
        .loading-dots {
          color: var(--text-muted);
          font-size: 0.8rem;
          font-style: italic;
        }
        .prompts-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          padding: 0.5rem 1.1rem;
          border-top: 1px solid var(--border-subtle);
        }
        .prompt-btn {
          font-size: 0.75rem;
          padding: 0.35rem 0.75rem;
          background: rgba(22, 27, 34, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .prompt-btn:hover {
          color: #fff;
          border-color: rgba(56, 189, 248, 0.5);
          background: rgba(30, 41, 59, 0.9);
          transform: translateY(-1px);
        }
        .input-row {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.1rem;
          border-top: 1px solid var(--border-subtle);
          background: #11141a;
          gap: 0.5rem;
        }
        .chat-field {
          flex: 1;
          background: #0d1117;
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          padding: 0.55rem 0.85rem;
          color: #fff;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .chat-field:focus {
          border-color: var(--border-strong);
        }
        .send-button {
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          border: none;
          border-radius: 6px;
          color: #fff;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .send-button:hover:not(:disabled) {
          filter: brightness(1.15);
          transform: scale(1.04);
        }
        .send-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          filter: grayscale(1);
        }
      `}</style>
    </>
  );
}
