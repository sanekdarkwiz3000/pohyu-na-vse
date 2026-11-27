import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionStyle } from "framer-motion";
import { easeOut, letter, letterContainer } from "../../motion";

const titleLines = ["POHYU", "HA BCE"];

const stats = [
  { value: "3×", label: "Battle Cup" },
  { value: "2–0", label: "Финал" },
  { value: "2026", label: "Est." },
];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: easeOut, delay },
  };
}

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const posterY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 120, damping: 20, mass: 0.6 };
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), spring);
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), spring);
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section ref={section} id="hero" aria-labelledby="hero-title" tabIndex={-1} className="hero">
      <div className="hero-backdrop" aria-hidden="true">
        <span className="orb orb-violet" />
        <span className="orb orb-gold" />
        <span className="hero-grid" />
      </div>

      <div className="hero-layout">
        <motion.div className="hero-content" style={{ y: contentY, opacity: fade }}>
          <motion.p className="hero-badge" {...fadeUp(0.1)}>
            <span className="badge-dot" aria-hidden="true" />
            3-кратные чемпионы The International Battle Cup
          </motion.p>

          <motion.h1
            id="hero-title"
            aria-label="POHYU HA BCE"
            variants={letterContainer}
            initial="hidden"
            animate="visible"
            custom={0.25}
          >
            {titleLines.map((line, lineIndex) => (
              <span key={line} className="hero-line" aria-hidden="true">
                {[...line].map((char, charIndex) => (
                  <motion.span key={lineIndex + "-" + charIndex} className="hero-letter" variants={letter} style={{ "--t": charIndex / Math.max(1, line.length - 1) } as MotionStyle}>
                    {char === " " ? " " : char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p className="hero-lead" {...fadeUp(0.9)}>
            Risen from the ashes. Состав, легенды, победы и лучшие моменты команды.
          </motion.p>

          <motion.div className="hero-actions" {...fadeUp(1.05)}>
            <a className="primary-button" href="#roster">
              <span>Состав</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M12 5v14m-5-5 5 5 5-5" />
              </svg>
            </a>
            <a className="ghost-button" href="#battle-cup">
              <span>Battle Cup</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M5 12h14m-5-5 5 5-5 5" />
              </svg>
            </a>
          </motion.div>

          <motion.dl className="hero-stats" {...fadeUp(1.2)}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="hero-visual"
          style={{ y: posterY }}
          onPointerMove={handleMove}
          onPointerLeave={() => {
            px.set(0);
            py.set(0);
          }}
        >
          <motion.div
            className="hero-poster-frame"
            initial={{ opacity: 0, scale: 0.92, clipPath: "inset(12% 12% 12% 12% round 2rem)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
            transition={{ duration: 1.4, ease: easeOut, delay: 0.35 }}
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
          >
            <img
              className="hero-poster"
              src="/team-poster.jpg"
              width="1440"
              height="960"
              alt="PHB team lifting a trophy onstage"
              fetchPriority="high"
            />
            <motion.span className="hero-glare" style={{ "--glare-x": glareX } as MotionStyle} aria-hidden="true" />
          </motion.div>
          <motion.div
            className="hero-chip"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 1.3 }}
          >
            <span className="chip-trophy" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4m-4 3h8l-1-3H9z" /></svg></span>
            <span>
              <strong>Финал 2–0</strong>
              <small>vs БАШМАК</small>
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#roster"
        className="scroll-cue"
        aria-label="Прокрутить к составу"
        style={{ opacity: fade }}

      >
        <span />
      </motion.a>
    </section>
  );
}
