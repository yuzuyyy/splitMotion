document.addEventListener("DOMContentLoaded", function() {

    if (typeof gsap === "undefined") {
      console.warn("GSAP not loaded");
      return;
    }
  
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  
    var DEFAULT_GRID = 12;
  
    document.querySelectorAll("img[data-pixel]").forEach(function(img) {
  
      var gridSize = Math.max(
        1,
        parseInt(img.dataset.grid, 10) || DEFAULT_GRID
      );
  
      var totalPixels = gridSize * gridSize;
  
      var wrapper = document.createElement("div");
      wrapper.className = "image_wrapper";
  
      if (!img.parentNode) return;
  
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
  
      var content = document.createElement("div");
      content.className = "pixel_content";
      content.textContent = img.dataset.text || "";
      content.style.color = img.dataset.textColor || "#fff";
      content.style.opacity = "1";
  
      wrapper.appendChild(content);
  
      var grid = document.createElement("div");
      grid.className = "pixel_grid";
  
      grid.style.setProperty(
        "--pixel-color",
        img.dataset.color || "#fff"
      );
  
      grid.style.gridTemplateColumns =
        "repeat(" + gridSize + ", 1fr)";
  
      grid.style.gridTemplateRows =
        "repeat(" + gridSize + ", 1fr)";
  
      wrapper.appendChild(grid);
  
      var fragment = document.createDocumentFragment();
  
      for (var i = 0; i < totalPixels; i++) {
        var pixel = document.createElement("div");
        pixel.style.opacity = "1";
        fragment.appendChild(pixel);
      }
  
      grid.appendChild(fragment);
  
      var pixels = Array.from(grid.children);
  
      var duration = Math.max(
        0.01,
        parseFloat(img.dataset.duration) || 0.3
      );
  
      var isHover = img.hasAttribute("data-hover");
  
      var pixelTL = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" }
      });
  
      pixelTL.to(pixels, {
        opacity: 0,
        duration: duration,
        stagger: {
          each: 0.005,
          from: "random"
        }
      });
  
      if (isHover) {
  
        wrapper.addEventListener("mouseenter", function() {
  
          gsap.to(content, {
            opacity: 0,
            duration: 0.2,
            overwrite: true
          });
  
          pixelTL.restart();
  
        });
  
        wrapper.addEventListener("mouseleave", function() {
  
          pixelTL.pause(0);
  
          gsap.set(pixels, {
            opacity: 1
          });
  
          gsap.to(content, {
            opacity: 1,
            duration: 0.2,
            overwrite: true
          });
  
        });
  
      }
  
      else if (typeof ScrollTrigger !== "undefined") {
  
        ScrollTrigger.create({
  
          trigger: wrapper,
          start: "top 75%",
          once: true,
  
          onEnter: function() {
  
            gsap.to(content, {
              opacity: 0,
              duration: 0.3,
              overwrite: true
            });
  
            pixelTL.play();
  
          }
  
        });
  
      }
  
    });
  
  });
  
  // hendz was here
  
  