import { Table, Card, Row, Col, Spin, message, Calendar, List, Progress } from 'antd';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import useFetch from '../../global/hooks/useFetch';
import { User } from '../../global/types';

const Dashboard: React.FC = () => {
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

    const dataPieChart = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="mx-auto md:h-100 lg:h-full overflow-auto p-3 bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-800 dark:to-blue-900 rounded-md shadow-xl text-gray-900 dark:text-gray-200">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Total Users" bordered={false} className="flex flex-col justify-center items-center bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200">
                        <Progress type="circle" percent={75} strokeColor="#4CAF50" />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Active Users" bordered={false} className="flex flex-col justify-center items-center bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200">
                        <Progress type="circle" percent={50} strokeColor="#FFC107" />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="New Signups" bordered={false} className="flex flex-col justify-center items-center bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200">
                        <Progress type="circle" percent={25} strokeColor="#03A9F4" />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Churn Rate" bordered={false} className="flex flex-col justify-center items-center bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200">
                        <Progress type="circle" percent={10} strokeColor="#F44336" />
                    </Card>
                </Col>

                <Col xs={24}>
                    <Card title="User Distribution" bordered={false} className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200">
                        <ResponsiveContainer width="100%" height={320}>
                            <PieChart>
                                <Pie
                                    data={dataPieChart}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {dataPieChart.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                <Col xs={24}>
                    <Card title="Calendar" bordered={false} className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 h-full">
                        <Calendar fullscreen={false} />
                    </Card>
                </Col>

                <Col xs={24}>
                    <Card title="User Data" bordered={false} className="w-full overflow-auto bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200">
                        {loading ? (
                            <Spin size="large" />
                        ) : (
                            <Table<User>
                                dataSource={users || []}
                                columns={columns}
                                rowKey="id"
                                size="middle"
                                scroll={{ x: '100%', y: 240 }}
                                pagination={{ pageSize: 5 }}
                                className="dark:bg-gray-800 dark:text-gray-200"
                            />
                        )}
                    </Card>
                </Col>

                <Col xs={24}>
                    <Card title="To-Do List" bordered={false} className="bg-white text-gray-100 dark:bg-gray-800 dark:text-gray-200">
                        <List
                            size="small"
                            bordered
                            dataSource={['Task 1', 'Task 2', 'Task 3']}
                            renderItem={item => <List.Item className="dark:bg-gray-700">{item}</List.Item>}
                        />
                    </Card>
                </Col>
            </Row>
        </div>


    );
};

export default Dashboard;
