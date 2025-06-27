'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
    Sphere,
    Icosahedron,
    MeshDistortMaterial,
    OrbitControls,
} from '@react-three/drei';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    { title: 'Sign Up & Connect', text: 'Set up your account and link your website or brand profiles in under 2 minutes.', color: '#6366f1' },
    { title: 'Add Brand Details', text: 'Tell Markinzy your brand’s tone, niche, and content goals to personalize output.', color: '#10b981' },
    { title: 'Generate Content', text: 'Instantly create social captions, blog headlines, and hashtags using AI.', color: '#f59e0b' },
    { title: 'Fix SEO Automatically', text: 'Run a one-click audit and apply fixes across meta tags, images, and links.', color: '#ec4899' },
    { title: 'Launch Campaigns', text: 'Schedule posts and deploy campaigns to multiple platforms seamlessly.', color: '#8b5cf6' },
];

/* 3-D helper */
function Shape({ color, isSphere }: { color: string; isSphere: boolean }) {
    const mesh = useRef<THREE.Mesh>(null!);
    useFrame(() => {
        mesh.current.rotation.x += 0.005;
        mesh.current.rotation.y += 0.008;
    });
    return isSphere ? (
        <Sphere ref={mesh} args={[1, 64, 64]}>
            <MeshDistortMaterial color={color} distort={0.4} speed={2} roughness={0.3} />
        </Sphere>
    ) : (
        <Icosahedron ref={mesh} args={[1.2, 0]}>
            <MeshDistortMaterial color={color} distort={0.4} speed={2} roughness={0.3} />
        </Icosahedron>
    );
}
const Step3D = ({ color, index }: { color: string; index: number }) => (
    <Canvas className="h-20 w-20">
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate />
        <Shape color={color} isSphere={index % 2 === 0} />
    </Canvas>
);

export default function HowItWorks() {
    const wrap = useRef<HTMLDivElement>(null);
    const fade = useRef<HTMLDivElement>(null);

    /* GSAP timelines */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.line-inner', {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: { trigger: wrap.current, start: 'top center', end: 'bottom center', scrub: true },
            });
            gsap.utils.toArray<HTMLElement>('.how-card').forEach((card, i) => {
                gsap.fromTo(card, { autoAlpha: 0, y: i % 2 ? -60 : 60 }, {
                    autoAlpha: 1, y: 0, duration: 0.6,
                    scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' },
                });
            });
            gsap.fromTo(fade.current, { backgroundColor: 'rgba(255,255,255,1)' }, {
                backgroundColor: 'rgba(255,255,255,0)',
                scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'top top', scrub: true },
            });
        }, wrap);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <div className="h-24 bg-gradient-to-b from-white to-[#f5f5f5]" />
            <section id="how" ref={wrap} className="relative px-6 py-28 bg-[#f5f5f5] overflow-hidden">
                <div ref={fade} className="absolute inset-0 pointer-events-none z-10" style={{ backgroundColor: 'white' }} />
                {/* heading */}
                <div className="max-w-4xl mx-auto text-center mb-16 relative z-20">
                    <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">How It Works</h2>
                    <p className="text-gray-600">Follow this guided workflow to set up and automate your marketing with ease.</p>
                </div>
                {/* timeline + steps */}
                <div className="relative max-w-3xl mx-auto">
                    {/* vertical line: left on mobile, center on md+ */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 h-full w-1 bg-gray-300 overflow-hidden">
                        <div className="line-inner h-full w-full bg-gradient-to-b from-indigo-500 to-purple-500 scale-y-0 origin-top" />
                    </div>

                    <div className="space-y-16 relative z-20">
                        {steps.map((s, i) => (
                            <div key={i} className={`how-card flex flex-col md:flex-row items-start gap-6 ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
                                {/* 3-D icon (desktop only) */}
                                <div className="hidden md:flex md:w-1/2 justify-center">
                                    <Step3D color={s.color} index={i} />
                                </div>

                                {/* text + number */}
                                <div className="w-full md:w-1/2 flex items-start text-left">
                                    {/* number badge: inline on mobile, offset on md */}
                                    <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 mr-3 mt-1 rounded-full bg-indigo-500 text-white font-bold text-sm md:absolute md:-left-4 md:top-1">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{s.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
