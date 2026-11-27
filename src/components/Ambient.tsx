import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Page-wide decoration: scroll progress bar, film grain and a pointer glow. */
export default function Ambient() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = glow.current;
    if (!element || !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;

    // Move a pre-painted gradient with transform only, so the page never repaints.
    const apply = () => {
      frame = 0;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      element.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="pointer-glow-layer" aria-hidden="true">
        <div ref={glow} className="pointer-glow" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
