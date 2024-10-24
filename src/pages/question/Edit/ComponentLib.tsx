import React, { FC } from "react";
import {
  componentConfGroup,
  ComponentConfType,
} from "../../../components/questionComponents";
import { Typography } from "antd";
import styles from "./componentLib.module.scss";
import { useDispatch } from "react-redux";
import { addComponent } from "../../../store/componentReducer";
import { nanoid } from "@reduxjs/toolkit";
const { Title } = Typography;

const genComponent = (c: ComponentConfType) => {
  const { title, type, Component, defaultProps } = c;
  const dispatch = useDispatch();
  // 点击添加到画布
  const handleClick = () => {
    dispatch(
      addComponent({ fe_id: nanoid(), title, type, props: defaultProps })
    );
  };
  return (
    <div key={type} className={styles.wrapper} onClick={() => handleClick()}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
};
const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((c, index) => {
        return (
          <div key={c.groupId}>
            <Title
              level={3}
              style={{
                fontSize: "16px",
                marginTop: index > 0 ? "20px" : "0px",
              }}
            >
              {c.groupName}
            </Title>
            <div>
              {c.components.map((c) => {
                return genComponent(c);
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ComponentLib;
