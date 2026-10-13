import Link from "next/link";
import Foto from "../components/Foto";
import { SiluetGunung } from "../components/Ornamen";
import Peta3DLoader from "../components/Peta3DLoader";
import InfoPaslaten from "../components/InfoPaslaten";
import { supabase } from "../lib/supabase";
import { tanggalIndo } from "../lib/format";
import SambutanTeks from "../components/SambutanTeks";

export const revalidate = 60;

export default async function Home() {
  // WITA = UTC+8. Agenda hari ini tetap tampil sampai tanggal berganti.
  // eslint-disable-next-line react-hooks/purity -- Server Component force-dynamic: tanggal dihitung untuk setiap request.
  const hariIniWita = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const [
    { data: berita, error: errorBerita },
    { data: umkm, error: errorUmkm },
    { data: profil },
    { data: pengumuman, error: errorPengumuman },
    { data: agenda, error: errorAgenda },
  ] = await Promise.all([
    supabase.from("news").select("*").order("published_at", { ascending: false }).limit(3),
    supabase.from("umkm").select("*").order("created_at", { ascending: false }).limit(3),
    supabase.from("profiles").select("*").eq("id", 1).maybeSingle(),
    supabase.from("announcements").select("id, title, published_at")
      .order("published_at", { ascending: false }).order("id", { ascending: false })
      .limit(1).maybeSingle(),
    supabase.from("agendas").select("id, title, date, time, location")
      .gte("date", hariIniWita).order("date", { ascending: true }).order("id", { ascending: true })
      .limit(1).maybeSingle(),
  ]);

  const info = [
    {
      judul: "Pengumuman Terbaru",
      isi: errorPengumuman ? "Pengumuman belum dapat dimuat." : pengumuman?.title || "Belum ada pengumuman.",
      detail: !errorPengumuman && pengumuman?.published_at ? tanggalIndo(pengumuman.published_at) : "",
      href: "/pengumuman",
      aksi: "Lihat pengumuman",
    },
    {
      judul: "Pelayanan Warga",
      isi: "Siapkan keperluan Anda sebelum ke kantor kelurahan.",
      detail: "Informasi persyaratan dan prosedur layanan.",
      href: "/pelayanan",
      aksi: "Lihat persyaratan",
    },
    {
      judul: "Agenda Hari Ini & Mendatang",
      isi: errorAgenda ? "Agenda belum dapat dimuat." : agenda?.title || "Belum ada agenda mendatang.",
      detail: !errorAgenda && agenda?.date
        ? [tanggalIndo(agenda.date), agenda.time, agenda.location].filter(Boolean).join(" · ") : "",
      href: "/agenda",
      aksi: "Lihat agenda",
    },
  ];
  const beritaUtama = berita?.[0];
  const beritaLain = berita?.slice(1) ?? [];
  const sambutan = (profil?.lurah_message as string | null) ||
    "Selamat datang di website resmi Kelurahan Paslaten Dua. Melalui website ini kami berharap informasi kelurahan dapat diakses dengan mudah oleh seluruh masyarakat. Dalam semangat mapalus, mari bersama membangun kelurahan kita.";
  const sambutanPanjang = sambutan.length > 220;

  return (
    <div className="beranda-baru">
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
            <Link href="/pelayanan" className="btn btn-emas px-4 py-2">Layanan Warga</Link>
            <Link href="/peta" className="btn btn-garis-terang px-4 py-2">Peta Lokasi</Link>
          </div>
        </div>
        <SiluetGunung />
      </section>

      {/* Informasi */}
      <section className="container seksi-beranda" aria-labelledby="judul-informasi">
        <div className="kepala-seksi">
          <div>
            <div className="label-kecil mb-2">Untuk Warga</div>
            <h2 id="judul-informasi" className="h3 judul-seksi">Informasi Penting</h2>
            <p className="pengantar-seksi">Pengumuman, layanan, dan kegiatan dalam satu tempat.</p>
          </div>
        </div>
        <div className="row g-3">
          {info.map((i) => (
            <div className="col-md-4" key={i.href}>
              <Link href={i.href} className="kartu-lembut kartu-budaya kartu-informasi p-4 h-100 d-flex flex-column text-decoration-none">
                <h3 className="label-informasi">{i.judul}</h3>
                <p className="info-judul">{i.isi}</p>
                {i.detail && <p className="info-detail">{i.detail}</p>}
                <span className="tautan-aksi mt-auto pt-2">{i.aksi} <span aria-hidden="true">→</span></span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Berita */}
      <section className="container seksi-beranda pt-0" aria-labelledby="judul-berita">
        <div className="kepala-seksi">
          <div>
            <div className="label-kecil mb-2">Kabar Kelurahan</div>
            <h2 id="judul-berita" className="h3 judul-seksi">Berita & Kegiatan Terbaru</h2>
          </div>
          <Link href="/berita" className="btn btn-outline-primary">Semua berita <span aria-hidden="true">→</span></Link>
        </div>
        {errorBerita ? (
          <p className="kartu-lembut p-4">Berita belum dapat dimuat. Silakan muat ulang halaman.</p>
        ) : !beritaUtama ? (
          <p className="kartu-lembut p-4">Belum ada berita yang diterbitkan.</p>
        ) : (
          <div className={`berita-layout ${beritaLain.length === 0 ? "berita-layout-tunggal" : ""}`}>
            <article className="kartu-lembut berita-utama overflow-hidden">
              <Foto src={beritaUtama.image_url} alt={beritaUtama.title} tinggi="clamp(220px, 28vw, 360px)" />
              <div className="isi-berita">
                <p className="tanggal-berita">{beritaUtama.published_at ? tanggalIndo(beritaUtama.published_at) : ""}</p>
                <h3 className="h4 fw-bold"><Link href={`/berita/${beritaUtama.id}`}>{beritaUtama.title}</Link></h3>
                <p className="ringkasan-teks">{beritaUtama.summary}</p>
                <Link href={`/berita/${beritaUtama.id}`} className="tautan-aksi">Baca selengkapnya <span aria-hidden="true">→</span></Link>
              </div>
            </article>
            {beritaLain.length > 0 && (
              <div className="berita-samping">
                {beritaLain.map((b) => (
                  <article className="kartu-lembut berita-ringkas overflow-hidden" key={b.id}>
                    <Foto src={b.image_url} alt={b.title} tinggi="100%" />
                    <div className="isi-berita">
                      <p className="tanggal-berita">{b.published_at ? tanggalIndo(b.published_at) : ""}</p>
                      <h3 className="h5 fw-bold"><Link href={`/berita/${b.id}`}>{b.title}</Link></h3>
                      <p className="ringkasan-teks">{b.summary}</p>
                      <Link href={`/berita/${b.id}`} className="tautan-aksi">Baca berita <span aria-hidden="true">→</span></Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Info Paslaten Dua */}
      <InfoPaslaten profil={profil} />

      {/* Sambutan */}
      <section className="container seksi-beranda" aria-labelledby="judul-sambutan">
        <div className="sambutan-panel">
          <div className="sambutan-foto">
            <Foto
              src={profil?.lurah_photo_url}
              alt={profil?.lurah_name ? `Foto ${profil.lurah_name}` : "Foto Lurah"}
              tinggi={280}
              posisi="center 20%"
            />
          </div>
          <div className="sambutan-teks">
            <div className="label-kecil mb-2">Dari Kantor Kelurahan</div>
            <h2 id="judul-sambutan" className="h3 judul-seksi">Sambutan Lurah</h2>
            {profil?.lurah_name && <p className="fw-semibold mb-2">{profil.lurah_name}</p>}
            <SambutanTeks teks={sambutan} />
          </div>
        </div>
      </section>

      {/* UMKM */}
      <section className="container seksi-beranda pt-0" aria-labelledby="judul-umkm">
        <div className="kepala-seksi">
          <div>
            <div className="label-kecil mb-2">Usaha Warga</div>
            <h2 id="judul-umkm" className="h3 judul-seksi">UMKM Paslaten Dua</h2>
            <p className="pengantar-seksi">Kenali produk dan usaha yang tumbuh di lingkungan kita.</p>
          </div>
          <Link href="/umkm" className="btn btn-outline-primary">Jelajahi UMKM <span aria-hidden="true">→</span></Link>
        </div>
        {errorUmkm && <p className="kartu-lembut p-4">Data UMKM belum dapat dimuat. Silakan muat ulang halaman.</p>}
        {!errorUmkm && !umkm?.length && <p className="kartu-lembut p-4">Belum ada usaha yang ditampilkan.</p>}
        <div className="row g-3 mt-2">
          {!errorUmkm && umkm?.map((u) => (
            <div className="col-md-6 col-lg-4" key={u.id}>
              <article className="kartu-lembut umkm-kartu h-100 overflow-hidden d-flex flex-column">
                <Foto src={u.image_url} alt={u.name} tinggi="auto" />
                <div className="p-4 d-flex flex-column flex-grow-1">
                  {u.category && <span className="umkm-kategori align-self-start mb-3">{u.category}</span>}
                  <h3 className="h5 fw-bold">{u.name}</h3>
                  <p className="ringkasan-teks">{u.description}</p>
                  <Link href="/umkm" className="tautan-aksi mt-auto">Lihat direktori usaha <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      {/* Kontak */}
      <section className="latar-budaya kontak-beranda py-5">
        <div className="container py-2">
          <h2 className="h3 judul-seksi">Kontak</h2>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="label-kecil">Alamat</div>
              {profil?.office_address || "-"}
            </div>
              <div className="col-md-4">
                <div className="label-kecil">Email</div>
                {profil?.email ? (
                  <a href={`mailto:${profil.email}`} style={{ color: "inherit", overflowWrap: "anywhere" }}>
                    {profil.email}
                  </a>
                ) : (
                  "-"
                )}
              </div>
            <div className="col-md-4">
              <div className="label-kecil">Jam Pelayanan</div>
              {profil?.office_hours || "-"}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
