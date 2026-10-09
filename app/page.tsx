import Link from "next/link";
import Foto from "../components/Foto";
import { SiluetGunung } from "../components/Ornamen";
import Peta3DLoader from "../components/Peta3DLoader";
import InfoPaslaten from "../components/InfoPaslaten";
import { supabase } from "../lib/supabase";
import { tanggalIndo } from "../lib/format";

export const dynamic = "force-dynamic";

const info = [
  { judul: "Pengumuman", isi: "Informasi terbaru untuk warga.", href: "/pengumuman" },
  { judul: "Pelayanan", isi: "Persyaratan dan prosedur layanan.", href: "/pelayanan" },
  { judul: "Agenda", isi: "Jadwal kegiatan kelurahan.", href: "/agenda" },
];

export default async function Home() {
  const [{ data: berita }, { data: umkm }, { data: profil }] = await Promise.all([
    supabase.from("news").select("*").order("published_at", { ascending: false }).limit(3),
    supabase.from("umkm").select("*").order("created_at", { ascending: false }).limit(3),
    supabase.from("profiles").select("*").eq("id", 1).maybeSingle(),
  ]);

  return (
    <>
      {/* Hero: peta 3D */}
      <section
        className="latar-budaya hero-budaya d-flex align-items-center"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "min(80vh, 700px)",
          backgroundColor: "#1f1512",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Peta3DLoader />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(90deg, rgba(31,21,18,.82) 0%, rgba(31,21,18,.5) 55%, rgba(31,21,18,.2) 100%)",
          }}
        />
        <div className="container position-relative w-100" style={{ pointerEvents: "none" }}>
          <div className="salam-minahasa mb-3">Pakatuan wo Pakalawiren</div>
          <h1 className="mb-3">
            Selamat Datang di
            <br />
            Kelurahan Paslaten Dua
          </h1>
          <p className="lead mb-4">
            Website informasi resmi Kelurahan Paslaten Dua, Kecamatan Tomohon Timur — di kaki
            pegunungan Kota Bunga, tanah Minahasa.
          </p>
          <div className="d-flex flex-wrap gap-2" style={{ pointerEvents: "auto" }}>
            <Link href="/profil" className="btn btn-emas px-4 py-2">Lihat Profil</Link>
            <Link href="/peta" className="btn btn-garis-terang px-4 py-2">Peta Lokasi</Link>
          </div>
        </div>
        <SiluetGunung />
      </section>

      {/* Sambutan */}
      <section className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-md-4">
            <div className="kartu-lembut overflow-hidden" style={{ borderBottom: "4px solid var(--emas)" }}>
              <Foto src={profil?.lurah_photo_url} alt={profil?.lurah_name || "Lurah"} tinggi={240} />
            </div>
          </div>
          <div className="col-md-8">
            <div className="label-kecil mb-1">Sambutan</div>
            <h2 className="h3 judul-seksi">Sambutan Lurah</h2>
            <p className="mb-1 fw-semibold">{profil?.lurah_name || "Nama Lurah"}</p>
            <p style={{ whiteSpace: "pre-line" }}>
              {profil?.lurah_message ||
                "Selamat datang di website resmi Kelurahan Paslaten Dua. Melalui website ini kami berharap informasi kelurahan dapat diakses dengan mudah oleh seluruh masyarakat. Dalam semangat mapalus, mari bersama membangun kelurahan kita."}
            </p>
          </div>
        </div>
      </section>

      {/* Informasi */}
      <section className="container pb-5">
        <h2 className="h3 judul-seksi">Informasi Penting</h2>
        <div className="row g-3">
          {info.map((i) => (
            <div className="col-md-4" key={i.judul}>
              <Link href={i.href} className="text-decoration-none" style={{ color: "inherit" }}>
                <div className="kartu-lembut kartu-budaya p-4 h-100">
                  <h3 className="h5 fw-bold">{i.judul}</h3>
                  <p className="mb-2" style={{ color: "var(--teks-redup)" }}>{i.isi}</p>
                  <span className="fw-semibold" style={{ color: "var(--merah)" }}>Lihat selengkapnya →</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Info Paslaten Dua */}
      <InfoPaslaten profil={profil} />

      {/* Berita */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-2">
          <h2 className="h3 judul-seksi mb-0">Berita & Kegiatan Terbaru</h2>
          <Link href="/berita" className="fw-semibold">Lihat Semua</Link>
        </div>
        <div className="row g-3 mt-2">
          {berita?.map((b) => (
            <div className="col-md-6 col-lg-4" key={b.id}>
              <div className="kartu-lembut h-100 overflow-hidden">
                <Foto src={b.image_url} alt={b.title} tinggi={180} />
                <div className="p-3">
                  <p className="small mb-1" style={{ color: "var(--emas)" }}>{tanggalIndo(b.published_at)}</p>
                  <h3 className="h5 fw-bold">{b.title}</h3>
                  <p style={{ color: "var(--teks-redup)" }}>{b.summary}</p>
                  <Link href={`/berita/${b.id}`} className="fw-semibold">Baca Selengkapnya →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UMKM */}
      <section className="container pb-5">
        <div className="d-flex justify-content-between align-items-end mb-2">
          <h2 className="h3 judul-seksi mb-0">UMKM Paslaten Dua</h2>
          <Link href="/umkm" className="fw-semibold">Lihat Semua</Link>
        </div>
        <div className="row g-3 mt-2">
          {umkm?.map((u) => (
            <div className="col-md-6 col-lg-4" key={u.id}>
              <div className="kartu-lembut h-100 overflow-hidden">
                <Foto src={u.image_url} alt={u.name} tinggi={180} />
                <div className="p-3">
                  <h3 className="h5 fw-bold">{u.name}</h3>
                  <span className="badge fw-normal" style={{ backgroundColor: "var(--pasir)", color: "var(--merah-tua)" }}>
                    {u.category}
                  </span>
                  <p className="mt-2 mb-0" style={{ color: "var(--teks-redup)" }}>{u.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kontak */}
      <section className="latar-budaya py-5">
        <div className="container py-2">
          <h2 className="h3 judul-seksi">Kontak</h2>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="label-kecil">Alamat</div>
              {profil?.office_address || "-"}
            </div>
            <div className="col-md-4">
              <div className="label-kecil">Telepon</div>
              {profil?.phone || "-"}
            </div>
            <div className="col-md-4">
              <div className="label-kecil">Jam Pelayanan</div>
              {profil?.office_hours || "-"}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}