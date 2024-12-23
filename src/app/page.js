'use client'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import ParkInfo from './components/parks';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import ParkMarker from './components/markers';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import parks from './components/parkinfo.json';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
})

const ParkMarkers = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedPark, setSelectedPark] = useState(null);
  const map = useMap();

  const handleMarkerClick = (park) => {
    setSelectedPark(park);
    setSidebarOpen(true);
  };

  return(
    <>
      <ParkMarker
        parks = {parks}
        onMarkerClick = { handleMarkerClick }
      />
      <ParkInfo
        park = { selectedPark }
        onClose = {() => setSidebarOpen(false)}
        isOpen = { sidebarOpen }
      />
    </>
  );
};

function Main() {


  return(
    <div style={{ height: '100vh', width: '100%' }}>
    <MapContainer
        center={[35.307, -80.735]}
        zoom={6.5}
        minZoom={6.5}
        maxZoom={18}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
    >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
      <ParkMarkers/>
      </MapContainer>
  </div>
    );
}

export default Main;
