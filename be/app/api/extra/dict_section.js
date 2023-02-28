/*
  树形栏目菜单接口
*/
const { succ } = global.tool
const { getList } = require(':query')
module.exports = async (ctx, { params }) => {
  const { pid, sid } = params
  if (!pid || !sid) ctx.throw(400, '入参错误')

  // 从栏目表拿出所有的栏目数据
  const { list } = await getList('Dicts', { pagesize: -1, sort: '-id' })

  const project = list.find((item) => item.id === Number(pid))
  const section = list.find((item) => item.id === Number(sid))
  // console.log(project, section)

  // 递归函数
  const makeTree = (pid, arr) => {
    const res = []
    for (const i of arr) {
      // console.log(i.pid)
      // 直接构型成 element 等 vue 框架的默认数据格式，避免前端需要转化
      // const obj = { value: i.id, label: i.name }
      if (i.pid === Number(pid)) {
        const child = makeTree(i.id, arr)
        if (child.length) i.children = child
        res.push(i)
      }
    }
    return res
  }
  // 得到结果并返回
  const dicts = makeTree(sid, list)
  ctx.body = succ({ project, section, dicts })
}
