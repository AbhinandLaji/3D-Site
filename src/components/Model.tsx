"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.Mesh;
  };
  materials: {
    TexMap: THREE.MeshStandardMaterial;
  };
};

type ModelProps = JSX.IntrinsicElements["group"] & {
  onRefReady?: (ref: THREE.Group | null) => void;
};

export default function Model({ onRefReady, ...props }: ModelProps) {
  // Use the path where gltfjsx saved it in your public folder
  const { nodes, materials } = useGLTF("/models/model-transformed.glb") as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (onRefReady) onRefReady(groupRef.current);
  }, [onRefReady]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh geometry={nodes.mesh_0.geometry} material={materials.TexMap} />
    </group>
  );
}

useGLTF.preload("/models/model-transformed.glb");
