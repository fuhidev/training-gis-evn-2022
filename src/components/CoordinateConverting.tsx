import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { project } from "@arcgis/core/rest/geometryService";
import ProjectParameters from "@arcgis/core/rest/support/ProjectParameters";
import MapView from "@arcgis/core/views/MapView";
import React, { useEffect, useState } from "react";
interface CoordinateConvertingProps {
  view: MapView;
}

const CoordinateConverting: React.FC<CoordinateConvertingProps> = ({
  view,
}) => {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    view.when(() => {
      view.on("pointer-move", async (event) => {
        const mapPoint = view.toMap({ x: event.x, y: event.y });
        try {
          const response = await project(
            "https://biwase.info/server/rest/services/Utilities/Geometry/GeometryServer",
            new ProjectParameters({
              outSpatialReference: new SpatialReference({
                wkt: 'PROJCS["DANANG_VN2000",GEOGCS["GCS_VN_2000",DATUM["D_Vietnam_2000",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",107.75],PARAMETER["Scale_Factor",0.9999],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]',
              }),
              geometries: [mapPoint],
            })
          );
          const vn2000Point = response[0] as __esri.Point;

          const value = `${vn2000Point.x.toFixed(3)}/${vn2000Point.y.toFixed(
            3
          )}`;
          setValue(value);
        } catch (error) {
          console.error("Không chuyển đổi được hệ tọa độ");
        }
      });
    });
  }, [view]);
  return (
    <div className="absolute bottom-5 left-5 bg-white rounded w-[200px]">
      <span>{value}</span>
    </div>
  );
};

export default CoordinateConverting;
