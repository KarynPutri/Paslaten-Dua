"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Popup,
  LayersControl,
  ScaleControl,
} from "react-leaflet";
import { LOKASI_PASLATEN_DUA as L } from "../lib/lokasi";

export default function PetaLeaflet({
  tinggi = 480,
  alamat,
}: {
  tinggi?: number;
  alamat?: string | null;
}) {
  const pusat: [number, number] = [L.lat, L.lng];

  return (
    <MapContainer
      center={pusat}
      zoom={L.zoom}
      scrollWheelZoom={false}
      style={{ height: tinggi, width: "100%", borderRadius: 16 }}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Peta Jalan">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satelit">
          <TileLayer
            attribution="Tiles &copy; Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <Circle
        center={pusat}
        radius={450}
        pathOptions={{ color: "#5aa0d8", fillColor: "#5aa0d8", fillOpacity: 0.12, weight: 1 }}
      />
      <CircleMarker
        center={pusat}
        radius={11}
        pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#1e3a5f", fillOpacity: 1 }}
      >
        <Popup>
          <strong>{L.nama}</strong>
          <br />
          {alamat || L.wilayah}
        </Popup>
      </CircleMarker>

      <ScaleControl position="bottomleft" imperial={false} />
    </MapContainer>
  );
}
