<template>
  <div class="container">
    <el-carousel :interval="40000" type="card"  >
      <el-carousel-item  v-for="area in areas" :key="area.title">
        <div class="card">
          <div class="title">
            <h1 text="2xl" justify="center">{{ area.title }}</h1>
          </div>
          <el-divider />
          <div class="context">
            <span text="2xl" justify="center">{{ area.context }}</span>

          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
    
</template>


<script>
import { defineComponent } from 'vue'
import { ElCarousel, ElDivider } from 'element-plus'
export default defineComponent({
  components: {
    ElCarousel,
    ElDivider,
  },
  setup() {
    const areas = [
      {
        title: '智慧無人載具深度學習技術',
        context: '本研究基於深度學習與啟發式演算法，結合智慧無人載具發展相關創新研究以達科學與技術的卓越性。\n \
                目前我們著重於以下研究領域：\n \
                (1) 無人載具上搭載LiDAR及光學圖像進行三維影像重建 \n \
                (2) 結合深度學習之物件追蹤演算法進行違規停車交通科技執法\n '
      },
      {
        title: '智慧物聯網產業應用',
        context: '對於工業4.0、智慧工廠、智慧生醫等方面進行研究與開發。\n \
                  目前主要對於探討心電圖資訊因無線傳輸過程中面臨的雜訊干擾、封包遺失、安全性及系統設備舒適度與方便性著手進行開發，期能達成長時傳輸(long‐time)、可靠傳輸(reliable)、隱私維護(privacy preserving)的網路通訊技術目標，同時適合個人型之隨身心電資訊(ECG)監控照護系統與服務，加強與醫學界互動以增加產品技術研發之實用性。'
      },
      {
        title: '前瞻無線網路最佳化技術',
        context: ' 本研究主要使用強化式學習與啟發式演算法來探討有關無線感測網路(Wireless Sensor Network,WSN)以及第六代行動通訊系統(6th generation wireless systems,6G)等無線網路關鍵問題並發展相關的創新研究與應用。\n \
                  目前研究範圍主要包含了以下幾個領域：\n \
                      (1)存取控制(Admission Control)\n \
                      (2)壽命最佳化(Lifetime Optimization)\n \
                      (3)路由策略建構(Routing strategy construction )\n \
                      (4)最佳化排程(Schedule Optimization)'
      },
      {
        title: '智慧電表資訊安全與滲透防護',
        context: '在智慧家庭與智能生活的應用範圍內，發展綠化節能的應用服務，在某種比較層面上使生活方式具智慧化控管功能，如智慧家庭內的電器狀態監控、智慧電網系統架構內的先進讀表基礎建設(Advanced Metering Infrastructure，AMI)、電力需求面管理(Demand-Side Management，DSM)與需量反應計畫(Demand Response Program，DRP) 相關研究議題。'
      }
    ]

    return {
      areas
    }
  },
})


</script>


<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.context{
  white-space: pre-line; 
}
.el-divider{
  border-top: 1px #000000 var(--el-border-style);
  margin-bottom: 1em;
  margin-top: 0.5em;
}

.el-carousel{
  width: 80%;
}

.el-carousel__item {
  padding: 2rem;
}
.el-carousel__item h1 {
  color: #020202;
  font-weight: bold;
  opacity: 0.75;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

span {
  color: #000;
}
</style>