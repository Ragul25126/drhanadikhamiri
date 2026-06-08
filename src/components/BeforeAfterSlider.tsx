'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function BeforeAfterSlider() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className="ba-container reveal">
      <div className="ba-img-panel">
        <Image src="/after-new.png" alt="After treatment" fill style={{ objectFit: 'cover' }} />
        <div className="ba-label ba-label-after">After</div>
      </div>
      
      <div className="ba-img-panel" style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}>
        <Image src="/before-new.png" alt="Before treatment" fill style={{ objectFit: 'cover' }} />
        <div className="ba-label ba-label-before" style={{ left: '30px', right: 'auto' }}>Before</div>
      </div>

      <div className="ba-handle" style={{ left: `${sliderValue}%` }}>
        <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: 'currentColor' }}><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/></svg>
        <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: 'currentColor' }}><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={(e) => setSliderValue(Number(e.target.value))}
        className="ba-slider-input"
      />
    </div>
  );
}
