import React, { FC } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./ManageLayout.module.scss";
import { Button, Space, Flex, Divider } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button icon={<PlusOutlined />} size="large">
            新建问卷
          </Button>
          <Divider style={{ borderTop: "trnasparent" }} />
          <Button
            icon={<BarsOutlined />}
            size="large"
            onClick={() => nav("/manage/list")}
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
          >
            我的问卷
          </Button>

          <Button
            icon={<StarOutlined />}
            size="large"
            onClick={() => nav("/manage/star")}
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
          >
            星标问卷
          </Button>

          <Button
            icon={<DeleteOutlined />}
            size="large"
            onClick={() => nav("/manage/trash")}
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};
export default ManageLayout;
