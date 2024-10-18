import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type UserStateType = {
  // token: string
  username: string
  nickname: string
}
const INIT_STATE = { username: '', nickname: '' }
export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (state: UserStateType, action:PayloadAction<UserStateType>) => {
      return action.payload // 设置username nickname 到resux stor
    },
    logoutReducer: () => {
      return INIT_STATE // 清空redux stor
    }
  }
})
export const { loginReducer, logoutReducer } = userSlice.actions
export default userSlice.reducer