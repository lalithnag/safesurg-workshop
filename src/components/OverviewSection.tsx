import { siteConfig } from "@/config/content";
import FadeInSection from "@/components/FadeInSection";
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

const SUBMIT_ACTIVE_DATE = new Date("2026-04-01T00:00:00");

const OverviewSection = () => {
  const { overview } = siteConfig;
  const [openTopic, setOpenTopic] = useState<number | null>(0);
  const isSubmitActive = new Date() >= SUBMIT_ACTIVE_DATE;

  return (
    <section id="overview" className="section-padding">
      <div className="mx-auto max-w-7xl">
        {/* Description paragraphs — full width, no title */}
        <div className="space-y-5">
          {overview.intro.map((p, i) => (
            <FadeInSection key={i} delay={i * 0.06}>
              <p className="text-base leading-relaxed text-muted-foreground">{p}</p>
            </FadeInSection>
          ))}
        </div>

        {/* CFP box */}
        <FadeInSection delay={0.15}>
          <div className="mt-14 rounded-xl border border-accent/20 bg-accent/5 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-primary">Call for Papers</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {overview.cfpIntro}
            </p>
            <div className="mt-5">
              {isSubmitActive ? (
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-md gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-transform hover:scale-[1.02]"
                >
                  <ExternalLink size={16} />
                  Submit Paper
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-md bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed opacity-60"
                  title="Submissions open April 1, 2026"
                >
                  <ExternalLink size={16} />
                  Submissions open April 1
                </button>
              )}
            </div>
          </div>
        </FadeInSection>

        {/* Topics accordion */}
        <div className="mt-12">
          <FadeInSection>
            <h3 className="text-lg font-semibold text-primary">Topics of Interest</h3>
          </FadeInSection>

          <div className="mt-6 space-y-3">
            {overview.topics.map((topic, i) => {
              const isOpen = openTopic === i;
              return (
                <FadeInSection key={i} delay={i * 0.05}>
                  <div className="rounded-lg border border-border bg-card overflow-hidden">
                    <button
                      onClick={() => setOpenTopic(isOpen ? null : i)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-secondary/50"
                    >
                      <span>
                        <span className="mr-2 text-accent font-semibold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {topic.title}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <ul className="border-t border-border px-5 py-4 space-y-2">
                        {topic.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
