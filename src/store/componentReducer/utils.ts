import { ComponentInfoType } from ".";

export const getNexSelectedId = (fe_id: string, componentList: Array<ComponentInfoType>) => {
  const index = componentList.findIndex(item => item.fe_id === fe_id)
  if(index < 0) return ''
  
  // 重新计算selected
  let newSelected = ''
  const length = componentList.length
  if(length <= 1) {
    newSelected = ''
  } else {
    if(index + 1 === length) {
      newSelected = componentList[index - 1].fe_id
    } else {
      newSelected = componentList[index + 1].fe_id
    }  
  }
  return newSelected
}