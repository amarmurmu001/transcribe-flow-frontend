import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "FoziScribe Alternative — TranscribeFlow | Free, Unlimited Transcription",
  description:
    "Looking for a FoziScribe alternative? TranscribeFlow offers unlimited free transcription with no signup. Unlike FoziScribe's 10 min/month limit, get unlimited minutes, SRT export, and audio player sync — all free.",
  openGraph: {
    title: "FoziScribe Alternative — TranscribeFlow | Free, Unlimited Transcription",
    description:
      "Looking for a FoziScribe alternative? TranscribeFlow offers unlimited free transcription with no signup. Get SRT export, audio sync, and 99+ languages — all free.",
    url: "https://transcribe-flow-v1.vercel.app/alternatives/foziscribe",
  },
  alternates: {
    canonical: "https://transcribe-flow-v1.vercel.app/alternatives/foziscribe",
  },
  keywords: [
    "foziscribe alternative",
    "foziscribe competitor",
    "foziscribe vs transcribeflow",
    "free alternative to foziscribe",
    "foziscribe free transcription",
    "best foziscribe alternative",
  ],
};

const COMPARISON_ROWS = [
  {
    feature: "Free tier",
    tf: "Unlimited minutes — completely free",
    fz: "10 minutes per month",
  },
  {
    feature: "Signup required",
    tf: "No signup, no account, no email",
    fz: "Requires account creation",
  },
  {
    feature: "Languages",
    tf: "99+ with auto-detection",
    fz: "99 with auto-detection",
  },
  {
    feature: "SRT subtitle export",
    tf: "✓ Download as .srt files",
    fz: "✗ Not available",
  },
  {
    feature: "Audio player with live highlighting",
    tf: "✓ Click any timestamp to jump",
    fz: "✗ No audio player",
  },
  {
    feature: "Transcription history",
    tf: "✓ Session history sidebar",
    fz: "✗ No history",
  },
  {
    feature: "Word-level timestamps",
    tf: "✓ Per-word timing data",
    fz: "✗ Segment-level only",
  },
  {
    feature: "Privacy (file deletion)",
    tf: "Files deleted immediately after processing",
    fz: "Files deleted after processing",
  },
  {
    feature: "Open source",
    tf: "✓ Fully open source on GitHub",
    fz: "✗ Proprietary",
  },
  {
    feature: "Pricing model",
    tf: "100% free forever",
    fz: "₹499/mo (Creator Pro), ₹1499/mo (Unlimited)",
  },
  {
    feature: "File size limit",
    tf: "No limit",
    fz: "25MB per file",
  },
  {
    feature: "Supported formats",
    tf: "MP3, WAV, M4A, FLAC, OGG, MP4, WebM, AAC",
    fz: "MP3, WAV, M4A, OGG, FLAC, WebM",
  },
];

