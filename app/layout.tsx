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
    "foziscribe alternative",
  ],
  authors: [{ name: "TranscribeFlow" }],
  metadataBase: new URL("https://transcribe-flow-v1.vercel.app"),
  alternates: {
    canonical: "https://transcribe-flow-v1.vercel.app",
  },
  openGraph: {
    title: "TranscribeFlow — Free Audio to Text Transcription Online",
    description:
      "Free, private audio transcription. Convert audio to text with timestamped transcripts [MM:SS]. No signup, no limits, powered by OpenAI Whisper AI.",
    url: "https://transcribe-flow-v1.vercel.app",
    siteName: "TranscribeFlow",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TranscribeFlow — Free Audio Transcription Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TranscribeFlow — Free Audio to Text Transcription Online",
    description:
      "Free, private audio transcription. Drop any audio file and get timestamped transcripts instantly. No signup required.",
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
  verification: {
    google: "Itkra6H3s2JQNGnt9sXpC2QGmuqxPRlNGMeL7jXYPRU",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://transcribe-flow-v1.vercel.app/#webapp",
      name: "TranscribeFlow",
      url: "https://transcribe-flow-v1.vercel.app",
      description:
        "Free, private audio transcription online. Convert audio to text with timestamped transcripts [MM:SS]. No signup, no upload limits. Powered by OpenAI Whisper AI.",
      applicationCategory: "Multimedia",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Free unlimited audio to text transcription",
        "Timestamped transcripts in [MM:SS] format",
        "Word-level timestamps",
        "99+ language support with auto-detection",
        "100% private — files deleted instantly after processing",
        "Download as TXT or SRT subtitles",
        "No signup or account required",
        "OpenAI Whisper (faster-whisper) AI accuracy",
        "Audio formats: MP3, WAV, M4A, FLAC, OGG, MP4, WebM, AAC",
      ],
      screenshot: "https://transcribe-flow-v1.vercel.app/og-image.png",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://transcribe-flow-v1.vercel.app/#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://transcribe-flow-v1.vercel.app" },
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://transcribe-flow-v1.vercel.app/#organization",
      name: "TranscribeFlow",
      url: "https://transcribe-flow-v1.vercel.app",
      description: "Free, private audio transcription powered by OpenAI Whisper AI.",
    },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
