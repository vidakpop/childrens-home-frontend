import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://csr.technologent.co.ke/api/gallery/")
      .then((response) => {
        console.log("Fetched images:", response.data);
        setImages(response.data);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const openPopup = (index) => {
    setSelectedImageIndex(index);
  };

  const closePopup = (event) => {
    if (event.target.id === "popup-overlay") {
      setSelectedImageIndex(null);
    }
  };

  const prevSlide = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextSlide = () => {
    setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedImageIndex !== null) {
        if (event.key === "ArrowLeft") prevSlide();
        if (event.key === "ArrowRight") nextSlide();
        if (event.key === "Escape") setSelectedImageIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <div id="gallery" className="min-h-screen bg-black flex flex-col items-center p-5">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-4xl sm:text-6xl font-extrabold text-white mb-8 text-center"
      >
        Tiny Feet, Big Hearts{" "}
        <span className="text-blue-500 neon-glow">A Peek into Pillars of Hope</span>
      </motion.h1>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            className="relative overflow-hidden rounded-2xl cursor-pointer"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={() => openPopup(index)}
          >
            <motion.img
              src={img.image}
              alt={img.title}
              className="w-full h-52 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", damping: 10 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Pop-up with Custom Carousel */}
      {selectedImageIndex !== null && images.length > 0 && (
        <div
          id="popup-overlay"
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-3xl bg-gray-900 p-6 rounded-xl shadow-xl flex items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()} // Prevent background click
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-red-600 transition"
            >
              <X size={24} />
            </button>

            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image Display */}
            <div className="flex justify-center items-center">
              <motion.img
                src={images[selectedImageIndex].image}
                alt={images[selectedImageIndex].title}
                className="w-full h-[70vh] object-contain rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
              />
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
