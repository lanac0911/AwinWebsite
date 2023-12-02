import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'

export default createStore({
  state: {
    userData: null
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData
    }
  },

  actions: {
    async login({ commit }, personInfo) {
      commit('setUserData', personInfo)
      router.push('/')
    },

    async register({ commit }, details) {
      const { email, password } = details

      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('Email already in use')
            break
          case 'auth/invalid-email':
            alert('Invalid email')
            break
          case 'auth/operation-not-allowed':
            alert('Operation not allowed')
            break
          case 'auth/weak-password':
            alert('Weak password')
            break
          default:
            alert('Something went wrong')
        }

        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/')
    },

    async logout({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      router.push('/login')
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    }
  }
})
