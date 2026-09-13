import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function SelectField({ label, value, onChange, options, placeholder = "Select" }) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const rootRef = useRef(null);
  const listId = useId();
  const buttonId = useId();

  useEffect(() => {
    function onClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleKeyDown(e) {
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setOpen(true);
      setHighlight(Math.max(0, options.indexOf(value)));
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(options.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlight >= 0) {
        onChange(options[highlight]);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="w-full" ref={rootRef}>
      <label id={buttonId} className="mb-2 block text-sm text-mist-300">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={buttonId}
          onClick={() => {
            setOpen((o) => !o);
            setHighlight(Math.max(0, options.indexOf(value)));
          }}
          onKeyDown={handleKeyDown}
          className={`flex w-full items-center justify-between rounded-xl border bg-ink-800/70 px-4 py-3.5 text-left text-mist-100 transition-colors duration-200 ${
            open ? "border-signal-violet" : "border-mist-400/15 hover:border-mist-400/30"
          }`}
        >
          <span className={value ? "" : "text-mist-400"}>{value || placeholder}</span>
          <ChevronDown
            size={16}
            className={`text-mist-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              id={listId}
              role="listbox"
              tabIndex={-1}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-xl border border-mist-400/15 bg-ink-800 p-1.5 shadow-xl shadow-black/40"
            >
              {options.map((opt, i) => (
                <li
                  key={opt}
                  role="option"
                  aria-selected={opt === value}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-colors duration-100 ${
                    i === highlight ? "bg-signal-violet/20 text-mist-100" : "text-mist-300"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
