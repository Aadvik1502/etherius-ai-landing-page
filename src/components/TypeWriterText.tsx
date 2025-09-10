import { useState, useEffect } from 'react';

const phrases = [
  "AI to ROI",
  "uncertainty to clarity",
  "hype to results"
];

export const TypewriterText = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        // Typing
        setCurrentText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        setCurrentText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, isDeleting ? 50 : 100); // Faster deleting, slower typing

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentPhraseIndex]);

  return (
    <div className="h-20 md:h-28 flex items-center justify-center">
      <h1 className="rotating-text">
        From <span className="text-neon-yellow">{currentText}</span>
        <span className="animate-pulse text-neon-yellow">|</span>
      </h1>
    </div>
  );
};