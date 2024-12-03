export type QuestionTextareaPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: QuestionTextareaPropsType) => void  
  disabled?: boolean
}
export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '多行输入框',
  placeholder: '可以输入很多哦~'
}