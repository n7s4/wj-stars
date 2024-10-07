import React, { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";

const Stat: FC = () => {
  const [loading, data] = useLoadQuestionData();
  return (
    <div>
      <div>Stat</div>
      {loading ? <p>加载中...</p> : JSON.stringify(data)}
    </div>
  );
};
export default Stat;
