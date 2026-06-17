import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — TranscribeFlow | Free Audio Transcription",
  description:
    "Contact the TranscribeFlow team. Open source project — reach out via GitHub for support, feature requests, or feedback.",
  alternates: {
    canonical: "https://transcribe-flow-v1.vercel.app/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex-1">
      <section className="py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-display text-text-primary mb-4">Contact Us</h1>
            <p className="text-body-sm text-text-tertiary max-w-lg mx-auto">
              Have questions, feedback, or feature requests? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6">
              <h2 className="text-body-emphasis text-text-primary mb-2">GitHub Issues</h2>
              <p className="text-caption text-text-secondary mb-4">
                For bug reports, feature requests, and technical questions, open an issue on our
                GitHub repository.
              </p>
              <a
                href="https://github.com/amarmurmu001/transcribe-flow-frontend/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brand text-white text-caption hover:bg-brand-hover transition-colors"
              >
                Open GitHub Issue →
              </a>
            </div>

            <div className="glass-panel p-6">
              <h2 className="text-body-emphasis text-text-primary mb-2">Open Source</h2>
              <p className="text-caption text-text-secondary mb-4">
                TranscribeFlow is open source. Check out the code, contribute, or fork it on GitHub.
              </p>
              <a
                href="https://github.com/amarmurmu001/transcribe-flow-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-surface text-text-secondary hover:bg-surface-hover transition-colors text-caption"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
