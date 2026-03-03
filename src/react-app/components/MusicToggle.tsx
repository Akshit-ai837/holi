import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Using a local Holi song placed in public folder
// Make sure the file holi-song.mp3 exists in public/
const MUSIC_URL = "/holi-song.mp3";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
    });

    audio.addEventListener("error", () => {
      console.log("Audio failed to load");
      setIsLoaded(true); // Still show button, just won't play
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay was prevented
        console.log("Playback requires user interaction");
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110 ${
        isPlaying ? "animate-pulse" : ""
      }`}
      style={{
        background: isPlaying
          ? "linear-gradient(135deg, #FF1493, #FFD700)"
          : "rgba(255, 255, 255, 0.3)",
        boxShadow: isPlaying
          ? "0 0 30px rgba(255, 105, 180, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)"
          : "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
      title={isPlaying ? "Pause Music" : "Play Holi Music"}
      disabled={!isLoaded}
    >
      {isPlaying ? (
        <Volume2 className="w-6 h-6 text-white" />
      ) : (
        <VolumeX className="w-6 h-6 text-gray-600" />
      )}

      {/* Music waves animation when playing */}
      {isPlaying && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-white/50 rounded-full"
                style={{
                  height: "30%",
                  animation: `music-wave 0.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes music-wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </button>
  );
}
