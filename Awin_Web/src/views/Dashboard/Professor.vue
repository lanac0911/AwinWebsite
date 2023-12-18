<template>
  <div class="wrapper">
    <div class="postBtn">
      <h2>論文資訊</h2>
      <el-button size="large" type="primary" @click="clickAdd">＋ 新增</el-button>
      <el-dialog
        @close="handelClose"
        v-model="dialogFormVisible"
        :title="formMode == 'eidt' ? '＃編輯' : '#新增'"
      >
        <el-form :model="form">
          <el-form-item label="計畫名稱">
            <el-input v-model="form.item" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handelClose">取消</el-button>
            <el-button type="primary" @click="handleConfirm()"> 送出 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <div class="tableArea">
      <el-table
        v-loading="isLoading"
        :data="visibleData"
        stripe
        style="width: 100%; height=250px;"
      >
        <el-table-column prop="item" label="論文" />
        <el-table-column label="Operations" width="150px">
          <template #default="scope">
            <div class="btn-group">
              <el-button
                plain
                type="warning"
                :disabled="userData.identify !== 'TEACHER' ? true : false"
                size="small"
                @click="clickEdit(scope.$index, scope.row)"
              >
                <el-icon :size="size" :color="color">
                  <Edit />
                </el-icon>
                編輯
              </el-button>
              <el-button
                plain
                :disabled="userData.identify !== 'TEACHER' ? true : false"
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >
                <el-icon :size="size" :color="color">
                  <Delete />
                </el-icon>
                刪除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pager">
      <el-pagination
        v-model="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, toRaw, ref, reactive, computed } from "vue";
import {
  ElIcon,
  ElTable,
  ElButton,
  ElDialog,
  ElForm,
  vLoading,
  ElMessage,
  ElPagination,
} from "element-plus";
import { useStore } from "vuex";

// 在需要发送请求的组件中
import axiosInstance from "@/axios";

export default defineComponent({
  components: {
    ElIcon,
    ElTable,
    ElForm,
    ElButton,
    ElDialog,
    vLoading,
    ElPagination,
  },

  setup() {
    const store = useStore();
    const userData = computed(() => store.state.userData);
    const Data = ref([]);
    const isLoading = ref(false);
    const dialogFormVisible = ref(false);
    const formMode = ref("add");
    const selectId = ref();
    const pagination = reactive({
      currentPage: 1,
      pageSize: 5,
    });

    const visibleData = computed(() => {
      const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      return Data.value.slice(startIndex, endIndex);
    });

    onMounted(() => {
      // 根据 tableArea 的高度动态计算每页显示的行数
      const tableAreaHeight = document.querySelector(".tableArea").offsetHeight;
      const rowHeight = 45; // 假设每行高度为 40 像素
      pagination.pageSize = Math.floor(tableAreaHeight / rowHeight);
      fetchData(); // 初始加载数据
    });
    const calculateTotalPages = () => {
      // 根据数据列表的长度和每页显示的数量计算总页数
      const totalItems = Data.value.length;
      const totalPages = Math.ceil(totalItems / pagination.pageSize);
      return totalPages;
    };
    const handlePageChange = (page) => {
      pagination.currentPage = page;
      fetchData(); // 手动调用 fetchData 方法
    };

    const form = ref({
      item: "",
    });

    const handelClose = () => {
      console.log("close");
      dialogFormVisible.value = false;
      Object.keys(form.value).forEach((key) => {
        form.value[key] = "";
      });
    };

    const fetchData = () => {
      isLoading.value = true;
      axiosInstance
        .get("/scholar/all")
        .then((response) => {
          // 处理响应数据
          Data.value = toRaw(response.data);
          pagination.total = Data.value.length;
          console.log(response.data);
          console.log("vs", Data.value);
        })
        .catch((error) => {
          ElMessage({
            message: error,
            type: "warning",
          });
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    const clickAdd = () => {
      formMode.value = "add";
      dialogFormVisible.value = true;
    };

    const clickEdit = (index, row) => {
      formMode.value = "edit";
      // 帶入表單
      form.value.item = row.item;
      dialogFormVisible.value = true;
      selectId.value = row.id;
      console.log("row", row);
    };

    const handleConfirm = () => {
      console.log("POST/PUT mode: ", formMode.value, ",data:", form.value);
      // 发送 POST 请求

      if (formMode.value == "edit") {
        axiosInstance
          .put(`/scholar/${selectId.value}`, form.value)
          .then((response) => {
            // 处理成功的响应
            console.log("PUT Success:", response.data);
            // 更新表格数据
            fetchData();
          })
          .catch((error) => {
            ElMessage({
              message: error,
              type: "warning",
            });
          })
          .finally(() => {
            // 无论成功还是失败，都可以在这里执行一些逻辑
            dialogFormVisible.value = false; // 隐藏对话框等
          });
      } else {
        axiosInstance
          .post("/scholar", form.value)
          .then((response) => {
            // 处理成功的响应
            console.log("POST Success:", response.data);
            // 更新表格数据
            fetchData();
          })
          .catch((error) => {
            ElMessage({
              message: error,
              type: "warning",
            });
          })
          .finally(() => {
            // 无论成功还是失败，都可以在这里执行一些逻辑
            dialogFormVisible.value = false; // 隐藏对话框等
          });
      }
    };

    const handleDelete = (index, row) => {
      console.log("row=", row.id);
      axiosInstance
        .delete(`/scholar/${row.id}`)
        .then((response) => {
          // 处理响应数据
          Data.value = toRaw(response.data);
          console.log(response.data);
          console.log("vs", Data.value);
          fetchData();
        })
        .catch((error) => {
          ElMessage({
            message: error,
            type: "warning",
          });
        });
    };

    onMounted(() => {
      // 在组件挂载后执行的逻辑
      console.log("test");
      fetchData();
    });

    return {
      dialogFormVisible,
      Data,
      form,
      handleConfirm,
      isLoading,
      handleDelete,
      clickEdit,
      handelClose,
      clickAdd,
      formMode,
      pagination,
      calculateTotalPages,
      handlePageChange,
      visibleData,
      userData,
    };
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;

  .postBtn {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tableArea {
    overflow: auto;
    width: 100%;
    height: 90%;
    .btn-group {
      display: flex;
    }
  }
  h2 {
    font-size: 2.5rem;
    font-weight: bold;
  }
  .pager {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
