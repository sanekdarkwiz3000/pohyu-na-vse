import { motion } from "framer-motion";
export default function Hero() {
  return (
    <section
  id="hero"
  className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090909]"
>

      <div className="absolute h-[700px] w-[700px] rounded-full bg-violet-600/20 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="z-10 flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="mb-4 text-sm tracking-[0.6em] uppercase text-zinc-500"
        >
          EST. 2025
        </motion.p>

        <motion.h1
          initial={{ scale: .92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: .2,
            duration: .8,
          }}
          className="bg-gradient-to-r from-white via-zinc-200 to-violet-400 bg-clip-text text-center text-7xl font-black text-transparent md:text-9xl"
        >
          POHYU HA BCE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .7 }}
          className="mt-6 text-xl uppercase tracking-widest text-zinc-400"
        >
          FROM PUBS TO GREATNESS
        </motion.p>

        <motion.button
  onClick={() => {
    document
      .getElementById("roster")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 40px rgba(139,92,246,.5)",
          }}
          whileTap={{
            scale: .97,
          }}
          transition={{
            duration: .2,
          }}
          className="mt-12 rounded-xl border border-violet-500/40 px-10 py-4 text-lg font-semibold"
        >
          ENTER
        </motion.button>
      </motion.div>

    </section>
  );
}