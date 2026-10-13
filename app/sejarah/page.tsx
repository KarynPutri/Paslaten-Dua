import PageHeader from "../../components/PageHeader";
import NavBabSejarah from "../../components/NavBabSejarah";
import { BungaHias } from "../../components/Ornamen";
import {
  pengantar,
  sekilas,
  lini,
  bagian,
  penutup,
  rujukan,
  mataAir,
  langkahSumoring,
  type Para,
} from "../../data/sejarah";

export const metadata = {
  title: "Sejarah Paslaten Dua | Kelurahan Paslaten Dua",
  description:
    "Sejarah Kelurahan Paslaten Dua, Tomohon Timur: asal-usul, asal nama, peran perdagangan pada abad ke-19, dan perkembangan wilayah.",
};

const ROMAWI = ["I", "II", "III", "IV", "V", "VI", "VII"];

const LABEL_PENDEK: Record<string, string> = {
  "peran-perdagangan": "Perdagangan",
  "perkembangan-wilayah": "Wilayah",
  "catatan-sejarah": "Catatan",
};

const IKON = {
  air: "M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z",
  orang: "M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a2.5 2.5 0 100-5M21 19c0-2.5-1.5-4.5-4-5",
  rumah: "M3 11l9-7 9 7v9H3zM9 20v-6h6v6",
  toko: "M4 9l1.5-5h13L20 9M4 9h16v11H4zM9 20v-5h6v5",
  kopi: "M12 3c4 1 7 5 7 9s-3 8-7 9c-4-1-7-5-7-9s3-8 7-9zM12 3c-2 4-2 14 0 18",
  gedung: "M4 21V8l8-5 8 5v13M9 21v-6h6v6M8 11h.01M12 11h.01M16 11h.01",
  peta: "M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14",
  dokumen: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
  daun: "M5 19C5 10 11 5 20 5c0 9-5 15-14 15M5 19c3-5 6-8 11-10",
  bintang: "M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z",
};

function pilihIkon(judul: string) {
  const j = judul.toLowerCase();
  if (j.includes("mata air")) return IKON.air;
  if (j.includes("leluhur") || j.includes("kebersamaan") || j.includes("tuturan")) return IKON.orang;
  if (j.includes("kampung") || j.includes("kesatuan")) return IKON.rumah;
  if (j.includes("pasar") || j.includes("perdagangan")) return IKON.toko;
  if (j.includes("kopi")) return IKON.kopi;
  if (j.includes("pemerintahan") || j.includes("kota tomohon")) return IKON.gedung;
  if (j.includes("wilayah")) return IKON.peta;
  if (j.includes("administratif") || j.includes("catatan")) return IKON.dokumen;
  if (j.includes("pertanian")) return IKON.daun;
  return IKON.bintang;
}

