'use client';
import React, { useRef, useState, useEffect } from 'react';
import './TiltedCard.css';

/**
 * TiltedCard Component (React Bits)
 * Ultra-smooth, 120 FPS physics-lerped 3D card tilt with cached rect geometry
 * and zero layout thrashing.
 */
export default function TiltedCard({
  children,
  className = '',
  maxTilt = 6,
  scale = 1.012,
  borderRadius = 16,
  glare = true,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Cached layout geometry to avoid forced synchronous reflows on pointermove
  const rectRef = useRef({ left: 0, top: 0, width: 1, height: 1 });

  // Physics animation values (Target vs Current for buttery lerp smoothing)
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetGlareX = useRef(0);
  const targetGlareY = useRef(0);
  const currentGlareX = useRef(0);
  const currentGlareY = useRef(0);

  const isRunningRef = useRef(false);
  const rafIdRef = useRef(null);

  // Measure card once on enter
  const updateRect = () => {
    if (cardRef.current) {
      const r = cardRef.current.getBoundingClientRect();
      rectRef.current = {
        left: r.left,
        top: r.top,
        width: r.width || 1,
        height: r.height || 1
      };
    }
  };

  // Continuous physics lerp loop
  const animate = () => {
    const card = cardRef.current;
    if (!card) {
      isRunningRef.current = false;
      return;
    }

    // Lerp factor: 0.12 gives soft, silky spring inertia
    const factor = 0.12;
    currentX.current += (targetX.current - currentX.current) * factor;
    currentY.current += (targetY.current - currentY.current) * factor;
    currentGlareX.current += (targetGlareX.current - currentGlareX.current) * 0.15;
    currentGlareY.current += (targetGlareY.current - currentGlareY.current) * 0.15;

    const rotX = currentX.current.toFixed(2);
    const rotY = currentY.current.toFixed(2);
    const curScale = isHovered ? scale : 1;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${curScale}) translateZ(0)`;
    card.style.setProperty('--glare-x', `${currentGlareX.current.toFixed(1)}px`);
    card.style.setProperty('--glare-y', `${currentGlareY.current.toFixed(1)}px`);

    // Continue loop while hovered, or until snapback settles close to 0
    const delta =
      Math.abs(targetX.current - currentX.current) +
      Math.abs(targetY.current - currentY.current);

    if (isHovered || delta > 0.04) {
      rafIdRef.current = requestAnimationFrame(animate);
    } else {
      // Settle completely
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)';
      isRunningRef.current = false;
    }
  };

  const startLoop = () => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      rafIdRef.current = requestAnimationFrame(animate);
    }
  };

  const handlePointerEnter = () => {
    updateRect();
    setIsHovered(true);
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
    }
    startLoop();
  };

  const handlePointerMove = e => {
    const rect = rectRef.current;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Relative offset: -1 (top/left) to +1 (bottom/right)
    const px = (mouseX / rect.width - 0.5) * 2;
    const py = (mouseY / rect.height - 0.5) * 2;

    // Natural tilt: cursor moving up tilts card toward user
    targetX.current = -py * maxTilt;
    targetY.current = px * maxTilt;
    targetGlareX.current = mouseX;
    targetGlareY.current = mouseY;

    startLoop();
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    targetX.current = 0;
    targetY.current = 0;

    // Smooth spring reset
    if (cardRef.current) {
      cardRef.current.style.transition =
        'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease';
    }
    startLoop();
  };

  useEffect(() => {
    const onResize = () => updateRect();
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const customStyle = {
    '--tilted-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    '--glare-opacity': isHovered && glare ? '1' : '0',
    ...(props.style || {})
  };

  return (
    <div className={`tilted-card-wrapper ${className}`.trim()}>
      <div
        ref={cardRef}
        className="tilted-card-inner"
        style={customStyle}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        {glare && <div className="tilted-glare" aria-hidden="true" />}
        {glare && <div className="tilted-border-highlight" aria-hidden="true" />}
        <div className="tilted-content">{children}</div>
      </div>
    </div>
  );
}
