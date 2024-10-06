import React, { FC } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { MANAGE_LIST_PATHNAME } from "../router";

const NotFound: FC = () => {
  const nav = useNavigate();
  return (
    <Result
      status={404}
      title="404"
      subTitle="时间纷纷扰扰，我们终会再见"
      extra={
        <Button onClick={() => nav(MANAGE_LIST_PATHNAME)}>返回首页</Button>
      }
    ></Result>
  );
};
export default NotFound;
