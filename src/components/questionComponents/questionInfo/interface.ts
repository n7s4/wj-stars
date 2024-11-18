export type QuestionInfoPropsType = {
  text?: string
  isCenter?: boolean
  onChange?: (newProps: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  text: '一行段落',
  isCenter: false
}

