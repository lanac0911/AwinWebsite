<template>
  <div class="wrapper">
    <div class="postBtn">
      <h2>我的資訊</h2>
      <el-dialog
        @close="handelClose"
        v-model="dialogFormVisible"
        :title="formMode == 'edit' ? '＃編輯' : '#新增'"
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
          <div v-if="nowImg && !imageUrl">
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
      <el-descriptions class="margin-top" :column="3" size="large" border>
        <template #extra>
          <el-button size="large" type="warning" @click="clickEdit">
            <el-icon>
              <Edit />
            </el-icon>
            編輯
          </el-button>
        </template>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              Username
            </div>
          </template>
          {{ Data.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              學號
            </div>
          </template>
          {{ Data.personId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <location />
              </el-icon>
              Email
            </div>
          </template>
          {{ Data.mail }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <tickets />
              </el-icon>
              身份
            </div>
          </template>
          <el-tag size="small">{{ Data.identify }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building />
              </el-icon>
              Address
            </div>
          </template>
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, toRaw, ref, computed } from "vue";
import {
  ElIcon,
  ElButton,
  ElDialog,
  ElForm,
  ElSelect,
  ElTag,
  ElMessage,
  ElUpload,
  ElImage,
  ElDescriptions,
} from "element-plus";

// 在需要发送请求的组件中
import axiosInstance from "@/axios";
import "element-plus/es/components/message/style/css";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    ElSelect,
    ElIcon,
    ElForm,
    ElButton,
    ElDialog,
    ElTag,
    ElUpload,
    ElImage,
    ElDescriptions,
  },

  setup() {
    const store = useStore();
    const userID = computed(() => store.state.userData.personId);
    const Data = ref([]);
    const loading = ref(false);
    const dialogFormVisible = ref(false);
    const selectId = ref();
    const nowImg = ref("");
    const disabled = ref(false);
    const fileList1 = ref([]);

    const imageUrl = ref("");

    const changeFile1 = (file, fileList) => {
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
      identify: "",
    });

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
      selectId.value = null;
    };

    const fetchData = () => {
      axiosInstance
        .get(`/person/personId/${userID.value}`)
        .then((response) => {
          Data.value = toRaw(response.data);
          selectId.value = Data.value.id;
          ElMessage({
            duration: 6000,
            message: "更新成功",
            type: "success",
          });
        })
        .catch((error) => {
          ElMessage({
            duration: 6000,
            message: "更新資料時發生錯誤" + error.response.data,
            type: "error",
          });
          console.error("Error:", error);
        });
    };

    const clickEdit = () => {
      // 帶入表單
      form.value.personId = Data.value.personId;
      form.value.name = Data.value.name;
      form.value.password = Data.value.password;
      form.value.mail = Data.value.mail;
      form.value.identify = Data.value.identify;
      nowImg.value = Data.value.image;
      dialogFormVisible.value = true;
      selectId.value = Data.value.id;
    };

    const putImg = (file) => {
      const formData = new FormData();
      // 将上传的文件添加到 FormData 中
      formData.append("file", file.raw);

      axiosInstance
        .post(`/person/uploadImage/${selectId.value}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // 处理上传成功的逻辑
          fetchData();
          ElMessage({
            duration: 6000,
            message: "更新成功",
            type: "success",
          });
        })
        .catch((error) => {
          ElMessage({
            duration: 6000,
            message: "圖片上傳失敗：" + error.response.data,
            type: "error",
          });
        });
    };

    const handleConfirm = () => {
      // 发送 POST 请求
      loading.value = true;

      axiosInstance
        .put(`/person/${selectId.value}`, form.value)
        .then((response) => {
          if (imageUrl.value) {
            putImg(fileList1.value[0]);
          }
          // 更新表格数据
          fetchData();
        })
        .catch((error) => {
          ElMessage({
            duration: 6000,
            message: "發生錯誤" + error.response.data,
            type: "error",
          });
        })
        .finally(() => {
          // 无论成功还是失败，都可以在这里执行一些逻辑
          dialogFormVisible.value = false; // 隐藏对话框等
          loading.value = false;
          handelClose();
        });
    };

    const handleDelete = (index, row) => {
      loading.value = true;
      axiosInstance
        .delete(`/person/${row.id}`)
        .then((response) => {
          // 处理响应数据
          Data.value = toRaw(response.data);
          fetchData();
        })
        .catch((error) => {
          ElMessage({
            duration: 6000,
            message: "刪除時發生錯誤" + error.response.data,
            type: "error",
          });
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const beforeAvatarUpload = (rawFile) => {
      if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
        ElMessage.error("Avatar picture must be JPG format!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("Avatar picture size cannot exceed 2MB!");
        return false;
      }

      return true;
    };

    const size = ref("");
    const iconStyle = computed(() => {
      const marginMap = {
        large: "8px",
        default: "6px",
        small: "4px",
      };
      return {
        marginRight: marginMap[size.value] || marginMap.default,
      };
    });
    const blockMargin = computed(() => {
      const marginMap = {
        large: "32px",
        default: "28px",
        small: "24px",
      };
      return {
        marginTop: marginMap[size.value] || marginMap.default,
      };
    });

    onMounted(() => {
      fetchData();
    });

    return {
      dialogFormVisible,
      Data,
      form,
      handleConfirm,
      loading,
      handleDelete,
      clickEdit,
      handelClose,
      imageUrl,
      beforeAvatarUpload,
      disabled,
      changeFile1,
      fileList1,
      nowImg,
      iconStyle,
      blockMargin,
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
}

.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
