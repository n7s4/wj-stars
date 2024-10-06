import React, { FC, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./Common.module.scss";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import { Typography } from "antd";
const rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: true,
    isStar: false,
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
  {
    _id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: false,
    answerCount: 10,
    createAt: "2022-02-02",
  },
  {
    _id: "q4",
    title: "问卷4",
    isPublished: false,
    isStar: false,
    answerCount: 10,
    createAt: "2022-02-02",
  },
];
const { Title } = Typography;
const List: FC = () => {
  useTitle("调查君 - 我的问卷");
  const [questionList, setQuestionList] = useState(rawQuestionList);
  const [searchParams] = useSearchParams();
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title>我的问卷</Title>
        </div>
        <div className={styles.right}>（搜索）</div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id, title } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>LoadMore ......加载更多</div>
    </>
  );
};
export default List;
