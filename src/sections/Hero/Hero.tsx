import { motion } from "framer-motion";
import { easeOut, fadeUp } from "../../motion";

const stats = [
  { value: "3×", label: "Battle Cup" },
  { value: "2–0", label: "Финал" },
  { value: "2026", label: "Основаны" },
];

const lines = ["POHYU", "HA BCE"];

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" tabIndex={-1} className="hero">
      <div className="hero-layout">
        <div className="hero-content">
          <motion.p className="eyebrow" {...fadeUp(0.1)}>
            <span className="eyebrow-dot" aria-hidden="true" />
            3-кратные чемпионы The International Battle Cup
          </motion.p>

          <h1 id="hero-title" aria-label="POHYU HA BCE">
            {lines.map((line, index) => (
              <span key={line} className="line-mask" aria-hidden="true">
                <motion.span
                  className="line"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease: easeOut, delay: 0.2 + index * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="hero-lead" {...fadeUp(0.55)}>
            Risen from the ashes. Состав, легенды, победы и лучшие моменты команды.
          </motion.p>

          <motion.div className="hero-actions" {...fadeUp(0.65)}>
            <a className="button button-primary" href="#roster">
              Состав
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M12 5v14m-5-5 5 5 5-5" />
              </svg>
            </a>
            <a className="button button-ghost" href="#battle-cup">
              Победы
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M5 12h14m-5-5 5 5-5 5" />
              </svg>
            </a>
          </motion.div>

          <motion.dl className="hero-stats" {...fadeUp(0.8)}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.figure
          className="hero-visual"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: easeOut, delay: 0.25 }}
        >
          <img
            src="/team-poster.jpg"
            width="1440"
            height="960"
            alt="PHB team lifting a trophy onstage"
            fetchPriority="high"
          />
          <figcaption>
            <span>Финал</span>
            <strong>POHYU HA BCE 2–0 БАШМАК</strong>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
