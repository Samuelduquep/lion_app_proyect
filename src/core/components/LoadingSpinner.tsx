import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Spin size="large" className="text-gray-700 dark:text-gray-300" />
        </div>
    );
};

export default LoadingSpinner;
