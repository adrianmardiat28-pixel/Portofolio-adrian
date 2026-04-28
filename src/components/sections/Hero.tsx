import { ArrowDown, Sparkles, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6 pt-24"
    >
      {/* Container Utama: Grid 1 Kolom di HP, 2 Kolom di Laptop (md) */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        
        {/* ================= KOLOM KIRI: TULISAN ================= */}
        <div className="order-2 md:order-1 text-left">
          {/* Badge Status */}
          <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-1.5 backdrop-blur">
            <Sparkles size={14} className="text-primary" />
            <span className="font-mono text-xs text-muted-foreground">
              Available for collaboration
            </span>
          </div>

          {/* Headline Utama */}
          <h1 className="reveal text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Hi, I'm{" "}
            <span className="text-gradient">Adrian Alrizqullah Mardiat</span>
            <span className="mt-4 block text-2xl font-light text-muted-foreground sm:text-3xl">
              <span className="font-mono text-foreground">Data Scientist & Web Dev</span>.
            </span>
          </h1>

          {/* Ikon Sosial Media - SUDAH UPDATE LINK */}
          <div className="reveal mt-6 flex gap-5 text-muted-foreground">
            {/* LinkedIn: Sesuai Nama di Screenshot */}
            <a href="https://linkedin.com/in/adrian-mardiat" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
              <Linkedin size={22} />
            </a>
            {/* Instagram: Sesuai Username @adriann_mardiat */}
            <a href="https://instagram.com/adriann_mardiat" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
              <Instagram size={22} />
            </a>
            {/* WhatsApp: Sesuai nomor yang kamu berikan */}
            <a href="https://wa.me/6281210187156" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
              <MessageCircle size={22} />
            </a>
          </div>

          {/* Deskripsi Singkat */}
          <p
            className="reveal mt-8 max-w-lg text-base text-muted-foreground sm:text-lg"
            style={{ transitionDelay: "120ms" }}
          >
            An Information Systems student with a passion for data and web development. I focus on creating functional, data-driven digital solutions.
          </p>

          {/* Tombol Aksi (CTA) */}
          <div
            className="reveal mt-10 flex flex-wrap items-center gap-4"
            style={{ transitionDelay: "240ms" }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 active:scale-95"
            >
              Lihat Proyek
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-medium transition-all hover:border-primary hover:text-primary active:scale-95"
            >
              Kontak Saya
            </a>
          </div>
        </div>

        {/* ================= KOLOM KANAN: FOTO ================= */}
        <div 
          className="reveal order-1 md:order-2 flex justify-center md:justify-end" 
          style={{ transitionDelay: "300ms" }}
        >
          {/* Container Foto */}
          <div className="relative h-[420px] w-[320px] overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl sm:h-[520px] sm:w-[420px]">
            <img 
              src="/Public/Profile.jpeg" 
              alt="Adrian Alrizqullah Mardiat"
              className="h-full w-full object-cover" 
            />
            
            {/* Overlay Identitas (Floating Card) */}
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-black/40 p-4 backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <div>
                        {/* Username sesuai screenshot IG */}
                        <p className="text-sm font-bold text-white tracking-wide">@adriann_mardiat</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

      </div>

      {/* Indikator Scroll */}
      <div
        className="reveal absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ transitionDelay: "500ms" }}
      >
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="text-primary">$</span> scroll_to_explore
        </div>
        <div className="h-10 w-[1px] bg-gradient-to-b from-primary to-transparent"></div>
      </div>
    </section>
  );
}