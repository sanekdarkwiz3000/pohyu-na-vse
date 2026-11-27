import type { Transition, Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const revealTransition: Transition = {
  duration: 0.8,
  ease: easeOut,
};

export const revealOnScroll = {
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.15 },
  transition: revealTransition,
};

/** Reveal with a delay that grows with the item's position in a list. */
export function staggeredReveal(index: number, step = 0.07) {
  return {
    ...revealOnScroll,
    transition: { ...revealTransition, delay: (index % 6) * step },
  };
}

export const letterContainer: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.045, delayChildren: delay },
  }),
};

export const letter: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -70, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOut },
  },
};
