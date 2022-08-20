import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import Map from "@arcgis/core/Map";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import MapView from "@arcgis/core/views/MapView";
import { useEffect, useRef } from "react";

function MapComponent() {
  const mapRef = useRef(null);

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

      const addGraphic = () => {
        const graphic = new Graphic({
          symbol: new SimpleMarkerSymbol({
            color: "blue",
            size: 14,
            style: "circle",
            outline: new SimpleLineSymbol({
              color: "black",
              width: 0.5,
            }),
          }),
          geometry: new Point({
            longitude: 108.2214,
            latitude: 16.0704,
          }),
          attributes: {
            Field1: "Giá trị Field 1",
            Field2: "Giá trị Field 2",
          },
          popupTemplate: new PopupTemplate({
            content: [
              {
                type: "fields",
                fieldInfos: [{ fieldName: "Field1" }, { fieldName: "Field2" }],
              },
            ],
          }),
        });
        mapView.graphics.add(graphic);
      };

      addGraphic();
    }
  }, [mapRef]);
  return <div ref={mapRef} className="h-[calc(100vh_-_56px)] w-full"></div>;
}

export default MapComponent;
