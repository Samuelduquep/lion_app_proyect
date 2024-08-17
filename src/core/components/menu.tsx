import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../global/hooks/useTheme';
import useGlobalStore from '../../global/hooks/useGlobal';
import useMenuItems from '../../global/hooks/useMenuItems';


const MainMenu: React.FC = () => {
    const navigate = useNavigate();
    const { setTitle } = useGlobalStore();
    const items = useMenuItems();

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key) {
            setTitle(key);
            navigate(key);
        }
    };


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
