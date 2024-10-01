import React, { FC, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import styles from "./List.module.scss";
const List: FC = () => {
  const [questionList, setQuestionList] = useState([]);
  return (
    <>
      <p>List</p>
    </>
  );
};
export default List;
