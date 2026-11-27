import { useState, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Player } from "../../data/players";

interface Props {
  player: Player;
  steamAvatar?: string;
}

const canHover = typeof window !== "undefined"
  && window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;

export default function PlayerCard({ player, steamAvatar }: Props) {
  const [failedSteamAvatar, setFailedSteamAvatar] = useState<string>();
  const currentSteamAvatar = steamAvatar !== failedSteamAvatar ? steamAvatar : undefined;
  const avatar = currentSteamAvatar ?? player.avatar;

  // Pointer position inside the card, from -0.5 to 0.5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), spring);

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (!canHover) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    px.set(x - 0.5);
    py.set(y - 0.5);
    event.currentTarget.style.setProperty("--spot-x", x * 100 + "%");
    event.currentTarget.style.setProperty("--spot-y", y * 100 + "%");
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.article
      className="player-card"
      data-status={player.status}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <span className="card-spotlight" aria-hidden="true" />
      <span className="card-border" aria-hidden="true" />

      <div className="player-info">
        <p className="player-status">
          <span className="status-dot" aria-hidden="true" />
          {player.status}
        </p>
        <h3>{player.nickname}</h3>
        <p className="player-role">{player.role}</p>

        {(player.rank || player.mmr) && (
          <dl className="player-stats">
            {player.rank && <div><dt>Rank</dt><dd>{player.rank}</dd></div>}
            {player.mmr && <div><dt>MMR</dt><dd>{player.mmr}</dd></div>}
          </dl>
        )}
      </div>

      {avatar && (
        <div className="player-image">
          <img
            src={avatar}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={currentSteamAvatar ? () => setFailedSteamAvatar(currentSteamAvatar) : undefined}
          />
        </div>
      )}

      {(player.dotabuff || player.steam) && (
        <div className="player-links">
          {player.dotabuff && (
            <a href={player.dotabuff} target="_blank" rel="noopener noreferrer">
              <img src="/dotabuff.png" alt="" width="16" height="16" />
              Dotabuff
              <span className="link-arrow" aria-hidden="true">↗</span>
            </a>
          )}
          {player.steam && (
            <a href={player.steam} target="_blank" rel="noopener noreferrer">
              <img src="/steam.png" alt="" width="16" height="16" />
              Steam
              <span className="link-arrow" aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}
