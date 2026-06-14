"use client";

import { useRef, useEffect, useState } from "react";
import { Copy, Check, Download, Clock, FileText } from "lucide-react";

interface Segment {
  start: number;
  end: number;
  text: string;
}

interface TranscriptionResultProps {
  segments: Segment[];
  text: string;
  srt: string;
  language: string;
  duration: number;
  fileName: string;
  onReset: () => void;
}

function formatTS(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function TranscriptionResult({
  segments,
  text,
  srt,
  language,
  duration,
  fileName,
  onReset,
}: TranscriptionResultProps) {
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.[^/.]+$/, "") + "_transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSrt = () => {
    const blob = new Blob([srt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.[^/.]+$/, "") + "_subtitles.srt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={resultRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header bar */}
      <div className="glass-panel p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-caption text-text-secondary">
            <FileText size={14} />
            <span className="text-text-primary font-medium">{fileName}</span>
          </div>
          <span className="text-text-quaternary hidden sm:inline">·</span>
          <div className="flex items-center gap-2 text-caption text-text-tertiary">
            <Clock size={14} />
            <span>{formatDuration(duration)}</span>
          </div>
          <span className="text-text-quaternary">·</span>
          <span className="text-caption text-text-tertiary">{language.toUpperCase()}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-caption
                       text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={handleDownloadTxt}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-caption
                       text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            <Download size={14} />
            TXT
          </button>
          <button
            onClick={handleDownloadSrt}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-caption
                       text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            <Download size={14} />
            SRT
          </button>
          <div className="h-5 w-px bg-border-default mx-1" />
          <button
            onClick={onReset}
            className="px-3 py-1.5 rounded-md bg-brand text-white text-label hover:bg-brand-hover transition-colors"
          >
            New Transcription
          </button>
        </div>
      </div>

      {/* Transcript lines */}
      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-3 border-b border-border-default">
          <h3 className="text-caption text-text-tertiary font-[510] uppercase tracking-wider">
            Transcript
          </h3>
        </div>
        <div className="p-4 space-y-0.5 max-h-[60vh] overflow-y-auto">
          {segments.map((seg, i) => (
            <div key={i} className="timestamp-line group flex items-start gap-3 hover:bg-[rgba(255,255,255,0.04)] transition-colors rounded-sm">
              <span className="text-brand-violet font-mono text-mono-sm shrink-0 mt-0.5 select-none min-w-[3.5rem]">
                [{formatTS(seg.start)}]
              </span>
              <span className="text-text-primary font-mono text-mono leading-relaxed">
                {seg.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats footer */}
      <div className="flex items-center justify-center gap-6 text-caption text-text-quaternary">
        <span>{segments.length} segments</span>
        <span>·</span>
        <span>{(text.match(/\S+/g) || []).length} words</span>
        <span>·</span>
        <span>Model: tiny</span>
      </div>
    </div>
  );
}
