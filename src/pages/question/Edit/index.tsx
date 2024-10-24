import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../../../servers/question";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import { changeSelectedId } from "../../../store/componentReducer";
import { useDispatch } from "react-redux";
import LeftPanel from "./LeftPanel";

const Edit: FC = () => {
  // 自定义 hooks
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();
  const clearSelectId = () => {
    dispatch(changeSelectedId(""));
  };
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: "white", height: "40px" }}>header</div>
      <div className={styles["container-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectId}>
            <div className={styles["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  );
};
export default Edit;
