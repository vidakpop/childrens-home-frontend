import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { X } from "lucide-react";
import mpesa from "../assets/mpesa.jpeg";
import coin from "../assets/dollar.png";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";

// Rotating Coin Component
function RotatingCoin() {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.02; // Rotate the coin
  });

  return (
    <mesh ref={ref} position={[0, 1, 0]}>
      <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
      <meshStandardMaterial color="gold" emissive="yellow" emissiveIntensity={0.7} />
    </mesh>
  );
}

// Dynamic Background Particles
function BackgroundParticles() {
  const particles = useMemo(() => {
    const arr = new Float32Array(3000);
    for (let i = 0; i < 3000; i++) arr[i] = (Math.random() - 0.5) * 10;
    return arr;
  }, []);

  return (
    <Points positions={particles} stride={3}>
      <PointMaterial
        size={0.02}
        color={["cyan", "magenta", "gold", "lime"][Math.floor(Math.random() * 4)]}
        transparent
        opacity={0.8}
      />
    </Points>
  );
}

const DonationTracker = () => {
  const targetAmount = 100000;
  const [raisedAmount, setRaisedAmount] = useState(68500);
  const [showModal, setShowModal] = useState(false);
  const remainingAmount = targetAmount - raisedAmount;

  useEffect(() => {
    const interval = setInterval(() => {
      setRaisedAmount((prev) => (prev < targetAmount ? prev + Math.floor(Math.random() * 100) : prev));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.min((raisedAmount / targetAmount) * 100, 100);

  const data = [
    { name: "Supplies", value: 40000 },
    { name: "Donations", value: 20000 },
    { name: "Admin Costs", value: 8500 },
  ];
  const COLORS = ["#00ffcc", "#ffcc00", "#ff3366"];

  // Contribution Comparison Data
  const iceaLionAmount = 9500;
  const studentsAmount = raisedAmount - iceaLionAmount;

  const contributionData = [
    { name: "Students", amount: studentsAmount },
    { name: "ACTUARIES ", amount: iceaLionAmount },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-5 relative overflow-hidden">
      {/* 3D Canvas Background */}
      <Canvas className="absolute inset-0 z-0">
        <ambientLight intensity={0.5} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <BackgroundParticles />
        <RotatingCoin />
      </Canvas>

      {/* Content */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold text-center mb-6 z-10"
      >
        💰 How You Can Chip In 🎊🎊
      </motion.h1>

      <p className="text-xl text-center max-w-2xl mb-4 text-gray-300 z-10">
        Our target is <span className="text-green-400 font-bold">Ksh. {targetAmount.toLocaleString()}</span>.
        Your support makes a difference! 🙌
      </p>

      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 z-10">
        <p className="text-lg text-center mb-3">
          Raised: <span className="text-green-400 font-bold">Ksh. {raisedAmount.toLocaleString()}</span> 🎉
        </p>
        {/* Animated Progress Bar */}
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className="text-center mt-3 text-gray-400">
          Remaining: <span className="text-red-400 font-bold">Ksh. {remainingAmount.toLocaleString()}</span>
        </p>
      </div>

      {/* Contribution Comparison Section */}
      <div className="w-full max-w-2xl mt-10 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 z-10">
        <h2 className="text-2xl font-bold text-center mb-6">Contribution Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={contributionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", border: "1px solid #555", borderRadius: "8px" }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend />
            <Bar dataKey="amount" fill="#00ffcc" name="Amount (Ksh)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center mt-10 gap-10 z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-72 h-72 bg-gray-900 rounded-full shadow-lg flex items-center justify-center"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 relative cursor-pointer z-10"
        animate={{ rotateY: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        <img src={coin} alt="Flipping Coin" className="w-16 h-16" />
      </motion.div>

      <motion.button
        onClick={() => setShowModal(true)}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-lg shadow-lg transition z-10"
      >
        💖 Donate Now
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          >
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-white w-96 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-center mb-4">📞 Donate Today!</h2>
              <p className="text-center text-lg">Contact our Treasurer, Mrs. Debbie Wainaina at <br />
                <span className="font-bold text-green-300">0796 935 586</span> or email us at
                <span className="text-blue-300"> duasa@daystar.ac.ke</span>
              </p>
              <div className="flex justify-center mt-5">
                <motion.img
                  src={mpesa}
                  alt="Donate QR"
                  className="w-24 h-24 cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationTracker;