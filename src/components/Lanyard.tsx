import { useEffect, useRef, useCallback } from "react";

// ─── Konstanta Fisika ────────────────────────────────────────────────────────
const NUM_POINTS = 13;
const SEG_LEN = 18;
const GRAVITY = 0.55;
const DAMPING = 0.985;
const CONSTRAINT_ITERATIONS = 30;

interface Point {
  x: number;
  y: number;
  px: number;
  py: number;
  pinned: boolean;
}

export function Lanyard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const draggingRef = useRef(false);
  const dragIndexRef = useRef(-1);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const profileImgRef = useRef<HTMLImageElement | null>(null);
  
  // Ref untuk mengatur efek perbesar (zoom)
  const scaleRef = useRef(1);

  // ─── Inisialisasi titik-titik tali ──────────────────────────────────────
  const initPoints = useCallback((anchorX: number, anchorY: number) => {
    const pts: Point[] = [];
    for (let i = 0; i <= NUM_POINTS; i++) {
      pts.push({
        x: anchorX,
        y: anchorY + i * SEG_LEN,
        px: anchorX,
        py: anchorY + i * SEG_LEN - (i === NUM_POINTS ? 6 : 3) - i * 0.8,
        pinned: i === 0,
      });
    }
    pointsRef.current = pts;
  }, []);

  // ─── Simulasi Verlet + Constraint ────────────────────────────────────────
  const simulate = useCallback((anchorX: number, anchorY: number) => {
    const pts = pointsRef.current;

    for (let i = 1; i < pts.length; i++) {
      const p = pts[i];
      if (p.pinned) continue;
      const vx = (p.x - p.px) * DAMPING;
      const vy = (p.y - p.py) * DAMPING;
      p.px = p.x;
      p.py = p.y;
      p.x += vx;
      p.y += vy + GRAVITY;
    }

    for (let iter = 0; iter < CONSTRAINT_ITERATIONS; iter++) {
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const diff = (dist - SEG_LEN) / dist * 0.5;
        if (!a.pinned) { a.x += dx * diff; a.y += dy * diff; }
        if (!b.pinned) { b.x -= dx * diff; b.y -= dy * diff; }
      }
      pts[0].x = anchorX;
      pts[0].y = anchorY;
      
      if (draggingRef.current && dragIndexRef.current > 0) {
        pts[dragIndexRef.current].x = mouseRef.current.x;
        pts[dragIndexRef.current].y = mouseRef.current.y;
      }
    }
  }, []);

  const getBadgeAngle = (anchorX: number): number => {
    const pts = pointsRef.current;
    if (pts.length < 1) return 0;
    const tip = pts[NUM_POINTS];
    const offsetX = tip.x - anchorX;
    return (offsetX / 200) * (Math.PI / 15);
  };

  // ─── Gambar tali (strap) ─────────────────────────────────────────────────
  const drawStrap = (ctx: CanvasRenderingContext2D, isDark: boolean) => {
    const pts = pointsRef.current;
    if (pts.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i].x + pts[i + 1].x) / 2;
      const my = (pts[i].y + pts[i + 1].y) / 2;
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
    }
    ctx.lineTo(pts[pts.length - 2].x, pts[pts.length - 2].y);

    ctx.lineWidth = 8;
    ctx.strokeStyle = isDark ? "#1e2d3d" : "#94afc7";
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.lineWidth = 5;
    ctx.strokeStyle = isDark ? "#3d6d9a" : "#5a96c8";
    ctx.stroke();

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = isDark ? "rgba(130,190,230,0.2)" : "rgba(255,255,255,0.65)";
    ctx.stroke();
  };

  const drawAnchor = (ctx: CanvasRenderingContext2D, x: number, y: number, isDark: boolean) => {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? "#1e2d3d" : "#c8d8e8";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = isDark ? "#4a7a9a" : "#6a9ab8";
    ctx.stroke();
  };

  // ─── Gambar ID Badge (Full Image) ─────────────────────────────────────────
  const drawBadge = (ctx: CanvasRenderingContext2D, isDark: boolean, anchorX: number) => {
    const pts = pointsRef.current;
    if (pts.length < NUM_POINTS + 1) return;

    const tip = pts[NUM_POINTS];
    const angle = getBadgeAngle(anchorX);
    const bw = 150; // Lebar Card
    const bh = 220; // Tinggi Card

    ctx.save();
    ctx.translate(tip.x, tip.y);
    ctx.rotate(angle);
    
    // Terapkan efek scale/zoom
    ctx.scale(scaleRef.current, scaleRef.current);

    // Bayangan dinamis (makin besar scale, makin besar bayangan)
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 25 * scaleRef.current;
    ctx.shadowOffsetY = 15 * scaleRef.current;

    // Bikin bentuk rounded rectangle
    ctx.beginPath();
    ctx.roundRect(-bw / 2, 0, bw, bh, 16); // Sudut membulat
    ctx.closePath();
    
    // Warnai background jika gambar belum load
    ctx.fillStyle = isDark ? "#111c28" : "#edf2f7";
    ctx.fill();
    
    // Potong semua area di luar rounded rectangle (untuk foto)
    ctx.clip();

    // Gambar foto profil full cover
    const img = profileImgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const cardRatio = bw / bh;
      let drawW, drawH, drawX, drawY;

      // Logika Object-fit: Cover
      if (imgRatio > cardRatio) {
        drawH = bh;
        drawW = bh * imgRatio;
        drawX = -bw / 2 - (drawW - bw) / 2;
        drawY = 0;
      } else {
        drawW = bw;
        drawH = bw / imgRatio;
        drawX = -bw / 2;
        drawY = -(drawH - bh) / 2;
      }
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // ── Gradient Gelap di Atas (Agar Teks Atas Terbaca) ──
    const topGrad = ctx.createLinearGradient(0, 0, 0, 70);
    topGrad.addColorStop(0, "rgba(0,0,0,0.8)");
    topGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = topGrad;
    ctx.fillRect(-bw / 2, 0, bw, 70);

    // ── Gradient Gelap di Bawah (Agar Teks Bawah Terbaca) ──
    const botGrad = ctx.createLinearGradient(0, bh - 80, 0, bh);
    botGrad.addColorStop(0, "rgba(0,0,0,0)");
    botGrad.addColorStop(1, "rgba(0,0,0,0.9)");
    ctx.fillStyle = botGrad;
    ctx.fillRect(-bw / 2, bh - 80, bw, 80);

    // Border Kaca (Glassmorphism)
    ctx.lineWidth = 2;
    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.4)";
    ctx.stroke();

    // ── Teks Atas: Computer Science ──
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 4;
    ctx.font = "800 12px 'Courier New', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.letterSpacing = "1px";
    ctx.fillText("COMPUTER SCIENCE", 0, 16);

    // ── Teks Bawah: Adrian Mardiat ──
    ctx.font = "900 15px 'Courier New', monospace";
    ctx.fillStyle = "#00e5ff"; // Warna cyan-glow
    ctx.fillText("ADRIAN MARDIAT", 0, bh - 32);

    ctx.restore();
  };

  // ─── Loop utama ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const anchorX = W / 2;
    const anchorY = 18;

    initPoints(anchorX, anchorY);

    const img = new Image();
    img.src = "/Profile.jpeg";
    img.onload = () => { profileImgRef.current = img; };
    profileImgRef.current = img;

    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const loop = () => {
      simulate(anchorX, anchorY);
      
      // ── LOGIKA ZOOM / PERBESAR ──
      const pts = pointsRef.current;
      if (pts.length > NUM_POINTS) {
        const tip = pts[NUM_POINTS];
        // Cek jarak mouse ke tengah card
        const distToCard = Math.hypot(tip.x - mouseRef.current.x, tip.y + 110 - mouseRef.current.y);
        
        // Membesar (1.4x) jika disentuh/drag atau di-hover
        const isInteracting = draggingRef.current || distToCard < 120;
        const targetScale = isInteracting ? 1.4 : 1.0; 
        
        // Interpolasi halus (smooth transition)
        scaleRef.current += (targetScale - scaleRef.current) * 0.15;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStrap(ctx, isDark);
      drawAnchor(ctx, anchorX, anchorY, isDark);
      drawBadge(ctx, isDark, anchorX);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [initPoints, simulate]);

  // ─── Helper Pointer ──────────────────────────────────────────────────────
  const findClosestPoint = (px: number, py: number): number => {
    const pts = pointsRef.current;
    if (pts.length < NUM_POINTS + 1) return -1;
    
    // Cek apakah klik mengenai area badge (Card)
    const tip = pts[NUM_POINTS];
    const distToCard = Math.hypot(tip.x - px, tip.y + 110 - py);
    if (distToCard < 130) return NUM_POINTS; // Grab langsung card-nya

    // Jika tidak, cari titik tali terdekat
    let best = -1;
    let bestD = 40; 
    for (let i = 1; i < pts.length; i++) {
      const d = Math.hypot(pts[i].x - px, pts[i].y - py);
      if (d < bestD) { bestD = d; best = i; }
    }
    return best;
  };

  const getCanvasPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const src = "touches" in e ? (e as React.TouchEvent).touches[0] : (e as React.MouseEvent);
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getCanvasPos(e, canvas);
    mouseRef.current = pos;
    const idx = findClosestPoint(pos.x, pos.y);
    if (idx > 0) {
      draggingRef.current = true;
      dragIndexRef.current = idx;
    }
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    mouseRef.current = getCanvasPos(e, canvas);
  };

  const handlePointerUp = () => {
    if (draggingRef.current) {
      const p = pointsRef.current[dragIndexRef.current];
      if (p) {
        const vel = { x: (p.x - p.px) * 3, y: (p.y - p.py) * 3 };
        p.px = p.x - vel.x;
        p.py = p.y - vel.y;
      }
      draggingRef.current = false;
      dragIndexRef.current = -1;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "2rem 0",
        userSelect: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={600} // Tinggi kanvas ditambah agar tidak terpotong saat di-zoom
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={() => { handlePointerUp(); mouseRef.current = { x: -1000, y: -1000 }; }}
        onTouchStart={(e) => { e.preventDefault(); handlePointerDown(e); }}
        onTouchMove={(e) => { e.preventDefault(); handlePointerMove(e); }}
        onTouchEnd={handlePointerUp}
        style={{
          cursor: "grab",
          touchAction: "none",
          display: "block",
        }}
      />
    </div>
  );
}