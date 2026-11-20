import { motion } from "framer-motion";
import SectionHeading from "../../components/SectionHeading";
import { revealOnScroll } from "../../motion";

const matchIds = ["8786201943", "9007095707", "8995923385"];

export default function BattleCup() {
  return (
    <section
      id="battle-cup"
      aria-labelledby="battle-cup-title"
      tabIndex={-1}
      className="section-shell battle-cup"
    >
      <SectionHeading id="battle-cup-title" label="Battle Cup" title="Legendary Victories" />

      <ol className="battle-cup-grid" role="list">
        {matchIds.map((matchId, index) => {
          const victory = `Victory ${index + 1}`;

          return (
            <motion.li key={matchId} {...revealOnScroll} className="battle-cup-card">
              <div>
                <h3>{victory}</h3>
                <p>Match #{matchId}</p>
              </div>
              <div className="battle-cup-trophy">
                <img src="/gallery/3.webp" alt="" width="1919" height="1079" loading="lazy" decoding="async" />
              </div>
              <a
                href={`https://www.dotabuff.com/matches/${matchId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button"
                aria-label={`View on Dotabuff (${victory}, opens in a new tab)`}
              >
                <img src="/dotabuff.png" alt="" width="18" height="18" />
                View on Dotabuff
              </a>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
