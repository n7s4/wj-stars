import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined, DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UpOutlined
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  changeComponentHidden, copySelectedComponent,
  deleteComponent, pasteCopiedComponent, selectNextComponent, selectPrevComponent, toggleComponentLock,
} from "../../../store/componentReducer";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentsInfo();
  const { isLocked } = selectedComponent || {};
  const handleDelete = () => {
    dispatch(deleteComponent());
  };
  const handleHidden = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
    // 重新计算 selectedId
  };
  // 锁定组件
  const handleLocked = () => {
    dispatch(toggleComponentLock({ fe_id: selectedId}))
  }
  // 复制
  const copy = () => {
    dispatch(copySelectedComponent())
  }

  // 粘贴
  const paste = () => {
    // 粘贴事件
    dispatch(pasteCopiedComponent())
  }

  // 上移
  const upArrow = () => {
    dispatch(selectPrevComponent())
  }

  // 下移
  const downArrow = () => {
   dispatch(selectNextComponent())
  }
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
        <Tooltip title="锁定" placement="top">
          <Button
              type={isLocked ? 'primary' : 'default'}
              shape="circle"
              icon={<LockOutlined />}
              onClick={handleLocked}
          ></Button>
        </Tooltip>
        <Tooltip title="复制" placement="top">
          <Button
              shape="circle"
              icon={<CopyOutlined />}
              onClick={copy}
          ></Button>
        </Tooltip>
        <Tooltip title="粘贴" placement="top">
          <Button
              disabled={copiedComponent === null}
              shape="circle"
              icon={<BlockOutlined />}
              onClick={paste}
          ></Button>
        </Tooltip>
        <Tooltip title="上移" placement="top">
          <Button
            shape="circle"
            icon={<UpOutlined />}
            onClick={upArrow}
          ></Button>
        </Tooltip>
        <Tooltip title="下移" placement="top">
          <Button
            shape="circle"
            icon={<DownOutlined />}
            onClick={downArrow}
          ></Button>
        </Tooltip>
      </Space>
    </div>
  );
};
export default EditToolbar;
