"use client";

import { useEffect } from "react";
import { Clock, FileAudio, Trash2, X } from "lucide-react";

interface HistoryItem {
  id: string;
  fileName: string;
  date: string;
  duration: number;
  language: string;
  text: string;
  segments: { start: number; end: number; text: string }[];
  srt: string;
}

interface HistoryPanelProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  if (m > 0) return `${m}:${String(s).padStart(2, "0")}`;
  return `0:${String(s).padStart(2, "0")}`;
}

export default function HistoryPanel({
  items,
  onSelect,
  onClear,
  isOpen,
  onToggle,
}: HistoryPanelProps) {
  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Desktop sidebar ──────────────────────────────────────────────────
  // ── Mobile: bottom drawer overlay ─────────────────────────────────────
  return (
    <>
      {/* Desktop sidebar -- visible on md+ only when open */}
      <div
        className={`hidden ${isOpen ? "md:flex" : "md:hidden"} w-72 shrink-0 border-l border-border-default bg-panel/80 backdrop-blur-sm flex-col h-full`}
      >
        <InnerPanel
          items={items}
          onSelect={onSelect}
          onClear={onClear}
          onToggle={onToggle}
        />
      </div>

      {/* Mobile: backdrop + bottom drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onToggle}
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] bg-panel border-t border-border-default rounded-t-2xl flex flex-col animate-slide-up">
            {/* Handle bar */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 rounded-full bg-text-quaternary/40" />
            </div>
            <InnerPanel
              items={items}
              onSelect={onSelect}
              onClear={onClear}
              onToggle={onToggle}
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Shared panel content ─────────────────────────────────────────── */
function InnerPanel({
  items,
  onSelect,
  onClear,
  onToggle,
}: {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  onToggle: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="px-4 py-3 border-b border-border-default flex items-center justify-between shrink-0">
        <h2 className="text-caption text-text-secondary font-[510] uppercase tracking-wider">
          History
          {items.length > 0 && (
            <span className="text-text-quaternary font-normal ml-1">
              ({items.length})
            </span>
          )}
        </h2>
        <button
          onClick={onToggle}
          className="md:hidden flex items-center gap-1 text-caption text-text-quaternary hover:text-text-secondary transition-colors"
          aria-label="Close history"
        >
          <X size={14} />
        </button>
        <button
          onClick={onToggle}
          className="hidden md:block text-caption text-text-quaternary hover:text-text-secondary transition-colors"
        >
          Close
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 overscroll-contain">
        {items.length === 0 ? (
          <div className="px-3 py-8 text-center">
            <p className="text-caption text-text-quaternary">
              No transcriptions yet
            </p>
          </div>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelect(item);
                // Close mobile drawer on selection
                if (window.innerWidth < 768) onToggle();
              }}
              className="w-full text-left px-3 py-3 rounded-md glass-panel-hover transition-colors group active:bg-[rgba(255,255,255,0.06)]"
            >
              <div className="flex items-start gap-2.5">
                <FileAudio
                  size={16}
                  className="text-text-quaternary mt-0.5 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-body-sm text-text-primary truncate">
                    {item.fileName}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-caption text-text-quaternary">
                      {item.date}
                    </span>
                    <span className="text-caption text-text-quaternary">·</span>
                    <span className="flex items-center gap-1 text-caption text-text-quaternary">
                      <Clock size={10} />
                      {formatDuration(item.duration)}
                    </span>
                    <span className="text-caption text-text-quaternary">·</span>
                    <span className="text-caption text-text-quaternary uppercase">
                      {item.language}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Clear */}
      {items.length > 0 && (
        <div className="p-2 border-t border-border-default shrink-0">
          <button
            onClick={onClear}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md
                       text-caption text-text-quaternary hover:text-error hover:bg-error/10
                       transition-colors active:bg-error/15"
          >
            <Trash2 size={13} />
            Clear history
          </button>
        </div>
      )}
    </>
  );
}
