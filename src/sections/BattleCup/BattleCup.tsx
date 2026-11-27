import { motion } from "framer-motion";
import SectionHeading from "../../components/SectionHeading";
import { staggeredReveal } from "../../motion";

const matchIds = ["8786201943", "9007095707", "8995923385"];

export default function BattleCup() {
  return (
    <section
      id="battle-cup"
      aria-labelledby="battle-cup-title"
      tabIndex={-1}
      className="section-shell battle-cup"
    >
      <SectionHeading id="battle-cup-title" label="Battle Cup" title="Legendary Victories" index="04" />

      <ol className="battle-cup-grid" role="list">
        {matchIds.map((matchId, index) => {
          const victory = `Victory ${index + 1}`;

          return (
            <motion.li key={matchId} {...staggeredReveal(index, 0.12)} className="battle-cup-card">
              <span className="cup-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className="cup-shine" aria-hidden="true" />
              <div className="cup-head">
                <div>
                  <p className="cup-kicker">The International Battle Cup</p>
                  <h3>{victory}</h3>
                  <p className="cup-match">Match #{matchId}</p>
                </div>
                <div className="battle-cup-trophy">
                  <img src="/gallery/3.webp" alt="" width="1919" height="1079" loading="lazy" decoding="async" />
                </div>
              </div>
              <a
                href={`https://www.dotabuff.com/matches/${matchId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button"
                aria-label={`View on Dotabuff (${victory}, opens in a new tab)`}
              >
                <img src="/dotabuff.png" alt="" width="18" height="18" />
                <span>View on Dotabuff</span>
              </a>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
