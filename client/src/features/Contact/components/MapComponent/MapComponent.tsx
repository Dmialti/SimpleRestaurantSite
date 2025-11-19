import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { darkMapStyle } from "./darkMapStyle"; // or inline

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
};

const center = {
  lat: 50.06433577076769,
  lng: 14.435589504771812,
};

const MapComponent: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
        options={{
          styles: darkMapStyle,
          disableDefaultUI: false,
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
