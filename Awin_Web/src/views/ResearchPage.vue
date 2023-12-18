<template>
  <div class="container">
    <div class="header">
      <span id="highlight"> AWIN Lab</span>
      <span id="ori"> &ensp;Research Area</span>
    </div>
    <el-carousel :interval="40000" type="card">
      <el-carousel-item v-for="plan in filteredData" :key="plan.id">
        <div class="card">
          <div class="top">
            <div class="title">
              <h1 text="2xl" justify="center">{{ plan.name }}</h1>
            </div>
            <el-divider />
            <div class="context">
              <span text="2xl" justify="center">{{ plan.information }}</span>
            </div>
          </div>
          <div class="bottom">
            <div class="hint">參與人員：</div>
            <div class="partici">
              <div class="planPeople" v-for="person in plan.persons" :key="person.id">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="person.name"
                  placement="top"
                >
                  <el-avatar
                    class="ava"
                    :src="
                      person.image
                        ? 'data:image/png;base64,' + person.image
                        : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'
                    "
                  />
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, toRaw, computed } from "vue";
import axiosInstance from "@/axios";
import { ElCarousel, ElDivider, ElMessage, ElAvatar } from "element-plus";
export default defineComponent({
  components: {
    ElCarousel,
    ElDivider,
    ElAvatar,
  },
  setup() {
    const Data = ref([]);

    onMounted(() => {
      fetchData(); // 初始加载数据
    });

    const filteredData = computed(() => {
      return Data.value.filter((plan) => plan.planStatus === "PROCESS");
    });

    const fetchData = () => {
      axiosInstance
        .get("/plan/all")
        .then((response) => {
          // 处理响应数据
          Data.value = toRaw(response.data);
          console.log("Data Plan", Data.value);
        })
        .catch((error) => {
          ElMessage({
            message: error,
            type: "warning",
          });
        });
    };

    return {
      Data,
      filteredData,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap");
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.context {
  white-space: pre-line;
}
.el-divider {
  border-top: 1px #000000 var(--el-border-style);
  margin-bottom: 1em;
  margin-top: 0.5em;
}

.header {
  height: 20%;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-family: "Poppins", sans-serif;
}
.el-carousel {
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: row;
}

.el-carousel__item {
  padding: 2rem;
  box-shadow: 0px 3px 2px #a4a1a1;
  border-radius: 10px;
}
.el-carousel__item h1 {
  color: #020202;
  font-weight: bold;
  opacity: 0.75;
  margin: 0;
  text-align: center;
  font-size: 2rem;
}

.el-carousel__item:nth-child(2n) {
  background-color: #d3dce6;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #f0f0f0;
}
:deep(.el-carousel__container) {
  position: relative;
  height: 80%;
  width: 100%;
}

span {
  color: #000;
}
#highlight {
  background: #05a5ba;
  padding: 0 0.8rem;
  color: rgb(255, 255, 255);
}
.card {
  height: 100%;
}

.planPeople {
  margin-right: 0.3rem;
}

.partici {
  display: flex;
  flex-direction: row;
  height: 10%;
  width: 100%;
  justify-content: flex-end;
}
.hint {
  display: flex;
}
.top {
  height: 90%;
}
</style>
