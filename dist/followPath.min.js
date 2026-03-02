document.querySelectorAll('.text-follow-wrapper').forEach((el, i) => {
    const text = el.dataset.text || 'TEXT FOLLOW PATH • ';
    const pathData = el.dataset.svgPath;
    const fontFamily = el.dataset.fontFamily || 'sans-serif';
    const textColor = el.dataset.textColor || '#000';
    const showPath = el.dataset.showPath === 'true';
    const pathSize = parseFloat(el.dataset.pathSize) || 40;
    const pathColor = el.dataset.pathColor || '#fff';
    const isRight = el.dataset.direction === 'right';
    const speed = parseFloat(el.dataset.speed) || 1;

    const pathId = 'curve-' + i;

    // KUNCI CENTER: dominant-baseline="central" pada elemen <text>
    el.innerHTML = `
<svg viewBox="0 0 900 500" width="100%" preserveAspectRatio="xMidYMid meet" style="overflow: visible;">
    <defs><path id="${pathId}" d="${pathData}" /></defs>
    
    <path d="${pathData}" 
          stroke="${showPath ? pathColor : 'transparent'}" 
          stroke-width="${pathSize}" 
          fill="none" 
          stroke-linecap="round"/>
    
    <text class="follow_path_text" 
          fill="${textColor}" 
          font-size="${pathSize * 0.5}px" 
          font-family="${fontFamily}"
          dominant-baseline="central">
        <textPath id="tp-${pathId}" href="#${pathId}" startOffset="0">${text}</textPath>
    </text>
</svg>`;

    const textPath = el.querySelector(`#tp-${pathId}`);
    const path = el.querySelector(`#${pathId}`);

    // Gunakan fungsi untuk memastikan kalkulasi setelah render
    const initLoop = () => {
      const pathLength = path.getTotalLength();

      // 1. Hitung panjang satu unit teks asli
      textPath.textContent = text;
      const unitLength = textPath.getComputedTextLength();

      // 2. Duplikasi teks agar menutupi path + buffer untuk animasi
      // Kita tambahkan minimal 2 unit ekstra agar tidak ada gap saat looping
      const repeatCount = Math.ceil(pathLength / unitLength) + 2;
      textPath.textContent = text.repeat(repeatCount);

      let offset = 0;

      function animate() {
        if (isRight) {
          // Bergerak ke kanan: offset bertambah
          offset += speed;
          if (offset >= 0) {
            offset = -unitLength;
          }
        } else {
          // Bergerak ke kiri: offset berkurang
          offset -= speed;
          if (Math.abs(offset) >= unitLength) {
            offset = 0;
          }
        }

        textPath.setAttribute('startOffset', offset);
        requestAnimationFrame(animate);
      }

      // Set awal agar tidak loncat
      offset = isRight ? -unitLength : 0;
      animate();
    };

    // Timeout untuk memastikan font ter-load
    setTimeout(initLoop, 150);
  });