import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Space,
  Typography,
} from "antd";
import React, { FC, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./login.module.scss";
import {
  HOME_PATHNAME,
  MANAGE_LIST_PATHNAME,
  REGISTER_PATHNAME,
} from "../router";
import { UserOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useRequest } from "ahooks";
import { loginService } from "../servers/user";
import { setToken } from "../utills/user-token";
type FieldType = {
  username: string;
  nickname?: string;
  password: string;
  remember?: string;
};
const { Title } = Typography;
const USERBANE_KEY = "username";
const PASSWORD_KEY = "password";
const remeberUser = (username: string, password: string) => {
  localStorage.setItem(USERBANE_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
};
const deleteUserFromLocalStorage = () => {
  localStorage.removeItem(USERBANE_KEY);
  localStorage.removeItem(PASSWORD_KEY);
};
const getUserFromLocalStorage = () => {
  return {
    username: localStorage.getItem(USERBANE_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
};
const Login: FC = () => {
  const [form] = useForm();
  useEffect(() => {
    const { username, password } = getUserFromLocalStorage();
    form.setFieldsValue({ username, password });
  }, []);
  const nav = useNavigate();
  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess: (result) => {
        const { token = "" } = result;
        setToken(token);
        nav(MANAGE_LIST_PATHNAME); // 导航到我的问卷
        message.success("登录成功");
      },
    }
  );
  const onFished = (values: FieldType) => {
    const { username, password } = values || {};
    run(username, password);
    if (values.remember) {
      const { username, password } = values || {};
      remeberUser(username, password);
    } else {
      deleteUserFromLocalStorage();
    }
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
          form={form}
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
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
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
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>没有帐户？去注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
