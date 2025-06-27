// components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur bg-white/70 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="font-black text-2xl text-indigo-600">
          Markinzy<span className="text-purple-600">.</span>
        </Link>

        {/* Desktop links (unchanged) */}
        <ul className="hidden md:flex gap-8 text-sm font-semibold">
          {links.map((l) => (
            <li key={l.name}>
              <Link
                href={l.href}
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {l.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA (unchanged) */}
        <motion.a
          whileTap={{ scale: 0.9 }}
          href="/auth"
          className="hidden md:inline-block rounded-full bg-gradient-to-r
                     from-indigo-500 to-purple-600 px-5 py-2 text-white
                     text-sm font-semibold shadow-md hover:shadow-lg"
        >
          Login
        </motion.a>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center space-y-1"
        >
          <span className={`block h-0.5 w-6 bg-gray-800 transition ${open ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block h-0.5 w-6 bg-gray-800 transition ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-gray-800 transition ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/90 backdrop-blur px-6 pb-4 shadow"
          >
            <ul className="flex flex-col gap-4 text-sm font-semibold pt-4">
              {links.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="block text-gray-700 hover:text-indigo-600 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
              <motion.a
                whileTap={{ scale: 0.9 }}
                href="/auth"
                className="mt-2 inline-block rounded-full bg-gradient-to-r
                           from-indigo-500 to-purple-600 px-5 py-2 text-white
                           text-sm font-semibold shadow-md hover:shadow-lg text-center"
                onClick={() => setOpen(false)}
              >
                Login
              </motion.a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
