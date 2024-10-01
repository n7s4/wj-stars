/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
// import { LoadingOutlined } from "@ant-design/icons";
// import { Spin } from "antd";
import { DotLoading } from "antd-mobile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const waitList: any = []; //等待队列
const isRender: boolean = false; //控制渲染条件

const waitRender = () => {
  const res = waitList.shift();
  if (!res) return;
  setTimeout(() => {
    res();
  }, 500); //为演示效果加入一个延长时间
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, react/display-name
const HOC =
  (Component: any) =>
  ({ list, ...props }: any) => {
    const [data, setData] = useState<any>([]);
    useEffect(() => {
      if (list.length !== 0) {
        sliceTime(list, 0);
      }
    }, [list]);

    const sliceTime = (list: unknown[], times = 0, number: number = 100) => {
      if (times === Math.ceil(list.length / number) + 1) return; //判断条件
      setTimeout(() => {
        const newList: any = list.slice(times * number, (times + 1) * number);
        waitList = [...waitList, ...newList];
        setData(waitList);
        sliceTime(list, times + 1);
      }, 500);
    };
    if (list.length === 0) return <></>;

    return (
      <>
        {data.map((item: unknown) => (
          <Component id={item} {...props} key={item} />
        ))}
      </>
    );
  };

export default HOC;
