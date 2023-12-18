<template>
  <div class="container">
    <div class="cardArea">
      <div class="card" v-for="(info, index) in Data" :key="index">
        <div class="imgArea">
          <div class="question"><span>?</span></div>
          <el-image
            v-if="info.image"
            class="realImg"
            :src="'data:image/png;base64,' + info.image"
            fit="cover"
          />
          <el-image
            v-else
            class="realImg"
            :src="'https://banffventureforum.com/wp-content/uploads/2019/08/No-Image.png'"
            fit="cover"
          />
        </div>
        <div class="infoArea">
          <div class="icons">
            <div class="icon">
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="info.mail"
                placement="top"
              >
                <img src="@/assets/envelope.png" />
              </el-tooltip>
            </div>
            <div class="icon">
              <el-tooltip
                v-if="info.instagram"
                class="box-item"
                effect="dark"
                :content="info.instagram"
                placement="top"
              >
                <img src="@/assets/browser.png" />
              </el-tooltip>
            </div>
          </div>
          <div class="text">
            <p>{{ info.name }}</p>
            <p>{{ formatterPersonId(info.personId) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, toRaw } from "vue";
import axiosInstance from "@/axios";
import { ElImage } from "element-plus";
export default defineComponent({
  components: { ElImage },
  setup() {
    const Data = ref([]);
    const url = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";

    const fetchData = () => {
      axiosInstance
        .get("/person/all")
        .then((response) => {
          // 处理响应数据
          Data.value = toRaw(response.data);
          console.log(response.data);
          console.log("這粒", Data.value);
        })
        .catch((error) => {
          // 处理错误
          console.error("Error:", error);
        });
    };

    const formatterPersonId = (personId) => {
      const Sli_master = personId.charAt(0);
      const Sli_degree = personId.substring(1, 4);
      var master = "";
      var degree = "";
      console.log("formatterPersonId:", personId);
      console.log("Sli_degree:", Sli_degree);
      console.log("Sli_master:", typeof Sli_master);

      if (Sli_master === "7") {
        master = "碩士班";
      } else {
        master = "博士班";
      }

      if (Sli_degree === "112") {
        degree = "一年級";
      } else {
        degree = "二年級";
      }
      console.log("----degree:", degree);
      console.log("----:master", master);

      return `${master}${degree} `;
    };

    onMounted(() => {
      fetchData();
    });

    return {
      Data,
      formatterPersonId,
      url,
    };
  },
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap");
span,
p {
  color: #000000;
}
.question span {
  color: #05a5ba !important;
}

.imgArea {
  height: 70%;
  width: 100%;
  .question {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    font-family: "Poppins", sans-serif;
    font-size: 9rem;
  }
  .realImg {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.infoArea {
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60%;
    p {
      font-weight: 600;
      line-height: 1.2;
    }
  }

  .icons {
    padding: 1% 2%;
    width: 100%;
    height: 40%;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 3%;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}

.card:hover {
  transform: scale(1.2); /* 鼠标悬停时放大到 1.1 倍 */
  z-index: 4;
  background-color: rgb(255, 255, 255);
  box-shadow: 2px 2px 3px 0px #ababab;
  cursor: pointer;
  border: none;
  border-radius: 1em;
}

.card:hover .icons {
  display: flex !important;
}
.card .icons {
  display: none !important;
}

.card:hover .question {
  display: none !important;
}

.card:hover .realImg {
  display: flex !important;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
}

.card .realImg {
  display: none !important;
}

.card .question {
  display: flex !important;
}
.question {
  z-index: 1;
  display: none;
}

.realImg {
  z-index: 2;
  display: block;
}

.container {
  width: 100% !important;
  height: 100%;
  display: flex;
  padding: 3rem;
  justify-content: center;
  align-items: center;
  padding-bottom: 7rem;
}
.cardArea {
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start; /* 控制垂直方向上的對齊方式 */
  padding: 0; /* 清除 padding */
  overflow-y: scroll;
  padding: 3%;
}

.card {
  z-index: 3;
  width: calc(100% / 5); /* 考慮 gutter 的寬度，這裡是四等分 */
  height: calc((100% / 4) * 1.5);

  margin: 0; /* 清除 margin */
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  transition: transform 0.3s ease; /* 添加过渡效果 */
  /*width: 20%;
  height: 7rem;
  background-color: red;
  border: 1px solid #000;*/
}
</style>
