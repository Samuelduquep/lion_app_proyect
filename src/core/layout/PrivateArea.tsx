import { Outlet } from "react-router-dom";
import MainMenu from "../components/menu";
import Header from "../components/Header";

const PrivateArea = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-neutral-950 text-white dark:text-gray-200 flex flex-col items-center rounded-lg shadow-lg fixed top-4 left-4 z-10 h-[calc(100%-2rem)]">
        <MainMenu />
      </div>

      <header className="fixed top-4 right-4 left-[calc(16rem+2rem)] z-20 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-200 shadow-lg p-4 rounded-lg">
        <Header />
      </header>

      <main className="flex-1 flex flex-col ml-[calc(16rem+2rem)] mt-[calc(4rem+2rem)]">
        <div className="flex-1 p-4 pt-0 pl-0 mt-0 overflow-auto box-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PrivateArea;
