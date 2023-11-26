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
          <el-icon size="large" >
            <Location />
          </el-icon>
          <span>教授資料</span>
        </el-menu-item>
        <el-menu-item index="members">
          <el-icon><document /></el-icon>
          <span>成員</span>
        </el-menu-item>
      </el-menu>
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
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
import { ElIcon, ElMenu, ElTable, ElButton, } from 'element-plus'
import {
  Location,
  Document,
} from '@element-plus/icons-vue'
import { Timer } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';

// 在需要发送请求的组件中
import axiosInstance from '@/axios';


export default defineComponent({
  components: {
    ElIcon,
    ElMenu,
    ElTable,
    ElButton,
    
  },
  setup(props, context) {
    // const route = useRoute();
    const router = useRouter();
    const activeMenu = ref('dashboard');
    const isCollapse = ref(false);
    const breadcrumb = ref('成員');

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

      // Navigate to the corresponding route
      // this.$router.push({ name: 'dashboard', params: { page: key } })
      // router.push({ name: 'dashboard', params: { page: key } });
      router.push(`/dashboard/${key}`);
    }

    const updateBreadcrumb = (key) => {
      breadcrumb.value = key
    };

    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }

    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]

    onMounted(() => {
      // 在组件挂载后执行的逻辑
      console.log("test")
      // fetchData()
    });

    return {
      activeMenu,
      isCollapse,
      breadcrumb,
      handleMenuSelect,
      Location,
      Document,
      handleEdit,
      handleDelete,
      tableData,
    };   
  }
})

</script>

<style scoped lang="scss">
.navBar{
  height: 100% !important;
  width: 20% !important;
}


.bread{
  height: 10%;
  width: 100%;
}
.tableArea{
  height: 90%;
  width: 100%;
}

.mainTable{
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
  background-color: #fff;
  display: flex;
  flex-direction: row;
}


.el-menu {
  width: 100%;
  height: 100%;
}
</style>
