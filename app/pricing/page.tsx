import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — TranscribeFlow | 100% Free Audio Transcription",
  description:
    "TranscribeFlow is completely free. No hidden costs, no credits, no signup required. Unlimited audio transcription with timestamped output.",
  openGraph: {
    title: "Pricing — TranscribeFlow | 100% Free",
    description:
      "TranscribeFlow is completely free. Unlimited audio transcription with no hidden costs.",
    url: "https://transcribe-flow-v1.vercel.app/pricing",
  },
  alternates: {
    canonical: "https://transcribe-flow-v1.vercel.app/pricing",
  },
};

const FEATURES = [
  "Unlimited audio transcription",
  "Timestamped [MM:SS] transcripts",
  "99+ language support with auto-detect",
  "Download as TXT or SRT subtitles",
  "Copy to clipboard",
  "Audio player with live highlighting",
  "Transcription history",
  "Word-level timestamps",
  "No signup or account required",
  "100% private — files deleted after processing",
  "All audio formats supported (MP3, WAV, M4A, FLAC, OGG, MP4, WebM, AAC)",
  "Powered by OpenAI Whisper (faster-whisper)",
];

export default function PricingPage() {
  return (
    <div className="flex-1">
      <section className="py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full border border-border-default text-caption text-text-tertiary mb-4">
              Pricing
            </span>
            <h1 className="text-display text-text-primary mb-4">
              100% Free —{" "}
              <span className="text-gradient">No Hidden Costs</span>
            </h1>
            <p className="text-body-sm text-text-tertiary max-w-2xl mx-auto leading-relaxed">
              Unlike other transcription services that limit you to 10-30 minutes per month or charge
              hundreds per month, TranscribeFlow is completely free with no limits, no signup, and no
              credit card required.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="glass-panel p-8 text-center border-2 border-brand/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-caption px-4 py-0.5 rounded-full font-[510]">
                Best Value
              </div>
              <h2 className="text-h1 text-text-primary mb-2">Free</h2>
              <p className="text-display text-text-primary mb-1">$0</p>
              <p className="text-caption text-text-tertiary mb-6">forever · no credit card</p>
              <ul className="text-left space-y-2.5 mb-8">
                {FEATURES.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-caption text-text-secondary">
                    <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/"
                className="block w-full py-3 rounded-md bg-brand text-white text-label hover:bg-brand-hover transition-colors"
              >
                Start Transcribing Free →
              </Link>
            </div>
          </div>

          <div className="mt-12 glass-panel p-6">
            <h2 className="text-h2 text-text-primary mb-3">Compare with Other Services</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-caption">
                <thead>
                  <tr className="border-b border-border-default">
                    <th className="text-left py-3 pr-4 text-text-secondary font-[510]">Feature</th>
                    <th className="text-center py-3 px-4 text-brand-violet font-[510]">TranscribeFlow</th>
                    <th className="text-center py-3 px-4 text-text-tertiary font-[510]">FoziScribe</th>
                    <th className="text-center py-3 pl-4 text-text-tertiary font-[510]">Otter.ai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {[
                    { feat: "Free tier", tf: "Unlimited", fz: "10 min/mo", ot: "300 min/mo" },
                    { feat: "Signup required", tf: "No", fz: "Yes", ot: "Yes" },
                    { feat: "Languages", tf: "99+", fz: "99", ot: "English only" },
                    { feat: "Timestamped output", tf: "✓", fz: "✓", ot: "✓" },
                    { feat: "SRT subtitles", tf: "✓", fz: "✗", ot: "✗" },
                    { feat: "Audio player sync", tf: "✓", fz: "✗", ot: "✗" },
                    { feat: "Privacy (no storage)", tf: "✓", fz: "Partial", ot: "Stores data" },
                  ].map((row) => (
                    <tr key={row.feat}>
                      <td className="py-2.5 pr-4 text-text-primary">{row.feat}</td>
                      <td className="text-center py-2.5 px-4 text-success">{row.tf}</td>
                      <td className="text-center py-2.5 px-4 text-text-tertiary">{row.fz}</td>
                      <td className="text-center py-2.5 pl-4 text-text-tertiary">{row.ot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
