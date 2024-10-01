import React, { useEffect } from "react";
import List from "./pages/List";

function App() {
  useEffect(() => {
    console.log("hello");
  });
  return (
    <>
      <p>hello FE</p>
      <List />
    </>
  );
}

export default App;
