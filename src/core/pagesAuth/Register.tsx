import type { FormProps } from 'antd';
import { Button, Form, Input, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useState } from 'react';

type FieldType = {
  username?: string;
  firtsName?: string;
  email?: string;
  lastName?: string;
  password?: string;
  repeatPassword?: string;
};


export const Register: React.FC = () => {
  const [error, setError] = useState({ error: false, msg: '' });
  const navigate = useNavigate()


  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log(values);

    return
    axios
      .post('http://localhost:8000/register', values)
      .then((res) => {

        // localStorage.setItem('token', res.data.token);
        // navigate('/home');
      })
      .catch((err) => {
        console.log('Error:', err);
        setError({ error: true, msg: err.response?.data.detail });
        console.log(err.response?.data.detail);
      });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h1>
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
          <div className='flex gap-2 w-100'>
            <Form.Item<FieldType>
              className="w-full"
              label="Firts Name"
              name="firtsName"
              rules={[{ required: true, message: 'Please input your firts name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              className="w-full"
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input />
            </Form.Item>
          </div>


          <Form.Item<FieldType>
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'Please input your email address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Repeat Password"
            name="repeatPassword"
            rules={[
              { required: true, message: 'Please repeat your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {error.error ? <Alert className='mb-4' message={error.msg} type="error" /> : null}


          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>


          <div className="flex items-center justify-center mt-4">
            <Link to="/" className="flex items-center space-x-2 text-sm font-medium text-purple-700 hover:text-purple-900">
              <ChevronLeftIcon className="h-5 w-5 text-purple-500" />
              <span>Back to Login</span>
            </Link>
          </div>
        </Form>
      </div>
    </div>

  )

};

