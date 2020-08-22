import Vue from 'vue'
import App from './App.vue'

import store from './store'

Vue.config.productionTip = false

new Vue({
  store, // 把vuex注册到根组件实例中去
  render: h => h(App),
  name: 'Root'
}).$mount('#app')
