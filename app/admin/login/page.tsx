"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Captcha from "../../../components/admin/Captcha";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lulus, setLulus] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("habis")) {
      setError("Sesi 60 menit telah berakhir. Silakan login kembali.");
    }
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
    <div
      className="d-flex align-items-center justify-content-center px-3 py-4"
      style={{ minHeight: "100vh" }}
    >
      <form onSubmit={masuk} className="kartu-lembut p-4" style={{ width: "100%", maxWidth: 400 }}>
        <h1 className="h4 fw-bold mb-1">Login Admin</h1>
        <p className="small mb-4">Kelurahan Paslaten Dua</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Captcha resetKey={resetKey} onChange={setLulus} />

        <button type="submit" className="btn btn-primary w-100" disabled={loading || !lulus}>
          {loading ? "Masuk..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}