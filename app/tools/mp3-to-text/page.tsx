import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MP3 to Text Converter — Free Online Transcription | TranscribeFlow",
  description:
    "Convert MP3 audio to text online free. No signup, unlimited use. Upload MP3 files and get timestamped transcripts with OpenAI Whisper AI accuracy.",
  openGraph: {
    title: "MP3 to Text Converter — Free Online Transcription",
    description:
      "Convert MP3 audio to text online free. Upload MP3 files and get accurate timestamped transcripts instantly.",
    url: "https://transcribe-flow-v1.vercel.app/tools/mp3-to-text",
  },
  alternates: {
    canonical: "https://transcribe-flow-v1.vercel.app/tools/mp3-to-text",
  },
};

export default function Mp3ToTextPage() {
  return (
    <div className="flex-1">
      <section className="py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full border border-border-default text-caption text-text-tertiary mb-4">
              Free Tool
            </span>
            <h1 className="text-display text-text-primary mb-4">
              MP3 to Text Converter —{" "}
              <span className="text-gradient">Free & Online</span>
            </h1>
            <p className="text-body-sm text-text-tertiary max-w-2xl mx-auto leading-relaxed">
              Turn your MP3 recordings, podcasts, lectures, and voice memos into accurate text with
              timestamps. No signup, no limits, completely free. Powered by OpenAI Whisper AI.
            </p>
          </div>

          <div className="glass-panel p-6 md:p-8">
            <h2 className="text-h2 text-text-primary mb-4">
              How to Convert MP3 to Text Online
            </h2>
            <div className="space-y-3">
              <p className="text-caption text-text-secondary leading-relaxed">
                Converting MP3 audio to text with TranscribeFlow is simple:
              </p>
              <ol className="space-y-3">
                {[
                  "Go to the TranscribeFlow homepage",
                  "Drag and drop your MP3 file onto the upload zone",
                  "(Optional) Select the spoken language for better accuracy",
                  'Click "Transcribe" and wait a few seconds',
                  "View your timestamped transcript, copy it, or download as TXT/SRT",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-caption text-text-secondary">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-brand/20 text-brand-violet flex items-center justify-center text-label">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-5">
              <h3 className="text-body-emphasis text-text-primary mb-3">Why Use TranscribeFlow for MP3 to Text?</h3>
              <ul className="space-y-2 text-caption text-text-secondary">
                {[
                  "Completely free — no hidden costs or credit limits",
                  "No account or signup required",
                  "Industry-leading Whisper AI accuracy",
                  "Timestamped output for easy navigation",
                  "Download as TXT or SRT subtitle files",
                  "Your privacy — files deleted after transcription",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-success shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-panel p-5">
              <h3 className="text-body-emphasis text-text-primary mb-3">Common Use Cases</h3>
              <ul className="space-y-2 text-caption text-text-secondary">
                {[
                  "Podcast transcription for show notes",
                  "Lecture recording to study notes",
                  "Interview transcription for journalism",
                  "Voice memo to text for productivity",
                  "Meeting recording documentation",
                  "YouTube video script extraction",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-brand-violet shrink-0 mt-0.5">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand text-white text-label hover:bg-brand-hover transition-colors"
            >
              Convert MP3 to Text Now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
