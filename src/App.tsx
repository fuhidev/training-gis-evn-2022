import "./App.css";
import Header from "./components/layouts/Header";

import esriConfig from "@arcgis/core/config.js";
import MapComponent from "./components/Map";
esriConfig.assetsPath = "./assets";

function App() {
  return (
    <div className="App">
      <Header />
      <MapComponent />
    </div>
  );
}

export default App;
