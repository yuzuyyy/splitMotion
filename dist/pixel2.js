/* =========================================================
   Pixel Reveal System (Scroll + Hover)
   Dependency: GSAP + ScrollTrigger
   Init: DOMContentLoaded
========================================================= */

(function () {
    "use strict";
  
    document.addEventListener("DOMContentLoaded", function () {
  
      if (typeof gsap === "undefined") {
        console.warn("GSAP not found");
        return;
      }
  
      if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
      }
  
      const DEFAULT_GRID = 12;
  
      const images = document.querySelectorAll("img[data-pixel]");
  
      images.forEach(function (img) {
  
        /* Prevent duplicate init */
        if (img.dataset.pixelInitialized === "true") return;
        img.dataset.pixelInitialized = "true";
  
        /* =====================
           CONFIG
        ====================== */
  
        const gridSize = Math.max(
          1,
          parseInt(img.dataset.grid, 10) || DEFAULT_GRID
        );
  
        const totalPixels = gridSize * gridSize;
  
        const duration =
          parseFloat(img.dataset.duration) || 0.3;
  
        const isHover =
          img.hasAttribute("data-hover");
  
        const text =
          img.dataset.text || "";
  
        const textColor =
          img.dataset.textColor || "#fff";
  
        const pixelColor =
          img.dataset.color || "#fff";
  
        /* =====================
           WRAPPER
        ====================== */
  
        const wrapper =
          document.createElement("div");
  
        wrapper.className =
          "pixel-wrapper";
  
        img.parentNode.insertBefore(
          wrapper,
          img
        );
  
        wrapper.appendChild(img);
  
        /* =====================
           TEXT
        ====================== */
  
        let content = null;
  
        if (text) {
  
          content =
            document.createElement("div");
  
          content.className =
            "pixel-content";
  
          content.textContent =
            text;
  
          content.style.color =
            textColor;
  
          wrapper.appendChild(content);
        }
  
        /* =====================
           GRID
        ====================== */
  
        const grid =
          document.createElement("div");
  
        grid.className =
          "pixel-grid";
  
        grid.style.setProperty(
          "--pixel-color",
          pixelColor
        );
  
        grid.style.gridTemplateColumns =
          "repeat(" + gridSize + ", 1fr)";
  
        grid.style.gridTemplateRows =
          "repeat(" + gridSize + ", 1fr)";
  
        wrapper.appendChild(grid);
  
        for (let i = 0; i < totalPixels; i++) {
  
          const pixel =
            document.createElement("div");
  
          grid.appendChild(pixel);
        }
  
        const pixels =
          grid.children;
  
        /* =====================
           TIMELINE
        ====================== */
  
        const pixelTL =
          gsap.timeline({
            paused: true
          });
  
        pixelTL.to(pixels, {
  
          opacity: 0,
  
          duration: duration,
  
          stagger: {
            each: 0.005,
            from: "random"
          },
  
          ease: "power2.out"
        });
  
        /* =====================
           HOVER MODE
        ====================== */
  
        if (isHover) {
  
          wrapper.addEventListener(
            "mouseenter",
            function () {
  
              if (content) {
  
                gsap.to(content, {
                  opacity: 0,
                  duration: 0.2
                });
  
              }
  
              pixelTL.restart();
            }
          );
  
          wrapper.addEventListener(
            "mouseleave",
            function () {
  
              pixelTL.pause(0);
  
              gsap.set(pixels, {
                opacity: 1
              });
  
              if (content) {
  
                gsap.to(content, {
                  opacity: 1,
                  duration: 0.2
                });
  
              }
  
            }
          );
  
        }
  
        /* =====================
           SCROLL MODE
        ====================== */
  
        else if (typeof ScrollTrigger !== "undefined") {
  
          ScrollTrigger.create({
  
            trigger: wrapper,
  
            start: "top 75%",
  
            once: true,
  
            onEnter: function () {
  
              if (content) {
  
                gsap.to(content, {
                  opacity: 0,
                  duration: 0.3
                });
  
              }
  
              pixelTL.play();
  
            }
  
          });
  
        }
  
      });
  
    });
  
  })();
  