import { create } from 'zustand';

interface Genre {
    id: number;
    name: string;
}

interface GenreState {
    genres: Genre[];
    isLoading: boolean;
    error: string | null;
    fetchGenres: () => void;
}

const API_KEY = '2d3dcec016fcdaa3e4afda8bc7a20881';
const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

const useGenreStore = create<GenreState>((set) => {
    const fetchGenres = async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(GENRES_URL);
            const data = await response.json();
            set({ genres: data.genres, isLoading: false });
        } catch (error) {
            console.error(error);
            set({ error: 'Failed to fetch genres', isLoading: false });
        }
    };

    fetchGenres();

    return {
        genres: [],
        isLoading: true,
        error: null,
        fetchGenres,
    };
});

export default useGenreStore;
