'use client';

import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapUsers = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const defaultCenter: [number, number] = [0, 0];
  const defaultZoom = 2;

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {users.map((user) => (
          <Marker
            key={user.id}
            position={[
              parseFloat(user.address.geo.lat),
              parseFloat(user.address.geo.lng)
            ]}
            icon={icon}
          >
            <Popup>
              <div className="p-2">
                <h2 className="font-bold text-sm mb-2">{user.name}</h2>
                <p className="text-xs mb-1">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-xs mb-1">
                  <span className="font-semibold">Company:</span> {user.company.name}
                </p>
                <p className="text-xs mb-1">
                  <span className="font-semibold">City:</span> {user.address.city}
                </p>
                <p className="text-xs">
                  <span className="font-semibold">Street:</span> {user.address.street}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapUsers;