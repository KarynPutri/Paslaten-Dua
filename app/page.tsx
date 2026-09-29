import Link from "next/link";
import Foto from "../components/Foto";
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
      <section style={{ backgroundColor: "#dcedfb" }} className="py-5">
        <div className="container text-center py-4">
          <h1 className="fw-bold">Selamat Datang di Paslaten Dua</h1>
          <p className="lead">Website informasi resmi Kelurahan Paslaten Dua, Tomohon Timur</p>
          <Link href="/profil" className="btn btn-primary px-4">Lihat Profil</Link>
        </div>
      </section>

      <section className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-md-4">
            <div className="kartu-lembut overflow-hidden">
              <Foto src={null} alt="Lurah" tinggi={220} />
            </div>
          </div>
          <div className="col-md-8">
            <h2 className="h3 judul-seksi">Sambutan Lurah</h2>
            <p className="mb-1 fw-semibold">Nama Lurah</p>
            <p>
              Selamat datang di website resmi Kelurahan Paslaten Dua. Melalui
              website ini kami berharap informasi kelurahan dapat diakses
              dengan mudah oleh seluruh masyarakat.
            </p>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <h2 className="h3 judul-seksi">Informasi Penting</h2>
        <div className="row g-3">
          {info.map((i) => (
            <div className="col-md-4" key={i.judul}>
              <div className="kartu-lembut p-4 h-100">
                <h3 className="h5 fw-bold">{i.judul}</h3>
                <p>{i.isi}</p>
                <Link href={i.href}>Lihat selengkapnya</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-5">
        <div className="d-flex justify-content-between align-items-end mb-2">
          <h2 className="h3 judul-seksi mb-0">Berita & Kegiatan Terbaru</h2>
          <Link href="/berita">Lihat Semua</Link>
        </div>
        <div className="row g-3 mt-2">
          {berita?.map((b) => (
            <div className="col-md-6 col-lg-4" key={b.id}>
              <div className="kartu-lembut h-100 overflow-hidden">
                <Foto src={b.image_url} alt={b.title} />
                <div className="p-3">
                  <p className="small mb-1" style={{ color: "#4a6785" }}>{tanggalIndo(b.published_at)}</p>
                  <h3 className="h5 fw-bold">{b.title}</h3>
                  <p>{b.summary}</p>
                  <Link href={`/berita/${b.id}`}>Baca Selengkapnya</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-5">
        <div className="d-flex justify-content-between align-items-end mb-2">
          <h2 className="h3 judul-seksi mb-0">UMKM Paslaten Dua</h2>
          <Link href="/umkm">Lihat Semua</Link>
        </div>
        <div className="row g-3 mt-2">
          {umkm?.map((u) => (
            <div className="col-md-6 col-lg-4" key={u.id}>
              <div className="kartu-lembut h-100 overflow-hidden">
                <Foto src={u.image_url} alt={u.name} />
                <div className="p-3">
                  <h3 className="h5 fw-bold">{u.name}</h3>
                  <span className="badge fw-normal" style={{ backgroundColor: "#dcedfb", color: "#1e3a5f" }}>
                    {u.category}
                  </span>
                  <p className="mt-2 mb-0">{u.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#dcedfb" }} className="py-5">
        <div className="container">
          <h2 className="h3 judul-seksi">Kontak</h2>
          <div className="row g-3">
            <div className="col-md-4"><strong>Alamat</strong><br />{profil?.office_address || "-"}</div>
            <div className="col-md-4"><strong>Telepon</strong><br />{profil?.phone || "-"}</div>
            <div className="col-md-4"><strong>Jam Pelayanan</strong><br />{profil?.office_hours || "-"}</div>
          </div>
        </div>
      </section>
    </>
  );
}