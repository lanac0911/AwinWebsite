<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import WelcomPage from "./views/WelcomPage.vue";
</script>

<template>
  <div class="wrapper">
    <WelcomPage />
    <div class="bottomBar">
      <el-affix position="bottom" :offset="120">
        <el-button-group >
          <el-button type="primary" :icon="HomeFilled" size="large"/>
          <el-button type="primary" :icon="Share" size="large"/>
          <el-button type="primary" :icon="HomeFilled" size="large"/>
        </el-button-group>
      </el-affix>      
    </div>
    <!-- <HelloWorld msg="You did it!" />

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav> -->
  </div>

  <!-- <RouterView /> -->
</template>
<script>
import { defineComponent } from 'vue'
import { ElAffix  } from 'element-plus'
import {
  Delete,
  Edit,
  Share,
  HomeFilled,
} from '@element-plus/icons-vue'
export default defineComponent({
  components: {
    ElAffix,
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

body, html {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw; 
  display: flex;
  justify-content: center; /* 如果需要水平居中 */
  align-items: center; /* 如果需要垂直居中 */
}
.bottomBar{
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 5%;
}

#app, 
.wrapper{
  width: 100%;
  max-width: 100%;
  height: 100%;
  background-image: url('@/assets/pat-back.svg');
  background-size: 3%; /* 设置背景图像大小为50% */
  display: flex;
}


</style>
