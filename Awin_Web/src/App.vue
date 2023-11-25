<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <div class="bottomBar">
        <el-button-group>
          <el-button id="first-btn" class="el-button-custom">
            <RouterLink to="/">
              <el-icon size="large" >
                <HomeFilled />
              </el-icon>
            </RouterLink>
          </el-button>
          <el-button class="el-button-custom">
            <RouterLink to="/research">Research Area</RouterLink>
          </el-button>
          <el-button class="el-button-custom">
            <RouterLink to="/professors">Professor</RouterLink>
          </el-button>
          <el-button class="el-button-custom">
            <RouterLink to="/members">Members</RouterLink>
          </el-button>
          <el-button id="last-btn" class="el-button-custom">
            <RouterLink to="/contact">Contact Us</RouterLink>
          </el-button>
          <el-button id="last-btn" class="el-button-custom">
            <RouterLink to="/dashboard">Dashboard</RouterLink>
          </el-button>
        </el-button-group>
    </div>
    <RouterView></RouterView>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import {
  HomeFilled,
} from '@element-plus/icons-vue'
export default defineComponent({
  components: {
  },
  setup() {
    return {
      zIndex: 3000,
      size: 'small',
    }
  },
})


</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap');

body, html {
  max-width: 100%; /* 设置最大宽度为100%，防止页面宽度超出屏幕 */
  max-height: 100vh;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw; 
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottomBar{
  position: absolute;
  bottom: -95%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 5%;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 陰影設置，可以根據需要調整數值 */
  font-family: 'Poppins', sans-serif; /* 替換成你喜歡的字體 */
}

.el-button-custom:first-child {
  border-top-left-radius: 5rem;  /* 調整左上圓角的大小 */
  border-bottom-left-radius: 5rem;  /* 調整左下圓角的大小 */
}

.el-button-custom:last-child{
  border-top-right-radius: 5rem;  /* 調整右上圓角的大小 */
  border-bottom-right-radius: 5rem;  /* 調整右下圓角的大小 */
}
a{
  color: rgb(255, 255, 255);
}
#app, 
.wrapper{
  max-width: 100%; /* 设置最大宽度为100%，防止页面宽度超出屏幕 */
  max-height: 100vh;
  width: 100%;
  height: 100%;
  background-color: rgb(34, 32, 32);
  background-image: url('@/assets/pat-back.svg');
  background-size: 3%; /* 设置背景图像大小为50% */
  display: flex;
}


</style>
