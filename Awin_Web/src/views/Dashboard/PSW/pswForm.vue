<template>
  <main class="home">
    <el-dialog width="30%" @close="handelClose" v-model="isOpen" title="更改密碼">
      <el-form :rules="rules" ref="ruleFormRef" :model="form">
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

    const form = ref({
      oldPass: "",
      password: "",
    });

    const handleConfirm = () => {
      console.log("ready ");
      const old = form.value.oldPass;
      const body = {
        password: form.value.password,
      };
      axiosInstance
        .put(`/person/change_pd/${props.selectId}/${old}`, body)
        .then((response) => {
          console.log("修改成功");
          ElMessage({
            duration: 3000,
            message: "修改成功",
            type: "success",
          });
          handelClose();
        })
        .catch((error) => {
          ElMessage({
            duration: 3000,
            message: "修改發生錯誤" + error,
            type: "error",
          });
          console.error("Error:", error);
        });
    };

    const handelClose = () => {
      console.log("handelClose emit");

      form.value.oldPass = "";
      form.value.password = "";
      emit("update:isOpen", false);
    };

    // 使用 watch 監聽 isOpen 的變化
    watch(
      () => props.isOpen,
      (newVal) => {
        internalIsOpen.value = newVal;
        console.log("loginPersonStatus hanged:", loginPersonStatus.value);
      }
    );

    return {
      internalIsOpen,
      form,
      handleConfirm,
      handelClose,
    };
  },
});
</script>
