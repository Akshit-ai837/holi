import { useState, useRef, useCallback } from "react";

// Collection of Holi wishes
const HOLI_WISHES = [
  "May the colors of Holi spread happiness and joy in your life! 🌈",
  "Wishing you a Holi filled with sweet moments and colorful memories! 🎨",
  "Let the colors of Holi paint your life with love and laughter! 💖",
  "May this Holi bring you closer to your loved ones! 🤗",
  "Splash colors of joy and let happiness bloom this Holi! 🌸",
  "May your life be as colorful as the festival of Holi! ✨",
  "Wishing you a rainbow of happiness this Holi season! 🌈",
  "Let's celebrate the victory of good over evil with colors! 🎉",
  "May the vibrant colors of Holi fill your heart with peace! 💜",
  "Spread love, spread colors, spread happiness! Happy Holi! 🎊",
  "May this festival of colors bring endless joy to your life! 💛",
  "Let the spirit of Holi bring you hope, love, and joy! 💚",
  "Wishing you a Holi that's as bright as your smile! 😊",
  "May your dreams come true as colorful as Holi! 🌟",
  "Let's drench in the colors of friendship and love! 💙",
];

// Confetti particle interface
interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  velocityX: number;
  velocityY: number;
}

// Holi colors for confetti
const CONFETTI_COLORS = ["#FF1493", "#FFD700", "#00CED1", "#32CD32", "#9400D3", "#FF6347", "#FF69B4"];

export default function HoliWishesGenerator() {
  const [currentWish, setCurrentWish] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  const confettiIdRef = useRef(0);

  // Generate confetti particles
  const createConfetti = useCallback(() => {
    const particles: ConfettiParticle[] = [];
    const centerX = 50; // percentage

    for (let i = 0; i < 50; i++) {
      particles.push({
        id: confettiIdRef.current++,
        x: centerX + (Math.random() - 0.5) * 20,
        y: 50,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        velocityX: (Math.random() - 0.5) * 15,
        velocityY: -10 - Math.random() * 10,
      });
    }

    setConfetti(particles);

    // Clear confetti after animation
    setTimeout(() => {
      setConfetti([]);
    }, 3000);
  }, []);

  // Generate random wish
  const generateWish = () => {
    setIsAnimating(true);
    createConfetti();

    // Get a random wish different from current
    let newWish = HOLI_WISHES[Math.floor(Math.random() * HOLI_WISHES.length)];
    while (newWish === currentWish && HOLI_WISHES.length > 1) {
      newWish = HOLI_WISHES[Math.floor(Math.random() * HOLI_WISHES.length)];
    }

    setCurrentWish(newWish);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="relative z-10 py-20 px-4 overflow-hidden">
      {/* Confetti particles */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {confetti.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
              boxShadow: `0 0 6px ${particle.color}`,
              animation: `confetti-fall 3s ease-out forwards`,
              animationDelay: `${Math.random() * 0.2}s`,
              ["--vx" as string]: `${particle.velocityX}vw`,
              ["--vy" as string]: `${particle.velocityY}vh`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(var(--vx)) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="max-w-2xl mx-auto text-center">
        {/* Section heading */}
        <h2 className="font-pacifico text-3xl sm:text-4xl md:text-5xl mb-4 text-gray-800">
          Holi Wishes Generator
        </h2>
        <p className="text-gray-600 mb-10 text-lg">
          Get a special Holi blessing for you and your friends!
        </p>

        {/* Wish card */}
        <div
          className={`glass rounded-3xl p-8 mb-8 min-h-[160px] flex items-center justify-center transition-all duration-500 ${
            isAnimating ? "scale-105" : "scale-100"
          }`}
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
            boxShadow: currentWish
              ? "0 0 40px rgba(255, 105, 180, 0.3), 0 0 80px rgba(255, 215, 0, 0.2)"
              : "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          {currentWish ? (
            <p
              className="text-xl sm:text-2xl font-medium text-gray-700 leading-relaxed"
              style={{
                animation: isAnimating ? "fade-in-up 0.5s ease-out" : "none",
              }}
            >
              {currentWish}
            </p>
          ) : (
            <p className="text-lg text-gray-500 italic">
              Click the button below to receive your Holi wish! ✨
            </p>
          )}
        </div>

        {/* Generate button */}
        <button
          onClick={generateWish}
          className="group relative px-8 py-4 text-lg sm:text-xl font-bold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #9400D3, #FF1493, #FF6347)",
          }}
        >
          {/* Glow effect */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, #FF1493, #9400D3, #00CED1)",
            }}
          />

          {/* Animated border */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, #FF1493, #FFD700, #00CED1, #9400D3)",
              backgroundSize: "400% 400%",
              animation: "gradient-shift 3s ease infinite",
              padding: "2px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          <span className="relative z-10 flex items-center gap-2">
            Get a Holi Wish <span className="text-xl">🙏</span>
          </span>
        </button>
      </div>
    </section>
  );
}
