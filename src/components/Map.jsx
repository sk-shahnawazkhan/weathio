import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const Map = ({ lat, long, name }) => {
  const position = [lat, long];
  const markerIcon = L.icon({
    iconUrl: "/marker-icon.png",
    shadowUrl: "marker-shadow.png",
  });

  return (
    <MapContainer
      center={position}
      key={lat + long}
      zoom={10}
      style={{ height: "100%", width: "100%", minHeight: "300px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={position} icon={markerIcon}>
        <Popup className="text-sm text-slate-500 italic">
          📍 {name}, You are here!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
