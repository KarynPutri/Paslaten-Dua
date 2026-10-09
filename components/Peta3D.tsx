"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LOKASI_PASLATEN_DUA } from "../lib/lokasi";

export type Peta3DProps = {
  zoom?: number;
  pitch?: number;
  putar?: boolean;
  interaktif?: boolean;
};

export default function Peta3D({
  zoom = 14.5,
  pitch = 65,
  putar = true,
  interaktif = false,
}: Peta3DProps) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const map = new maplibregl.Map({
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

    map.addControl(new maplibregl.AttributionControl({ compact: true }), "top-right");

    if (interaktif) {
      map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-left");
    }

    let frame = 0;
    let bearing = -20;
    const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const putarPeta = () => {
      bearing += 0.04;
      map.setBearing(bearing);
      frame = requestAnimationFrame(putarPeta);
    };
    if (putar && !kurangiGerak) {
      map.on("load", () => {
        frame = requestAnimationFrame(putarPeta);
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      map.remove();
    };
  }, [zoom, pitch, putar, interaktif]);

  return <div ref={el} style={{ width: "100%", height: "100%", backgroundColor: "#1f1512" }} />;
}