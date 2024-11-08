import React, { FC, MouseEvent } from "react";
import styles from "./editCanvas.module.scss";
import { Spin } from "antd";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import { ComponentInfoType } from "../../../store/componentReducer";
import { getComponentConfByType } from "../../../components/questionComponents";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/componentReducer";
import { StateType } from "../../../store";
import classNames from "classnames";
import useBandCanvasKeyPress from "../../../hooks/useBandCanvasKeyPress";

type PropsType = {
  loading: boolean;
};
// 获取组件
const genComponent = (componentInfo: ComponentInfoType) => {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf;
  return <Component {...props} />;
};
const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { loading } = props;
  const { componentList, selectedId } = useGetComponentsInfo();
  const dispatch = useDispatch();

  // 点击组件，讲组件的id存到redux
  const handleClick = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    dispatch(changeSelectedId(id));
  };
  useBandCanvasKeyPress()
  if (loading)
    return (
      <div style={{ textAlign: "center" }}>
        <Spin />
      </div>
    );
  return (
    <div className={styles.canvas}>
      {componentList
        .filter((v) => !v.isHidden)
        .map((c: any) => {
          const { fe_id, isLocked } = c;
          // 拼接 class name
          const wrapperDefaultName = styles["component-wrapper"];
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames(wrapperDefaultName, {
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          });
          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={(e) => handleClick(e, fe_id)}
            >
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          );
        })}
    </div>
  );
};
export default EditCanvas;
