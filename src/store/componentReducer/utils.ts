import {ComponentInfoType, ComponentStateType} from ".";

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

/**
 * 插入新组件
 * @param draft
 * @param newComponent 新组件
 */
export const insertNewComponent = (draft: ComponentStateType, newComponent: ComponentInfoType) => {
  const {selectedId, componentList} = draft
  const index = componentList.findIndex(item => item.fe_id === selectedId)
  if(index < 0) {
    // 未选中任何组件
    componentList.push(newComponent)
  } else {
    // 选中组件 插入
    componentList.splice(index + 1, 0, newComponent)
  }
  draft.selectedId = newComponent.fe_id
}