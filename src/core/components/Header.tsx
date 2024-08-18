import { Button, Modal, Drawer, Menu } from 'antd';
import { useState } from 'react';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import useGlobalStore from '../../global/hooks/useGlobal';
import useMenuItems from '../../global/hooks/useMenuItems';

const Header = () => {
    const navigate = useNavigate();
    const { title, setTitle } = useGlobalStore();
    const [visible, setVisible] = useState(false);
    const items = useMenuItems();


    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
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
                <Button
                    type='primary'
                    className="md:hidden w-full text-white rounded-lg p-2 flex items-center justify-center hover:bg-red-600 dark:bg-blue-700 dark:hover:bg-red-600"
                    onClick={showDrawer}
                >
                    <MenuOutlined />
                </Button>
            </div>


            {/* Drawer for Mobile Menu */}
            <Drawer
                title="Menu"
                placement="right"
                onClose={onClose}
                open={visible}
            >
                <Menu
                    mode="inline"
                    items={items}
                    onClick={({ key }) => {
                        setTitle(key);
                        navigate(key);
                        setVisible(false);
                    }}
                />
            </Drawer>
        </div>
    );
};

export default Header;

