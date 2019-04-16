import Vue from 'vue'
import Router from 'vue-router'
// 导组件 配路由
import Bespeak from '@/page/bespeak/bespeak'//预约
import AppointmentRecord from '@/page/appointmentRecord/AppointmentRecord'//详情
import CarPic from '@/page/carPic/carPic'//选择车型品牌
import details from '@/page/details/details' //预约详情
import Shop from '@/page/shop/shop'//门店选择
import CityPicker from '@/page/CityPicker/CityPicker' //城市选择
import Cancel from '@/page/Cancel/Cancel' //取消预约


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bespeak',
      component: Bespeak
    },
    {
      path: '/appointmentRecord',
      name: 'AppointmentRecord',
      component: AppointmentRecord
    },
    {
      path: '/CarPic',
      name: 'CarPic',
      component:CarPic
    },
    {
      path:'/details',
      name:'details',
      component:details
    },
    {
      path:'/Shop',
      name:'Shop',
      component:Shop
    },
    {
      path:'/CityPicker',
      name:'CityPicker',
      component:CityPicker
    },{
      path:'/Cancel',
      name:'Cancel',
      component:Cancel
    },
  ]
})
