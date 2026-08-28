"use client";

import { APK_VARIANTS, type ApkVariant } from "@/lib/apk-links";

// Version names are the actual APK file names. Phone labels stay device-facing
// (no "architecture" / "CPU" jargon).
const VERSION_NAME: Record<ApkVariant, string> = {
  arm64: "app-arm64-v8a-release.apk",
  armeabi_v7a: "app-armeabi-v7a-release.apk",
  x86: "app-x86-release.apk",
  x86_64: "app-x86_64-release.apk",
};

const PHONE_COPY: Record<ApkVariant, string> = {
  arm64: "Most Android phones made in 2018 or later",
  armeabi_v7a: "Older or budget Android phones",
  x86: "Less common Intel-based phones",
  x86_64: "Less common newer Intel-based phones",
};

interface ApkDownloadMenuProps {
  recommended: ApkVariant;
  className?: string;
  variant?: "grid" | "list";
}

export default function ApkDownloadMenu({
  recommended,
  className = "",
  variant = "list",
}: ApkDownloadMenuProps) {
  return (
    <div className={`text-left space-y-3 ${className}`}>
      <p className="text-sm text-muted-light max-w-xl mx-auto md:mx-0">
        Choose the version that fits your phone. Not sure?{" "}
        <span className="text-white">Most phones take the recommended one.</span>
      </p>
      <ul
        className={
          variant === "grid"
            ? "grid grid-cols-2 gap-2 min-w-[22rem]"
            : "space-y-2"
        }
      >
        {(Object.keys(APK_VARIANTS) as ApkVariant[]).map((variant) => {
          const isRecommended = variant === recommended;
          return (
            <li
              key={variant}
              className={`flex items-start justify-between gap-4 rounded-xl border px-4 py-3 ${
                isRecommended
                  ? "border-accent/40 bg-accent/10"
                  : "border-stroke bg-card/60"
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white truncate">
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
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-accent/15 px-3 py-1.5 text-sm font-semibold text-accent hover:bg-accent/25 transition-colors"
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
