import React from 'react';
import { Spin } from 'antd';
import 'antd/dist/reset.css'; // Asegúrate de importar los estilos de Ant Design

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Spin size="large" />
        </div>
    );
};

export default LoadingSpinner;
