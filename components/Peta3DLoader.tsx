"use client";

import dynamic from "next/dynamic";
import type { Peta3DProps } from "./Peta3D";

const Peta3D = dynamic<Peta3DProps>(() => import("./Peta3D"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#1f1512" }} />
  ),
});

export default function Peta3DLoader(props: Peta3DProps) {
  return <Peta3D {...props} />;
}