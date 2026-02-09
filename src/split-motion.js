(function (window) {
  if (!window.gsap || !window.SplitText) {
    console.warn("[SplitMotion] GSAP or SplitText missing");
    return;
  }

  gsap.registerPlugin(SplitText, ScrollTrigger);

  function init(root = document) {
    const elements = root.querySelectorAll("[data-split]");

    elements.forEach((el) => {
      if (el.__splitAnimated) return; // prevent double init
      el.__splitAnimated = true;

      const mode = el.dataset.mode ?? "words";
      const split = new SplitText(el, { type: mode });

      const targets =
        mode === "chars"
          ? split.chars
          : mode === "lines"
          ? split.lines
          : split.words;

      const config = {
        opacity: Number(el.dataset.opacity ?? 0),
        x: Number(el.dataset.x ?? 0),
        y: Number(el.dataset.y ?? 40),
        z: Number(el.dataset.z ?? 0),
        scale: Number(el.dataset.scale ?? 1),
        rotate: Number(el.dataset.rotate ?? 0),
        rotateX: Number(el.dataset.rotateX ?? 0),
        rotateY: Number(el.dataset.rotateY ?? 0),
        duration: Number(el.dataset.duration ?? 0.4),
        delay: Number(el.dataset.delay ?? 0),
        stagger: Number(el.dataset.stagger ?? 0.08),
        ease: el.dataset.ease ?? "power2.out",
        filter: `blur(${el.dataset.blur ?? 6}px)`,
      };

      if (el.dataset.scroll !== "false") {
        config.scrollTrigger = {
          trigger: el,
          start: el.dataset.start ?? "top 80%",
          end: el.dataset.end ?? "bottom top",
        };
      }

      gsap.from(targets, config);
    });
  }

  window.SplitMotion = { init };
})(window);
