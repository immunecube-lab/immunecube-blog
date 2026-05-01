"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      frameRef.current = null;

      const root = document.documentElement;
      const scrollable = root.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const clamped = Math.min(1, Math.max(0, progress));

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${clamped})`;
      }
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent print:hidden"
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-sky-500/70 shadow-[0_0_8px_rgba(14,165,233,0.25)] dark:bg-amber-300/70 dark:shadow-[0_0_8px_rgba(252,211,77,0.22)]"
      />
    </div>
  );
}
