const TokenKey = 'Admin-Token'

export const getToken = () => {
  return localStorage.getItem(TokenKey)
}

export const setToken = (token: string) => {
  return localStorage.setItem(TokenKey, token)
}

export const removeToken = () => {
  localStorage.removeItem(TokenKey)
}
