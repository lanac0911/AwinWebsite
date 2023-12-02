<template>
  <div class="rootWrapper">
    <div v-if="!$route.path.startsWith('/dashboard')" class="bottomBar">
      <el-button-group class="btns">
        <el-button id="first-btn" class="el-button-custom">
          <RouterLink to="/">
            <el-icon :class="{ active: $route.path === '/' }">
              <img src="@/assets/home.png" />
            </el-icon>
          </RouterLink>
        </el-button>
        <el-button class="el-button-custom">
          <RouterLink to="/research">
            <span :class="{ active: $route.path === '/research' }">Research Area</span>
          </RouterLink>
        </el-button>
        <el-button class="el-button-custom">
          <RouterLink to="/professors">
            <span :class="{ active: $route.path === '/professors' }">
              Professor
            </span></RouterLink
          >
        </el-button>
        <el-button class="el-button-custom">
          <RouterLink to="/members">
            <span :class="{ active: $route.path === '/members' }"> Members </span>
          </RouterLink>
        </el-button>
        <el-button disable id="last-btn" class="el-button-custom">
          <RouterLink to="/contact">
            <span :class="{ active: $route.path === '/contact' }"
              >Contact Us</span
            ></RouterLink
          >
        </el-button>
        <el-button id="last-btn" class="el-button-custom">
          <RouterLink to="/dashboard"
            ><span :class="{ active: $route.path === '/dashboard' }"></span
            >Dashboard</RouterLink
          >
        </el-button>
      </el-button-group>

      <div class="hiddenArea">
        <RouterLink to="/dashboard">
          <el-button color="rgba(0, 0, 0, 0.1)" circle></el-button>
        </RouterLink>
      </div>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import {
  Menu,
  BrushFilled,
  ShoppingCart,
  CopyDocument,
  Delete,
  HomeFilled,
} from "@element-plus/icons-vue";

export default defineComponent({
  components: {},
  setup() {

    return {
      HomeFilled,
      Menu,
    };
  },
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap");
.hiddenArea {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.active {
  position: relative;
  color: rgb(184, 184, 184);
}

.active::before {
  content: "";
  position: absolute;
  bottom: 50%;
  left: 0;
  width: 100%;
  height: 10%;
  background-color: #8167a9;
  transform: translateY(50%);
}

body,
html {
  max-width: 100% !important;
  max-height: 100vh !important;
  margin: 0;
  padding: 0;
  height: 100vh !important;
  width: 100vw !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottomBar {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 2%;
}
.btns {
  z-index: 10;
}
.el-button-custom {
  height: 5rem;
  width: 12rem;
  max-width: 12rem;
  line-height: 50px;
  font-size: 1.2rem;
  background-color: rgba(250, 250, 250, 0.3);
  color: #fff;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
}

.el-button-custom:hover {
  background-color: rgba(250, 250, 250, 0.3);
}
.el-button-custom:hover span {
  position: relative;
  display: inline-block;
}

.el-button-custom:hover span:not(.active)::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 20%;
  height: 10%;
  width: 0; /* 初始宽度为0，将在hover时逐渐增加 */
  background-color: #8167a9;
  transition: width 0.3s ease;
}

.el-button-custom:hover span.active::after {
  content: ""; /* 如果有需要，您可以根据 .active 类的样式添加特殊的样式或将其置为空 */
}

.el-button-custom span:not(.active):hover::after {
  width: 100%; /* 在hover时将宽度设置为100% */
}

.el-button-custom:first-child {
  border-top-left-radius: 5rem; /* 調整左上圓角的大小 */
  border-bottom-left-radius: 5rem; /* 調整左下圓角的大小 */
}

.el-button-custom:last-child {
  border-top-right-radius: 5rem; /* 調整右上圓角的大小 */
  border-bottom-right-radius: 5rem; /* 調整右下圓角的大小 */
}
a {
  color: rgb(255, 255, 255);
}
#app {
  max-width: 100% !important;
  max-height: 100vh !important;
  width: 100% !important;
  height: 100% !important;
  background-color: rgb(34, 32, 32);
  background-image: url("@/assets/pat-back.svg");
  background-size: 3%; /* 设置背景图像大小为50% */
  display: flex;
}
.rootWrapper {
  max-width: 100% !important;
  max-height: 100vh !important;
  width: 100% !important;
  height: 100% !important;
  background-color: rgb(34, 32, 32);
  background-image: url("@/assets/pat-back.svg");
  background-size: 3%; /* 设置背景图像大小为50% */
  display: flex;
}
</style>
