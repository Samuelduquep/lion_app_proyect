export interface NasaData {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

export interface WeatherData {
    temperature: number;
    windspeed: number;
    weathercode: number;
}

export interface WorldWeather {
    name: string;
    temperature: number;
    weathercode: number;
}

export interface WorldTime {
    name: string;
    time: string;
    timezone: string;
    datetime?: string;
}

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
}

export interface ApiResponse {
    results: Movie[];
}

export interface MoviesProps {
    type: string;
    title: string;
    genre?: boolean;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export interface Todo {
    id: number;
    text: string;
    status: 'todo' | 'doing' | 'done';
}