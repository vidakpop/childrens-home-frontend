import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SiTruenas } from "react-icons/si";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [sliderRef, setSliderRef] = useState(null);

  useEffect(() => {
    axios
      .get("https://csr.technologent.co.ke/api/gallery/")
      .then((response) => setImages(response.data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const openPopup = (index) => {
    setSelectedImageIndex(index);
  };

  const closePopup = () => {
    setSelectedImageIndex(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-5">
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

      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <motion.div
            className="max-w-2xl w-full h-[80vh] bg-gray-900 rounded-xl relative flex flex-col justify-center items-center p-5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Close
            </button>

            <Slider ref={setSliderRef} {...settings} initialSlide={selectedImageIndex}>
              {images.map((img) => (
                <div key={img.id} className="flex justify-center items-center">
                  <motion.img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-[60vh] object-contain rounded-xl shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              ))}
            </Slider>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
