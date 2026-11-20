import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../../components/SectionHeading";
import { revealOnScroll } from "../../motion";

const images = Array.from({ length: 16 }, (_, index) => ({
  src: "/gallery/" + (index + 1) + ".webp",
  alt: "Match " + (index + 1),
}));

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = images[index];

  const step = (direction: number) => {
    setIndex((current) => (current + direction + images.length) % images.length);
  };

  return (
    <section id="gallery" aria-labelledby="gallery-title" tabIndex={-1} className="section-shell">
      <SectionHeading id="gallery-title" label="Moments" title="Gallery" />

      <ul className="gallery-grid">
        {images.map((image, imageIndex) => (
          <motion.li key={image.src} {...revealOnScroll}>
            <button
              type="button"
              className="gallery-thumbnail"
              aria-label={"View " + image.alt}
              aria-haspopup="dialog"
              onClick={() => {
                setIndex(imageIndex);
                dialog.current?.showModal();
              }}
            >
              <img src={image.src} alt="" loading="lazy" decoding="async" />
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
            <p aria-live="polite">{index + 1} / {images.length}</p>
            <button type="button" className="icon-button" aria-label="Close gallery" onClick={() => dialog.current?.close()}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="20" height="20">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <div className="gallery-image">
            <img key={selected.src} src={selected.src} alt={selected.alt} loading="lazy" />
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
