"use client";

import { useState, useCallback, useMemo } from "react";
import { History, Sparkles, Mic, Languages, Download, Shield, FileText, Clock, Github, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
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

// ─── Features data ──────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <Mic size={20} />,
    title: "Speech to Text",
    desc: "Powered by OpenAI Whisper (faster-whisper) — industry-leading accuracy for 99+ languages.",
  },
  {
    icon: <Clock size={20} />,
    title: "Timestamped Output",
    desc: "Every line includes [MM:SS] timing — perfect for editing, subtitles, or note-taking.",
  },
  {
    icon: <Shield size={20} />,
    title: "100% Private",
    desc: "Audio files are deleted immediately after transcription. No data is stored or shared.",
  },
  {
    icon: <Download size={20} />,
    title: "Export Anywhere",
    desc: "Download transcripts as TXT or SRT subtitles. Works with video editors and caption tools.",
  },
  {
    icon: <Languages size={20} />,
    title: "Multi-Language",
    desc: "Auto-detect or choose from 99+ languages including English, Spanish, French, Arabic, Hindi, Chinese, and more.",
  },
  {
    icon: <FileText size={20} />,
    title: "No File Size Limit",
    desc: "Transcribe audio of any length. From a 10-second clip to a 2-hour lecture.",
  },
];

const STEPS = [
  { num: "01", title: "Upload", desc: "Drop any audio file (MP3, WAV, M4A, FLAC, OGG, MP4). No account required." },
  { num: "02", title: "Transcribe", desc: "Our AI processes your audio using the Whisper model. Language auto-detection on by default." },
  { num: "03", title: "Get Results", desc: "View your timestamped transcript in [MM:SS] format. Copy, download TXT, or export SRT." },
];

const FAQ_ITEMS = [
  { q: "Is TranscribeFlow really free?", a: "Yes! TranscribeFlow is completely free to use. There are no hidden costs, no credits, and no signup required. Unlike other services that limit you to 10-30 minutes per month, we offer unlimited transcription." },
  { q: "What audio formats are supported?", a: "We support MP3, WAV, M4A, FLAC, OGG, AAC, WebM, and MP4 (audio extraction)." },
  { q: "What languages are supported?", a: "Whisper supports 99+ languages. You can auto-detect or manually select English, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, Arabic, Russian, Hindi, and many more." },
  { q: "Is my audio data private?", a: "Yes. Audio files are uploaded to our backend, transcribed, and then immediately deleted. We do not store, share, or train on your data." },
  { q: "How accurate is the transcription?", a: "TranscribeFlow uses OpenAI's Whisper model via faster-whisper, which provides industry-leading accuracy — exceeding 95% for clear English audio." },
  { q: "How long does transcription take?", a: "Most files are transcribed in about 30-60% of the audio duration. A 5-minute file takes roughly 15-30 seconds." },
  { q: "Do I need to create an account?", a: "No! TranscribeFlow does not require any signup, account, email, or credit card. Just upload your audio and transcribe instantly." },
  { q: "Can I transcribe YouTube videos or podcasts?", a: "Yes! You can download audio from YouTube, podcasts, interviews, or any other source and upload it to TranscribeFlow for instant transcription." },
];

const SUPPORTED_LANGUAGES = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese",
  "Dutch", "Russian", "Arabic", "Chinese", "Japanese", "Korean",
  "Turkish", "Polish", "Vietnamese", "Thai", "Indonesian", "Hindi",
  "Greek", "Swedish", "Danish", "Finnish", "Norwegian", "Czech",
  "Romanian", "Hungarian", "Hebrew", "Ukrainian", "Bengali", "Tamil",
  "Telugu", "Marathi", "Urdu", "Malay", "Tagalog", "Burmese",
  "Persian", "Swahili", "Nepali", "Sinhala", "Khmer", "Amharic",
];

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Podcast Producer",
    text: "I used to spend hours transcribing podcast episodes manually. TranscribeFlow does it in seconds — for free. The timestamped output is perfect for show notes.",
  },
  {
    name: "Priya Sharma",
    role: "Journalist",
    text: "As a journalist, accuracy matters. TranscribeFlow gives me clean, accurate transcripts from interviews that I can use in my articles right away.",
  },
  {
    name: "David Chen",
    role: "YouTube Creator",
    text: "The SRT subtitle export is a lifesaver for my videos. TranscribeFlow handles Chinese and English perfectly. And it's free — how is this even free?",
  },
  {
    name: "Sarah Williams",
    role: "University Researcher",
    text: "I transcribe 2-hour lecture recordings regularly. No file size limit, no cost, no signup. TranscribeFlow is an essential tool for my research workflow.",
  },
];

