import React, { FC } from "react";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import {
  ComponentPropsType,
  getComponentConfByType,
} from "../../../components/questionComponents";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../../store/componentReducer";

const NoProp: FC = () => {
  return <div style={{ textAlign: "center" }}>未选中组件</div>;
};
const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentsInfo();
  if (!selectedComponent) return <NoProp />;

  const { type, props, isLocked } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return <NoProp />;

  const { PropComponent } = componentConf;
  const changeProps = (newProps: ComponentPropsType) => {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  };
  return (
    <div>
      <PropComponent {...props} onChange={changeProps} disable={isLocked}/>
    </div>
  );
};
export default ComponentProp;
