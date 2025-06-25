'use client';

import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const clients = [
  { name: 'TechNova Inc.', image: '/clients/technova.jpg' },
  { name: 'D2C Labs', image: '/clients/d2clabs.jpg' },
  { name: 'BrandSphere', image: '/clients/brandsphere.jpg' },
  { name: 'CloudEdge', image: '/clients/cloudedge.jpg' },
  { name: 'PixelHive', image: '/clients/pixelhive.jpg' },
  { name: 'NexaFlow', image: '/clients/nexaflow.jpg' },
];

export default function Testimonials() {
  const duplicateClients = [...clients, ...clients];
  const controls = useAnimation();
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Start the infinite scroll animation
  useEffect(() => {
    if (!isDragging) {
      controls.start({
        x: ['0%', '-50%'],
        transition: {
          repeat: Infinity,
          ease: 'linear',
          duration: 20,
        },
      });
    } else {
      controls.stop();
    }
  }, [controls, isDragging]);

  // When drag starts, pause animation
  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
  };

  // When drag ends, resume animation
  const handleDragEnd = () => {
    setIsDragging(false);
    controls.start({
      x: ['0%', '-50%'],
      transition: {
        repeat: Infinity,
        ease: 'linear',
        duration: 20,
      },
    });
  };

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Our Happy Clients
        </h2>
      </div>

      <div
        className="relative w-full overflow-hidden cursor-grab"
        ref={containerRef}
      >
        <motion.div
          className="flex gap-28 w-max"
          animate={controls}
          style={{ x }}
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.2}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onHoverStart={() => controls.stop()}
          onHoverEnd={() => {
            if (!isDragging) {
              controls.start({
                x: ['0%', '-50%'],
                transition: {
                  repeat: Infinity,
                  ease: 'linear',
                  duration: 20,
                },
              });
            }
          }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {duplicateClients.map((client, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, y: -6, boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}
              className="min-w-[180px] h-[140px] rounded-2xl overflow-hidden shadow-md relative transition-all duration-300"
            >
              <Image
                src={client.image}
                alt={client.name}
                width={200}
                height={160}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm font-semibold text-center py-2">
                {client.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
