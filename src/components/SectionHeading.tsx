import { motion } from "framer-motion";
import { revealOnScroll } from "../motion";

interface Props {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ id, label, title, subtitle }: Props) {
  return (
    <motion.header {...revealOnScroll} className="section-heading">
      <p className="section-label">{label}</p>
      <h2 id={id}>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.header>
  );
}
