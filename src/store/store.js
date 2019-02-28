import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
  userType: ''
}

const mutations = {
  changeUserId (state, userType) {
    state.userType = userType
  }
}

const actions = {
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
