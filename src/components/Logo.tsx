import React, { FC } from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
const { Title } = Typography;
import { HOME_PATHNAME } from "../router";
const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to={HOME_PATHNAME}>
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
