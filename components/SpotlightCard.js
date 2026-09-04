'use client';
import React, { useRef, useState } from 'react';
import './SpotlightCard.css';

/**
 * SpotlightCard Component (React Bits)
 * Renders a glassmorphic card with dynamic radial flashlight lighting that
 * smoothly tracks cursor position across the card surface and border.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(56, 189, 248, 0.14)',
  borderRadius = 14,
  as: Component = 'div',
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = e => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const customStyle = {
    '--card-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    '--spotlight-color': spotlightColor,
    '--spotlight-opacity': isHovered ? '1' : '0',
    ...(props.style || {})
  };

  return (
    <Component
      ref={cardRef}
      className={`spotlight-card ${className}`.trim()}
      style={customStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Inner radial flashlight sheen */}
      <div className="spotlight-surface-glow" aria-hidden="true" />
      {/* Dynamic border spotlight */}
      <div className="spotlight-border-glow" aria-hidden="true" />
      {/* Content wrapper */}
      <div className="spotlight-inner-content">
        {children}
      </div>
    </Component>
  );
}
