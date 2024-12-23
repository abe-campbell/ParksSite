import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const DefaultIcon = L.icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [40, 40]
  });



const ParkMarker = ({ parks, onMarkerClick }) => {
  return parks.map((park, index) => (
      <Marker
          key={index}
          position={[park.lat, park.lng]}
          eventHandlers={{
              click: () => onMarkerClick(park),
          }}
          icon = { DefaultIcon }
      />
  ));
};

export default ParkMarker

