import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative color line */}
        <div className="flex justify-center gap-1 mb-8">
          {["#FF1493", "#FFD700", "#00CED1", "#32CD32", "#9400D3"].map((color) => (
            <div
              key={color}
              className="w-12 h-1 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Made with love text */}
        <p className="flex items-center justify-center gap-2 text-gray-600 text-lg font-medium">
          Made with{" "}
          <Heart
            className="w-5 h-5 text-red-500 animate-pulse"
            fill="currentColor"
          />{" "}
          for Friends
        </p>

        {/* Decorative floating dots */}
        <div className="flex justify-center gap-3 mt-8 opacity-50">
          {["#FF1493", "#FFD700", "#00CED1", "#32CD32", "#9400D3", "#FF6347"].map(
            (color, i) => (
              <div
                key={color}
                className="w-2 h-2 rounded-full animate-bounce"
                style={{
                  backgroundColor: color,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            )
          )}
        </div>
      </div>
    </footer>
  );
}
