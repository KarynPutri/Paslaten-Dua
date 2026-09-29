import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "../../../components/PageHeader";
import { supabase } from "../../../lib/supabase";
import { tanggalIndo } from "../../../lib/format";

export const dynamic = "force-dynamic";

export default async function DetailBerita({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: item } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!item) notFound();

  return (
    <>
      <PageHeader judul={item.title} deskripsi={tanggalIndo(item.published_at)} />
      <div className="container py-5" style={{ maxWidth: "800px" }}>
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.title}
            className="mb-4"
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "16px" }}
          />
        ) : (
          <div className="mb-4" style={{ backgroundColor: "#dcedfb", height: "280px", borderRadius: "16px" }} />
        )}
        <p style={{ lineHeight: 1.8, whiteSpace: "pre-line" }}>{item.content}</p>
        <Link href="/berita">← Kembali ke Berita</Link>
      </div>
    </>
  );
}