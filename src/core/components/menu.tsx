import React from 'react';
import { UnorderedListOutlined, LogoutOutlined, AppstoreOutlined, DesktopOutlined, RocketOutlined, CameraFilled, StarFilled, ClockCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGenres } from '../../global/hooks/useGenre';
import { Modal } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

const MainMenu: React.FC = () => {
    const { genres, isLoading, error } = useGenres();
    const navigate = useNavigate();

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key) {
            navigate(key);
        }
    };

    const items: MenuItem[] = [
        { key: 'Dashboard', icon: <AppstoreOutlined />, label: 'Dashboard' },
        { key: 'Weather', icon: <DesktopOutlined />, label: 'Weather' },
        { key: 'TodoList', icon: <UnorderedListOutlined />, label: 'Todo List' },
        { key: 'Nasa', icon: <RocketOutlined />, label: 'Nasa' },
        {
            key: 'sub2',
            label: 'Movies',
            icon: <CameraFilled />,
            children: [
                { key: 'movies/PopularMovies', icon: <StarFilled />, label: 'Popular Movies' },
                { key: 'movies/UpcomingMovies', icon: <ClockCircleOutlined />, label: 'Upcoming Movies' },
                {
                    key: 'sub3',
                    label: 'Movie Genres',
                    children: isLoading
                        ? [{ key: 'loading', label: 'Loading...' }]
                        : error
                            ? [{ key: 'error', label: 'Error loading genres' }]
                            : genres.map(genre => ({
                                key: `movies/${genre.id}`,
                                label: genre.name,
                            })),
                },
            ],
        },
    ];

    const handleLogoutClick = () => {
        Modal.confirm({
            title: 'Are you sure you want to logout?',
            content: 'You will be redirected to the home page.',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                navigate('/');
            }
        });
    };
    return (
        <div className="h-full w-full flex flex-col">
            <Menu
                className="flex-grow rounded-b-lg overflow-auto"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub2']}
                mode="inline"
                theme="light"
                items={items}
                onClick={handleMenuClick}
                style={{ height: '80vh' }}
            />
            <div className="p-4">
                <button
                    className="w-full bg-red-500 text-white rounded-lg p-2 flex items-center justify-center"
                    onClick={handleLogoutClick}
                >
                    <LogoutOutlined className="mr-2" />
                    Logout
                </button>
            </div>
        </div>


    );
};

export default MainMenu;
