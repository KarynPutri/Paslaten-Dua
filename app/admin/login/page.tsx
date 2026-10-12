"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Captcha from "../../../components/admin/Captcha";
import Peta3DLoader from "../../../components/Peta3DLoader";
import { LogoMotif } from "../../../components/Ornamen";

const fitur = [
  { teks: "Kelola berita, pengumuman, dan agenda", d: "M4 5h16v14H4zM8 9h8M8 13h5" },
  { teks: "Perbarui profil, statistik, dan fasilitas", d: "M4 20V10M10 20V4M16 20v-7M2 20h20" },
  { teks: "Unggah foto galeri dan data UMKM", d: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6" },
];

const IKON = {
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 3.5-7 8-7s8 3 8 7",
  lock: "M6 11h12v9H6zM8 11V8a4 4 0 018 0v3",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
  eyeOff:
    "M3 3l18 18M10.6 6.2A9.8 9.8 0 0112 6c6 0 10 6 10 6a17 17 0 01-3.2 3.9M6.3 7.6C3.6 9.4 2 12 2 12s4 6 10 6c1.4 0 2.7-.3 3.9-.8",
};

function Ikon({ d, ukuran = 18 }: { d: string; ukuran?: number }) {
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

const ikonInput = {
  position: "absolute" as const,
  left: 14,
  top: "50%",
  transform: "translateY(-50%)",
  color: "var(--teks-redup, #6b5a52)",
  display: "flex",
};

const inputGaya = { paddingLeft: 44, height: 50, borderRadius: 12 };

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lihat, setLihat] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lulus, setLulus] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("habis")) {
      setError("Sesi 60 menit telah berakhir. Silakan login kembali.");
    }
  }, []);

  // Peta 3D hanya dimuat di layar lebar agar HP tidak berat
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const ubah = () => setDesktop(mq.matches);
    ubah();
    mq.addEventListener("change", ubah);
    return () => mq.removeEventListener("change", ubah);
  }, []);

  async function masuk(e: React.FormEvent) {
    e.preventDefault();
    if (!lulus) {
      setError("Selesaikan verifikasi gambar terlebih dahulu.");
      return;
    }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Email atau password salah.");
      setLulus(false);
      setResetKey((k) => k + 1);
      return;
    }
    try {
      localStorage.setItem("admin_login_at", String(Date.now()));
    } catch {}
    router.replace("/admin");
  }

  return (
    <div className="d-flex flex-column flex-lg-row" style={{ minHeight: "100vh" }}>
      {/* Panel kiri */}
      <div
        className="position-relative text-white d-flex flex-column justify-content-between p-4 p-lg-5"
        style={{
          flex: "1 1 50%",
          overflow: "hidden",
          backgroundColor: "var(--merah-tua, #5a1a14)",
        }}
      >
        {desktop && (
          <div style={{ position: "absolute", inset: 0 }}>
            <Peta3DLoader zoom={15} pitch={60} />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(160deg, color-mix(in srgb, var(--merah-tua, #5a1a14) 90%, transparent) 0%, color-mix(in srgb, var(--merah-tua, #5a1a14) 62%, transparent) 55%, rgba(31,21,18,.4) 100%)",
          }}
        />

        <div className="position-relative d-flex flex-column justify-content-between flex-grow-1" style={{ pointerEvents: "none" }}>
          <div className="d-flex align-items-center gap-3">
            <LogoMotif ukuran={56} />
            <div>
              <div className="fw-bold text-uppercase" style={{ letterSpacing: ".04em", lineHeight: 1.2 }}>
                Kelurahan Paslaten Dua
              </div>
              <div className="small text-uppercase" style={{ letterSpacing: ".14em", opacity: 0.8 }}>
                Kecamatan Tomohon Timur · Kota Tomohon
              </div>
            </div>
          </div>

          <div className="d-none d-lg-block my-5">
            <h1 className="fw-bold mb-3" style={{ fontSize: "2.8rem", lineHeight: 1.15 }}>
              Kelola Website
              <br />
              <span style={{ color: "var(--emas-muda, #e8c97a)" }}>Paslaten Dua</span>
            </h1>
            <p className="mb-4" style={{ maxWidth: 440, opacity: 0.85 }}>
              Panel pengelolaan konten website resmi Kelurahan Paslaten Dua, Kecamatan Tomohon Timur.
            </p>
            <div className="d-flex flex-column gap-3">
              {fitur.map((f) => (
                <div className="d-flex align-items-center gap-3" key={f.teks}>
                  <span
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.22)",
                    }}
                  >
                    <Ikon d={f.d} />
                  </span>
                  <span>{f.teks}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="d-none d-lg-block small" style={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} KKT UNSRAT 149 Paslaten Dua
          </div>
        </div>
      </div>

      {/* Panel kanan */}
      <div
        className="d-flex align-items-center justify-content-center p-4 p-lg-5"
        style={{ flex: "1 1 50%" }}
      >
        <form onSubmit={masuk} style={{ width: "100%", maxWidth: 440 }}>
          <div
            className="small fw-bold text-uppercase mb-3 d-flex align-items-center gap-2"
            style={{ letterSpacing: ".16em", color: "var(--merah, #9b2c22)" }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--merah, #9b2c22)" }} />
            Portal Admin
          </div>
          <h2 className="fw-bold mb-1" style={{ color: "var(--teks, #1f1512)" }}>Selamat Datang</h2>
          <p className="mb-4" style={{ color: "var(--teks-redup, #6b5a52)" }}>
            Masuk untuk mengelola konten website kelurahan.
          </p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <div className="position-relative">
              <span style={ikonInput}><Ikon d={IKON.user} /></span>
              <input
                type="email"
                className="form-control"
                style={inputGaya}
                placeholder="Masukkan email admin"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="position-relative">
              <span style={ikonInput}><Ikon d={IKON.lock} /></span>
              <input
                type={lihat ? "text" : "password"}
                className="form-control"
                style={{ ...inputGaya, paddingRight: 46 }}
                placeholder="Masukkan password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setLihat((v) => !v)}
                aria-label={lihat ? "Sembunyikan password" : "Tampilkan password"}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "none",
                  color: "var(--teks-redup, #6b5a52)",
                  display: "flex",
                }}
              >
                <Ikon d={lihat ? IKON.eyeOff : IKON.eye} />
              </button>
            </div>
          </div>

          <div className="mb-3">
            <Captcha resetKey={resetKey} onChange={setLulus} />
          </div>

          <button
            type="submit"
            className="w-100 fw-semibold text-white border-0"
            disabled={loading || !lulus}
            style={{
              height: 52,
              borderRadius: 12,
              background: "linear-gradient(90deg, var(--merah-tua, #6b1d17), var(--merah, #9b2c22))",
              opacity: loading || !lulus ? 0.6 : 1,
            }}
          >
            {loading ? "Masuk..." : "Masuk ke Sistem"}
          </button>

          <div
            className="mt-4 p-3 small"
            style={{
              border: "1px solid var(--emas-muda, #e8c97a)",
              borderRadius: 12,
              background: "rgba(255,255,255,0.6)",
              color: "var(--teks, #1f1512)",
            }}
          >
            <div className="fw-bold text-uppercase mb-2" style={{ letterSpacing: ".08em", color: "var(--merah, #9b2c22)" }}>
              Informasi Login
            </div>
            <div className="mb-1">Hanya admin terdaftar yang dapat masuk.</div>
            <div className="mb-1">Selesaikan verifikasi gambar sebelum masuk.</div>
            <div>Sesi login berlaku 60 menit, setelah itu perlu login ulang.</div>
          </div>

          <div className="text-center mt-3">
            <Link href="/" className="small fw-semibold">← Kembali ke website</Link>
          </div>
        </form>
      </div>
    </div>
  );
}