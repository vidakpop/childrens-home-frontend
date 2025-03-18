import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/gallery/")
      .then((response) => setImages(response.data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-5">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {images.map((img) => (
          <motion.div
            key={img.id}
            className="relative overflow-hidden rounded-2xl cursor-pointer"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={() => setSelectedImage(img.image)}
          >
            <motion.img
              src={img.image}
              alt="Gallery"
              className="w-full h-52 object-cover rounded-2xl shadow-lg shadow-blue-500/50 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", damping: 10 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-80"
      >
        <motion.div
          className="max-w-3xl w-full p-5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={selectedImage}
            alt="Enlarged"
            className="w-full h-auto rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Close
          </button>
        </motion.div>
      </Modal>
    </div>
  );
};

export default Gallery;
