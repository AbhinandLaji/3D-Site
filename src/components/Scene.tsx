"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import React, { Suspense, useEffect } from "react";
import Model from "./Model";
import { useScrollAssembly } from "@/hooks/useScrollAssembly";
import gsap from "gsap";

// FIX #13: When frameloop="demand", Three.js only renders when invalidate() is called.
// This InvaliateOnGSAP component hooks into the render loop and forces a frame
// whenever GSAP is actively animating the model — preventing idle 60fps rendering.
function InvalidateOnGSAP() {
  const { invalidate } = useThree();

  useEffect(() => {
    // GSAP ticker fires every frame when animations are active.
    // We piggyback on it to call invalidate() only when needed.
    const handler = () => invalidate();
    gsap.ticker.add(handler);
    return () => gsap.ticker.remove(handler);
  }, [invalidate]);

  return null;
}

export default function Scene() {
  const { setModelRef } = useScrollAssembly();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* FIX #13: frameloop="demand" — Three.js only renders when invalidate() is called.
          The GSAP ticker triggers invalidate() during scroll animations.
          When the model is idle (no scroll), zero GPU frames are wasted. */}
      <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <InvalidateOnGSAP />
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
