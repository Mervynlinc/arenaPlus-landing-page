"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Threads from "@/components/Threads";


const words = ["Match", "Race", "Touchdown"];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#0f0f14]" />
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-live/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />

      <div className="absolute inset-0 z-0 opacity-30">
        <Threads color={[0.81, 1, 0.24]} amplitude={1.5} distance={0.6} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-4 items-center py-20">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-live animate-pulse" />
              Live Sports Streaming
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="whitespace-nowrap">
                Every{" "}
                <span className="inline-flex">
                  <RotatingWord />
                </span>
                .
              </span>
              <br />
              <span className="text-white whitespace-nowrap">One Tap Away.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-light max-w-lg leading-relaxed">
              Discover live and upcoming fixtures across football, basketball,
              tennis and more — then jump straight into the broadcast.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up-delay-1">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-accent text-background font-semibold px-6 py-3.5 rounded-xl hover:bg-accent-dark transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/25"
              >
                <Image src="/assets/android.png" alt="Android" width={20} height={20} className="object-contain" />
                Download for Free
              </a>
            </div>


          </div>

          <div className="relative flex justify-center lg:-ml-16 animate-fade-in-up-delay-3">
            <div className="flex-shrink-0" style={{ perspective: "1200px" }}>
              <div
                className="transition-transform duration-500 ease-out drop-shadow-2xl"
                style={{ transformStyle: "preserve-3d", transform: "rotateY(-18deg) rotateX(5deg)" }}
              >
                <Image
                  src="/assets/portrait.png"
                  alt="Arena Plus app interface"
                  width={400}
                  height={800}
                  className="w-[260px] sm:w-[300px] lg:w-[370px] h-auto rounded-[30px]"
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
