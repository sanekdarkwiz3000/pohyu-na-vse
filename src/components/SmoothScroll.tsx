import { useEffect } from "react";
import Lenis from "lenis";

/** Inertial page scrolling. Skipped when the visitor prefers reduced motion. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -80 },
      // Let dialogs and anything marked with data-lenis-prevent scroll natively.
      prevent: (node) => node.closest("dialog") !== null,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Freeze page scrolling while a modal dialog is open.
    const observer = new MutationObserver(() => {
      if (document.querySelector("dialog[open]")) lenis.stop();
      else lenis.start();
    });
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
