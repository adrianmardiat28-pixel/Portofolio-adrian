import { Instagram, Linkedin, MessageCircle } from "lucide-react";

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/adriann_mardiat",
    icon: Instagram,
    handle: "@adriann_mardiat",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/adrian-mardiat",
    icon: Linkedin,
    handle: "Adrian Mardiat",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/6281210187156",
    icon: MessageCircle,
    handle: "Chat me",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28">
      {/* Cosmic divider top */}
      <div className="cosmic-divider mx-auto mb-8 max-w-4xl" />

      <div className="mx-auto max-w-3xl text-center">
        <div className="reveal relative">
          {/* Cosmic energy ring behind heading */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 300,
              height: 300,
              background: "radial-gradient(circle, rgba(100, 200, 255, 0.06) 0%, rgba(160, 100, 255, 0.03) 40%, transparent 70%)",
              animation: "pulse-glow 5s ease-in-out infinite",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-glow/5"
            style={{
              width: 250,
              height: 250,
              animation: "orbit-ring-spin 20s linear infinite",
            }}
          />

          <p className="relative font-mono text-xs uppercase tracking-[0.3em] text-primary">
            05 — Contact
          </p>
          <h2 className="relative mt-3 text-4xl font-bold sm:text-5xl">
            Let's <span className="text-gradient">connect</span>.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-muted-foreground">
            Open to internships, collaborations, and friendly conversations
            about data, design, or anything in between.
          </p>
        </div>

        <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-4">
          {socials.map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card/50 px-5 py-4 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
                style={{ animation: "cosmic-border-glow 6s ease-in-out infinite", animationDelay: `${i * 2}s` }}
              >
                {/* Neon glow effect on hover */}
                <div className="absolute inset-0 -z-10 bg-linear-to-br from-cyan-glow/0 to-violet-glow/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-glow/10 group-hover:to-violet-glow/10 group-hover:opacity-100" />

                <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <Icon size={18} />
                  {/* Mini orbital */}
                  <div className="absolute inset-[-4px] rounded-xl border border-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ animation: "orbit-ring-spin 3s linear infinite" }} />
                </span>
                <span className="text-left">
                  <span className="block text-xs text-muted-foreground">
                    {s.name}
                  </span>
                  <span className="block font-mono text-sm">{s.handle}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-8">
      {/* Subtle cosmic glow at top of footer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/20 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Adrian Alrizqullah Mardiat.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Built with <span className="text-primary">React</span> &amp;{" "}
          <span className="text-primary">Tailwind</span> 🚀
        </p>
      </div>
    </footer>
  );
}
