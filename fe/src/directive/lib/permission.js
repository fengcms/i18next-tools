import store from '@/store'

export const name = 'permission'
function checkPermission (el, binding) {
  const { value } = binding
  const role = store.getters && store.getters.role

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const hasPermission = value.includes(role)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default (Vue, initOptions = {}) => {
  Vue.directive(name, {
    inserted (el, binding) {
      checkPermission(el, binding)
    },
    update (el, binding) {
      checkPermission(el, binding)
    }
  })
}
