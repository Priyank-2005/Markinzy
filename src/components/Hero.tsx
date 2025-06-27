'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Icosahedron,
  Sphere,
  MeshDistortMaterial,
  Stars,
  TorusKnot,
} from '@react-three/drei';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  MotionValue,
} from 'framer-motion';
import * as THREE from 'three';

/* ──────────── Helpers ──────────── */

const useViewport = () => {
  const [vw, setVw] = useState(1920);
  const [vh, setVh] = useState(1080);
  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return { vw, vh, isMobile: vw < 768 };
};

/* ──────────── 3-D sub-components ──────────── */

function RotatingIcosahedron({
  zValue,
  scale,
}: {
  zValue: MotionValue<number>;
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    ref.current.rotation.x += 0.003;
    ref.current.rotation.y += 0.004;
    ref.current.position.z = zValue.get();
  });
  return (
    <Icosahedron ref={ref} args={[1.5 * scale, 0]}>
      <meshStandardMaterial color="#8b5cf6" roughness={0.3} metalness={0.8} />
    </Icosahedron>
  );
}

function DistortedBlob({
  distortion,
  scale,
}: {
  distortion: MotionValue<number>;
  scale: number;
}) {
  const mat = useRef<React.ElementRef<typeof MeshDistortMaterial>>(null);

  useFrame(() => {
    if (mat.current) mat.current.distort = distortion.get();
  });

  return (
    <Sphere args={[1.2 * scale, 64, 64]}>
      <MeshDistortMaterial
        ref={mat}
        color="#8b5cf6"
        roughness={0.2}
        speed={2.5}
        distort={0.4}
      />
    </Sphere>
  );
}

/* ──────────── Hero ──────────── */

export default function Hero() {
  const { vw, vh, isMobile } = useViewport();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();

  const moveX = useTransform(mouseX, [0, vw], [-20, 20]);
  const moveY = useTransform(mouseY, [0, vh], [-20, 20]);
  const scrollOffset = useTransform(scrollY, [0, 300], [0, -80]);
  const distortion = useTransform(scrollY, [0, 300], [0.2, 1.2]);
  const depthZ = useTransform(scrollY, [0, 500], [0, -10]);

  const staticY = useTransform(scrollOffset, [0, 1], [0, 0]);
  const combinedY = useTransform(
    [moveY, scrollOffset],
    (latest: number[]) => latest[0] + latest[1]
  );

  const finalX = isMobile ? 0 : moveX;
  const finalY = isMobile ? staticY : combinedY;

  const onMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      id="hero"
      onMouseMove={onMove}
      className="relative flex flex-col items-center justify-center text-center w-full px-6 mx-auto"
      style={{ minHeight: 'calc(100vh - 300px)' }}
    >
      {/* 3-D Background */}
      <Canvas className="absolute inset-0 -z-10" camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 3, 2]} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <DistortedBlob distortion={distortion} scale={isMobile ? 0.6 : 1} />
        <RotatingIcosahedron zValue={depthZ} scale={isMobile ? 0.6 : 1} />
        <TorusKnot
          args={[0.8 * (isMobile ? 0.6 : 1), 0.25 * (isMobile ? 0.6 : 1), 80, 12]}
        >
          <meshStandardMaterial
            color="#9333ea"
            roughness={0.2}
            metalness={0.8}
            emissive="#7c3aed"
            emissiveIntensity={0.3}
          />
        </TorusKnot>
        <OrbitControls enableZoom={false} enableRotate={!isMobile} />
      </Canvas>

      {/* Text */}
      <motion.div
        style={{ x: finalX, y: finalY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 leading-tight">
          {/* Mobile: two lines */}
          <span className="block md:hidden">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              AI Powered
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Marketing{' '}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Redefined</span>
            </motion.div>
          </span>

          {/* Desktop: single line */}
          <span className="hidden md:inline-block">
            AI Powered Marketing{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Redefined</span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-gray-600 mb-8"
        >
          Generate content, fix SEO, and schedule campaigns — all in seconds.
        </motion.p>

        <motion.a
          href="/pricing"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block rounded-full bg-indigo-600 px-8 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition"
        >
          Start For Free
        </motion.a>
      </motion.div>
    </section>
  );
}
