<template>
  <el-row>
    <div class="box">
      <el-statistic title="總學生數" :value="19"> </el-statistic>
    </div>
    <div class="box">
      <el-statistic title="博士班人數" :value="3"> </el-statistic>
    </div>
    <div class="box">
      <el-statistic title="碩士班人數" :value="13"> </el-statistic>
    </div>
    <div class="box">
      <el-statistic title="在職碩班人數" :value="6"> </el-statistic>
    </div>
    <div class="box">
      <el-statistic :value="12">
        <template #title>
          <div style="display: inline-flex; align-items: center">男女比</div>
        </template>
        <template #suffix>/ 6</template>
      </el-statistic>
    </div>
    <div class="box">
      <el-statistic title="累計論文總數" :value="30"> </el-statistic>
    </div>
    <div class="box">
      <el-statistic title="累計計畫數" :value="10"> </el-statistic>
    </div>
  </el-row>
</template>

<script>
import { defineComponent } from "vue";
import { ElRow, ElCol, ElIcon, ElStatistic } from "element-plus";
import { ChatLineRound, Male } from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElStatistic,
    ElIcon,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.box {
  width: 20rem;
  height: 15rem;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 4px 8px 0 #e7e7e7;
  /*box-shadow: 4px 8px 0 #e7e7e7;*/
}
.box:hover {
  box-shadow: inset 4px 5px 0 #e7e7e7;
}
</style>
