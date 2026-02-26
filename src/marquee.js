(function () {
    const track = document.getElementById("track");
  
    if (!track) return;
  
    let position = 0;
    let speed = 1.5;
    let targetSpeed = 1.5;
  
    track.addEventListener("mouseenter", () => {
      targetSpeed = 0.15;
    });
  
    track.addEventListener("mouseleave", () => {
      targetSpeed = 1.5;
    });
  
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
  })();

//   hendzzz