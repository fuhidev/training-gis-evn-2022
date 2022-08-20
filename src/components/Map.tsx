import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { useEffect, useRef, useState } from "react";
import CoordinateConverting from "./CoordinateConverting";
import FeatureTableComponent from "./Map/FeatureTable";
function MapComponent() {
  const mapRef = useRef(null);
  const [mapView, setMapView] = useState<MapView | null>(null);
  const [cotDienLayer, setCotDienlayer] = useState<FeatureLayer | null>(null);
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
      mapView.when(() => {
        const cotDienLayer = new FeatureLayer({
          url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/6",
          title: "Cột điện",
        });
        mapView.map.add(cotDienLayer);
        setCotDienlayer(cotDienLayer);
        setMapView(mapView);
      });
    }
  }, [mapRef]);
  return (
    <div ref={mapRef} className="h-[calc(100vh_-_56px)] w-full">
      {mapView && <CoordinateConverting view={mapView} />}
      {mapView && cotDienLayer && (
        <FeatureTableComponent view={mapView} layer={cotDienLayer} />
      )}
    </div>
  );
}

export default MapComponent;
