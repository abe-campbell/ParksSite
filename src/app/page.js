'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import parks from './components/parkinfo.json';

// Dynamically import components with no server-side rendering
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const useMap = dynamic(
  () => import('react-leaflet').then((mod) => mod.useMap),
  { ssr: false }
);

const L = dynamic(() => import('leaflet'), { ssr: false });
const ParkInfo = dynamic(() => import('./components/parks'), { ssr: false });
const ParkMarker = dynamic(() => import('./components/markers'), { ssr: false });

// Handle Leaflet marker icons
if (typeof window !== 'undefined') {
  const { Icon } = require('leaflet');
  const markerIcon2x = require('leaflet/dist/images/marker-icon-2x.png');
  const markerIcon = require('leaflet/dist/images/marker-icon.png');
  const markerShadow = require('leaflet/dist/images/marker-shadow.png');

  delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
  });
}

const ParkMarkers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPark, setSelectedPark] = useState(null);
  const map = useMap();

  const handleMarkerClick = (park) => {
    setSelectedPark(park);
    setSidebarOpen(true);
  };

  return (
    <>
      <ParkMarker parks={parks} onMarkerClick={handleMarkerClick} />
      <ParkInfo
        park={selectedPark}
        onClose={() => setSidebarOpen(false)}
        isOpen={sidebarOpen}
      />
    </>
  );
};

function Main() {
  return (
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
        <ParkMarkers />
      </MapContainer>
    </div>
  );
}

export default Main;

