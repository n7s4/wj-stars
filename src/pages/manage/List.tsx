// eslint-disable-next-line
import React, { FC } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./Common.module.scss";
import { useRequest, useTitle } from "ahooks";
import { Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
const { Title } = Typography;
const List: FC = () => {
  useTitle("调查君 - 我的问卷");
  const { data = {}, loading } = useLoadQuestionListData({});
  const { list = [], total } = data;
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>{<ListSearch />}</div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin></Spin>
          </div>
        )}
        {/* 问卷列表 */}
        {(!loading && list.length) > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>LoadMore ......加载更多</div>
    </>
  );
};
export default List;
