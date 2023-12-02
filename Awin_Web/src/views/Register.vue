<template>
  <main class="bg-gray-800 min-h-screen flex items-center justify-center w-full z-10">
    <form class="w-full max-w-sm p-8 bg-gray-100 shadow-md rounded-lg" @submit.prevent="register">
      <h2 class="text-2xl uppercase mb-8 font-bold text-purple-600">Register</h2>

      <!-- 學號 -->
      <div class="mb-4">
        <input
          type="text"
          placeholder="Person ID"
          v-model="register_form.personId"
          class="w-full p-2 border-b-2 focus:outline-none focus:border-purple-600"
        />
      </div>

      <!-- 姓名 -->
      <div class="mb-4">
        <input
          type="text"
          placeholder="Name"
          v-model="register_form.name"
          class="w-full p-2 border-b-2 focus:outline-none focus:border-purple-600"
        />
      </div>

      <!-- 密碼 -->
      <div class="mb-4">
        <input
          type="password"
          placeholder="Password"
          v-model="register_form.password"
          class="w-full p-2 border-b-2 focus:outline-none focus:border-purple-600"
        />
      </div>

      <!-- Email -->
      <div class="mb-4">
        <input
          type="text"
          placeholder="Mail"
          v-model="register_form.mail"
          class="w-full p-2 border-b-2 focus:outline-none focus:border-purple-600"
        />
      </div>

      <!-- 身分 -->
      <div class="mb-4">
        <input
          type="text"
          placeholder="Identify"
          v-model="register_form.identify"
          class="w-full p-2 border-b-2 focus:outline-none focus:border-purple-600 readonly-input"
          readonly
        />
      </div>

      <!-- Github -->
      <div class="mb-4">
        <input
          type="text"
          placeholder="GitHub"
          v-model="register_form.github"
          class="w-full p-2 border-b-2 focus:outline-none focus:border-purple-600"
        />
      </div>

      <!-- IG -->
      <div class="mb-4">
        <input
          type="text"
          placeholder="Instagram"
          v-model="register_form.Instagram"
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

<style>
.readonly-input {
  background-color: #f2f2f2; 
  color: #666;
  cursor: not-allowed;
}
</style>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const register_form = ref({
      personId: '',
      name: '',
      password: '',
      mail: '',
      identify: 'VISITOR',
      github: '',
      Instagram: ''
    })
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
