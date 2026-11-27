import type { Transition } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const revealTransition: Transition = {
  duration: 0.7,
  ease: easeOut,
};

/** Soft fade-up used across the page. Animates only opacity and transform. */
export const revealOnScroll = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: revealTransition,
};

/** Same reveal with a small delay based on the item's position in a row. */
export function staggeredReveal(index: number, step = 0.06) {
  return {
    ...revealOnScroll,
    transition: { ...revealTransition, delay: (index % 3) * step },
  };
}

export function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: easeOut, delay },
  };
}
