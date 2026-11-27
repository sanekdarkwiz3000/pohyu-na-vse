import { useState } from "react";
import type { Player } from "../../data/players";

interface Props {
  player: Player;
  steamAvatar?: string;
}

export default function PlayerCard({ player, steamAvatar }: Props) {
  const [failedSteamAvatar, setFailedSteamAvatar] = useState<string>();
  const currentSteamAvatar = steamAvatar !== failedSteamAvatar ? steamAvatar : undefined;
  const avatar = currentSteamAvatar ?? player.avatar;

  return (
    <article className="player-card" data-status={player.status}>
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

      <div className="player-info">
        <p className="player-status">
          <span className="status-dot" aria-hidden="true" />
          {player.status}
        </p>
        <h3>{player.nickname}</h3>
        <p className="player-role">{player.role}</p>
      </div>

      {(player.rank || player.mmr) && (
        <dl className="player-stats">
          {player.rank && <div><dt>Rank</dt><dd>{player.rank}</dd></div>}
          {player.mmr && <div><dt>MMR</dt><dd>{player.mmr}</dd></div>}
        </dl>
      )}

      {(player.dotabuff || player.steam) && (
        <div className="player-links">
          {player.dotabuff && (
            <a href={player.dotabuff} target="_blank" rel="noopener noreferrer">
              <img src="/dotabuff.png" alt="" width="14" height="14" />
              Dotabuff
            </a>
          )}
          {player.steam && (
            <a href={player.steam} target="_blank" rel="noopener noreferrer">
              <img src="/steam.png" alt="" width="14" height="14" />
              Steam
            </a>
          )}
        </div>
      )}
    </article>
  );
}
