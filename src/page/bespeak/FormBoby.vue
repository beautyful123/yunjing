<template>
    <div class="FormBoby">
        <!-- 门店 -->
        <div class="org">
            <div class="left">门店</div>
            <div class="right" @click="ChoiceorgName">
                <span class="rightDiv">
                    <span v-if="data.orgName">
                    <span class="top">{{data.orgName}}</span>
                    <span class="bottom">{{data.orgAddress}}</span>
                    </span>
                     <span v-else class="Choice">请选择门店</span>
                </span>
                <som-icon name="arrow-right" class="icon"></som-icon>
            </div>
        </div>
        <!-- 预约项目 -->
        <div class="Repair">
            <div class="left">预约项目</div>
            <div class="right" @click="ChoiceRepair">
                <span v-if="data.Repair">{{RepairComputed}}</span>
                <span v-else class="Choice">请选择预约项目</span>
                <som-icon name="arrow-right" class="icon"></som-icon>
            </div>
        </div>
        <!-- 日期 -->
        <div class="arriveTime">
            <div class="left">预约到店日期</div>
            <div class="right" @click="arriveDateShow()">
                <span v-if="data.arriveDate">{{data.arriveDate}}</span>
                <span v-else class="Choice">请选择日期</span>
                <som-icon name="arrow-right" class="icon"></som-icon>
            </div>
        </div>
        <!-- 时间 -->
        <div class="arriveTime">
            <div class="left">预约到店时间</div>
            <div class="right" @click="arriveTimeShow()">
                <span v-if="data.arriveTime">{{data.arriveTime}}</span>
                <span v-else class="Choice">请选择时间</span>
                <som-icon name="arrow-right" class="icon"></som-icon>
            </div>
        </div>
        <!-- 车型 -->
        <div class="carModel" @click="ChoiceCarModel">
            <div class="left">车型</div>
            <div class="right">
                <span v-if="data.carModelName">{{data.carModelName}}</span>
                <span v-else class="Choice">请选择车型</span>
                <som-icon name="arrow-right" class="icon"></som-icon>
            </div>
        </div>
        <!-- 车牌 -->
        <div class="carPlate">
            <div class="left">车牌</div>
            <div class="center" @click="CarShowEvent">
                <span v-if="data.carprefix">{{data.carprefix}}</span>
                <span v-else class="Choice">请填写</span>
                <som-icon name="arrow-up"/>
            </div>
            <div class="right">
                <input maxlength="7"  v-model="data.carPlateNo" placeholder="请填写" @input="inputKeyUp"/>
                <!-- onKeyUp="value=value.replace(/[\W]/g,'')" -->
            </div>
        </div>
        <!-- 联系人 -->
        <div class="linkman">
            <div class="left">联系人</div>
            <div class="center">
                <input v-model="data.linkman" placeholder="请填写" >
            </div>
            <div class="right">
                    <som-radio
                        class="IptR"
                        :options="value"
                        v-model="data.sexName">
                    </som-radio>
            </div>
        </div>
        <!-- 手机号 -->
        <div class="mobile">
            <div class="left">手机号</div>
            <div class="right">
                <input  type="number" oninput="if(value.length>11)value=value.slice(0,11)" v-model="data.mobile" placeholder="请填写"/>
            </div>
        </div>
        <!-- 按钮 -->
        <som-button radius="22" class="btn" :loading="loading" @click="confirmBespeak">确认预约</som-button>

        <!-- 日期选择弹出 -->
        <som-popup v-model="DateShow" height="12rem" >
            <div>
                <som-date-picker
                type="date"
                v-model="beginDate"
                :default-date="beginDate"
                @on-confirm="dateConfirm"
                @on-cancel = "dateCancel"
                :min-date="minDate"
                :max-date="maxDate"
                >
                </som-date-picker>
            </div>
        </som-popup>
        <!-- 时间选择 -->
        <som-popup v-model="TimeShow" heught="12rem">
            <som-time-picker
                v-model="beginTime"
                :min-hour="8"
                :max-hour="17"
                :minute-step="10"
                @on-confirm="arriveTimeconfirm"
                @on-cancel="arriveTimecancel"
                >
            </som-time-picker>
        </som-popup>
        <!-- 车牌选择弹出 -->
        <som-popup v-model="carShow" height="10.3rem" is-transparent>
            <CarNumer @pfn="updata" :car="this.data.carprefix"/>
        </som-popup>
        <!--预约项目弹出 -->
        <som-popup v-model="RepairShow" height="12rem" class="Rpopup">
            <som-checkbox required :options="commonList" v-model="data.Repair" ></som-checkbox>
        </som-popup>
        <!-- 地图定位隐藏 -->
        <div id='container' style="display:none"></div>
        <!-- 获取定位失败提示框 -->
        <som-modal
            is-confirm
            v-model="show"
            :close-on-confirm="false"
            title="请开启当前定位获取附近服务门店"
            @on-confirm="confirm"
            >
            <!-- :content="content"
            @on-confirm="onConfirm4" -->
        </som-modal>
        <!-- 获取定位时全屏等待 -->
        <som-popup v-model="wholeShow" class="whole">
            <div> 
                <som-icon name="loading"></som-icon>
                <span>正在获取位置</span>
            </div>
        </som-popup>
        <som-toast v-model="showToast" :text="toastContent"></som-toast>
    </div>
