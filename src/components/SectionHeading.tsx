import { motion } from "framer-motion";
import { revealOnScroll } from "../motion";

interface Props {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  index?: string;
}

export default function SectionHeading({ id, label, title, subtitle, index }: Props) {
  return (
    <motion.header {...revealOnScroll} className="section-heading">
      <p className="section-label">
        {index && <span className="section-index">{index}</span>}
        {label}
      </p>
      <h2 id={id}>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.header>
  );
}
