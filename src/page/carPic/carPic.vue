<template>
    <div>
        <som-nav-bar @on-left-click="goBack" class="NavBar">选择品牌车型</som-nav-bar>
        <div class="car">
            <som-car-picker :scene='3'  :showUnlimitBrand='false' :showUnlimitSeries='false' :showUnlimitModel='false' @onSelected="complete"
                 ref="carPicker"
                 @onSelectedBrand="onSelectedBrand"
                 :brandDataUrl="brandDataUrl"
                :seriesDataUrl="seriesDataUrl"
                :modelDataUrl="modelDataUrl"
            >
                <som-selector-item title="我的历史" index="历">
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
                </som-selector-item>
            </som-car-picker>
        </div>
        
    </div>
</template>
<script>
import {env} from '@/config/env'
import {getStore,setStore} from '@/config/Utilts'
export default {
    name:'carPic',
    data(){
        return{
             historyData: [],//历史
            selectedBrands: [],
            brandDataUrl:env.SERVER_URL.baseUrl+'apmtMstrJson/listBrandOrSeriesOrVehicleOrModel.json?type=1',
            seriesDataUrl:env.SERVER_URL.baseUrl+'apmtMstrJson/listBrandOrSeriesOrVehicleOrModel.json?type=2&code=',
            modelDataUrl:env.SERVER_URL.baseUrl+'apmtMstrJson/listBrandOrSeriesOrVehicleOrModel.json?type=3&code=',
        }
    },
    methods:{
        // 历史点击事件
         openSeriesSection(brandItem) {
            this.$refs.carPicker.openSeriesSection(brandItem);
        },
        // 品牌变化变色
        onSelectedBrand(data) {
            this.selectedBrands = data;
        },
        // 导航返回事件
        goBack(){
            this.$router.push({path:'/'})
        },
        //品牌车型选择完成事件
        complete(e){
            let  history =this.historyData.filter(item=>
                item.code == e.brand.code
            )
            if(!history.length){
                this.historyData.push({
                    code:e.brand.code,
                    name:e.brand.name,
                    image:e.brand.image
                })
            }
            setStore('historyData',JSON.stringify(this.historyData))
            this.$root.FormStort = {...this.$root.FormStort,
            carBrandName:e.brand.name,
            carSeriesName:e.series.name,
            carModelName:e.model.name,
            carBrandId:e.brand.code,
            carSeriesId:e.series.code,
            carModelId:e.model.code,
            }
            this.$router.push({path:'/'})
        }
    },
    mounted(){
        if(getStore('historyData')){
            this.historyData = JSON.parse(getStore('historyData'))
        }
    }
}
</script>

<style lang="scss" scoped>
    .NavBar{
        height: 8vh;
    }
    .car{
        height: 92vh;
        position: relative;
    }
//     .car-picker-demo-wrapper{
//     position: relative;
//     height: 100vh;
// }
.picker-content{
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 0;
}
.selector-item-body-custom {
    padding: 16px;
}
    .card-item{
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 48px;
}
.card-item-span{
    font-size: 12px;
    margin-top: 10px;
    color: #1A1A1A;
}
.car-picker-demo-select-group {
    padding: 12px;
}
.card-item-image{
    width: 32px;
}
.card-item-selected .card-item-span {
    color: #FF571A;
}
</style>
