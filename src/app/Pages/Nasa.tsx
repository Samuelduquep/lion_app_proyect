import React, { useState, useEffect } from 'react';
import useFetch from '../../global/hooks/useFetch';
import { motion } from 'framer-motion';
import { NasaData } from '../../global/types';
import LoadingSpinner from '../../core/components/LoadingSpinner';
import { formatDate, calculateFiveDaysAgo } from '../../global/utils/helpers';
import { DatePicker, Modal } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const Nasa: React.FC = () => {
    const API_KEY = import.meta.env.VITE_API_KEY_NASA
    const API_URL = "https://api.nasa.gov/planetary/apod";

    const today = dayjs();
    const yesterday = today.subtract(1, 'day');
    const [dates, setDates] = useState<[Dayjs, Dayjs] | null>([dayjs(calculateFiveDaysAgo()), yesterday]);
    const [fetchUrl, setFetchUrl] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<NasaData | null>(null);

    useEffect(() => {
        if (dates) {
            const [startDate, endDate] = dates;
            const start = formatDate(startDate.toDate());
            const end = formatDate(endDate.toDate());
            setFetchUrl(`${API_URL}?api_key=${API_KEY}&start_date=${start}&end_date=${end}`);
        }
    }, [dates]);

    const { data, loading, error } = useFetch<NasaData[]>(fetchUrl);

    const handleDateChange = (dates: [Dayjs, Dayjs] | null) => {
        setDates(dates);
    };

    const handleImageClick = (item: NasaData) => {
        setSelectedImage(item);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="mx-auto h-full p-8 bg-gradient-to-br from-indigo-500 to-from-indigo-900 rounded-md shadow-xl text-white flex flex-col">
            <div className="mb-6 flex justify-between gap-5">
                <div className="mb-6">
                    <label className="block text-lg font-semibold mb-2">Select Date Range</label>
                    <RangePicker
                        value={dates ? [dates[0], dates[1]] : undefined}
                        onChange={(dates) => handleDateChange(dates as [Dayjs, Dayjs] | null)}
                        format="YYYY-MM-DD"
                        className="mb-4"
                        disabledDate={(current) => current && (current.isAfter(today) || current.isSame(today, 'day'))}
                    />
                </div>

                <h1 className="text-4xl font-bold text-white mb-6">
                    <span className="relative inline-block">
                        <span className="relative z-10 text-center">Nasa Image Daily</span>
                    </span>
                </h1>
            </div>

            {loading && <LoadingSpinner />}
            {error ? (
                <div className="p-4 text-red-500 font-semibold">
                    Error: {error.message}
                </div>
            ) : !data || data.length === 0 ? (
                <div className="p-4 text-gray-600">
                    No data available.
                </div>
            ) : (
                <div className="flex-grow overflow-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {data.map((item, index) => (
                            <motion.div
                                key={index}
                                className="relative group cursor-pointer overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => handleImageClick(item)}
                            >
                                {item.url && item.url.endsWith('.jpg') ? (
                                    <motion.img
                                        src={item.url}
                                        alt={item.title || 'Image'}
                                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                ) : (
                                    <iframe
                                        src={item.url ? item.url : 'https://example.com/no-image-available'}
                                        title={item.title || 'Content'}
                                        className="w-full h-64 rounded-lg shadow-lg"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                                    <motion.h1
                                        className="text-lg font-bold mb-2 truncate"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {item.title}
                                    </motion.h1>
                                    <motion.p
                                        className="text-sm mb-2 truncate"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        Date: {item.date}
                                    </motion.p>
                                    <motion.p
                                        className="text-sm mb-4 truncate"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {item.explanation}
                                    </motion.p>
                                    <motion.a
                                        href={item.hdurl ?? item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-4 py-2 bg-from-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-from-indigo-700 transition duration-300"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        View HD Image
                                    </motion.a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {selectedImage && (
                <Modal
                    open={!!selectedImage}
                    footer={null}
                    onCancel={handleCloseModal}
                    width={900}
                >
                    <div className='flex flex-col justify-center items-center'>
                        <div className='relative w-full h-full overflow-hidden'>
                            {selectedImage.url && selectedImage.url.endsWith('.jpg') ? (
                                <motion.img
                                    src={selectedImage.url}
                                    alt={selectedImage.title || 'Image'}
                                    className="w-full h-full object-contain rounded-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                />
                            ) : (
                                <iframe
                                    src={selectedImage.url ? selectedImage.url : 'https://example.com/no-image-available'}
                                    title={selectedImage.title || 'Content'}
                                    className="w-full h-full rounded-lg"
                                />
                            )}
                        </div>
                        <div className="mt-4 w-full max-h-1/6 overflow-y-auto px-4 py-2">
                            <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
                            <p className="text-lg mt-2">Date: {selectedImage.date}</p>
                            <p className="text-base mt-4">{selectedImage.explanation}</p>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Nasa;
