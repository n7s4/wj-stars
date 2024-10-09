import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../../../servers/question";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";

const Edit: FC = () => {
  // 自定义 hooks
  const [loading, data] = useLoadQuestionData();
  return (
    <div>
      <div>Edit</div>
      {loading ? <p>加载中...</p> : JSON.stringify(data)}
    </div>
  );
};
export default Edit;