// ─── Page Component ─────────────────────────────────────────────────────────
export default function Home() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [text, setText] = useState("");
  const [srt, setSrt] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState(0);
  const [fileName, setFileName] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleTranscribe = useCallback(async (file: File, lang: string) => {
    setIsProcessing(true);
    setHasResult(false);

    setAudioUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return prev;
    });

    const url = URL.createObjectURL(file);
    setAudioUrl(url);

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
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setSessionKey((k) => k + 1);
  };

  const handleHistorySelect = (item: HistoryItem) => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setSegments(item.segments);
    setText(item.text);
    setSrt(item.srt);
    setLanguage(item.language);
    setDuration(item.duration);
    setFileName(item.fileName);
    setHasResult(true);
  };

  const handleClearHistory = () => setHistory([]);

  return (
    <div className="flex-1 flex">
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* ═══════════════════════════════════════════════════════════════
           HERO — Upload / Transcription Area
           ═══════════════════════════════════════════════════════════════ */}
        <section className="flex-1 flex flex-col items-center justify-center px-4 py-10 md:py-12 lg:py-16">
          <div className="w-full max-w-3xl mx-auto space-y-6 md:space-y-8">
            {!hasResult ? (
              <>
                {/* Heading */}
                <div className="text-center space-y-1.5 md:space-y-2">
                  <h1 className="text-display text-text-primary">
                    Transcribe{" "}
                    <span className="text-gradient">Instantly</span>
                  </h1>
                  <p className="text-body-sm text-text-tertiary max-w-lg mx-auto">
                    Free, private audio transcription. Drop any audio file and get
                    timestamped transcripts — no signup, no limits.
                  </p>
                </div>

                {/* Stats bar */}
                <div className="flex items-center justify-center gap-6 md:gap-10 text-center">
                  <div>
                    <p className="text-h2 text-brand-violet font-[510]">99+</p>
                    <p className="text-caption text-text-quaternary">Languages</p>
                  </div>
                  <div className="w-px h-10 bg-border-default" />
                  <div>
                    <p className="text-h2 text-brand-violet font-[510]">Unlimited</p>
                    <p className="text-caption text-text-quaternary">Free minutes</p>
                  </div>
                  <div className="w-px h-10 bg-border-default" />
                  <div>
                    <p className="text-h2 text-brand-violet font-[510]">0</p>
                    <p className="text-caption text-text-quaternary">Signups needed</p>
                  </div>
                </div>

                {/* Upload zone */}
                <UploadZone key={sessionKey} onTranscribe={handleTranscribe} isProcessing={isProcessing} />

                {/* Quick features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  {[
                    { icon: "🔒", title: "100% Private", desc: "Files deleted after transcription" },
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
                audioUrl={audioUrl}
                onReset={handleReset}
              />
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           STATS / SOCIAL PROOF
           ═══════════════════════════════════════════════════════════════ */}
        <section className="border-t border-border-default py-10 md:py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { number: "99+", label: "Languages Supported" },
                { number: "Unlimited", label: "Free Transcription" },
                { number: "0", label: "Accounts Required" },
                { number: "100%", label: "Privacy Guaranteed" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-display text-brand-violet mb-1">{stat.number}</p>
                  <p className="text-caption text-text-tertiary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           TESTIMONIALS
           ═══════════════════════════════════════════════════════════════ */}
        <section className="border-t border-border-default py-12 md:py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full border border-border-default text-caption text-text-tertiary mb-4">
                Testimonials
              </span>
              <h2 className="text-h1 text-text-primary mb-3">
                Loved by creators, journalists,{" "}
                <span className="text-gradient">and researchers</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="glass-panel p-5 glass-panel-hover">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-body-sm text-text-secondary leading-relaxed mb-4 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <p className="text-body-sm text-text-primary font-[510]">{t.name}</p>
                    <p className="text-caption text-text-quaternary">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           FEATURES Section
           ═══════════════════════════════════════════════════════════════ */}
        <section id="features" className="border-t border-border-default py-12 md:py-16 lg:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full border border-border-default text-caption text-text-tertiary mb-4">
                Features
              </span>
              <h2 className="text-h1 text-text-primary mb-3">
                Everything you need for{" "}
                <span className="text-gradient">audio transcription</span>
              </h2>
              <p className="text-body-sm text-text-tertiary max-w-lg mx-auto">
                From quick notes to full lectures — TranscribeFlow handles it all with speed and privacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="glass-panel p-5 glass-panel-hover"
                  itemScope
                  itemType="https://schema.org/ItemList"
                >
                  <div className="w-9 h-9 rounded-lg bg-[rgba(94,106,210,0.1)] flex items-center justify-center text-brand mb-3">
                    {f.icon}
                  </div>
                  <h3 className="text-body-emphasis text-text-primary mb-1">{f.title}</h3>
                  <p className="text-caption text-text-tertiary leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           HOW IT WORKS
           ═══════════════════════════════════════════════════════════════ */}
        <section id="how-it-works" className="border-t border-border-default py-12 md:py-16 lg:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full border border-border-default text-caption text-text-tertiary mb-4">
                How It Works
              </span>
              <h2 className="text-h1 text-text-primary mb-3">
                Three simple steps
              </h2>
              <p className="text-body-sm text-text-tertiary max-w-lg mx-auto">
                No account, no credit card, no learning curve.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STEPS.map((step) => (
                <div key={step.num} className="glass-panel p-6 text-center glass-panel-hover">
                  <span className="text-3xl font-[510] text-brand-violet block mb-3">
                    {step.num}
                  </span>
                  <h3 className="text-body-emphasis text-text-primary mb-1">{step.title}</h3>
                  <p className="text-caption text-text-tertiary leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           COMPARISON TABLE
           ═══════════════════════════════════════════════════════════════ */}
        <section className="border-t border-border-default py-12 md:py-16 lg:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full border border-border-default text-caption text-text-tertiary mb-4">
                Compare
              </span>
              <h2 className="text-h1 text-text-primary mb-3">
                Why choose <span className="text-gradient">TranscribeFlow</span>
              </h2>
              <p className="text-body-sm text-text-tertiary max-w-lg mx-auto">
                See how we stack up against other transcription services.
              </p>
            </div>
            <div className="overflow-x-auto glass-panel">
              <table className="w-full text-caption">
                <thead>
                  <tr className="border-b border-border-default">
                    <th className="text-left py-3 px-4 text-text-secondary font-[510]">Feature</th>
                    <th className="text-center py-3 px-4 text-brand-violet font-[510]">TranscribeFlow</th>
                    <th className="text-center py-3 px-4 text-text-tertiary font-[510]">FoziScribe</th>
                    <th className="text-center py-3 px-4 text-text-tertiary font-[510]">WhisperAI</th>
                    <th className="text-center py-3 px-4 text-text-tertiary font-[510]">Otter.ai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {[
                    { feat: "Free tier", tf: "Unlimited", fz: "10 min/mo", wa: "5 min preview", oa: "300 min/mo" },
                    { feat: "Signup required", tf: "✗ No", fz: "✓ Yes", wa: "Optional", oa: "✓ Yes" },
                    { feat: "Languages", tf: "99+", fz: "99", wa: "99+", oa: "English only" },
                    { feat: "Timestamped output", tf: "✓", fz: "✓", wa: "✓", oa: "✓" },
                    { feat: "SRT export", tf: "✓", fz: "✗", wa: "✓", oa: "✗" },
                    { feat: "Audio player sync", tf: "✓", fz: "✗", wa: "✗", oa: "✗" },
                    { feat: "Privacy (no storage)", tf: "✓", fz: "Partial", wa: "✗", oa: "✗" },
                    { feat: "Open source", tf: "✓", fz: "✗", wa: "✗", oa: "✗" },
                  ].map((row) => (
                    <tr key={row.feat}>
                      <td className="py-2.5 px-4 text-text-primary">{row.feat}</td>
                      <td className="text-center py-2.5 px-4 text-success font-[510]">{row.tf}</td>
                      <td className="text-center py-2.5 px-4 text-text-tertiary">{row.fz}</td>
                      <td className="text-center py-2.5 px-4 text-text-tertiary">{row.wa}</td>
                      <td className="text-center py-2.5 px-4 text-text-tertiary">{row.oa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           SUPPORTED LANGUAGES
           ═══════════════════════════════════════════════════════════════ */}
        <section id="languages" className="border-t border-border-default py-10 md:py-12 lg:py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full border border-border-default text-caption text-text-tertiary mb-4">
              Languages
            </span>
            <h2 className="text-h2 text-text-primary mb-3">
              Supports <span className="text-gradient">99+ languages</span>
            </h2>
            <p className="text-body-sm text-text-tertiary max-w-lg mx-auto mb-8">
              Auto-detect or manually select from a wide range of languages — more than any other free
              transcription service.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 rounded-full border border-border-default text-caption text-text-secondary"
                >
                  {lang}
                </span>
              ))}
              <span className="px-3 py-1 rounded-full bg-[rgba(94,106,210,0.1)] border border-brand/30 text-caption text-brand-violet">
                +50 more
              </span>
            </div>
            <Link
              href="/languages"
              className="inline-flex items-center gap-1 text-caption text-brand-violet hover:text-brand-hover transition-colors"
            >
              View all supported languages <ChevronRight size={14} />
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           CTA SECTION
           ═══════════════════════════════════════════════════════════════ */}
        <section className="border-t border-border-default py-12 md:py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-h1 text-text-primary mb-4">
              Start transcribing{" "}
              <span className="text-gradient">for free</span>
            </h2>
            <p className="text-body-sm text-text-tertiary mb-6">
              No credit card required. No signup. No limits. Just upload and get your transcript.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand text-white text-label hover:bg-brand-hover transition-colors"
            >
              Transcribe Free →
            </Link>
            <p className="text-caption text-text-quaternary mt-3">
              Works with MP3, WAV, M4A, FLAC, OGG, MP4, WebM, AAC
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           FAQ with Schema.org markup
           ═══════════════════════════════════════════════════════════════ */}
        <section id="faq" className="border-t border-border-default py-12 md:py-16 lg:py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full border border-border-default text-caption text-text-tertiary mb-4">
                FAQ
              </span>
              <h2 className="text-h1 text-text-primary mb-3">
                Frequently asked questions
              </h2>
            </div>

            <div itemScope itemType="https://schema.org/FAQPage">
              {FAQ_ITEMS.map((faq) => (
                <details
                  key={faq.q}
                  className="group glass-panel mb-3 overflow-hidden"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-body-sm text-text-primary glass-panel-hover transition-colors">
                    <span itemProp="name">{faq.q}</span>
                    <span className="text-text-quaternary group-open:rotate-180 transition-transform duration-200">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M4 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </summary>
                  <div
                    className="px-5 py-4 border-t border-border-default"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p className="text-caption text-text-secondary leading-relaxed" itemProp="text">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           FOOTER
           ═══════════════════════════════════════════════════════════════ */}
        <footer className="border-t border-border-default px-6 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div>
                <h4 className="text-caption text-text-primary font-[510] mb-3">Product</h4>
                <ul className="space-y-1.5">
                  <li><Link href="/" className="text-caption text-text-tertiary hover:text-text-secondary transition-colors">Transcribe</Link></li>
                  <li><Link href="/pricing" className="text-caption text-text-tertiary hover:text-text-secondary transition-colors">Pricing</Link></li>
                  <li><Link href="/languages" className="text-caption text-text-tertiary hover:text-text-secondary transition-colors">Languages</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-caption text-text-primary font-[510] mb-3">Tools</h4>
                <ul className="space-y-1.5">
                  <li><Link href="/tools/free-audio-transcription" className="text-caption text-text-tertiary hover:text-text-secondary transition-colors">Free Audio Transcription</Link></li>
                  <li><Link href="/tools/mp3-to-text" className="text-caption text-text-tertiary hover:text-text-secondary transition-colors">MP3 to Text</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-caption text-text-primary font-[510] mb-3">Company</h4>
                <ul className="space-y-1.5">
              <li><Link href="/privacy" className="text-caption text-text-tertiary hover:text-text-secondary transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/contact" className="text-caption text-text-tertiary hover:text-text-secondary transition-colors">Contact</Link></li>
                  <li><Link href="/alternatives/foziscribe" className="text-caption text-text-tertiary hover:text-text-secondary transition-colors">vs FoziScribe</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-caption text-text-primary font-[510] mb-3">Community</h4>
                <ul className="space-y-1.5">
                  <li>
                    <a
                      href="https://github.com/amarmurmu001/transcribe-flow-frontend"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-caption text-text-tertiary hover:text-text-secondary transition-colors"
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border-default pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-caption text-text-quaternary">
                TranscribeFlow · Free & Open Source Audio Transcription
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setHistoryOpen(!historyOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-caption
                             text-text-tertiary hover:text-text-secondary hover:bg-surface transition-colors touch-target"
                  aria-label="Toggle transcription history"
                >
                  <History size={14} />
                  History {history.length > 0 && `(${history.length})`}
                </button>
              </div>
            </div>
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
