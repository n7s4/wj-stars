import { useEffect, useState } from "react";
import { getQuestionService } from "../servers/question";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux"; 
import { resetComponents } from "../store/componentReducer";
const useLoadQuestionData = () => {
  const dispatch = useDispatch()
  const { id = "" } = useParams();
  const {data, loading, error, run} = useRequest(async (id: string) => {
    if(!id) throw new Error('没有问卷 id')
    const data = await getQuestionService(id)
    return data
  }, {
    manual: true,
  })

  // 根据获取的data 保存到redux
  useEffect(() => {
    if(!data) return

    const {title = '', componentList = []}  = data 
    dispatch(resetComponents({componentList, selectedId: ''}))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])
  return {loading, error}
}
export default useLoadQuestionData;
