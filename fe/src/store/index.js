import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import article from './modules/article'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    article
  },
  getters,
  plugins: [persistedState()]
})

export default store
