<template>
  <div class="container">
    ContactPage
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



</style>