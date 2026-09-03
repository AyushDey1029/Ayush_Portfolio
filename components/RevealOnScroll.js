'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  threshold = 0.15,
  direction = 'up',
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility based on entry so it animates BOTH when scrolling down and scrolling up
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`reveal-container ${isVisible ? 'is-visible' : 'is-hidden'} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
      <style jsx>{`
        .reveal-container {
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform, filter;
        }
        .is-hidden {
          opacity: 0;
          transform: translateY(40px) scale(0.97);
          filter: blur(4px);
        }
        .is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }
      `}</style>
    </div>
  );
}
