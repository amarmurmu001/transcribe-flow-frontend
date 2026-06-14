"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileAudio, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import clsx from "clsx";

interface UploadZoneProps {
  onTranscribe: (file: File, language: string) => Promise<void>;
  isProcessing: boolean;
}

const ALLOWED_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/wave",
  "audio/x-wav",
  "audio/mp4",
  "audio/x-m4a",
  "audio/flac",
  "audio/ogg",
  "audio/webm",
  "audio/aac",
  "video/mp4",
  "video/webm",
];

const LANGUAGES = [
  { code: "", label: "Auto-detect" },
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "pt", label: "Portuguese" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "zh", label: "Chinese" },
  { code: "ar", label: "Arabic" },
  { code: "ru", label: "Russian" },
];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadZone({ onTranscribe, isProcessing }: UploadZoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) {
      setSelectedFile(accepted[0]);
      setStatus("idle");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a", ".flac", ".ogg", ".aac", ".webm"],
      "video/*": [".mp4", ".webm"],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  const handleTranscribe = async () => {
    if (!selectedFile || isProcessing) return;
    setStatus("processing");
    try {
      await onTranscribe(selectedFile, language);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setStatus("idle");
  };

  if (status === "done") {
    return (
      <div className="upload-zone text-center cursor-pointer" onClick={handleReset}>
        <CheckCircle2 size={40} className="mx-auto text-success mb-4" />
        <p className="text-body text-text-secondary mb-1">Transcription complete!</p>
        <p className="text-caption text-text-tertiary">Click to transcribe another file</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={clsx(
          "upload-zone text-center cursor-pointer transition-all",
          isDragActive && "upload-zone-active",
          isProcessing && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />

        {isProcessing ? (
          <>
            <Loader2 size={40} className="mx-auto text-brand-violet mb-4 animate-spin" />
            <p className="text-body-emphasis text-text-primary mb-1">Transcribing...</p>
            <p className="text-caption text-text-tertiary">This may take a moment</p>
          </>
        ) : selectedFile ? (
          <>
            <FileAudio size={40} className="mx-auto text-brand-violet mb-4" />
            <p className="text-body-emphasis text-text-primary mb-1">{selectedFile.name}</p>
            <p className="text-caption text-text-tertiary">{formatSize(selectedFile.size)}</p>
          </>
        ) : (
          <>
            <Upload size={40} className="mx-auto text-text-quaternary mb-4" />
            <p className="text-body-emphasis text-text-primary mb-1">
              {isDragActive ? "Drop your audio here" : "Drop audio file here"}
            </p>
            <p className="text-caption text-text-tertiary">
              or click to browse · MP3, WAV, M4A, FLAC, OGG, MP4
            </p>
          </>
        )}
      </div>

      {selectedFile && !isProcessing && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="flex-1">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-[rgba(255,255,255,0.02)] border border-border-default rounded-md
                         px-3 py-3 sm:py-2 text-caption text-text-secondary
                         focus:outline-none focus:border-brand-violet transition-colors
                         appearance-none cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-surface text-text-primary">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleTranscribe}
            className="w-full sm:w-auto px-5 py-3 sm:py-2 rounded-md bg-brand text-white text-label hover:bg-brand-hover transition-colors whitespace-nowrap touch-target"
          >
            Transcribe
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-3 sm:py-2 rounded-md text-caption text-text-tertiary hover:text-text-secondary transition-colors touch-target text-center"
          >
            Cancel
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 text-caption text-error">
          <AlertCircle size={14} />
          Transcription failed. Please try again.
        </div>
      )}
    </div>
  );
}
