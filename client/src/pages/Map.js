import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/geolocation');
        setLocation(response.data);
      } catch (error) {
        console.error('Error fetching geolocation data:', error);
      }
    };

    fetchLocation();
  }, []);

  if (!location) {
    return <div>Loading map...</div>;
  }

  const { latitude, longitude, ip } = location;

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <strong>IP Address:</strong> {ip}
            <br />
            <strong>Coordinates:</strong> {latitude}, {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
