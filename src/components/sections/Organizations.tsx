import { useState, useEffect, useCallback } from "react";
import {
  Users,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  ImagePlus,
  ExternalLink,
} from "lucide-react";

/* ─── Types ─── */
interface OrgRole {
  role: string;
  period: string;
  description: string;
  location: string;
  highlights: string[];
  photos: string[]; // paths to photos in /public
  accent: string;
}

interface Organization {
  name: string;
  subtitle?: string;
  logo: string;
  website?: string;
  roles: OrgRole[];
}

/* ─── Data ─── */
const organizations: Organization[] = [
  {
    name: "Jakarta Mengabdi",
    subtitle: "Staff Program Taktis 2025",
    logo: "/logo-jm.png",
    website: "https://jakartamengabdi.com",
    roles: [
      {
        role: "Sapa Kampung 2025",
        period: "Feb 2025 – Sept 2025",
        location: "Kepulauan Seribu, DKI Jakarta",
        description:
          "Merancang dan menjalankan program pengabdian masyarakat \"Sapa Kampung\" selama 3 hari 2 malam di Kepulauan Seribu. Program ini berfokus pada pemberdayaan komunitas lokal melalui kegiatan edukasi dan sosial.",
        highlights: [
          "Program Sapa Kampung — 3 hari 2 malam",
          "Pengabdian masyarakat di Kepulauan Seribu",
          "Pemberdayaan komunitas lokal",
        ],
        photos: [], // User will add photos later
        accent: "from-cyan-glow/25 to-transparent",
      },
      {
        role: "Koordinator Acara Festival Masyarakat 2025",
        period: "November 2025",
        location: "Kampung Lebak, Jakarta Selatan",
        description:
          "Mengkoordinasikan penyelenggaraan Festival Masyarakat di Kampung Lebak, Jakarta Selatan. Festival ini menampilkan bazar UMKM dan menyediakan layanan cek kesehatan gratis untuk warga sekitar.",
        highlights: [
          "Festival Masyarakat untuk warga sekitar",
          "Bazar UMKM",
          "Cek kesehatan gratis",
        ],
        photos: [], // User will add photos later
        accent: "from-violet-glow/25 to-transparent",
      },
    ],
  },
  {
    name: "Jakarta Mengabdi",
    subtitle: "Staff Finansial 2026",
    logo: "/logo-jm.png",
    website: "https://jakartamengabdi.com",
    roles: [
      {
        role: "Accounting System",
        period: "Feb 2026 – Sekarang",
        location: "DKI Jakarta",
        description:
          "Membangun sistem akuntansi digital untuk pencatatan keuangan organisasi, memastikan transparansi dan akurasi dalam pengelolaan dana komunitas.",
        highlights: [
          "Sistem pencatatan keuangan digital",
          "Transparansi pengelolaan dana",
          "Laporan keuangan otomatis",
        ],
        photos: [],
        accent: "from-cyan-glow/25 to-transparent",
      },
      {
        role: "Kakak Saku — Platform Donasi",
        period: "Feb 2026 – Sekarang",
        location: "DKI Jakarta",
        description:
          "Mengembangkan platform donasi \"Kakak Saku\" untuk mengelola donasi rutin selama 9 bulan serta donasi tanggap darurat ketika terjadi bencana. Platform ini mendukung pendanaan berkelanjutan bagi program-program komunitas.",
        highlights: [
          "Donasi rutin 9 bulan",
          "Donasi tanggap bencana",
          "Pendanaan berkelanjutan",
        ],
        photos: [],
        accent: "from-violet-glow/25 to-transparent",
      },
      {
        role: "Website Update Pengabdian",
        period: "Feb 2026 – Sekarang",
        location: "DKI Jakarta",
        description:
          "Membuat dan mengelola website update pengabdian untuk mendokumentasikan seluruh kegiatan pengabdian masyarakat secara digital, sehingga mudah diakses oleh publik dan stakeholder.",
        highlights: [
          "Dokumentasi digital kegiatan",
          "Aksesibilitas publik",
          "Arsip pengabdian masyarakat",
        ],
        photos: [],
        accent: "from-cyan-glow/25 to-transparent",
      },
    ],
  },
];

