// src/app/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benifits from "@/components/Benifits";
import HowItWorks from "@/components/HowItWorks";
// import Demo from "@/components/Demo";
// import PricingStrip from "@/components/PricingStrip";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ChatBotWidget from '@/components/ChatBotWidget';
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-white to-slate-50 pt-16">
      <Navbar />
      <Hero />
      <Features />
      <Benifits />
      <HowItWorks />
      {/*<Demo />            4  Live mini-demo or video
      <PricingStrip />    5  Slim CTA linking to /pricing */}
      <Testimonials />
      <FAQ />
      <Footer />
      <ChatBotWidget />
    </main>
  );
}
