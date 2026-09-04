'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FadeContent = ({
  children,
  container,
  blur = true,
  duration = 1150,
  ease = 'power1.inOut',
  delay = 0.05,
  direction = 'left-to-right',
  threshold = 0.1,
  initialOpacity = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power2.in',
  fadeOutOnScroll = true,
  triggerWhen = true,
  onComplete,
  onDisappearanceComplete,
  className = '',
  style,
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (triggerWhen === false) return;

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReduced) {
      gsap.set(el, { clipPath: 'none', autoAlpha: 1, filter: 'none' });
      if (el.children) gsap.set(el.children, { autoAlpha: 1, x: 0, filter: 'none' });
      return;
    }

    let scrollerTarget = container || document.getElementById('snap-main-container') || null;
    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const startPct = (1 - threshold) * 100;
    const getSeconds = val => (typeof val === 'number' && val > 10 ? val / 1000 : val);

    const isMobile = window.innerWidth < 960;
    const childElements = el.children;

    // Master entrance timeline
    const tl = gsap.timeline({
      paused: true,
      delay: getSeconds(delay),
      onComplete: () => {
        gsap.set(el, { clipPath: 'none', filter: 'none' });
        if (childElements) gsap.set(childElements, { filter: 'none', x: 0 });
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            autoAlpha: initialOpacity,
            filter: blur ? 'blur(10px)' : 'blur(0px)',
            delay: getSeconds(disappearAfter),
            duration: getSeconds(disappearDuration),
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    if (direction === 'left-to-right' && !isMobile) {
      // 1. Hardware-accelerated clipPath sweep from left to right matching the sliding card
      gsap.set(el, {
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        autoAlpha: 1,
        willChange: 'clip-path, transform, opacity'
      });

      tl.to(el, {
        clipPath: 'polygon(0% 0%, 105% 0%, 105% 100%, 0% 100%)',
        duration: getSeconds(duration),
        ease: 'power2.out'
      }, 0);

      // 2. Stagger each child element: float in from left with blur dissolving into sharpness
      if (childElements && childElements.length > 0) {
        gsap.set(childElements, {
          autoAlpha: initialOpacity,
          x: -24,
          filter: blur ? 'blur(8px)' : 'none',
          willChange: 'transform, opacity, filter'
        });

        tl.to(childElements, {
          autoAlpha: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: getSeconds(duration) * 0.82,
          stagger: 0.16,
          ease: 'power2.out'
        }, 0.1);
      }
    } else {
      // Standard smooth fade (or mobile layout)
      gsap.set(el, {
        autoAlpha: initialOpacity,
        filter: blur ? 'blur(10px)' : 'blur(0px)',
        willChange: 'opacity, filter, transform'
      });

      if (childElements && childElements.length > 0) {
        gsap.set(childElements, {
          autoAlpha: initialOpacity,
          y: 16,
          filter: blur ? 'blur(6px)' : 'none'
        });

        tl.to(el, {
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: getSeconds(duration),
          ease: 'power2.out'
        }, 0);

        tl.to(childElements, {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: getSeconds(duration) * 0.85,
          stagger: 0.12,
          ease: 'power2.out'
        }, 0.08);
      } else {
        tl.to(el, {
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: getSeconds(duration),
          ease: ease
        }, 0);
      }
    }

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play()
    });

    // Trigger entrance
    tl.play();

    // Scroll fade-out as user leaves the hero section (gentle and gradual)
    let scrollFadeTrigger = null;
    if (fadeOutOnScroll) {
      scrollFadeTrigger = ScrollTrigger.create({
        trigger: el,
        scroller: scrollerTarget || window,
        start: 'center 40%',
        end: 'bottom -10%',
        scrub: 1.0,
        onUpdate: self => {
          const p = self.progress;
          gsap.set(el, {
            opacity: Math.max(0, 1 - p),
            filter: blur ? `blur(${p * 5}px)` : 'none'
          });
        }
      });
    }

    return () => {
      st.kill();
      scrollFadeTrigger?.kill();
      tl.kill();
      gsap.killTweensOf(el);
      if (childElements) gsap.killTweensOf(childElements);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerWhen, fadeOutOnScroll, direction]);

  return (
    <div ref={ref} className={`fade-content-wrap ${className}`.trim()} style={style} {...props}>
      {children}
    </div>
  );
};

export default FadeContent;
