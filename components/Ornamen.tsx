// Ornamen visual bertema budaya Tomohon Timur.
// Semua gambar dibuat dengan SVG sederhana (tanpa file gambar tambahan).

/** Siluet pegunungan (Mahawu & Lokon) untuk bagian bawah hero / header. */
export function SiluetGunung({ warna = "var(--krem)" }: { warna?: string }) {
  return (
    <svg
      className="siluet-gunung"
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 160V118l120-22 110 18 150-58 70 20 60-34 50 14 150 70 140-44 170 36 120-52 60 18 90-40 150 58v76z"
        fill="rgba(0,0,0,0.22)"
      />
      <path
        d="M0 160v-26l160-18 140 10 170-48 90 30 150-58 40 8 190 62 150-20 160 24 190-12v48z"
        fill={warna}
      />
    </svg>
  );
}

/** Bunga lima kelopak — penanda Tomohon sebagai "Kota Bunga". */
export function BungaHias({
  ukuran = 90,
  warna = "var(--emas)",
  className = "",
  style,
}: {
  ukuran?: number;
  warna?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const kelopak = [0, 72, 144, 216, 288];
  return (
    <svg
      width={ukuran}
      height={ukuran}
      viewBox="-50 -50 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {kelopak.map((r) => (
        <ellipse
          key={r}
          cx="0"
          cy="-22"
          rx="13"
          ry="22"
          transform={`rotate(${r})`}
          fill="none"
          stroke={warna}
          strokeWidth="2"
        />
      ))}
      <circle r="8" fill={warna} />
    </svg>
  );
}

/** Logo motif: belah ketupat bertingkat dengan bunga di tengah. */
export function LogoMotif({ ukuran = 40 }: { ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 1l19 19-19 19L1 20z" fill="#9b1c1c" />
      <path d="M20 6l14 14-14 14L6 20z" fill="none" stroke="#c8962e" strokeWidth="1.5" />
      <path d="M20 11l9 9-9 9-9-9z" fill="#1f1512" />
      {[0, 90, 180, 270].map((r) => (
        <ellipse key={r} cx="20" cy="16.5" rx="2" ry="3.5" fill="#ecd29a" transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="1.8" fill="#c8962e" />
    </svg>
  );
}
