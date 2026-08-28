export const APK_VARIANTS = {
  arm64: {
    url: process.env.NEXT_PUBLIC_APK_ARM64_URL ?? "",
    label: "Recommended (most phones)",
  },
  armeabi_v7a: {
    url: process.env.NEXT_PUBLIC_APK_ARMEABI_V7A_URL ?? "",
    label: "Older / budget devices",
  },
  x86: {
    url: process.env.NEXT_PUBLIC_APK_X86_URL ?? "",
    label: "Intel x86 devices",
  },
  x86_64: {
    url: process.env.NEXT_PUBLIC_APK_X86_64_URL ?? "",
    label: "Intel x86_64 devices",
  },
} as const;

export type ApkVariant = keyof typeof APK_VARIANTS;
