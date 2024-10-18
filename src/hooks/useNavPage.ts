import { useEffect } from "react"
import useGetUserInfo from "./useGetUserInfo"
import { useLocation, useNavigate } from "react-router-dom"
import { isLoginOrRegister, isNoNeedUserInfo, LOGIN_PATHNAME, MANAGE_LIST_PATHNAME } from "../router"

const useNavPage = (waitingUserData: boolean) => {
  const {username }= useGetUserInfo()
  const {pathname} = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    if(waitingUserData) {
      return
    }
    if(username) {  // 用户已经登陆了
      if(isLoginOrRegister(pathname)) {
        nav(MANAGE_LIST_PATHNAME)
      }
      return
    }

    // 未登录
    if(isNoNeedUserInfo(pathname)) return
    else nav(LOGIN_PATHNAME)
  }, [username, pathname, waitingUserData])
}
export default useNavPage