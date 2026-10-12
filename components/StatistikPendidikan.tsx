"use client";

import { useState, useMemo } from "react";
import { formatAngka } from "../lib/format";

export type EduStat = {
  id: number;
  level: string;
  public_schools: number;
  private_schools: number;
  teachers: number;
  students: number;
  school_year?: string;
};

// Metadata tampilan ramah untuk tiap jenjang pendidikan
const INFO_JENJANG: Record<
  string,
  { nama: string; ikon: string; warna: string; bgWarna: string }
> = {
  TK: {
    nama: "Taman Kanak-Kanak",
    ikon: "🎨",
    warna: "#d97706",
    bgWarna: "rgba(217, 119, 6, 0.12)",
  },
  SD: {
    nama: "Sekolah Dasar",
    ikon: "🎒",
    warna: "#2563eb",
    bgWarna: "rgba(37, 99, 235, 0.12)",
  },
  SMP: {
    nama: "Sekolah Menengah Pertama",
    ikon: "📐",
    warna: "#7c3aed",
    bgWarna: "rgba(124, 58, 237, 0.12)",
  },
  SMA: {
    nama: "Sekolah Menengah Atas",
    ikon: "🎓",
    warna: "#b91c1c",
    bgWarna: "rgba(185, 28, 28, 0.12)",
  },
};

