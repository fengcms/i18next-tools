const { removeToken } = require(':core/session')
const { succ } = global.tool
module.exports = async (ctx, { params, token }, next) => {
  await removeToken(token)
  ctx.body = succ('ιεΊζε')
}
