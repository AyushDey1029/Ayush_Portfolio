'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
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
      className={`reveal-wrapper ${isVisible ? 'visible' : 'hidden'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
      <style jsx>{`
        .reveal-wrapper {
          transition: opacity 0.55s cubic-bezier(0.2, 0.8, 0.2, 1),
            transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: opacity, transform;
        }
        .hidden {
          opacity: 0.15;
          transform: translateY(20px);
        }
        .visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
