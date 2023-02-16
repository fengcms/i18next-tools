const modulesFiles = require.context('./lib', false, /.js$/)

const modules = modulesFiles.keys().reduce((modules, path) => {
  const module = modulesFiles(path)
  modules[module.name] = module.default
  return modules
}, {})

const install = (Vue, opts = {}) => {
  Object.keys(modules).forEach(name => {
    Vue.use(modules[name])
  })
}

export default {
  install
}
