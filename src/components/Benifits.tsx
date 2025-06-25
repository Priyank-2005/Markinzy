'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const benefits = [
  {
    title: 'All-in-One Solution',
    description:
      "A complete suite of tools designed to streamline every aspect of your marketing workflow. Whether you're managing social media, email campaigns, or analyzing performance metrics, our platform provides everything you need in one place.",
    color: '#8b5cf6',
    shape: 'sphere',
  },
  {
    title: 'Affordable & Scalable',
    description:
      "Whether you're just starting out or managing a growing business, you can scale your subscription to suit your needs without breaking the bank. Our plans grow with you, ensuring that you always have access to the tools you need at a price you can afford.",
    color: '#ec4899',
    shape: 'icosahedron',
  },
  {
    title: 'Save Time & Effort',
    description:
      "Eliminate the need for manual, repetitive tasks with our automation features. Maximize your productivity, reduce stress, and free up time for creativity and innovation, all while watching your business grow effortlessly with the help of our intuitive platform.",
    color: '#3b82f6',
    shape: 'sphere',
  },
  {
    title: 'Extended Support & Training',
    description:
      "Get dedicated customer support and access to comprehensive training materials so you can get the most out of Markinzy at every stage of your business growth.",
    color: '#f59e0b',
    shape: 'icosahedron',
  },
  {
    title: 'Secure & Reliable',
    description:
      "Benefit from enterprise-grade security protocols and 99.9% uptime to keep your data safe and your marketing running smoothly without interruptions.",
    color: '#10b981',
    shape: 'sphere',
  },
  {
    title: 'Insightful Analytics',
    description:
      "Gain deep insights with powerful analytics dashboards that help you track performance and optimize your marketing strategy for maximum ROI.",
    color: '#d946ef',
    shape: 'icosahedron',
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const translateY1 = useTransform(scrollYProgress, [0, 1], [30, -20]);
  const translateY2 = useTransform(scrollYProgress, [0, 1], [15, -10]);
  const translateY3 = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const blur = useTransform(scrollYProgress, [0, 1], ['0px', '4px']);

  return (
    <section
      ref={ref}
      id="benefits"
      className="relative py-24 px-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
    >
      <motion.h2
        className="text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent select-none"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        Why Choose Us
      </motion.h2>

      <motion.div
        className="mx-auto mb-14 h-1 w-24 rounded bg-gradient-to-r from-indigo-600 to-purple-600"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        viewport={{ once: true }}
        style={{ transformOrigin: 'left' }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {benefits.map((b, i) => {
          const translateY = i === 0 ? translateY1 : i === 1 ? translateY2 : translateY3;
          return (
            <motion.div
              key={i}
              style={{ y: translateY, filter: blur }}
              className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-default overflow-hidden"
            >
              <h3 className="relative text-xl font-bold mb-4 text-gray-900">
                {b.title}
              </h3>
              <p className="relative text-gray-700 leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Button */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <a
          href="/pricing"
          className="inline-block bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-indigo-400 transition hover:scale-105 duration-300 animate-pulse"
        >
          Explore Pricing Plans
        </a>
      </motion.div>
    </section>
  );
}