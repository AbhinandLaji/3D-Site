"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import React, { Suspense } from "react";
import Model from "./Model";
import { useScrollAssembly } from "@/hooks/useScrollAssembly";

export default function Scene() {
  const { setModelRef } = useScrollAssembly();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={2} 
            color="#ffffff" 
          />
          
          <directionalLight 
            position={[-5, 5, 5]} 
            intensity={1} 
            color="#f5deb3" 
          />

          <Environment preset="studio" environmentIntensity={1.2} />

          <group position={[0, 0, 0]}>
            <Model onRefReady={setModelRef} />
          </group>

        </Suspense>
      </Canvas>
    </div>
  );
}
