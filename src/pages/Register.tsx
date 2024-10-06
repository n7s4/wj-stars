import React, { FC } from "react";
import { Typography, Space, Form, Button, Checkbox, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./register.module.scss";
import { Link } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";

const { Title } = Typography;
type FieldType = {
  username?: string;
  nickname?: string;
  password?: string;
  remember?: string;
  password2?: string;
};
const Register: FC = () => {
  const onFished = (values: FieldType) => {
    console.log("Success:", values);
  };
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
          style={{ minWidth: 400 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFished}
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: "Please input your nickname!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="确认密码"
            name="password2"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 24 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 24 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有帐户？登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Register;
