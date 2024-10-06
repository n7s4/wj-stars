import React, { FC } from "react";
import {
  Typography,
  Space,
  Form,
  Button,
  Checkbox,
  Input,
  message,
} from "antd";
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
const formRules = {
  usernam: [
    {
      required: true,
      message: "请输入2到12的用户名",

      min: 2,
      max: 12,
    },
  ],
  nickname: [
    {
      required: true,
      message: "请输入2到12的昵称",
      pattern: /^[a-zA-Z0-9_-]{2,12}$/,
    },
  ],
  password: [
    { required: true, message: "请输入6-20位的密码", min: 6, nax: 20 },
  ],
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
            rules={formRules.usernam}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="昵称"
            name="nickname"
            rules={formRules.nickname}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={formRules.password}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="确认密码"
            name="password2"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请再次输入密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码不一致"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 24 }}
          >
            <Checkbox>记住我</Checkbox>
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
