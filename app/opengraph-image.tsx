import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "TranscribeFlow — Free Audio to Text Transcription";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #08090a 0%, #0f1011 50%, #191a1b 100%)",
          fontFamily: "Inter",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              background: "#5e6ad2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(94,106,210,0.3)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C10.9 2 10 2.9 10 4v8c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2z"
                fill="white"
              />
              <path
                d="M19 12c0 3.3-2.7 6-6 6s-6-2.7-6-6H4c0 4.4 3.1 8.1 7 8.9V22h2v-1.1c3.9-.8 7-4.5 7-8.9h-3z"
                fill="white"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 510,
              color: "#f7f8f8",
              letterSpacing: "-0.5px",
            }}
          >
            Transcribe
            <span style={{ color: "#7170ff" }}>Flow</span>
          </span>
        </div>

        <h1
          style={{
            fontSize: "64px",
            fontWeight: 510,
            color: "#f7f8f8",
            letterSpacing: "-1.5px",
            margin: "0 0 16px 0",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Free Audio to Text
          <br />
          <span style={{ background: "linear-gradient(135deg, #5e6ad2, #7170ff)", WebkitBackgroundClip: "text", color: "transparent" }}>
            Transcription Online
          </span>
        </h1>

        <p
          style={{
            fontSize: "24px",
            color: "#8a8f98",
            margin: 0,
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
          }}
        >
          Drop any audio file. Get timestamped transcripts [MM:SS] — free, private, no signup.
        </p>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #5e6ad2, #7170ff, #828fff)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
