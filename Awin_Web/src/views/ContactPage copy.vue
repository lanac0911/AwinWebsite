<template>
  <div class="collapseContainer">
    <el-collapse class="coll" v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="item in content"
        :key="item.title"
        :title="item.title"
        :name="item.title"
      >
        <template #title>
          {{ item.title }}
          <el-icon v-if="item.id == 1"><Comment /></el-icon>
          <el-icon v-else-if="item.id == 2"><Pointer /></el-icon>
          <el-icon v-else-if="item.id == 3"><Message /></el-icon>
        </template>
        <div class="content" :style="{ height: item.expanded ? 'auto' : '150px' }">
          {{ item.detail }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { ElCollapse } from "element-plus";

export default defineComponent({
  components: {
    ElCollapse,
  },
  setup() {
    const content = [
      {
        id: 1,
        title: "老師的話",
        detail:
          "(2023.Sep.9) \n \
          同學你好，我是陳煥老師。\n \
          今年我會收六位碩士班新生。。我的專長可參考這裡。\n \
          你們將會是老師在中興的第十屆學生。老師目前有3位博班，6位碩二，7位碩一學生，都會盡力協助各位同學的研究學習。\n \
          以下為實驗室介紹：\n \
          本實驗室名稱為［前瞻無線資訊網路實驗室］(Advanced Wireless Information Networks)。\n \
          實驗室成立於2003年二月，可分為兩個時期，前9年老師服務於中正大學電機系網路組2003.2-2012.2，自2012.2後服務於中興大學資工系(2012.2-迄今)。老師曾經指導過3位博士班學生；超過60位碩士生，皆學有所長(請參考實驗室成員 )。\n \
          依據學生興趣，與對未來發展的生涯規劃，可分成前瞻研究組與關鍵技術發展組，強調團隊和分工合作；領導、專案規劃與團體相處。研究主題包括但不限於：區塊鏈、物聯網、金融工程、社群網路、資料探勘、生醫訊號處理與應用、綠能資訊嵌入式系統開發、手機程式設計、網站前後端設計開發及雲端應用。\n \
          有很多新生問老師：老師我到底以後要走那一行，進那一家公司。老師的答案始終一樣，就是找一個自己最喜歡、最會做的工作。做最喜歡的工作就會很有耐心，不怕挫折，工作時都像在打電動，沒有人會喊累。做最會做的工作就會很有成就感，工作時就很有信心，游刃有餘。\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          老師近年的研究著重：\n \
          1.智慧無人載具深度學習技術：對於使用智慧無人載具(如：無人車、UAV無人機等)有興趣的同學可選此領域，此領域志在使用深度學習技術、LiDAR及光學圖像重建技術，來進行交通違規偵測以及違規停車等應用，歡迎有興趣的同學加入。\n \
          2.前瞻無線網路最佳化技術：此領域適合軟體工程師，主要使用強化式學習與啟發式演算法來探討有關5G網路壽命最佳化、存取控制、最佳化排程等創新研究及應用，更準備開始對6G開發進行研究。希望有心學習扎實技術的同學一起參加。\n \
          3.智慧電表資訊安全與滲透防護：開發智慧家庭電表控管功能，如：電器狀態監控，智慧電網系統、電力需求面管理集反映計畫等研究議題，歡迎有興趣的同學一起參加。",
      },
      {
        id: 2,
        title: "我想加入實驗室",
        detail:
          "對以上題目有興趣同學請與博士班學長許心耀 8109056003@smail.nchu.edu.tw聯絡。\n\
          並附上大學成績單、簡歷及專題相關資料及有興趣的領域。\n\
          在職專班生指導事宜請與博士班學長許心耀 8109056003@smail.nchu.edu.tw 聯絡。",
      },
      {
        id: 3,
        title: "與我們交流的方式",
        detail:
          "01. 先去看實驗室簡介，了解老師研究方向\n\
          02. 依據陳煥老師研究方向決定自己有興趣的主攻組別(依據本身興趣與能力可跨選多組))\n\
          03. 學長會依新生的研究方向進行輔導與評估，為避免耽擱各位新生找尋指導教授的黃金時間:\n\
            (1)評估過程會盡量於開始後一個月內完成(與學生配合度有關)。\n\
            (2)評估期間，學生可自由與其他教授同時進行接洽與面談。\n\
          相關評估包含：未來生涯規劃/專業背景/程式撰寫能力/互動狀況/計畫執行態度等，測驗目的在於建立相互了解。以期新生可以儘早跟上研究進度，待測驗過後。聯絡人會直接與老師進行討論並決定評估結果。\n\
          04. 確定指導關係後，請至系辦拿 ” 指導教授同意書 ” 給老師簽(遠地同學，可請學長姐代辦)。",
      },
    ];

    const activeNames = ref(["老師的話"]); // 设置默认展开项

    const handleChange = (names) => {};

    // Add the expanded property to each content item
    content.forEach((item) => {
      item.expanded = false;
    });

    return { content, activeNames, handleChange };
  },
});
</script>

<style scoped>
.collapseContainer {
  padding: 1rem 3rem;
  width: 100%;
  height: 100%;
  background-color: red;
  overflow: auto; /* 设置为auto以显示滚动条 */
}
.content {
  white-space: pre-line;
  overflow: auto;
  overflow-y: auto;
}

.coll {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
