<template>
  <div class="wrapper">
    <div class="postBtn">
      <h2>成員資訊</h2>
      <div class="right">
        <div class="searchBar">
          <el-input class="inputBar" v-model="search" size="large" placeholder="搜尋">
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
        </div>
        <el-button size="large" type="primary" @click="clickAdd">＋ 新增</el-button>
      </div>
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
              v-for="person in dynamicPerson"
              id="tableTag"
              :key="person.id"
              closable
              :disable-transitions="false"
              @close="handleTagClose(person)"
            >
              {{ person.name }}
            </el-tag>
            <el-select
              v-if="inputVisible"
              v-model="inputValue"
              filterable
              placeholder="Select"
              @change="handleInputConfirm"
            >
              <el-option
                v-for="person in allPerson"
                :key="person.id"
                :label="person.name"
                :value="person"
              />
            </el-select>
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
            <el-tag
              effect="dark"
              :type="scope.row.planStatus === 'PROCESS' ? 'success' : 'info'"
            >
              {{ scope.row.planStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="information" label="詳細資訊" />
        <el-table-column prop="persons" label="成員">
          <template #default="scope">
            <el-tag
              effect="plain"
              v-for="person in scope.row.persons"
              :key="person.id"
              id="tableTag"
            >
              {{ person.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operations" width="150px">
          <template #default="scope">
            <div class="btn-group">
              <el-button
                type="warning"
                plain
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
    const dynamicPerson = ref([]);
    const search = ref("");

    const pagination = reactive({
      currentPage: 1,
      pageSize: 5,
    });

    const visibleData = computed(() => {
      const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;

      // Filter the data based on the search term
      const filteredData = Data.value.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.value.toLowerCase()) ||
          item.planStatus.toLowerCase().includes(search.value.toLowerCase()) ||
          // Add more fields to search as needed
          item.information.toLowerCase().includes(search.value.toLowerCase()) ||
          item.persons.some((person) =>
            person.name.toLowerCase().includes(search.value.toLowerCase())
          )
        );
      });

      // Apply pagination to the filtered data
      const paginatedData = filteredData.slice(startIndex, endIndex);

      return paginatedData;
    });
    const inputValue = ref("");
    const inputVisible = ref(false);
    const planPeople = ref([]);
    const InputRef = ref(null);
    const allPerson = ref([]);

    // add paln person
    const handleTagClose = (tag) => {
      dynamicPerson.value.splice(dynamicPerson.value.indexOf(tag), 1);
      console.log("handleClose tag:", tag);
    };
    const showInput = () => {
      inputVisible.value = true;
    };
    const handleInputConfirm = (value, option) => {
      console.log("###1 value", value);
      console.log("###2 dynamicPerson", dynamicPerson.value);
      dynamicPerson.value.push(value);
      console.log("選中後的", dynamicPerson.value);
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
      console.log("###3 handelClose", dynamicPerson.value);

      dialogFormVisible.value = false;
      Object.keys(form.value).forEach((key) => {
        if (key != "persons") form.value[key] = "";
      });
      form.value.planStatus = "PROCESS";
      form.value.persons = [];
      dynamicPerson.value = [];
    };

    const fetchData = () => {
      isLoading.value = true;
      axiosInstance
        .get("/plan/all")
        .then((response) => {
          // 处理响应数据
          Data.value = toRaw(response.data);
          pagination.total = Data.value.length;
          console.log("Data Plan", Data.value);
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

      axiosInstance
        .get("/person/all")
        .then((response) => {
          allPerson.value = toRaw(response.data);
          console.log("Data Person", allPerson.value);
        })
        .catch(() => {
          console.warn("Get All person wrong");
        });
    };

    const clickAdd = () => {
      formMode.value = "add";
      dialogFormVisible.value = true;
    };

    const clickEdit = (index, row) => {
      console.log("電擊edit");
      formMode.value = "edit";
      // 帶入表單
      form.value.name = row.name;
      form.value.information = row.information;
      form.value.planStatus = row.planStatus;
      form.value.persons = row.persons;
      planPeople.value = row.person;
      dialogFormVisible.value = true;
      selectId.value = row.id;
      dynamicPerson.value = row.persons;
      console.log("電擊edit agetr:", dynamicPerson.value);
    };

    const handleConfirm = () => {
      if (formMode.value == "edit") {
        axiosInstance
          .put(`/plan/${selectId.value}`, form.value)
          .then((response) => {
            ElMessage({
              message: "修改成功" + response,
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
              message: "新增成功" + response,
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
      handleTagClose,
      showInput,
      handleInputConfirm,
      inputValue,
      inputVisible,
      allPerson,
      dynamicPerson,
      search,
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

  #tableTag {
    margin-right: 5px;
  }

  .right {
    width: 70%;
    display: flex;
    justify-content: flex-end;
  }
  .searchBar {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
    .inputBar {
      width: 100%;
    }
  }
}
</style>
