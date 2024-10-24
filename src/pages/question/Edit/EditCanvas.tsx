import React, { FC } from "react";
import styles from "./editCanvas.module.scss";
import QuestionTitle from "../../../components/questionComponents/questionTitle/component";
import QuestionInput from "../../../components/questionComponents/questionInput/component";
import { Spin } from "antd";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import { ComponentInfoType } from "../../../store/componentReducer";
import { getComponentConfByType } from "../../../components/questionComponents";

type PropsType = {
  loading: boolean;
};
const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { loading } = props;
  const { componentList } = useGetComponentsInfo();

  // 获取组件
  const genComponent = (componentInfo: ComponentInfoType) => {
    const { type, props } = componentInfo;
    const componentConf = getComponentConfByType(type);
    if (componentConf == null) return null;
    const { Component } = componentConf;
    return <Component {...props} />;
  };
  if (loading)
    return (
      <div style={{ textAlign: "center" }}>
        <Spin />
      </div>
    );
  return (
    <div className={styles.canvas}>
      {componentList.map((c: any) => {
        const { fe_id } = c;
        return (
          <div key={fe_id}>
            <div className={styles["component-wrapper"]}>{genComponent(c)}</div>
          </div>
        );
      })}
    </div>
  );
};
export default EditCanvas;
