const skillGroups = [
  {
    title: "Web Development",
    accent: "from-cyan-glow/20 to-cyan-glow/5",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Next.js", "PHP"],
  },
  {
    title: "Data Science",
    accent: "from-violet-glow/20 to-violet-glow/5",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "SQL", "Django", "Streamlit"], // Typo Djanggo diperbaiki
  },
  // Jika nanti tambah grup ke-3, ke-4, dst, dia akan otomatis tergeser dan tetap rapi
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            01 — About
          </p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            A curious mind in <span className="text-gradient">tech</span>.
          </h2>
        </div>

        <div className="reveal mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
         "I am an Information Systems student specializing in Data Science with a strong interest in extracting value from complex data. I focus on building predictive models and conducting statistical analysis to generate actionable insights."
        </div>

        {/* CONTAINER DIUBAH DARI GRID MENJADI FLEX */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
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
    </section>
  );
}