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
        <el-menu-item index="plan">
          <el-icon><document /></el-icon>
          <span>計畫</span>
        </el-menu-item>
        <el-menu-item index="professor">
          <el-icon size="large">
            <Location />
          </el-icon>
          <span>教授資料</span>
        </el-menu-item>
        <el-menu-item index="members">
          <el-icon><document /></el-icon>
          <span>成員</span>
        </el-menu-item>
      </el-menu>
      <div class="goBack">
        <router-link to="/">Go Back</router-link>
        <button @click="$store.dispatch('logout')">Logout</button>
      </div>
    </div>

    <div class="mainTable">
      <duv class="bread">
        <h2>
          {{ breadcrumb }}
          {{ $route.params.page }}
        </h2>
      </duv>
      <div class="tableArea">
        <router-view name="dashboard-view" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { ElIcon, ElMenu, ElTable, ElButton } from 'element-plus'
import { Location, Document } from '@element-plus/icons-vue'
import { Timer } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
// 在需要发送请求的组件中
import axiosInstance from '@/axios'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    ElIcon,
    ElMenu,
    ElTable,
    ElButton
  },
  setup() {
    const router = useRouter()
    const activeMenu = ref('dashboard')
    const isCollapse = ref(false)
    const breadcrumb = ref('')
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
    const handleMenuSelect = (key) => {
      // Set breadcrumb based on the selected menu
      switch (key) {
        case 'plan':
          breadcrumb.value = '計畫'
          break
        case 'professor':
          breadcrumb.value = '教授資料'
          break
        case 'members':
          breadcrumb.value = '成員'
          break
        default:
          breadcrumb.value = ''
      }
      router.push(`/dashboard/${key}`)
    }

    onMounted(() => {
      // 在组件挂载后执行的逻辑
      console.log('test')
      // fetchData()
    })

    return {
      activeMenu,
      isCollapse,
      breadcrumb,
      handleMenuSelect,
      Location,
      Document,
      store
    }
  }
})
</script>

<style scoped lang="scss">
.navBar {
  height: 100% !important;
  width: 20% !important;
  .goBack {
    color: red;
    position: absolute;
    bottom: 0;
    margin-left: 1rem;
  }
}

.bread {
  height: 10%;
  width: 100%;
}
.tableArea {
  height: 90%;
  width: 100%;
}

.mainTable {
  width: 80%;
  // background-color: aqua;
  padding: 3rem;
  h2 {
    color: #000;
    font-weight: bold;
  }
}

.dashboard {
  height: 100%;
  width: 100%;
  background-color: #f2f4f4;
  display: flex;
  flex-direction: row;
}

.el-menu {
  width: 100%;
  height: 100%;
}
</style>
