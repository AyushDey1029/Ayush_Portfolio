'use client';
import { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 45,
  itemScale = 0.015,
  itemStackDistance = 24,
  stackPosition = '12%',
  scaleEndPosition = '6%',
  baseScale = 0.92,
  rotationAmount = 0,
  useWindowScroll = true,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const cardTopsRef = useRef([]);
  const cardHeightsRef = useRef([]);
  const endTopRef = useRef(0);
  const lastTransformsRef = useRef(new Map());

  const calculateProgress = (scrollTop, start, end) => {
    if (scrollTop <= start) return 0;
    if (scrollTop >= end) return 1;
    return (scrollTop - start) / (end - start);
  };

  const parsePercentage = (value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  };

  // Measure true, untransformed document offset and height
  const measureStaticTops = useCallback(() => {
    if (!cardsRef.current.length) return;

    cardTopsRef.current = [];
    cardHeightsRef.current = [];

    cardsRef.current.forEach((card, i) => {
      let top = 0;
      let curr = card;
      while (curr) {
        top += curr.offsetTop || 0;
        curr = curr.offsetParent;
      }
      cardTopsRef.current[i] = top;
      cardHeightsRef.current[i] = card.offsetHeight;
    });

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    if (endElement) {
      let top = 0;
      let curr = endElement;
      while (curr) {
        top += curr.offsetTop || 0;
        curr = curr.offsetParent;
      }
      endTopRef.current = top;
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || !cardTopsRef.current.length) return;

    const scrollTop = useWindowScroll ? window.scrollY : (scrollerRef.current?.scrollTop || 0);
    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const endElementTop = endTopRef.current || (cardTopsRef.current[cardTopsRef.current.length - 1] + 800);

    const cards = cardsRef.current;
    const cardTops = cardTopsRef.current;
    const cardHeights = cardHeightsRef.current;
    const len = cards.length;

    // Calculate pin points for all cards
    const pinStarts = [];
    for (let j = 0; j < len; j++) {
      const jTop = cardTops[j];
      const jHeight = cardHeights[j] || 600;
      const jVisible = containerHeight - (stackPositionPx + itemStackDistance * j);
      const jOverflow = jHeight > jVisible ? jHeight - jVisible : 0;
      pinStarts[j] = jTop - (stackPositionPx + itemStackDistance * j) + jOverflow;
    }

    // When the very last section is completely stacked, hold for 300px then release the entire deck
    // so all cards glide up together and reveal the footer!
    const lastCardPinStart = pinStarts[len - 1] || 0;
    const releaseScroll = lastCardPinStart + 350;

    // Determine current top card for depth shading
    let topCardIndex = 0;
    for (let j = 0; j < len; j++) {
      if (scrollTop >= pinStarts[j]) {
        topCardIndex = j;
      }
    }

    for (let i = 0; i < len; i++) {
      const card = cards[i];
      if (!card) continue;

      const cardTop = cardTops[i];
      const cardHeight = cardHeights[i] || card.offsetHeight;
      const targetPinTop = stackPositionPx + itemStackDistance * i;
      const visibleHeight = containerHeight - targetPinTop;

      // When a card is taller than the visible screen (e.g. Projects section),
      // allow the user to scroll through the full content of the card naturally
      // before pinning it at the bottom of the viewport!
      const isTall = cardHeight > visibleHeight;
      const pinStart = pinStarts[i];

      // Scale down gently after the card has reached its pinning point
      const triggerStart = pinStart;
      const triggerEnd = pinStart + Math.min(containerHeight * 0.4, 300);
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= releaseScroll) {
        // Pinned state: lock card at its pin point
        if (isTall) {
          translateY = scrollTop - pinStart;
        } else {
          translateY = scrollTop - cardTop + targetPinTop;
        }
      } else if (scrollTop > releaseScroll) {
        // Released state: deck unpins as one unified block and scrolls up
        // to reveal the footer section cleanly!
        if (isTall) {
          translateY = releaseScroll - pinStart;
        } else {
          translateY = releaseScroll - cardTop + targetPinTop;
        }
      }

      // Smooth depth dimming: cards deeper in the stack get subtly dimmed
      let opacity = 1;
      if (i < topCardIndex) {
        const depth = topCardIndex - i;
        opacity = Math.max(0.72, 1 - depth * 0.09);
      }

      const newY = Math.round(translateY * 10) / 10;
      const newScale = Math.round(scale * 1000) / 1000;
      const newRot = Math.round(rotation * 10) / 10;
      const newOp = Math.round(opacity * 100) / 100;
      const newOrigin = isTall ? 'bottom center' : 'top center';

      const last = lastTransformsRef.current.get(i);
      if (
        !last ||
        Math.abs(last.y - newY) > 0.4 ||
        Math.abs(last.scale - newScale) > 0.001 ||
        Math.abs(last.rot - newRot) > 0.1 ||
        Math.abs(last.op - newOp) > 0.02
      ) {
        card.style.transformOrigin = newOrigin;
        card.style.transform = `translate3d(0, ${newY}px, 0) scale(${newScale}) rotate(${newRot}deg)`;
        card.style.opacity = newOp;
        lastTransformsRef.current.set(i, { y: newY, scale: newScale, rot: newRot, op: newOp });
      }

      if (i === len - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= releaseScroll;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    }
  }, [
    useWindowScroll,
    stackPosition,
    itemStackDistance,
    itemScale,
    baseScale,
    rotationAmount,
    onStackComplete
  ]);

  useIsomorphicLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller?.querySelectorAll('.scroll-stack-card') || []
    );

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, opacity';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
    });

    // Measure untransformed positions and heights
    measureStaticTops();

    // Setup smooth Lenis scrolling
    let lenisInstance = null;
    if (useWindowScroll) {
      lenisInstance = new Lenis({
        duration: 0.9,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
        infinite: false,
        wheelMultiplier: 0.9,
        lerp: 0.08
      });

      lenisInstance.on('scroll', () => {
        updateCardTransforms();
      });

      const raf = time => {
        lenisInstance.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenisInstance;
    }

    if (typeof window !== 'undefined') {
      window.__lenis = lenisInstance;
      window.__getScrollTargetForSection = sectionId => {
        const cleanId = (sectionId || '').replace(/^#/, '').toLowerCase();
        if (!cleanId || cleanId === 'about' || cleanId === 'top' || cleanId === 'hero') return 0;

        const targetEl = document.getElementById(cleanId);
        if (!targetEl) return null;

        const card = targetEl.closest('.scroll-stack-card') || targetEl;
        const idx = cardsRef.current.indexOf(card);
        if (idx === -1) return null;

        const cardTop = cardTopsRef.current[idx];
        if (typeof cardTop !== 'number') return null;

        const containerHeight = window.innerHeight;
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const targetPinTop = stackPositionPx + itemStackDistance * idx;

        return Math.max(0, cardTop - targetPinTop);
      };
    }

    // Passive resize observer to re-measure if contents expand
    const resizeObserver = new ResizeObserver(() => {
      measureStaticTops();
      updateCardTransforms();
    });

    cards.forEach(card => resizeObserver.observe(card));
    window.addEventListener('resize', measureStaticTops, { passive: true });

    // Initial pass
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (typeof window !== 'undefined') {
        if (window.__lenis === lenisRef.current) {
          window.__lenis = null;
        }
        window.__getScrollTargetForSection = null;
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureStaticTops);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardTopsRef.current = [];
      cardHeightsRef.current = [];
      lastTransformsRef.current.clear();
    };
  }, [
    itemDistance,
    useWindowScroll,
    measureStaticTops,
    updateCardTransforms
  ]);

  return (
    <div
      className={`scroll-stack-scroller ${useWindowScroll ? 'use-window-scroll' : ''} ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
