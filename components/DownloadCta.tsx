"use client";
import ApkDownloadMenu from "@/components/ApkDownloadMenu";
import { useRecommendedApk } from "@/lib/use-recommended-apk";

export default function DownloadCta() {
  const { recommended } = useRecommendedApk();

  return (
    <section id="download" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Start Watching in{" "}
            <span className="text-accent">Seconds</span>
          </h2>
          <p className="text-muted-light text-lg max-w-xl mx-auto">
            Download the application for free and start watching live sports.
          </p>
        </div>

        <ApkDownloadMenu recommended={recommended} className="mx-auto" />

      </div>
    </section>
  );
}
