import React, { FC, useEffect, useState } from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
const { Title } = Typography;
import useGetUserInfo from "../hooks/useGetUserInfo";
import { HOME_PATHNAME, MANAGE_LIST_PATHNAME } from "../router";

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState(HOME_PATHNAME);
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_LIST_PATHNAME);
    }
  }, [username]);
  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>调查君</Title>
        </Space>
      </Link>
    </div>
  );
};
export default Logo;
