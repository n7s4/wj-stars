import React, { FC } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";
import ComponentSetting from "./ComponentSetting";

const RightPanel: FC = () => {
  const tabsItems = [
    {
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      key: "prop",
      children: <ComponentProp />,
    },
    {
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      key: "setting",
      children: <ComponentSetting />,
    },
  ];
  return (
    <div>
      <Tabs items={tabsItems} defaultActiveKey="prop" />
    </div>
  );
};
export default RightPanel;
