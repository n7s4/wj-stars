import React, { FC } from "react";
import styles from "./QuestionCard.module.scss";
import { Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router/index";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../servers/user";
import { UserOutlined } from "@ant-design/icons";
import { removeToken } from "../utills/user-token";

const UserInfo: FC = () => {
  const nav = useNavigate();
  const { data } = useRequest(getUserInfoService);
  const { username, nickname } = data || {};
  const logOut = () => {
    removeToken();
    nav(LOGIN_PATHNAME);
    message.success("退出成功");
  };
  const UserInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logOut}>
        退出
      </Button>
    </>
  );
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;
  return <div>{username ? UserInfo : Login}</div>;
};
export default UserInfo;
