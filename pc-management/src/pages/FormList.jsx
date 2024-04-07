import React from 'react';
import { Button, Form, Input } from 'antd';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


const FormList = () => (
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="姓名"
      name="name"
      rules={[
        {
          required: true,
          message: '请填写姓名!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="电话"
      name="phone"
      rules={[
        {
          required: true,
          message: '请填写电话!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="信息"
      name="tag"
      rules={[
        {
          required: true,
          message: '请填写信息!',
        },
      ]}
    >
      <Input />
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        确认
      </Button>
    </Form.Item>
  </Form>
);
export default FormList;