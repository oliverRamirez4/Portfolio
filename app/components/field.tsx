"use client";

import { useEffect, useRef } from "react";

export function Field() {
  const shiftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    const shift = shiftRef.current;
    if (!shift) return;

    const move = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 24;
      const y = (event.clientY / window.innerHeight - 0.5) * 24;
      shift.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const reset = () => {
      shift.style.transform = "translate3d(0, 0, 0)";
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div className="field" aria-hidden="true">
      <div ref={shiftRef} className="field-shift">
        <div className="field-tile" />
        <div className="field-dots" />
      </div>
    </div>
  );
}
