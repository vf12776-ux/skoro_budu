import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Фикс иконок Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const Map = ({ center, markers = [], onLocationSelect }) => {
  const defaultCenter = center || [55.7558, 37.6173]; // Москва
  const [position, setPosition] = useState(defaultCenter);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        console.log('Клик по карте:', lat, lng);
        onLocationSelect && onLocationSelect(lat, lng);
      },
    });
    return onLocationSelect ? (
      <Marker position={position}>
        <Popup>Выбрано место</Popup>
      </Marker>
    ) : null;
  };

  return (
    <MapContainer center={defaultCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      {markers.map((m, i) => (
        <Marker key={i} position={[m.lat, m.lng]}>
          <Popup>{m.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};