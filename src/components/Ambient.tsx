import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Page-wide decoration: scroll progress bar, film grain and a pointer glow. */
export default function Ambient() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      root.style.setProperty("--pointer-x", x + "px");
      root.style.setProperty("--pointer-y", y + "px");
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
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
      <div className="pointer-glow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
