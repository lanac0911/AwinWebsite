<template>
  <main class="bg-gray-800 min-h-screen flex items-center justify-center w-full z-10">
    <form class="w-full max-w-sm p-8 bg-gray-100 shadow-md rounded-lg" @submit.prevent="login">
      <h2 class="text-2xl uppercase mb-8 font-bold text-purple-600">Login</h2>
      <div class="mb-4">
        <input
          type="text"
          placeholder="Person ID"
          v-model="login_form.personId"
          class="w-full p-2 border-b-2 focus:outline-none focus:border-purple-600"
        />
      </div>
      <div class="mb-6">
        <input
          type="password"
          placeholder="Password"
          v-model="login_form.password"
          class="w-full p-2 border-b-2 focus:outline-none focus:border-purple-600"
        />
      </div>
      <div>
        <input
          type="submit"
          value="Login"
          class="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded cursor-pointer uppercase"
        />
      </div>

      <p class="text-center mt-4">
        Don't have an account?
        <router-link to="/register" class="text-purple-600 underlineb font-bold"
          >Register</router-link
        >
      </p>
    </form>
  </main>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const login_form = ref({
      personId: '',
      password: ''
    })

    const login = async () => {
      try {
        if (!login_form.value.personId || !login_form.value.password) {
          console.error('請填寫所有必填字段')
          return
        }

        const loginPerson = {
          personId: login_form.value.personId,
          password: login_form.value.password
        }

        console.log(loginPerson)
        const loginUrl = `http://localhost:8080/api/person/login/${loginPerson.personId}/${loginPerson.password}`

        await axios
          .get(loginUrl)
          .then((response) => {
            console.log('登入成功:', response.data)
          })
          .catch((error) => {
            console.error('登入期間發生錯誤:', error)
          })
      } catch (error) {
        console.error('發生錯誤:', error)
      }
    }

    return {
      login_form,
      login
    }
  }
}
</script>
