import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image:
      "https://images01.nicepagecdn.com/page/53/32/website-builder-preview-533265.jpg",
    title: "Explore Global Flavors",
    description:
      "Dive into delicious recipes from around the world, right from your kitchen.",
  },
  {
    id: 2,
    image: "https://i.ibb.co/9H0nVCr2/Screenshot-from-2025-05-24-15-49-11.png",
    title: "Cook with Confidence",
    description:
      "Step-by-step instructions and tips to help you master every dish.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/GvPKTYNZ/Screenshot-from-2025-05-24-16-09-04.png",
    title: "Save Your Favorites",
    description: "Bookmark recipes you love and build your personal cookbook.",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        {/* Slides wrapper */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white flex flex-col justify-end p-6 md:p-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg text-gray-200">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Counter */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 text-white rounded-full text-xs">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
};

export default Slider;
