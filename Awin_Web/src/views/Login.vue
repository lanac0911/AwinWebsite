<template>
  <main class=" bg-white min-h-screen flex items-center justify-center">
    <form class="w-full max-w-sm p-8 bg-gray-100 shadow-md rounded-lg" @submit.prevent="login">
      <h2 class="text-2xl uppercase mb-8 font-bold text-purple-600">Login</h2>
      <div class="mb-4">
        <input
          type="email"
          placeholder="Email address"
          v-model="login_form.email"
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
      <router-link to="/register" class="text-purple-600 underlineb font-bold">Register</router-link>
    </p>
    </form>
  </main>
</template>

<script >
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const login_form = ref({});
    const store = useStore();

    const login = () => {
      store.dispatch("login", login_form.value);
    };

    return {
      login_form,
      login
    };
  },
};
</script>

 
