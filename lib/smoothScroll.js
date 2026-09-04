'use client';

/**
 * Calculates the exact un-transformed static scroll position for a given section.
 * Accounts for:
 * 1. ScrollStack cards' dynamic translate3d transforms
 * 2. Sticky top navigation bar height & stack pin offsets
 * 3. Fallback to untransformed offsetParent DOM walk
 */
export function getSectionScrollTop(targetId) {
  if (typeof document === 'undefined') return 0;

  const id = (targetId || '').replace(/^#/, '').trim().toLowerCase();

  // Hero / About is at the very top of the page
  if (!id || id === 'about' || id === 'hero' || id === 'top') {
    return 0;
  }

  // 1. If ScrollStack registered its exact calculated section target, use it
  if (typeof window !== 'undefined' && typeof window.__getScrollTargetForSection === 'function') {
    const target = window.__getScrollTargetForSection(id);
    if (typeof target === 'number' && !isNaN(target)) {
      return target;
    }
  }

  // 2. Direct DOM fallback: walk up untransformed offsetTop hierarchy
  const targetEl = document.getElementById(id);
  if (!targetEl) return null;

  const card = targetEl.closest('.scroll-stack-card') || targetEl;

  let staticTop = 0;
  let curr = card;
  while (curr) {
    staticTop += curr.offsetTop || 0;
    curr = curr.offsetParent;
  }

  // Match ScrollStack pinning geometry
  const containerHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
  const stackPositionPx = 0.12 * containerHeight;
  const itemStackDistance = 20;

  const allCards = Array.from(document.querySelectorAll('.scroll-stack-card'));
  const cardIndex = allCards.indexOf(card);
  const targetPinTop = stackPositionPx + (cardIndex >= 0 ? itemStackDistance * cardIndex : 0);

  return Math.max(0, staticTop - targetPinTop);
}

/**
 * Smoothly scrolls the window to the requested section ID without colliding
 * with Lenis virtual scroll or triggering inaccurate native anchor jumps.
 */
export function smoothScrollToSection(targetId, e) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  if (typeof window === 'undefined') return;

  const id = (targetId || '').replace(/^#/, '').trim().toLowerCase();
  const targetScroll = getSectionScrollTop(id);
  if (targetScroll === null || isNaN(targetScroll)) return;

  const onScrollDone = () => {
    try {
      if (id && id !== 'about' && id !== 'top' && id !== 'hero') {
        window.history.pushState(null, '', `#${id}`);
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }
    } catch {
      // Safe fallback if history API is restricted
    }
  };

  // If Lenis is active on window, use its smooth scrollTo method
  if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
    window.__lenis.scrollTo(targetScroll, {
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      onComplete: onScrollDone
    });
  } else {
    // Fallback to native window smooth scroll
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    // Update hash after scroll completes
    setTimeout(onScrollDone, 600);
  }
}
