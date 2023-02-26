/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:|\/\/)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername (str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// 验证手机号（大陆）
export const isMobile = mobile => {
  return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(mobile)
}
// 是不是number
export const isNum = num => {
  return Number(num).toString() !== 'NaN'
}
// 验证邮箱
export const isEmail = email => {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
}
