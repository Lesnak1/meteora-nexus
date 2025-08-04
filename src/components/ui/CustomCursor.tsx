'use client';

import React, { useEffect, useState, useCallback } from 'react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  const handleElementHover = useCallback((isHover: boolean) => {
    setIsHovering(isHover);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Add mouse event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-pointer'
    );

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', () => handleElementHover(true));
      element.addEventListener('mouseleave', () => handleElementHover(false));
    });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', () => handleElementHover(true));
        element.removeEventListener('mouseleave', () => handleElementHover(false));
      });
    };
  }, [isMounted, updateMousePosition, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp, handleElementHover]);

  // Don't render on server, mobile, or when not mounted
  if (!isMounted || typeof window === 'undefined') {
    return null;
  }

  // Check for mobile devices
  const isMobile = window.innerWidth < 1024;
  if (isMobile) {
    return null;
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  const cursorSize = isHovering ? 20 : isClicking ? 8 : 12;
  const glowSize = isHovering ? 30 : isClicking ? 16 : 24;

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[10000] transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - cursorSize / 2,
          top: mousePosition.y - cursorSize / 2,
          width: cursorSize,
          height: cursorSize,
          opacity: isVisible ? 1 : 0,
          background: 'radial-gradient(circle, #fb923c 0%, #f97316 50%, #ea580c 100%)',
          borderRadius: '50%',
          boxShadow: isHovering 
            ? '0 0 20px #fb923c, 0 0 30px #f97316, 0 0 40px #ea580c'
            : '0 0 10px #fb923c, 0 0 20px #f97316',
          transform: `scale(${isClicking ? 0.8 : 1})`,
        }}
        aria-hidden="true"
      />

      {/* Outer glow */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - glowSize / 2,
          top: mousePosition.y - glowSize / 2,
          width: glowSize,
          height: glowSize,
          opacity: isVisible ? (isHovering ? 0.4 : 0.2) : 0,
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, rgba(249, 115, 22, 0.2) 50%, transparent 70%)',
          borderRadius: '50%',
          transform: `scale(${isHovering ? 1.2 : 1})`,
        }}
        aria-hidden="true"
      />
    </>
  );
}