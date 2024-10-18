import { useEffect, useState } from "react"
import useGetUserInfo from './useGetUserInfo'
import { useRequest } from "ahooks"
import { getUserInfoService } from "../servers/user"
import { useDispatch } from "react-redux"
import { loginReducer } from "../store/userReducer"

const useLoadUserData = () => {
  const [waitingUserData, setWaitingUserData] = useState(true)
  const dispatch = useDispatch()

  // ajax加载完用户信息后放在redux中
  const {run} = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(res) {
      const {username, nickname} = res
      // 存储到store
      dispatch(loginReducer({username, nickname}))
    },
    onFinally() {
      setWaitingUserData(false)
    }
  })
  const { username } = useGetUserInfo()
  useEffect(() => {
    if(username) {
      setWaitingUserData(false)
      return
    } 
    run()
  }, [username])


  return {waitingUserData}
}
export default useLoadUserData