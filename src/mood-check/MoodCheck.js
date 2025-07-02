import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const moods = [
  { icon: '😊', label: 'Happy' },
  { icon: '😐', label: 'Neutral' },
  { icon: '😞', label: 'Sad' },
  { icon: '😢', label: 'Crying' },
  { icon: '😠', label: 'Angry' },
];

const moodMessages = {
  'Happy': {
    msg: "Keep spreading your positivity! 😊 Here's a tip: Share your happiness with a friend today.",

  },
  'Neutral': {
    msg: "It's okay to feel neutral. Take a deep breath and do something you enjoy!",
  
  },
  'Sad': {
    msg: "Feeling sad? Remember, it's okay to have tough days. Try listening to your favorite music.",

  },
  'Crying': {
    msg: "Crying can be healing. Reach out to someone you trust or write in your journal.",

  },
  'Angry': {
    msg: "Anger is a valid emotion. Try some deep breathing or a quick walk to cool down.",

  },
};

function MoodCheck() {
  const [selected, setSelected] = useState(null);
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    fetchTrend();
  }, []);

  useEffect(() => {
    if (trend.length > 0) {
      renderChart();
    }
  }, [trend]);

  const fetchTrend = async () => {
    const q = query(collection(db, 'moods'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => doc.data());
    setTrend(data.slice(0, 7).reverse()); // last 7 moods
  };

  const handleMood = async (mood) => {
    setSelected(mood);
    await addDoc(collection(db, 'moods'), {
      mood: mood.label,
      icon: mood.icon,
      timestamp: Timestamp.now(),
    });
    fetchTrend();
  };

  const renderChart = () => {
    const ctx = document.getElementById('moodChart').getContext('2d');
    if (window.moodChartInstance) window.moodChartInstance.destroy();
    window.moodChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: trend.map((t, i) => `Day ${i + 1}`),
        datasets: [{
          label: 'Mood Trend',
          data: trend.map(t => moods.findIndex(m => m.label === t.mood)),
          backgroundColor: '#b2dfdb',
          borderColor: '#6a1b9a',
          tension: 0.4,
        }],
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: moods.length - 1,
            ticks: {
              callback: (value) => moods[value]?.icon || '',
              stepSize: 1,
            },
          },
        },
      },
    });
  };

  return (
    <div className="mood-check">
      <h2>How are you feeling today?</h2>
      <div className="mood-icons">
        {moods.map((mood, idx) => (
          <button
            key={mood.label}
            className={`mood-btn${selected === mood ? ' selected' : ''}`}
            onClick={() => handleMood(mood)}
            aria-label={mood.label}
          >
            <span style={{ fontSize: '2rem' }}>{mood.icon}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="mood-message">
        
          <div className="mood-message-text">{moodMessages[selected.label].msg}</div>
        </div>
      )}
      <div style={{ marginTop: 32 }}>
        <canvas id="moodChart" height="120"></canvas>
      </div>
    </div>
  );
}

export default MoodCheck; 