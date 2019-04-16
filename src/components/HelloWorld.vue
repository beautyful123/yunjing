<template>
  <div class="hello">
    <!-- <div class="name">111</div> -->
      <!-- <som-button type="gray">gray</som-button> -->
      <som-car-picker :scene='3' @onSelected="wc" :showUnlimitBrand='false' :showUnlimitSeries='false' :showUnlimitModel='false'>
        <!-- <som-selector-item title="我的历史" index="历">
            <div class="selector-item-body-custom">
                <div 
                v-for="brandItem in historyData"
                @click="openSeriesSection(brandItem)"
                :key="brandItem.code"
                :class="['card-item', {'card-item-selected': selectedBrands.filter(selectedBrandItem => selectedBrandItem.code === brandItem.code).length > 0}]">
                    <img class="card-item-image" :src="brandItem.image">
                    <span class="card-item-span">{{brandItem.name}}</span>
                </div>
            </div>
        </som-selector-item> -->
      </som-car-picker>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    wc(data){
      console.log('完成选择')
      console.log(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello{
    width: 100%;
    height: 100px;
    .name{
      width: 16rem;
      background: #999
    }
  }
</style>

