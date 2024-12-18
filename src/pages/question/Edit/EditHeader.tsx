import React, { FC } from "react";
import styles from "./editHeader.module.scss";
import { Button, Space, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import EditToolbar from "./EditToolbar";
const { Title } = Typography;
const EditHeader: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space align="baseline">
            <Button
              size="small"
              type="link"
              icon={<LeftOutlined />}
              onClick={() => nav(-1)}
            >
              返回
            </Button>
            <Title>问卷标题</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button size="small">保存</Button>
            <Button size="small" type="primary">
              发布
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
export default EditHeader;
