import { UnorderedListOutlined, AppstoreOutlined, DesktopOutlined, RocketOutlined, CameraFilled, StarFilled, ClockCircleOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import useGenreStore from '../../global/hooks/useGenre';
import { useTheme } from '../../global/hooks/useTheme';
import useGlobalStore from '../../global/hooks/useGlobal';
useGenreStore


type MenuItem = Required<MenuProps>['items'][number];


const MainMenu: React.FC = () => {
    const { genres, isLoading, error } = useGenreStore();
    const navigate = useNavigate();
    const { setTitle } = useGlobalStore();

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key) {
            setTitle(key);
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



    const { darkMode } = useTheme();


    return (
        <div className="h-full w-full flex flex-col dark:bg-slate-900 ">
            <div className=" bg-blue-600 text-white dark:text-slate-200 p-4 rounded- rounded-tl-lg rounded-tr-lg w-full text-center">
                Lion App
            </div>
            <Menu
                className="flex-grow rounded-b-lg overflow-auto"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub2']}
                mode="inline"
                theme={darkMode ? "dark" : "light"}
                items={items}
                onClick={handleMenuClick}
                style={{ height: '80vh' }}
            />
        </div>
    );
};

export default MainMenu;
