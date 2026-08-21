"use client";

const sports = [
  "Football", "Basketball", "Tennis", "Cricket",
  "Motor Sports", "American Football", "Hockey", "Baseball",
  "Fighting", "Rugby", "Golf", "Billiards",
  "Darts", "AFL"
];

export default function SportsGrid() {
  return (
    <section id="sports" className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 -mt-screen">
        <div className="max-w-7xl mx-auto px-6 pt-[100vh] pb-24 lg:pb-32">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex justify-center md:justify-start">
              <div
                className="relative w-full max-w-md h-[500px] overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                }}
              >
                <div className="animate-scroll-vertical space-y-4">
                  {[...sports, ...sports, ...sports].map((sport, i) => (
                    <div
                      key={`${sport}-${i}`}
                      className="text-center text-3xl sm:text-4xl lg:text-5xl font-black italic text-white/90 hover:text-accent transition-colors py-3 tracking-tight"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {sport}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="text-accent">15+ Sports</span>, One App
              </h2>
              <p className="text-muted-light text-lg max-w-lg leading-relaxed">
                From the pitch to the ring — every league, every tournament, every
                moment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
