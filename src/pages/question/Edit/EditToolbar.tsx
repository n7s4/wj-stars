import { DeleteOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { deleteComponent } from "../../../store/componentReducer";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteComponent());
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
      </Space>
    </div>
  );
};
export default EditToolbar;
