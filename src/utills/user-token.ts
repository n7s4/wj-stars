export const KEY = 'user_token'
export function setToken(token: string) {
  return localStorage.setItem(KEY, token)
 }
export function getToken() {
  return localStorage.getItem(KEY) || ''
}
export function removeToken() {
  return localStorage.removeItem(KEY)
}