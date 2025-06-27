'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Sphere,
  Icosahedron,
  MeshDistortMaterial,
  OrbitControls,
} from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const features = [
  {
    title: 'Generative AI',
    description:
      'Create catchy hashtags, captions, blog titles, and summaries in seconds.',
    color: '#8b5cf6',
  },
  {
    title: 'Inclusive Media',
    description: 'Auto-generate alt text for images to ensure inclusivity.',
    color: '#ec4899',
  },
  {
    title: 'SEO Fixes',
    description: 'Identify and fix on-page SEO issues for better rankings.',
    color: '#3b82f6',
  },
  {
    title: 'Keyword Discovery',
    description: 'Find high-performing keywords to drive organic traffic.',
    color: '#f59e0b',
  },
  {
    title: 'SEO Essentials',
    description:
      'Generate sitemaps and robot files to stay optimized and compliant.',
    color: '#10b981',
  },
  {
    title: 'Campaign Automation',
    description:
      'Plan, schedule, and launch multi-platform campaigns in a single click.',
    color: '#6366f1',
  },
];

function ShapeMesh({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isSphere, setIsSphere] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSphere((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.007;
    }
  });

  return isSphere ? (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color={color}
        distort={0.4}
        speed={2}
        roughness={0.3}
      />
    </Sphere>
  ) : (
    <Icosahedron ref={meshRef} args={[1.2, 0]}>
      <MeshDistortMaterial
        color={color}
        distort={0.4}
        speed={2}
        roughness={0.3}
      />
    </Icosahedron>
  );
}


function AnimatedShape({ color }: { color: string }) {
  return (
    <Canvas className="h-16 w-16">
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
      <ShapeMesh color={color} />
    </Canvas>
  );
}

function FeatureCard({ title, description, color, index }: {
  title: string; description: string; color: string; index: number;
}) {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      glareEnable={false}
      scale={1}
      transitionSpeed={1000}
      gyroscope={false}
      trackOnWindow={false}
      tiltReverse
      className="w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        /* ---------- responsive card ---------- */
        className="bg-white border border-gray-200 rounded-xl p-5 shadow-lg
                   hover:shadow-2xl transition duration-300
                   w-full max-w-[400px] mx-auto            /* ⬅ mobile 100%, cap at 400px */
                   min-h-[320px] flex flex-col justify-between"
      >
        {/* Canvas + halo */}
        <div className="flex justify-center mb-3 relative">
          <div
            className="absolute w-20 h-20 rounded-full blur-2xl opacity-30 -z-10"
            style={{ background: color }}
          />
          <AnimatedShape color={color} />
        </div>

        <h3 className="text-lg font-semibold mb-1 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow">
          {description}
        </p>

        <a
          href="/pricing"
          className="mt-4 text-white bg-indigo-600 px-4 py-2 rounded-full shadow
                     hover:bg-indigo-700 transition text-sm self-center"
        >
          Start Free Trial
        </a>
      </motion.div>
    </Tilt>
  );
}


export default function Features() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const blurAmount = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const blurStyle = useTransform(blurAmount, (b) => `blur(${b}px)`);

  return (
    <section
      id="features"
      ref={ref}
      className="relative py-24 px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Scroll-synced background blur */}
      <motion.div
        style={{ filter: blurStyle }}
        className="absolute inset-0 bg-gradient-to-b from-purple-50 to-transparent pointer-events-none z-0"
      />

      {/* Section heading + animation */}
      <motion.div
        style={{ y }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center relative z-10"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="h-1 w-24 mx-auto origin-left bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-10"
        />
        <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Powerful AI Features
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          Explore advanced tools Markinzy offers for automating and optimizing your marketing strategy.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {features.map((f, i) => (
          <FeatureCard
            key={i}
            title={f.title}
            description={f.description}
            color={f.color}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
