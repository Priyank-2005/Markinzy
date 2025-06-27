"use client";

import Link from "next/link";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
        {/* Brand */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="text-3xl font-extrabold text-indigo-500 hover:text-indigo-400">
            Markinzy<span className="text-purple-600">.</span>
          </Link>
          <p className="max-w-xs text-gray-400">
            AI-powered marketing platform helping you create, optimize, and grow with ease.
          </p>
          <div className="flex space-x-6 text-gray-400 hover:text-indigo-400">
            <a href="https://x.com/i/flow/login?redirect_after_login=%2FAlphaloopIT" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.linkedin.com/company/markinzy/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.instagram.com/markinzy.ai/profilecard/?igsh=MXByM3o0YmtiOHJyMA%3D%3D" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer Navigation" className="flex flex-col space-y-2 text-gray-400">
          <Link href="#features" className="hover:text-indigo-400 transition">
            Features
          </Link>
          <Link href="#how" className="hover:text-indigo-400 transition">
            How It Works
          </Link>
          <Link href="/pricing" className="hover:text-indigo-400 transition">
            Pricing
          </Link>
          <Link href="#testimonials" className="hover:text-indigo-400 transition">
            Testimonials
          </Link>
          <Link href="#faq" className="hover:text-indigo-400 transition">
            FAQ
          </Link>
          <Link href="#contact" className="hover:text-indigo-400 transition">
            Contact
          </Link>
        </nav>

        {/* Newsletter Signup */}
        <div className="max-w-sm">
          <h3 className="text-white font-semibold mb-4">Subscribe to our newsletter</h3>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow rounded-md px-4 py-2 text-gray-900"
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 px-5 py-2 rounded-md text-white font-semibold hover:bg-indigo-500 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-2 text-xs text-gray-500">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <hr className="border-gray-700 my-10" />

      <p className="text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Markinzy | All rights reserved | Powered by AlphaloopIT
      </p>
    </footer>
  );
}
