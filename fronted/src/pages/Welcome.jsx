import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import { Glyph } from "../components/Logo.jsx";

const lineVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.9 + i * 0.22, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Welcome({ onBegin }) {
  return (
    <motion.main
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="relative min-h-screen overflow-hidden bg-ink-900 flex items-center justify-center px-6"
    >
      <AnimatedBackground variant="field" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center gap-1.5 rounded-full border border-mist-400/20 bg-ink-800/60 px-3.5 py-1.5 text-xs text-mist-300 backdrop-blur"
        >
          <Sparkles size={13} className="text-signal-cyan" />
          An AI-modeled reading of your daily patterns
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(14px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 flex items-center gap-4"
        >
          <Glyph size={44} className="text-signal-violet" />
          <h1 className="font-display text-6xl font-medium tracking-tight text-mist-100 sm:text-7xl">
            Mindexia
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-14 max-w-md font-display text-lg italic text-mist-300 sm:text-xl"
        >
          Understand the patterns behind your mind.
        </motion.p>

        <div className="mb-14 space-y-1.5">
          {["Your habits shape your days.", "Your days shape your mind."].map((line, i) => (
            <motion.p
              key={line}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="text-base text-mist-300 sm:text-lg"
            >
              {line}
            </motion.p>
          ))}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="pt-3 text-base text-mist-100 sm:text-lg"
          >
            Let's discover what your patterns are saying.
          </motion.p>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.7 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBegin}
          className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-mist-100 px-8 py-4 font-medium text-ink-950 shadow-glow transition-shadow duration-300 hover:shadow-[0_0_80px_-10px_rgba(132,119,242,0.65)]"
        >
          <span
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            aria-hidden="true"
          />
          <span className="relative">Begin My Assessment</span>
          <ArrowRight
            size={18}
            className="relative transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.button>
      </div>
    </motion.main>
  );
}
