"use client";

import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion-3d";

import Points from "./Points";

const Experience = () => {
  return (
    <div className="h-screen w-screen top-0 left-0 fixed">
      <Canvas camera={{ position: [0, 40, 0], fov: 45, far: 2000 }}>
        <Suspense fallback={null}>
          <motion.group
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 0.5 }}
            transition={{
              duration: 2000,
              type: "spring",
            }}
          >
            <Points />
          </motion.group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Experience;
