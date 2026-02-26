// hendriawan.min.js FINAL FIXED VERSION
(function () {

    if (!window.gsap) {
      console.warn("GSAP tidak ditemukan");
      return;
    }
  
    const { gsap } = window;
    const { ScrollTrigger, SplitText, ScrambleTextPlugin } = window;
  
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (SplitText) gsap.registerPlugin(SplitText);
    if (ScrambleTextPlugin) gsap.registerPlugin(ScrambleTextPlugin);
  
    /* =========================================================
       SPLIT MOTION PRESETS
    ========================================================= */
  
    const PRESETS = {
      "fade-up": { opacity: 0, y: 40 },
      "fade-down": { opacity: 0, y: -40 },
      "fade-left": { opacity: 0, x: 40 },
      "fade-right": { opacity: 0, x: -40 },
      "slide-up": { y: 80 },
      "slide-down": { y: -80 },
      "slide-left": { x: 80 },
      "slide-right": { x: -80 },
      "zoom-in": { opacity: 0, scale: 0.6 },
      "zoom-out": { opacity: 0, scale: 1.4 },
      "blur-in": { opacity: 0, blur: 14 },
      "hero": {
        opacity: 0,
        y: 100,
        blur: 12,
        scale: 0.95,
        duration: 1.6,
        ease: "power4.out",
        stagger: 0.03
      }
    };
  
    /* =========================================================
       SPLIT MOTION INIT
    ========================================================= */
  
    function initSplitMotion(root = document) {
  
      if (!SplitText) return;
  
      root.querySelectorAll("[data-split]").forEach(el => {
  
        if (el.__SplitMotionInit) return;
        el.__SplitMotionInit = true;
  
        const mode = el.dataset.mode || "words";
  
        const split = new SplitText(el, { type: mode });
  
        const targets =
          mode === "chars" ? split.chars :
          mode === "lines" ? split.lines :
          split.words;
  
        let preset = {};
  
        for (const name in PRESETS) {
          if (el.hasAttribute(`data-${name}`)) {
            preset = PRESETS[name];
            break;
          }
        }
  
        const from = {
          opacity: Number(el.dataset.opacity ?? preset.opacity ?? 0),
          x: Number(el.dataset.x ?? preset.x ?? 0),
          y: Number(el.dataset.y ?? preset.y ?? 0),
          scale: Number(el.dataset.scale ?? preset.scale ?? 1),
          filter: `blur(${Number(el.dataset.blur ?? preset.blur ?? 0)}px)`
        };
  
        const to = {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: Number(el.dataset.duration ?? preset.duration ?? 0.6),
          stagger: Number(el.dataset.stagger ?? preset.stagger ?? 0.08),
          ease: el.dataset.ease ?? preset.ease ?? "power2.out"
        };
  
        if (ScrollTrigger && el.dataset.scroll !== "false") {
  
          to.scrollTrigger = {
            trigger: el,
            start: el.dataset.start || "top 85%",
            toggleActions: "play none none none"
          };
  
        }
  
        gsap.set(targets, from);
  
        const tween = gsap.to(targets, to);
  
        const rect = el.getBoundingClientRect();
  
        if (rect.top < window.innerHeight) {
          tween.play();
        }
  
      });
  
    }
  
    /* =========================================================
       MARQUEE TRACK
    ========================================================= */
  
    function initMarquee() {
  
      const track = document.getElementById("track");
  
      if (!track) return;
  
      let position = 0;
      let speed = 1.5;
      let targetSpeed = 1.5;
  
      track.addEventListener("mouseenter", () => targetSpeed = 0.15);
      track.addEventListener("mouseleave", () => targetSpeed = 1.5);
  
      function animate() {
  
        speed += (targetSpeed - speed) * 0.05;
  
        position -= speed;
  
        const halfWidth = track.scrollWidth / 2;
  
        if (Math.abs(position) >= halfWidth) {
          position = 0;
        }
  
        track.style.transform = `translateX(${position}px)`;
  
        requestAnimationFrame(animate);
  
      }
  
      animate();
  
    }
  
    /* =========================================================
       SCRAMBLE TEXT
    ========================================================= */
  
    function initScramble() {
  
      if (!ScrambleTextPlugin) return;
  
      document.querySelectorAll("[data-scramble]").forEach(el => {
  
        gsap.to(el, {
  
          duration: Number(el.dataset.duration ?? 1),
  
          scrambleText: {
            text: el.dataset.text ?? el.textContent,
            chars: el.dataset.chars ?? "@#$*?:"
          },
  
          scrollTrigger: ScrollTrigger ? {
            trigger: el,
            start: "top 80%"
          } : null
  
        });
  
      });
  
    }
  
    /* =========================================================
       PIXEL EFFECT FOR IMG[data-pixel]  <-- TAMBAHAN ANDA
    ========================================================= */
  
    function initPixelImages() {
  
      const DEFAULT_GRID = 12;
  
      document.querySelectorAll("img[data-pixel]").forEach(img => {
  
        if (img.__pixelInit) return;
        img.__pixelInit = true;
  
        const gridSize =
          Math.max(1, parseInt(img.dataset.grid, 10) || DEFAULT_GRID);
  
        const totalPixels = gridSize * gridSize;
  
        const wrapper = document.createElement("div");
        wrapper.className = "image_wrapper";
  
        if (!img.parentNode) return;
  
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
  
        const content = document.createElement("div");
        content.className = "pixel_content";
        content.textContent = img.dataset.text || "";
        content.style.color = img.dataset.textColor || "#fff";
  
        wrapper.appendChild(content);
  
        const grid = document.createElement("div");
        grid.className = "pixel_grid";
  
        grid.style.setProperty(
          "--pixel-color",
          img.dataset.color || "#fff"
        );
  
        grid.style.gridTemplateColumns =
          `repeat(${gridSize}, 1fr)`;
  
        grid.style.gridTemplateRows =
          `repeat(${gridSize}, 1fr)`;
  
        wrapper.appendChild(grid);
  
        const fragment = document.createDocumentFragment();
  
        for (let i = 0; i < totalPixels; i++) {
  
          const pixel = document.createElement("div");
  
          pixel.style.opacity = "1";
  
          fragment.appendChild(pixel);
  
        }
  
        grid.appendChild(fragment);
  
        const pixels = Array.from(grid.children);
  
        const duration =
          Math.max(0.01, parseFloat(img.dataset.duration) || 0.3);
  
        const once = img.dataset.once !== "false";
  
        const tl = gsap.timeline({
          paused: true
        });
  
        tl.to(pixels, {
          opacity: 0,
          duration,
          stagger: {
            each: 0.005,
            from: "random"
          }
        });
  
        if (img.hasAttribute("data-hover")) {
  
          wrapper.addEventListener("mouseenter", () => tl.restart());
  
          wrapper.addEventListener("mouseleave", () => {
  
            tl.pause(0);
  
            gsap.set(pixels, { opacity: 1 });
  
          });
  
        }
  
        else if (ScrollTrigger) {
  
          ScrollTrigger.create({
  
            trigger: wrapper,
            start: "top 75%",
            once,
  
            onEnter: () => tl.restart(),
  
            onEnterBack: () => {
  
              if (!once) {
  
                gsap.set(pixels, { opacity: 1 });
  
                tl.restart();
  
              }
  
            }
  
          });
  
        }
  
      });
  
    }
  
    /* =========================================================
       STAGGER
    ========================================================= */
  
    function initStagger() {
  
      document.querySelectorAll("[data-stagger]").forEach(parent => {
  
        gsap.from(parent.children, {
  
          y: Number(parent.dataset.y ?? 40),
  
          opacity: Number(parent.dataset.opacity ?? 0),
  
          stagger: Number(parent.dataset.stagger ?? 0.1),
  
          scrollTrigger: ScrollTrigger ? {
            trigger: parent,
            start: parent.dataset.start ?? "top 80%"
          } : null
  
        });
  
      });
  
    }
  
    /* =========================================================
       GLOBAL INIT
    ========================================================= */
  
    function init() {
  
      initSplitMotion();
      initMarquee();
      initScramble();
      initPixelImages();
      initStagger();
  
    }
  
    if (document.readyState === "loading") {
  
      document.addEventListener("DOMContentLoaded", init);
  
    } else {
  
      init();
  
    }
  
    window.SplitMotion = { init };
  
  })();