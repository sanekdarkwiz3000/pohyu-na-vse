import { motion } from "framer-motion";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import { players } from "../../data/players";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Roster() {
  const activePlayers = players.filter(
    (player) => player.status === "ACTIVE"
  );
  const legendPlayers = players.filter(
    (player) => player.status === "LEGEND"
  );
  const legacyPlayers = players.filter(
    (player) => player.status === "LEGACY"
  );

  return (
    <>
      {/* Active Roster */}
      <section id="roster" className="mx-auto max-w-7xl px-8 py-32">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm uppercase tracking-[0.5em] text-violet-400"
        >
          Our Squad
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 text-6xl font-black"
        >
          ACTIVE ROSTER
        </motion.h3>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8"
        >
          {activePlayers.map((player) => (
            <motion.div key={player.id} variants={itemVariants}>
              <PlayerCard player={player} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Legends */}
      {legendPlayers.length > 0 && (
        <section id="legends" className="mx-auto max-w-7xl px-8 py-32">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-sm uppercase tracking-[0.5em] text-amber-400"
          >
            Eternal
          </motion.h3>

          <motion.h4
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-6xl font-black text-amber-300"
          >
            LEGENDS
          </motion.h4>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 text-2xl font-bold uppercase tracking-[0.3em] text-amber-400/60"
          >
            RIP Legends
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-8"
          >
            {legendPlayers.map((player) => (
              <motion.div key={player.id} variants={itemVariants}>
                <PlayerCard player={player} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Legacy Roster */}
      {legacyPlayers.length > 0 && (
        <section id="legacy" className="mx-auto max-w-7xl px-8 py-32">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-sm uppercase tracking-[0.5em] text-zinc-500"
          >
            Hall of Fame
          </motion.h3>

          <motion.h4
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16 text-6xl font-black text-zinc-400"
          >
            LEGACY
          </motion.h4>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-8"
          >
            {legacyPlayers.map((player) => (
              <motion.div key={player.id} variants={itemVariants}>
                <PlayerCard player={player} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}
    </>
  );
}