import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: {
    default: "TranscribeFlow — Free Audio to Text Transcription Online",
    template: "%s | TranscribeFlow",
  },
  description:
    "Free, private audio transcription online. Convert audio to text with timestamped transcripts [MM:SS]. No signup, no upload limits, powered by Whisper AI.",
  keywords: [
    "free audio transcription",
    "audio to text",
    "speech to text",
    "transcribe audio online free",
    "whisper transcription",
    "timestamped transcript",
    "audio to text converter",
    "free transcription tool",
  ],
  authors: [{ name: "TranscribeFlow" }],
  metadataBase: new URL("https://transcribe-flow-frontend.vercel.app"),
  openGraph: {
    title: "TranscribeFlow — Free Audio to Text Transcription",
    description:
      "Free, private audio transcription. Drop any audio file and get timestamped transcripts instantly. No signup needed.",
    url: "https://transcribe-flow-frontend.vercel.app",
    siteName: "TranscribeFlow",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TranscribeFlow — Free Audio Transcription",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TranscribeFlow — Free Audio to Text Transcription",
    description:
      "Free, private audio transcription. Drop any audio file and get timestamped transcripts instantly.",
    images: ["/og-image.png"],
    creator: "@transcribeflow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TranscribeFlow",
  url: "https://transcribe-flow-frontend.vercel.app",
  description:
    "Free, private audio transcription online. Convert audio to text with timestamped transcripts [MM:SS]. No signup, no upload limits.",
  applicationCategory: "Multimedia",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Free audio to text transcription",
    "Timestamped transcripts in [MM:SS] format",
    "Multiple language support",
    "100% private — no data leaves your browser/backend",
    "Download as TXT or SRT subtitles",
    "Powered by OpenAI Whisper (faster-whisper)",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
