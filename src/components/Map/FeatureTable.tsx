import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import FeatureTable from "@arcgis/core/widgets/FeatureTable";
import { useEffect, useRef } from "react";

interface Props {
  view: MapView;
  layer: FeatureLayer;
}

const FeatureTableComponent: React.FC<Props> = ({ view, layer }) => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (divRef.current) {
      const featureTable = new FeatureTable({
        container: divRef.current,
        view,
        layer,
      });
    }
  }, []);
  return (
    <div ref={divRef} className="absolute bottom-0 left-0 h-[300px]"></div>
  );
};

export default FeatureTableComponent;
