import { Outlet, Link } from "react-router-dom";
import logo from '../assets/logo.png'; // Importa la imagen directamente


const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-800 to-blue-500">
      <main className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="flex items-center justify-center mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              LION APP
            </div>
          </Link>
        </div>

        <div className="w-full flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
