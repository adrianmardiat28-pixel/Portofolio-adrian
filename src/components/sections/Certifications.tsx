import { useState, useEffect, useCallback } from "react";
import { Award, ExternalLink, Calendar, Building2, X, ImageOff } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
  description: string;
  type: "certification" | "training";
  accent: string;
}

const certifications: Certification[] = [
  {
    title: "Junior Web Developer BNSP Certificate",
    issuer: "Komdigi bpptik",
    date: "December 10, 2025",
    credentialUrl: "https://drive.google.com/file/d/1TtA0EWWKCQ-P0Sat2PuyjiaZqMIHttXk/view?usp=drive_link",
    imageUrl: "/certificates/bnsp.png",
    description: "Validated competency as a Junior Web Developer in the area of Programming and Software Development.",
    type: "certification",
    accent: "from-cyan-glow/25 to-transparent",
  },
  {
    title: "Data Science & Machine Learning (DSF 47)",
    issuer: "dibimbing.id",
    date: "January 19-21, 2026",
    credentialUrl: "https://drive.google.com/file/d/1mnGs_S6dclOKspncykCNa4biFIV5k3O1/view?usp=sharing", // INGAT: Ganti dengan link Google Drive file sertifikat ini
    imageUrl: "/certificates/DS-Dibimbing.png",
    description: "Actively participated in the Faculty of Data training program, focusing on fundamental Data Science and Machine Learning (DSML) concepts.",
    type: "training",
    accent: "from-violet-glow/25 to-transparent",
  },
  {
    title: "IT Cyber Security Awareness (DSF 47)",
    issuer: "dibimbing.id",
    date: "January 12-14, 2026",
    credentialUrl: "https://drive.google.com/file/d/1duVnlW-dLpw1QKrVl69NHqjfi9Uft_Ff/view?usp=sharing", // INGAT: Ganti dengan link Google Drive
    imageUrl: "/certificates/cyber-Dibimbing.png",
    description: "Introductory training covering foundational cyber security concepts, digital threats, and basic IT security awareness.",
    type: "training",
    accent: "from-cyan-glow/25 to-transparent", // Saya pakai cyan agar selang-seling warnanya
  },
  {
    title: "Junior Web Developer Training (VSGA)",
    issuer: "Komdigi & BPPTIK",
    date: "November 5-19, 2025",
    imageUrl: "/certificates/pelatihan-bnsp.png",
    credentialUrl: "https://drive.google.com/file/d/1RcZ19a_B6IHahSrnA48KODoOEI5d9Wvt/view?usp=sharing", // INGAT: Ganti dengan link Google Drive
    description: "Completed 24 hours of intensive training covering structured programming, UI implementation, and web development best practices.",
    type: "training",
    accent: "from-cyan-glow/25 to-transparent",
  },
];

// Mapping badge warna berdasarkan type
const typeBadge = {
  certification: {
    label: "Certificate",
    className:
      "border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow",
  },
  training: {
    label: "Training",
    className:
      "border-violet-glow/30 bg-violet-glow/10 text-violet-glow",
  },
};

/* ─── Modal Component ─── */
function CertModal({
  cert,
  onClose,
}: {
  cert: Certification;
  onClose: () => void;
}) {
  const badge = typeBadge[cert.type];

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl animate-[fade-up_0.35s_ease-out_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground backdrop-blur transition-all hover:border-primary hover:text-primary"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Certificate Image */}
        {cert.imageUrl ? (
          <div className="relative w-full bg-black/30">
            <img
              src={cert.imageUrl}
              alt={cert.title}
              className="w-full object-contain max-h-[60vh]"
            />
          </div>
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-card/60">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageOff size={40} strokeWidth={1.2} />
              <span className="text-sm">No image available</span>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold sm:text-2xl">{cert.title}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building2 size={13} />
                  {cert.issuer}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  {cert.date}
                </span>
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${badge.className}`}
            >
              {badge.label}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {cert.description}
          </p>

          {/* Action Buttons */}
          {cert.credentialUrl && cert.credentialUrl !== "#" && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-glow"
            >
              View Full Credential
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export function Certifications() {
  const [selected, setSelected] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="reveal mb-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            03 — Training &amp; Certifications
          </p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Continuous <span className="text-gradient">learning</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            A curated list of professional certifications and training programs
            that have shaped my expertise in data science and web development.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {certifications.map((cert, i) => {
            const badge = typeBadge[cert.type];
            return (
              <div
                key={cert.title}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(cert)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(cert);
                  }
                }}
                className="reveal group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-card/40 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow sm:w-[calc(50%-12px)]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Gradient Hover Effect */}
                <div
                  className={`absolute inset-0 -z-10 bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${cert.accent}`}
                />

                {/* Thumbnail Preview (small) */}
                {cert.imageUrl && (
                  <div className="mb-4 overflow-hidden rounded-xl border border-border/50">
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="h-36 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Top Row: Icon + Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <Award size={22} />
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-5 text-lg font-semibold leading-snug">
                  {cert.title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Building2 size={13} />
                    {cert.issuer}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {cert.date}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {cert.description}
                </p>

                {/* Click hint */}
                <span className="mt-auto pt-5 font-mono text-xs text-primary/70 transition-colors group-hover:text-primary">
                  Click to view certificate →
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <CertModal cert={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
