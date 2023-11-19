<template>
  <div class="container">
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
import { defineComponent } from 'vue'
import { ElAffix  } from 'element-plus'

export default defineComponent({
  components: {
    ElAffix,
  },
  setup() {
    return {
      zIndex: 3000,
      size: 'small',
    }
  },
})


</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap');

.container{
  flex: 1;
  align-items: center;
  display: flex;
  
}
.left{
  width: 60%;
  height: 100%;
  display: flex;
}
.WordBox{
  margin-left: 10%;
  margin-bottom: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.lineword{
  font-size: 7rem;
  line-height: 1;
  font-family: 'Poppins', sans-serif;

}
.lineword::first-letter {
  color: #8167a9;
}
.right{
  width: 40%;
  height: 100%;
  background-color: #8167a9;
}

#hightlight{
  background: #2c3e50;
  color: #fff;
  padding: 0.5rem
}
#hightlight::first-letter{
  color: #fff;
}

#smallword{
  font-size: 2rem;
  padding: 0.3rem;
}

.div {
  border: 1px solid #000;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.div-2 {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  display: flex;
  min-height: 1080px;
  width: 100%;
  align-items: center;
  padding: 0 20px 50px;
}
@media (max-width: 991px) {
  .div-2 {
    max-width: 100%;
  }
}
.img {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
.div-3 {
  position: relative;
  display: flex;
  margin-bottom: 30px;
  width: 100%;
  max-width: 1474px;
  flex-direction: column;
}
@media (max-width: 991px) {
  .div-3 {
    max-width: 100%;
  }
}
.div-4 {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
}
@media (max-width: 991px) {
  .div-4 {
    max-width: 100%;
    flex-wrap: wrap;
  }
}
.div-5 {
  display: flex;
  margin-top: 213px;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
}
@media (max-width: 991px) {
  .div-5 {
    max-width: 100%;
    margin-top: 40px;
  }
}
.div-6 {
  color: #000;
  font: 800 127px/190px Poppins, sans-serif;
}
@media (max-width: 991px) {
  .div-6 {
    max-width: 100%;
    font-size: 40px;
    line-height: 67px;
  }
}
.div-7 {
  color: #fff;
  backdrop-filter: blur(1.2681913375854492px);
  background-color: #8167a9;
  margin-top: 30px;
  align-items: start;
  padding: 11px 20px 11px -15px;
  font: 800 127px/190px Poppins, sans-serif;
}
@media (max-width: 991px) {
  .div-7 {
    max-width: 100%;
    font-size: 40px;
    line-height: 67px;
  }
}
.div-8 {
  align-self: start;
  display: flex;
  flex-basis: 0%;
  flex-direction: column;
  align-items: center;
}
.div-9 {
  background-color: #8167a9;
  z-index: 1;
  display: flex;
  width: 4px;
  height: 320px;
  flex-direction: column;
}
.img-2 {
  aspect-ratio: 1.11;
  object-fit: contain;
  object-position: center;
  width: 125px;
  overflow: hidden;
}
.div-10 {
  color: #000;
  margin-top: 5px;
  font: 800 127px/190px Poppins, sans-serif;
}
@media (max-width: 991px) {
  .div-10 {
    max-width: 100%;
    font-size: 40px;
    line-height: 67px;
  }
}
.div-11 {
  display: flex;
  margin-top: 33px;
  flex-direction: column;
  align-items: end;
}
@media (max-width: 991px) {
  .div-11 {
    max-width: 100%;
  }
}
.div-12 {
  color: #000;
  align-self: stretch;
  font: 800 127px/190px Poppins, sans-serif;
}
@media (max-width: 991px) {
  .div-12 {
    max-width: 100%;
    font-size: 40px;
    line-height: 67px;
  }
}
.div-13 {
  color: #000;
  align-self: stretch;
  margin-top: 26px;
  font: 400 32px/50px Knewave, sans-serif;
}
@media (max-width: 991px) {
  .div-13 {
    max-width: 100%;
  }
}
.div-14 {
  border-radius: 360.802px;
  background-color: #e7e7e7;
  display: flex;
  margin-top: 145px;
  width: 1293px;
  max-width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding: 11px 51px 21px 52px;
}
@media (max-width: 991px) {
  .div-14 {
    flex-wrap: wrap;
    margin-top: 40px;
    padding: 0 20px;
  }
}
.img-3 {
  aspect-ratio: 1.3;
  object-fit: contain;
  object-position: center;
  width: 87px;
  overflow: hidden;
  align-self: stretch;
  max-width: 100%;
}
.div-15 {
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
  align-self: center;
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font: 700 30px/36px Montserrat, sans-serif;
}
.div-16 {
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
  align-self: center;
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font: 700 30px/36px Montserrat, sans-serif;
}
.div-17 {
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
  align-self: center;
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font: 700 30px/36px Montserrat, sans-serif;
}
.div-18 {
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
  align-self: center;
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font: 700 30px/36px Montserrat, sans-serif;
}
</style>