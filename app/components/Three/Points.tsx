"use client";

import { useCallback, useMemo, useRef } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const Points = () => {
  const img = useLoader(THREE.TextureLoader, "/point.png");
  const sep = 3;

  const bufferRef = useRef<THREE.BufferAttribute>(null);
  const pointsRef = useRef<THREE.Points>(null);

  let t = 0;
  let f = 0.002;
  let a = 3;

  const graph = useCallback(
    (x: number, z: number) => {
      return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
    },
    [t, f, a]
  );

  const amountX = 10;
  const amountY = 50;
  const numParticles = amountX * amountY;

  const positions = useMemo(() => {
    const positions = [];

    for (let xi = 0; xi < numParticles; xi++) {
      for (let zi = 0; zi < numParticles; zi++) {
        const x = sep * (xi - numParticles / 2);
        const z = sep * (zi - numParticles / 2);
        const y = graph(x, z);
        positions.push(x, y, z);
      }
    }

    return new Float32Array(positions);
  }, [numParticles, sep, graph]);

  useFrame((_, delta) => {
    t += 5;
    if (!bufferRef.current || !pointsRef.current) return;

    const positions = bufferRef.current.array as number[];

    let i = 0;

    for (let xi = 0; xi < numParticles; xi++) {
      for (let zi = 0; zi < numParticles; zi++) {
        const x = sep * (xi - numParticles / 2);
        const z = sep * (zi - numParticles / 2);

        positions[i + 1] = graph(x, z);
        i += 3;
      }
    }

    bufferRef.current.needsUpdate = true;

    pointsRef.current.rotation.y += delta * 0.01;
    pointsRef.current.rotation.x = Math.sin(t / 2000) / 20;
    pointsRef.current.rotation.z = Math.cos(t / 2000) / 20;
  });

  return (
    <Float floatIntensity={1.5} rotationIntensity={1}>
      <points ref={pointsRef} rotation={[-0.6, 0, -3]}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            ref={bufferRef}
            attach={"attributes-position"}
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          attach="material"
          map={img}
          size={0.2}
          sizeAttenuation
          alphaTest={0.1}
        />
      </points>
    </Float>
  );
};

export default Points;
