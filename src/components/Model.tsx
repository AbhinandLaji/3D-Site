"use client";

import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { ColladaLoader } from "three-stdlib";
import * as THREE from "three";

type ModelProps = JSX.IntrinsicElements["group"] & {
  onRefReady?: (ref: THREE.Group | null) => void;
};

export default function Model({ onRefReady, ...props }: ModelProps) {
  const collada = useLoader(ColladaLoader, "/models/redshoe/model/model.dae");

  const [colorMap, normalMap, roughnessMap, metalnessMap] = useTexture([
    "/models/redshoe/textures/initialShadingGroup_albedo.jpeg",
    "/models/redshoe/textures/initialShadingGroup_normal.png",
    "/models/redshoe/textures/initialShadingGroup_roughness.jpeg",
    "/models/redshoe/textures/initialShadingGroup_metallic.jpeg",
  ]);

  // This outer group is what GSAP animates — its pivot must be at the shoe's true center
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (onRefReady) onRefReady(groupRef.current);
  }, [onRefReady]);

  useEffect(() => {
    // Configure texture color spaces
    colorMap.colorSpace = THREE.SRGBColorSpace;
    colorMap.flipY = false;
    normalMap.colorSpace = THREE.NoColorSpace;
    normalMap.flipY = false;
    roughnessMap.colorSpace = THREE.NoColorSpace;
    roughnessMap.flipY = false;
    metalnessMap.colorSpace = THREE.NoColorSpace;
    metalnessMap.flipY = false;

    // Instantiated shared material for maximum rendering efficiency and minimum draw call overhead
    const sharedMaterial = new THREE.MeshStandardMaterial({
      map: colorMap,
      normalMap,
      roughnessMap,
      metalnessMap,
      metalness: 1,
      roughness: 1,
      color: new THREE.Color("#ff0000"),
    });

    // Apply shared material to every mesh in the loaded scene
    collada.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = sharedMaterial;
      }
    });

    // ✅ CORRECT pivot centering:
    // Compute bounding box center and SUBTRACT it from the scene position.
    // This moves the shoe's geometric center to (0,0,0) so GSAP
    // rotates/animates around the shoe's true center — no more corner swinging.
    const box = new THREE.Box3().setFromObject(collada.scene);
    const center = box.getCenter(new THREE.Vector3());
    collada.scene.position.sub(center);

  }, [collada.scene, colorMap, normalMap, roughnessMap, metalnessMap]);

  return (
    // groupRef is what GSAP moves — pivot is now at shoe center
    <group ref={groupRef} {...props} dispose={null}>
      <primitive object={collada.scene} scale={0.3} />
    </group>
  );
}

// Preload textures to start assets downloading immediately during page initialization
useTexture.preload("/models/redshoe/textures/initialShadingGroup_albedo.jpeg");
useTexture.preload("/models/redshoe/textures/initialShadingGroup_normal.png");
useTexture.preload("/models/redshoe/textures/initialShadingGroup_roughness.jpeg");
useTexture.preload("/models/redshoe/textures/initialShadingGroup_metallic.jpeg");
