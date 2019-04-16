<template>
  <div class="subject">
    <som-nav-bar class="NavBar" @on-left-click="goback">预约记录</som-nav-bar>
    <div class="bgc" v-for="(item) in list" :key="item.id">
      <div class="clearfix border">
        <span class="fl">{{item.createDate}}</span>
        <span
          class="fr"
          :class="item.statusName==='待确认'?'color':item.statusName==='已确认'?'color':''"
        >{{item.statusName}}</span>
      </div>
      <div class="pading_left" @click="godetails(item)">
        <div class="fontOne">
          车牌:
          <span class="mL">{{item.carPlateNo}}</span>
        </div>
        <div class="fontThree">
          预约到店时间:
          <span class="mL">{{tiem(item)}}</span>
        </div>
        <div class="fontTwo">
          预约门店:
          <span class="mL">{{item.orgName}}</span>
        </div>
      </div>
      <div class="pr clearfix" v-if="item.statusName==='待确认'|item.statusName==='已确认'">
        <span class="raios lose" @click="appointment(item.id)">取消预约</span>
        <!-- 修改预约已取消 -->
        <!-- <span class='raios mr'>修改预约</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { listApmtMstr } from "@/config/getData";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    appointment(id) {
      // 取消跳转取消页面
      // console.log(id)
      this.$router.push({ name: "Cancel",params:{
        id
      }});
    },
    //跳转详情
    godetails(item) {
      // 传id
      this.$router.push({ path: "/details",query:{
        id:item.id,
        type:1,//type确定是预约跳转还是列表跳转
      }});
    },
    // 返回
    goback() {
      // this.$router.back(-1);
      this.$router.push({path:'/'})
    },
    tiem(item){
      return this.$moment(item.arriveDate).format('YYYY/MM/DD')+' '+item.arriveTime;
    }
  },

  mounted() {
    listApmtMstr().then(res => {
      this.list = res.data;
    });
  }
};
</script>

<style lang='scss' scoped>
.subject {
  background: #e3e1e1;
  .NavBar {
    color: #666;
  }
  .bgc {
    background-color: #fff;
    width: 100%;
    margin-top: 0.21rem;
    .border {
      border-bottom: 1px solid #e3e1e1;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 0.7rem;
      padding-left: 0.8rem;
      padding-right: 0.8rem;
      .color {
        color: #ff571a;
      }
    }
    .pading_left {
      height: 4rem;
      margin-left: 0.8rem;
      padding-top: 0.6rem;
      .fontOne {
        font-size: 0.7rem;
        height: 1.2rem;
        line-height: 1.2rem;
      }
      .fontThree{
        font-size: 0.6rem;
        height: rem;
        line-height: 1rem;
        font-weight: 300;
      }
      .fontTwo {
        font-size: 0.6rem;
        height: 2rem;
        line-height: 1rem;
        font-weight: 300;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .pr {
      margin-left: 0.8rem;
      border-top: 1px solid #e3e1e1;
      height: 1.9rem;
      .raios {
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        float: right;
        width: 3rem;
        height: 1.3rem;
        border: 1px solid #ff571a;
        border-radius: 0.8rem;
        text-align: center;
        line-height: 1.3rem;
        color: #ff571a;
        font-size: 0.6rem;
      }
      .lose {
        background-color: #ff571a;
        color: #fff;
        margin-right: 0.8rem;
      }
      .mr {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
