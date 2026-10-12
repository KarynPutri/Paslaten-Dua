import { BungaHias, SiluetGunung } from "./Ornamen";

export default function PageHeader({
  judul,
  deskripsi,
}: {
  judul: string;
  deskripsi?: string;
}) {
  return (
    <section className="latar-budaya header-halaman">
      <BungaHias
        ukuran={140}
        className="bunga-hias d-none d-md-block"
        style={{ right: "6%", top: "18%", opacity: 0.35 }}
      />
      <div className="container position-relative">
        <div
          className="d-inline-flex align-items-center gap-2 mb-2 px-3 py-1 rounded-pill"
          style={{
            background: "rgba(255, 255, 255, 0.12)",
            border: "1px solid rgba(200, 150, 46, 0.4)",
            backdropFilter: "blur(4px)",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--emas-muda)" }} />
          <span
            className="text-uppercase fw-semibold"
            style={{ color: "var(--emas-muda)", fontSize: "0.74rem", letterSpacing: "0.08em" }}
          >
            Kelurahan Paslaten Dua
          </span>
        </div>
        <h1 className="fw-bold mb-2">{judul}</h1>
        {deskripsi && <p className="mb-0 text-white-50">{deskripsi}</p>}
      </div>
      <SiluetGunung />
    </section>
  );
}
