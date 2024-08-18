import { useState, useEffect } from 'react';
import { UnorderedListOutlined, AppstoreOutlined, UserOutlined, DesktopOutlined, RocketOutlined, CameraFilled, StarFilled, ClockCircleOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import useGenreStore from './useGenre';

type MenuItem = Required<MenuProps>['items'][number];

const useMenuItems = (): MenuItem[] => {
    const { genres, isLoading, error } = useGenreStore();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const items: MenuItem[] = [
            { key: 'Dashboard', icon: <AppstoreOutlined />, label: 'Dashboard' },
            { key: 'users', icon: <UserOutlined />, label: 'Users' },
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

        setMenuItems(items);
    }, [genres, isLoading, error]);

    return menuItems;
};

export default useMenuItems;
