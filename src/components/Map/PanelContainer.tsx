import MapView from "@arcgis/core/views/MapView";
import { useState } from "react";
import LayerListComponent from "./LayerList";

interface Props {
  view: MapView;
}

const PanelContainer: React.FC<Props> = ({ view }) => {
  const [isOpenPanel, setIsOpenPanel] = useState(false);
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
          <LayerListComponent view={view} />
        </div>
      </div>
    </>
  );
};

export default PanelContainer;
