<template>
  <main class="bg-gray-800 min-h-screen flex items-center justify-center w-full z-10">
    <form
      class="w-full max-w-sm p-8 bg-gray-100 shadow-md rounded-lg"
      @submit.prevent="register"
    >
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
        <router-link to="/login" class="text-purple-600 underlineb font-bold"
          >Login</router-link
        >
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
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const register_form = ref({
      personId: "",
      name: "",
      password: "",
      mail: "",
      identify: "VISITOR", // Default value, you might want to adjust it based on your requirements
      github: "",
      Instagram: "",
    });

    const register = async () => {
      try {
        if (
          !register_form.value.personId ||
          !register_form.value.name ||
          !register_form.value.password ||
          !register_form.value.mail
        ) {
          alert("請填寫所有必填字段");
          return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(register_form.value.password)) {
          alert("密碼至少8位，且包含至少一個英文字符");
          return;
        }

        const newPerson = {
          personId: register_form.value.personId,
          name: register_form.value.name,
          password: register_form.value.password,
          mail: register_form.value.mail,
          identify: register_form.value.identify,
          github: register_form.value.github,
          instagram: register_form.value.Instagram,
        };

        axios
          .get(
            `http://localhost:8080/api/person/personId/${register_form.value.personId}`
          )
          .then((response) => {
            let isRegistered = response.data.personId === register_form.value.personId;
            if (isRegistered) {
              alert("已註冊過!");
            } else {
              registerPerson(newPerson);
            }
          })
          .catch(() => {
            registerPerson(newPerson);
          });
      } catch (error) {
        alert("發生錯誤:", error);
      }
    };

    return {
      register_form,
      register,
    };

    function registerPerson(newPerson) {
      axios
        .post("http://localhost:8080/api/person", newPerson)
        .then((response) => {
          alert("註冊成功，等待教授審核");
          console.log("註冊成功:", response.data);
        })
        .catch((error) => {
          console.log("註冊期間發生錯誤:", error);
        });
    }
  },
};
</script>
