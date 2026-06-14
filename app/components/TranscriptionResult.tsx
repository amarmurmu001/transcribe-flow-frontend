"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import {
  Play,
  Pause,
  Download,
  Copy,
  Check,
  RotateCcw,
  FileText,
  AlignLeft,
} from "lucide-react";

interface Segment {
  start: number;
  end: number;
  text: string;
}

interface Props {
  segments: Segment[];
  text: string;
  srt: string;
  language: string;
  duration: number;
  fileName: string;
  audioUrl: string | null;
  onReset: () => void;
}

function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function fmtTimeMs(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  const ms = Math.floor((sec % 1) * 100);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
}

export default function TranscriptionResult({
  segments,
  text,
  srt,
  language,
  duration,
  fileName,
  audioUrl,
  onReset,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);

  // Playback state
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [copyState, setCopyState] = useState<"idle" | "txt" | "srt">("idle");

  // Live highlighting
  const activeSegment = useMemo(() => {
    if (!playing && currentTime === 0) return -1;
    return segments.findIndex(
      (s) => currentTime >= s.start && currentTime < s.end
    );
  }, [currentTime, segments, playing]);

  // ── Playback controls ──────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, []);

  const seekTo = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }, []);

  // Audio element callbacks
  const onTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  }, []);

  const onPlayEnd = useCallback(() => {
    setPlaying(false);
    setCurrentTime(0);
  }, []);

  const onAudioMeta = useCallback(() => {
    if (audioRef.current) setAudioDuration(audioRef.current.duration);
  }, []);

  // Scroll active segment into view
  useEffect(() => {
    if (activeRef.current && playing) {
      activeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeSegment, playing]);

  // ── Progress bar click ─────────────────────────────────────────────────
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current || !audioDuration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      const time = pct * audioDuration;
      seekTo(time);
    },
    [audioDuration, seekTo]
  );

  // ── Copy / Download ────────────────────────────────────────────────────
  const handleCopy = async (format: "txt" | "srt") => {
    const content = format === "txt" ? text : srt;
    try {
      await navigator.clipboard.writeText(content);
      setCopyState(format);
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {}
  };

  const handleDownload = (format: "txt" | "srt") => {
    const content = format === "txt" ? text : srt;
    const ext = format;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName.replace(/\.[^.]+$/, "")}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="w-full space-y-5">
      {/* Hidden audio element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onAudioMeta}
          onEnded={onPlayEnd}
          preload="auto"
        />
      )}

      {/* File info bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={16} className="text-text-tertiary shrink-0" />
          <span className="text-body-sm text-text-primary truncate">{fileName}</span>
          <span className="text-caption text-text-quaternary">·</span>
          <span className="text-caption text-text-tertiary">{fmtTime(duration)}</span>
          <span className="text-caption text-text-quaternary">·</span>
          <span className="text-caption text-text-tertiary uppercase">{language}</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-caption
                     text-text-tertiary hover:bg-surface transition-colors shrink-0"
        >
          <RotateCcw size={13} />
          New
        </button>
      </div>

      {/* Audio Player */}
      {audioUrl && (
        <div className="glass-panel p-3">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-brand hover:bg-brand-hover flex items-center justify-center
                         transition-colors shrink-0 text-white"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>

            {/* Progress bar */}
            <div
              className="flex-1 h-2 rounded-full bg-surface cursor-pointer group relative"
              onClick={handleProgressClick}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={audioDuration}
              aria-valuenow={currentTime}
            >
              <div
                className="h-full rounded-full bg-brand transition-all duration-100 relative"
                style={{ width: `${audioDuration ? (currentTime / audioDuration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white
                                opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
              </div>
            </div>

            {/* Time */}
            <span className="text-mono-sm text-text-tertiary shrink-0 w-24 text-right tabular-nums">
              {fmtTime(currentTime)} / {fmtTime(audioDuration || duration)}
            </span>
          </div>
        </div>
      )}

      {/* Transcript */}
      <div
        ref={transcriptRef}
        className="glass-panel max-h-[55vh] overflow-y-auto space-y-0.5 p-3 scroll-smooth"
      >
        {segments.length === 0 ? (
          <p className="text-caption text-text-tertiary text-center py-8">
            No transcript segments available.
          </p>
        ) : (
          segments.map((seg, i) => {
            const isActive = i === activeSegment;
            return (
              <div
                key={i}
                ref={isActive ? activeRef : null}
                onClick={() => seekTo(seg.start)}
                className={`flex items-start gap-3 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-brand/10 border-l-2 border-brand"
                    : "hover:bg-[rgba(255,255,255,0.03)] border-l-2 border-transparent"
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    seekTo(seg.start);
                  }}
                  className={`shrink-0 text-mono-sm py-0.5 px-1.5 rounded ${
                    isActive
                      ? "text-brand-violet bg-brand/10"
                      : "text-text-quaternary hover:text-text-secondary hover:bg-surface"
                  } transition-colors`}
                  aria-label={`Seek to ${fmtTime(seg.start)}`}
                >
                  [{fmtTime(seg.start)}]
                </button>
                <span
                  className={`text-body-sm leading-relaxed ${
                    isActive ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {seg.text}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Copy TXT */}
        <button
          onClick={() => handleCopy("txt")}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-caption
                     bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
        >
          {copyState === "txt" ? <Check size={14} /> : <Copy size={14} />}
          {copyState === "txt" ? "Copied!" : "Copy TXT"}
        </button>

        {/* Copy SRT */}
        <button
          onClick={() => handleCopy("srt")}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-caption
                     bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
        >
          {copyState === "srt" ? <Check size={14} /> : <Copy size={14} />}
          {copyState === "srt" ? "Copied!" : "Copy SRT"}
        </button>

        {/* Download TXT */}
        <button
          onClick={() => handleDownload("txt")}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-caption
                     bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
        >
          <Download size={14} />
          Download TXT
        </button>

        {/* Download SRT */}
        <button
          onClick={() => handleDownload("srt")}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-caption
                     bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
        >
          <Download size={14} />
          Download SRT
        </button>
      </div>
    </div>
  );
}
