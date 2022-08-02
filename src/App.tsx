import { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.webp";

function App() {
  const [isRotate, setIsRotate] = useState(false);
  useEffect(() => {
    console.log("Cập nhật rotate: " + isRotate);
  }, [isRotate]);
  return (
    <div className="App">
      <header className="h-[56px] bg-slate-500 shadow-md flex">
        <div className="flex items-center ml-4">
          <img
            src={logo}
            className={"h-[50px] " + (isRotate ? "rotate-45" : "")}
            alt="logo"
            onClick={() => setIsRotate(!isRotate)}
          />
        </div>
        <div className=" flex justify-center w-full items-center">
          <span className="text-lg text-white font-bold uppercase">
            Quản lý mạng lưới điện
          </span>
        </div>
      </header>
    </div>
  );
}

export default App;
