import React, { FC } from "react";
import styles from "./QuestionCard.module.scss";
import { Button } from "antd";
type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
};
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isPublished, isStar, answerCount, createAt } = props;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <a href="">{title}</a>
          </div>
          <div className={styles.right}>
            {isPublished ? (
              <span style={{ color: "green" }}>已发布</span>
            ) : (
              <span>未发布</span>
            )}
            &nbsp;
            <span>答卷:{answerCount}</span>
            &nbsp;
            <span>{createAt}</span>
          </div>
        </div>
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <Button>编辑问卷</Button>
            <Button>数据统计</Button>
          </div>
          <div className={styles.right}>
            <Button>标星</Button>
            <Button>复制</Button>
            <Button>删除</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuestionCard;
