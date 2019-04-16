<template>
    <div>
        <som-nav-bar  class="NavBar"  @on-left-click="goback">选择城市</som-nav-bar>
        <div class="picker-content">
            <som-city-picker
            :scene="2"
            :showAll="false"
            :showUnlimitCity="false"
            @onSelected="selected"
            ></som-city-picker>
        </div>
    </div>
</template>
<script>
export default {
    name:'CityPicker',
    methods:{
        selected(data) {
            this.$root.FormStort.province=data.province.name
            this.$root.FormStort.city=data.city?data.city.name:data.province.name
             this.$router.push({path:'/Shop'})
        },
        goback(){
            this.$router.back(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
    .picker-content{
        height: 92vh;
        position: relative;
    }
    .NavBar{
        height: 8vh;
         color: #666
    }
</style>
