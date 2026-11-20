import { useEffect, useRef, useState } from "react";

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
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = links.flatMap(({ id }) => {
      const section = document.getElementById(id);
      return section ? [section] : [];
    });
    let frame = 0;

    const updateCurrent = () => {
      frame = 0;
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
    <header
      className="site-header"
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
          <strong>PHB</strong>
          <span>RISEN FROM THE ASHES</span>
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
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
            <path d="M4 8h16M4 16h16" />
          </svg>
        </button>

        <nav id="section-nav" className="site-nav" aria-label="Main" data-open={open}>
          <ul>
            {links.map(({ id, label }) => (
              <li key={id}>
                <a href={"#" + id} aria-current={current === id ? "location" : undefined} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