</template>
<script>
import CarNumer from '../carNumber/CarNumber'
import {insertOrUpdateApmtMstr,getApmtMstrInfo,listApmtPrebook} from '@/config/getData'
export default {
  name: 'FormBoby',
  data () {
      return {
          commonList:[],//预约项目多选
          commonListCopy:[],//预约项目列表 prebookType   prebookCode
          showToast:false,//提示显示
          toastContent:'',//提示内容
          wholeShow:false,//全屏等待
          minDate:'',//最小可选日期
          maxDate:'',//最大可选日期
          beginDate:'',//默认日期
          beginTime:'',//默认时间
          interval:10,//时间间隔
          DateShow:false,//日期选择器显示
          TimeShow:false,//时间选择器显示
          carShow:false,//车牌控件显示
          RepairShow:false,//预约项目显示
          loading:false,//提交按钮
          longitude:'',//经纬度
          show:false,//定位失败弹窗
          data:{   
                //   id:'',//主键id
                  orgId:'',//门店id
                  orgName:'',//门店名称
                  orgAddress:'',//预约门店地址
                  orgPhone:'',//预约店面电话
                  distance:'',//店铺距离
                  arriveDate:'',//预约到店日期
                  arriveTime:'',//预约到店时间
                  vin:'',//vin码
                  carprefix:'',
                  carPlateNo:'',//车牌号   车牌号需要截取   京  且判断车牌除京外   6或7位
                  carBrandId:'',//品牌id
                  carBrandName:'',//品牌名称
                  carSeriesId:'',//车系id
                  carSeriesName:'',//车系名称
                  carModelId:'',//车型id
                  carModelName:'',//车型名称
                //   isNewEnergy:'',//是否新能源汽车1：是；0：否  更改为车牌号判断    不需要传
                  linkman:'',//联系人
                //   sexId:'',//性别id  不需要传
                //   sexCode:'',//性别编码
                  sexName:'先生',//性别名称
                  mobile:'',//联系方式
                //   uuid:'',//用户主键
                  Repair:[],//预约项目  默认保养
                  province:'',//省
                  city:'',//市
                  lng:"",//经度
                  lat:'',//纬度
              },
            value: [ {
                key:'先生',
                id: 'aa11673cb1a74eabab3562ce029460af',
                value: '先生',
                code:'10150000'
            }, {
                key:'女士',
                id: 'd58a620302fe464f91c268a9b99f9207',
                value: '女士',
                code:'10150005'
            }],

      }
  },
  components:{
    CarNumer
  },
  methods:{
    // 日期选择
    arriveDateShow(){
        this.$set(this,'DateShow',true)
        // this.timeBegin()
    },
    // 日期确定
    dateConfirm(e){
        this.data.arriveDate = this.$moment(this.beginDate).format('YYYY/MM/DD')
        this.DateShow = false
    },
    // 日期取消
    dateCancel(){
        this.DateShow = false
        //因为sou-ui的日期控件在日期发生改变时  就把对应的v-model绑定的值进行改变   所有 取消时候要变回原本日期
       let data = this.timeConversion(this.data.arriveDate)
       this.beginDate = new Date(data[0],data[1]-1,data[2])
    },
    // 默认时间设置
    timeBegin(){
        let data = new Date().getTime()//获取时间
        let newData =  this.timeConversion(this.$moment(data).format('YYYY/MM/DD') )//获取现在的日期 设置最小可选日期
        let Futuredata =this.timeConversion(this.$moment(data+ 86400000*7).format('YYYY/MM/DD')) //七天以后的时间 设置最大可选日期
        this.minDate = new Date(newData[0],newData[1]-1,newData[2])
        this.maxDate = new Date(Futuredata[0],Futuredata[1]-1,Futuredata[2])
        
        // 获取当前小时 判断当天还是明天
        let hour = this.$moment(data).format('HH')
        // 获取当前分钟
        let Minute = this.$moment(data).format('mm') 
        // 需求以13点为界限   
        if(hour<13){
            this.beginDate = new Date(newData[0],newData[1]-1,newData[2])
            let time = parseInt(Minute/10)
            this.beginTime = hour-(-2)+':'+ time+'0'
        }else{
            // 获取一天后的时间
            let begin = this.timeConversion(this.$moment(data+86400000).format('YYYY/MM/DD'))
            // 日期选择控件绑定日期 
            this.beginDate = new Date(begin[0],begin[1]-1,begin[2])
            this.beginTime = "08:00"
        }   

    },
    // 时间选择 
      arriveTimeShow(){
        this.$set(this,'TimeShow',!this.TimeShow)
        // this.timeBegin()
      },
    // 时间取消事件
    arriveTimecancel(){
       this.$set(this,'TimeShow',!this.TimeShow)
    },
    //时间确认事件
    arriveTimeconfirm(e){
        this.$set(this,'TimeShow',!this.TimeShow)
        this.data.arriveTime = e
    },
      //时间切割处理
      timeConversion(StringTime){
          let data = StringTime.split("/")
          return data
      }, 
    //车牌前缀更改事件
    updata(value){
        this.data.carprefix=value
    },
    //用户点击车牌前缀
    CarShowEvent(){
        this.carShow=true
    },
    // 获取定位
    position(){
        let than = this
        let mapObj = new AMap.Map('container')
        mapObj.plugin('AMap.Geolocation', function() {
              let geolocation = new AMap.Geolocation({
                    timeout: 10000,
                })
                mapObj.addControl(geolocation)
                geolocation.getCurrentPosition(function(status,result){
                    if(status=='complete'){
                        than.longitude = result.position //获取到经纬度
                        than.regeoCode()  //调取经纬度转城市
                    }
                    else{
                        than.show=true //定位失败弹窗显示
                        than.wholeShow=false //正在定位隐藏

                        // 本地测试  电脑获取定位失败  
                        // than.longitude=('121.349195,31.224542')
                        // than.regeoCode()
                    }
                })
        })
    },
    //经纬度转地址
    regeoCode() {
        let than = this
        let map = new AMap.Map("container", {
            resizeEnable: true
        })
        let geocoder=''
        let marker =''
        if(!geocoder){
            geocoder = new AMap.Geocoder({
                city: "010", //城市设为北京，默认：“全国”
                radius: 1000 //范围，默认：500
            })
        }
    
        let a = this.longitude+''
        // let a = e
        var lnglat  = a.split(',')
         if(!marker){
            marker = new AMap.Marker()
            map.add(marker)
        }
        marker.setPosition(lnglat)
        geocoder.getAddress(lnglat, function(status, result) {
            if (status === 'complete'&&result.regeocode) {
                than.data.lng = result.regeocode.addressComponent.businessAreas[0].location.lng  //经度
                than.data.lat = result.regeocode.addressComponent.businessAreas[0].location.lat  //纬度
               
                than.data.province = result.regeocode.addressComponent.province //省
                //市   判断市是否存在   不存在取省 例如 上海
                than.data.city=result.regeocode.addressComponent.city?result.regeocode.addressComponent.city:result.regeocode.addressComponent.province 
                than.wholeShow = false
                than.getApmtMstrInfo()  //获取初始数据
            }else{
                // 经纬度转城市失败
                than.wholeShow=false
            }
        })
    },
    //门店选择
    ChoiceorgName(){
        if(this.datablank(this.data.lng,'获取定位失败,无法提供服务')){
            return
        }
        this.$root.FormStort = this.data
        this.$router.push({ path:'/Shop'})
    },
    // 车型选择
    ChoiceCarModel(){
        this.$root.FormStort = this.data
        this.$router.push({path:'/carPic'})
    },
    //车牌限定 字母大写  不允许汉字
    inputKeyUp(){
        this.data.carPlateNo = this.data.carPlateNo.toUpperCase().replace(/[\W]/g,'')
    },
    //确认预约
    confirmBespeak(){
         if(this.datablank(this.data.orgName,'请选择门店')){
           return
       }
       if(this.datablank(this.data.Repair,'请选择预约项目')){
           return
       }
       if(this.datablank(this.data.carModelId,'请选择车型')){
           return
       }
       if(this.datablank(this.data.carprefix,'请选择车牌前缀')){
           return
       }
       if(this.datablank(this.data.carPlateNo,'请输入车牌号')){
           return
       }
       if(this.datablank(this.data.linkman,'请输入联系人')){
           return
       }
       if(this.datablank(this.data.mobile,'请输入手机号')){
           return
       }
        this.loading = true
        // 数据处理
       let data = this.value.filter(item=>item.value===this.data.sexName)
       let prebookCode = []
    //    获取已选中的预约项目code值
       for(let i = 0;i<this.data.Repair.length;i++){
           for(let j = 0;j<this.commonListCopy.length;j++){
               if(this.data.Repair[i]===this.commonListCopy[j].prebookType){
                   prebookCode.push(this.commonListCopy[j].prebookCode)
               }
           }
       }
      
        insertOrUpdateApmtMstr({
            orgId:this.data.orgId,
            orgName:this.data.orgName,
            orgAddress:this.data.orgAddress,
            orgPhone:this.data.orgPhone,
            arriveDate:this.data.arriveDate,
            arriveTime:this.data.arriveTime,
            vin:this.data.vin,
            carPlateNo:this.data.carprefix+this.data.carPlateNo,
            carBrandId:this.data.carBrandId,
            carBrandName:this.data.carBrandName,
            carSeriesId:this.data.carSeriesId,
            carSeriesName:this.data.carSeriesName,
            carModelId:this.data.carModelId,
            carModelName:this.data.carModelName,
            linkman:this.data.linkman,
            mobile:this.data.mobile,
            sexId:data[0].id,
            sexCode:data[0].code,
            sexName:data[0].value,
            prebookType:this.data.Repair.join(','),
            prebookCode:prebookCode.join(',')
        }).then(res=>{
            this.loading=false
            if(res.success){
                this.$root.FormStort={
                    lng:this.data.lng,
                    lat:this.data.lat,
                    city:this.data.city,
                    province:this.data.province
                }
                this.$router.push({path:'/details',query:{
                    data:res.data,
                    type:2,//从预约跳转详情标识
                }})
            }else{
                this.showToast=true
                this.toastContent=res.msg
            }
        })
    },
    // 为空判断
    datablank(data,title){
        if(!data){
            // console.log(title)
            this.toastContent=title,
            this.showToast=true
            return true
        }
        return false
    },
    //预约项目修改
    ChoiceRepair(){
        this.RepairShow = true
    },
    // 获取初始数据
    getApmtMstrInfo(){
        let data={
            "provinceName": this.data.province,
            "cityName": this.data.city,
            "longitude":this.data.lng,
            "latitude": this.data.lat
        }
        getApmtMstrInfo(data).then(res=>{
            if(res.success){
                this.data.orgId = res.data.orgId
                this.data.orgAddress = res.data.orgAddress
                this.data.orgName=res.data.orgName
                this.data.orgPhone=res.data.orgPhone
                this.data.carBrandId=res.data.carBrandId
                this.data.carBrandName=res.data.carBrandName
                this.data.carSeriesId=res.data.carSeriesId
                this.data.carSeriesName=res.data.carSeriesName
                this.data.carModelId=res.data.carModelId
                this.data.carModelName=res.data.carModelName
                this.data.vin = res.data.vin
                this.data.distance=res.data.distance
                // alert(res.data.distance)
                if(res.data.carPlateNo){
                    this.data.carprefix = res.data.carPlateNo.substring(0,1)
                    this.data.carPlateNo = res.data.carPlateNo.substring(1)
                }
                this.listApmtPrebook()
            }
        })
    },
    // 定位失败取消
    confirm(){
        // 志平也不知道干啥   就暂时隐藏 获取云镜位置未提供
        this.show=false
    },
    // 获取预约项目
    listApmtPrebook(){
        listApmtPrebook({
            shopCode:this.data.orgId
        }).then(res=>{
            for(let i=0;i<res.data.length;i++){
                this.commonListCopy.push({
                    prebookType:res.data[i].itemName,
                    prebookCode:res.data[i].itemCode
                })
                if(res.data[i].itemName==='保养'){
                    this.data.Repair=['保养']
                }
                this.commonList.push(res.data[i].itemName)
            }
        })
    }

  },
  computed:{
      //获取预约项目
      RepairComputed(){
          return this.data.Repair.join(',')
      },
  },
  created(){
        this.timeBegin()
        // 判断定位是否存在
        let arr =Object.keys(this.$root.FormStort)
        if(!arr.length){
            this.wholeShow = true
             this.position()
        }else{
             this.data = {...this.data,...this.$root.FormStort}
            //  门店是否存在 
             if(!this.data.orgId){
                //  初始不存在  调用查询  获取初始门店
                 this.getApmtMstrInfo()
             }else{
                //  门店已选择 查询对应的门店信息
                 this.listApmtPrebook()
             }
        }
        this.data.arriveDate = this.$moment(this.beginDate).format('YYYY/MM/DD')
        this.data.arriveTime = this.beginTime
  },
  mounted(){
    // 预留云镜id获取
  }
}
</script>
<style lang="scss" scoped>
    @import '../../style/FormBoby'
</style>
