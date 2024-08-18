import { Outlet, Link } from "react-router-dom";
import logo from '../assets/logo.png'; // Importa la imagen directamente

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-blue-100">
      <header className="bg-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-8 md:h-10 w-auto" />
            <div className="text-2xl md:text-4xl font-bold tracking-tight text-blue-600">
              LION APP
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-2xl">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white p-4 text-center text-sm">
        <p>&copy; 2024 LION APP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
