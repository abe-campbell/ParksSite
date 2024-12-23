import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';




const ParkMarker = ({ parks, onMarkerClick }) => {
  return parks.map((park, index) => (
      <Marker
          key={index}
          position={[park.lat, park.lng]}
          eventHandlers={{
              click: () => onMarkerClick(park),
          }}
      />
  ));
};

export default ParkMarker

