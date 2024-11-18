import { FC } from 'react'
import QuestionInputConf, {QuestionInputPropsType} from './questionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './questionTitle'
import QuestionParagraphConf, {QuestionParagraphPropsType} from './questionParagraph'
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType & QuestionParagraphPropsType

// 组件的配置
export type ComponentConfType = {
  title: string,
  type: string,
  Component: FC<ComponentPropsType>,
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}
export type ComponentConfGroupType = {
  groupId: string,
  groupName: string,
  components: ComponentConfType[]
}
// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf, QuestionParagraphConf]

// 组件分组
export const componentConfGroup: ComponentConfGroupType[] = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [QuestionTitleConf, QuestionParagraphConf]
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConf]
  }
]
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}