import { motion } from "framer-motion";
import { revealTransition } from "../../motion";

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" tabIndex={-1} className="hero">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={revealTransition}
        className="hero-layout"
      >
        <div className="hero-content">
          <p className="hero-date">EST. 2026</p>
          <h1 id="hero-title">POHYU HA BCE</h1>
          <div className="hero-actions">
            <a className="primary-button" href="#roster">
              ENTER
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M12 5v14m-5-5 5 5 5-5" />
              </svg>
            </a>
            <a className="primary-button hero-battle-link" href="#battle-cup">
              BATTLE CUP
            </a>
          </div>
        </div>
        <img
          className="hero-poster"
          src="/team-poster.jpg"
          width="1440"
          height="960"
          alt="PHB team lifting a trophy onstage"
          fetchPriority="high"
        />
      </motion.div>
    </section>
  );
}
