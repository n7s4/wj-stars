import { FC } from 'react'
import QuestionInputConf, {QuestionInputPropsType} from './questionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './questionTitle'
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 组件的配置
export type ComponentConfType = {
  title: string,
  type: string,
  Component: FC<ComponentPropsType>,
  defaultProps: ComponentPropsType
}
// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}