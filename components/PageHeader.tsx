export default function PageHeader({
  judul,
  deskripsi,
}: {
  judul: string;
  deskripsi?: string;
}) {
  return (
    <section style={{ backgroundColor: "#dcedfb" }} className="py-5">
      <div className="container">
        <h1 className="fw-bold mb-2">{judul}</h1>
        {deskripsi && <p className="mb-0" style={{ color: "#4a6785" }}>{deskripsi}</p>}
      </div>
    </section>
  );
}