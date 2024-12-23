'use client'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import ParkInfo from './components/parks';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import ParkMarker from './components/markers';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import parks from './components/parkinfo.json';
import dynamic from 'next/dynamic';

const MapContainerWithNoSSR = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false } // Disable server-side rendering
);

const TileLayerWithNoSSR = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const ParkMarkersWithNoSSR = dynamic(() => import('./components/ParkMarkers'), { ssr: false });

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
})



function Main() {

  return(
    <div style={{ height: '100vh', width: '100%' }}>
    <MapContainerWithNoSSR
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
        <TileLayerWithNoSSR
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
      <ParkMarkersWithNoSSR/>
      </MapContainerWithNoSSR>
  </div>
    );
}

export default Main;
