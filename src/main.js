// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'som-ui/lib/styles/index.css';
import './style/base.css' //公共的样式
import Vue from 'vue'
import App from './App'
import router from './router'
import SomUI from 'som-ui';
import carPicker from '@souche-ui/som-car-picker';
import CityPicker from '@souche-ui/som-city-picker'
import SelectorItem from '@souche-ui/som-selector-item'
import ScrollRefresh from '@souche-ui/som-scroll-refresh'
import './config/rem'
import moment from 'moment'
Vue.prototype.$moment = moment
Vue.config.productionTip = false
Vue.use(SomUI)
Vue.use(SelectorItem)
Vue.use(carPicker)
Vue.use(CityPicker)
Vue.use(ScrollRefresh)

// 创建bus数据总线
const FormStort = {}
new Vue({
  el: '#app',
  router,
  data:{
    FormStort
  },
  components: { App },
  template: '<App/>'
})
// 组件中使用
// this.$root.Bus.$on()
// this.$root.Bus.$emit()
