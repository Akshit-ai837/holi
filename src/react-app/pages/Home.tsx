import ColorBurstCanvas from "@/react-app/components/ColorBurstCanvas";
import FloatingParticles from "@/react-app/components/FloatingParticles";
import CountdownTimer from "@/react-app/components/CountdownTimer";
import AboutHoli from "@/react-app/components/AboutHoli";
import FriendsGallery from "@/react-app/components/FriendsGallery";
import HoliWishesGenerator from "@/react-app/components/HoliWishesGenerator";
import MusicToggle from "@/react-app/components/MusicToggle";
import Footer from "@/react-app/components/Footer";

export default function HomePage() {
  // Trigger color burst animation
  const handleThrowColors = () => {
    const triggerBurst = (window as unknown as { triggerColorBurst?: () => void }).triggerColorBurst;
    if (triggerBurst) {
      triggerBurst();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="fixed inset-0 z-0 animate-gradient"
        style={{
          background: `linear-gradient(
            135deg,
            hsl(330, 90%, 85%) 0%,
            hsl(45, 100%, 85%) 25%,
            hsl(200, 90%, 85%) 50%,
            hsl(280, 80%, 85%) 75%,
            hsl(330, 90%, 85%) 100%
          )`,
        }}
      />

      {/* Floating particles background */}
      <FloatingParticles />

      {/* Color burst canvas */}
      <ColorBurstCanvas />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-40 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-40 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 opacity-40 blur-3xl animate-float" style={{ animationDelay: "4s" }} />

        {/* Main content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading with Pacifico font */}
          <h1 
            className="font-pacifico text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 animate-fade-in-up"
            style={{
              background: "linear-gradient(135deg, #FF1493, #FFD700, #00CED1, #9400D3)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-shift 5s ease infinite, fade-in-up 0.8s ease-out",
              textShadow: "0 0 60px rgba(255, 105, 180, 0.5)",
              filter: "drop-shadow(0 0 30px rgba(255, 215, 0, 0.3))",
            }}
          >
            Happy Holi Friends!
          </h1>

          {/* Subheading */}
          <p 
            className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Let&apos;s Celebrate the <span className="font-semibold bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">Festival of Colors</span> Together
          </p>

          {/* Throw Colors Button */}
          <button
            onClick={handleThrowColors}
            className="group relative px-10 py-5 text-xl sm:text-2xl font-bold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 animate-fade-in-up animate-pulse-glow"
            style={{ 
              animationDelay: "0.4s",
              background: "linear-gradient(135deg, #FF1493, #FF6347, #FFD700)",
            }}
          >
            {/* Button glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Animated border */}
            <span 
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, #FF1493, #FFD700, #00CED1, #9400D3)",
                backgroundSize: "400% 400%",
                animation: "gradient-shift 3s ease infinite",
                padding: "3px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            <span className="relative z-10 flex items-center gap-3">
              Throw Colors <span className="text-2xl sm:text-3xl">🎨</span>
            </span>
          </button>

          {/* Instruction text */}
          <p 
            className="mt-8 text-gray-600 text-sm sm:text-base animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            Click the button to splash colors across the screen!
          </p>
        </div>

        {/* Decorative color splashes */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 opacity-60">
          {["#FF1493", "#FFD700", "#00CED1", "#32CD32", "#9400D3"].map((color, i) => (
            <div
              key={color}
              className="w-4 h-4 sm:w-6 sm:h-6 rounded-full animate-float"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 20px ${color}`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-gray-400 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Countdown Timer Section */}
      <CountdownTimer />

      {/* About Holi Section */}
      <AboutHoli />

      {/* Friends Gallery */}
      <FriendsGallery />

      {/* Holi Wishes Generator */}
      <HoliWishesGenerator />

      {/* Footer */}
      <Footer />

      {/* Music Toggle Button */}
      <MusicToggle />
    </div>
  );
}
