import React, { useEffect, useRef, useState } from 'react';
import { Sun, Sparkles, ArrowDown, ShieldCheck, Zap, Layers } from 'lucide-react';

const TOTAL_FRAMES = 192;

interface HeroCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  pulseSpeed: number;
  alpha: number;
}

export const HeroScrollCanvas: React.FC<HeroCanvasProps> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFrameMode, setIsFrameMode] = useState<boolean>(true);
  const [activeFrameDisplay, setActiveFrameDisplay] = useState(1);
  const [scrollPercentDisplay, setScrollPercentDisplay] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);

  const getFrameUrl = (index: number) => {
    const padIndex = String(index).padStart(6, '0');
    return `/frames_extracted/frame_${padIndex}.jpg`;
  };

  // Preload frame images without blocking instant page load
  useEffect(() => {
    let count = 0;
    let failedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    // Test first frame image availability
    const testImg = new Image();
    testImg.src = getFrameUrl(0);
    testImg.onerror = () => {
      // If frame_000000.jpg missing or unaccessible, fallback immediately to solar grid particle mode
      setIsFrameMode(false);
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      img.onload = () => {
        count++;
        setLoadedCount(count);
      };

      img.onerror = () => {
        failedCount++;
        if (failedCount > 10) {
          // If multiple frames fail to load, switch to sleek high-tech particle fallback
          setIsFrameMode(false);
        }
      };

      imgArray.push(img);
    }

    imagesRef.current = imgArray;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  // Initialize particle effects for fallback mode
  useEffect(() => {
    const particles: Particle[] = [];
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#34d399', '#fbbf24'];

    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        radius: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.0005,
        vy: -Math.random() * 0.001 - 0.0003,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    particlesRef.current = particles;
  }, []);

  // Update target frame based on scroll position inside containerRef
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight - window.innerHeight;
      
      const scrolled = -rect.top;
      const fraction = Math.max(0, Math.min(1, scrolled / Math.max(1, containerHeight)));

      targetFrameRef.current = fraction * (TOTAL_FRAMES - 1);
      setScrollPercentDisplay(Math.round(fraction * 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  // Main Canvas render loop (supports frame sequence & fallback particle solar grid)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw frame image sequence
    const drawFrameImage = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) {
        drawSolarParticleGrid();
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
    };

    // Sleek High-Tech Animated CSS & Canvas Solar Grid Particles Fallback
    const drawSolarParticleGrid = () => {
      const width = canvas.width;
      const height = canvas.height;
      const scrollRatio = targetFrameRef.current / (TOTAL_FRAMES - 1);

      // Dark futuristic slate background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(0.5, '#071527');
      bgGrad.addColorStop(1, '#022c22');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Solar Sun Core Pulsing Glow
      const sunX = width * 0.5;
      const sunY = height * (0.35 + scrollRatio * 0.1);
      const sunRadius = Math.min(width, height) * 0.28;
      const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 1.8);
      sunGrad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
      sunGrad.addColorStop(0.3, 'rgba(16, 185, 129, 0.25)');
      sunGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.15)');
      sunGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');

      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Perspective Solar Grid Lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1.2;
      const gridSpacing = 60;
      const gridOffset = (scrollRatio * 180) % gridSpacing;

      // Horizontal perspective grid
      for (let y = gridOffset; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical converging perspective grid
      const cols = 14;
      for (let i = 0; i <= cols; i++) {
        const xPos = (width / cols) * i;
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        ctx.lineTo(xPos, height);
        ctx.stroke();
      }

      // Animated Solar Photon Particles
      const particles = particlesRef.current;
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;

        if (p.y < 0) p.y = 1;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;

        const px = p.x * width;
        const py = p.y * height;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Circuit Node Connection Lines to solar center
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.lineWidth = 1.5;
      particles.slice(0, 12).forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.x * width, p.y * height);
        ctx.lineTo(sunX, sunY);
        ctx.stroke();
      });
    };

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.15;

      const frameToDraw = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      setActiveFrameDisplay(frameToDraw + 1);

      if (isFrameMode && imagesRef.current.length > 0 && imagesRef.current[frameToDraw]?.complete) {
        drawFrameImage(frameToDraw);
      } else {
        drawSolarParticleGrid();
      }

      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isFrameMode]);

  return (
    <div className="relative w-full min-h-[70vh] py-12 sm:py-20 flex items-center justify-center bg-slate-950/80 text-white overflow-hidden z-10">
      {/* Dynamic Animated CSS Gradient & Solar Grid Particles Canvas */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0 pointer-events-none" />

      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90 transition-opacity duration-500"
      />


      {/* Dark Overlay Gradient for High Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 z-10 pointer-events-none" />

      {/* Hero Content Overlay on Top of Animation */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-amber-400/40 text-amber-300 text-xs font-black shadow-2xl animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>
            {isFrameMode ? '192-FRAME INTERACTIVE SCROLL ANIMATION SHOWCASE' : 'HIGH-TECH SOLAR GRID ANIMATION SHOWCASE'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-2xl">
          Next-Gen Solar Energy <br />
          <span className="bg-gradient-to-r from-amber-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
            Powering Modern Homes
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto font-medium drop-shadow-md leading-relaxed">
          Scroll down to scrub through rooftop solar energy technology, explore live Pakistani market rates, and calculate turn-key ROI savings.
        </p>

        {/* Live Frame / Progress Badge */}
        <div className="inline-flex items-center gap-4 bg-slate-950/80 backdrop-blur-2xl border border-slate-700/80 px-5 py-2.5 rounded-full shadow-2xl text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono text-emerald-300 font-bold text-sm">
              {isFrameMode ? `Frame ${activeFrameDisplay} / ${TOTAL_FRAMES}` : 'Solar Particles Active'}
            </span>
          </div>
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-75"
              style={{ width: `${scrollPercentDisplay}%` }}
            ></div>
          </div>
          <span className="text-slate-300 font-bold">{scrollPercentDisplay}% Scrubbed</span>
        </div>

        {/* Scroll Prompt Arrow */}
        <div className="pt-4 flex flex-col items-center gap-2 text-xs text-slate-300 font-bold animate-bounce">
          <span>Scroll to Scrub Video Animation & Explore Website</span>
          <ArrowDown className="w-5 h-5 text-amber-400" />
        </div>
      </div>
    </div>
  );
};

