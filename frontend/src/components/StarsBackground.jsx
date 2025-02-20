import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const StarsBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <Stars radius={100} count={3000} factor={5} fade speed={5} />
      </Canvas>
    </div>
  );
};

export default StarsBackground;