function Garis({ d, ukuran = 22 }: { d: string; ukuran?: number }) {
  return (
    <svg
      width={ukuran}
      height={ukuran}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

// Mendukung *miring* dan **tebal** di dalam teks
function Teks({ s }: { s: string }) {
  const potongan = s.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {potongan.map((t, i) =>
        t.startsWith("**") ? (
          <strong key={i}>{t.slice(2, -2)}</strong>
        ) : t.startsWith("*") ? (
          <em key={i}>{t.slice(1, -1)}</em>
        ) : (
          <span key={i}>{t}</span>
        )
      )}
    </>
  );
}

function Paragraf({ p }: { p: Para }) {
  if (typeof p === "string") {
    return (
      <p>
        <Teks s={p} />
      </p>
    );
  }
  return (
    <div className="sej-catatan">
      <span className="sej-catatan-label">{p.label ?? "Perlu dikonfirmasi"}</span>
      <p className="mb-0">
        <Teks s={p.catatan} />
      </p>
    </div>
  );
}

function BandAir() {
  return (
    <div className="sej-air">
      <div className="sej-air-judul">Sumber air dalam kisah Paslaten</div>
      <div className="sej-air-daftar">
        {mataAir.map((m) => (
          <div className="sej-tetes" key={m.nama}>
            <span className="sej-tetes-ikon">
              <Garis d={IKON.air} />
            </span>
            <div>
              <b>{m.nama}</b>
              <small>{m.ket}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Letak() {
  return (
    <div className="sej-letak-wadah">
      <div className="sej-letak" role="img" aria-label="Paslaten berada di antara Matani dan Talete">
        <span className="sej-simpul">Matani</span>
        <span className="sej-jalur" />
        <span className="sej-simpul utama">Paslaten</span>
        <span className="sej-jalur" />
        <span className="sej-simpul">Talete</span>
      </div>
      <p className="sej-letak-ket">
        Letak permukiman menurut ungkapan asal nama (skematis, bukan peta). Permukiman tua lain yang
        disebut berkaitan dengan Paslaten: Walian, Kolongan, dan Kamasi.
      </p>
    </div>
  );
}

function Langkah() {
  return (
    <div className="mb-4">
      <div className="label-kecil mb-2">Alur kisah menurut catatan sejarah lokal</div>
      <ol className="sej-langkah">
        {langkahSumoring.map((l, i) => (
          <li className="sej-langkah-item" key={l.judul}>
            <span className="sej-langkah-no">{i + 1}</span>
            <b>{l.judul}</b>
            <span className="sej-langkah-teks">{l.teks}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Pecah() {
  return (
    <div className="sej-pecah">
      <div className="sej-pecah-atas">
        Paslaten
        <small>satu kesatuan wilayah</small>
      </div>
      <div className="sej-pecah-cabang">
        <span className="sej-tanya">Tahun pemekaran belum dipastikan</span>
      </div>
      <div className="sej-pecah-bawah">
        <div className="sej-pecah-sel">Paslaten Satu</div>
        <div className="sej-pecah-sel utama">
          Paslaten Dua
          <small>Kecamatan Tomohon Timur</small>
        </div>
      </div>
    </div>
  );
}

export default function Sejarah() {
  const navItem = [
    { id: "lini-masa", label: "Lini Masa" },
    ...bagian.map((b) => ({ id: b.kunci, label: LABEL_PENDEK[b.kunci] ?? b.label })),
    { id: "rujukan", label: "Rujukan" },
  ];

  return (
    <>
      <PageHeader
        judul="Sejarah Paslaten Dua"
        deskripsi="Dari mata air dan permukiman para leluhur hingga kawasan perdagangan Tomohon"
      />
      <NavBabSejarah item={navItem} />

      {/* Pengantar, fakta singkat, dan daftar isi */}
      <section className="container pt-5">
        <div className="sej-intro">
          <BungaHias
            ukuran={190}
            className="bunga-hias d-none d-md-block"
            style={{ position: "absolute", right: "-34px", top: "-34px", opacity: 0.12 }}
          />
          <div className="label-kecil mb-2">Sekilas Sejarah</div>
          {pengantar.map((p, i) => (
            <p key={i} className={i === 0 ? "sej-lead" : ""}>
              {p}
            </p>
          ))}
        </div>

        <div className="sej-fakta-grid">
          {sekilas.map((f) => (
            <div className="sej-fakta" key={f.angka}>
              <div className="sej-fakta-angka">{f.angka}</div>
              <div className="sej-fakta-teks">{f.teks}</div>
            </div>
          ))}
        </div>

        <nav className="sej-chips" aria-label="Isi halaman">
          {navItem.map((n) => (
            <a className="sej-chip" href={`#${n.id}`} key={n.id}>
              {n.label}
            </a>
          ))}
        </nav>
      </section>

      {/* Lini masa */}
      <section className="container py-5" id="lini-masa">
        <div className="label-kecil mb-1">Ringkasan</div>
        <h2 className="h3 judul-seksi mb-4">Lini Masa</h2>
        <ol className="sej-lini">
          {lini.map((l) => (
            <li key={l.waktu} className={`sej-lini-item ${l.belum ? "belum" : ""}`}>
              <div className="sej-waktu">{l.waktu}</div>
              <div className="sej-lini-kartu">{l.teks}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Bab-bab sejarah */}
      {bagian.map((b, i) => (
        <section
          key={b.kunci}
          id={b.kunci}
          className={`sej-band ${i % 2 === 0 ? "latar-pasir" : ""}`}
        >
          <div className="container py-5">
            <div className="sej-bab-kepala">
              <span className="sej-segel" aria-hidden="true">{ROMAWI[i]}</span>
              <div>
                <div className="label-kecil mb-1">
                  Bab {ROMAWI[i]} · {b.label}
                </div>
                <h2 className="h3 judul-seksi">{b.judul}</h2>
              </div>
            </div>

            {b.pengantar?.map((p, j) => (
              <div className="sej-pengantar mb-4" key={j}>
                <Paragraf p={p} />
              </div>
            ))}

            {b.kunci === "asal-usul" && <BandAir />}

            {b.kunci === "asal-nama" && (
              <>
                {b.kutipan && (
                  <blockquote className="sej-kutipan">
                    <p>{b.kutipan.teks}</p>
                    <footer>{b.kutipan.ket}</footer>
                  </blockquote>
                )}
                <Letak />
                <Langkah />
              </>
            )}

            {b.kunci === "perkembangan-wilayah" && <Pecah />}

            {b.isi && (
              <div className="sej-arsip sej-narasi">
                {b.isi.map((p, j) => (
                  <Paragraf p={p} key={j} />
                ))}
              </div>
            )}

            {b.butir && (
              <div className="row g-4">
                {b.butir.map((x, k) => (
                  <div
                    className={
                      b.kunci === "warisan"
                        ? "col-12 col-md-6 col-lg-3"
                        : b.butir!.length === 3
                        ? "col-12 col-lg-4"
                        : "col-12 col-md-6"
                    }
                    key={x.judul}
                  >
                    <article className="sej-arsip">
                      <div className="sej-arsip-kepala">
                        <span className="sej-ikon" aria-hidden="true">
                          <Garis d={pilihIkon(x.judul)} />
                        </span>
                        <div>
                          <span className="sej-kode">
                            {ROMAWI[i]}.{k + 1}
                          </span>
                          <h3 className="h5 fw-bold mb-0">{x.judul}</h3>
                        </div>
                      </div>
                      {x.isi.map((p, m) => (
                        <Paragraf p={p} key={m} />
                      ))}
                    </article>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Penutup */}
      <section className="container py-5">
        <div className="sej-penutup">
          <BungaHias
            ukuran={150}
            warna="var(--emas-muda)"
            className="bunga-hias d-none d-md-block"
            style={{ position: "absolute", left: "-28px", bottom: "-34px", opacity: 0.18 }}
          />
          <p>
            <Teks s={penutup} />
          </p>
        </div>
      </section>

      {/* Rujukan */}
      <section className="container pb-5" id="rujukan">
        <div className="label-kecil mb-1">Sumber</div>
        <h2 className="h3 judul-seksi mb-4">Sumber yang Dapat Dijadikan Rujukan</h2>
        <ol className="sej-pustaka">
          {rujukan.map((r, i) => (
            <li className="sej-pustaka-item" key={r.url}>
              <span className="sej-pustaka-no">{i + 1}</span>
              <div className="sej-pustaka-isi">
                <span className={`sej-jenis ${r.resmi ? "resmi" : ""}`}>{r.jenis}</span>
                <h3 className="h6 fw-bold mb-1">{r.judul}</h3>
                <p className="mb-1">{r.ket}</p>
                {r.catatan && <p className="small fst-italic mb-0">{r.catatan}</p>}
              </div>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm align-self-center"
              >
                Buka ↗
              </a>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}