export default function FoziScribeAlternativePage() {
  return (
    <div className="flex-1">
      {/* JSON-LD for comparison */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "FoziScribe Alternative — TranscribeFlow",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://transcribe-flow-v1.vercel.app" },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "FoziScribe Alternative",
                  item: "https://transcribe-flow-v1.vercel.app/alternatives/foziscribe",
                },
              ],
            },
          }),
        }}
      />

      <section className="py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full border border-border-default text-caption text-text-tertiary mb-4">
              FoziScribe Alternative
            </span>
            <h1 className="text-display text-text-primary mb-4">
              The Best Free{" "}
              <span className="text-gradient">FoziScribe Alternative</span>
            </h1>
            <p className="text-body-sm text-text-tertiary max-w-2xl mx-auto leading-relaxed">
              FoziScribe limits you to just 10 minutes of free transcription per month and charges
              ₹499–₹1499/month for more. <strong className="text-text-primary">TranscribeFlow is completely free</strong> — unlimited
              minutes, no signup, no credit card. Plus features FoziScribe doesn&apos;t offer: SRT
              subtitle export, audio player with live highlighting, and word-level timestamps.
            </p>
          </div>

          {/* Key differentiators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="glass-panel p-5 text-center">
              <p className="text-display text-success font-[510]">Unlimited</p>
              <p className="text-caption text-text-tertiary mt-1">Free minutes vs FoziScribe&apos;s 10 min/mo</p>
            </div>
            <div className="glass-panel p-5 text-center">
              <p className="text-display text-success font-[510]">$0</p>
              <p className="text-caption text-text-tertiary mt-1">Forever vs FoziScribe&apos;s ₹499–₹1499/mo</p>
            </div>
            <div className="glass-panel p-5 text-center">
              <p className="text-display text-success font-[510]">No Signup</p>
              <p className="text-caption text-text-tertiary mt-1">Just upload & transcribe instantly</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand text-white text-label hover:bg-brand-hover transition-colors"
            >
              Try TranscribeFlow Free →
            </Link>
            <p className="text-caption text-text-quaternary mt-2">No account required. No limits.</p>
          </div>

          {/* Detailed comparison table */}
          <h2 className="text-h2 text-text-primary mb-6 text-center">
            TranscribeFlow vs FoziScribe:{" "}
            <span className="text-gradient">Full Comparison</span>
          </h2>

          <div className="glass-panel overflow-hidden">
            <table className="w-full text-caption">
              <thead>
                <tr className="border-b border-border-default bg-[rgba(255,255,255,0.02)]">
                  <th className="text-left py-3 px-4 text-text-secondary font-[510] w-1/3">Feature</th>
                  <th className="text-left py-3 px-4 text-brand-violet font-[510] w-1/3">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-success" />
                      TranscribeFlow
                    </span>
                  </th>
                  <th className="text-left py-3 px-4 text-text-tertiary font-[510] w-1/3">
                    <span className="flex items-center gap-1.5">
                      <XCircle size={14} className="text-error" />
                      FoziScribe
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="py-3 px-4 text-text-primary font-[510]">{row.feature}</td>
                    <td className="py-3 px-4 text-text-secondary">{row.tf}</td>
                    <td className="py-3 px-4 text-text-tertiary">{row.fz}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Why switch section */}
          <div className="mt-12">
            <h2 className="text-h2 text-text-primary mb-6 text-center">
              Why Switch from FoziScribe to TranscribeFlow?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Save Money",
                  desc: "FoziScribe charges ₹499/month for 400 minutes or ₹1499/month for unlimited. TranscribeFlow is 100% free forever with no limits.",
                },
                {
                  title: "No Account Needed",
                  desc: "FoziScribe requires you to create an account. TranscribeFlow lets you transcribe instantly — just upload and go.",
                },
                {
                  title: "Better Export Options",
                  desc: "FoziScribe only offers copy and TXT download. TranscribeFlow adds SRT subtitle export — essential for video creators.",
                },
                {
                  title: "Audio Player with Sync",
                  desc: "TranscribeFlow includes an in-browser audio player that highlights each word as it plays. FoziScribe has no audio playback at all.",
                },
                {
                  title: "Open Source",
                  desc: "TranscribeFlow is fully open source on GitHub. You can inspect the code, self-host, or contribute. FoziScribe is proprietary.",
                },
                {
                  title: "No File Size Limit",
                  desc: "FoziScribe caps uploads at 25MB. TranscribeFlow handles files of any length — from short clips to multi-hour lectures.",
                },
              ].map((reason) => (
                <div key={reason.title} className="glass-panel p-5 glass-panel-hover">
                  <h3 className="text-body-emphasis text-text-primary mb-2">{reason.title}</h3>
                  <p className="text-caption text-text-tertiary leading-relaxed">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-12 glass-panel p-8 text-center">
            <h2 className="text-h2 text-text-primary mb-3">
              Ready to switch?{" "}
              <span className="text-gradient">It&apos;s free</span>
            </h2>
            <p className="text-body-sm text-text-tertiary max-w-lg mx-auto mb-6">
              No migration needed. No account to create. Just start transcribing.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand text-white text-label hover:bg-brand-hover transition-colors"
            >
              Start Transcribing Free →
            </Link>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h2 className="text-h2 text-text-primary mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {[
                {
                  q: "Is TranscribeFlow really a free alternative to FoziScribe?",
                  a: "Yes! While FoziScribe gives you only 10 free minutes per month and charges ₹499–₹1499 for more, TranscribeFlow is completely free with unlimited minutes. No signup, no credit card, no hidden limits.",
                },
                {
                  q: "Can I use TranscribeFlow for the same things as FoziScribe?",
                  a: "Absolutely. TranscribeFlow supports all the same audio formats (MP3, WAV, M4A, FLAC, OGG, WebM) plus more (AAC, MP4). We support 99+ languages with auto-detection just like FoziScribe, plus features they don't have like SRT export and audio player sync.",
                },
                {
                  q: "Is the transcription quality as good as FoziScribe?",
                  a: "Yes — both TranscribeFlow and FoziScribe use OpenAI Whisper models. We use faster-whisper which provides the same industry-leading accuracy. For clear audio, accuracy exceeds 95%.",
                },
                {
                  q: "How do I migrate from FoziScribe to TranscribeFlow?",
                  a: "There's nothing to migrate. Since TranscribeFlow requires no account, you can start using it immediately. Just upload your audio file and transcribe. Your previous FoziScribe transcripts can be downloaded from their app before you stop using it.",
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group glass-panel overflow-hidden"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-body-sm text-text-primary glass-panel-hover">
                    <span itemProp="name">{faq.q}</span>
                    <span className="text-text-quaternary group-open:rotate-180 transition-transform duration-200">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M4 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </summary>
                  <div
                    className="px-4 py-3 border-t border-border-default"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p className="text-caption text-text-secondary" itemProp="text">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
