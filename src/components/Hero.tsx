'use client';
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Icosahedron,
  Stars,
  Sphere,
  MeshDistortMaterial,
} from '@react-three/drei';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  MotionValue,
} from 'framer-motion';
import * as THREE from 'three';

function RotatingIcosahedron({ zValue }: { zValue: MotionValue<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.004;
      meshRef.current.position.z = zValue.get();
    }
  });

  return (
    <Icosahedron args={[1.5, 0]} ref={meshRef}>
      <meshStandardMaterial color="#8b5cf6" roughness={0.3} metalness={0.8} />
    </Icosahedron>
  );
}

function DistortedBlob({ distortion }: { distortion: MotionValue<number> }) {
  const materialRef = useRef(null);
  useFrame(() => {
    if (materialRef.current) {
      (materialRef.current as { distort?: number }).distort = distortion.get();
    }
  });

  return (
    <Sphere args={[1.2, 64, 64]} scale={2.2}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#8b5cf6"
        distort={distortion.get()}
        speed={2.5}
        roughness={0.2}
      />
    </Sphere>
  );
}


export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [vw, setVw] = useState(1920);
  const [vh, setVh] = useState(1080);

  useEffect(() => {
    setVw(window.innerWidth);
    setVh(window.innerHeight);
  }, []);

  const { scrollY } = useScroll();
  const moveX = useTransform(mouseX, [0, vw], [-20, 20]);
  const moveY = useTransform(mouseY, [0, vh], [-20, 20]);
  const scrollOffset = useTransform(scrollY, [0, 300], [0, -80]);
  const distortion = useTransform(scrollY, [0, 300], [0.2, 1.2]);
  const depthZ = useTransform(scrollY, [0, 500], [0, -10]);

  const heading = 'AI-Powered Marketing';

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center text-center w-full px-6 mx-auto"
      style={{ height: 'calc(100vh - 346px)' }}
    >
      {/* 3D Background */}
      <Canvas className="absolute inset-0 -z-10">
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 3, 2]} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <DistortedBlob distortion={distortion} />
        <RotatingIcosahedron zValue={depthZ} />
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Text Content */}
      <motion.div
        style={{
          x: moveX,
          y: useTransform([moveY, scrollOffset], ([my, sy]) => my + sy),
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
          {heading.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent ml-2">
            Redefined
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 mb-8"
        >
          Generate content, fix SEO, and schedule campaigns — all in seconds.
        </motion.p>

        <motion.a
          href="/pricing"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-block rounded-full bg-indigo-600 px-8 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition"
        >
          Start For Free
        </motion.a>
      </motion.div>
    </section>
  );
}
