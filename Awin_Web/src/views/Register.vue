<template>
  <main class="bg-gray-800 min-h-screen flex items-center justify-center">
    <form class="w-full max-w-sm p-8 bg-gray-100 shadow-md rounded-lg" @submit.prevent="register">
      <h2 class="text-2xl uppercase mb-8 font-bold text-purple-600">Register</h2>
      <div class="mb-4">
        <input
          type="email"
          placeholder="Email address"
          v-model="register_form.email"
          class="w-full p-2 border-b-2 focus:outline-none focus:border-purple-600"
        />
      </div>
      <div class="mb-6">
        <input
          type="password"
          placeholder="Password"
          v-model="register_form.password"
          class="w-full p-2 border-b-2 focus:outline-none focus:border-purple-600"
        />
      </div>
      <div>
        <input
          type="submit"
          value="Register"
          class="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded cursor-pointer uppercase"
        />
      </div>

      <p class="text-center mt-4">
        Already have an account?
        <router-link to="/login" class="text-purple-600 underlineb font-bold">Login</router-link>
      </p>
    </form>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const register_form = ref({})
    const store = useStore()

    const register = () => {
      store.dispatch('register', register_form.value)
    }

    return {
      register_form,
      register
    }
  }
}
</script>
