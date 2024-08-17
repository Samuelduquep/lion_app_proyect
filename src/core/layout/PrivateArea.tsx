import { Outlet } from "react-router-dom";
import MainMenu from "../components/menu";
import Header from "../components/Header";

const PrivateArea = () => {
  return (
    <div className="flex h-screen gap-2 bg-gray-100 dark:bg-gray-900 p-2">
      <div className="w-64 bg-white dark:bg-neutral-950 text-white dark:text-gray-200 flex flex-col items-center rounded-lg shadow-lg">
        <MainMenu />
      </div>

      <div className="flex flex-col flex-1 gap-2">
        <header className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-200 shadow-lg p-4 rounded-lg">
          <Header />
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>


  );
};

export default PrivateArea;