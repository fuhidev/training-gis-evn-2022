import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import MapView from "@arcgis/core/views/MapView";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import { useEffect, useRef, useState } from "react";

import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
interface Props {
  view: MapView;
}

const MapChecking: React.FC<Props> = ({ view }) => {
  const sketch = useRef<SketchViewModel>();
  const [area, setArea] = useState(0);
  const [lstIllegal, setLstIllegal] = useState<__esri.Graphic[]>([]);
  useEffect(() => {
    sketch.current = new SketchViewModel({
      view,
      layer: new GraphicsLayer({ listMode: "hide" }),
    });

    sketch.current.on("create", async (event) => {
      const geometry = event.graphic.geometry as __esri.Polygon;
      const area = geometryEngine.geodesicArea(geometry, "square-kilometers");
      setArea(area);
      if (event.state === "complete") {
        const graphic = event.graphic;
        const geometry = graphic.geometry as __esri.Polygon;
        const area = geometryEngine.geodesicArea(geometry, "square-kilometers");
        if (area <= 10) {
          graphic.symbol = new SimpleFillSymbol({
            color: "rgba(250, 177, 160, 0.7)",
          });
          view.graphics.add(graphic);
          const cotDienLayer = view.map.findLayerById(
              "cotDien"
            ) as __esri.FeatureLayer,
            duongDayLayer = view.map.findLayerById(
              "duongDay"
            ) as __esri.FeatureLayer;

          const cotDienFeatures = await cotDienLayer.queryFeatures({
            geometry: geometry,
            returnGeometry: true,
            outSpatialReference: view.spatialReference,
          });
          const dayDienFeatures = await duongDayLayer.queryFeatures({
            geometry: geometry,
            returnGeometry: true,
            outSpatialReference: view.spatialReference,
            outFields: ["MaXuatTuyen"],
          });

          const lstIllegal: __esri.Graphic[] = [];

          if (
            dayDienFeatures.features.length &&
            cotDienFeatures.features.length
          ) {
            for (const dayDienFeature of dayDienFeatures.features) {
              const polyline = geometryEngine.intersect(
                dayDienFeature.geometry,
                geometry
              ) as __esri.Polyline;

              for (
                let pointIndex = 0;
                pointIndex < polyline.paths[0].length;
                pointIndex++
              ) {
                const point = polyline.getPoint(0, pointIndex);
                view.graphics.add(
                  new Graphic({
                    geometry: point,
                    symbol: new SimpleMarkerSymbol(),
                  })
                );
                if (point) {
                  const illegal = cotDienFeatures.features.some(
                    (cotDienFeature) =>
                      !geometryEngine.intersects(point, cotDienFeature.geometry)
                  );
                  if (illegal) {
                    lstIllegal.push(dayDienFeature);
                    break;
                  }
                }
              }
            }
          }

          setLstIllegal(lstIllegal);
        } else {
          alert("Chỉ hỗ trợ kiểm tra trong khu vực 10km2");
        }
      }
    });
  });

  const draw = () => {
    if (sketch.current) {
      sketch.current.create("polygon");
      view.graphics.removeAll();
      setArea(0);
      setLstIllegal([]);
    }
  };
  return (
    <div className="flex flex-col">
      <button
        className="bg-sky-500 text-white px-4 py-2 rounded text-sm hover:bg-slate-500"
        onClick={draw}
      >
        Nhấn vào đây để bắt đầu
      </button>
      <div>Diện tích: {area.toFixed(3)} km2</div>

      <div>
        <span>Danh sách dây điện vi phạm</span>
        <ul>
          {lstIllegal.map((graphic) => (
            <li key={graphic.getAttribute("MaXuatTuyen")}>
              {graphic.getAttribute("MaXuatTuyen")}
            </li>
          ))}
          {lstIllegal.length === 0 && <li>Không có tuyến dây vi phạm</li>}
        </ul>
      </div>
    </div>
  );
};

export default MapChecking;
