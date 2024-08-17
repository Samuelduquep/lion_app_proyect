import React, { useEffect, useState } from 'react';
import { Movie, ApiResponse, MoviesProps } from '../../global/types';
import useGlobalStore from '../../global/hooks/useGlobal';

const Movies: React.FC<MoviesProps> = ({ type, title, genre }) => {
    const { setTitle } = useGlobalStore();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [search, setSearch] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const API_KEY = import.meta.env.VITE_API_KEY_MOVIES
    let API_URL = '';
    genre ? API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${type}` : API_URL = `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`;

    useEffect(() => { setTitle('Movies') }, [title, setTitle]);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(API_URL);
                const data: ApiResponse = await response.json();
                setMovies(data.results);
                setFilteredMovies(data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [type, API_URL]);

    useEffect(() => {
        const filtered = movies.filter(movie => {
            const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
            const movieRating = Math.round(movie.vote_average / 2);
            const matchesRating = rating === 0 || movieRating === rating;
            return matchesSearch && matchesRating;
        });
        setFilteredMovies(filtered);
    }, [search, rating, movies]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleRatingClick = (star: number) => {
        setRating(prevRating => prevRating === star ? 0 : star);
    };

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleClosePopup = () => {
        setSelectedMovie(null);
    };

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating / 2);
        const halfStar = rating % 2 >= 1;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, index) => (
                    <svg key={index} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
                    </svg>
                ))}
                {halfStar && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
                        <path d="M12 2v15.27L6.82 21 8.46 13.97 2 9.24 9.19 8.63 12 2z" fill="currentColor" opacity="0.5" />
                    </svg>
                )}
                {[...Array(emptyStars)].map((_, index) => (
                    <svg key={index} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="mx-auto h-full p-5 bg-gradient-to-br from-blue-500 to-blue-900 rounded-md shadow-xl text-white flex flex-col">
            <div className="mb-5 flex justify-between items-center">
                <h1 className="text-xl w-1/3 font-bold text-white mr-5">
                    <span className="relative inline-block text-center">
                        <span className="relative z-10 text-center text-sm lg:text-xl">{title}</span>
                    </span>
                </h1>
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={search}
                    onChange={handleSearchChange}
                    className="p-3 border w-1/3 border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="ml-6 flex items-center w-1/ justify-end">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button
                            key={star}
                            onClick={() => handleRatingClick(star)}
                            className={`p-0 lg:p-1 ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 lg:w-8 lg:h-8 " viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-grow overflow-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filteredMovies.map(movie => (
                        <div
                            key={movie.id}
                            onClick={() => handleMovieClick(movie)}
                            className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black to-transparent">
                                <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
                                <p className="text-sm text-gray-300 truncate">{movie.overview}</p>
                                <div className="mt-2">
                                    {renderStars(movie.vote_average)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedMovie && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full relative">
                        <button
                            onClick={handleClosePopup}
                            className="absolute top-2 right-2 text-white text-xl focus:outline-none"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-4">{selectedMovie.title}</h2>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                            alt={selectedMovie.title}
                            className="w-full h-auto mb-4 rounded-lg"
                        />
                        <p className="text-gray-300 mb-4">{selectedMovie.overview}</p>
                        <div className="mt-2">
                            {renderStars(selectedMovie.vote_average)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Movies;
