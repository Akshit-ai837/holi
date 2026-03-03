import { useRef, useEffect, useCallback } from "react";

// Particle class for color burst effect
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
}

// Holi color palette
const HOLI_COLORS = [
  "#FF1493", // Deep Pink
  "#FF69B4", // Hot Pink
  "#FFD700", // Gold
  "#FFA500", // Orange
  "#00CED1", // Dark Turquoise
  "#1E90FF", // Dodger Blue
  "#32CD32", // Lime Green
  "#9400D3", // Dark Violet
  "#FF6347", // Tomato
  "#00FF7F", // Spring Green
];

export default function ColorBurstCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  // Create particles for burst effect
  const createBurst = useCallback((centerX: number, centerY: number) => {
    const particles: Particle[] = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const velocity = 8 + Math.random() * 12;
      const color = HOLI_COLORS[Math.floor(Math.random() * HOLI_COLORS.length)];

      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        radius: 4 + Math.random() * 8,
        color,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.01,
        gravity: 0.15,
      });
    }

    // Add some extra scattered particles
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 3 + Math.random() * 8;
      const color = HOLI_COLORS[Math.floor(Math.random() * HOLI_COLORS.length)];

      particles.push({
        x: centerX + (Math.random() - 0.5) * 50,
        y: centerY + (Math.random() - 0.5) * 50,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        radius: 2 + Math.random() * 5,
        color,
        alpha: 0.8,
        decay: 0.02 + Math.random() * 0.015,
        gravity: 0.1,
      });
    }

    return particles;
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas with slight trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98; // Air resistance
      p.alpha -= p.decay;

      // Remove dead particles
      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      // Draw particle with glow effect
      ctx.save();
      ctx.globalAlpha = p.alpha;

      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = p.color;

      // Main particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Inner bright spot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();

      ctx.restore();
    }

    // Continue animation if particles exist
    if (particles.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      isAnimatingRef.current = false;
    }
  }, []);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Trigger burst effect
  const triggerBurst = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Add new particles
    const newParticles = createBurst(centerX, centerY);
    particlesRef.current.push(...newParticles);

    // Start animation if not already running
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      animate();
    }

    // Trigger screen shake
    document.body.classList.add("animate-shake");
    setTimeout(() => {
      document.body.classList.remove("animate-shake");
    }, 500);
  }, [createBurst, animate]);

  // Expose trigger function globally
  useEffect(() => {
    (window as unknown as { triggerColorBurst: () => void }).triggerColorBurst = triggerBurst;
    return () => {
      delete (window as unknown as { triggerColorBurst?: () => void }).triggerColorBurst;
    };
  }, [triggerBurst]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
