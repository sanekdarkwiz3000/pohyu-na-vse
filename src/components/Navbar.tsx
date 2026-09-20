import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-black/40 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <button
          onClick={() => scrollTo("hero")}
          className="text-xl font-black tracking-[0.4em] transition hover:text-violet-400"
        >
          PHV
        </button>

        <nav className="flex gap-10 text-sm uppercase tracking-[0.2em] text-zinc-400">
          <button onClick={() => scrollTo("hero")} className="transition hover:text-white">
            Home
          </button>
          <button onClick={() => scrollTo("roster")} className="transition hover:text-white">
            Roster
          </button>
          <button onClick={() => scrollTo("legends")} className="transition hover:text-amber-400">
            Legends
          </button>
          <button onClick={() => scrollTo("legacy")} className="transition hover:text-white">
            Legacy
          </button>
          <button onClick={() => scrollTo("gallery")} className="transition hover:text-white">
            Gallery
          </button>
          <button onClick={() => scrollTo("comments")} className="transition hover:text-white">
            Comments
          </button>
        </nav>
      </div>
    </header>
  );
}