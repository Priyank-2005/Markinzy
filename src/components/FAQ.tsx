"use client";

import { useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What are Credits and how are they used?",
    answer:
      "Credits are the virtual currency used on Markinzy. Each tool consumes a certain number of credits with each use. If your credits are depleted, you can easily top them up. This ensures uninterrupted access to all our tools. For more detailed information about how credits work, visit our pricing page.",
  },
  {
    question: "What are top-up plans and how do they work?",
    answer:
      "Top-up plans allow users to purchase additional credits when their current balance is low or depleted before the renewal date. These plans provide a seamless way to ensure continuous usage of Markinzy tools without any disruptions. For further details about top-up plans, head to the pricing page.",
  },
  {
    question: "Do you provide refunds for purchases?",
    answer:
      "As our services involve digital products, we are unable to provide refunds. Once credits are purchased or services are used, transactions are considered final. This policy ensures the fairness and sustainability of our platform. If you have concerns, our support team can assist you with more details.",
  },
  {
    question: "What type of support does Markinzy offer?",
    answer:
      "Markinzy provides dedicated support through email for any issues or inquiries. Our support team aims to respond within 24 hours, offering clear step-by-step guidance to resolve your concerns efficiently. We are committed to ensuring you have a smooth experience with our platform.",
  },
  {
    question: "How does Markinzy ensure my data is secure?",
    answer:
      "We take data security seriously by employing industry-standard encryption for data in transit and at rest. Our platform includes strict access controls, regular security audits, and adheres to privacy regulations. Our servers are hosted in secure data centers with incident response plans for handling any potential threats.",
  },
  {
    question: "Can Markinzy assist me with SEO marketing?",
    answer:
      "Yes, Markinzy offers an advanced SEO marketing tool that is designed to improve your website's search engine visibility. This tool provides features like keyword analysis, site audits, and content optimization to help you boost your rankings and enhance your overall SEO performance effectively.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(index);
    }
  }

  return (
    <section
      id="faq"
      className="max-w-4xl mx-auto px-4 sm:px-6 py-20"
      aria-label="Frequently Asked Questions"
    >
      <h2 className="text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>

      <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm">
        {faqs.map(({ question, answer }, i) => {
          const isOpen = i === openIndex;
          return (
            <div
              key={i}
              className={`border-b border-gray-200 last:border-0 rounded-xl overflow-hidden`}
            >
              <button
                onClick={() => toggle(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                aria-expanded={isOpen}
                aria-controls={`faq-content-${i}`}
                id={`faq-header-${i}`}
                className={`w-full flex items-center justify-between p-5 focus:outline-none
                  ${isOpen ? "bg-gradient-to-r from-indigo-50 to-white border-l-4 border-indigo-600 shadow-lg" : "bg-white"}
                  hover:bg-indigo-100 transition-colors duration-300`}
              >
                <span
                  className={`text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-300`}
                >
                  {question}
                </span>

                <svg
                  className={`w-6 h-6 text-indigo-600 transform transition-transform duration-300 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12M6 12h12"
                  />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`content-${i}`}
                    id={`faq-content-${i}`}
                    role="region"
                    aria-labelledby={`faq-header-${i}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-5 pb-6 text-gray-800 leading-relaxed text-base"
                  >
                    {answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
