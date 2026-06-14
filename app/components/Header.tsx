"use client";

import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-panel/80 backdrop-blur-md border-b border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo / Brand */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-brand flex items-center justify-center shadow-sm group-hover:bg-brand-hover transition-colors">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="font-sans font-[510] text-sm text-text-primary tracking-tight">
              Transcribe<span className="text-brand-violet">Flow</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-caption text-text-secondary hover:text-text-primary transition-colors">
              Transcribe
            </a>
            <a href="#" className="text-caption text-text-secondary hover:text-text-primary transition-colors">
              History
            </a>
            <a href="#" className="text-caption text-text-tertiary hover:text-text-primary transition-colors">
              API
            </a>
            <div className="h-5 w-px bg-border-default mx-2" />
            <a
              href="#"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand text-white text-label
                         hover:bg-brand-hover transition-colors"
            >
              <Sparkles size={12} />
              New Transcription
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-text-secondary hover:bg-surface transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-default bg-panel/95 backdrop-blur-md">
          <div className="px-4 py-3 space-y-2">
            <a href="#" className="block py-2 text-caption text-text-secondary">Transcribe</a>
            <a href="#" className="block py-2 text-caption text-text-secondary">History</a>
            <a href="#" className="block py-2 text-caption text-text-tertiary">API</a>
            <a
              href="#"
              className="block w-full text-center mt-3 px-3 py-2 rounded-md bg-brand text-white text-label"
            >
              New Transcription
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
