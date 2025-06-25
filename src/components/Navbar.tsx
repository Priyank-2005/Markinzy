// components/Navbar.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const links = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur bg-white/70 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="font-black text-2xl text-indigo-600">
          Markinzy<span className="text-purple-600">.</span>
        </Link>

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

        {/* CTA */}
        <motion.a
          whileTap={{ scale: 0.9 }}
          href="/auth"
          className="hidden md:inline-block rounded-full bg-gradient-to-r
                     from-indigo-500 to-purple-600 px-5 py-2 text-white
                     text-sm font-semibold shadow-md hover:shadow-lg"
        >
          Try Free
        </motion.a>
      </nav>
    </header>
  );
}
