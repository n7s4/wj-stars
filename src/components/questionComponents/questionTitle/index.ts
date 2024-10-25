/**
 * @description 问卷 标题
 * @author 文殊
 */
import Component from './component'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '标题',
  type: 'questionTitle',
  Component,
  PropComponent, //属性组件
  defaultProps: QuestionTitleDefaultProps
}
