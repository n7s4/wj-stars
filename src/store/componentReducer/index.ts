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
    // 修改slectedId
    // changeSelectedId: (state: ComponentStateType, action: PayloadAction<string>) => {
    //   state.selectedId = action.payload
    // },
    changeSelectedId: produce((draft: ComponentStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
  }
})
export const {resetComponents, changeSelectedId} = conponentsSlice.actions
export default conponentsSlice.reducer