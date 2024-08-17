import { Button, Modal } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import useGlobalStore from '../../global/hooks/useGlobal';


const Header = () => {
    const navigate = useNavigate();
    const { title } = useGlobalStore();

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
        <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                {title}
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggleButton />
                <Button
                    className="w-full bg-red-500 text-white rounded-lg p-2 flex items-center justify-center hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
                    onClick={handleLogoutClick}
                >
                    <LogoutOutlined />
                </Button>
            </div>
        </div>
    );
};

export default Header;
