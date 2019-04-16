<template>
    <div class="subject">
        <som-nav-bar  left-text=" " right-text="预约记录" class="NavBar" @on-right-click="Record">养修预约</som-nav-bar>
        <FormBoby/>
    </div>
</template>
<script>
import FormBoby from './FormBoby'
export default {
  name: 'bespeak',
  components:{
    FormBoby
  },
  methods:{
    Record(){
      this.$router.push({path:'/AppointmentRecord'})
    }
  }
}
</script>
<style lang="scss" scoped>
  .subject{
    .NavBar{
      color: #666
    }
  }
</style>
