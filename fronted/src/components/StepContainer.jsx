import { motion } from "framer-motion";

export default function StepContainer({ children, direction = 1, stepKey }) {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: 24 * direction }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 * direction }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
