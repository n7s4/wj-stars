import { ComponentInfoType } from ".";

export const getNexSelectedId = (fe_id: string, componentList: Array<ComponentInfoType>) => {
  const visibleComponentList = componentList.filter(item => !item.isHidden)
  const index = visibleComponentList.findIndex(item => item.fe_id === fe_id)
  if(index < 0) return ''
  
  // 重新计算selected
  let newSelected = ''
  const length = visibleComponentList.length
  if(length <= 1) {
    newSelected = ''
  } else {
    if(index + 1 === length) {
      newSelected = visibleComponentList[index - 1].fe_id
    } else {
      newSelected = visibleComponentList[index + 1].fe_id
    }  
  }
  return newSelected
}