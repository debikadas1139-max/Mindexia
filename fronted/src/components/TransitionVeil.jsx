import { motion, AnimatePresence } from "framer-motion";

/**
 * A brief full-screen veil that sweeps over the viewport between routes.
 * It reads as one continuous space folding rather than two documents
 * swapping — a soft radial bloom rather than a hard cut.
 */
export default function TransitionVeil({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none bg-ink-950"
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(140% at 50% 50%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="h-2 w-2 rounded-full bg-signal-violet"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 60, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
