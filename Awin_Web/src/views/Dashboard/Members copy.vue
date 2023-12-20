<template>
  <div class="wrapper">
    <div class="postBtn">
      <h2>計畫資訊</h2>
      <el-button size="large" type="primary" @click="clickAdd">＋ 新增</el-button>
      <el-dialog
        @close="handelClose"
        v-model="dialogFormVisible"
        :title="formMode == 'edit' ? '＃編輯' : '#新增'"
      >
        <el-form :model="form">
          <el-form-item label="計畫名稱">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="狀態">
            <el-switch
              v-model="form.planStatus"
              :active-text="'PROCESS'"
              :inactive-text="'FINISH'"
              :active-value="'PROCESS'"
              :inactive-value="'FINISH'"
            />
          </el-form-item>

          <el-form-item label="成員">
            <el-tag
              v-for="person in form.persons"
              :key="person.id"
              closable
              :disable-transitions="false"
              @close="handleClose(person)"
            >
              {{ person.name }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              class="ml-1 w-20"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
              + 新增人員
            </el-button>
          </el-form-item>
          <el-form-item label="詳細資訊">
            <el-input v-model="form.information" :rows="10" type="textarea" />
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
        <el-table-column prop="name" label="計畫名稱" />
        <el-table-column prop="planStatus" label="狀態">
          <template #default="scope">
            <el-tag :type="scope.row.planStatus === 'PROCESS' ? 'success' : 'info'">
              {{ scope.row.planStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="information" label="詳細資訊" />
        <el-table-column prop="persons" label="成員">
          <template #default="scope">
            <el-tag v-for="person in scope.row.persons" :key="person.id">
              {{ person.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operations" width="150px">
          <template #default="scope">
            <div class="btn-group">
              <el-button
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
import {
  defineComponent,
  onMounted,
  toRaw,
  nextTick,
  ref,
  reactive,
  computed,
} from "vue";
import {
  ElIcon,
  ElTable,
  ElButton,
  ElDialog,
  ElForm,
  ElSelect,
  ElTag,
  vLoading,
  ElMessage,
  ElPagination,
} from "element-plus";

// 在需要发送请求的组件中
import axiosInstance from "@/axios";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    ElSelect,
    ElIcon,
    ElTable,
    ElForm,
    ElButton,
    ElDialog,
    ElTag,
    vLoading,
    ElPagination,
  },

  setup() {
    const Data = ref([]);
    const isLoading = ref(false);
    const dialogFormVisible = ref(false);
    const formMode = ref("add");
    const selectId = ref();
    const store = useStore();
    const userData = computed(() => store.state.userData);

    const pagination = reactive({
      currentPage: 1,
      pageSize: 5,
    });

    const visibleData = computed(() => {
      const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      return Data.value.slice(startIndex, endIndex);
    });
    const inputValue = ref("");
    const inputVisible = ref(false);
    const planPeople = ref([]);
    const InputRef = ref(null);

    // add paln person
    const handleClose = (tag) => {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    };
    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        // this.InputRef.input.focus();
        InputRef.value.input.focus();
      });
    };
    const handleInputConfirm = () => {
      // if (inputValue.value) {
      // this.dynamicTags.push(this.inputValue)
      // }
      inputVisible.value = false;
      inputValue.value = "";
    };

    onMounted(() => {
      // 根据 tableArea 的高度动态计算每页显示的行数
      const tableAreaHeight = document.querySelector(".tableArea").offsetHeight;
      const rowHeight = 130; // 假设每行高度为 40 像素
      pagination.pageSize = Math.floor(tableAreaHeight / rowHeight);
      // calculatePageSize();

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
      name: "",
      information: "",
      planStatus: "PROCESS",
      persons: [],
    });

    const handelClose = () => {
      dialogFormVisible.value = false;
      Object.keys(form.value).forEach((key) => {
        if (key != "persons") form.value[key] = "";
      });
      form.value.planStatus = "PROCESS";
      form.value.persons = [];
    };

    const fetchData = () => {
      isLoading.value = true;
      axiosInstance
        .get("/plan/all")
        .then((response) => {
          // 处理响应数据
          Data.value = toRaw(response.data);
          pagination.total = Data.value.length;
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
      form.value.name = row.name;
      form.value.information = row.information;
      form.value.planStatus = row.planStatus;
      form.value.persons = row.persons;
      planPeople.value = row.person;
      dialogFormVisible.value = true;
      selectId.value = row.id;
    };

    const handleConfirm = () => {
      if (formMode.value == "edit") {
        axiosInstance
          .put(`/plan/${selectId.value}`, form.value)
          .then((response) => {
            ElMessage({
              message: response,
              type: "success",
            });
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
          .post("/plan", form.value)
          .then((response) => {
            ElMessage({
              message: response,
              type: "success",
            });
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
      axiosInstance
        .delete(`/plan/${row.id}`)
        .then((response) => {
          // 处理响应数据
          Data.value = toRaw(response.data);
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
      handleClose,
      showInput,
      handleInputConfirm,
      inputValue,
      inputVisible,
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
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
