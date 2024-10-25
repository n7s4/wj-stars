import { DeleteOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  changeComponentHidden,
  deleteComponent,
} from "../../../store/componentReducer";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId } = useGetComponentsInfo();
  const handleDelete = () => {
    dispatch(deleteComponent());
  };
  const handleHidden = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
    // 重新计算 selectedId
  };
  return (
    <div>
      <Space>
        <Tooltip title="删除" placement="top">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          ></Button>
        </Tooltip>
        <Tooltip title="隐藏" placement="top">
          <Button
            shape="circle"
            icon={<EyeInvisibleOutlined />}
            onClick={handleHidden}
          ></Button>
        </Tooltip>
      </Space>
    </div>
  );
};
export default EditToolbar;
