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
      <div className="mx-auto max-w-3xl text-center">
        <div className="reveal">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            03 — Contact
          </p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Let's <span className="text-gradient">connect</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Open to internships, collaborations, and friendly conversations
            about data, design, or anything in between.
          </p>
        </div>

        <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-4">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card/50 px-5 py-4 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                  <Icon size={18} />
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
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Adrian Alrizqullah Mardiat.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Built with <span className="text-primary">React</span> &amp;{" "}
          <span className="text-primary">Tailwind</span>.
        </p>
      </div>
    </footer>
  );
}
