import React, { useEffect } from "react";
import "./App.css";
import VariableSizeList from "./component/VariableSizeList";

function App() {
  const str = "你好";
  useEffect(() => {
    console.log("hello");
  });
  // return <div>1111</div>;
  return <VariableSizeList />;
}

export default App;
