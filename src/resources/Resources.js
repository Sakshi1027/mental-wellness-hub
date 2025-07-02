import React from 'react';
import './Resources.css';

const helplines = [
  {
    name: 'National Suicide Prevention Lifeline (US)',
    phone: '+1-800-273-8255',
    email: 'help@suicidepreventionlifeline.org',
    whatsapp: '',
  },
  {
    name: 'Samaritans (UK)',
    phone: '+44-116-123',
    email: 'jo@samaritans.org',
    whatsapp: '',
  },
  {
    name: 'iCall (India)',
    phone: '+91-9152987821',
    email: 'icall@tiss.edu',
    whatsapp: 'https://wa.me/919152987821',
  },
  {
    name: 'Lifeline (Australia)',
    phone: '+61-13-11-14',
    email: '',
    whatsapp: '',
  },
];

function Resources() {
  return (
    <div className="resources">
      <h2>Mental Health Helplines</h2>
      <ul className="helpline-list">
        {helplines.map((h, i) => (
          <li key={i} className="helpline-item">
            <strong>{h.name}</strong>
            <div>
              {h.phone && (
                <a href={`tel:${h.phone.replace(/[^+\d]/g, '')}`}>{h.phone}</a>
              )}
              {h.email && (
                <span> | <a href={`mailto:${h.email}`}>{h.email}</a></span>
              )}
              {h.whatsapp && (
                <span> | <a href={h.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Resources; 