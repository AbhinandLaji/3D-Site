"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import React, { Suspense } from "react";
import Model from "./Model";
import { useScrollAssembly } from "@/hooks/useScrollAssembly";

export default function Scene() {
  const { setModelRef } = useScrollAssembly();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* 
        dpr capped to [1, 2] for performance
        shadows disabled by default. If performance allows, add `shadows` to Canvas 
        and `castShadow`/`receiveShadow` to lights and meshes.
      */}
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.5} 
            color="#ffffff" 
          />
          
          <spotLight 
            position={[-5, 5, -5]} 
            intensity={2} 
            angle={0.5} 
            penumbra={1} 
            color="#88ccff" 
          />
          
          <spotLight 
            position={[0, -5, 5]} 
            intensity={1} 
            angle={0.8} 
            penumbra={0.5} 
            color="#ffaa88" 
          />

          <Environment preset="city" />

          {/* We wrap the model in a group to center/scale it if needed */}
          <group position={[0, -1, 0]}>
            <Model onRefReady={setModelRef} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
