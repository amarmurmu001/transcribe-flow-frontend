"use client";

import { useState, useCallback } from "react";
import { History, Sparkles } from "lucide-react";
import UploadZone from "./components/UploadZone";
import TranscriptionResult from "./components/TranscriptionResult";
import HistoryPanel from "./components/HistoryPanel";

interface Segment {
  start: number;
  end: number;
  text: string;
}

interface HistoryItem {
  id: string;
  fileName: string;
  date: string;
  duration: number;
  language: string;
  text: string;
  segments: Segment[];
  srt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [text, setText] = useState("");
  const [srt, setSrt] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState(0);
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleTranscribe = useCallback(async (file: File, lang: string) => {
    setIsProcessing(true);
    setHasResult(false);

    const formData = new FormData();
    formData.append("file", file);
    if (lang) formData.append("language", lang);

    try {
      const res = await fetch(`${API_BASE}/api/transcribe`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(err.detail || "Transcription failed");
      }

      const data = await res.json();

      setSegments(data.segments);
      setText(data.text);
      setSrt(data.srt);
      setLanguage(data.language);
      setDuration(data.duration);
      setFileName(file.name);
      setHasResult(true);

      // Add to history
      const item: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        fileName: file.name,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        duration: data.duration,
        language: data.language,
        text: data.text,
        segments: data.segments,
        srt: data.srt,
      };
      setHistory((prev) => [item, ...prev]);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleReset = () => {
    setHasResult(false);
    setSegments([]);
    setText("");
    setSrt("");
    setFileName("");
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setSegments(item.segments);
    setText(item.text);
    setSrt(item.srt);
    setLanguage(item.language);
    setDuration(item.duration);
    setFileName(item.fileName);
    setHasResult(true);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="flex-1 flex">
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Hero / Upload area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 lg:py-16">
          <div className="w-full max-w-3xl mx-auto space-y-8">
            {!hasResult ? (
              <>
                {/* Heading */}
                <div className="text-center space-y-2">
                  <h1 className="text-display text-text-primary">
                    Transcribe{" "}
                    <span className="text-gradient">Instantly</span>
                  </h1>
                  <p className="text-body-sm text-text-tertiary max-w-lg mx-auto">
                    Free, private audio transcription. Drop any audio file and get
                    timestamped transcripts — no signup, no data leaves your machine.
                  </p>
                </div>

                {/* Upload zone */}
                <UploadZone onTranscribe={handleTranscribe} isProcessing={isProcessing} />

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  {[
                    { icon: "🔒", title: "100% Private", desc: "Runs locally on your machine" },
                    { icon: "⚡", title: "Fast & Free", desc: "Powered by open-source Whisper" },
                    { icon: "🎯", title: "Timestamped", desc: "[MM:SS] format for every line" },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="glass-panel p-4 text-center glass-panel-hover"
                    >
                      <span className="text-xl mb-1.5 block">{feature.icon}</span>
                      <h3 className="text-label text-text-primary">{feature.title}</h3>
                      <p className="text-caption text-text-tertiary mt-0.5">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <TranscriptionResult
                segments={segments}
                text={text}
                srt={srt}
                language={language}
                duration={duration}
                fileName={fileName}
                onReset={handleReset}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-border-default">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <p className="text-caption text-text-quaternary">
              TranscribeFlow · Free & Local
            </p>
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-caption
                         text-text-tertiary hover:text-text-secondary hover:bg-surface transition-colors"
            >
              <History size={14} />
              History {history.length > 0 && `(${history.length})`}
            </button>
          </div>
        </footer>
      </div>

      {/* History sidebar */}
      <HistoryPanel
        items={history}
        onSelect={handleHistorySelect}
        onClear={handleClearHistory}
        isOpen={historyOpen}
        onToggle={() => setHistoryOpen(false)}
      />
    </div>
  );
}
