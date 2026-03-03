import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Sample friend images from Unsplash (Holi celebration themed)
const friendImages = [
  {
    id: 1,
    url: "/friends-gallery.jpg",
    caption: "Colors of Joy! 🎨",
  },
];

// Holi colors for overlays
const overlayColors = ["#FF1493", "#FFD700", "#00CED1", "#32CD32", "#9400D3", "#FF6347"];

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
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function FriendsGallery() {
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const { ref, isVisible } = useFadeInOnScroll();

  // Navigate lightbox
  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxImage === null) return;
    
    if (direction === "prev") {
      setLightboxImage(lightboxImage === 0 ? friendImages.length - 1 : lightboxImage - 1);
    } else {
      setLightboxImage(lightboxImage === friendImages.length - 1 ? 0 : lightboxImage + 1);
    }
  };

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };

    if (lightboxImage !== null) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxImage]);

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-pacifico text-3xl sm:text-4xl md:text-5xl mb-4 text-gray-800">
            Friends Gallery
          </h2>
          <p className="text-gray-600 text-lg">
            Memories painted in colors of friendship! 📸
          </p>
        </div>

        {/* Image grid */}
        <div className="flex justify-center">
          {friendImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 w-full max-w-md ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                aspectRatio: "3/2",
              }}
              onClick={() => setLightboxImage(index)}
            >
              {/* Image */}
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Colorful overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${overlayColors[index % overlayColors.length]}cc, ${overlayColors[(index + 2) % overlayColors.length]}cc)`,
                }}
              />

              {/* Caption on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-bold text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {image.caption}
                </p>
              </div>

              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 30px ${overlayColors[index % overlayColors.length]}50`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <div
            className="max-w-4xl max-h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={friendImages[lightboxImage].url}
              alt={friendImages[lightboxImage].caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            {/* Caption */}
            <p className="absolute bottom-0 left-0 right-0 text-center text-white text-xl font-bold py-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
              {friendImages[lightboxImage].caption}
            </p>
          </div>

          {/* Next button */}
          <button
            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {lightboxImage + 1} / {friendImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
