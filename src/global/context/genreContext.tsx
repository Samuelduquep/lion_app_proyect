import React, { createContext, useEffect, useState, ReactNode } from 'react';

const API_KEY = '2d3dcec016fcdaa3e4afda8bc7a20881';
const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

interface Genre {
    id: number;
    name: string;
}

interface GenreContextProps {
    genres: Genre[];
    isLoading: boolean;
    error: string | null;
}

const GenreContext = createContext<GenreContextProps | undefined>(undefined);

export const GenreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(GENRES_URL)
            .then(response => response.json())
            .then(data => {
                setGenres(data.genres as Genre[]);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError('Failed to fetch genres');
                setIsLoading(false);
            });
    }, []);

    return (
        <GenreContext.Provider value={{ genres, isLoading, error }}>
            {children}
        </GenreContext.Provider>
    );
};

export { GenreContext };
