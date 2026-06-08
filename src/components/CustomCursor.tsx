'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = () => ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice()) return;

    const onMouseMove = (e: MouseEvent) => {
      if (cursorDotRef.current && cursorOutlineRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
        cursorOutlineRef.current.animate(
          { left: `${e.clientX}px`, top: `${e.clientY}px` },
          { duration: 500, fill: "forwards" }
        );
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .service-box, .time-box, .service-link, input, .faq-item, .ba-slider-input, .floating-widget')) {
        document.body.classList.add('hover-active');
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .service-box, .time-box, .service-link, input, .faq-item, .ba-slider-input, .floating-widget')) {
        document.body.classList.remove('hover-active');
      }
    };
    
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-outline" ref={cursorOutlineRef}></div>
    </>
  );
}
