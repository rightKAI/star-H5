// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import { ToastPlugin, LoadingPlugin } from 'vux'
import {post, fetch} from './utils/http'
import store from './store/store.js'

// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$get = fetch

Vue.use(ToastPlugin)
Vue.use(VueRouter)
Vue.use(LoadingPlugin)
Vue.use(VueCookies)
Vue.use(Vuex)
// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  if (!VueCookies.get('token') && to.name !== 'login' && to.name !== 'forgetpsw') {
    // 显示文字
    Vue.$vux.toast.text('请先登录后再进行访问')
    next({
      name: 'login'
    })
  } else {
    next()
  }
})

Vue.config.productionTip = false
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
