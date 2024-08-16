import React from 'react';
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
        <div className='overflow-auto mx-auto h-full p-8 bg-gradient-to-br from-blue-500 to-blue-900 rounded-md shadow-xl text-white flex flex-col'>
            <Row gutter={[16, 16]}>
                {/* Estadísticas Rápidas */}
                <Col span={6}>
                    <Card title="Total Users" bordered={false}>
                        <Progress type="circle" percent={75} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Active Users" bordered={false}>
                        <Progress type="circle" percent={50} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="New Signups" bordered={false}>
                        <Progress type="circle" percent={25} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Churn Rate" bordered={false}>
                        <Progress type="circle" percent={10} />
                    </Card>
                </Col>

                {/* Gráfico de Donuts */}
                <Col span={12}>
                    <Card title="User Distribution" bordered={false}>
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
                                    {dataPieChart.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                {/* Calendario */}
                <Col span={12}>
                    <Card title="Calendar" bordered={false} className="h-full">
                        <Calendar fullscreen={false} />
                    </Card>
                </Col>

                {/* Tabla de Usuarios */}
                <Col span={24}>
                    <Card title="User Data" bordered={false}>
                        {loading ? (
                            <Spin size="large" />
                        ) : (
                            <Table<User>
                                dataSource={users || []}
                                columns={columns}
                                rowKey="id"
                                pagination={{ pageSize: 5 }}
                            />
                        )}
                    </Card>
                </Col>

                {/* Lista de Tareas */}
                <Col span={24}>
                    <Card title="To-Do List" bordered={false}>
                        <List
                            size="small"
                            bordered
                            dataSource={['Task 1', 'Task 2', 'Task 3']}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
