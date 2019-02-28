import Vue from 'vue'
import Router from 'vue-router'
import mine from '@/page/mine'
import home from '@/page/home'
import earnings from '@/page/earnings'
import withdraw from '@/page/withdraw'
import withdrawLog from '@/page/withdraw/withdraw_log.vue'
import performance from '@/page/performance'
import myteam from '@/page/myteam'
import login from '@/page/login'
import mineInfo from '@/page/mineInfo'
import mineCard from '@/page/mineCard'
import hint from '@/components/hint'
import order from '@/page/order'
import address from '@/page/address'
import addCard from '@/page/address/addCard.vue'
import redirect from '@/page/redirect'
import service from '@/page/service'
import invite from '@/page/invite'
import message from '@/page/message'
import forgetpsw from '@/page/login/forgetpsw.vue'

Vue.use(Router)

export default new Router({
  base: '/union',
  routes: [
    {
      path: '*',
      redirect: '/redirect'
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/forgetpsw',
      name: 'forgetpsw',
      component: forgetpsw
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/mineInfo',
      name: 'mineInfo',
      component: mineInfo
    },
    {
      path: '/service',
      name: 'service',
      component: service
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/redirect',
      name: 'redirect',
      component: redirect
    },
    {
      path: '/invite',
      name: 'invite',
      component: invite
    },
    {
      path: '/hint',
      name: 'hint',
      component: hint
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/withdraw_log',
      name: 'withdraw_log',
      component: withdrawLog
    },
    {
      path: '/address/:flag',
      name: 'address',
      component: address
    },
    {
      path: '/addCard',
      name: 'addCard',
      component: addCard
    },
    {
      path: '/mineCard',
      name: 'mineCard',
      component: mineCard
    },
    {
      path: '/myteam',
      name: 'myteam',
      component: myteam
    },
    {
      path: '/service',
      name: 'service',
      component: service
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: withdraw
    },
    {
      path: '/performance',
      name: 'performance',
      component: performance
    },
    {
      path: '/earnings/:flag',
      name: 'earnings',
      component: earnings
    },
    {
      path: '/order',
      name: 'order',
      component: order
    }
  ]
})
