import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "99+ Languages Supported — TranscribeFlow | Free Audio Transcription",
  description:
    "Transcribe audio to text in 99+ languages with automatic detection. Supports English, Spanish, French, German, Chinese, Japanese, Arabic, Hindi, and more.",
  openGraph: {
    title: "99+ Languages Supported — TranscribeFlow",
    description:
      "Transcribe audio to text in 99+ languages with automatic detection. Free, no signup required.",
    url: "https://transcribe-flow-v1.vercel.app/languages",
  },
  alternates: {
    canonical: "https://transcribe-flow-v1.vercel.app/languages",
  },
};

const LANGUAGE_GROUPS = [
  {
    region: "Most Popular",
    langs: [
      "English", "Spanish", "French", "German", "Italian", "Portuguese",
    ],
  },
  {
    region: "Asian Languages",
    langs: [
      "Chinese (Simplified & Traditional)", "Japanese", "Korean", "Hindi", "Bengali",
      "Vietnamese", "Thai", "Indonesian", "Malay", "Tagalog", "Tamil",
      "Telugu", "Marathi", "Urdu", "Gujarati", "Kannada", "Malayalam",
    ],
  },
  {
    region: "European Languages",
    langs: [
      "Dutch", "Russian", "Polish", "Ukrainian", "Swedish", "Danish", "Norwegian",
      "Finnish", "Czech", "Romanian", "Hungarian", "Greek", "Bulgarian",
      "Croatian", "Slovak", "Slovenian", "Lithuanian", "Latvian", "Estonian",
      "Serbian", "Bosnian", "Macedonian", "Albanian", "Icelandic", "Maltese",
    ],
  },
  {
    region: "Middle Eastern & African Languages",
    langs: [
      "Arabic", "Hebrew", "Turkish", "Persian (Farsi)", "Swahili", "Amharic",
      "Hausa", "Yoruba", "Igbo", "Zulu", "Afrikaans", "Somali",
      "Nepali", "Sinhala", "Khmer", "Burmese",
    ],
  },
  {
    region: "Other Supported Languages",
    langs: [
      "Welsh", "Irish", "Scottish Gaelic", "Galician", "Basque", "Catalan",
      "Luxembourgish", "Latin", "Esperanto",
    ],
  },
];

export default function LanguagesPage() {
  return (
    <div className="flex-1">
      <section className="py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full border border-border-default text-caption text-text-tertiary mb-4">
              Languages
            </span>
            <h1 className="text-display text-text-primary mb-4">
              Transcribe Audio in{" "}
              <span className="text-gradient">99+ Languages</span>
            </h1>
            <p className="text-body-sm text-text-tertiary max-w-2xl mx-auto leading-relaxed">
              TranscribeFlow supports transcription in 99+ languages with automatic language detection.
              Upload any audio — we&apos;ll detect the language and transcribe it with OpenAI Whisper AI accuracy.
              Free, no signup required.
            </p>
          </div>

          {LANGUAGE_GROUPS.map((group) => (
            <div key={group.region} className="mb-8">
              <h2 className="text-h2 text-text-primary mb-4">{group.region}</h2>
              <div className="flex flex-wrap gap-2">
                {group.langs.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1.5 rounded-full border border-border-default text-caption text-text-secondary hover:border-brand/30 hover:text-text-primary transition-colors"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-10 glass-panel p-6">
            <h2 className="text-h2 text-text-primary mb-3">Automatic Language Detection</h2>
            <p className="text-caption text-text-secondary leading-relaxed mb-4">
              You don&apos;t need to select a language manually. TranscribeFlow automatically detects
              the spoken language in your audio file and transcribes it with native-level accuracy.
              Manual language selection is available if you want to force a specific language.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand text-white text-label hover:bg-brand-hover transition-colors"
            >
              Transcribe Audio in Any Language →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
