import { getTreeChannel, getChannel } from '@/api/channel'

const getDefaultState = () => {
  return {
    treeChannel: [],
    channel: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_TREE_CHANNEL: (state, data) => {
    state.treeChannel = data
  },
  SET_CHANNEL: (state, data) => {
    state.channel = data
  }
}
const actions = {
  async getTreeChannel ({ commit }) {
    const { data } = await getTreeChannel()
    commit('SET_TREE_CHANNEL', data)
  },
  async getChannel ({ commit }) {
    const { data: { list }} = await getChannel()
    commit('SET_CHANNEL', list)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
