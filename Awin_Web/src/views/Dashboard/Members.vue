<template>
  <div class="wrapper">
    <div class="postBtn">
      <h2>成員資訊</h2>
      <el-button size="large" type="primary" @click="clickAdd">＋ 新增</el-button>
      <el-dialog
        @close="handelClose"
        v-model="dialogFormVisible"
        :title="formMode === 'edit' ? '＃編輯' : '#新增'"
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

          <el-form-item v-if="formMode == 'add'" label="密碼">
            <el-input v-model="form.password" />
          </el-form-item>
          <el-form-item v-else label="密碼">
            <el-button @click="handelPsw">修改密碼</el-button>
          </el-form-item>

          <el-form-item label="論文">
            <el-input v-model="form.instagram" />
          </el-form-item>

          <el-form-item label="mail">
            <el-input v-model="form.mail" />
          </el-form-item>
          <div class="imgUpA">
            <div class="preview" v-if="nowImg && !imageUrl">
              <img
                class="el-upload-list__item-thumbnail"
                :src="'data:image/png;base64,' + nowImg"
                alt="img error"
              />
            </div>
            <el-upload
              class="avatar-uploader"
              :before-upload="beforeAvatarUpload"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="changeFile1"
              :file-list="fileList1"
            >
              <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              <template #file="{ file }">
                <div>
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt="img error"
                  />
                </div>
              </template>
            </el-upload>
          </div>
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
      <el-table v-loading="loading" :data="visibleData" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="personId" label="學號" />
        <el-table-column prop="identify" label="身份">
          <template #default="scope">
            <el-tag
              effect="dark"
              :type="scope.row.identify === 'STUDENT' ? 'primary' : 'success'"
            >
              {{ scope.row.identify }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="mail" label="Mail" />
        <el-table-column prop="instagram" label="論文">
          <template #default="scope">
            <el-icon v-if="scope.row.instagram"><Paperclip /></el-icon>
            <a v-if="scope.row.instagram" target="_blank" :href="scope.row.instagram">
              論文
            </a>
          </template>
        </el-table-column>

        <el-table-column prop="image" label="照片">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-image
                :src="'data:image/png;base64,' + scope.row.image"
                style="width: 80px; height: 80px"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="plans" label="參與計畫" width="200px">
          <template #default="scope">
            <el-tag
              effect="plain"
              type="info"
              v-for="plan in scope.row.plans"
              :key="plan.id"
              id="tableTag"
            >
              {{ plan.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operations" width="150px">
          <template #default="scope">
            <div class="btn-group">
              <el-button
                type="warning"
                plain
                :disabled="
                  userData.identify !== 'TEACHER' ? scope.row.id !== userData.id : false
                "
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

    <pswForm :isOpen="openPsw" :selectId="selectId" @update:isOpen="openPsw = false" />
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
  ElUpload,
  ElImage,
} from "element-plus";

// 在需要发送请求的组件中
import axiosInstance from "@/axios";
import "element-plus/es/components/message/style/css";
import { useStore } from "vuex";
import pswForm from "./PSW/pswForm.vue";
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
    ElUpload,
    ElImage,
    pswForm,
  },

  setup() {
    const store = useStore();
    const userData = computed(() => store.state.userData);
    const Data = ref([]);
    const loading = ref(false);
    const dialogFormVisible = ref(false);
    const formMode = ref("add");
    const selectId = ref();
    const selectPId = ref();
    const nowImg = ref("");
    const pagination = reactive({
      currentPage: 1,
      pageSize: 5,
    });
    const disabled = ref(false);
    const fileList1 = ref([]);
    const editPersonID = ref(null);

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
    const imageUrl = ref("");

    const changeFile1 = (file, fileList) => {
      console.log("onchane file", file);
      console.log("onchane fileList", fileList);
      imageUrl.value = file.url;
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      fileList1.value = fileList;
    };
    const form = ref({
      personId: "",
      name: "",
      password: "",
      mail: "",
      instagram: "",
      identify: "",
    });
    // 對應每個 key 的標籤
    const labels = {
      personId: "學號",
      name: "姓名",
      password: "密碼",
      mail: "郵件",
      instagram: "論文",
      identify: "身份選擇",
    };

    const handelClose = () => {
      if (imageUrl.value) {
        // 如果是新增模式且已经上传了图片，则删除图片
        imageUrl.value = "";
        fileList1.value = [];
      }
      dialogFormVisible.value = false;
      Object.keys(form.value).forEach((key) => {
        form.value[key] = "";
      });
      imageUrl.value = "";
      nowImg.value = "";
      editPersonID.value = null;
      selectId.value = null;
      selectPId.value = null;
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
            message: "更新資料時發生錯誤" + error,
            type: "error",
          });
          console.error("Error:", error);
        });

      //
      handelClose();
    };

    const clickAdd = () => {
      dialogFormVisible.value = true;
      formMode.value = "add";
    };
    const clickEdit = (index, row) => {
      formMode.value = "edit";
      // 帶入表單
      editPersonID.value = row.id;
      form.value.personId = row.personId;
      form.value.name = row.name;
      form.value.password = row.password;
      form.value.mail = row.mail;
      form.value.identify = row.identify;
      form.value.instagram = row.instagram;
      nowImg.value = row.image;
      dialogFormVisible.value = true;
      selectId.value = row.id;
      selectPId.value = row.personId;
    };

    const putImg = (file, user) => {
      const formData = new FormData();
      // 将上传的文件添加到 FormData 中
      formData.append("file", file.raw);
      console.log("putImg:", formData);

      axiosInstance
        .post(`/person/uploadImage/${editPersonID.value}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // 处理上传成功的逻辑
          console.log("圖片 success:", response.data);
          fetchData();
        })
        .catch((error) => {
          ElMessage({
            duration: 3000,
            message: "圖片上傳失敗：" + error,
            type: "error",
          });
        });
    };

    const handleConfirm = () => {
      // 发送 POST 请求
      loading.value = true;

      console.log(
        `事前檢查：ID${editPersonID.value}, mode: ${formMode.value}, file:${fileList1.value[0]}`
      );

      if (formMode.value == "edit") {
        axiosInstance
          .put(`/person/${selectId.value}`, form.value)
          .then((response) => {
            console.log("POST Success:", response.data);
            if (imageUrl.value) {
              putImg(fileList1.value[0], response.data);
            }
            ElMessage({
              duration: 3000,
              message: "修改成功",
              type: "success",
            });
            // 更新表格数据
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
            fetchData();
          });
      } else {
        axiosInstance
          .post("/person", form.value)
          .then((response) => {
            // 处理成功的响应
            console.log("POST Success:", response.data);
            // 更新表格数据

            if (imageUrl.value) {
              putImg(fileList1.value[0], response.data);
            }
            fetchData();
          })
          .catch((error) => {
            ElMessage({
              duration: 3000,
              message: "新增時發生錯誤" + error,
              type: "error",
            });
          })
          .finally(() => {
            // 无论成功还是失败，都可以在这里执行一些逻辑
            dialogFormVisible.value = false; // 隐藏对话框等
            loading.value = false;
            fetchData();
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
            message: "刪除時發生錯誤" + error,
            type: "error",
          });
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const beforeAvatarUpload = (rawFile) => {
      console.log("beforeAvatarUpload.type", rawFile.type);
      if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
        ElMessage.error("Avatar picture must be JPG format!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("Avatar picture size cannot exceed 2MB!");
        return false;
      }

      // if (formMode.value === "edit") {
      //   const base64Prefix = "data:image/";
      //   const format = form.value.image.startsWith("data:image/png") ? "png" : "jpeg";
      //   imageUrl.value = `${base64Prefix}${format};base64,${form.value.image}`;
      // }

      return true;
    };
    const openPsw = ref(false);
    const handelPsw = () => {
      openPsw.value = true;
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
      imageUrl,
      beforeAvatarUpload,
      disabled,
      changeFile1,
      fileList1,
      nowImg,
      userData,
      handelPsw,
      openPsw,
      selectId,
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
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    border: 1px solid #00000029;
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }

  .preview {
    width: 40%;
    border: 1px dashed #ced0d6;
    margin-right: 0.3rem;
  }

  .imgUpA {
    display: flex;
  }

  a {
    color: #8b8a8a;
    text-decoration: underline;
  }
}
</style>
