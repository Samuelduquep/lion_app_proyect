import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import { Login } from "./pagesAuth/Login";
import { Register } from "./pagesAuth/Register";
import { ForgetPassword } from "./pagesAuth/ForgetPassword";
import { NewPassword } from "./pagesAuth/NewPassword";
import { ConfirmAccount } from "./pagesAuth/ConfirmAccount";
import { NotFound } from "./pagesAuth/NotFound";
import PrivateArea from "./layout/PrivateArea";
import Dashboard from "../app/Pages/Dashboard";
import Weather from "../app/Pages/Weather";
import Nasa from "../app/Pages/Nasa";
import Movies from "../app/Pages/Movies";
import GenreRoutes from "./routes/genreRoutes";
import TodoList from "../app/Pages/TodoList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/recovery" element={<ForgetPassword />} />
          <Route path="auth/newpass/:token" element={<NewPassword />} />
          <Route path="auth/confirm/:id" element={<ConfirmAccount />} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/home" element={<PrivateArea />}>
          <Route index element={<Dashboard />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="weather" element={<Weather />} />
          <Route path="todoList" element={<TodoList />} />
          <Route path="nasa" element={<Nasa />} />
          <Route path="movies/PopularMovies" element={<Movies type="popular" title="Popular Movies" />} />
          <Route path="movies/UpcomingMovies" element={<Movies type="upcoming" title="Upcoming Movies" />} />
          <Route path="movies/*" element={<GenreRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
