'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * CountUp Component (React Bits)
 * Robust, state-driven animated number counter with cubic easing and fallback triggers.
 */
export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 1.6,
  className = '',
  startWhen = true,
  separator = '',
  decimals = 0,
  onStart,
  onEnd
}) {
  const targetNum = typeof to === 'number' ? to : parseFloat(to) || 0;
  const startNum = typeof from === 'number' ? from : parseFloat(from) || 0;

  const formatNumber = useCallback(
    val => {
      const fixed = val.toFixed(decimals);
      if (!separator) return fixed;
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return parts.join('.');
    },
    [decimals, separator]
  );

  const [hasStarted, setHasStarted] = useState(false);
  const [displayValue, setDisplayValue] = useState(() =>
    formatNumber(direction === 'down' ? targetNum : startNum)
  );

  const elementRef = useRef(null);
  const animationRef = useRef(null);

  // Trigger start
  useEffect(() => {
    if (!startWhen || hasStarted) return;

    const element = elementRef.current;
    let observer;

    // Fallback timer: if intersection observer doesn't fire within 500ms of startWhen=true, start automatically!
    const fallbackTimer = setTimeout(() => {
      setHasStarted(true);
    }, 500);

    if (element && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              clearTimeout(fallbackTimer);
              setHasStarted(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(element);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (observer) observer.disconnect();
    };
  }, [startWhen, hasStarted]);

  // Animation execution
  useEffect(() => {
    if (!hasStarted) return;

    const startVal = direction === 'down' ? targetNum : startNum;
    const endVal = direction === 'down' ? startNum : targetNum;
    const durationMs = duration * 1000;
    const delayMs = delay * 1000;

    // Ease-out cubic
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const timerId = setTimeout(() => {
      onStart?.();
      const startTime = performance.now();

      const tick = now => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = easeOutCubic(progress);

        const currentVal = startVal + (endVal - startVal) * eased;
        setDisplayValue(formatNumber(currentVal));

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayValue(formatNumber(endVal));
          onEnd?.();
        }
      };

      animationRef.current = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(timerId);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [hasStarted, targetNum, startNum, direction, delay, duration, formatNumber, onStart, onEnd]);

  return (
    <span ref={elementRef} className={`count-up-wrap ${className}`.trim()}>
      {displayValue}
    </span>
  );
}
