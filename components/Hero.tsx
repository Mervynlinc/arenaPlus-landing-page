"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Threads from "@/components/Threads";
import ApkDownloadMenu from "@/components/ApkDownloadMenu";
import { useRecommendedApk } from "@/lib/use-recommended-apk";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";


const words = ["Match", "Race", "Touchdown"];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  if (reducedMotion) {
    return <span className="inline-block text-accent">{words[0]}</span>;
  }

  return (
    <span className="relative inline-block min-w-[3ch]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="inline-block text-accent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const { recommended } = useRecommendedApk();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative min-h-svh lg:min-h-screen flex items-start lg:items-center overflow-hidden">
      <div className="absolute inset-0 " />
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-live/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-32" />

      <div className="absolute inset-0 z-0 opacity-30">
        {reducedMotion ? null : <Threads color={[0.81, 1, 0.24]} amplitude={1.5} distance={0.6} />}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pl-8 sm:pl-12 lg:pl-16 pr-5 sm:pr-6 w-full pt-[max(env(safe-area-inset-top),1.25rem)] lg:pt-0">
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-8 items-center py-8 sm:py-10">
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-5 animate-fade-in-up">

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              <span className="sm:whitespace-nowrap">
                Every{" "}
                <span className="inline-flex">
                  <RotatingWord />
                </span>
                .
              </span>
              <br />
              <span className="text-white sm:whitespace-nowrap">One Tap Away.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-light max-w-lg leading-relaxed">
              Discover live and upcoming fixtures across football, basketball,
              tennis and more — then jump straight into the broadcast.
            </p>

            <p className="text-sm sm:text-base flex items-center gap-2 text-white">
              <svg className="w-4 h-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <a href="https://t.me/+_hm_xER6r00zZTc0" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Join our Telegram community
              </a>
              <span className="text-muted-light">for any help, inquiries and updates.</span>
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up-delay-1 w-full">
              <ApkDownloadMenu recommended={recommended} variant="grid" compact />
            </div>


          </div>

          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end animate-fade-in-up-delay-3">
            <div className="flex-shrink-0" style={{ perspective: "1200px" }}>
              <div
                className="transition-transform duration-500 ease-out drop-shadow-2xl"
                style={{ transformStyle: "preserve-3d", transform: "rotateY(-18deg) rotateX(5deg)" }}
              >
                <Image
                  src="/assets/portrait.png"
                  alt="Arena Plus app interface"
                  width={260}
                  height={520}
                  className="w-[180px] sm:w-[260px] lg:w-[310px] h-auto rounded-[26px]"
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
