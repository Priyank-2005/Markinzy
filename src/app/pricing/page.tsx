"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import Lottie from "lottie-react";
import { GiGlobe } from "react-icons/gi";
import Navbar from "@/components/Navbar";
import CompareModal from "@/components/CompareModal";

export default function PricingPage() {
  const [discountAnim, setDiscountAnim] = useState(null);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    fetch("/animations/discount.json")
      .then((res) => res.json())
      .then(setDiscountAnim);
  }, []);

  const plans = [
    {
      name: "Free",
      prices: { monthly: "$0", yearly: "$0" },
      credits: { monthly: "50", yearly: "50" },
      features: ["50 AI Credits", "Basic Tools Access", "Limited Support"],
      highlight: false,
      button: "Start Free",
    },
    {
      name: "Essential",
      prices: { monthly: "$20", yearly: "$220" },
      credits: { monthly: "700", yearly: "9000" },
      features: ["AI Hashtags", "Blog Writer", "SEO Fixer", "Post Scheduler"],
      highlight: true,
      button: "Get Essential",
    },
    {
      name: "Pro",
      prices: { monthly: "$50", yearly: "$550" },
      credits: { monthly: "2000", yearly: "25000" },
      features: ["Everything in Essential", "Team Access", "Premium Support"],
      highlight: false,
      button: "Go Pro",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-24 bg-gradient-to-b from-[#f5f7fa] to-[#e6ebf1] text-center">
      <Navbar />

      <motion.div
        className="pt-28"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold mb-3 text-gray-900">Flexible Pricing</h1>
        <p className="text-gray-600 text-lg mb-10">Choose what works best—monthly or yearly.</p>

        {/* Toggle Button */}
        <div className="flex justify-center mb-16">
          <div className="bg-gray-200 rounded-full flex p-1 w-64">
            <button
              className={`flex-1 py-2 rounded-full transition text-sm font-semibold ${billing === "monthly" ? "bg-indigo-600 text-white" : "text-gray-700"}`}
              onClick={() => setBilling("monthly")}
            >
              Monthly Billing
            </button>
            <button
              className={`flex-1 py-2 rounded-full transition text-sm font-semibold ${billing === "yearly" ? "bg-indigo-600 text-white" : "text-gray-700"}`}
              onClick={() => setBilling("yearly")}
            >
              Yearly Billing
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.6 }}
              className={`relative flex flex-col backdrop-blur-lg bg-white/60 border border-slate-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-transform overflow-visible`}
            >
              {billing === "yearly" && plan.name !== "Free" && discountAnim && (
                <div className="absolute top-3 right-3 w-12 h-12 z-10">
                  <Lottie animationData={discountAnim} loop={false} style={{ width: '100%', height: '100%' }} />
                </div>
              )}

              <div className="mb-4 flex justify-center">
                <GiGlobe size={48} className="text-indigo-500 animate-spin-slow" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h2>
              <p className="text-4xl font-black text-indigo-600 mb-1">
                {plan.prices[billing]}
                <span className="text-sm text-gray-500"> {billing === "monthly" ? "/mo" : "/yr"}</span>
              </p>
              <p className="text-indigo-700 font-semibold mb-4">
                {plan.credits[billing]} Credits
              </p>

              <ul className="text-gray-700 space-y-3 mb-10 text-left text-sm relative z-[9999]">
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className="relative z-[9999] flex items-center gap-2"
                    data-tooltip-id={`f${idx}-${i}`}
                    data-tooltip-content={`Includes: ${f}`}
                  >
                    ✅ <span>{f}</span>
                    <Tooltip id={`f${idx}-${i}`} place="right" className="!z-[99999]" />
                  </li>
                ))}
              </ul>

              <button className={`mt-auto w-full py-3 rounded-xl font-semibold text-sm text-white transition ${plan.highlight
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-slate-700 hover:bg-slate-800"
                }`}>
                {plan.button}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Compare Plans Button */}
        <motion.div className="mt-12">
          <button
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500
                   text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition"
            onClick={() => setIsCompareOpen(true)}
          >
            Compare Plans
          </button>
        </motion.div>

        <CompareModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          plans={plans}
          billing={billing}
          compareFeatures={[
            { name: "Credits", isCredits: true },
            { name: "Basic Tools Access" },
            { name: "AI Hashtags" },
            { name: "Blog Writer" },
            { name: "SEO Fixer" },
            { name: "Post Scheduler" },
            { name: "Team Access" },
            { name: "Premium Support" },
          ]}
        />

      </motion.div>
    </main>
  );
}