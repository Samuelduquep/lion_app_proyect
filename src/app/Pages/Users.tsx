import { Table, Card, Spin, message } from 'antd';
import useFetch from '../../global/hooks/useFetch';
import { User } from '../../global/types';
import { UserOutlined } from '@ant-design/icons';

const Users: React.FC = () => {
    const { data: users, error, loading } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

    if (error) {
        message.error(`Failed to fetch users: ${error.message}`);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
    ];

    return (
        <Card
            title={
                <div className="flex items-center">
                    <UserOutlined className="mr-2" />
                    <span>Users</span>
                </div>
            }
            className='w-full h-full overflow-auto'
        >
            <div className="w-full h-full rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                {loading ? (
                    <Spin size="large" className='flex justify-center items-center' />
                ) : (
                    <Table<User>
                        dataSource={users || []}
                        columns={columns}
                        rowKey="id"
                        size="large"
                        scroll={{ x: '100%', y: 'auto' }}
                        className="dark:bg-gray-800 dark:text-gray-200"
                    />
                )}
            </div>
        </Card>



    );
};

export default Users;
