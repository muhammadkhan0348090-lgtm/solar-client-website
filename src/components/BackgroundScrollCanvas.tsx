import React, { useEffect, useRef, useState } from 'react';
import { Sun, Sparkles, ArrowDown, ShieldCheck, Zap } from 'lucide-react';

const TOTAL_FRAMES = 192;

interface HeroCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroScrollCanvas: React.FC<HeroCanvasProps> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFrameDisplay, setActiveFrameDisplay] = useState(1);
  const [scrollPercentDisplay, setScrollPercentDisplay] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animationFrameId = useRef<number | null>(null);
  
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);

  const getFrameUrl = (index: number) => {
    const padIndex = String(index).padStart(6, '0');
    return `/frames_extracted/frame_${padIndex}.jpg`;
  };

  useEffect(() => {
    let count = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      img.onload = () => {
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      imgArray.push(img);
    }

    imagesRef.current = imgArray;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  // Update target frame based on scroll position inside containerRef
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight - window.innerHeight;
      
      // Calculate scroll fraction inside top hero section
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

  // Canvas resize and render loop
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

    const drawFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      // Cover scaling
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;

      const offsetX = (canvasWidth - drawWidth) / 2;
      const offsetY = (canvasHeight - drawHeight) / 2;

      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.15;

      const frameToDraw = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      setActiveFrameDisplay(frameToDraw + 1);
      drawFrame(frameToDraw);

      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    if (isLoaded) {
      animationFrameId.current = requestAnimationFrame(renderLoop);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isLoaded]);

  const loadPercent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-slate-950 text-white">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 block"
      />

      {/* Dark Overlay Gradient for High Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 z-10 pointer-events-none" />

      {/* Hero Content Overlay on Top of Animation */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-amber-400/40 text-amber-300 text-xs font-black shadow-2xl animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>192-FRAME INTERACTIVE SCROLL ANIMATION SHOWCASE</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-2xl">
          Next-Gen Solar Energy <br />
          <span className="bg-gradient-to-r from-amber-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
            Powering Modern Homes
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto font-medium drop-shadow-md leading-relaxed">
          Scroll down to scrub through 192 high-resolution video frames of rooftop solar installation, explore live Pakistani market rates, and calculate turn-key ROI savings.
        </p>

        {/* Live Frame Badge & Progress */}
        <div className="inline-flex items-center gap-4 bg-slate-950/80 backdrop-blur-2xl border border-slate-700/80 px-5 py-2.5 rounded-full shadow-2xl text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono text-emerald-300 font-bold text-sm">
              Frame {activeFrameDisplay} / {TOTAL_FRAMES}
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

      {/* Preloader Screen */}
      <div
        className={`absolute inset-0 z-50 bg-[#050811] flex flex-col items-center justify-center gap-4 transition-opacity duration-700 pointer-events-none ${
          isLoaded ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}
      >
        <div className="w-14 h-14 border-4 border-emerald-500/20 border-t-amber-400 rounded-full animate-spin"></div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-white font-bold text-sm tracking-wider uppercase">
            Loading Solar Frame Sequence ({loadPercent}%)
          </span>
          <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-150 ease-out"
              style={{ width: `${loadPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
