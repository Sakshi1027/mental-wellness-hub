import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import './VentWall.css';

const reactions = ['💖', '🙌', '💬'];

function VentWall() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reactCounts, setReactCounts] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const q = query(collection(db, 'ventPosts'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return setImage(null);
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await addDoc(collection(db, 'ventPosts'), {
      message,
      image: image || '',
      timestamp: Timestamp.now(),
    });
    setMessage('');
    setImage(null);
    fetchPosts();
  };

  const handleReact = (postId, emoji) => {
    setReactCounts(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [emoji]: (prev[postId]?.[emoji] || 0) + 1,
      },
    }));
  };

  return (
    <div className="vent-wall">
      <h2>Anonymous Venting Wall</h2>
      <form onSubmit={handlePost} className="vent-form">
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Share your thoughts... (anonymous)"
          rows={3}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="vent-image-input"
        />
        {image && (
          <img src={image} alt="preview" className="vent-image-preview" />
        )}
        <button type="submit">Post</button>
      </form>
      <div className="vent-feed">
        {posts.map(post => (
          <div className="vent-post" key={post.id}>
            <div className="vent-msg">{post.message}</div>
            {post.image && post.image !== '' && (
              <img src={post.image} alt="vent" className="vent-image" />
            )}
            <div className="vent-meta">
              <span>{post.timestamp?.toDate?.().toLocaleString?.() || ''}</span>
              <div className="vent-reactions">
                {reactions.map(emoji => (
                  <button
                    key={emoji}
                    className="vent-emoji"
                    onClick={() => handleReact(post.id, emoji)}
                    type="button"
                  >
                    {emoji} {reactCounts[post.id]?.[emoji] || ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VentWall; 