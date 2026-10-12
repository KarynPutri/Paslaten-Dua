"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LOKASI_PASLATEN_DUA } from "../lib/lokasi";

export type Peta3DProps = {
  zoom?: number;
  pitch?: number;
  putar?: boolean;
  interaktif?: boolean;
};

// Deteksi ketersediaan WebGL2 secara aman
function cekDukunganWebGL2(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("experimental-webgl2");
    return Boolean(window.WebGL2RenderingContext && gl);
  } catch {
    return false;
  }
}

export default function Peta3D({
  zoom = 14.5,
  pitch = 65,
  putar = true,
  interaktif = false,
}: Peta3DProps) {
  const el = useRef<HTMLDivElement>(null);
  const [dukung3D, setDukung3D] = useState<boolean>(true);

  useEffect(() => {
    if (!el.current) return;

    // Cek apakah browser mendukung WebGL2 sebelum memuat MapLibre 3D
    if (!cekDukunganWebGL2()) {
      setDukung3D(false);
      return;
    }

    if (typeof maplibregl.setWorkerUrl === "function") {
      maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
    }

    let map: maplibregl.Map | null = null;
    let frame = 0;

    try {
      map = new maplibregl.Map({
        container: el.current,
        center: [LOKASI_PASLATEN_DUA.lng, LOKASI_PASLATEN_DUA.lat],
        zoom,
        pitch,
        bearing: -20,
        maxPitch: 80,
        interactive: interaktif,
        attributionControl: false,
        style: {
          version: 8,
          sources: {
            citra: {
              type: "raster",
              tiles: [
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
              maxzoom: 19,
              attribution: "Citra © Esri, Maxar, Earthstar Geographics",
            },
            dem: {
              type: "raster-dem",
              tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
              encoding: "terrarium",
              tileSize: 256,
              maxzoom: 15,
              attribution: "Terrain: Mapzen, AWS Terrain Tiles",
            },
          },
          layers: [{ id: "citra", type: "raster", source: "citra" }],
          terrain: { source: "dem", exaggeration: 1.3 },
        },
      });

      map.on("error", (e) => {
        // Redam pesan error GPU/WebGL agar tidak memicu overlay crash Next.js
        console.warn("MapLibre GL Notice:", e.error?.message || e);
      });

      map.addControl(new maplibregl.AttributionControl({ compact: true }), "top-right");

      if (interaktif) {
        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-left");
      }

      let bearing = -20;
      const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const putarPeta = () => {
        if (!map) return;
        bearing += 0.04;
        map.setBearing(bearing);
        frame = requestAnimationFrame(putarPeta);
      };

      if (putar && !kurangiGerak) {
        map.on("load", () => {
          frame = requestAnimationFrame(putarPeta);
        });
      }
    } catch (err) {
      console.warn("WebGL2 GPU tidak dapat diinisialisasi pada peramban ini, beralih ke visual fallback:", err);
      setDukung3D(false);
      return;
    }

    return () => {
      cancelAnimationFrame(frame);
      if (map) {
        try {
          map.remove();
        } catch {
          // Abaikan error saat penghapusan instans peta
        }
      }
    };
  }, [zoom, pitch, putar, interaktif]);

  if (!dukung3D) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#1f1512",
          backgroundImage:
            "radial-gradient(ellipse at 70% 30%, rgba(200, 150, 46, 0.2), transparent 60%), linear-gradient(135deg, #2b1210 0%, #170d0b 100%)",
          backgroundSize: "cover",
        }}
      />
    );
  }

  return <div ref={el} style={{ width: "100%", height: "100%", backgroundColor: "#1f1512" }} />;
}