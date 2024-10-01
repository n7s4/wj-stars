import React, { useEffect, useState } from "react";
import img from "../../assets/image/logo192.png";
// import { Button } from "antd";
import HOC from "./Hoc";
// 子组件
const Item: React.FC<{ id: number; waitRender: () => void }> = ({
  id,
  waitRender,
}) => {
  useEffect(() => {
    waitRender();
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
      <img src={img} width={80} height={60} alt="" />
      列表{id}
    </div>
  );
};

const ItemHoc = HOC(Item);
const Index: React.FC = () => {
  // const [flag, setFlag] = useState<boolean>(true);
  const [list, setList] = useState<Array<number>>([]);
  useEffect(() => {
    const arr: number[] = [];
    for (let i = 0; i < 5000; i++) {
      arr.push(i);
    }
    setList(arr);
  }, []);
  // const handleClick = async () => {
  //   setFlag(true);
  //   const arr: number[] = [];
  //   console.time();
  //   for (let i = 0; i < 5000; i++) {
  //     arr.push(i);
  //   }
  //   await setList(arr);
  //   console.timeEnd();
  // };
  return (
    <div>
      {/* <Button onClick={() => handleClick()}>渲染</Button> */}
      {list.map((item) => (
        <ItemHoc id={item} key={item} />
      ))}
    </div>
  );
};

export default Index;
