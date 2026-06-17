import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — TranscribeFlow",
  description:
    "TranscribeFlow privacy policy. Your audio files are processed in memory and immediately deleted. No data is stored, shared, or used for training.",
  alternates: {
    canonical: "https://transcribe-flow-v1.vercel.app/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex-1">
      <section className="py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-display text-text-primary mb-4">
              Privacy Policy
            </h1>
            <p className="text-body-sm text-text-tertiary">Last updated: June 2025</p>
          </div>

          <div className="space-y-6 text-caption text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-h2 text-text-primary mb-3">1. Data Collection</h2>
              <p>
                TranscribeFlow does not collect, store, or share any personal data. We do not require
                an account, email address, or any personal information to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-text-primary mb-3">2. Audio Files</h2>
              <p>
                When you upload an audio file for transcription, the file is transmitted directly to
                our backend server where it is processed in memory by the Whisper speech-to-text model.
                Immediately after transcription is complete, the audio file is permanently deleted from
                our server. We do not retain, store, backup, or share any audio files.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-text-primary mb-3">3. Transcription Data</h2>
              <p>
                Transcripts are only held in memory during your browser session. No transcription
                data is stored on our servers. The sidebar history is stored locally in your
                browser&apos;s memory and is cleared when you close the tab or refresh the page.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-text-primary mb-3">4. Cookies & Tracking</h2>
              <p>
                TranscribeFlow does not use cookies, tracking scripts, or analytics that collect
                personal data. We do not use Google Analytics or any third-party tracking services
                that identify individual users.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-text-primary mb-3">5. Third-Party Services</h2>
              <p>
                TranscribeFlow does not share any data with third parties. We do not use any
                third-party APIs or services that would receive your audio or transcription data.
                The application is self-hosted and processes everything locally.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-text-primary mb-3">6. Data Security</h2>
              <p>
                All communications with TranscribeFlow are encrypted using HTTPS/TLS. Audio files
                are processed in memory and never written to persistent storage. We follow industry
                best practices for data security and privacy.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-text-primary mb-3">7. Contact</h2>
              <p>
                If you have any questions about this privacy policy, please open an issue on our
                GitHub repository or contact us through the website.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
