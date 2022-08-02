import "./App.css";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="h-[56px] bg-slate-500 shadow-md flex">
        <img src={logo} className="h-[55px]" alt="logo" />
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
