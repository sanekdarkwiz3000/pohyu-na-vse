import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  { id: 1, src: "/gallery/1.webp", alt: "Match 1" },
  { id: 2, src: "/gallery/2.webp", alt: "Match 2" },
  { id: 3, src: "/gallery/3.webp", alt: "Match 3" },
  { id: 4, src: "/gallery/4.webp", alt: "Match 4" },
  { id: 5, src: "/gallery/5.webp", alt: "Match 5" },
  { id: 6, src: "/gallery/6.webp", alt: "Match 6" },
  { id: 7, src: "/gallery/7.webp", alt: "Match 7" },
  { id: 8, src: "/gallery/8.webp", alt: "Match 8" },
  { id: 9, src: "/gallery/9.webp", alt: "Match 9" },
  { id: 10, src: "/gallery/10.webp", alt: "Match 10" },
  { id: 11, src: "/gallery/11.webp", alt: "Match 11" },
  { id: 12, src: "/gallery/12.webp", alt: "Match 12" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-8 py-32">
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-sm uppercase tracking-[0.5em] text-violet-400"
      >
        Moments
      </motion.h2>

      <motion.h3
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-16 text-6xl font-black"
      >
        GALLERY
      </motion.h3>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {images.map((image) => (
          <motion.div
            key={image.id}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
            }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() => setSelectedImage(image.id)}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg transition-colors hover:border-violet-500/40"
          >
            <div className="aspect-video overflow-hidden">
              {image.src ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center border border-dashed border-white/20 text-sm text-zinc-500">
                  SCREENSHOT
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-8"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute right-8 top-8 text-3xl text-zinc-400 transition-colors hover:text-white"
            >
              ✕
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-h-[80vh] max-w-5xl"
            >
              <img
                src={images.find((img) => img.id === selectedImage)?.src}
                alt={images.find((img) => img.id === selectedImage)?.alt}
                className="max-h-[80vh] w-full rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}