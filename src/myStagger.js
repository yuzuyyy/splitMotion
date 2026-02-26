// myStagger.min.js
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('[data-stagger]').forEach(parent => {
  const children = Array.from(parent.children);
  if (!children.length) return;

  const x = parent.dataset.x ? Number(parent.dataset.x) : 0;
  const y = parent.dataset.y ? Number(parent.dataset.y) : 0;
  const opacity = parent.dataset.opacity !== undefined ? Number(parent.dataset.opacity) : 0;
  const stagger = parent.dataset.stagger ? Number(parent.dataset.stagger) : 0.1;
  const delay = parent.dataset.delay ? Number(parent.dataset.delay) : 0;
  const start = parent.dataset.start || "top 80%";

  gsap.from(children, {
    x,
    y,
    opacity,
    stagger,
    delay,
    scrollTrigger: {
      trigger: parent,
      start,
    },
  });
});

// hendzzz