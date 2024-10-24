import { Tabs } from "antd";
import React, { FC, useState } from "react";
import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";
import ComponentLib from "./ComponentLib";

type TabPosition = "left" | "right" | "top" | "bottom";
const LeftPanel: FC = () => {
  const [mode, setMode] = useState<TabPosition>("top");
  const tabsItems = [
    {
      label: (
        <span>
          <AppstoreAddOutlined />
          组件库
        </span>
      ),
      key: "componentLib",
      children: <ComponentLib />,
    },
    {
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      key: "layers",
      children: <div>图层</div>,
    },
  ];
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
        style={{ height: 220 }}
        items={tabsItems}
      />
    </div>
  );
};
export default LeftPanel;
