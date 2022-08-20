import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { useEffect, useRef, useState } from "react";
import CoordinateConverting from "./CoordinateConverting";

function MapComponent() {
  const mapRef = useRef(null);
  const [mapView, setMapView] = useState<MapView | null>(null);
  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        basemap: "osm",
      });
      let mapView = new MapView({
        map,
        container: mapRef.current,
        center: [108.2214, 16.0704],
        scale: 100000,
      });
      setMapView(mapView);
    }
  }, [mapRef]);
  return (
    <div ref={mapRef} className="h-[calc(100vh_-_56px)] w-full">
      {mapView && <CoordinateConverting view={mapView} />}
    </div>
  );
}

export default MapComponent;
