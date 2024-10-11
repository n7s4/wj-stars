import React, { FC } from "react";
import styles from "./QuestionCard.module.scss";
import { Button, Space, Divider, Tag, message, Modal } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import Title from "antd/es/skeleton/Title";
export type questionType = {
  _id: string;
  title: string;
  isPublish: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
};
const QuestionCard: FC<questionType> = (props: questionType) => {
  const { _id, title, isPublish, isStar, answerCount, createAt } = props;
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { confirm } = Modal;
  const duplicate = () => {
    messageApi.open({
      type: "success",
      content: "复制成功",
    });
  };
  const handleDle = () => {
    confirm({
      title: "确定要删除吗？",
      cancelText: "取消",
      okText: "确定",
      content: "删除后无法恢复，确定要删除吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        message.success("删除成功");
      },
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublish ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStar && <StarOutlined style={{ color: "red" }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublish ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷:{answerCount}</span>

            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className={styles["button-container"]}>
        <div className={styles.left}>
          {contextHolder}
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublish}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button icon={<StarOutlined />} size="small" type="text">
              {isStar ? "取消标星" : "标星"}
            </Button>
            <Button icon={<CopyOutlined />} type="text" onClick={duplicate}>
              复制
            </Button>
            <Button icon={<DeleteOutlined />} type="text" onClick={handleDle}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
