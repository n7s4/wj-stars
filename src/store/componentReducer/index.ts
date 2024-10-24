import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ComponentPropsType} from '../../components/questionComponents/index'
import {produce} from "immer"
export type ComponentInfoType = {
  fe_id: string,
  type: string,
  title: string,
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
  }
})
export const {resetComponents, changeSelectedId, addComponent} = conponentsSlice.actions
export default conponentsSlice.reducer