import React, { useState } from 'react';
import './Blog.css';

const articles = [
  {
    title: '5 Ways to Boost Your Mood',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    excerpt: 'Simple habits to help you feel better every day.',
    content: `1. Get some sunlight\n2. Move your body\n3. Connect with a friend\n4. Listen to uplifting music\n5. Practice gratitude.\n\nEven small steps can make a big difference!`,
  },
  {
    title: 'You Are Not Alone',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    excerpt: 'Stories of students overcoming tough times.',
    content: `Many students feel overwhelmed at times.\n\nRemember, reaching out for help is a sign of strength. Talk to someone you trust, or use the resources on this site.\n\nYou are never alone in your journey.`,
  },
  {
    title: 'Motivational Quotes for Students',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    excerpt: 'Words to inspire you through your journey.',
    content: `"The best way to get started is to quit talking and begin doing."\n- Walt Disney\n\n"Success is not final, failure is not fatal: It is the courage to continue that counts."\n- Winston Churchill`,
  },
];

function Blog() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="blog-feed">
      <h2>Motivational Blog</h2>
      <div className="blog-cards">
        {articles.map((a, i) => (
          <div className="blog-card" key={i} onClick={() => setOpenIdx(i)} tabIndex={0} role="button">
            <img src={a.image} alt={a.title} />
            <h3>{a.title}</h3>
            <p>{a.excerpt}</p>
          </div>
        ))}
      </div>
      {openIdx !== null && (
        <div className="blog-modal-overlay" onClick={() => setOpenIdx(null)}>
          <div className="blog-modal" onClick={e => e.stopPropagation()}>
            <button className="blog-modal-close" onClick={() => setOpenIdx(null)}>&times;</button>
            <img src={articles[openIdx].image} alt={articles[openIdx].title} />
            <h2>{articles[openIdx].title}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{articles[openIdx].content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog; 