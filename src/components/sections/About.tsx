import { Lanyard } from "../Lanyard"; // Pastikan import ini ada di baris paling atas

const skillGroups = [
  {
    title: "Web Development",
    accent: "from-cyan-glow/20 to-cyan-glow/5",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Next.js", "PHP"],
  },
  {
    title: "Data Science",
    accent: "from-violet-glow/20 to-violet-glow/5",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "SQL", "Django", "Streamlit"],
  },
  // Jika nanti tambah grup ke-3, ke-4, dst, dia akan otomatis tergeser dan tetap rapi
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 overflow-visible">
      {/* Container diperlebar ke max-w-6xl agar muat Lanyard + Teks */}
      <div className="mx-auto max-w-6xl">
        
        {/* GRID LAYOUT: 1 kolom di HP, terbagi 2 kolom di layar besar (lg) */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_2fr]">
          
          {/* --- KOLOM KIRI: LANYARD --- */}
          <div className="flex h-full w-full items-center justify-center lg:-mt-10 z-20">
            <Lanyard />
          </div>

          {/* --- KOLOM KANAN: KONTEN ABOUT LAMA KAMU --- */}
          <div className="w-full">
            {/* Teks rata tengah di HP, tapi rata kiri di layar besar (lg:text-left) agar pas di sebelah Lanyard */}
            <div className="reveal mb-14 text-center lg:text-left">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                01 — About
              </p>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                A curious mind in <span className="text-gradient">tech</span>.
              </h2>
            </div>

            <div className="reveal mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted-foreground lg:mx-0 lg:text-left">
              "I am an Information Systems student specializing in Data Science with a strong interest in extracting value from complex data. I focus on building predictive models and conducting statistical analysis to generate actionable insights."
            </div>

            {/* CONTAINER SKILL: justify-center di HP, justify-start di layar besar */}
            <div className="mt-16 flex flex-wrap justify-center gap-6 lg:justify-start">
              {skillGroups.map((group, i) => (
                <div
                  key={group.title}
                  className="reveal group relative w-full overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-all hover:border-primary/40 hover:shadow-glow sm:w-[320px]"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 -z-10 bg-linear-to-br opacity-0 transition-opacity group-hover:opacity-100 ${group.accent}`}
                  />
                  <h3 className="font-mono text-sm font-semibold text-primary">
                    {group.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-foreground/90"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}