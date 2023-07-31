import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getToken, removeToken } from '@/utils/auth'
import { filterNull } from '@/utils/tools'
// create an axios instance
const service = axios.create({
  baseURL: '/api/v1/', // url = base url + request url
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const token = getToken()
    if (token) {
      config.headers['token'] = token
    }
    config.data = filterNull(config.data)
    config.params = filterNull(config.params)
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (response.status !== 200 || res.status !== 0) {
      ElMessage({
        message: res.msg || res.data || 'Error',
        type: 'error',
        duration: 5000
      })
      return Promise.reject(new Error(res.msg || res.data || 'Error'))
    } else {
      return Promise.resolve(res.data)
    }
  },
  (error) => {
    console.log('err ' + error)
    const { response } = error
    const { data, status } = response
    if (status === 401) {
      ElMessageBox.confirm('登录超时，请重新登录！', '提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeToken()
        window.location.href = '/login'
      })
    } else {
      ElMessage({
        message: data.msg || error.message || 'Error',
        type: 'error',
        duration: 5000
      })
      return Promise.reject(error)
    }
  }
)

export default service
