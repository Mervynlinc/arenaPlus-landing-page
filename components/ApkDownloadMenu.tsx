"use client";

import { APK_VARIANTS, type ApkVariant } from "@/lib/apk-links";

// Version names are the actual APK file names. Phone labels stay device-facing
// (no "architecture" / "CPU" jargon).
const VERSION_NAME: Record<ApkVariant, string> = {
  arm64: "arm64-v8a",
  armeabi_v7a: "armeabi-v7a",
  x86: "x86",
  x86_64: "x86_64",
};

const PHONE_COPY: Record<ApkVariant, string> = {
  arm64: "Most Android phones made in 2018 or later",
  armeabi_v7a: "Older or budget Android phones",
  x86: "Less common Intel-based phones",
  x86_64: "Less common newer Intel-based phones",
};

// Shorter labels for compact boxes — device-facing language, no jargon.
const COMPACT_COPY: Record<ApkVariant, string> = {
  arm64: "Most phones",
  armeabi_v7a: "Older phones",
  x86: "Intel phones",
  x86_64: "Newer Intel",
};

interface ApkDownloadMenuProps {
  recommended: ApkVariant;
  className?: string;
  variant?: "grid" | "list";
  compact?: boolean;
}

export default function ApkDownloadMenu({
  recommended,
  className = "",
  variant = "list",
  compact = false,
}: ApkDownloadMenuProps) {
  const isGrid = variant === "grid";

  return (
    <div className={`text-left space-y-3 w-full ${className}`}>
      <p className="text-sm text-muted-light max-w-xl mx-auto md:mx-0">
        Choose the version that fits your phone. Not sure?{" "}
        <span className="text-white">Most phones take the recommended one.</span>
      </p>
      <ul
        className={
          isGrid
            ? "grid grid-cols-2 gap-2 w-full"
            : "space-y-2 w-full"
        }
      >
        {(Object.keys(APK_VARIANTS) as ApkVariant[]).map((variant) => {
          const isRecommended = variant === recommended;

          if (compact) {
            return (
              <li
                key={variant}
                className={`flex flex-col justify-between gap-2 rounded-xl border px-3 py-3 ${
                  isRecommended
                    ? "border-accent/40 bg-accent/10"
                    : "border-stroke bg-card/60"
                }`}
              >
                <div className="space-y-1">
                  <p className="font-semibold text-white text-sm break-words">
                    {VERSION_NAME[variant]}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-muted-light">{COMPACT_COPY[variant]}</p>
                    {isRecommended && (
                      <span className="shrink-0 rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-background">
                        Pick
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={APK_VARIANTS[variant].url}
                  download
                  className="inline-flex items-center justify-center rounded-lg bg-accent/15 px-3 py-2 text-sm font-semibold text-accent hover:bg-accent/25 transition-colors"
                >
                  Download
                </a>
              </li>
            );
          }

          return (
            <li
              key={variant}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border px-4 py-3.5 ${
                isRecommended
                  ? "border-accent/40 bg-accent/10"
                  : "border-stroke bg-card/60"
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-white text-sm sm:text-base break-words">
                    {VERSION_NAME[variant]}
                  </p>
                  {isRecommended && (
                    <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-background">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-light">{PHONE_COPY[variant]}</p>
              </div>
              <a
                href={APK_VARIANTS[variant].url}
                download
                className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent/15 px-4 py-2.5 sm:py-1.5 text-sm font-semibold text-accent hover:bg-accent/25 transition-colors sm:w-auto w-full"
              >
                Download
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