/* ─── Photo Lightbox Modal ─── */
function PhotoLightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + photos.length) % photos.length);
    },
    [onClose, photos.length]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative z-10 flex max-h-[85vh] max-w-4xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur transition-all hover:border-primary hover:text-primary"
          aria-label="Close lightbox"
        >
          <X size={16} />
        </button>

        <img
          src={photos[index]}
          alt={`Photo ${index + 1}`}
          className="max-h-[75vh] rounded-2xl object-contain"
        />

        {photos.length > 1 && (
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() =>
                setIndex((i) => (i - 1 + photos.length) % photos.length)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground backdrop-blur transition-all hover:border-primary hover:text-primary"
              aria-label="Previous photo"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-mono text-xs text-muted-foreground">
              {index + 1} / {photos.length}
            </span>
            <button
              onClick={() => setIndex((i) => (i + 1) % photos.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground backdrop-blur transition-all hover:border-primary hover:text-primary"
              aria-label="Next photo"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Photo Gallery Grid ─── */
function PhotoGallery({ photos }: { photos: string[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-border/60 bg-card/20 px-5 py-4">
        <ImagePlus size={18} className="text-muted-foreground/50" />
        <span className="text-xs text-muted-foreground/60 italic">
          Foto dokumentasi akan segera ditambahkan...
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {photos.slice(0, 6).map((photo, i) => (
          <button
            key={photo}
            onClick={() => setLightbox(i)}
            className="group/photo relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 transition-all hover:border-primary/40"
          >
            <img
              src={photo}
              alt={`Documentation ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/photo:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition-all group-hover/photo:bg-black/20" />
            {/* Show +N overlay on last visible photo if there are more */}
            {i === 5 && photos.length > 6 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-lg font-bold text-white">
                +{photos.length - 6}
              </div>
            )}
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <PhotoLightbox
          photos={photos}
          initialIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

/* ─── Main Section ─── */
export function Organizations() {
  return (
    <section id="organizations" className="relative px-6 py-28">
      {/* Cosmic divider top */}
      <div className="cosmic-divider mx-auto mb-8 max-w-4xl" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="reveal mb-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            04 — Organizations
          </p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Community <span className="text-gradient">impact</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Active involvement in community organizations, driving social impact
            through meaningful programs and initiatives.
          </p>
        </div>

        {/* Organizations */}
        <div className="flex flex-col gap-12">
          {organizations.map((org) => (
            <div key={org.name} className="reveal">
              {/* Org Header */}
              <div className="mb-8 flex items-center gap-5">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card/60 p-2 backdrop-blur">
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="h-full w-full object-contain"
                  />
                  {/* Subtle orbital glow */}
                  <div
                    className="absolute inset-[-4px] rounded-2xl border border-primary/15"
                    style={{
                      animation:
                        "cosmic-border-glow 8s ease-in-out infinite",
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{org.name}</h3>
                  {org.subtitle && (
                    <p className="mt-1 font-mono text-sm font-medium text-foreground">
                      {org.subtitle}
                    </p>
                  )}
                  {org.website && (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 text-xs text-primary/80 transition-colors hover:text-primary"
                    >
                      <ExternalLink size={11} />
                      {org.website.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>
              </div>

              {/* Roles Timeline */}
              <div className="relative ml-3 border-l-2 border-border/40 pl-8 sm:ml-8">
                {org.roles.map((role, i) => (
                  <div
                    key={role.role}
                    className="reveal group relative mb-10 last:mb-0"
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center sm:-left-[45px]">
                      <div className="h-3 w-3 rounded-full bg-gradient-primary shadow-glow transition-transform duration-300 group-hover:scale-125" />
                      <div className="absolute h-5 w-5 rounded-full border border-primary/30 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>

                    {/* Role Card */}
                    <div
                      className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-all duration-300 hover:border-primary/40 hover:shadow-glow sm:p-7"
                      style={{
                        animation:
                          "cosmic-border-glow 8s ease-in-out infinite",
                        animationDelay: `${i * 3}s`,
                      }}
                    >
                      {/* Gradient hover effect */}
                      <div
                        className={`absolute inset-0 -z-10 bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${role.accent}`}
                      />

                      {/* Corner glows */}
                      <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-cyan-glow/5 blur-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-violet-glow/5 blur-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Role title & meta */}
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-semibold sm:text-xl">
                            {role.role}
                          </h4>
                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={13} />
                              {role.period}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin size={13} />
                              {role.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                          <Users size={18} />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {role.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {role.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded-full border border-border bg-background/20 px-3 py-1 font-mono text-[10px] text-foreground/80"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Photo Gallery */}
                      <PhotoGallery photos={role.photos} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
