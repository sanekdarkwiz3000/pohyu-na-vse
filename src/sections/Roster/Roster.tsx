import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import SectionHeading from "../../components/SectionHeading";
import { players, type Player } from "../../data/players";
import { revealOnScroll } from "../../motion";

const groups: { id: string; status: Player["status"]; label: string; title: string; subtitle?: string }[] = [
  { id: "roster", status: "ACTIVE", label: "Our Squad", title: "Active Roster" },
  { id: "legends", status: "LEGEND", label: "Eternal", title: "Legends", subtitle: "RIP Legends" },
  { id: "legacy", status: "LEGACY", label: "Hall of Fame", title: "Legacy" },
];

export default function Roster() {
  const [steamAvatars, setSteamAvatars] = useState<Record<number, string>>({});

  useEffect(() => {
    const controller = new AbortController();

    async function loadAvatars() {
      try {
        const response = await fetch("/api/steam-avatars", { signal: controller.signal });
        if (!response.ok) return;

        const avatars = await response.json() as Record<number, string>;
        if (!controller.signal.aborted) setSteamAvatars(avatars);
      } catch {
        // Keep the local portraits if the avatar endpoint is unavailable.
      }
    }

    void loadAvatars();
    return () => controller.abort();
  }, []);

  return groups.map(({ id, status, label, title, subtitle }) => {
    const members = players.filter((player) => player.status === status);
    if (members.length === 0 && status !== "ACTIVE") return null;

    return (
      <section key={id} id={id} aria-labelledby={id + "-title"} tabIndex={-1} className="section-shell" data-status={status}>
        <SectionHeading id={id + "-title"} label={label} title={title} subtitle={subtitle} />
        <ul className="player-grid">
          {members.map((player) => (
            <motion.li key={player.id} {...revealOnScroll}>
              <PlayerCard player={player} steamAvatar={steamAvatars[player.id]} />
            </motion.li>
          ))}
        </ul>
      </section>
    );
  });
}
