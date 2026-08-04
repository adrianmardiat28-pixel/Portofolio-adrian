import { ArrowUpRight, HeartHandshake, ShieldCheck, BarChart3, MessageSquareWarning, Globe, Recycle } from "lucide-react";

const projects = [
  {
    title: "Eco Route AI",
    tag: "AI Waste Management",
    description:
      "An AI-powered waste management platform for DLH (Dinas Lingkungan Hidup). Features ML-based daily & event waste prediction, fleet setup & route optimization, and an AI chatbot for smart waste operations.",
    icon: Recycle,
    stack: ["Python", "Streamlit", "Machine Learning", "AI Chatbot"],
    link: "https://eco-route-ai.streamlit.app/",
    accent: "from-green-500/30 to-transparent",
  },
  {
    title: "Kakak Saku",
    tag: "Donation Platform",
    description:
      "A digital donation platform for the Jakarta Mengabdi community. Integrating a transparent payment system to support children's education.",
    icon: HeartHandshake,
    stack: ["React", "Supabase", "Faspay"],
    link: "https://kakasaku.jakartamengabdi.com/",
    accent: "from-cyan-glow/30 to-transparent",
  },
  {
    title: "Cyber Bullying",
    tag: "Educational Platform",
    description:
      "An educational platform to raise awareness about cyberbullying and provide resources for prevention.",
    icon: MessageSquareWarning,
    stack: ["React", "Nano Banana", "Tailwind CSS"],
    link: "https://safenet-multimedia.netlify.app", // Tambahkan link jika ada (misal GitHub)
    accent: "from-emerald-glow/30 to-transparent",
  },
  {
    title: "Accounting System",
    tag: "Financial Software",
    description:
      "Financial transaction tracking for Organitation, with easy-to-understand financial reports.",
    icon: BarChart3,
    stack: ["React", "Supabase", "Tailwind CSS"],
    link: "https://jakarta-mengabdi-accounting.vercel.app/", // Tambahkan link jika ada (misal GitHub)
    accent: "from-violet-glow/30 to-transparent",
  },

  {
    title: "Pengabdian Jakarta Mengabdi",
    tag: "COMMUNITY PROFILE",
    description:
      "A digital archive and community platform designed to document social initiatives, annual timelines, and community impact across Jakarta.",
    icon: Globe, // Bisa diganti Globe atau Users agar lebih merepresentasikan web profil/komunitas dibanding BarChart3
    stack: ["React", "Supabase", "Tailwind CSS"],
    link: "https://pengabdian.jakartamengabdi.com/",
    accent: "from-orange-500/20 to-transparent", // Menggunakan aksen oranye agar senada dengan warna tema web Jakarta Mengabdi di screenshot pertama
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28">
      {/* Cosmic divider top */}
      <div className="cosmic-divider mx-auto mb-8 max-w-4xl" />

      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            02 — Projects
          </p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Selected <span className="text-gradient">work</span>.
          </h2>
        </div>

        {/* CONTAINER FLEXIBLE: Rata Tengah */}
        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <a
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group relative flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-card/40 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-glow sm:w-95"
                style={{ transitionDelay: `${i * 120}ms`, animation: "cosmic-border-glow 8s ease-in-out infinite", animationDelay: `${i * 2}s` }}
              >
                {/* Efek Gradient saat Hover */}
                <div
                  className={`absolute inset-0 -z-10 bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${p.accent}`}
                />

                {/* Cosmic corner glow */}
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-cyan-glow/5 blur-[60px] transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-violet-glow/5 blur-[60px] transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-500 group-hover:scale-110">
                    <Icon size={26} />
                    {/* Orbital ring on icon */}
                    <div className="absolute inset-[-6px] rounded-full border border-primary/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ animation: "orbit-ring-spin 4s linear infinite" }} />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                  />
                </div>

                <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {p.tag}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>

                <div className="mt-auto pt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-background/20 px-3 py-1 font-mono text-[10px] text-foreground/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}