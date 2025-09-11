import { useState, useEffect } from 'react';

const phrases = [
  "From AI to ROI",
  "From hype to results", 
  "From tools to transformation",
  "From uncertainty to clarity"
];

export const RotatingText = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        setIsVisible(true);
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-20 md:h-28 flex items-center justify-center">
      <h1 
        className={`rotating-text transition-all duration-600 ${
          isVisible ? 'fade-in-up' : 'fade-out-up'
        }`}
      >
        {phrases[currentPhrase]}
      </h1>
    </div>
  );
};