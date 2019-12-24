import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
// import { ajax } from './api/ajax'
// import Vconsole from 'vconsole'
// import Utils from './common/utils'
// import Vuex from 'vuex'
// import store from './store'
// import filters from './common/filters'

import 'lib-flexible'
import './assets/css/style.scss'

// Vue.use(Vuex)
Vue.use(VueRouter)

// import { Toast, Swipe, SwipeItem, Lazyload } from 'vant'
// Vue.use(Toast).use(Swipe).use(SwipeItem)
// options 为可选参数，无则不传
// Vue.use(Lazyload, {})

// import './assets/js/report-sdk.min'
// import $SDK from './sdk/main'
// console.log($SDK)
// Vue.prototype.$SDK = $SDK
// const vConsole = new Vconsole()
// Vue.use(vConsole)

// Object.keys(filters).forEach(key => {
//     Vue.filter(key, filters[key]);
// })

// Vue.prototype.$utils = Utils

Vue.config.productionTip = false

// import Loading from './components/test/index'
// Vue.use(Loading)

new Vue({
    router,
    // store,
    render: h => h(App),
}).$mount('#app')
