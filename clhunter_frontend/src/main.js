import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import commonfunc  from "./plugins/commonfunc";
import echarts from './plugins/echarts'
import VueClipboard from 'vue-clipboard2'

VXETable.setup({
  i18n: (key, args) => i18n.t(key, args)

})

Vue.use(VueClipboard);

window.baseURL = '/cclhunter'

Vue.use(VXETable)

Vue.config.productionTip = false
Vue.prototype.$commonfunc = commonfunc;
Vue.prototype.$echarts = echarts;


export default new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
