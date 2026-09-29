"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "date" | "image" | "lines" | "select";
  options?: string[];
  required?: boolean;
  help?: string;
};

type Props = {
  table: string;
  title: string;
  fields: Field[];
  columns: { name: string; label: string }[];
  orderBy?: string;
  ascending?: boolean;
  folder?: string;
  single?: boolean;
  defaults?: Record<string, any>;
};

function getNested(obj: any, path: string) {
  return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}

function setNested(obj: any, path: string, value: any): any {
  const [head, ...rest] = path.split(".");
  if (rest.length === 0) return { ...obj, [head]: value };
  return { ...obj, [head]: setNested(obj?.[head] ?? {}, rest.join("."), value) };
}

function tampil(v: any) {
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "string") {
    if (/^\d{4}-\d{2}-\d{2}T/.test(v)) return v.slice(0, 10);
    return v.length > 60 ? v.slice(0, 60) + "…" : v;
  }
  return v ?? "-";
}

export default function CrudManager({
  table,
  title,
  fields,
  columns,
  orderBy = "created_at",
  ascending = false,
  folder = "umum",
  single = false,
  defaults = {},
}: Props) {
  const [rows, setRows] = useState<any[]>([]);
  const [form, setForm] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pesan, setPesan] = useState<{ tipe: string; teks: string } | null>(null);

  const kolomGambar = fields.find((f) => f.type === "image")?.name;

  async function load() {
    setLoading(true);
    if (single) {
      const { data, error } = await supabase.from(table).select("*").eq("id", 1).maybeSingle();
      if (error) setPesan({ tipe: "danger", teks: error.message });
      setForm(data);
    } else {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order(orderBy, { ascending });
      if (error) setPesan({ tipe: "danger", teks: error.message });
      setRows(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function ubah(name: string, value: any) {
    setForm((f: any) => setNested(f, name, value));
  }

  async function unggah(name: string, file?: File) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setPesan({ tipe: "danger", teks: "Ukuran foto maksimal 5 MB." });
      return;
    }
    setUploading(true);
    const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "-")}`;
    const { error } = await supabase.storage.from("website-images").upload(path, file);
    if (error) {
      setPesan({ tipe: "danger", teks: error.message });
    } else {
      const { data } = supabase.storage.from("website-images").getPublicUrl(path);
      ubah(name, data.publicUrl);
    }
    setUploading(false);
  }

  async function simpan(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setPesan(null);

    const payload: any = { ...form };
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;
    for (const f of fields) {
      if (f.type === "lines")
        payload[f.name] = (payload[f.name] ?? []).map((s: string) => s.trim()).filter(Boolean);
      if (f.type === "date" && !payload[f.name]) payload[f.name] = null;
    }
    if (single) payload.updated_at = new Date().toISOString();

    const editId = single ? 1 : form.id;
    const res =
      editId != null
        ? await supabase.from(table).update(payload).eq("id", editId).select()
        : await supabase.from(table).insert(payload).select();

    setSaving(false);
    if (res.error || !res.data?.length) {
      setPesan({
        tipe: "danger",
        teks: res.error?.message ?? "Gagal menyimpan. Pastikan sudah login sebagai admin.",
      });
      return;
    }
    setPesan({ tipe: "success", teks: "Tersimpan." });
    if (!single) setForm(null);
    load();
  }

  async function hapus(r: any) {
    if (!confirm("Hapus data ini?")) return;
    const { data, error } = await supabase.from(table).delete().eq("id", r.id).select();
    if (error || !data?.length) {
      setPesan({ tipe: "danger", teks: error?.message ?? "Gagal menghapus. Pastikan sudah login." });
      return;
    }
    setPesan({ tipe: "success", teks: "Data dihapus." });
    load();
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 fw-bold mb-0">{title}</h1>
        {!single && !form && (
          <button className="btn btn-primary" onClick={() => setForm({ ...defaults })}>
            + Tambah
          </button>
        )}
      </div>

      {pesan && <div className={`alert alert-${pesan.tipe}`}>{pesan.teks}</div>}
      {loading && <p>Memuat...</p>}

      {form && (
        <form onSubmit={simpan} className="kartu-lembut p-4 mb-4">
          {fields.map((f) => {
            const v = getNested(form, f.name);
            return (
              <div className="mb-3" key={f.name}>
                <label className="form-label fw-semibold">{f.label}</label>

                {f.type === "textarea" ? (
                  <textarea
                    className="form-control"
                    rows={6}
                    required={f.required}
                    value={v ?? ""}
                    onChange={(e) => ubah(f.name, e.target.value)}
                  />
                ) : f.type === "lines" ? (
                  <textarea
                    className="form-control"
                    rows={5}
                    value={(v ?? []).join("\n")}
                    onChange={(e) => ubah(f.name, e.target.value.split("\n"))}
                  />
                ) : f.type === "date" ? (
                  <input
                    type="date"
                    className="form-control"
                    required={f.required}
                    value={v ? String(v).slice(0, 10) : ""}
                    onChange={(e) => ubah(f.name, e.target.value)}
                  />
                ) : f.type === "select" ? (
                  <select
                    className="form-select"
                    value={v ?? ""}
                    onChange={(e) => ubah(f.name, e.target.value)}
                  >
                    <option value="">Pilih...</option>
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : f.type === "image" ? (
                  <div>
                    {v && (
                      <img
                        src={v}
                        alt=""
                        className="d-block mb-2"
                        style={{ height: 120, borderRadius: 12, objectFit: "cover" }}
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => unggah(f.name, e.target.files?.[0])}
                    />
                    {uploading && <div className="form-text">Mengunggah foto...</div>}
                  </div>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    required={f.required}
                    value={v ?? ""}
                    onChange={(e) => ubah(f.name, e.target.value)}
                  />
                )}

                {f.help && <div className="form-text">{f.help}</div>}
              </div>
            );
          })}

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={saving || uploading}>
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
            {!single && (
              <button type="button" className="btn btn-outline-secondary" onClick={() => setForm(null)}>
                Batal
              </button>
            )}
          </div>
        </form>
      )}

      {!single && (
        <div className="kartu-lembut table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                {kolomGambar && <th style={{ width: 70 }}></th>}
                {columns.map((c) => (
                  <th key={c.name}>{c.label}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 2} className="text-center py-4">
                    Belum ada data.
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr key={r.id}>
                  {kolomGambar && (
                    <td>
                      {r[kolomGambar] ? (
                        <img
                          src={r[kolomGambar]}
                          alt=""
                          style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8 }}
                        />
                      ) : (
                        <div style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: "#dcedfb" }} />
                      )}
                    </td>
                  )}
                  {columns.map((c) => (
                    <td key={c.name}>{tampil(r[c.name])}</td>
                  ))}
                  <td className="text-end text-nowrap">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => {
                        setPesan(null);
                        setForm({ ...r });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => hapus(r)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}