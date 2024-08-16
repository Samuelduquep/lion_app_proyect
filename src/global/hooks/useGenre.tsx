import { useContext } from 'react';
import { GenreContext } from '../context/genreContext';
export const useGenres = () => {
    const context = useContext(GenreContext);

    if (context === undefined) {
        throw new Error('useGenres must be used within a GenreProvider');
    }

    return context;
};
