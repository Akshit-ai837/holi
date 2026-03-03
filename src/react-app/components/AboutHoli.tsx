import { useEffect, useRef, useState } from "react";
import { Sparkles, Heart, Users, Palette } from "lucide-react";

// Info cards about Holi
const holiInfo = [
  {
    icon: Palette,
    title: "Festival of Colors",
    description: "holi ke colours ki tarah nayi nayi tarah ki msti kerenge sath me with kai sari nok jok with cute memories🤪😍",
    color: "#FF1493",
  },
  {
    icon: Heart,
    title: "Love & Forgiveness",
    description: "ish bar sbh purani buri bate bhul ke sab ek nayi suruat kerte hai achi yadho ke sath 🥰",
    color: "#FFD700",
  },
  {
    icon: Users,
    title: "Unity & Togetherness",
    description: "ish holi ke sath me yahi chahta hu ki hum sbka bond or strong ho or hum humesha sath rahe😉",
    color: "#00CED1",
  },
  {
    icon: Sparkles,
    title: "Joy & Celebration",
    description: "With music, dance, delicious sweets, and colorful powders (gulal), abhi sath me ni h to kya hua virtually karengena",
    color: "#9400D3",
  },
];

// Hook for fade-in on scroll
function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Individual info card with fade-in animation
function InfoCard({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  delay 
}: { 
  icon: typeof Palette; 
  title: string; 
  description: string; 
  color: string; 
  delay: number;
}) {
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <div
      ref={ref}
      className={`glass rounded-2xl p-6 transition-all duration-700 hover:scale-105 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        boxShadow: isVisible ? `0 0 30px ${color}20` : "none",
      }}
    >
      {/* Icon container */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${color}30, ${color}10)`,
          boxShadow: `0 0 20px ${color}30`,
        }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>

      {/* Title */}
      <h3 
        className="text-xl font-bold mb-2"
        style={{ color }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function AboutHoli() {
  const { ref: sectionRef, isVisible: sectionVisible } = useFadeInOnScroll();

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div
          ref={sectionRef}
          className={`text-center mb-16 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-pacifico text-3xl sm:text-4xl md:text-5xl mb-4 text-gray-800">
            What is Holi?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Holi, known as the &quot;Festival of Colors&quot;, is one of the most vibrant and joyous 
            celebrations in India and around the world. Here&apos;s what makes it special:
          </p>
        </div>

        {/* Info cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {holiInfo.map((info, index) => (
            <InfoCard
              key={info.title}
              icon={info.icon}
              title={info.title}
              description={info.description}
              color={info.color}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Fun fact */}
        <div
          className={`mt-12 text-center glass rounded-2xl p-8 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ 
            transitionDelay: "500ms",
            background: "linear-gradient(135deg, rgba(255, 105, 180, 0.1), rgba(255, 215, 0, 0.1), rgba(0, 206, 209, 0.1))",
          }}
        >
          <p className="text-lg text-gray-700">
            <span className="font-bold text-pink-500">Fun Fact:</span> The night before Holi is called{" "}
            <span className="font-semibold text-orange-500">&quot;Holika Dahan&quot;</span>, where 
            people light bonfires to symbolize the victory of good over evil! 🔥
          </p>
        </div>
      </div>
    </section>
  );
}
