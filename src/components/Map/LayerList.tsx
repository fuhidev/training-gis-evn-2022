import Collection from "@arcgis/core/core/Collection";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ActionButton from "@arcgis/core/support/actions/ActionButton";
import MapView from "@arcgis/core/views/MapView";
import LayerList from "@arcgis/core/widgets/LayerList";
import { useEffect, useRef } from "react";

interface Props {
  view: MapView;
  openFeatureTable: (layer: FeatureLayer) => void;
}

const LayerListComponent: React.FC<Props> = ({ view, openFeatureTable }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      const layerList = new LayerList({
        view,
        container: mapRef.current,
        listItemCreatedFunction: (event: { item: __esri.ListItem }) => {
          const item = event.item;
          const actions = new Collection<ActionButton>();
          actions.add(
            new ActionButton({
              title: "Mở bảng dữ liệu",
              className: "esri-icon-table",
              id: "table",
            })
          );
          item.actionsSections.add(actions);
        },
      });

      layerList.on("trigger-action", (event) => {
        if (event.action.id === "table") {
          const layer = event.item.layer;
          openFeatureTable(layer as __esri.FeatureLayer);
        }
      });
    }
  }, []);
  return <div ref={mapRef}></div>;
};

export default LayerListComponent;
