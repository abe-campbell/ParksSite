'use client';

import dynamic from 'next/dynamic';
import React, { useState, memo, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import parks from './components/parkinfo.json';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';

// Dynamically import components with no server-side rendering
const MapContainerNoSSR = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayerNoSSR = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const L = dynamic(() => import('leaflet'), { ssr: false });
const ParkInfo = dynamic(() => import('./components/parks'), { ssr: false });
const ParkMarker = dynamic(() => import('./components/markers'), { ssr: false });


const ParkMarkers = memo(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPark, setSelectedPark] = useState(null);
  const map = useMap();

  const handleMarkerClick = (park) => {
    setSelectedPark(park);
    setSidebarOpen(true);
  };

  useEffect(() => {
    if (sidebarOpen) {
      map.scrollWheelZoom.disable();
      map.dragging.disable(); // Disable dragging
    } else {
      map.scrollWheelZoom.enable();
      map.dragging.enable(); // Enable dragging
    }
  
    return () => {
      map.scrollWheelZoom.enable();
      map.dragging.enable(); // Ensure re-enabling on unmount
    };
  }, [sidebarOpen, map]);

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
});

const Main = memo(() => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainerNoSSR
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
        <TileLayerNoSSR
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <ParkMarkers />
      </MapContainerNoSSR>
    </div>
  );
});


export default Main;

