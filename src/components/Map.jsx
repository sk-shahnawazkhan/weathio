import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ lat, long, name }) => {
  const position = [lat, long];

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

      <Marker position={position}>
        <Popup className="text-sm text-slate-500 italic">
          📍 {name}, You are here!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
