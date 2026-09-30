import Link from "next/link";
import Foto from "../components/Foto";
import { BungaHias, SiluetGunung } from "../components/Ornamen";
import { supabase } from "../lib/supabase";
import { tanggalIndo } from "../lib/format";

export const dynamic = "force-dynamic";

const info = [
  { judul: "Pengumuman", isi: "Informasi terbaru untuk warga.", href: "/pengumuman" },
  { judul: "Pelayanan", isi: "Persyaratan dan prosedur layanan.", href: "/pelayanan" },
  { judul: "Agenda", isi: "Jadwal kegiatan kelurahan.", href: "/agenda" },
];

const budaya = [
  {
    judul: "Tari Kabasaran",
    isi: "Tarian keprajuritan Minahasa dengan busana merah menyala, pedang, dan tombak — lambang keberanian para waraney.",
    ikon: "M12 2l3 7-3 2-3-2zM12 11v11M8 16h8",
  },
  {
    judul: "Musik Kolintang",
    isi: "Alat musik pukul dari bilah kayu yang mengiringi ibadah, pesta, dan acara adat masyarakat Minahasa.",
    ikon: "M3 8h18M4 12h16M5 16h14M7 8v8M12 8v8M17 8v8",
  },
  {
    judul: "Mapalus",
    isi: "Tradisi gotong royong warga — bekerja bersama di kebun, membangun rumah, hingga menolong saat duka.",
    ikon: "M7 10a3 3 0 100-6 3 3 0 000 6zM17 10a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 2-6 5-6s5 3 5 6M12 20c0-3 2-6 5-6s5 3 5 6",
  },
  {
    judul: "Kota Bunga",
    isi: "Tomohon dikenal sebagai Kota Bunga. Kebun bunga warga dan Tomohon International Flower Festival menjadi kebanggaan.",
    ikon: "M12 12a3 3 0 100-6 3 3 0 000 6zM12 12a3 3 0 100 6 3 3 0 000-6zM12 12a3 3 0 10-6 0 3 3 0 006 0zM12 12a3 3 0 106 0 3 3 0 00-6 0zM12 18v4",
  },
  {
    judul: "Gunung Mahawu",
    isi: "Gunung api di sisi timur Kota Tomohon. Udaranya sejuk dan tanah vulkaniknya menyuburkan kebun sayur warga.",
    ikon: "M2 20l7-12 4 6 3-4 6 10zM9 8l1.5 2.5",
  },
  {
    judul: "Pakatuan wo Pakalawiren",
    isi: "Salam dan doa khas Minahasa: semoga panjang umur dan senantiasa sejahtera. Diucapkan dalam berbagai acara adat.",
    ikon: "M4 5h16v11H8l-4 4zM8 10h8M8 13h5",
  },
];

function IkonGaris({ d }: { d: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default async function Home() {
  const [{ data: berita }, { data: umkm }, { data: profil }] = await Promise.all([
    supabase.from("news").select("*").order("published_at", { ascending: false }).limit(3),
    supabase.from("umkm").select("*").order("created_at", { ascending: false }).limit(3),
    supabase.from("profiles").select("*").eq("id", 1).maybeSingle(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="latar-budaya hero-budaya">
        <BungaHias ukuran={220} className="bunga-hias d-none d-lg-block" style={{ right: "7%", top: "14%", opacity: 0.4 }} />
        <BungaHias ukuran={90} warna="var(--emas-muda)" className="bunga-hias d-none d-lg-block" style={{ right: "22%", top: "52%", opacity: 0.35 }} />
        <div className="container position-relative">
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
          <div className="d-flex flex-wrap gap-2">
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
              <Foto src={null} alt="Lurah" tinggi={240} />
            </div>
          </div>
          <div className="col-md-8">
            <div className="label-kecil mb-1">Sambutan</div>
            <h2 className="h3 judul-seksi">Sambutan Lurah</h2>
            <p className="mb-1 fw-semibold">Nama Lurah</p>
            <p>
              Selamat datang di website resmi Kelurahan Paslaten Dua. Melalui
              website ini kami berharap informasi kelurahan dapat diakses
              dengan mudah oleh seluruh masyarakat. Dalam semangat mapalus, mari
              bersama membangun kelurahan kita.
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

      {/* Budaya */}
      <section className="latar-pasir py-5">
        <div className="container py-3">
          <div className="text-center mb-4">
            <div className="label-kecil mb-1">Warisan Minahasa</div>
            <h2 className="h3 judul-seksi">Budaya Tomohon Timur</h2>
            <p className="mx-auto" style={{ maxWidth: 620, color: "var(--teks-redup)" }}>
              Paslaten Dua tumbuh bersama adat dan tradisi Minahasa yang terus dijaga
              warga dari generasi ke generasi.
            </p>
          </div>
          <div className="row g-3">
            {budaya.map((b) => (
              <div className="col-md-6 col-lg-4" key={b.judul}>
                <div className="kartu-lembut kartu-budaya p-4 h-100">
                  <div className="ikon-budaya">
                    <IkonGaris d={b.ikon} />
                  </div>
                  <h3 className="h5 fw-bold">{b.judul}</h3>
                  <p className="mb-0" style={{ color: "var(--teks-redup)" }}>{b.isi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
