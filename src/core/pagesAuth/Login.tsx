import type { FormProps } from 'antd';
import { Button, Form, Input, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

type FieldType = {
  username?: string;
  password?: string;
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({ error: false, msg: '' });

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (values.username?.toUpperCase() === 'ADMIN' && values.password === 'admin') {
      navigate('/home');
    } else {
      setError({ error: true, msg: 'Invalid username or password' });
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-white w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size='large'
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          {error.error ? <Alert className='mb-4' message={error.msg} type="error" /> : null}


          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>

          <div className="flex items-center justify-between mt-4">
            <Link to="/auth/register" className="text-sm font-medium text-gray-400 hover:text-purple-900">
              Register
            </Link>
            <Link to="/auth/recovery" className="text-sm font-medium text-gray-400 hover:text-purple-900">
              Forgotten Password
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
