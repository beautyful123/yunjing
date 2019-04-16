<template>
    <!-- 预约详情界面 -->
    <div class="detailsCopy">
        <som-nav-bar  right-text="联系门店" class="NavBar" @on-right-click="contact" @on-left-click='goback'>养修预约</som-nav-bar>
        <!-- 主体 -->
        <div class="statusBoby">
        <div class="status">
            <h3>{{data.statusName}}</h3>
            <span v-if="data.statusName==='预约成功'">下单成功,请耐心等待门店确认预约</span>
            <span v-else-if="data.statusName==='预约失败'">抱歉,暂时无法提供线上预约,请联系门店预约</span>
        </div>
        <div class="shop">
            <div class="left">
                <div class="orgName">{{data.orgName}}</div>
                <div class="orgAddress">{{data.orgAddress}}</div>
                <div class="orgAddress">{{data.orgPhone}}</div>
            </div>
            <div class="right" @click="Navigation">
                <som-icon name="address" class="ico"></som-icon>
                <!-- <img src="https://assets.souche.com/projects/som-ui/4.0.6-rc.1/www/3be0d966eafce5a63a59b9d815f54d69.png"/> -->
                <span>导航</span>
            </div>
        </div>
        <div class="invoice">
            <div>
                <div class="left">车牌号</div>
                <div class="right">{{data.carPlateNo}}</div>
            </div>
            <div>
                <div class="left">联系人</div>
                <div class="right">{{data.linkman}}</div>
            </div>
            <div>
                <div class="left">预约到店时间</div>
                <div class="right">{{tiem(data.arriveDate,data.arriveTime)}}</div>
            </div>
            <div>
                <div class="left">手机号</div>
                <div class="right">{{data.mobile}}</div>
            </div>
            <div>
                <div class="left">下单时间</div>
                <div class="right">{{data.createDate}}</div>
            </div>
        </div>
        </div>
        <!-- 底部按钮 -->
        <div class="bottomBtn" v-if="data.statusName==='预约成功'?true:data.statusName==='待确认'?true:data.statusName==='已确认'?true:false">
            <som-button-group>
                <!-- <som-button plain  type="primary" radius="22" class="Btn" @click="modify">修改预约</som-button> -->
                <som-button type="primary" radius="22" class="Btn" @click="cancel">取消预约</som-button>
            </som-button-group>
        </div>
    </div>
</template>
<script>
import {getApmtMstrDetail} from "@/config/getData";
export default {
    name:'detailsCopy',
    data(){
        return{
            data:{
                statusName:'',
                orgName:'',
                orgAddress:'',
                orgPhone:'',
                carPlateNo:'',
                linkman:'',
                arriveDate:'',
                arriveTime:'',
                mobile:''
            }
            
        }
    },
    filters:{
        
    },
    mounted(){
        if(this.$route.query.type=='1'){
            getApmtMstrDetail({
                id:this.$route.query.id
            }).then(res=>{
                this.data={...res.data}
            })
        }else{
            this.data=this.$route.query.data
        }
    },
    methods:{
         tiem(arriveDate,arriveTime){
            return this.$moment(arriveDate).format('YYYY/MM/DD')+' '+arriveTime;
        },
        // 取消预约
        cancel(){
            // 取消跳转取消页面 传id
            this.$router.push({ name: "Cancel",params:{id:this.data.id} });
        },
        // 拨打电话
        contact(){
            window.location.href = "tel:"+this.data.orgPhone;
        },
        // 导航
        Navigation(){
            let ainformation = navigator.userAgent;
            // 判断系统   
            if(ainformation.indexOf('Android') > -1 || ainformation.indexOf('Adr') > -1){
                // 安卓系统   打开高德地图
                window.location.href = 'androidamap://navi?sourceApplication=appname&poiname=fangheng&lat='+this.data.latitude+'&lon='+this.data.longitude+'&dev=1&style=2'
                // 无法判断是否安装   使用定时器  判断3秒后当前页面是否显示 显示则判断为未安装  跳转至安装界面
                setTimeout(function(){
                    if(document.visibilityState == "visible"){
                         window.location.href = 'http://wap.amap.com/'
                    }
                },3000)
            }else if(!!ainformation.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
                window.location.href = 'iosamap://navi?sourceApplication=applicationName&poiname=fangheng&poiid=BGVIS&lat='+this.data.latitude+'&lon='+this.data.longitude+'&dev=1&style=2'
                setTimeout(function(){
                    if(document.visibilityState == "visible"){
                        window.location.href = 'http://wap.amap.com/'
                    }
                },3000)
            }
        },
        // 返回
        goback(){
            this.$router.back(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.detailsCopy{
    .Btn{
        height: 1.8rem;
        font-size: 0.7rem;
    }
    .NavBar{
      color: #666
    }
    .statusBoby{
        .status{
        margin-bottom: 0.5rem;
        height: 3.5rem;
        background: #fff;
        padding-left: 0.5rem;
        box-sizing: border-box;
        h3{
            font-size: 0.8rem;
            color: #FF571A;
        }
        span{
            font-size: 0.6rem;
            color: #adabab;
        }
    }
    .shop{
        border-bottom: 1px solid #adabab;
        height: 4.5rem;
        background: #fff;
        padding: 0.6rem;
        box-sizing: border-box;
        .left{
            display: inline-block;
            width: 11rem;
            height: 3rem;
            .orgName{
                font-size: 0.8rem;
                line-height: 1rem;
                height: 2rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .orgAddress{
                font-size: 0.6rem;
                color: #adabab;
                height: 0.8rem;
                line-height: 0.8rem;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap
            }
        }
        .right{
            box-sizing: border-box;
            display: inline-block;
            width: 3.5rem;
            border-left: 1px solid #b1b1b1;
            height: 3rem;
            vertical-align: top;
            line-height: 3rem;
            padding-left: 0.8rem;
            img{
                width: 0.6rem;
            }
            .ico{
                font-size: 0.6rem;
            }
            span{
                font-size: 0.6rem;
            }
        }
    }
    .invoice{
        height: 9rem;
        background: #fff;
        padding: 0.6rem;
        box-sizing: border-box;
        >div{
            height: 1.56rem;
            .left{
            display: inline-block;
            font-size: 0.7rem;
            width: 5rem;
            }
             .right{
            width: 9rem;
            display: inline-block;
            font-size: 0.7rem;
            }
        }
    }
    }
    .bottomBtn{
        height: 2.4rem;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
</style>
