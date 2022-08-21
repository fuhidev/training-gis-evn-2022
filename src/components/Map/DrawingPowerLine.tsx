import Point from "@arcgis/core/geometry/Point";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import MapView from "@arcgis/core/views/MapView";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import { useEffect, useRef } from "react";

interface Props {
  view: MapView;
}

const DrawingPowerLine: React.FC<Props> = ({ view }) => {
  const sketch = useRef<SketchViewModel>();
  useEffect(() => {
    const layer = new GraphicsLayer({
      listMode: "hide",
    });
    view.map.add(layer);

    const cotDienLayer = view.map.findLayerById(
      "cotDien"
    ) as __esri.FeatureLayer;

    sketch.current = new SketchViewModel({
      view,
      layer,
      snappingOptions: {
        enabled: true,
        featureSources: [{ layer: cotDienLayer, enabled: true }],
      },
    });

    sketch.current.on("create", async (event) => {
      if (event.state === "active" || event.state === "start") {
        if (event.toolEventInfo.type === "vertex-add") {
          const mapPoint = new Point({
            x: (event.toolEventInfo.added as unknown as number[][])[0][0],
            y: (event.toolEventInfo.added as unknown as number[][])[0][1],
            spatialReference: view.spatialReference,
          });
          const screenPoint = view.toScreen(mapPoint);
          const response = await view.hitTest(screenPoint);
          if (response.results.length) {
            const isIntersect = response.results.some(
              (f) => f.layer === cotDienLayer
            );
            if (!isIntersect) {
              sketch.current?.undo();
            }
          }
        }
      }
    });
  }, []);

  const draw = () => {
    if (sketch.current) {
      sketch.current.create("polyline");
    }
  };
  return (
    <div className="flex">
      <button
        className="bg-sky-500 text-white px-4 py-2 rounded text-sm hover:bg-slate-500"
        onClick={draw}
      >
        Nhấn vào đây để Vẽ đường dây
      </button>
    </div>
  );
};

export default DrawingPowerLine;
