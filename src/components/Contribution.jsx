import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const StudentsContribution = ({ raisedAmount, iceaLionContribution }) => {
  const studentContribution = raisedAmount - iceaLionContribution;
  return (
    <p className="text-gray-300 mt-4">
      📊 Students: <span className="text-blue-400 font-bold">Ksh. {studentContribution.toLocaleString()}</span>
    </p>
  );
};

const ContributionComparison = () => {
  const [raisedAmount, setRaisedAmount] = useState(null);
  const targetAmount = 100000;
  const iceaLionContribution = 9500;

  useEffect(() => {
    const fetchRaisedAmount = async () => {
      try {
        setTimeout(() => {
          const donationData = { raisedAmount: 64000 }; 
          setRaisedAmount(donationData.raisedAmount);
        }, 1000);
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };
    fetchRaisedAmount();
  }, []);

  if (raisedAmount === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="text-2xl font-bold text-cyan-400"
        >
          🔄 Loading contribution data...
        </motion.div>
      </div>
    );
  }

  const data = [
    { name: "Students", value: raisedAmount - iceaLionContribution },
    { name: "ICEA LION", value: iceaLionContribution },
  ];
  const COLORS = ["#00ffcc", "#ff3366"];
  const progress = Math.min((raisedAmount / targetAmount) * 100, 100);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-10">
      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
      
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mb-5 text-center text-cyan-400"
      >
        🎯 Contribution Breakdown
      </motion.h1>
      
      <p className="text-lg text-gray-300 text-center max-w-2xl mb-6">
        Our target for the visit is <span className="text-green-400 font-bold">Ksh. {targetAmount.toLocaleString()}</span>.<br />
        We are currently at <span className="text-green-400 font-bold">Ksh. {raisedAmount.toLocaleString()}</span>, which is <span className="text-yellow-400 font-bold">{progress.toFixed(2)}%</span> of our overall goal.
      </p>
      
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center">
        <p className="text-lg text-center mb-3">💡 Contributions So Far</p>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <StudentsContribution raisedAmount={raisedAmount} iceaLionContribution={iceaLionContribution} />
        <p className="text-gray-300">🏛️ ICEA LION: <span className="text-red-400 font-bold">Ksh. {iceaLionContribution.toLocaleString()}</span></p>
      </div>
    </div>
  );
};

export default ContributionComparison;