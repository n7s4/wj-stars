import React, { FC, useState } from "react";
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
import { useRequest } from "ahooks";
import {
  duplicateQuestionService,
  updateQuestionService,
} from "../servers/question";
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

  // 修改标星
  const [isStarState, setIsStarState] = useState(isStar);
  const { run: changeStar, loading: changeLoadingStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
        messageApi.open({
          type: "success",
          content: "更新成功",
        });
      },
    }
  );
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { confirm } = Modal;

  // 复制
  const { run: duplicate, loading: duplicateLoading } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id);
      return data;
    },
    {
      manual: true,
      onSuccess(res) {
        message.success("复制成功");
        nav(`/question/edit/${res.id}`); // 跳转到编辑页
      },
    }
  );

  // 假删除单个问卷
  const [isDeletedState, setIsDeletedState] = useState(false);
  const { run: handleDle, loading: deleteLoading } = useRequest(
    async () => {
      await updateQuestionService(_id, { isDeleted: true });
    },
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        setIsDeletedState(true);
      },
    }
  );

  const del = () => {
    confirm({
      title: "确定要删除吗？",
      cancelText: "取消",
      okText: "确定",
      content: "删除后无法恢复，确定要删除吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        handleDle();
      },
    });
  };
  // 已经删除的问卷不需要渲染卡片了
  if (isDeletedState) return null;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublish ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStarState && <StarOutlined style={{ color: "red" }} />}
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
            <Button
              icon={<StarOutlined />}
              size="small"
              type="text"
              onClick={changeStar}
              disabled={changeLoadingStar}
            >
              {isStarState ? "取消标星" : "标星"}
            </Button>
            <Button
              icon={<CopyOutlined />}
              type="text"
              onClick={duplicate}
              disabled={duplicateLoading}
            >
              复制
            </Button>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              onClick={del}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
