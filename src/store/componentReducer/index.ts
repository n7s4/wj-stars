import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {ComponentPropsType} from '../../components/questionComponents/index'
import {produce} from "immer"
import {getNexSelectedId, insertNewComponent} from "./utils";
import _ from 'lodash'
export type ComponentInfoType = {
  fe_id: string,
  type: string,
  title: string,
  isHidden?: boolean,
  isLocked?: boolean,
  props: ComponentPropsType
}
export type ComponentStateType = {
  componentList: Array<ComponentInfoType>
  selectedId: string
  copiedComponent: ComponentInfoType | null
}
const INIT_STATE:  ComponentStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null
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
      insertNewComponent(draft, newComponent)
    }),
      // 删除选中的组件
    deleteComponent: produce((draft: ComponentStateType) => {
      const {componentList, selectedId} = draft
      // 重新计算selectedId
      const  newSelected= getNexSelectedId (selectedId, componentList)
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

    }),

    // 锁定/解锁 组件
    toggleComponentLock: produce((draft: ComponentStateType, action: PayloadAction<{fe_id: string}>) => {
      const {fe_id} = action.payload
      const {componentList = []} = draft
      // 找到当前的组件
      const curComp = componentList.find(item => item.fe_id === fe_id)
      if(curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    }),
    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentStateType) => {
      const {selectedId, componentList} = draft
      const curComp = componentList.find(item => item.fe_id === selectedId)
      if(curComp === null) return
      // 深拷贝一份
      draft.copiedComponent = _.cloneDeep(curComp) || null
    }),
    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentStateType) => {
      const {copiedComponent, componentList} = draft
      if(copiedComponent === null) return

      // 需要把fe_id修改
      copiedComponent.fe_id = nanoid()
      // 插入组件
      insertNewComponent(draft, copiedComponent)
    })
  },



})
export const {
  resetComponents, 
  changeSelectedId, 
  addComponent, 
  deleteComponent, 
  changeComponentProps, 
  changeComponentHidden,
  toggleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent
} = conponentsSlice.actions
export default conponentsSlice.reducer