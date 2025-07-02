import React, { useState, useEffect } from 'react';
import './Journal.css';

const moods = ['😊', '😐', '😞', '😢', '😠'];

function getAllJournalEntries() {
  return Object.keys(localStorage)
    .filter(key => key.startsWith('journal-'))
    .map(key => {
      const date = key.replace('journal-', '');
      const data = JSON.parse(localStorage.getItem(key));
      return { date, ...data };
    })
    .filter(e => e.entry && e.entry.trim())
    .sort((a, b) => b.date.localeCompare(a.date)); // newest first
}

function Journal() {
  const today = new Date().toISOString().slice(0, 10);
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [allEntries, setAllEntries] = useState(getAllJournalEntries());

  useEffect(() => {
    const saved = localStorage.getItem(`journal-${today}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setEntry(parsed.entry);
      setMood(parsed.mood);
      setLastSaved(parsed.lastSaved || null);
    } else {
      setEntry('');
      setMood('');
      setLastSaved(null);
    }
  }, [today]);

  useEffect(() => {
    const now = new Date().toLocaleString();
    localStorage.setItem(`journal-${today}`,
      JSON.stringify({ entry, mood, lastSaved: now })
    );
    setLastSaved(now);
    setAllEntries(getAllJournalEntries());
  }, [entry, mood, today]);

  return (
    <div className="journal-feed-main">
      <div className="journal journal-entry-form">
        <h2>My Journal</h2>
        <div className="journal-controls">
          <input
            type="date"
            value={today}
            disabled
          />
          <select value={mood} onChange={e => setMood(e.target.value)}>
            <option value="">Tag mood</option>
            {moods.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <textarea
          className="journal-textarea"
          value={entry}
          onChange={e => setEntry(e.target.value)}
          placeholder="Write your thoughts for today..."
          rows={8}
        />
        <div className="journal-note">
          Auto-saved locally. Only you can see this.<br/>
          {lastSaved && <span>Last saved: {lastSaved}</span>}
        </div>
      </div>
      <div className="journal-feed-list">
        {allEntries.length === 0 && <div className="journal-empty">No entries yet</div>}
        {allEntries.map(e => (
          <div className="journal journal-feed-card" key={e.date}>
            <div className="journal-feed-header">
              <span className="journal-feed-date">{e.date}</span>
              {e.mood && <span className="journal-feed-mood">{e.mood}</span>}
            </div>
            <div className="journal-feed-text">{e.entry}</div>
            {e.lastSaved && <div className="journal-feed-saved">Last saved: {e.lastSaved}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Journal; 