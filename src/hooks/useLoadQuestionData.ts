import { useEffect, useState } from "react";
import { getQuestionList } from "../servers/question";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
const useLoadQuestionData = () => {
  const { id = "" } = useParams();
  // const [loading, setLoading] = useState(true);
  // const [questionData, setQuestionData] = useState({});
  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionList(id);
  //     setQuestionData(data);
  //     setLoading(false);
  //   }
  //   fn();
  // }, []);
  // return [loading, questionData]
  async function load() {
    const data = await getQuestionList(id);
    return data
  }
  const {data, loading, error}= useRequest(load)
  return [loading, data, error]
}
export default useLoadQuestionData;
