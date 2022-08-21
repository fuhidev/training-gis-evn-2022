import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { useEffect, useRef, useState } from "react";
import CoordinateConverting from "./CoordinateConverting";
import FeatureTableComponent from "./Map/FeatureTable";
import PanelContainer from "./Map/PanelContainer";
function MapComponent() {
  const mapRef = useRef(null);
  const [mapView, setMapView] = useState<MapView | null>(null);
  const [cotDienLayer, setCotDienlayer] = useState<FeatureLayer | null>(null);
  const [featureTableLayer, setFeatureTableLayer] =
    useState<FeatureLayer | null>(null);
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
          id: "cotDien",
        });
        mapView.map.add(cotDienLayer);
        setCotDienlayer(cotDienLayer);
        const duongDaylayer = new FeatureLayer({
          url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/7",
          title: "Đường dây",
          id: "duongDay",
        });
        mapView.map.add(duongDaylayer);
        setMapView(mapView);
      });
    }
  }, [mapRef]);

  const openFeatureTable = (layer: FeatureLayer) => {
    setFeatureTableLayer(layer);
  };
  return (
    <div className="h-[calc(100vh_-_56px)] w-full relative">
      <div ref={mapRef} className="w-full h-full">
        {mapView && <CoordinateConverting view={mapView} />}
        {mapView && featureTableLayer && (
          <FeatureTableComponent view={mapView} layer={featureTableLayer} />
        )}
      </div>
      {mapView && (
        <PanelContainer view={mapView} openFeatureTable={openFeatureTable} />
      )}
    </div>
  );
}

export default MapComponent;
