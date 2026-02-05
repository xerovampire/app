import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- Illustrations (SVGs) ---

const HeartAsking = () => (
  <svg className="illustration animate-float" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <path 
      d="M100 180 C100 180 20 130 20 80 C20 40 50 20 80 20 C95 20 100 30 100 30 C100 30 105 20 120 20 C150 20 180 40 180 80 C180 130 100 180 100 180 Z" 
      fill="#f43f5e" 
    />
    {/* Shine */}
    <path d="M 40 60 Q 50 40 70 40" stroke="white" strokeWidth="5" strokeLinecap="round" opacity="0.4" fill="none"/>
    
    {/* Face */}
    <g transform="translate(0, 10)">
      {/* Eyes */}
      <circle cx="75" cy="80" r="6" fill="#4a0414" />
      <circle cx="125" cy="80" r="6" fill="#4a0414" />
      {/* Shine in eyes */}
      <circle cx="77" cy="78" r="2" fill="white" />
      <circle cx="127" cy="78" r="2" fill="white" />
      
      {/* Blushing Cheeks */}
      <circle cx="65" cy="95" r="8" fill="#fda4af" opacity="0.6" />
      <circle cx="135" cy="95" r="8" fill="#fda4af" opacity="0.6" />
      
      {/* Shy Mouth */}
      <path d="M 95 95 Q 100 100 105 95" stroke="#4a0414" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

const MinimalHeart = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// --- Components ---

const TenorEmbed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="tenor-gif-embed" 
      data-postid="27402378" 
      data-share-method="host" 
      data-aspect-ratio="1.77778" 
      data-width="100%"
      style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem' }}
    >
      <a href="https://tenor.com/view/pokemon-pikachu-laughing-pokemon-journeys-aim-to-be-a-pokemon-master-gif-27402378">Pokemon Pikachu GIF</a>
      from <a href="https://tenor.com/search/pokemon-gifs">Pokemon GIFs</a>
    </div>
  );
};

const FloatingHearts = () => {
  const hearts = useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    // CSS variables for inline styling
    style: {
      '--left': `${Math.random() * 100}%`,
      '--delay': `${Math.random() * 20}s`,
      '--duration': `${15 + Math.random() * 20}s`, // Slow float
      '--sway-duration': `${3 + Math.random() * 3}s`, // Random sway speed
      '--size': `${20 + Math.random() * 40}px`,
      '--opacity': `${0.3 + Math.random() * 0.4}`
    } as React.CSSProperties
  })), []);

  return (
    <div className="hearts-bg">
      {hearts.map(heart => (
        <div 
          key={heart.id}
          className="heart-container"
          style={heart.style}
        >
          <div className="heart-content">
            <MinimalHeart />
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [view, setView] = useState<'ask' | 'yes' | 'no'>('ask');
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

  const handleYes = () => setView('yes');

  const handleNoAction = () => {
    // Generate random coordinates between -150 and 150
    const range = 150;
    const newX = Math.floor(Math.random() * (range * 2)) - range;
    const newY = Math.floor(Math.random() * (range * 2)) - range;
    setNoBtnPos({ x: newX, y: newY });
  };

  const handleReset = () => {
      setView('ask');
      setNoBtnPos({ x: 0, y: 0 });
  };

  return (
    <>
      <FloatingHearts />
      <div className="card fade-in">
        {view === 'ask' && (
          <>
            <HeartAsking />
            <h1>Do you love me?</h1>
            <div className="btn-container">
              <button className="btn-yes" onClick={handleYes}>Yes</button>
              <button 
                className="btn-no" 
                onClick={handleNoAction}
                onMouseEnter={handleNoAction}
                style={{ 
                    transform: `translate(${noBtnPos.x}px, ${noBtnPos.y}px)`,
                    transition: 'transform 0.2s ease', // Ensure smooth animation inline as well
                    position: 'relative',
                    zIndex: 10
                }}
              >
                No
              </button>
            </div>
          </>
        )}

        {view === 'yes' && (
          <div className="fade-in">
            <div className="animate-heartbeat" style={{ width: '100px', height: '100px', margin: '0 auto 1rem', color: '#f43f5e' }}>
              <MinimalHeart />
            </div>
            <h1>Thank you, I love you! 💕✨</h1>
            <p className="love-text">
              I love you more than words can say. You are the sparkle in my eye and the beat in my heart. Thank you for being you!
            </p>
          </div>
        )}

        {view === 'no' && (
          <div className="fade-in">
            <TenorEmbed />
            <h1>haha what did you think? that no button will run around?😭🤣</h1>
            <div className="btn-container">
               <button className="btn-yes" onClick={handleReset} style={{fontSize: '0.9rem', padding: '8px 20px'}}>Try again</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
