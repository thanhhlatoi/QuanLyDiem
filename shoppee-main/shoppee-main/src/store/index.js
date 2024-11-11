// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from "@/config/axios.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return axios.post('/login', { username, password })
        .then(response => {
          const user = response.data
          commit('setUser', user)
          return user
        })
    },
    logout({ commit }) {
      commit('setUser', null)
    }
  },
  getters: {
    username(state) {
      return state.user ? state.user.username : null
    }
  }
})