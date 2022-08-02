import { useState } from "react";
import logo from "./logo.webp";
function Header() {
  const [isRotate, setIsRotate] = useState(false);
  return (
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
  );
}

export default Header;
