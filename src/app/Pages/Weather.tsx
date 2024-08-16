import React, { useState, useEffect } from 'react';
import { AutoComplete, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { WiWindy, WiThermometer, WiDaySunny, WiCloudy } from 'react-icons/wi';
import LoadingSpinner from '../../core/components/LoadingSpinner';
import { WeatherData, WorldWeather, WorldTime } from '../../global/types';

const Weather: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [worldWeather, setWorldWeather] = useState<WorldWeather[]>([]);
    const [worldTime, setWorldTime] = useState<WorldTime[]>([]);
    const [suggestions, setSuggestions] = useState<{ value: string; label: string }[]>([]);

    const fetchWeather = async (latitude: number, longitude: number): Promise<void> => {
        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            );
            const data = await response.json();
            const { temperature, windspeed, weathercode } = data.current_weather;

            setWeatherData({
                temperature,
                windspeed,
                weathercode,
            });
        } catch (err) {
            setError('Error fetching weather data');
        } finally {
            setLoading(false);
        }
    };

    const getCoordinates = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`
            );
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                fetchWeather(parseFloat(lat), parseFloat(lon));
            } else {
                setError('City not found');
            }
        } catch (err) {
            setError('Error fetching coordinates');
        }
    };

    const fetchSuggestions = async (query: string): Promise<void> => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=10`
            );
            const data = await response.json();
            setSuggestions(
                data.map((item: { display_name: string }) => ({
                    value: item.display_name,
                    label: item.display_name,
                }))
            );
        } catch (err) {
            console.error('Error fetching city suggestions', err);
        }
    };

    const handleSelect = (value: string): void => {
        setCity(value);
    };

    const fetchWorldWeather = async (): Promise<void> => {
        const cities = [
            { name: 'New York', lat: 40.7128, lon: -74.0060 },
            { name: 'London', lat: 51.5074, lon: -0.1278 },
            { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
            { name: 'Paris', lat: 48.8566, lon: 2.3522 },
            { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
        ];

        const promises = cities.map(async (city) => {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
            );
            const data = await response.json();
            return {
                name: city.name,
                temperature: data.current_weather.temperature,
                weathercode: data.current_weather.weathercode,
            } as WorldWeather;
        });

        const results = await Promise.all(promises);
        setWorldWeather(results);
    };

    const fetchWorldTime = (): void => {
        const cities = [
            { name: 'New York', timezone: 'America/New_York' },
            { name: 'London', timezone: 'Europe/London' },
            { name: 'Tokyo', timezone: 'Asia/Tokyo' },
            { name: 'Paris', timezone: 'Europe/Paris' },
            { name: 'Sydney', timezone: 'Australia/Sydney' },
        ];

        const times = cities.map((city) => {
            const time = new Date().toLocaleTimeString('en-US', {
                timeZone: city.timezone,
                hour: '2-digit',
                minute: '2-digit',
            });
            return { name: city.name, time, timezone: city.timezone };
        });

        setWorldTime(times);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(latitude, longitude);
            },
            (err) => {
                console.error('Error getting location', err);
                fetchWeather(41.3851, 2.1734); // Barcelona por defecto
            }
        );

        fetchWorldWeather();
        fetchWorldTime();

        // Actualizar la hora cada minuto
        const intervalId = setInterval(fetchWorldTime, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const renderWeatherIcon = (code: number): JSX.Element => {
        switch (code) {
            case 0:
                return <WiDaySunny className="text-yellow-400 text-5xl" />;
            case 1:
            case 2:
            case 3:
                return <WiCloudy className="text-gray-300 text-5xl" />;
            default:
                return <WiCloudy className="text-gray-300 text-5xl" />;
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="overflow-auto mx-auto h-full p-8 bg-gradient-to-br from-blue-500 to-blue-900 rounded-md shadow-xl text-white">
            <div className="flex flex-col items-center justify-between mb-8 space-y-4">
                <h1 className="text-5xl font-thin">Weather</h1>
                <div className="flex w-full md:w-1/2">
                    <AutoComplete
                        className="w-full"
                        options={suggestions}
                        onSearch={fetchSuggestions}
                        onSelect={handleSelect}
                        value={city}
                        onChange={(value) => setCity(value)}
                        placeholder="Enter city name"
                    >
                        <Input
                            className="h-10 rounded-l-full text-gray-900 placeholder-gray-400"
                            placeholder="Enter city name"
                        />
                    </AutoComplete>
                    <Button
                        type="primary"
                        className="rounded-r-full h-10"
                        icon={<SearchOutlined />}
                        onClick={getCoordinates}
                        loading={loading}
                    >
                        Search
                    </Button>
                </div>
            </div>

            {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

            {weatherData && (
                <div className="flex flex-col md:flex-row items-center bg-gray-800 rounded-3xl overflow-hidden shadow-2xl mb-8">
                    <div className="w-full md:w-1/2 bg-cover bg-center">
                        <div className="p-6 flex justify-center items-center h-full">
                            {renderWeatherIcon(weatherData.weathercode)}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-8 space-y-6">
                        <h2 className="text-5xl font-thin">{city || 'Your Location'}</h2>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <WiThermometer className="text-white text-5xl" />
                                <span className="text-7xl font-thin">{Math.round(weatherData.temperature)}°</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <WiWindy className="text-white text-5xl" />
                                <span className="text-2xl font-thin">{weatherData.windspeed} m/s</span>
                            </div>
                        </div>
                        <p className="text-right text-gray-400">Updated just now</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl">
                    <h2 className="text-3xl font-thin mb-4">World Weather</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {worldWeather.map((cityWeather, index) => (
                            <div key={index} className="flex items-center bg-gray-900 p-4 rounded-xl shadow-lg">
                                {renderWeatherIcon(cityWeather.weathercode)}
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold">{cityWeather.name}</h3>
                                    <p className="text-lg">{cityWeather.temperature}°C</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl">
                    <h2 className="text-3xl font-thin mb-4">World Time</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {worldTime.map((cityTime, index) => (
                            <div key={index} className="flex items-center bg-gray-900 p-4 rounded-xl shadow-lg">
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold">{cityTime.name}</h3>
                                    <p className="text-lg">{cityTime.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
