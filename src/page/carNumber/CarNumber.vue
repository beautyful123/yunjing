<template>
  <div class='carNumer'>
    <span v-for='(item, index) in carArr' :key='index' @click='carClick(item.name)' :class="car===item.name?'Selection':''">{{item.name}}</span>
  </div>
</template>

<script>
export default {
    data () {
      return {
        // flag: true,
        carArr: [
          {name: '京'},
          {name: '沪'},
          {name: '浙'},
          {name: '苏'},
          {name: '粤'},
          {name: '鲁'},
          {name: '晋'},
          {name: '冀'},
          {name: '豫'},
          {name: '川'},
          {name: '渝'},
          {name: '辽'},
          {name: '吉'},
          {name: '黑'},
          {name: '皖'},
          {name: '鄂'},
          {name: '湘'},
          {name: '赣'},
          {name: '闽'},
          {name: '陕'},
          {name: '甘'},
          {name: '宁'},
          {name: '蒙'},
          {name: '津'},
          {name: '贵'},
          {name: '云'},
          {name: '贵'},
          {name: '琼'},
          {name: '青'},
          {name: '新'},
          {name: '藏'},
          {name: '台'},
        ]
      }
    },
    props:{
      car:{
        type:String,
        required:false
      }
    },
    methods: {
      carClick (name) {
        // console.log(name)
        // this.flag = false
        this.$emit('pfn', name)
      }
    },
}
</script>

<style lang='scss' scoped>
  .carNumer{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 10.3rem;
    background-color: #999;
    span{
      float: left;
      width: 9%;
      height: 2rem;
      background-color: #ffffff;
      border-radius: 0.2rem;
      font-size: 1rem;
      text-align: center;
      line-height: 2rem;
      margin-top: 0.5rem;
      margin-left: 0.5rem;
    }
    .Selection{
      background: rgb(161, 140, 140);
      color: #ffffff;
    }
  }
</style>
