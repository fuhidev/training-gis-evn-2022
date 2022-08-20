import MapView from "@arcgis/core/views/MapView";
import LayerList from "@arcgis/core/widgets/LayerList";
import { useEffect, useRef } from "react";

interface Props {
  view: MapView;
}

const LayerListComponent: React.FC<Props> = ({ view }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      const layerList = new LayerList({ view, container: mapRef.current });
    }
  }, []);
  return <div ref={mapRef}></div>;
};

export default LayerListComponent;
