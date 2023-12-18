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
        <el-menu-item class="userArea" index="user">
          <div class="AreaItem">
            <el-avatar :size="80">{{ userData.name }}</el-avatar>
            <el-tag
              class="tag"
              effect="dark"
              :type="userData.identify === 'STUDENT' ? 'primary' : 'success'"
            >
              {{ userData.identify }}
            </el-tag>
          </div>
        </el-menu-item>
        <el-menu-item index="plan">
          <el-icon><document /></el-icon>
          <span>計畫</span>
        </el-menu-item>
        <el-menu-item index="professor">
          <el-icon><Management /></el-icon>
          <span>論文</span>
        </el-menu-item>
        <el-menu-item index="members">
          <el-icon><Avatar /></el-icon>
          <span>成員</span>
        </el-menu-item>
      </el-menu>
      <div class="goBack">
        <router-link to="/">
          <el-button
            plain
            type="info"
            style="margin-right: 1rem; margin-bottom: 0.5rem"
            round
            >回前台</el-button
          >
        </router-link>
        <el-button
          plain
          @click="$store.dispatch('logout')"
          style="margin-right: 1rem; margin-bottom: 0.5rem"
          type="danger"
          round
          >登出</el-button
        >
      </div>
    </div>

    <div class="mainTable">
      <div class="tableArea">
        <router-view name="dashboard-view" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted, ref, computed } from "vue";
import { ElIcon, ElMenu, ElTable, ElButton, ElTag, ElAvatar } from "element-plus";
import { Location, Document } from "@element-plus/icons-vue";
import { Timer } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
// 在需要发送请求的组件中
import axiosInstance from "@/axios";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    ElIcon,
    ElMenu,
    ElTable,
    ElButton,
    ElTag,
    ElAvatar,
  },
  setup() {
    const store = useStore();
    const userData = computed(() => store.state.userData);
    const router = useRouter();
    const activeMenu = ref("dashboard");
    const isCollapse = ref(false);
    const breadcrumb = ref("");
    onBeforeMount(() => {
      store.dispatch("fetchUser");
    });
    const handleMenuSelect = (key) => {
      // Set breadcrumb based on the selected menu
      switch (key) {
        case "plan":
          breadcrumb.value = "計畫";
          break;
        case "professor":
          breadcrumb.value = "教授資料";
          break;
        case "members":
          breadcrumb.value = "成員";
          break;
        default:
          breadcrumb.value = "";
      }
      router.push(`/dashboard/${key}`);
    };

    onMounted(() => {
      // 在组件挂载后执行的逻辑
      console.log("test");
      // fetchData()
    });

    return {
      activeMenu,
      isCollapse,
      breadcrumb,
      handleMenuSelect,
      Location,
      Document,
      store,
      userData,
    };
  },
});
</script>

<style scoped lang="scss">
.AreaItem {
  height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.userArea {
  justify-content: center;
  height: 20%;
}
.navBar {
  height: 100% !important;
  width: 15% !important;
  .goBack {
    color: red;
    position: absolute;
    bottom: 0;
    margin-left: 1rem;
  }

  span {
    font-size: 1.2rem;
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
    font-size: 1.1rem;
    font-weight: bold;
  }
}
.tag {
  margin-top: 1rem;
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
  background-color: #05a5ba;
}

.realImg {
  height: 8rem;
  width: 8rem;
  border-radius: 100%;
}
</style>
