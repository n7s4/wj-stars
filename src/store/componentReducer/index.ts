import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ComponentPropsType} from '../../components/questionComponents/index'
export type ComponentInfoType = {
  fe_id: string,
  type: string,
  title: string,
  props: ComponentPropsType
}
export type ComponentStateType = {
  componentList: Array<ComponentInfoType>
}
const INIT_STATE:  ComponentStateType = {
  componentList: []
}
export const conponentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
      return action.payload
    },
  }
})
export const {resetComponents} = conponentsSlice.actions
export default conponentsSlice.reducer