export default function StatistikPendidikan({
  educationStats,
}: {
  educationStats: EduStat[];
}) {
  const [modeTampilan, setModeTampilan] = useState<"visual" | "tabel" | "gabungan">("gabungan");

  // Perhitungan ringkasan total (efisien & modular)
  const ringkasan = useMemo(() => {
    const totalNegeri = educationStats.reduce((s, e) => s + (e.public_schools || 0), 0);
    const totalSwasta = educationStats.reduce((s, e) => s + (e.private_schools || 0), 0);
    const totalSekolah = totalNegeri + totalSwasta;
    const totalGuru = educationStats.reduce((s, e) => s + (e.teachers || 0), 0);
    const totalMurid = educationStats.reduce((s, e) => s + (e.students || 0), 0);
    const rasioMuridGuru = totalGuru > 0 ? (totalMurid / totalGuru).toFixed(1) : "-";

    return {
      totalNegeri,
      totalSwasta,
      totalSekolah,
      totalGuru,
      totalMurid,
      rasioMuridGuru,
    };
  }, [educationStats]);

  if (!educationStats || educationStats.length === 0) return null;

  return (
    <section className="pt-2">
      {/* Header Bagian Statistik & Pengalih Tampilan */}
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div>
          <div className="label-kecil mb-1">Data Statistik Resmi</div>
          <h2 className="h3 judul-seksi mb-1">Sarana Pendidikan di Kecamatan Tomohon Timur</h2>
          <p className="small text-muted mb-0">
            Sebaran data sekolah, tenaga pendidik, dan murid berdasarkan data resmi BPS.
          </p>
        </div>

        {/* Pengalih Mode Tampilan (Visual / Tabel / Keduanya) */}
        <div
          className="d-inline-flex p-1 bg-white border rounded-pill shadow-sm"
          role="group"
          aria-label="Mode Tampilan Statistik"
        >
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 fw-semibold transition-all ${
              modeTampilan === "gabungan"
                ? "btn-primary shadow-sm"
                : "btn-light text-muted border-0"
            }`}
            onClick={() => setModeTampilan("gabungan")}
          >
            ✨ Ringkas & Lengkap
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 fw-semibold transition-all ${
              modeTampilan === "visual"
                ? "btn-primary shadow-sm"
                : "btn-light text-muted border-0"
            }`}
            onClick={() => setModeTampilan("visual")}
          >
            📊 Visual Analitik
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 fw-semibold transition-all ${
              modeTampilan === "tabel"
                ? "btn-primary shadow-sm"
                : "btn-light text-muted border-0"
            }`}
            onClick={() => setModeTampilan("tabel")}
          >
            📋 Tabel Resmi
          </button>
        </div>
      </div>

      {/* 1. KARTU METRIK UTAMA (HIGHLIGHT METRICS) */}
      <div className="row g-3 mb-4">
        {/* Total Sekolah */}
        <div className="col-6 col-lg-3">
          <div className="kartu-metrik-pendidikan h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="label-metrik">Total Sekolah</span>
              <span
                className="ikon-metrik"
                style={{ background: "rgba(197, 144, 49, 0.15)", color: "var(--emas-tua)" }}
                aria-hidden="true"
              >
                🏫
              </span>
            </div>
            <div className="nilai-metrik">
              {formatAngka(ringkasan.totalSekolah)}{" "}
              <span className="fs-6 fw-normal text-muted">unit</span>
            </div>
            <div className="sub-metrik d-flex flex-wrap gap-1">
              <span className="badge bg-primary-subtle text-primary border">
                {ringkasan.totalNegeri} Negeri
              </span>
              <span className="badge bg-secondary-subtle text-secondary border">
                {ringkasan.totalSwasta} Swasta
              </span>
            </div>
          </div>
        </div>

        {/* Total Guru */}
        <div className="col-6 col-lg-3">
          <div className="kartu-metrik-pendidikan h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="label-metrik">Tenaga Pendidik</span>
              <span
                className="ikon-metrik"
                style={{ background: "rgba(37, 99, 235, 0.12)", color: "#2563eb" }}
                aria-hidden="true"
              >
                👨‍🏫
              </span>
            </div>
            <div className="nilai-metrik">
              {formatAngka(ringkasan.totalGuru)}{" "}
              <span className="fs-6 fw-normal text-muted">guru</span>
            </div>
            <div className="sub-metrik text-muted small">Guru aktif mengajar</div>
          </div>
        </div>

        {/* Total Murid */}
        <div className="col-6 col-lg-3">
          <div className="kartu-metrik-pendidikan h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="label-metrik">Jumlah Murid</span>
              <span
                className="ikon-metrik"
                style={{ background: "rgba(139, 30, 27, 0.12)", color: "var(--merah)" }}
                aria-hidden="true"
              >
                🎒
              </span>
            </div>
            <div className="nilai-metrik" style={{ color: "var(--merah)" }}>
              {formatAngka(ringkasan.totalMurid)}{" "}
              <span className="fs-6 fw-normal text-muted">siswa</span>
            </div>
            <div className="sub-metrik text-muted small">Generasi muda terdaftar</div>
          </div>
        </div>

        {/* Rasio Murid per Guru */}
        <div className="col-6 col-lg-3">
          <div className="kartu-metrik-pendidikan h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="label-metrik">Rasio Murid/Guru</span>
              <span
                className="ikon-metrik"
                style={{ background: "rgba(16, 185, 129, 0.12)", color: "#059669" }}
                aria-hidden="true"
              >
                ⚖️
              </span>
            </div>
            <div className="nilai-metrik">
              {ringkasan.rasioMuridGuru}{" "}
              <span className="fs-6 fw-normal text-muted">: 1</span>
            </div>
            <div className="sub-metrik text-success small fw-semibold">
              <span className="me-1">✓</span> Rasio pengajaran efektif
            </div>
          </div>
        </div>
      </div>

      {/* 2. BAGIAN VISUAL: DIAGRAM PROPORSI & KARTU JENJANG */}
      {(modeTampilan === "visual" || modeTampilan === "gabungan") && (
        <div className="mb-4">
          {/* Bar Distribusi Murid */}
          <div className="kartu-lembut p-4 mb-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
              <h3 className="h6 fw-bold mb-0">Distribusi Jumlah Murid per Jenjang</h3>
              <span className="small text-muted">Total: {formatAngka(ringkasan.totalMurid)} Jiwa</span>
            </div>

            {/* Multi-segment Bar */}
            <div
              className="wadah-bar-proporsi mb-3"
              style={{
                height: "16px",
                borderRadius: "999px",
                overflow: "hidden",
                display: "flex",
                background: "rgba(0,0,0,0.06)",
              }}
            >
              {educationStats.map((e) => {
                const persen =
                  ringkasan.totalMurid > 0
                    ? ((e.students || 0) / ringkasan.totalMurid) * 100
                    : 0;
                const info = INFO_JENJANG[e.level] || { nama: e.level, warna: "#6b7280" };
                return (
                  <div
                    key={e.id}
                    style={{
                      width: `${persen}%`,
                      backgroundColor: info.warna,
                      transition: "width 0.4s ease",
                    }}
                    title={`${e.level}: ${formatAngka(e.students)} murid (${persen.toFixed(1)}%)`}
                  />
                );
              })}
            </div>

            {/* Legenda Bar Proporsi */}
            <div className="d-flex flex-wrap gap-3 small">
              {educationStats.map((e) => {
                const persen =
                  ringkasan.totalMurid > 0
                    ? ((e.students || 0) / ringkasan.totalMurid) * 100
                    : 0;
                const info = INFO_JENJANG[e.level] || { nama: e.level, warna: "#6b7280" };
                return (
                  <div key={e.id} className="d-flex align-items-center gap-2">
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: info.warna,
                        display: "inline-block",
                      }}
                    />
                    <span className="fw-semibold">{e.level}</span>
                    <span className="text-muted">
                      {formatAngka(e.students)} ({persen.toFixed(1)}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grid Kartu Per Jenjang */}
          <div className="row g-3">
            {educationStats.map((e) => {
              const totalSekolahJenjang = (e.public_schools || 0) + (e.private_schools || 0);
              const info = INFO_JENJANG[e.level] || {
                nama: e.level,
                ikon: "🏫",
                warna: "var(--merah)",
                bgWarna: "rgba(0,0,0,0.05)",
              };
              const persenMurid =
                ringkasan.totalMurid > 0
                  ? ((e.students || 0) / ringkasan.totalMurid) * 100
                  : 0;
              const rasio = e.teachers > 0 ? (e.students / e.teachers).toFixed(1) : "-";

              return (
                <div className="col-md-6 col-lg-3" key={e.id}>
                  <div className="kartu-jenjang-pendidikan h-100">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="ikon-jenjang"
                          style={{ backgroundColor: info.bgWarna, color: info.warna }}
                          aria-hidden="true"
                        >
                          {info.ikon}
                        </span>
                        <div>
                          <div className="fw-bold fs-5 lh-1">{e.level}</div>
                          <div className="text-muted small" style={{ fontSize: "0.75rem" }}>
                            {info.nama}
                          </div>
                        </div>
                      </div>
                      <span className="badge rounded-pill bg-light text-dark border">
                        {totalSekolahJenjang} Sekolah
                      </span>
                    </div>

                    {/* Progress Bar Siswa */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Porsi Murid</span>
                        <span className="fw-semibold text-dark">{persenMurid.toFixed(1)}%</span>
                      </div>
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className="progress-bar"
                          style={{ width: `${persenMurid}%`, backgroundColor: info.warna }}
                        />
                      </div>
                    </div>

                    {/* Data Rinci Jenjang */}
                    <div className="d-flex justify-content-between pt-2 border-top small">
                      <div>
                        <div className="text-muted" style={{ fontSize: "0.72rem" }}>
                          MURID
                        </div>
                        <div className="fw-bold">{formatAngka(e.students)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-muted" style={{ fontSize: "0.72rem" }}>
                          GURU
                        </div>
                        <div className="fw-bold">{formatAngka(e.teachers)}</div>
                      </div>
                      <div className="text-end">
                        <div className="text-muted" style={{ fontSize: "0.72rem" }}>
                          RASIO
                        </div>
                        <div className="fw-bold text-primary">1:{rasio}</div>
                      </div>
                    </div>

                    {/* Badge Negeri vs Swasta */}
                    <div className="d-flex gap-1 mt-3 pt-2 border-top">
                      <span className="badge bg-light text-secondary border flex-grow-1 text-center py-1">
                        {e.public_schools || 0} Negeri
                      </span>
                      <span className="badge bg-light text-secondary border flex-grow-1 text-center py-1">
                        {e.private_schools || 0} Swasta
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. TABEL DATA RESMI YANG DIPERCANTIK (ELEVATED MODERN TABLE) */}
      {(modeTampilan === "tabel" || modeTampilan === "gabungan") && (
        <div>
          <div className="wadah-tabel-geser shadow-sm">
            <table className="table align-middle mb-0 table-hover tabel-statistik-modern">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "24%" }}>
                    Jenjang Pendidikan
                  </th>
                  <th scope="col" className="text-end">
                    Negeri
                  </th>
                  <th scope="col" className="text-end">
                    Swasta
                  </th>
                  <th scope="col" className="text-end">
                    Jumlah Sekolah
                  </th>
                  <th scope="col" className="text-end">
                    Guru
                  </th>
                  <th scope="col" className="text-end">
                    Murid
                  </th>
                  <th scope="col" className="text-end">
                    Rasio Murid/Guru
                  </th>
                </tr>
              </thead>
              <tbody>
                {educationStats.map((e) => {
                  const totalSekolah = (e.public_schools || 0) + (e.private_schools || 0);
                  const info = INFO_JENJANG[e.level] || {
                    nama: e.level,
                    ikon: "🏫",
                    warna: "#666",
                  };
                  const rasio = e.teachers > 0 ? (e.students / e.teachers).toFixed(1) : "-";

                  return (
                    <tr key={e.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span
                            className="ikon-tabel-jenjang"
                            style={{ color: info.warna }}
                            aria-hidden="true"
                          >
                            {info.ikon}
                          </span>
                          <div>
                            <span className="fw-bold me-1">{e.level}</span>
                            <span className="small text-muted d-none d-sm-inline">
                              ({info.nama})
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-end text-muted">{formatAngka(e.public_schools || 0)}</td>
                      <td className="text-end text-muted">{formatAngka(e.private_schools || 0)}</td>
                      <td className="text-end">
                        <span className="badge rounded-pill px-2 py-1 bg-light text-dark border fw-bold">
                          {formatAngka(totalSekolah)}
                        </span>
                      </td>
                      <td className="text-end fw-medium">{formatAngka(e.teachers || 0)}</td>
                      <td className="text-end fw-bold" style={{ color: "var(--merah)" }}>
                        {formatAngka(e.students || 0)}
                      </td>
                      <td className="text-end">
                        <span className="badge bg-success-subtle text-success border">
                          1 : {rasio}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total Kecamatan Tomohon Timur</td>
                  <td className="text-end">{formatAngka(ringkasan.totalNegeri)}</td>
                  <td className="text-end">{formatAngka(ringkasan.totalSwasta)}</td>
                  <td className="text-end fw-bold" style={{ color: "var(--merah)" }}>
                    {formatAngka(ringkasan.totalSekolah)}
                  </td>
                  <td className="text-end fw-bold">{formatAngka(ringkasan.totalGuru)}</td>
                  <td
                    className="text-end fw-bold fs-6"
                    style={{ color: "var(--merah)" }}
                  >
                    {formatAngka(ringkasan.totalMurid)}
                  </td>
                  <td className="text-end fw-bold text-success">
                    1 : {ringkasan.rasioMuridGuru}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="small text-muted mt-2 mb-0">
            * Data sekolah, guru, dan murid berdasarkan tahun ajaran resmi BPS Kota Tomohon. Tabel dapat digeser pada layar kecil.
          </p>
        </div>
      )}
    </section>
  );
}
