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
    <div id="preloader" style={isLoaded ? { opacity: 0, visibility: 'hidden' } : {}}>
      <div className="preloader-brand">
        <div>Dr. Hanadi Khamiri<span>.</span></div>
        <div className="preloader-line" style={isLoaded ? { width: '100%' } : {}}></div>
      </div>
    </div>
  );
}
