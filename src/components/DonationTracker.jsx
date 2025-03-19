import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const DonationTracker = () => {
  const targetAmount = 100000;
  const [raisedAmount, setRaisedAmount] = useState(68500); // Example amount
  const remainingAmount = targetAmount - raisedAmount;

  // Animated progress calculation
  const progress = Math.min((raisedAmount / targetAmount) * 100, 100);

  // Pie chart data
  const data = [
    { name: "Supplies", value: 40000 },
    { name: "Donations", value: 20000 },
    { name: "Admin Costs", value: 8500 },
  ];

  const COLORS = ["#00ffcc", "#ffcc00", "#ff3366"];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-5">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold text-center mb-6"
      >
        💰 How You Can Chip In 🎊🎊
      </motion.h1>

      <p className="text-xl text-center max-w-2xl mb-4 text-gray-300">
        Our target is <span className="text-green-400 font-bold">Ksh. {targetAmount.toLocaleString()}</span> to cover supplies, donations, and administrative costs.
        Your support ensures the success of this initiative and benefits the community. 🙌
      </p>

      {/* Donation Progress */}
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <p className="text-lg text-center mb-3">
          <span className="text-green-400 font-bold">Ksh. {raisedAmount.toLocaleString()}</span> raised so far! 🎉
        </p>
        <Progress value={progress} className="h-4 bg-gray-700 rounded-full" />
        <p className="text-center mt-3 text-gray-400">
          <span className="text-red-400 font-bold">Ksh. {remainingAmount.toLocaleString()}</span> remaining to reach our goal.
        </p>
      </div>

      {/* Donation Breakdown & Pie Chart */}
      <div className="flex flex-col lg:flex-row items-center justify-center mt-10 gap-10">
        {/* Pie Chart */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-72 h-72 bg-gray-900 rounded-full shadow-lg flex items-center justify-center"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Donation Categories */}
        <div className="flex flex-col space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-700 w-72"
            >
              <span className="font-bold text-lg text-white">{item.name}</span>
              <span className="text-green-300 font-bold">Ksh. {item.value.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-lg shadow-lg transition"
      >
        💖 Donate Now
      </motion.button>
    </div>
  );
};

export default DonationTracker;
