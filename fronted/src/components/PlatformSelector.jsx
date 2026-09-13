import { motion } from "framer-motion";
import {
  Camera,
  Users,
  Briefcase,
  Ghost,
  Feather,
  PlayCircle,
  Music2,
  MessageCircle,
  Globe2,
  Phone,
  MessageSquare,
} from "lucide-react";
import { PLATFORM_OPTIONS } from "../constants.js";

// Neutral, generic glyphs per platform — deliberately not brand marks.
const ICONS = {
  Facebook: Users,
  LinkedIn: Briefcase,
  Instagram: Camera,
  Snapchat: Ghost,
  Twitter: Feather,
  YouTube: PlayCircle,
  TikTok: Music2,
  LINE: MessageCircle,
  KakaoTalk: MessageCircle,
  VKontakte: Globe2,
  WhatsApp: Phone,
  WeChat: MessageSquare,
};

export default function PlatformSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4" role="radiogroup" aria-label="Most used platform">
      {PLATFORM_OPTIONS.map((platform) => {
        const Icon = ICONS[platform];
        const selected = value === platform;
        return (
          <motion.button
            key={platform}
            type="button"
            role="radio"
            aria-checked={selected}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(platform)}
            className={`relative flex flex-col items-center gap-2 rounded-xl border px-2 py-4 text-xs transition-colors duration-200 ${
              selected
                ? "border-signal-violet bg-signal-violet/10 text-mist-100"
                : "border-mist-400/12 text-mist-300 hover:border-mist-400/30"
            }`}
          >
            {selected && (
              <motion.span
                layoutId="platform-glow"
                className="pointer-events-none absolute inset-0 rounded-xl shadow-glow"
                transition={{ duration: 0.3 }}
              />
            )}
            <Icon size={20} className={selected ? "text-signal-violet" : "text-mist-400"} />
            <span className="relative">{platform}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
