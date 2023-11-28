<template>
  <div class="Wcontainer">
    <div class="left">
      <div class="WordBox">
        <div class="lineword">Advanced</div>
        <div class="lineword" id="hightlight">Wireless</div>
        <div class="lineword">Information</div>
        <div class="lineword">Networks</div>
        <div class="lineword" id="smallword">無線感測網路實驗室</div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  setup() {
    return {
      zIndex: 3000,
      size: "small",
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap");

.Wcontainer {
  flex: 1;
  align-items: center;
  display: flex;
}
.left {
  width: 60%;
  height: 100%;
  display: flex;
}
.WordBox {
  margin-left: 10%;
  margin-bottom: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.lineword {
  color: #fff;
  font-size: 7rem;
  line-height: 1;
  font-family: "Poppins", sans-serif;
}
.lineword::first-letter {
  color: #8167a9;
}
.right {
  width: 40%;
  height: 100%;
  background-size: cover;
  background-position: right;
  background-image: url("https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-color: #8167a9;
}

#hightlight {
  background: #ffffff;
  color: rgb(40, 38, 38);
  padding: 0.5rem;
}
#hightlight::first-letter {
  color: rgb(40, 38, 38);
}

#smallword {
  font-size: 2rem;
  padding: 0.3rem;
}
</style>
