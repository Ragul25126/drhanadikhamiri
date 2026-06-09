'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
      setTimeout(() => {
        setIsRemoved(true);
      }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (isRemoved) return null;

  return (
    <div id="preloader" className={isLoaded ? 'fade-out' : ''}>
      <div className="preloader-brand">
        <div className="preloader-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
          </svg>
        </div>
        <div>Dr. Hanadi Khamiri<span>.</span></div>
      </div>
    </div>
  );
}
