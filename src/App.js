import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MoodCheck from './mood-check/MoodCheck';
import Blog from './blog/Blog';
import VentWall from './vent-wall/VentWall';
import Resources from './resources/Resources';
import Journal from './journal/Journal';
import './App.css';

const QUOTES = [
  "You are stronger than you think",
  "Every day is a fresh start",
  "Small steps every day lead to big changes",
  "You matter. Your feelings matter",
  "It's okay to ask for help",
  "Progress, not perfection",
  "Be kind to yourself today",
  "You are not alone"
];

function MotivationalQuoteWidget() {
  const [quote, setQuote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const refresh = () => setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  return (
    <div className="quote-widget">
      <span className="quote-mark">“</span>
      <span className="quote-text">{quote}</span>
      <button className="quote-refresh" onClick={refresh} title="New quote">🔄</button>
    </div>
  );
}

function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <button className="theme-switcher" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} title="Switch theme">
      {theme === 'light' ? '🌙' : '🌞'}
    </button>
  );
}

function PersonalizedGreeting() {
  const [name, setName] = useState(() => localStorage.getItem('nickname') || '');
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(name);
  useEffect(() => { if (name) localStorage.setItem('nickname', name); }, [name]);
  if (!name || editing) {
    return (
      <form className="greeting-form" onSubmit={e => { e.preventDefault(); setName(input); setEditing(false); }}>
        <input className="greeting-input" value={input} onChange={e => setInput(e.target.value)} placeholder="Your name..." maxLength={16} autoFocus />
        <button type="submit">Save</button>
      </form>
    );
  }
  return (
    <span className="greeting">Hi, {name}! <button className="greeting-edit" onClick={() => setEditing(true)} title="Edit name">✏️</button></span>
  );
}

function SectionHeader({ emoji, children }) {
  return (
    <div className="section-header">
      <span className="section-emoji" role="img" aria-label="section-emoji">{emoji}</span>
      <span className="section-title">{children}</span>
    </div>
  );
}

function Confetti({ show }) {
  // Simple confetti using emoji for demo
  if (!show) return null;
  return (
    <div className="confetti">
      {Array.from({ length: 30 }).map((_, i) => (
        <span key={i} className="confetti-emoji" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random()}s` }}>
          {['🎉', '✨', '💖', '🎊', '🌟'][i % 5]}
        </span>
      ))}
    </div>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am your wellness buddy. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  // Gemini API integration
  async function getGeminiReply(userMessage) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }]
      })
    });
    const data = await response.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't get a reply."
    );
  }

  const send = async e => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { from: 'user', text: input }]);
    const aiReply = await getGeminiReply(input);
    setMessages(msgs => [...msgs, { from: 'bot', text: aiReply }]);
    setInput('');
  };

  return (
    <>
      <button className="chatbot-fab" onClick={() => setOpen(true)} title="Chat with AI">💬</button>
      {open && (
        <div className="chatbot-modal-overlay" onClick={() => setOpen(false)}>
          <div className="chatbot-modal" onClick={e => e.stopPropagation()}>
            <button className="chatbot-close" onClick={() => setOpen(false)}>&times;</button>
            <div className="chatbot-messages">
              {messages.map((m, i) => (
                <div key={i} className={`chatbot-msg ${m.from}`}>{m.text}</div>
              ))}
            </div>
            <form className="chatbot-form" onSubmit={send}>
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." autoFocus />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <MotivationalQuoteWidget />
        <nav className="navbar">
          <h1>Student Mental Wellness Hub</h1>
          <div className="navbar-extras">
            <PersonalizedGreeting />
            <ThemeSwitcher />
          </div>
          <ul>
            <li><Link to="/">Mood Check</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/vent-wall">Venting Wall</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/journal">Journal</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<><SectionHeader emoji="🌤️">Mood Check</SectionHeader><MoodCheck /></>} />
            <Route path="/blog" element={<><SectionHeader emoji="📚">Blog</SectionHeader><Blog /></>} />
            <Route path="/vent-wall" element={<><SectionHeader emoji="💬">Venting Wall</SectionHeader><VentWall /></>} />
            <Route path="/resources" element={<><SectionHeader emoji="🆘">Resources</SectionHeader><Resources /></>} />
            <Route path="/journal" element={<><SectionHeader emoji="📔">Journal</SectionHeader><Journal /></>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 
