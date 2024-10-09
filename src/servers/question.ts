import axios from "./ajax";
import type { ResDataType } from "./ajax";
type SearchOption  = {
  keyword: string
  page: number
  pageSize: number
  isStar: boolean
  isDeleted: boolean
}

/**
 * 获取单个问卷
 * @param id 问卷id
 * @returns 
 */
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}

/**
 * 
 * @returns 新建问卷
 */
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.post(url)) as ResDataType
  return data
}

/**
 * 
 * @returns 获取问卷列表
 */
export async function getQuestionListService(params: Partial<SearchOption>): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.get(url, {params})) as ResDataType
  return data
}