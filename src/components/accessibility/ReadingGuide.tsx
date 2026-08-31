"use client";

import { useEffect, useRef } from "react";

export function ReadingGuide() {
  const guideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (guideRef.current) {
        guideRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={guideRef}
      className="reading-guide"
      aria-hidden="true"
    />
  );
}
