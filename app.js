(function () {
  const TOTAL_FRAMES = 192;
  const canvas = document.getElementById('scroll-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false });
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');

  const images = [];
  let loadedCount = 0;
  let failedCount = 0;

  let targetFrame = 0;
  let currentFrame = 0;
  let isLoaded = true; // Set to true by default for instant non-blocking load
  let isFrameMode = true;

  // Format frame filename with 6 digits padding
  function getFrameUrl(index) {
    const padIndex = String(index).padStart(6, '0');
    return `frames_extracted/frame_${padIndex}.jpg`;
  }

  // Preload frames non-blockingly
  function preloadImages() {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      img.onload = () => {
        loadedCount++;
        const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
        if (loaderBar) {
          loaderBar.style.width = `${percent}%`;
        }
      };

      img.onerror = () => {
        failedCount++;
        if (failedCount > 10) {
          isFrameMode = false;
        }
      };

      images.push(img);
    }

    // Immediately remove loader overlay
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 500);
    }

    requestAnimationFrame(renderLoop);
  }

  // Canvas size and DPR adjustment
  function resizeCanvas() {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
  }

  // Update target frame based on page scroll fraction
  function updateTargetFrame() {
    const scrollTop = window.scrollY || window.pageYOffset || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
    targetFrame = scrollFraction * (TOTAL_FRAMES - 1);
  }

  // Draw image using 'cover' aspect ratio algorithm
  function drawFrame(index) {
    const img = images[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      drawFallbackGrid();
      return;
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;

    const offsetX = (canvasWidth - drawWidth) / 2;
    const offsetY = (canvasHeight - drawHeight) / 2;

    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  // Sleek animated CSS gradient and solar particle grid fallback
  function drawFallbackGrid() {
    const width = canvas.width;
    const height = canvas.height;
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#020617');
    bgGrad.addColorStop(0.5, '#071527');
    bgGrad.addColorStop(1, '#022c22');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.lineWidth = 1;
    const spacing = 50;
    for (let x = 0; x < width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
  }

  // Continuous animation frame loop
  function renderLoop() {
    const diff = targetFrame - currentFrame;
    currentFrame += diff * 0.14;

    const frameToDraw = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame)));
    if (isFrameMode && images[frameToDraw] && images[frameToDraw].complete) {
      drawFrame(frameToDraw);
    } else {
      drawFallbackGrid();
    }

    requestAnimationFrame(renderLoop);
  }

  // Event Listeners
  window.addEventListener('scroll', updateTargetFrame, { passive: true });
  window.addEventListener('resize', resizeCanvas);

  // Initialize
  resizeCanvas();
  preloadImages();
})();

