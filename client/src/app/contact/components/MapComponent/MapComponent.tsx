"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { darkMapStyle } from "./darkMapStyle";

const center = {
  lat: 50.06433577076769,
  lng: 14.435589504771812,
};

export default function MapComponent() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY || ""}>
      <div
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Map
          defaultCenter={center}
          defaultZoom={14}
          mapId={process.env.NEXT_PUBLIC_MAP_ID || ""}
          colorScheme="DARK"
          disableDefaultUI={true}
        >
          <AdvancedMarker position={center}>
            <Pin
              background={"#D30000"}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}
