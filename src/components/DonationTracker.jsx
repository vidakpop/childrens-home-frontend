import { useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { SparklesCore } from "@/components/ui/sparkles";
import { FaPhoneAlt, FaHeart } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Donate = () => {
  const targetAmount = 100000;
  const [raisedAmount, setRaisedAmount] = useState(65000); // Example value
  const percentage = (raisedAmount / targetAmount) * 100;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black to-gray-900 flex flex-col items-center justify-center text-white p-6 overflow-hidden">
      {/* Glowing Effects */}
      <SparklesCore className="absolute inset-0 opacity-20" />

      {/* Heading */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-6xl font-extrabold text-center mb-8 neon-glow"
      >
        💰 How You Can Chip In 🎊🎊
      </motion.h1>

      {/* Donation Goal */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-lg border border-gray-700 relative"
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          Our Target: <span className="text-blue-400">Ksh. 100,000+</span>
        </h2>
        <Progress value={percentage} className="h-6 bg-gray-900 rounded-lg" />
        <p className="text-center mt-2 text-lg text-green-400">Raised: Ksh. {raisedAmount}</p>
        <p className="text-center text-red-400">Remaining: Ksh. {targetAmount - raisedAmount}</p>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-8 text-center bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 w-full max-w-md relative"
      >
        <h3 className="text-lg font-semibold text-blue-400 flex items-center justify-center">
          📞 Donate Today!
        </h3>
        <p className="mt-2 flex items-center justify-center gap-2 text-lg">
          <FaPhoneAlt className="text-green-400" /> Mrs. Debbie Wainaina: <span className="font-bold">0796 935 586</span>
        </p>
        <p className="mt-2 flex items-center justify-center gap-2 text-lg">
          <MdEmail className="text-yellow-400" /> duasa@daystar.ac.ke
        </p>
        <p className="mt-4 text-pink-400 font-bold flex items-center justify-center">
          <FaHeart className="mr-2" /> Together, we can make a lasting impact! ❤️
        </p>
      </motion.div>
    </div>
  );
};

export default Donate;
