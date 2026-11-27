import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { id: "hero", label: "Home" },
  { id: "roster", label: "Roster" },
  { id: "legends", label: "Legends" },
  { id: "legacy", label: "Legacy" },
  { id: "battle-cup", label: "Battle Cup" },
  { id: "gallery", label: "Gallery" },
  { id: "comments", label: "Comments" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = links.flatMap(({ id }) => {
      const section = document.getElementById(id);
      return section ? [section] : [];
    });
    let frame = 0;

    const updateCurrent = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const offset = Math.max(96, Math.min(window.innerHeight * 0.38, 360));
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        setCurrent(sections.at(-1)?.id ?? "hero");
        return;
      }
      const section = sections.findLast((item) => item.getBoundingClientRect().top <= offset);
      setCurrent(section?.id ?? "hero");
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateCurrent);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <motion.header
      className="site-header"
      data-scrolled={scrolled}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="header-inner">
        <a className="brand" href="#hero" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="30" height="30">
              <path d="M16 2 29 9.5v13L16 30 3 22.5v-13z" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M11 22V10h6a4 4 0 0 1 0 8h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="brand-text">
            <strong>PHB</strong>
            <span>RISEN FROM THE ASHES</span>
          </span>
        </a>

        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="section-nav"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
          <span className="menu-icon" aria-hidden="true" data-open={open}>
            <span />
            <span />
          </span>
        </button>

        <nav id="section-nav" className="site-nav" aria-label="Main" data-open={open}>
          <ul>
            {links.map(({ id, label }) => (
              <li key={id}>
                <a href={"#" + id} aria-current={current === id ? "location" : undefined} onClick={() => setOpen(false)}>
                  {current === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="nav-label">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}
