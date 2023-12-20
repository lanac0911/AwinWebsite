<template>
  <main class="home">
    <el-dialog width="30%" @close="handelClose" v-model="isOpen" title="更改密碼">
      <el-form ref="ruleFormRef" :model="form">
        <el-form-item required label="原密碼">
          <el-input v-model="form.oldPass" />
        </el-form-item>
        <el-form-item required label="新密碼">
          <el-input v-model="form.password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handelClose">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 送出 </el-button>
        </span>
      </template>
    </el-dialog>
  </main>
</template>

<script>
import { defineComponent, onMounted, watch, ref, reactive, computed } from "vue";
import { loginPersonStatus } from "../../../utils";
import axiosInstance from "@/axios";
import { ElIcon, ElButton, ElDialog, ElForm, ElInput, ElMessage } from "element-plus";

export default defineComponent({
  components: {
    ElInput,
    ElIcon,
    ElForm,
    ElButton,
    ElDialog,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    selectId: {
      type: String || null,
      required: true,
    },
  },
  setup(props, { emit }) {
    const internalIsOpen = ref(props.isOpen);
    const ruleFormRef = ref();

    const form = ref({
      oldPass: "",
      password: "",
    });

    // 檢查密碼是否符合條件的函式
    const isPasswordValid = (password) => {
      // 密碼至少包含1個英文和1個數字，且長度至少為8
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordPattern.test(password);
    };

    const handleConfirm = () => {
      // 檢查密碼是否符合條件
      if (!isPasswordValid(form.value.password)) {
        ElMessage({
          duration: 6000,
          message: "密碼至少包含1個英文和1個數字，且長度至少為8",
          type: "warning",
        });
        return;
      }

      const old = form.value.oldPass;
      const body = {
        password: form.value.password,
      };
      axiosInstance
        .put(`/person/change_pd/${props.selectId}/${old}`, body)
        .then((response) => {
          ElMessage({
            duration: 6000,
            message: "修改成功",
            type: "success",
          });
          handelClose();
        })
        .catch((error) => {
          ElMessage({
            duration: 6000,
            message: "修改發生錯誤" + error.response.data,
            type: "error",
          });
          console.error("Error:", error);
        });
    };

    const handelClose = () => {
      form.value.oldPass = "";
      form.value.password = "";
      emit("update:isOpen", false);
    };

    watch(
      () => props.isOpen,
      (newVal) => {
        internalIsOpen.value = newVal;
      }
    );

    return {
      internalIsOpen,
      form,
      handleConfirm,
      handelClose,
      ruleFormRef,
    };
  },
});
</script>
