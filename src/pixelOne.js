document.addEventListener("DOMContentLoaded", function() {

    if (typeof gsap === "undefined") {
        console.warn("GSAP not loaded");
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    var DEFAULT_GRID = 12;

    document.querySelectorAll("[data-pixel]").forEach(function(el) {

        var gridSize = Math.max(1, parseInt(el.dataset.grid, 10) || DEFAULT_GRID);
        var totalPixels = gridSize * gridSize;

        // Buat overlay wrapper, tapi jangan pindahkan elemen asli
        var wrapper = document.createElement("div");
        wrapper.className = "pixel_overlay";
        wrapper.style.position = "absolute";
        wrapper.style.top = 0;
        wrapper.style.left = 0;
        wrapper.style.width = "100%";
        wrapper.style.height = "100%";
        wrapper.style.pointerEvents = "none"; // jangan ganggu interaksi
        wrapper.style.zIndex = 1;

        // Pastikan parent relatif supaya overlay bisa posisi absolut
        if (getComputedStyle(el).position === "static") {
            el.style.position = "relative";
        }
        el.appendChild(wrapper);

        // Optional content overlay
        var content = document.createElement("div");
        content.className = "pixel_content";
        content.textContent = el.dataset.text || "";
        content.style.color = el.dataset.textColor || "#fff";
        content.style.opacity = "1";
        wrapper.appendChild(content);

        // Grid overlay
        var grid = document.createElement("div");
        grid.className = "pixel_grid";
        grid.style.setProperty("--pixel-color", el.dataset.color || "#fff");
        grid.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";
        grid.style.gridTemplateRows = "repeat(" + gridSize + ", 1fr)";
        wrapper.appendChild(grid);

        var fragment = document.createDocumentFragment();
        for (var i = 0; i < totalPixels; i++) {
            var pixel = document.createElement("div");
            pixel.style.opacity = "1";
            fragment.appendChild(pixel);
        }
        grid.appendChild(fragment);

        var pixels = Array.from(grid.children);
        var duration = Math.max(0.01, parseFloat(el.dataset.duration) || 0.3);
        var isHover = el.hasAttribute("data-hover");
        var onceAttr = el.dataset.once;
        var once = onceAttr !== "false";

        var pixelTL = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
        pixelTL.to(pixels, { opacity: 0, duration: duration, stagger: { each: 0.005, from: "random" } });

        if (isHover) {
            el.addEventListener("mouseenter", function() {
                gsap.to(content, { opacity: 0, duration: 0.2, overwrite: true });
                pixelTL.restart();
            });
            el.addEventListener("mouseleave", function() {
                pixelTL.pause(0);
                gsap.set(pixels, { opacity: 1 });
                gsap.to(content, { opacity: 1, duration: 0.2, overwrite: true });
            });
        } else if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.create({
                trigger: el,
                start: "top 75%",
                once: once,
                onEnter: function() {
                    gsap.to(content, { opacity: 0, duration: 0.3, overwrite: true });
                    pixelTL.restart();
                },
                onEnterBack: function() {
                    if (!once) {
                        gsap.set(pixels, { opacity: 1 });
                        gsap.to(content, { opacity: 0, duration: 0.3, overwrite: true });
                        pixelTL.restart();
                    }
                }
            });
        }

    });

});