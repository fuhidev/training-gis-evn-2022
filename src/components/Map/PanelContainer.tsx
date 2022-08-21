import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import { useState } from "react";
import DrawingPowerLine from "./DrawingPowerLine";
import LayerListComponent from "./LayerList";
import MapChecking from "./MapChecking";

interface Props {
  view: MapView;
  openFeatureTable: (layer: FeatureLayer) => void;
}

const PanelContainer: React.FC<Props> = ({ view, openFeatureTable }) => {
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <>
      <div className="absolute z-[999] right-8 top-5">
        <div
          className="text-gray-900 w-10 h-10 cursor-pointer rounded-sm text-right"
          onClick={() => setIsOpenPanel(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <div
        className={
          "absolute top-0 right-0 w-[400px] bg-white h-screen z-[999] px-4 py-2 flex-col overflow-hidden " +
          (isOpenPanel ? "block" : "hidden")
        }
      >
        <div
          className="text-slate-600 text-lg cursor-pointer "
          title="Đóng"
          onClick={() => {
            setIsOpenPanel(false);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="flex-1 h-full">
          <div className="flex w-full flex-nowrap mb-4">
            <div
              className={
                "cursor-pointer hover:bg-sky-600 rounded px-4 py-2" +
                (tabIndex === 0 ? " bg-sky-400" : "")
              }
              onClick={() => setTabIndex(0)}
            >
              Lớp dữ liệu
            </div>
            <div
              className={
                "cursor-pointer hover:bg-sky-600 rounded px-4 py-2" +
                (tabIndex === 1 ? " bg-sky-400" : "")
              }
              onClick={() => setTabIndex(1)}
            >
              Vẽ đường dây
            </div>
            <div
              className={
                "cursor-pointer hover:bg-sky-600 rounded px-4 py-2" +
                (tabIndex === 2 ? " bg-sky-400" : "")
              }
              onClick={() => setTabIndex(2)}
            >
              Kiểm tra không gian
            </div>
          </div>
          <div className={tabIndex !== 0 ? "hidden" : ""}>
            <LayerListComponent
              view={view}
              openFeatureTable={openFeatureTable}
            />
          </div>
          <div className={tabIndex !== 1 ? "hidden" : ""}>
            <DrawingPowerLine view={view} />
          </div>
          <div className={tabIndex !== 2 ? "hidden" : ""}>
            <MapChecking view={view} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PanelContainer;
