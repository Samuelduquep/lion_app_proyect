import { Outlet } from "react-router-dom";
import MainMenu from "../components/menu";

const PrivateArea = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white text-white flex flex-col items-center rounded-lg shadow-lg fixed top-4 left-4 z-10 h-[calc(100%-2rem)]">
        <div className="my-4 bg-slate-900 text-white p-4 rounded-lg shadow-lg w-full text-center">
          Lion App
        </div>
        <MainMenu />
      </div>

      <main className="flex-1 flex flex-col ml-[calc(16rem+2rem)] mt-0">
        <div className="flex-1 p-4 mt-0 overflow-auto box-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PrivateArea;
