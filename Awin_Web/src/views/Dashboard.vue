<template>
  <div class="dashboard">
    <div class="navBar">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @select="handleMenuSelect"
      >
        <el-menu-item index="計畫">
          <el-icon><document /></el-icon>
          <span>計畫</span>
        </el-menu-item>
        <el-menu-item index="教授資料">
          <el-icon size="large" >
            <Location />
          </el-icon>
          <span>教授資料</span>
        </el-menu-item>
        <el-menu-item index="成員">
          <el-icon><document /></el-icon>
          <span>成員</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="mainTable">
      <h2 class="bread">
        {{ breadcrumb }}
      </h2>
      <div class="tableArea">

      </div>
      
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElIcon, ElMenu, ElCol, ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { ref, onMounted } from 'vue';
import {
  HomeFilled,
  Menu as IconMenu,
  Location,
  Document,
} from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    ElIcon,
    ElMenu,
    ElCol,
  },
  setup() {
    const activeMenu = ref('dashboard');
    const isCollapse = ref(false);
    const breadcrumb = ref('成員');

    const handleMenuSelect =  (key) => {
      activeMenu.value = key;
      updateBreadcrumb(key);
      // console.log(key, keyPath)
    };

    const updateBreadcrumb = (key) => {
      breadcrumb.value = key
    };


    onMounted(() => {
      // 在组件挂载后执行的逻辑
      console.log("test")
    });

    return {
      activeMenu,
      isCollapse,
      breadcrumb,
      handleMenuSelect,
      Location,
      Document,
    };   
  }
})

</script>

<style scoped>
.navBar{
  height: 100% !important;
  width: 20% !important;
}

.mainTable{
  width: 80%;
  background-color: aqua;
  padding: 3rem;
}


.dashboard {
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: row;
}

.bread{
  color: red;
}

.el-menu {
  width: 100%;
  height: 100%;
}
</style>
