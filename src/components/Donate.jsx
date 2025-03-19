import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { motion } from "framer-motion";

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

export default function Donate() {
  const ref = useRef();
  
  // Generate random star colors
  const particles = useMemo(() => {
    const arr = new Float32Array(3000);
    for (let i = 0; i < 3000; i++) arr[i] = (Math.random() - 0.5) * 10;
    return arr;
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      
      {/* 3D Space */}
      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        
        {/* 3D Rotating Coin */}
        <RotatingCoin />

        {/* Dynamic Colorful Particles */}
        <Points ref={ref} positions={particles} stride={3}>
          <PointMaterial 
            size={0.02} 
            color={["cyan", "magenta", "gold", "lime"][Math.floor(Math.random() * 4)]} 
            transparent opacity={0.8} 
          />
        </Points>
      </Canvas>

      {/* Animated Donate Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-cyan-500"
      >
        
      </motion.div>
    </div>
  );
}
