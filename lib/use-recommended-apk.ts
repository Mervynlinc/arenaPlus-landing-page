"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { APK_VARIANTS, type ApkVariant } from "@/lib/apk-links";

type HighEntropyValues = {
  architecture?: string;
  bitness?: string;
};

function detectAndroid(): boolean {
  return typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);
}

function subscribeNoop() {
  return () => {};
}

function detectArchitecture(uaData: {
  getHighEntropyValues?: (keys: string[]) => Promise<Record<string, string>>;
}): Promise<ApkVariant | null> {
  if (typeof uaData?.getHighEntropyValues !== "function") {
    return Promise.resolve(null);
  }

  return uaData
    .getHighEntropyValues(["architecture", "bitness"])
    .then((values) => values as HighEntropyValues)
    .then(({ architecture, bitness }) => {
      if (!architecture) return null;

      const arch = architecture.toLowerCase();
      const bit = bitness ?? "";

      if (arch.includes("arm")) {
        // Modern ARM phones that don't report properly default to arm64.
        return "arm64";
      }
      if (arch.includes("x86") || arch.includes("ia32")) {
        return bit === "64" ? "x86_64" : "x86";
      }
      return null;
    })
    .catch(() => null);
}

export function useRecommendedApk(): {
  recommended: ApkVariant;
  isAndroid: boolean;
} {
  // navigator.userAgent is static per session, so no subscription is needed.
  const isAndroid = useSyncExternalStore(
    subscribeNoop,
    () => detectAndroid(),
    () => false
  );

  const [recommended, setRecommended] = useState<ApkVariant>("arm64");

  useEffect(() => {
    if (!isAndroid) return;

    const uc = navigator as Navigator & {
      userAgentData?: { getHighEntropyValues: (keys: string[]) => Promise<Record<string, string>> };
    };

    detectArchitecture(uc.userAgentData ?? {}).then((detected) => {
      if (detected) {
        setRecommended(detected);
      }
    });
  }, [isAndroid]);

  return { recommended, isAndroid };
}

export type { ApkVariant };
export { APK_VARIANTS };
