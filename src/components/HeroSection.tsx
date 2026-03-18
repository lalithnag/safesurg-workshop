import { siteConfig } from "@/config/content";
import FadeInSection from "@/components/FadeInSection";
import { ArrowRight, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const targetDate = new Date("2026-10-04T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 section-padding">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

      <div className="relative mx-auto max-w-7xl text-center">
        <FadeInSection>
          <div className="flex flex-col items-center gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              {siteConfig.conference}
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              {siteConfig.title}
            </h1>

            <p className="text-xl font-medium text-muted-foreground md:text-2xl">
              {siteConfig.subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href="#overview"
                className="inline-flex items-center gap-2 rounded-md gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-transform hover:scale-[1.02]"
              >
                <FileText size={16} />
                Call for Papers
              </a>
              <a
                href="#program"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
              >
                View Program
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Countdown */}
            <div className="mt-6 flex gap-6">
              {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
                <div key={unit} className="flex flex-col items-center">
                  <span className="text-3xl font-bold tabular-nums text-primary sm:text-4xl">
                    {String(timeLeft[unit]).padStart(2, "0")}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default HeroSection;
