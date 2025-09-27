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

  // Helper function to render the rotating text with "to" in white
  const renderTextWithWhiteTo = (text: string) => {
    const parts = text.split(' to ');
    if (parts.length === 2) {
      return (
        <>
          <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">{parts[0]}</span>
          <span className="text-white"> to </span>
          <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">{parts[1]}</span>
        </>
      );
    }
    return <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">{text}</span>;
  };

  return (
    <div className="h-20 md:h-28 flex items-center justify-center">
      <h1 id="hero-heading" className="rotating-text" aria-live="polite" aria-label="Etherius AI tagline">
        <span className="text-white">From </span>
        {renderTextWithWhiteTo(currentText)}
        <span className="animate-pulse bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent" aria-hidden="true">|</span>
      </h1>
    </div>
  );
};