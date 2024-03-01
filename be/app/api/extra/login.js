const { succ, rsa } = global.tool
const { getItem } = require(':query')
const { makeToken } = require(':core/session')
const { getStrSha256 } = require(':utils/hash')

module.exports = async (ctx, { params }, next) => {
  const { account, password, role } = params
  // 校验传参是否为空
  if (!account || !password || !role) ctx.throw(400, '请输入用户名密码')
  // 校验登录角色参数
  if (!['admin', 'editor'].includes(role)) ctx.throw(400, '用户角色参数错误')
  // console.log(await rsa.encrypt('123456'))
  // console.log(await rsa.decrypt('Wws40uLybj5XyreKgbGVQSmKS306+dnPV6Jn1DxaQyPXyh1Vmt0KdUxS3aUamiQVKXcnhvJrQDEKpUjwODxVV1JwQwdxclrh3nZ7Vs+0tldVg4BPK5x3FOetgajtC4VHfu6LJHVPZZuTqhOlcEY6zZ7XnW58m48DRh/IaaFi6e4='))
  // 校验传入密码是否能解密，如能解密则赋值 reqPw
  const reqPw = await rsa.decrypt(password).catch(e => ctx.throw(400, '用户名密码错误1'))
  console.log(reqPw)
  // 从数据库存储用户信息，根据不同角色，从不同表内读取
  const dbUser = await getItem(role === 'admin' ? 'Manages' : 'Editor', { account })
  // 校验传入用户名是否存在
  if (!dbUser) ctx.throw(400, '用户名密码错误2')
  // 将传入的密码加盐，取 sha256 值
  const hashPw = getStrSha256(reqPw + dbUser.salt)
  // 和数据库中存储的哈希值进行比对
  if (dbUser.password !== hashPw) ctx.throw(400, '用户名密码错误3')

  // 用户通过校验
  const token = await makeToken(role, account, dbUser.id)
  ctx.cookies.set('token', token, { httpOnly: true })
  ctx.body = succ({ token })
}
