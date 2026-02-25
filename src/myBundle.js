// Import semua module dari CDN original
import "https://cdn.jsdelivr.net/gh/yuzuyyy/splitMotion@master/dist/split-motion.min.js";
import "https://cdn.jsdelivr.net/gh/yuzuyyy/splitMotion@master/dist/scramble.min.js";
import "https://cdn.jsdelivr.net/gh/yuzuyyy/splitMotion@master/dist/pixelTwo.min.js";
import "https://cdn.jsdelivr.net/gh/yuzuyyy/splitMotion@master/dist/marquee.min.js";

// Optional: expose global object supaya aman
window.SplitMotionBundle = {
  SplitMotion: window.SplitMotion,
  Scramble: window.Scramble,
  PixelTwo: window.PixelTwo,
  Marquee: window.Marquee
};