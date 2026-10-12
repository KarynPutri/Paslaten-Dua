export default function LogoSitus({ ukuran = 40 }: { ukuran?: number }) {
  return (
    <img
      src="/logo-tomohon.png"
      alt="Logo Kota Tomohon"
      width={ukuran}
      height={ukuran}
      style={{ objectFit: "contain", display: "block" }}
    />
  );
}