"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Hakkımda", href: "/#about" },
  { label: "Deneyimler", href: "/#experience" },
  { label: "Projeler", href: "/projects/" },
  { label: "Yetenekler", href: "/#skills" },
  { label: "Etkinlikler", href: "/#events" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/projects/") return pathname?.startsWith("/projects");
    return false;
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className={`flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full backdrop-blur-xl border transition-all duration-500 ease-out ${
          scrolled
            ? "bg-[#111118]/80 border-[#1E1E2A] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-[#111118]/40 border-[#1E1E2A]/50 shadow-sm"
        }`}
      >
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                isActive(item.href)
                  ? "text-white"
                  : "text-[#9090A8] hover:text-white"
              }`}
            >
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 z-[-1] rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA + Admin */}
        <div className="hidden md:flex items-center gap-2 pl-2 border-l border-[#1E1E2A]/60">
          <Link
            href="/admin/"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-[#4A4A60] hover:text-white transition-all"
            title="Admin Paneli"
          >
            ⚙
          </Link>
          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg shadow-[#7C3AED]/20"
          >
            İletişime Geç
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-white/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <span className={`block w-5 h-0.5 bg-white transition-transform origin-center ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-transform origin-center ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mt-2 rounded-2xl bg-[#111118] border border-[#1E1E2A] overflow-hidden"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-sm text-[#9090A8] hover:text-white hover:bg-white/5 transition-colors border-b border-[#1E1E2A] last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/admin/"
                onClick={() => setOpen(false)}
                className="block px-5 py-3 text-sm text-[#4A4A60] hover:text-white hover:bg-white/5 transition-colors"
              >
                ⚙ Admin Paneli
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.nav>
  );
}
