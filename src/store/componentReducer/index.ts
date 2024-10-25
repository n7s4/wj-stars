import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ComponentPropsType} from '../../components/questionComponents/index'
import {produce} from "immer"
import { getNexSelectedId } from "./utils";
export type ComponentInfoType = {
  fe_id: string,
  type: string,
  title: string,
  isHidden?: boolean,
  props: ComponentPropsType
}
export type ComponentStateType = {
  componentList: Array<ComponentInfoType>
  selectedId: string
}
const INIT_STATE:  ComponentStateType = {
  componentList: [],
  selectedId: ''
}
export const conponentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
      return action.payload
    },
    changeSelectedId: produce((draft: ComponentStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    // 添加新组件
    addComponent: produce((draft: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload
      const {selectedId, componentList} = draft
      const index = componentList.findIndex(item => item.fe_id === selectedId)
      if(index < 0) {
        // 未选中任何组件
        draft.componentList.push(newComponent)
      } else {
        // 选中组件 插入
        draft.componentList.splice(index + 1, 0, newComponent)
      }
      draft.selectedId = newComponent.fe_id
    }),
      // 删除选中的组件
    deleteComponent: produce((draft: ComponentStateType) => {
      const {componentList, selectedId} = draft
      // 重新计算selectedId
      const  newSelected= getNexSelectedId(selectedId, componentList)
      const index = draft.componentList.findIndex(item => item.fe_id === selectedId)
      if(index !== -1 ) {
        draft.componentList.splice(index, 1)
      }
      draft.selectedId = newSelected
    }),
    // 修改组件属性
    changeComponentProps: produce((draft: ComponentStateType, action: PayloadAction<{fe_id: string, newProps: ComponentPropsType}>) =>{
      const {fe_id, newProps} = action.payload
      const curComp = draft.componentList.find(item => item.fe_id === fe_id)
      if(curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps
        }
      }
    }),
    // 隐藏/显示 组件
    changeComponentHidden: produce((draft: ComponentStateType, action: PayloadAction<{fe_id: string, isHidden: boolean}>) => {
      const {componentList = []} = draft
      const {fe_id, isHidden} = action.payload
      // 重新计算selectedId
      let newSelected = ''
      if(isHidden) {
        // 要隐藏
        newSelected= getNexSelectedId(fe_id, componentList)
      } else {
        // 要显示
        newSelected = fe_id
      }
      draft.selectedId = newSelected
      
      const curComp = componentList.find(item => item.fe_id === fe_id)
      if(curComp) {
        curComp.isHidden = isHidden
      }

    })
  },

})
export const {
  resetComponents, 
  changeSelectedId, 
  addComponent, 
  deleteComponent, 
  changeComponentProps, 
  changeComponentHidden
} = conponentsSlice.actions
export default conponentsSlice.reducer