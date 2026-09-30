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
        <div className="label-kecil mb-2">Kelurahan Paslaten Dua</div>
        <h1 className="fw-bold mb-2">{judul}</h1>
        {deskripsi && <p className="mb-0">{deskripsi}</p>}
      </div>
      <SiluetGunung />
    </section>
  );
}
