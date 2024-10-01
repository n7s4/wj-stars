import { Button } from "antd";
import React, { FC } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login: FC = () => {
  const nav = useNavigate();
  return (
    <div>
      <p>Login</p>
      <div>
        <Button onClick={() => nav(-1)}>返回</Button>
        <Link to="/register">注册</Link>
      </div>
    </div>
  );
};
export default Login;
