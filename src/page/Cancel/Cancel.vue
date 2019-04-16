<template>
<div>
    <som-nav-bar  class="NavBar" @on-left-click='goback'>取消预约</som-nav-bar>
    <div class="CancelBoby">
        <h3>请选择取消预约的原因</h3>
        <som-list>
            <som-radio :options="value" mode="icon" @on-change="ChangeValue" v-model="valueCopy">
                <template slot-scope="props" slot="each-item">
                    <div :class="props.selected ? 'select-label-style' : ''">{{ props.label}}</div>
                </template>
            </som-radio>
            <som-textarea max=100 v-if="show" v-model="Remarks" placeholder="还有什么想说的都可以告诉我们哦" class='text'></som-textarea>
        </som-list>
    </div>
    <!-- 底部按钮 -->
    <div class="bottomBtn">
        <som-button-group>
            <som-button type="primary" radius="22" class="Btn" @click="cancel" :loading="btnloading">提交</som-button>
        </som-button-group>
    </div>
    <!-- 取消失败 -->
    <som-toast v-model="showcopy" :text="toastConent"/>
</div>
</template>
<script>
import {updateApmtMstrByCancel} from "@/config/getData";
export default {
    data(){
        return{
            value: [ '改变预约时间', '经销商无法提供服务', '其他原因' ],
            valueCopy:'',
            show:false,
            Remarks:'',//备注
            toastConent:"",
            showcopy:false,
            btnloading:false
        }
    },
    methods:{
        // 选择改变事件
        ChangeValue(e){
           if(e==='其他原因'){
               this.show=true
           }else{
               this.show=false
                this.Remarks = '' //清空备注
           }
        },
        // 提交
        cancel(){
            if(!this.valueCopy){
                this.btnloading=false
                this.showcopy=true
                this.toastConent="请选择取消原因"
                return
            }
            if(this.valueCopy==='其他原因'&&this.Remarks===''){
                this.btnloading=false
                this.showcopy=true
                this.toastConent="请输入备注"
                return
            }
            // this.showcopy = this.valueCopy==='其他原因'?this.Remarks?false:true:false
            this.btnloading=true
            updateApmtMstrByCancel({
                id:this.$route.params.id,
                cancelReason:this.valueCopy,
                cancelRemark:this.Remarks?this.Remarks:''
            }).then(res=>{
                this.btnloading=false
                if(res.success){
                    this.$router.push({path:"/AppointmentRecord"})
                }else{
                    this.showcopy=true
                    this.toastConent=res.msg
                }
            })
        },
        // 返回
        goback(){
            this.$router.back(-1)
        }
        
    },
}
</script>
<style lang="scss" scoped>
    .NavBar{
       color: #666
    }
    .CancelBoby{
        h3{
            font-size: 0.7rem;
            font-weight: normal;
            line-height: 1.5rem;
            color: #666;
            padding-left: 0.5rem;
            box-sizing: border-box;
        }
    }
    .bottomBtn{
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .som-button-group{
        background: #e3e1e1;
    }
</style>
