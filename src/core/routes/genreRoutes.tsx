import React from 'react';
import { Routes, Route } from 'react-router-dom';
import useGenreStore from '../../global/hooks/useGenre';
import Movies from '../../app/Pages/Movies';
const GenreRoutes: React.FC = () => {
    const { genres } = useGenreStore();

    return (
        <Routes>
            {genres.map(genre => (
                <Route
                    key={genre.id}
                    path={`${genre.id}`} // Asumiendo que 'genre.name' es seguro para la URL
                    element={<Movies type={genre.id.toString()} title={genre.name} genre={true} />}
                />
            ))}
        </Routes>
    );
};

export default GenreRoutes;
