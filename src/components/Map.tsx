import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import Map from "@arcgis/core/Map";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
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

        const polyline = new Graphic({
          symbol: new SimpleLineSymbol({
            color: "red",
          }),
          geometry: new Polyline({
            paths: [
              [
                [108.2214, 16.0704],
                [108.2214, 16.07],
              ],
            ],
          }),
        });
        mapView.graphics.add(polyline);

        const polygon = new Graphic({
          symbol: new SimpleFillSymbol({
            color: "yellow",
          }),
          geometry: new Polygon({
            rings: [
              [
                [108.22154000401497, 16.070185525486245],
                [108.22178274393085, 16.070104337457497],
                [108.2217988371849, 16.07040589282581],
                [108.22147294878961, 16.070416202402964],
                [108.22154000401497, 16.070185525486245],
              ],
            ],
          }),
        });
        mapView.graphics.add(polygon);
      };

      addGraphic();
    }
  }, [mapRef]);
  return <div ref={mapRef} className="h-[calc(100vh_-_56px)] w-full"></div>;
}

export default MapComponent;
