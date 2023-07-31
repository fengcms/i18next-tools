import request from '@/utils/request'

export const getRsaKey = (): Promise<string> =>  {
  return request({
    url: 'rsa_public_key',
    method: 'get'
  })
}

export const login = (data: any): Promise<{token: string}> =>  {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

export const logout = () => {
  return request({
    url: 'logout',
    method: 'get'
  })
}
export const getProfile = () => {
  return request({
    url: 'profile',
    method: 'get'
  })
}

export function getSiteCount () {
  return request({
    url: 'count',
    method: 'get'
  })
}
