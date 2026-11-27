import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "../../components/SectionHeading";
import { easeOut, staggeredReveal } from "../../motion";

const images = Array.from({ length: 16 }, (_, index) => ({
  src: "/gallery/" + (index + 1) + ".webp",
  // Small copies for the grid; the viewer loads the full-size original.
  thumb: "/gallery/thumbs/" + (index + 1) + ".webp",
  alt: "Match " + (index + 1),
}));

const slide = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 24 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -24 }),
};

export default function Gallery() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = images[index];

  const step = (delta: number) => {
    setState(([current]) => [(current + delta + images.length) % images.length, delta]);
  };

  return (
    <section id="gallery" aria-labelledby="gallery-title" tabIndex={-1} className="section-shell">
      <SectionHeading id="gallery-title" label="Moments" title="Gallery" index="05" />

      <ul className="gallery-grid">
        {images.map((image, imageIndex) => (
          <motion.li key={image.src} {...staggeredReveal(imageIndex)}>
            <button
              type="button"
              className="gallery-thumbnail"
              aria-label={"View " + image.alt}
              aria-haspopup="dialog"
              onClick={() => {
                setState([imageIndex, 0]);
                dialog.current?.showModal();
              }}
            >
              <img src={image.thumb} alt="" loading="lazy" decoding="async" />

            </button>
          </motion.li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="site-dialog gallery-dialog"
        aria-label="Gallery viewer"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            step(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div className="gallery-viewer">
          <div className="gallery-toolbar">
            <p aria-live="polite">
              <strong>{String(index + 1).padStart(2, "0")}</strong> / {images.length}
            </p>
            <button type="button" className="icon-button" aria-label="Close gallery" onClick={() => dialog.current?.close()}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="20" height="20">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <div className="gallery-image">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={selected.src}
                src={selected.src}
                alt={selected.alt}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: easeOut }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) step(1);
                  else if (info.offset.x > 80) step(-1);
                }}
                draggable={false}
              />
            </AnimatePresence>
          </div>
          <div className="gallery-progress" aria-hidden="true">
            <motion.span
              animate={{ scaleX: (index + 1) / images.length }}
              transition={{ duration: 0.5, ease: easeOut }}
            />
          </div>
          <div className="gallery-controls">
            <button type="button" className="icon-button" aria-label="Previous image" onClick={() => step(-1)}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="20" height="20">
                <path d="m14 6-6 6 6 6" />
              </svg>
            </button>
            <button type="button" className="icon-button" aria-label="Next image" onClick={() => step(1)}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="20" height="20">
                <path d="m10 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
