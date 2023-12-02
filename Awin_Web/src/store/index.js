import { createStore } from 'vuex'
import router from '../router'
import axios from 'axios'
import { useStore } from 'vuex'

export default createStore({
  state: {
    userData: null
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData
    },

    clearUserData(state) {
      console.log('clearUserData')
      state.userData = null
    }
  },

  actions: {
    async login({ commit }, personInfo) {
      console.log('login')
      commit('setUserData', personInfo)
      router.push('/')
    },

    async logout({ commit }) {
      console.log('logout')
      commit('clearUserData')
      router.push('/login')
    },

    fetchUser({ commit }) {
      console.log('fetchUser')
      const store = useStore()

      if (store.state.userData != null) {
        axios
          .get(`http://localhost:8080/api/person/personId/${store.state.userData.personId}`)
          .then((response) => {
            if (response.data.identify === 'VISITOR') {
              console.log('VISITOR')
            } else {
              commit('setUserData', response.data)
            }
          })
          .catch((error) => {
            console.log('Get Person: ', error)
          })
      } else {
        console.log('no User Data : ', store.state.userData)
      }
    }
  }
})
