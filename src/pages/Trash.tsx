import React, { FC, useState } from "react";
import QuestionCard, { questionType } from "../components/QuestionCard";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import {
  Empty,
  Typography,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  message,
  Spin,
} from "antd";
import styles from "../pages/manage/Common.module.scss";
import ListSearch from "../components/ListSearch";
import useLoadQuestionListData from "../hooks/useLoadQuestionListData";
import ListPage from "../components/ListPage";
const { Title } = Typography;
const { confirm } = Modal;
const columns = [
  { title: "标题", dataIndex: "title", key: "title" },
  {
    title: "发布状态",
    dataIndex: "isPublish",
    key: "isPublish",
    render: (value: boolean) => (
      <Tag color={value ? "green" : "blue"}>{value ? "已发布" : "未发布"}</Tag>
    ),
  },
  { title: "答卷数量", dataIndex: "answerCount", key: "answerCount" },
  { title: "创建时间", dataIndex: "createAt", key: "createAt" },
];
const Trash: FC = () => {
  useTitle("调查君 - 回收站 ");
  const { data = {}, loading } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total } = data as any;
  const [selectIds, setSelectIds] = useState<string[]>([]);
  const del = () => {
    confirm({
      title: "确定删除吗？",
      content: "彻底删除以后不可以找回，确认要删除嘛？",
      onOk() {
        message.success(`彻底删除成功${selectIds}`);
      },
      onCancel() {
        console.log("删除失败");
      },
    });
  };
  const TableElement = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button danger disabled={selectIds.length === 0} onClick={del}>
            彻底删除
          </Button>
          <Button type="primary" disabled={selectIds.length === 0}>
            恢复
          </Button>
        </Space>
      </div>

      <Table
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey={(q: any) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectionKey) => {
            setSelectIds(selectionKey as string[]);
          },
        }}
      />
    </>
  );
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
          {selectIds}
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div>
            <Spin style={{ textAlign: "center" }}></Spin>
          </div>
        )}
        {!loading && list.length == 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElement}
      </div>
      <div className={styles.foooter}>
        <ListPage total={total} />
      </div>
    </>
  );
};
export default Trash;
