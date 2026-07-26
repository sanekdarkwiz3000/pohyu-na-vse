import { motion } from "framer-motion";
import type { Player } from "../../data/players";

interface Props {
  player: Player;
}

export default function PlayerCard({ player }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition duration-300 hover:border-violet-500/40 hover:bg-white/10"
    >
      <div className="flex items-start justify-between">
        <div>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wider ${
              player.status === "ACTIVE"
                ? "bg-green-500/20 text-green-300"
                : "bg-zinc-700 text-zinc-300"
            }`}
          >
            {player.status}
          </span>

          <h2 className="mt-5 text-4xl font-black">
            {player.nickname}
          </h2>

          <p className="mt-2 text-zinc-400">
            {player.role}
          </p>

          <div className="mt-8 flex gap-8">
            <div>
              <p className="text-xs uppercase text-zinc-500">
                Rank
              </p>
              <h3 className="mt-2 text-xl font-bold">
                {player.rank}
              </h3>
            </div>

            {player.mmr && (
              <div>
                <p className="text-xs uppercase text-zinc-500">
                  MMR
                </p>
                <h3 className="mt-2 text-xl font-bold">
                  {player.mmr}
                </h3>
              </div>
            )}
          </div>

          {/* Соцсети */}
          <div className="mt-8 flex gap-3">
            {player.dotabuff && (
              <motion.a
                href={player.dotabuff}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Dotabuff
              </motion.a>
            )}

            {player.steam && (
              <motion.a
                href={player.steam}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400 transition-colors hover:bg-blue-500/20 hover:text-blue-300"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                Steam
              </motion.a>
            )}
          </div>
        </div>

        <div className="h-48 w-40 overflow-hidden rounded-2xl">
  {player.avatar ? (
    <img
      src={player.avatar}
      alt={player.nickname}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center border border-dashed border-white/20 text-zinc-500">
      ART
    </div>
  )}
</div>
      </div>
    </motion.div>
  );
}