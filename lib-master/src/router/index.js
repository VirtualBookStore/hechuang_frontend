import Vue from 'vue'
import VueRouter from 'vue-router'

//index页面和他的组件
import Index from '../views/Index'
import Login from '../components/index/Login'
import StudentRegister from '../components/index/StudentRegister'

//管理员组件
import Admin from '../views/Admin'
import User from '../views/User'

import inf from '../components/adminHome/inf'
import BookReturns from '../components/adminHome/BookReturns'
import BookReviewAdmin from '../components/adminHome/BookReviewAdmin'
import SearchBox from '../components/adminHome/SearchBox'
import AllBook from '../components/adminHome/AllBook'
import Notification1 from '../components/adminHome/Notification1'
//用户页组件
import BookRecycle from '../components/commonForUser/BookRecycle'
import ComfirmReceive from '../components/commonForUser/ComfirmReceive'
import Notification from '../components/commonForUser/Notification'

import PayOrders from '../components/commonForUser/PayOrders'
import information from '../components/commonForUser/information'
import AllBook1 from '../components/commonForUser/AllBook1'
import SearchBox1 from '../components/commonForUser/SearchBox1'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/index',
    component: Index,
    //当访问index,自动重定向到welcome页面
    redirect: '/login',
    //index页面的一些子路由
    children: [
      { path: '/login', component: Login },
      { path: '/studentRegister', component: StudentRegister },
    ],
  },
  {
    path: '/Admin',
    component: Admin,
    // redirect: '/login',
    children: [
      { path: '/AllBook', component: AllBook },
      { path: '/Notification1', component: Notification1 },
      { path: '/SearchBox', component: SearchBox },
      { path: '/BookReturns', component: BookReturns },
      { path: '/BookReviewAdmin', component: BookReviewAdmin },
      { path: '/inf', component: inf },

    ],
  },
  {
    path: '/User',
    component: User,
    //当访问booking,自动重定向到BookingWelcome页面
    //booking页面的一些子路由
    children: [
      { path: '/information', component: information },
      { path: '/BookRecycle', component: BookRecycle },
      { path: '/SearchBox1', component: SearchBox1 },
      { path: '/AllBook1', component: AllBook1 },
      { path: '/ComfirmReceive', component: ComfirmReceive },
      { path: '/Notification', component: Notification },
      { path: '/PayOrders', component: PayOrders },
    ],
  },
]

const router = new VueRouter({
  routes,
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to:要访问的路径
  // from从哪个路径来的
  // next代表放行
  if (
    to.path === '/login' ||
    to.path === '/studentRegister' ||
    to.path === '/welcome' ||
    to.path === '/returns' ||
    to.path === '/borrows'
  ) {
    return next()
  } else {
    //    获取token
    //let token = window.sessionStorage.getItem("token");
    //if (!token) return next("/login");
    //else return next();
    return next()
  }
})

export default router
