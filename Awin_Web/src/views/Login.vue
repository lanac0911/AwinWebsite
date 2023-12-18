<template>
  <main class="bg-gray-800 min-h-screen flex items-center justify-center w-full z-10">
    <form
      class="w-full max-w-sm p-8 bg-gray-100 shadow-md rounded-lg"
      @submit.prevent="login"
    >
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
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { loginPersonStatus } from "../utils";

export default {
  setup() {
    const store = useStore();
    const login_form = ref({
      personId: "",
      password: "",
    });

    const login = async () => {
      try {
        if (!login_form.value.personId || !login_form.value.password) {
          console.error("請填寫所有必填字段");
          return;
        }

        const loginPerson = {
          personId: login_form.value.personId,
          password: login_form.value.password,
        };

        const loginUrl = `http://localhost:8080/api/person/login/${loginPerson.personId}/${loginPerson.password}`;

        await axios
          .get(loginUrl)
          .then((response) => {
            if (response.data === true) {
              loginPersonStatus.value = loginPerson;
              console.log("Login Success");
              axios
                .get(`http://localhost:8080/api/person/personId/${loginPerson.personId}`)
                .then((response) => {
                  let isVisitor = response.data.identify === "VISITOR";
                  if (isVisitor) {
                    alert("您的身分還是訪客，待教授審核通過");
                  } else {
                    alert("登入成功");
                    store.dispatch("login", response.data);
                    store.commit("setAuthentication", true);
                    // 存储认证状态
                    localStorage.setItem("isAuthenticated", "true");
                  }
                  console.log("Get Person: ", response.data);
                })
                .catch(() => {
                  alert("取得 Person 資料失敗");
                });
            } else {
              alert("登入失敗");
            }
          })
          .catch(() => {
            alert("登入失敗，請確認是否有註冊");
          });
      } catch (error) {
        console.error("發生錯誤:", error);
      }
    };

    return {
      login_form,
      login,
    };
  },
};
</script>
