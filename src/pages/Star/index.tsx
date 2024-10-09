import React, { FC, useState } from "react";
import QuestionCard, { questionType } from "../../components/QuestionCard";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import { Empty, Spin, Typography } from "antd";
import styles from "../manage/Common.module.scss";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
const { Title } = Typography;
const Star: FC = () => {
  useTitle("调查君 - 星标问卷");
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total } = data;
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>{<ListSearch />}</div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin></Spin>
          </div>
        )}
        {list.length == 0 && !loading && <Empty description="暂无数据" />}
        {(!loading && list.length) > 0 &&
          list.map((q: questionType) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.foooter}>分页</div>
    </>
  );
};
export default Star;
