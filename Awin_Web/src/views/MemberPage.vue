<template>
  <div class="container">
    <div class="cardArea">
        <div class="card" v-for="(info, index) in processedMembers" :key="index">
          <div class="imgArea"></div>
          <div class="infoArea">
            <span>{{info.name}}</span>
            <span>{{info.github}}</span>

          </div>
        </div>
    </div>
  </div>
    
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
  },
  setup() {
    const Members = [
      {
        name: '張黛妤',
        id: 1,
        personId: 1,
        password: '12456',
        github: 'est123@gmail.com',
        instagram: 'lana09',
        mail: 'test123@gmail.com',
        image: '',
      },
      {
        name: '張黛妤',
        id: 1,
        personId: 1,
        password: '12456',
        github: 'est123@gmail.com',
        instagram: 'lana09',
        mail: 'test123@gmail.com',
        image: '',
      },
      {
        name: '張黛妤',
        id: 1,
        personId: 1,
        password: '12456',
        github: 'est123@gmail.com',
        instagram: 'lana09',
        mail: 'test123@gmail.com',
        image: '',
      },
      {
        name: '張黛妤',
        id: 1,
        personId: 1,
        password: '12456',
        github: 'est123@gmail.com',
        instagram: 'lana09',
        mail: 'test123@gmail.com',
        image: '',
      },
      {
        name: '張黛妤',
        id: 1,
        personId: 7112056068,
        password: '12456',
        github: 'DWFE@gmail.com',
        instagram: 'lana09',
        mail: 'test123@gmail.com',
        image: '',
      },
      {
        name: '張黛妤',
        id: 1,
        personId: 1,
        password: '12456',
        github: 'est123@gmail.com',
        instagram: 'lana09',
        mail: 'test123@gmail.com',
        image: '',
      },
      {
        name: '張黛妤',
        id: 1,
        personId: 1,
        password: '12456',
        github: 'est123@gmail.com',
        instagram: 'lana09',
        mail: 'test123@gmail.com',
        image: '',
      },
      {
        name: '張黛妤',
        id: 1,
        personId: 1,
        password: '12456',
        github: 'est123@gmail.com',
        instagram: 'lana09',
        mail: 'test123@gmail.com',
        image: '',
      },
      {
        name: '張黛妤',
        id: 1,
        personId: 1,
        password: '12456',
        github: 'est123@gmail.com',
        instagram: 'lana09',
        mail: 'test123@gmail.com',
        image: '',
      },
      {
        name: '張黛妤',
        id: 1,
        personId: 1,
        password: '12456',
        github: 'est123@gmail.com',
        instagram: 'lana09',
        mail: 'test123@gmail.com',
        image: '',
      },
      {
        name: '張黛妤',
        id: 1,
        personId: 1,
        password: '12456',
        github: 'est123@gmail.com',
        instagram: 'lana09',
        mail: 'test123@gmail.com',
        image: '',
      },
      {
        name: '張黛妤',
        id: 1,
        personId: 1,
        password: '12456',
        github: 'est123@gmail.com',
        instagram: 'lana09',
        mail: 'test123@gmail.com',
        image: '',
      }
    ]

    // 在 setup 函數中進行資料處理
    const processedMembers = Members.map(member => ({
      ...member,
      github: member.github.toLowerCase(), // 將 github 字段轉換為小寫
    }))

    return {
      processedMembers
    }
  },
})


</script>


<style scoped>

.container {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 5rem;
  justify-content: center;
  align-items: center;
}
.cardArea{
  background-color: aqua;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start; /* 控制垂直方向上的對齊方式 */
  padding: 0; /* 清除 padding */
  overflow-y: scroll;
}

.card {
  width: calc(20%); /* 考慮 gutter 的寬度，這裡是四等分 */
  height: calc((100% / 4) * 1.5); 

  margin: 0; /* 清除 margin */
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  
  /*width: 20%;
  height: 7rem;
  background-color: red;
  border: 1px solid #000;*/
}

</style>