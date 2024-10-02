import React, { FC, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./List.module.scss";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
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
    isPublished: false,
    isStar: false,
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
const List: FC = () => {
  useTitle("调查君 - 我的问卷");
  const [questionList, setQuestionList] = useState(rawQuestionList);
  const [searchParams] = useSearchParams();
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>（搜索）</div>
      </div>
      <div className={styles.content}>
        {questionList.map((q) => {
          const { _id, title } = q;
          return <QuestionCard key={_id} {...q} />;
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  );
};
export default List;
