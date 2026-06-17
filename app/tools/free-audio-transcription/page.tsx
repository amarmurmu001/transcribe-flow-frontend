import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Audio Transcription Online — No Signup, Unlimited Minutes",
  description:
    "Transcribe audio to text for free online. No signup, no limits. Upload MP3, WAV, M4A, FLAC and get timestamped transcripts powered by OpenAI Whisper AI. 99+ languages supported.",
  openGraph: {
    title: "Free Audio Transcription Online — No Signup, Unlimited Minutes",
    description:
      "Transcribe audio to text for free online. No signup, no limits. Powered by OpenAI Whisper AI with 99+ language support.",
    url: "https://transcribe-flow-v1.vercel.app/tools/free-audio-transcription",
  },
  alternates: {
    canonical: "https://transcribe-flow-v1.vercel.app/tools/free-audio-transcription",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free Audio Transcription Online",
  description:
    "Transcribe audio to text for free online. No signup, unlimited minutes, powered by Whisper AI.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://transcribe-flow-v1.vercel.app" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Free Audio Transcription",
        item: "https://transcribe-flow-v1.vercel.app/tools/free-audio-transcription",
      },
    ],
  },
};

export default function FreeAudioTranscriptionPage() {
  return (
    <div className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full border border-border-default text-caption text-text-tertiary mb-4">
              Free Tool
            </span>
            <h1 className="text-display text-text-primary mb-4">
              Free Audio Transcription Online —{" "}
              <span className="text-gradient">No Signup Required</span>
            </h1>
            <p className="text-body-sm text-text-tertiary max-w-2xl mx-auto leading-relaxed">
              Convert audio to text with unlimited free transcription. No account, no credit card, no
              hidden limits. Upload your audio file and get a precise, timestamped transcript in
              seconds. Powered by OpenAI Whisper (faster-whisper) — one of the most accurate
              speech-to-text models available.
            </p>
          </div>

          <div className="glass-panel p-6 md:p-8 space-y-6">
            <h2 className="text-h2 text-text-primary">
              How to Transcribe Audio to Text Online Free
            </h2>
            <ol className="space-y-4">
              {[
                { step: "1", title: "Upload your audio", desc: "Drag and drop or browse to select your audio file. Supports MP3, WAV, M4A, FLAC, OGG, AAC, WebM, and MP4." },
                { step: "2", title: "Choose language (optional)", desc: "Auto-detect is on by default. Select from English, Spanish, French, German, Japanese, Arabic, and 90+ more." },
                { step: "3", title: "Click Transcribe", desc: "Our AI processes your audio locally using the Whisper model. Processing usually takes 30-60% of the audio duration." },
                { step: "4", title: "Get your transcript", desc: "View timestamped output in [MM:SS] format. Copy to clipboard or download as TXT or SRT subtitles." },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-brand/20 text-brand-violet flex items-center justify-center text-label font-bold">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-body-emphasis text-text-primary mb-1">{item.title}</h3>
                    <p className="text-caption text-text-tertiary">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-5">
              <h3 className="text-body-emphasis text-text-primary mb-2">Supported Audio Formats</h3>
              <ul className="space-y-1 text-caption text-text-secondary">
                {["MP3 (.mp3)", "WAV (.wav)", "M4A (.m4a)", "FLAC (.flac)", "OGG (.ogg)", "AAC (.aac)", "WebM (.webm)", "MP4 (.mp4)"].map(
                  (fmt) => (
                    <li key={fmt} className="flex items-center gap-2">
                      <span className="text-success">✓</span> {fmt}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="glass-panel p-5">
              <h3 className="text-body-emphasis text-text-primary mb-2">Key Features</h3>
              <ul className="space-y-1 text-caption text-text-secondary">
                {[
                  "100% free with unlimited usage",
                  "No signup or account needed",
                  "Timestamped [MM:SS] transcripts",
                  "Download as TXT or SRT subtitles",
                  "99+ language support with auto-detect",
                  "100% private — files deleted after processing",
                  "Powered by OpenAI Whisper (faster-whisper)",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-success">✓</span> {f}
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
              Transcribe Your Audio Now →
            </Link>
          </div>

          <div className="mt-12 glass-panel p-6">
            <h2 className="text-h2 text-text-primary mb-4">
              Frequently Asked Questions About Free Audio Transcription
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Is TranscribeFlow really free?",
                  a: "Yes! TranscribeFlow is completely free to use with no hidden costs, no credits, and no signup required. Unlike other services that limit you to 10-30 minutes per month, we offer unlimited transcription.",
                },
                {
                  q: "How accurate is the free transcription?",
                  a: "We use OpenAI's Whisper model (via faster-whisper), which provides industry-leading speech-to-text accuracy. For clear audio in English, accuracy typically exceeds 95%.",
                },
                {
                  q: "Is my audio data private?",
                  a: "Absolutely. Your audio files are processed and immediately deleted from our servers. We do not store, share, or train on your data.",
                },
                {
                  q: "What's the maximum file size?",
                  a: "There's no strict file size limit. Our backend runs on powerful infrastructure that can handle files of any length — from a 10-second clip to a multi-hour lecture.",
                },
                {
                  q: "Can I transcribe YouTube videos or podcast audio?",
                  a: "Yes! You can download audio from YouTube, podcasts, or any other source and upload the MP3 or MP4 file to TranscribeFlow for instant transcription.",
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
