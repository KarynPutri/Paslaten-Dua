import PageHeader from "../../components/PageHeader";
import { layanan } from "../../data/dummy";

export default function Pelayanan() {
  return (
    <>
      <PageHeader
        judul="Pelayanan"
        deskripsi="Informasi persyaratan dan prosedur layanan kelurahan"
      />
      <div className="container py-5" style={{ maxWidth: "900px" }}>
        {layanan.map((l) => (
          <div className="kartu-lembut p-4 mb-4" key={l.id}>
            <h2 className="h4 fw-bold mb-3">{l.nama}</h2>
            <div className="row g-4">
              <div className="col-md-5">
                <h3 className="h6 fw-bold" style={{ color: "#5aa0d8" }}>Persyaratan</h3>
                <ul className="mb-0">
                  {l.persyaratan.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
              <div className="col-md-7">
                <h3 className="h6 fw-bold" style={{ color: "#5aa0d8" }}>Prosedur</h3>
                <ol className="mb-0">
                  {l.prosedur.map((p) => <li key={p}>{p}</li>)}
                </ol>
              </div>
            </div>
            <hr />
            <p className="small mb-0" style={{ color: "#4a6785" }}>
              Jam pelayanan: {l.jam}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}