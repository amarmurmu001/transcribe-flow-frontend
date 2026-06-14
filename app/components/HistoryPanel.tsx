"use client";

import { Clock, FileAudio, Trash2 } from "lucide-react";

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

export default function HistoryPanel({ items, onSelect, onClear, isOpen, onToggle }: HistoryPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="w-72 shrink-0 border-l border-border-default bg-panel/80 backdrop-blur-sm flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border-default flex items-center justify-between">
        <h2 className="text-caption text-text-secondary font-[510] uppercase tracking-wider">History</h2>
        <button
          onClick={onToggle}
          className="text-caption text-text-quaternary hover:text-text-secondary transition-colors"
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {items.length === 0 ? (
          <div className="px-3 py-8 text-center">
            <p className="text-caption text-text-quaternary">No transcriptions yet</p>
          </div>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="w-full text-left px-3 py-2.5 rounded-md glass-panel-hover transition-colors group"
            >
              <div className="flex items-start gap-2.5">
                <FileAudio size={14} className="text-text-quaternary mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-body-sm text-text-primary truncate">{item.fileName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-caption text-text-quaternary">{item.date}</span>
                    <span className="text-caption text-text-quaternary">·</span>
                    <span className="flex items-center gap-1 text-caption text-text-quaternary">
                      <Clock size={10} />
                      {formatDuration(item.duration)}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="p-2 border-t border-border-default">
          <button
            onClick={onClear}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-md
                       text-caption text-text-quaternary hover:text-error hover:bg-error/10 transition-colors"
          >
            <Trash2 size={12} />
            Clear history
          </button>
        </div>
      )}
    </div>
  );
}
