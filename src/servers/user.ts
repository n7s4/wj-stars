import axios, {ResDataType} from './ajax'

/**
 * 获取用户信息
 * @returns 
 */
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info'
  const data = (await axios.get(url)) as ResDataType
  return data
}

/**
 * 
 * @param username 用户名
 * @param password 用户密码
 * @param nickname 昵称
 * @returns 
 */
export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = '/api/user/register'
  const body = { username, password, nickname:nickname || username }
  const data = (await axios.post(url, body)) as ResDataType
  return data
}

/**
 * 
 * @param username 用户名
 * @param password 密码
 * @returns 
 */
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = '/api/user/login'
  const body = { username, password }
  const data = (await axios.post(url, body)) as ResDataType
  return data
}