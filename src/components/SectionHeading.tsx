import { motion } from "framer-motion";
import { easeOut } from "../motion";

interface Props {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  index?: string;
}

export default function SectionHeading({ id, label, title, subtitle, index }: Props) {
  const words = title.split(" ");

  return (
    <motion.header
      className="section-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.p
        className="section-label"
        variants={{
          hidden: { opacity: 0, x: -16 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut } },
        }}
      >
        {index && <span className="section-index">{index}</span>}
        <span className="section-label-line" aria-hidden="true" />
        {label}
      </motion.p>
      <h2 id={id} aria-label={title}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="word-mask" aria-hidden="true">
            <motion.span
              className="word"
              variants={{
                hidden: { y: "110%" },
                visible: {
                  y: "0%",
                  transition: { duration: 0.9, ease: easeOut, delay: 0.1 + wordIndex * 0.08 },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
      {subtitle && (
        <motion.p
          className="section-subtitle"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8, delay: 0.35 } },
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
}
