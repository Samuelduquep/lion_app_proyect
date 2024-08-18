import { ChevronLeftIcon } from "@heroicons/react/16/solid";


import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

type FieldType = {
  username?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export const ForgetPassword: React.FC = () => (
  <div className="h-full w-full flex items-center justify-center">
    <div className="bg-white w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Recovery Password</h1>
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Recovery Password
          </Button>
        </Form.Item>


        <div className="flex items-center justify-between mt-4">
          <Link to="/" className="flex items-center space-x-2 text-sm font-medium text-purple-700 hover:text-purple-900">
            <ChevronLeftIcon className="h-5 w-5 text-purple-500" />
            <span>Back to Login</span>
          </Link>
          <Link
            to="/auth/register"
            className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-purple-900"
          >
            <span>Register</span>
          </Link>

        </div>
      </Form>
    </div>
  </div>

);


