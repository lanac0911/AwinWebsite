<template>
  <div class="wrapper">
    <div class="postBtn">
      <h2>成員資訊</h2>
      <el-button size="large" type="primary" @click="clickAdd">＋ 新增</el-button>
      <el-dialog
        @close="handelClose"
        v-model="dialogFormVisible"
        :title="formMode == 'eidt' ? '＃編輯' : '#新增'"
      >
        <el-form :model="form">
          <el-form-item label="Name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="學號">
            <el-input v-model="form.personId" />
          </el-form-item>
          <el-form-item label="身份">
            <el-select v-model="form.identify" placeholder="選擇身份" allow-create>
              <el-option label="STUDENT" value="STUDENT" />
              <el-option label="TEACHER" value="TEACHER" />
            </el-select>
          </el-form-item>
          <el-form-item label="Github">
            <el-input v-model="form.github" />
          </el-form-item>
          <el-form-item label="IG">
            <el-input v-model="form.instagram" />
          </el-form-item>
          <el-form-item label="Mail">
            <el-input v-model="form.mail" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handelClose">Cancel</el-button>
            <el-button type="primary" @click="handleConfirm()"> Confirm </el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <div class="tableArea">
      <el-table v-loading="loading" :data="visibleData" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="personId" label="學號" />
        <el-table-column prop="identify" label="身份">
          <template #default="scope">
            <el-tag :type="scope.row.identify === 'STUDENT' ? 'primary' : 'success'">
              {{ scope.row.identify }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="github" label="Github" />
        <el-table-column prop="instagram" label="IG" />
        <el-table-column prop="mail" label="Mail" />
        <el-table-column label="Operations" width="150px">
          <template #default="scope">
            <div class="btn-group">
              <el-button size="small" @click="clickEdit(scope.$index, scope.row)">
                <el-icon :size="size" :color="color">
                  <Edit />
                </el-icon>
                編輯
              </el-button>
              <el-button
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
  ElSelect,
  ElTag,
  ElMessage,
  ElPagination,
} from "element-plus";

// 在需要发送请求的组件中
import axiosInstance from "@/axios";
import "element-plus/es/components/message/style/css";

export default defineComponent({
  components: {
    ElSelect,
    ElIcon,
    ElTable,
    ElForm,
    ElButton,
    ElDialog,
    ElTag,
    ElPagination,
  },

  setup() {
    const Data = ref([]);
    const loading = ref(false);
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

    const form = ref({
      personId: "",
      name: "",
      password: "",
      mail: "",
      identify: "",
    });
    // 對應每個 key 的標籤
    const labels = {
      personId: "學號",
      name: "姓名",
      password: "密碼",
      mail: "郵件",
      identify: "身份選擇",
    };

    const handelClose = () => {
      dialogFormVisible.value = false;
      Object.keys(form.value).forEach((key) => {
        form.value[key] = "";
      });
    };

    const handlePageChange = (page) => {
      pagination.currentPage = page;
      fetchData(); // 手动调用 fetchData 方法
    };

    const fetchData = () => {
      const params = {
        page: pagination.currentPage,
        size: pagination.pageSize,
      };

      axiosInstance
        .get("/person/all", { params })
        .then((response) => {
          Data.value = toRaw(response.data);

          // 从响应数据中获取总记录数
          const total = response.data.length; // 假设响应数据中有一个字段表示总记录数
          pagination.total = total;
        })
        .catch((error) => {
          ElMessage({
            duration: 3000,
            message: error,
            type: "error",
          });
          console.error("Error:", error);
        });
    };

    const clickAdd = () => {
      dialogFormVisible.value = true;
      formMode.value = "add";
    };
    const clickEdit = (index, row) => {
      formMode.value = "edit";
      // 帶入表單
      form.value.personId = row.personId;
      form.value.name = row.name;
      form.value.password = row.password;
      form.value.mail = row.mail;
      form.value.identify = row.identify;
      dialogFormVisible.value = true;
      selectId.value = row.id;
    };

    const handleConfirm = () => {
      // 发送 POST 请求
      loading.value = true;

      if (formMode.value == "edit") {
        axiosInstance
          .put(`/person/${selectId.value}`, form.value)
          .then((response) => {
            // 处理成功的响应
            console.log("POST Success:", response.data);
            // 更新表格数据
            fetchData();
          })
          .catch((error) => {
            ElMessage({
              duration: 3000,
              message: error,
              type: "error",
            });
          })
          .finally(() => {
            // 无论成功还是失败，都可以在这里执行一些逻辑
            dialogFormVisible.value = false; // 隐藏对话框等
            loading.value = false;
          });
      } else {
        axiosInstance
          .post("/person", form.value)
          .then((response) => {
            // 处理成功的响应
            console.log("POST Success:", response.data);
            // 更新表格数据
            fetchData();
          })
          .catch((error) => {
            ElMessage({
              duration: 3000,
              message: error,
              type: "error",
            });
          })
          .finally(() => {
            // 无论成功还是失败，都可以在这里执行一些逻辑
            dialogFormVisible.value = false; // 隐藏对话框等
            loading.value = false;
          });
      }
    };

    const handleDelete = (index, row) => {
      loading.value = true;
      console.log("row=", row.id);
      axiosInstance
        .delete(`/person/${row.id}`)
        .then((response) => {
          // 处理响应数据
          Data.value = toRaw(response.data);
          console.log(response.data);
          console.log("vs", Data.value);
          fetchData();
        })
        .catch((error) => {
          ElMessage({
            duration: 3000,
            message: error,
            type: "error",
          });
        })
        .finally(() => {
          loading.value = false;
        });
    };

    onMounted(() => {
      fetchData();
    });

    return {
      dialogFormVisible,
      Data,
      form,
      labels,
      handleConfirm,
      loading,
      handleDelete,
      clickEdit,
      handelClose,
      clickAdd,
      formMode,
      pagination,
      calculateTotalPages,
      handlePageChange,
      visibleData,
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
    width: 100%;
    height: 90%;
    overflow-y: auto;
    .btn-group {
      display: flex;
    }
  }

  .pager {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
  }
}
</style>
