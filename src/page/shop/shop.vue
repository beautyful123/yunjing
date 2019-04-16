<template>
<!-- 门店选择 -->
    <div class="subject">
        <som-nav-bar  right-text="选择城市" class="NavBar" @on-left-click="goBack" @on-right-click="goCity">门店选择</som-nav-bar>
        <!-- 门店列表 -->
         <!-- :pull-down="onRefresh" -->
        <som-scroll-refresh 
            ref="scrollRefresh" 
            :pull-up="loadMore"
            :bottom-distance="100"
            >
            <som-list>
                <div class="list">
                    <div v-for="(item,index) in list" :key="index" class="listdetails" @click="Choiceorg(item)">
                        <div class="left">
                            <div class="orgName">{{item.orgName}}</div>
                            <div class="orgAddress">{{item.orgAddress}}</div>
                            <div class="orgAddress">距您{{item.distance|distancefilter}}km</div>
                        </div>
                        <div class="right" v-if="show===item.orgId">
                            <som-icon name="check"></som-icon>
                        </div>
                    </div>
                </div>
            </som-list>
        </som-scroll-refresh>
    </div>
</template>
<script>
import {pageApmtStore} from '@/config/getData'
export default {
  name: 'bespeak',
  data(){
      return{
          show:"",
          page:1,
          list:[]
      }
  },
  filters: {
      distancefilter(value){
          return (value/1000).toFixed(1)
      }
},
  methods:{
      loadMore(e){
          this.query(e)
      },
      goBack(){
            // this.$router.back(-1)
             this.$router.push({path:'/'})
      },
      goCity(){
          this.$router.push({path:'/CityPicker'})
      },
      Choiceorg(item){
          this.$root.FormStort={
              ...this.$root.FormStort,
              orgId:item.orgId,
              orgName:item.orgName,
              orgAddress:item.orgAddress,
              orgPhone:item.orgPhone,
              distance:item.distance,
          }
          this.$router.push({path:'/'})
      },
     //查询
     query(e){
         let data = {
             longitude:this.$root.FormStort.lng,
             latitude:this.$root.FormStort.lat,
             page:this.page,
             pageSize:10,
             provinceName:this.$root.FormStort.province,
             cityName:this.$root.FormStort.city
         }
        pageApmtStore(data).then(res=>{
            if(res.msg){
                if(res.data.length){
                    let list = this.list
                    // 去除带过来默认门店
                    let listcopy = res.data.filter(item=>item.orgId!=this.show)
                    this.list = list.concat(listcopy);
                    this.page++
                    e.loaded();
                }
                if(res.data.length<10){
                    e.completed();
                }
            }
        })
     }   
  },
  mounted(){
    // 判断数据是否存在
    if(this.$root.FormStort.orgId){
        this.show=this.$root.FormStort.orgId
        this.list.push({
            orgId:this.$root.FormStort.orgId,
            orgName:this.$root.FormStort.orgName,
            orgAddress:this.$root.FormStort.orgAddress,
            orgPhone:this.$root.FormStort.orgPhone,
            distance:this.$root.FormStort.distance,
        })
    }
  },

}
</script>
<style lang="scss" scoped>
  .subject{
    .NavBar{
      color: #666;
      position: relative;
    }
    .list{        
        padding-top: 0.5rem;
        // overflow-y: scroll;
        .listdetails{
            border-bottom: 1px solid rgb(179, 177, 177);
            background: #fff;
            .left{
                display: inline-block;
                width: 12rem;
                padding: 0.3rem;
                box-sizing: border-box;
                height: 4rem;
                .orgName{
                    font-size: 0.8rem;
                    line-height: 1.4rem;
                }
                .orgAddress{
                    font-size: 0.6rem;
                    color: rgb(148, 148, 148);
                    line-height: 1rem;
                }
            }
            .right{
                display: inline-block;
                width: 3rem;
                height: 4rem;
                vertical-align: top;
                line-height: 4rem;
                text-align: center;
                color: #FF571A
            }
        }
    }
    .loading{
        text-align: center;
        font-size: 0.8rem;
        line-height: 1.5rem;
        color: #FF571A;
    }
  }
</style>
