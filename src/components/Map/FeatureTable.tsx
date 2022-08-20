import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import FeatureTable from "@arcgis/core/widgets/FeatureTable";
import { useEffect, useRef, useState } from "react";

interface Props {
  view: MapView;
  layer: FeatureLayer;
}

const FeatureTableComponent: React.FC<Props> = ({ view, layer }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(true);
  let featureTable = useRef<FeatureTable>();
  useEffect(() => {
    if (divRef.current) {
      featureTable.current = new FeatureTable({
        container: divRef.current,
        view,
        layer,
      });

      view.watch("stationary", (stationary) => {
        if (!stationary) {
          if (featureTable.current)
            featureTable.current.filterGeometry = view.extent;
        }
      });
    }
  }, []);

  useEffect(() => {
    if (featureTable.current) {
      featureTable.current.layer = layer;
    }
  }, [layer]);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="absolute bottom-0 left-0 w-full ">
      <div className="flex justify-center">
        <div
          className="bg-white px-4 rounded-t opacity-70 hover:opacity-100 cursor-pointer"
          onClick={toggle}
        >
          <i className={"fa-solid fa-chevron-" + (isOpen ? "down" : "up")}></i>
        </div>
      </div>
      <div className={"w-full h-[300px] bg-white " + (isOpen ? "" : "hidden")}>
        <div ref={divRef}></div>
      </div>
    </div>
  );
};

export default FeatureTableComponent;
