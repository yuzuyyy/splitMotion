

gsap.registerPlugin(ScrollTrigger);

const commonST = (el) => ({
    trigger: el,
    start: "top 85%"
});

const presets = {

    /* 1 */
    "mask-right": (el) => gsap.fromTo(
        el.querySelector("img"),
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "expo.inOut", scrollTrigger: commonST(el) }
    ),

    /* 2 */
    "mask-bottom": (el) => gsap.fromTo(
        el.querySelector("img"),
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0% 0 0)", duration: 1.5, ease: "expo.inOut", scrollTrigger: commonST(el) }
    ),

    /* 3 */
    "circle-in": (el) => gsap.fromTo(
        el.querySelector("img"),
        { clipPath: "circle(0% at 50% 50%)" },
        { clipPath: "circle(75% at 50% 50%)", duration: 1.5, ease: "power4.inOut", scrollTrigger: commonST(el) }
    ),

    /* 4 */
    "poly-diamond": (el) => gsap.fromTo(
        el.querySelector("img"),
        { clipPath: "polygon(50% 50%,50% 50%,50% 50%,50% 50%)" },
        { clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: commonST(el) }
    ),

    /* 5 */
    "double-side": (el) => {
        const img = el.querySelector("img");
        gsap.fromTo(img,
            { clipPath: "inset(0 50% 0 50%)" },
            { clipPath: "inset(0 0% 0 0%)", duration: 1.5, ease: "power4.inOut", scrollTrigger: commonST(el) });
    },

    /* 6 */
    "diag-slice": (el) => gsap.fromTo(
        el.querySelector("img"),
        { clipPath: "polygon(0 0,0 0,0 100%,0 100%)" },
        { clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: commonST(el) }
    ),

    /* 7 */
    "inset-zoom": (el) => gsap.from(
        el.querySelector("img"),
        { scale: 1.4, opacity: 0, duration: 1.6, ease: "power3.out", scrollTrigger: commonST(el) }
    ),

    /* 8 */
    "corner-expand": (el) => gsap.fromTo(
        el.querySelector("img"),
        { clipPath: "circle(0% at 0% 0%)" },
        { clipPath: "circle(150% at 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: commonST(el) }
    ),

    /* 9 */
    "v-blind": (el) => {
        const wrap = document.createElement("div");
        wrap.style.cssText = "position:absolute;inset:0;display:grid;grid-template-columns:repeat(10,1fr);z-index:2;";
        for (let i = 0; i < 10; i++) {
            const d = document.createElement("div");
            d.style.background = "#0a0a0a";
            wrap.appendChild(d);
        }
        el.appendChild(wrap);

        gsap.to(wrap.children, {
            scaleY: 0,
            transformOrigin: "top",
            stagger: 0.08,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: commonST(el)
        });
    },

    /* 10 */
    "h-blind": (el) => {
        const wrap = document.createElement("div");
        wrap.style.cssText = "position:absolute;inset:0;display:grid;grid-template-rows:repeat(6,1fr);z-index:2;";
        for (let i = 0; i < 6; i++) {
            const d = document.createElement("div");
            d.style.background = "#0a0a0a";
            wrap.appendChild(d);
        }
        el.appendChild(wrap);

        gsap.to(wrap.children, {
            scaleX: 0,
            transformOrigin: "left",
            stagger: 0.1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: commonST(el)
        });
    },

    /* GRID */
    "grid-center": (el) => createGridReveal(el, "center"),
    "grid-random": (el) => createGridReveal(el, "random"),
    "checkerboard": (el) => createGridReveal(el, "edges"),

    /* 14 */
    "spiral-out": (el) => {
        gsap.from(el.querySelector("img"), {
            rotation: 720,
            scale: 0,
            opacity: 0,
            duration: 1.8,
            ease: "expo.out",
            scrollTrigger: commonST(el)
        });
    },

    /* 15 */
    "wave-tiles": (el) => {
        const wrap = document.createElement("div");
        wrap.style.cssText = "position:absolute;inset:0;display:grid;grid-template:repeat(6,1fr)/repeat(12,1fr);z-index:2;";

        for (let i = 0; i < 72; i++) {
            const d = document.createElement("div");
            d.style.background = "#0a0a0a";
            wrap.appendChild(d);
        }

        el.appendChild(wrap);

        gsap.to(wrap.children, {
            y: -100,
            opacity: 0,
            stagger: { each: 0.02, from: "start" },
            ease: "power2.out",
            scrollTrigger: commonST(el)
        });
    },


    /* 16 - 25: Advanced Clip Paths */
    "split-v": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0 0% 0 0%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: commonST(el) }),
    "split-h": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "inset(50% 0 50% 0)" }, { clipPath: "inset(0% 0 0% 0)", duration: 1.5, ease: "expo.inOut", scrollTrigger: commonST(el) }),
    "door-open": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0 0% 0 0%)", duration: 1.5, ease: "power4.inOut", scrollTrigger: commonST(el) }),
    "star-reveal": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)" }, { clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)", duration: 2, ease: "elastic.out(1, 0.5)", scrollTrigger: commonST(el) }),
    "poly-hex": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)" }, { clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", duration: 1.5, ease: "expo.out", scrollTrigger: commonST(el) }),
    "tri-top": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%)" }, { clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power4.inOut", scrollTrigger: commonST(el) }),
    "tri-bot": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%)" }, { clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)", duration: 1.5, ease: "power4.inOut", scrollTrigger: commonST(el) }),
    "circle-out": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "circle(150% at 50% 50%)" }, { clipPath: "circle(0% at 50% 50%)", duration: 1.5, ease: "power4.in", scrollTrigger: commonST(el) }).reverse(0),
    "ellipse-v": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "ellipse(0% 0% at 50% 50%)" }, { clipPath: "ellipse(50% 100% at 50% 50%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: commonST(el) }),
    "rhombus": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "inset(50% 50% 50% 50% round 100%)" }, { clipPath: "inset(0% 0% 0% 0% round 0%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: commonST(el) }),

    /* 26 - 35: Motion & Transform */
    "zoom-rot": (el) => gsap.from(el.querySelector("img"), { scale: 0, rotation: -45, opacity: 0, duration: 1.5, ease: "back.out(1.7)", scrollTrigger: commonST(el) }),
    "slide-blur": (el) => gsap.from(el.querySelector("img"), { y: 100, filter: "blur(20px)", opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: commonST(el) }),
    "flip-x": (el) => { gsap.set(el, { perspective: 1000 }); gsap.from(el.querySelector("img"), { rotationX: 90, opacity: 0, duration: 1.2, scrollTrigger: commonST(el) }) },
    "flip-y": (el) => { gsap.set(el, { perspective: 1000 }); gsap.from(el.querySelector("img"), { rotationY: 90, opacity: 0, duration: 1.2, scrollTrigger: commonST(el) }) },
    "3d-persp": (el) => { gsap.set(el, { perspective: 1000 }); gsap.from(el.querySelector("img"), { z: -500, rotationX: 45, opacity: 0, duration: 1.5, ease: "power3.out", scrollTrigger: commonST(el) }) },
    "bounce-in": (el) => gsap.from(el.querySelector("img"), { scale: 0.5, opacity: 0, duration: 1.2, ease: "bounce.out", scrollTrigger: commonST(el) }),
    "skew-slide": (el) => gsap.from(el.querySelector("img"), { skewX: 30, x: -100, opacity: 0, duration: 1.2, ease: "power4.out", scrollTrigger: commonST(el) }),
    "elastic-scale": (el) => gsap.from(el.querySelector("img"), { scaleY: 0, transformOrigin: "bottom", duration: 1.8, ease: "elastic.out(1, 0.3)", scrollTrigger: commonST(el) }),
    "swing-down": (el) => { gsap.set(el.querySelector("img"), { transformOrigin: "top" }); gsap.from(el.querySelector("img"), { rotationX: -90, duration: 1.5, ease: "bounce.out", scrollTrigger: commonST(el) }) },
    "glitch-pop": (el) => {
        const tl = gsap.timeline({ scrollTrigger: commonST(el) });
        tl.from(el.querySelector("img"), { scale: 1.1, filter: "contrast(200%) brightness(200%)", opacity: 0, duration: 0.1 })
            .to(el.querySelector("img"), { x: -10, duration: 0.1, repeat: 3, yoyo: true })
            .to(el.querySelector("img"), { x: 0, filter: "contrast(100%) brightness(100%)", duration: 0.5 });
    },

    /* 36 - 50: Grid & Advanced Overlays */
    "curtain-fall": (el) => createLayerReveal(el, "scaleY", "top"),
    "pix-random": (el) => createGridReveal(el, "random"),
    "venetian-l": (el) => createLayerReveal(el, "scaleX", "left", 15),
    "block-slide": (el) => {
        const cover = document.createElement("div");
        cover.style.cssText = "position:absolute;inset:0;background:#fff;z-index:2;";
        el.appendChild(cover);
        gsap.to(cover, { xPercent: 100, duration: 1, ease: "expo.inOut", scrollTrigger: commonST(el) });
    },
    "multi-stripe": (el) => {
        const wrap = document.createElement("div");
        wrap.style.cssText = "position:absolute;inset:0;display:flex;z-index:2;";
        for (let i = 0; i < 5; i++) {
            const s = document.createElement("div");
            s.style.cssText = `flex:1;background:#0a0a0a;`;
            wrap.appendChild(s);
        }
        el.appendChild(wrap);
        gsap.to(wrap.children, { scaleY: 0, stagger: 0.1, ease: "power4.inOut", scrollTrigger: commonST(el) });
    },
    "circ-wipe": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "circle(0% at 100% 100%)" }, { clipPath: "circle(150% at 100% 100%)", duration: 1.5, scrollTrigger: commonST(el) }),
    "diag-bars": (el) => {
        const wrap = document.createElement("div");
        wrap.style.cssText = "position:absolute;inset:-50%;display:grid;grid-template-columns:repeat(10,1fr);z-index:2;transform:rotate(45deg);";
        for (let i = 0; i < 10; i++) {
            const d = document.createElement("div"); d.style.background = "#0a0a0a"; wrap.appendChild(d);
        }
        el.appendChild(wrap);
        gsap.to(wrap.children, { scaleY: 0, stagger: 0.05, duration: 1, scrollTrigger: commonST(el) });
    },
    "grid-explode": (el) => {
        const wrap = createGrid(el, 5, 5);
        gsap.to(wrap.children, { scale: 0, opacity: 0, rotation: 45, x: "random(-100, 100)", y: "random(-100, 100)", stagger: { amount: 0.5, from: "center" }, scrollTrigger: commonST(el) });
    },
    "zoom-tile": (el) => {
        const wrap = createGrid(el, 4, 4);
        gsap.to(wrap.children, { scale: 0, stagger: { each: 0.05, grid: [4, 4], from: "edges" }, scrollTrigger: commonST(el) });
    },
    "fade-r": (el) => gsap.from(el.querySelector("img"), { x: -50, opacity: 0, duration: 1.5, scrollTrigger: commonST(el) }),
    "blur-in": (el) => gsap.from(el.querySelector("img"), { filter: "blur(30px)", scale: 1.2, opacity: 0, duration: 1.5, scrollTrigger: commonST(el) }),
    "liquid-inset": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "inset(20% 20% 20% 20% round 50% 20% 50% 20%)" }, { clipPath: "inset(0% 0% 0% 0% round 0%)", duration: 2, ease: "elastic.out(1, 0.3)", scrollTrigger: commonST(el) }),
    "iris-scan": (el) => gsap.fromTo(el.querySelector("img"), { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(100% at 50% 50%)", duration: 1, ease: "none", scrollTrigger: commonST(el) }),
    "matrix-fall": (el) => {
        const wrap = createGrid(el, 1, 15);
        gsap.to(wrap.children, { yPercent: 100, stagger: { amount: 0.8, from: "random" }, duration: 1.5, scrollTrigger: commonST(el) });
    },
    "final-flash": (el) => {
        const tl = gsap.timeline({ scrollTrigger: commonST(el) });
        tl.from(el.querySelector("img"), { filter: "brightness(10)", opacity: 0, duration: 0.8 })
            .to(el.querySelector("img"), { filter: "brightness(1)", duration: 0.5 });
    }
};


/* helper grid */

function createGridReveal(el, fromType) {

    const wrap = document.createElement("div");

    wrap.style.cssText =
        "position:absolute;inset:0;display:grid;grid-template:repeat(5,1fr)/repeat(10,1fr);z-index:2;";

    for (let i = 0; i < 50; i++) {
        const dot = document.createElement("div");
        dot.style.background = "#0a0a0a";
        wrap.appendChild(dot);
    }

    el.appendChild(wrap);

    gsap.to(wrap.children, {
        scale: 0,
        stagger: { amount: 1, from: fromType },
        ease: "power2.inOut",
        scrollTrigger: commonST(el)
    });

}


/* init */

document.querySelectorAll('[data-reveal]').forEach(el => {
    const effect = el.dataset.reveal;
    if (presets[effect]) presets[effect](el);
});

function createLayerReveal(el, prop, origin, count = 10) {
    const wrap = document.createElement("div");
    wrap.style.cssText = `position:absolute;inset:0;display:grid;${prop === 'scaleY' ? 'grid-template-columns' : 'grid-template-rows'}:repeat(${count},1fr);z-index:2;`;
    for (let i = 0; i < count; i++) {
        const d = document.createElement("div");
        d.style.background = "#0a0a0a";
        wrap.appendChild(d);
    }
    el.appendChild(wrap);
    const anim = {}; anim[prop] = 0; anim.transformOrigin = origin; anim.stagger = 0.05; anim.duration = 1;
    gsap.to(wrap.children, { ...anim, scrollTrigger: commonST(el) });
}

function createGrid(el, rows, cols) {
    const wrap = document.createElement("div");
    wrap.style.cssText = `position:absolute;inset:0;display:grid;grid-template:repeat(${rows},1fr)/repeat(${cols},1fr);z-index:2;`;
    for (let i = 0; i < (rows * cols); i++) {
        const d = document.createElement("div");
        d.style.background = "#0a0a0a";
        wrap.appendChild(d);
    }
    el.appendChild(wrap);
    return wrap;
}
