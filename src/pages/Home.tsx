import { Button } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const nav = useNavigate();
  const clickHandle = () => {
    nav("login");
  };
  return (
    <div>
      <p>home</p>
      <div>
        <Button onClick={clickHandle}>登录</Button>
      </div>
    </div>
  );
};
export default Home;
