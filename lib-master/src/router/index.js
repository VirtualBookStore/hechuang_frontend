import Vue from 'vue'
import VueRouter from 'vue-router'

//index页面和他的组件
import Index from '../views/Index'
import Login from '../components/index/Login'
import StudentRegister from '../components/index/StudentRegister'

//管理员组件
import Admin from '../views/Admin'
import User from '../views/User'

import AdminBookReview from '../components/adminHome/AdminBookReview'
import AdminChangeIf from '../components/adminHome/AdminChangeIf'
import AdminChangePass from '../components/adminHome/AdminChangePass'
import AdminChangeUserInfo from '../components/adminHome/AdminChangeUserInfo'
import AdminChangeUserPassword from '../components/adminHome/AdminChangeUserPassword'
import AdminInfo from '../components/adminHome/AdminInfo'
import AdminRegister from '../components/adminHome/AdminRegister'
import BookReviewAdmin from '../components/adminHome/BookReviewAdmin'
import adminlist from '../components/adminHome/adminlist'
import inf from '../components/adminHome/inf'
import search from '../components/adminHome/search'
import s from '../components/adminHome/s'
//book页面和他的组件
import BookRecycle from '../components/commonForUser/BookRecycle'
import BookingWelcome from '../components/booking/BookingWelcome'
import BookBorrows from '../components/booking/BookBorrows'
import BookReserve from '../components/booking/BookReserve'
import BookReturns from '../components/booking/BookReturns'
import BookExborrow from '../components/booking/BookExborrow'
import BookReview from '../components/booking/BookReview'
import BookReviewUser from '../components/booking/BookReviewUser'
import BookSearchUser from '../components/booking/BookSearchUser'
import BookRegister from '../components/booking/BookRegister'
//searchbook页面和他的组件
import SearchBox from '../components/searchbook/SearchBox'
import AllBook from '../components/searchbook/AllBook'

//room页面和他的组件
import RoomList from '../components/room/RoomList'
import RoomReserve from '../components/room/RoomReserve'

import information from '../components/commonForUser/information'
import AllBook1 from '../components/commonForUser/AllBook1'
import RoomList1 from '../components/commonForUser/RoomList1'
import SearchBox1 from '../components/commonForUser/SearchBox1'
import AdminChangeIf1 from '../components/commonForUser/AdminChangeIf1'
import AdminChangePass1 from '../components/commonForUser/AdminChangePass1'
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
      { path: '/AdminChangeIf', component: AdminChangeIf },
      { path: '/AdminChangePass', component: AdminChangePass },
      { path: '/AdminChangeUserInfo', component: AdminChangeUserInfo },
      { path: '/AdminChangeUserPassword', component: AdminChangeUserPassword },
      { path: '/AdminRegister', component: AdminRegister },
      { path: '/AdminInfo', component: AdminInfo },
      { path: '/BookReviewAdmin', component: BookReviewAdmin },
      { path: '/AdminBookReview', component: AdminBookReview },
      { path: '/AllBook', component: AllBook },
      { path: '/SearchBox', component: SearchBox },
      { path: '/BookRegister', component: BookRegister },
      { path: '/BookReturns', component: BookReturns },
      { path: '/BookSearchUser', component: BookSearchUser },
      { path: '/RoomList', component: RoomList },
      { path: '/adminlist', component: adminlist },
      { path: '/inf', component: inf },
      { path: '/search', component: search },
    ],
  },
  {
    path: '/User',
    component: User,
    //当访问booking,自动重定向到BookingWelcome页面
    //booking页面的一些子路由
    children: [
      { path: '/information', component: information },
      { path: '/BookBorrows', component: BookBorrows },
      { path: '/BookReserve', component: BookReserve },
      { path: '/BookReturns', component: BookReturns },
      { path: '/BookExborrow', component: BookExborrow },
      { path: '/BookReview', component: BookReview },
      { path: '/BookRecycle', component: BookRecycle },
      { path: '/SearchBox1', component: SearchBox1 },
      { path: '/AllBook1', component: AllBook1 },
      { path: '/RoomList1', component: RoomList1 },
      { path: '/RoomReserve', component: RoomReserve },
      { path: '/AdminChangeIf1', component: AdminChangeIf1 },
      { path: '/AdminChangePass1', component: AdminChangePass1 },
      { path: '/BookReviewUser', component: BookReviewUser },
      { path: '/s', component: s },
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
