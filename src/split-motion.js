const PRESETS = {
  /* ======================
     BASIC FADE & SLIDE
  ====================== */
  "fade-up": { opacity: 0, y: 40 },
  "fade-down": { opacity: 0, y: -40 },
  "fade-left": { opacity: 0, x: 40 },
  "fade-right": { opacity: 0, x: -40 },

  "slide-up": { y: 80 },
  "slide-down": { y: -80 },
  "slide-left": { x: 80 },
  "slide-right": { x: -80 },

  /* ======================
     SCALE / ZOOM
  ====================== */
  "zoom-in": { opacity: 0, scale: 0.6 },
  "zoom-out": { opacity: 0, scale: 1.4 },
  "scale-pop": { scale: 0.5 },
  "scale-soft": { scale: 0.85 },

  /* ======================
     ROTATE / FLIP
  ====================== */
  "rotate-in": { opacity: 0, rotate: 12 },
  "rotate-out": { opacity: 0, rotate: -12 },
  "flip-x": { opacity: 0, rotateX: 90 },
  "flip-y": { opacity: 0, rotateY: 90 },
  "spin-in": { opacity: 0, rotate: 180 },

  /* ======================
     BLUR / CINEMATIC
  ====================== */
  "blur-in": { opacity: 0, blur: 14 },
  "blur-soft": { opacity: 0, blur: 6 },
  "cinematic": {
    opacity: 0,
    y: 80,
    blur: 16,
    duration: 1.2,
    ease: "power3.out",
  },
  "hero-reveal": {
    opacity: 0,
    y: 100,
    scale: 0.9,
    blur: 20,
    duration: 1.5,
    ease: "expo.out",
  },

  /* ======================
     CHARACTER FX
  ====================== */
  "char-wave": { y: 30 },
  "char-wave-soft": { y: 15 },
  "char-jump": { y: 80, ease: "bounce.out" },
  "char-flicker": { opacity: 0 },
  "char-spiral": { rotate: 45, scale: 0.5 },

  /* ======================
     ELASTIC / BOUNCE
  ====================== */
  "elastic-pop": {
    scale: 0.5,
    ease: "elastic.out(1,0.4)",
  },
  "elastic-up": {
    y: 60,
    ease: "elastic.out(1,0.3)",
  },

  /* ======================
     LUXURY / SMOOTH
  ====================== */
  "luxury-slow": {
    opacity: 0,
    y: 30,
    duration: 1.6,
    ease: "expo.out",
  },
  "smooth-reveal": {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power4.out",
  },

  /* ======================
     3D / DEPTH
  ====================== */
  "push-z": { z: 120, scale: 0.9 },
  "pull-z": { z: -120, scale: 1.1 },
  "tilt-in": { rotateX: 45, y: 40 },

  /* ======================
     FAST / MINIMAL
  ====================== */
  "quick-in": { duration: 0.25 },
  "micro-slide": { y: 10, duration: 0.3 },
};
