import React, { FC } from "react";
import styles from "./QuestionCard.module.scss";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router/index";

const UserInfo: FC = () => {
  return (
    <div>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </div>
  );
};
export default UserInfo;
