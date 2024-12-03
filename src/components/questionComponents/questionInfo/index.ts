/**
 * @description 问卷 info 组件
 * @author 文殊=
 */
import Component from './Component'
import { QuestionInfoDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent, // 修改属性
  defaultProps: QuestionInfoDefaultProps
}
