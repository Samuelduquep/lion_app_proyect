import { Outlet, Link } from "react-router-dom";
import logo from '../assets/logo.png';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-200 via-blue-200 to-purple-200">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <div className="text-2xl font-semibold text-gray-800">
              LION APP
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full md:max-w-md lg:max-w-lg p-8 bg-white rounded-lg shadow-lg border border-gray-300">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-600">
        <p>&copy; 2024 LION APP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
