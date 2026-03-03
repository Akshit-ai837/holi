import { useState, useEffect } from "react";

// For demo: Set to tomorrow
// In production, replace with actual Holi dates
function getNextHoliDate(): Date {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

// Individual timer box component
function TimerBox({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl glass flex items-center justify-center overflow-hidden group transition-transform duration-300 hover:scale-105"
        style={{
          boxShadow: `0 0 30px ${color}40, inset 0 0 20px ${color}20`,
        }}
      >
        {/* Animated gradient border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-60"
          style={{
            background: `linear-gradient(135deg, ${color}, transparent, ${color})`,
            backgroundSize: "200% 200%",
            animation: "gradient-shift 3s ease infinite",
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${color}30, transparent 70%)`,
          }}
        />

        {/* Number display */}
        <span
          className="relative z-10 font-bold text-3xl sm:text-4xl md:text-5xl"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}cc)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: `0 0 20px ${color}50`,
          }}
        >
          {value.toString().padStart(2, "0")}
        </span>

        {/* Decorative dots */}
        <div
          className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: color, opacity: 0.6 }}
        />
        <div
          className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: color, opacity: 0.4, animationDelay: "0.5s" }}
        />
      </div>

      {/* Label */}
      <span className="mt-3 text-sm sm:text-base font-semibold text-gray-600 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [holiDate] = useState(getNextHoliDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(holiDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(holiDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [holiDate]);

  const isHoliToday = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  // Colors for each timer box
  const colors = {
    days: "#FF1493",    // Pink
    hours: "#FFD700",   // Yellow
    minutes: "#00CED1", // Cyan
    seconds: "#9400D3", // Purple
  };

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section heading */}
        <h2 className="font-pacifico text-3xl sm:text-4xl md:text-5xl mb-4 text-gray-800">
          {isHoliToday ? "🎉 It's Holi Time! 🎉" : "Countdown to Holi"}
        </h2>
        
        <p className="text-gray-600 mb-10 text-lg">
          {isHoliToday 
            ? "The Festival of Colors is here! Go spread some joy!" 
            : `${holiDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
          }
        </p>

        {/* Timer boxes */}
        {!isHoliToday && (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            <TimerBox value={timeLeft.days} label="Days" color={colors.days} />
            
            {/* Separator */}
            <div className="hidden sm:flex flex-col justify-center gap-3 text-3xl text-gray-400 font-bold">
              <span className="animate-pulse">:</span>
            </div>
            
            <TimerBox value={timeLeft.hours} label="Hours" color={colors.hours} />
            
            {/* Separator */}
            <div className="hidden sm:flex flex-col justify-center gap-3 text-3xl text-gray-400 font-bold">
              <span className="animate-pulse" style={{ animationDelay: "0.3s" }}>:</span>
            </div>
            
            <TimerBox value={timeLeft.minutes} label="Minutes" color={colors.minutes} />
            
            {/* Separator */}
            <div className="hidden sm:flex flex-col justify-center gap-3 text-3xl text-gray-400 font-bold">
              <span className="animate-pulse" style={{ animationDelay: "0.6s" }}>:</span>
            </div>
            
            <TimerBox value={timeLeft.seconds} label="Seconds" color={colors.seconds} />
          </div>
        )}

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center gap-2">
          {["#FF1493", "#FFD700", "#00CED1", "#32CD32", "#9400D3", "#FF6347"].map((color, i) => (
            <div
              key={color}
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
