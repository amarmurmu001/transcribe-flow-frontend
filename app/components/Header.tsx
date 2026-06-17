"use client";

import { useState } from "react";
import { Menu, X, Sparkles, Github } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-panel/80 backdrop-blur-md border-b border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="TranscribeFlow Home">
            <div className="w-7 h-7 rounded-md bg-brand flex items-center justify-center shadow-sm group-hover:bg-brand-hover transition-colors">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="font-sans font-[510] text-sm text-text-primary tracking-tight">
              Transcribe<span className="text-brand-violet">Flow</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <Link
              href="/"
              className="text-caption text-text-primary transition-colors"
            >
              Transcribe
            </Link>
            <Link
              href="#features"
              className="text-caption text-text-secondary hover:text-text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-caption text-text-secondary hover:text-text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className="text-caption text-text-secondary hover:text-text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-caption text-text-secondary hover:text-text-primary transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/alternatives/foziscribe"
              className="text-caption text-text-tertiary hover:text-text-primary transition-colors"
            >
              vs FoziScribe
            </Link>
            <div className="h-5 w-px bg-border-default mx-2" />
            <a
              href="https://github.com/amarmurmu001/transcribe-flow-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-caption text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-text-secondary hover:bg-surface transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-default bg-panel/95 backdrop-blur-md" role="navigation" aria-label="Mobile navigation">
          <div className="px-4 py-3 space-y-2">
            <Link href="/" className="block py-2 text-caption text-text-primary">
              Transcribe
            </Link>
            <Link href="#features" className="block py-2 text-caption text-text-secondary">
              Features
            </Link>
            <Link href="#how-it-works" className="block py-2 text-caption text-text-secondary">
              How It Works
            </Link>
            <Link href="/pricing" className="block py-2 text-caption text-text-secondary">
              Pricing
            </Link>
            <Link href="/languages" className="block py-2 text-caption text-text-secondary">
              Languages
            </Link>
            <Link href="#faq" className="block py-2 text-caption text-text-secondary">
              FAQ
            </Link>
            <Link href="/alternatives/foziscribe" className="block py-2 text-caption text-text-secondary">
              vs FoziScribe
            </Link>
            <a
              href="https://github.com/amarmurmu001/transcribe-flow-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center mt-3 px-3 py-2 rounded-md text-caption text-text-secondary hover:bg-surface transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
