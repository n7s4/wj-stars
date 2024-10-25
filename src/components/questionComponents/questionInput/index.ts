/**
 * @description 问卷 输入框
 * @author 文殊
 */
import Component from './component'
import { questionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionInput',
  Component,
  PropComponent, // 修改属性
  defaultProps: questionInputDefaultProps
}
