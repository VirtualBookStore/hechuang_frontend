<template>
  <!--    页面布局-->
  <el-container class="home-container">
    <!--        头部区域-->
    <el-header class="elheader">
      <div>
        <img src="../assets/img/bookstoreIcon.png"
             height="59" />
      </div>
      <!--            <div class="header-name">-->
      <!--                {{username}}-->
      <!--            </div>-->
      <div class="out-button">
        <!-- //todo:登出按钮功能还未实现 -->
        <el-button size="medium"
                   round
                   @click="logout()"> 退出</el-button>
      </div>
    </el-header>
    <!--        页面主体-->
    <el-container class="main-content">
      <!--            侧边栏-->
      <el-aside width="150px">
        <el-menu router
                 text-color="#444"
                 active-text-color="#409eff">
          <el-submenu index="1">
            <template slot="title">
              <p class="sub-title">信息管理</p>
            </template>
            <el-menu-item index="/information">查看个人信息</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <p class="sub-title">书店商城</p>
            </template>
            <el-menu-item index="/AllBook1">浏览全部书籍</el-menu-item>
            <el-menu-item index="/BookRecycle">交易历史</el-menu-item>
            <el-menu-item index="/SearchBox1">搜索书籍</el-menu-item>
            <el-menu-item index="/ComfirmReceive">确认收货</el-menu-item>
            <el-menu-item index="/PayOrders">支付订单</el-menu-item>

          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <p class="sub-title">通知</p>
            </template>
            <el-menu-item index="/notification">查看通知</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--            右侧内容主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      username: window.sessionStorage.getItem('token'),
      booklist: {
        book_id: '',
      },
    }
  },
  mounted: function () {
    {
      var _this = this;
      var discount_rate = 0;
      var old_rate = 0;
      var recycle_rate = 0;
      this.$http
        .get('/api/v1/config/')
        .then(function (res) {
          discount_rate = res.data.discount_rate;
          old_rate = res.data.old_rate;
          recycle_rate = res.data.recycle_rate;
          console.log(discount_rate);
          console.log(old_rate);
          console.log(recycle_rate);
          window.sessionStorage.setItem('discount_rate', discount_rate);
          window.sessionStorage.setItem('old_rate', old_rate);
          window.sessionStorage.setItem('recycle_rate', recycle_rate);
        })
        .catch(function (error) { })
    }
  },
  methods: {
    logout () {
      {
        var _this = this
        this.$http
          .post('/api/v1/auth/logout/')
          .then(function (res) {
            _this.$router.push('index')
            window.sessionStorage.clear()
          })
          .catch(function (error) { })
      }
    },
  },
}
</script>

<style scoped>
.el-container {
  /* background-color: rgb(84, 92, 100); */
}
.home-container {
  height: 100%;
}
.main-content {
  width: 70%;
  margin: auto;
}
.el-menu {
  border-right: 0;
}

.el-header {
  /* background: url(../assets/img/head_bg.jpg) top center; */
  /* background-color: red; */
  display: flex;
  justify-content: space-between;
  margin-left: 0;
  padding-left: 0;
  width: 70%;
  margin: auto;
  border-bottom: 1px solid #e7e7e7;
}

.el-aside {
  /*background-color: gray;*/
}

.sub-title {
  color: #333;
  font-weight: 700;
}
.el-main {
  /*background-color: lightgoldenrodyellow;*/
  background-color: white;
}

.out-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-name {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
