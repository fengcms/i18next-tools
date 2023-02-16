const Domain = 'http://manage.iguanziben.com'
const ApiPre = '/api/v1/'
const PageSize = 10
const PageSizes = [10, 15, 20, 50, 100, 200, 500]
const StaticDomain = 'http://www.iguanziben.com'
// 将 vue-element-admin 的设置选项转移到 /src/config/index.js 中配置
const Settings = {
  title: '观资本 管理后台',
  // 主操作区头部是否固定位置
  fixedHeader: true,
  // 侧边栏是否显示LOGO
  sidebarLogo: true,
  // 项目编译目录
  publicPath: '/',
  // 项目开发环境运行端口
  port: 3008
}
module.exports = {
  Domain, ApiPre, PageSize, PageSizes, Settings, StaticDomain
}
