<template>
  <div class="wrapper">
    <div class="postBtn">
      <el-button
        size="large"
        type="primary"
        @click="clickAdd"
        >＋ 新增</el-button
      >
      <el-dialog @close="handelClose" v-model="dialogFormVisible" :title="(formMode == 'eidt') ? '＃編輯' : '#新增' ">
        <el-form :model="form">
          <el-form-item label="計畫名稱">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="狀態">
            <el-switch
              v-model="form.planStatus"
              :active-text="'PROCESS'"
              :inactive-text="'DONE'"
              :active-value="'PROCESS'"
              :inactive-value="'DONE'"
            />
          </el-form-item>
          <el-form-item label="詳細資訊">
            <el-input v-model="form.information"
            :rows="10"
            type="textarea" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handelClose">Cancel</el-button>
            <el-button type="primary" @click="handleConfirm()">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>


    <div class="tableArea">
      <el-table v-loading="isLoading" :data="Data" stripe style="width: 100%; height=250px;">
        <el-table-column prop="name" label="計畫名稱" />
        <el-table-column prop="planStatus" label="狀態">
          <template #default="scope">
            <el-tag :type="(scope.row.planStatus === 'PROCESS') ? 'success' : 'info'">
              {{ scope.row.planStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="information" label="詳細資訊" />
        <el-table-column label="Operations" width="150px">
          <template #default="scope">
            <div class="btn-group">
              <el-button size="small" @click="clickEdit(scope.$index, scope.row)"
                >編輯</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >刪除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>  
    </div>  
  </div>
</template>
<script>


import { defineComponent, onMounted, toRaw ,ref, reactive, nextTick } from 'vue'
import { ElIcon, ElTable, ElButton, ElDialog, ElForm, ElSelect, ElTag , vLoading } from 'element-plus'

// 在需要发送请求的组件中
import axiosInstance from '@/axios';

export default defineComponent({
  components: {
    ElSelect,
    ElIcon,
    ElTable,
    ElForm,
    ElButton,
    ElDialog,
    ElTag,
    vLoading
  },

  setup() {
    const Data = ref([]); 
    const isLoading = ref(false); 
    const dialogFormVisible = ref(false)
    const formMode = ref('add')
    const selectId = ref()

    const form = ref({
      name: "",
      information: "",
      planStatus: "PROCESS",
    })


    const handelClose = () => {
      console.log("close")
      dialogFormVisible.value = false
      Object.keys(form.value).forEach(key => {
        form.value[key] = "";
      });
      form.value.planStatus = 'PROCESS'
    }

    const fetchData = () => {      
      isLoading.value = true
      axiosInstance.get('/plan/all')
        .then(response => {
          // 处理响应数据
          Data.value = toRaw(response.data);
          console.log(response.data);
          console.log("vs",Data.value);
        })
        .catch(error => {
          // 处理错误
          console.error('Error:', error);
        })
        .finally(()=>{
          isLoading.value = false
        })
    }

    const clickAdd = () =>{
      formMode.value = 'add'
      dialogFormVisible.value = true
    }

    const clickEdit = (index, row) => {
      formMode.value = 'edit'
      // 帶入表單
      form.value.name =  row.name
      form.value.information =  row.information
      form.value.planStatus =  row.planStatus
      dialogFormVisible.value = true;
      selectId.value = row.id
    }


    const handleConfirm = () => {
      console.log('POST/PUT mode: ',formMode.value,",data:", form.value);
      // 发送 POST 请求

      if (formMode.value == 'edit' ){
        axiosInstance.put(`/plan/${selectId.value}`, form.value)
          .then(response => {
            // 处理成功的响应
            console.log('PUT Success:', response.data);
            // 更新表格数据
            fetchData();
          })
          .catch(error => {
            // 处理错误
            console.error('POST Error:', error);
          })
          .finally(() => {
            // 无论成功还是失败，都可以在这里执行一些逻辑
            dialogFormVisible.value = false; // 隐藏对话框等
          });
      }
      else {
        
        axiosInstance.post('/plan', form.value)
          .then(response => {
            // 处理成功的响应
            console.log('POST Success:', response.data);
            // 更新表格数据
            fetchData();
          })
          .catch(error => {
            // 处理错误
            console.error('POST Error:', error);
          })
          .finally(() => {
            // 无论成功还是失败，都可以在这里执行一些逻辑
            dialogFormVisible.value = false; // 隐藏对话框等
          });
      }
    }



    const handleDelete = (index, row) => {
      console.log("row=", row.id)
      axiosInstance.delete(`/plan/${row.id}`)
        .then(response => {
          // 处理响应数据
          Data.value = toRaw(response.data);
          console.log(response.data);
          console.log("vs",Data.value);
          fetchData();
        })
        .catch(error => {
          // 处理错误
          console.error('Error:', error);
        })
    }

    onMounted(() => {
      // 在组件挂载后执行的逻辑
      console.log("test")
      fetchData()
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
      formMode
    };   
  }
})

</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;

  .postBtn{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

  }
  .tableArea{
    overflow: auto;
    width: 100%;
    height: 90%;
    border: 2px solid #000;
    .btn-group{
      display: flex;
    }
  }

}


</style>