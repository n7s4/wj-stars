import React, { FC, useState } from "react";
import QuestionCard, { questionType } from "../../components/QuestionCard";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import { Empty, Typography } from "antd";
import styles from "../manage/Common.module.scss";
import ListSearch from "../../components/ListSearch";
const rawQuestionList: questionType[] = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: true,
    isStar: true,
    answerCount: 10,
    createAt: "2024-10-01",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: true,
    answerCount: 10,
    createAt: "2022-02-02",
  },
];
const { Title } = Typography;
const Star: FC = () => {
  useTitle("调查君 - 星标问卷");
  const [questionList, ssetQuestionList] = useState(rawQuestionList);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>{<ListSearch />}</div>
      </div>
      <div className={styles.content}>
        {questionList.length == 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map((q: questionType) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.foooter}>分页</div>
    </>
  );
};
export default Star;
