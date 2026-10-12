"use client";

import { useState } from "react";
import Link from "next/link";

type Layanan = {
  id: number;
  name: string;
  requirements?: string[] | null;
  procedure?: string[] | null;
  service_hours?: string | null;
};

export default function PelayananClient({ layanan }: { layanan: Layanan[] }) {
  const [kataKunci, setKataKunci] = useState("");
  const [terbukaId, setTerbukaId] = useState<number | null>(layanan[0]?.id ?? null);

  const hasilFilter = layanan.filter((l) => {
    const q = kataKunci.toLowerCase();
    const namaCocok = l.name.toLowerCase().includes(q);
    const syaratCocok = l.requirements?.some((r) => r.toLowerCase().includes(q));
    const prosedurCocok = l.procedure?.some((p) => p.toLowerCase().includes(q));
    return namaCocok || syaratCocok || prosedurCocok;
  });

  const toggleLayanan = (id: number) => {
    setTerbukaId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mx-auto" style={{ maxWidth: "860px" }}>
      {/* Kotak Pencarian */}
      <div className="kotak-cari mb-4">
        <span className="ikon-cari" aria-hidden="true">🔍</span>
        <input
          type="text"
          placeholder="Cari layanan, syarat surat, atau prosedur..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          aria-label="Cari jenis layanan kelurahan"
        />
        {kataKunci && (
          <button
            type="button"
            className="btn btn-sm btn-link text-decoration-none position-absolute"
            style={{ right: "0.5rem", top: "50%", transform: "translateY(-50%)", color: "var(--teks-redup)" }}
            onClick={() => setKataKunci("")}
            aria-label="Hapus pencarian"
          >
            ✕
          </button>
        )}
      </div>

      {hasilFilter.length === 0 ? (
        <div className="kartu-lembut p-4 text-center">
          <p className="mb-2 fw-semibold">Layanan tidak ditemukan</p>
          <p className="small text-muted mb-3">
            Tidak ada layanan yang cocok dengan kata kunci &ldquo;{kataKunci}&rdquo;.
          </p>
          <Link href="/kontak" className="btn btn-sm btn-primary">
            Hubungi Kantor Kelurahan
          </Link>
        </div>
      ) : (
        <div className="accordion-layanan">
          {hasilFilter.map((l) => {
            const isTerbuka = terbukaId === l.id || kataKunci.length > 0;

            return (
              <div
                className={`item-layanan ${isTerbuka ? "terbuka" : ""}`}
                key={l.id}
              >
                <button
                  type="button"
                  className="header-layanan"
                  onClick={() => toggleLayanan(l.id)}
                  aria-expanded={isTerbuka}
                >
                  <h3>{l.name}</h3>
                  <span className="panah-toggle" aria-hidden="true">
                    ▼
                  </span>
                </button>

                {isTerbuka && (
                  <div className="konten-layanan pt-3">
                    <div className="row g-4">
                      {/* Persyaratan Dokumen */}
                      <div className="col-md-5">
                        <h4 className="h6 fw-bold mb-2" style={{ color: "var(--merah)" }}>
                          Persyaratan Dokumen
                        </h4>
                        {l.requirements && l.requirements.length > 0 ? (
                          <ul className="daftar-cek">
                            {l.requirements.map((r, idx) => (
                              <li key={idx}>{r}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="small text-muted mb-0">Persyaratan umum berlaku.</p>
                        )}
                      </div>

                      {/* Alur Prosedur */}
                      <div className="col-md-7">
                        <h4 className="h6 fw-bold mb-2" style={{ color: "var(--merah)" }}>
                          Alur Prosedur
                        </h4>
                        {l.procedure && l.procedure.length > 0 ? (
                          <ol className="alur-nomor">
                            {l.procedure.map((p, idx) => (
                              <li key={idx}>{p}</li>
                            ))}
                          </ol>
                        ) : (
                          <p className="small text-muted mb-0">Datang langsung ke kantor kelurahan.</p>
                        )}
                      </div>
                    </div>

                    <hr className="my-3" style={{ borderColor: "var(--garis)" }} />

                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 small">
                      <div style={{ color: "var(--teks-redup)" }}>
                        <strong>Jam Pelayanan:</strong> {l.service_hours || "Senin–Jumat (Jam Kerja)"}
                      </div>
                      <Link href="/kontak" className="fw-semibold text-primary">
                        Ada pertanyaan? Hubungi kontak →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
