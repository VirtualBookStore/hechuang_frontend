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
        <el-button @click="logout"
                   size="medium"
                   round> 退出</el-button>
      </div>
    </el-header>
    <!--        页面主体-->
    <el-container class="main-content">
      <!--            侧边栏-->
      <el-aside width="170px">
        <el-menu router
                 text-color="#444"
                 active-text-color="#409eff">
          <el-submenu index="1">
            <template slot="title">
              <p class="sub-title">信息管理</p>
            </template>
            <el-menu-item index="/inf">系统信息查询修改</el-menu-item>
            <el-menu-item index="/Notification1">查看通知</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <p class="sub-title">书籍管理</p>
            </template>
            <el-menu-item index="/BookReviewAdmin">审核回收申请</el-menu-item>
            <el-menu-item index="/SearchBox">确认回收书籍</el-menu-item>
            <el-menu-item index="/AllBook">管理书籍库存信息</el-menu-item>
            <el-menu-item index="/BookReturns">查看系统订单</el-menu-item>
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
    this.bookcategory()
  },
  methods: {
    bookcategory () {
      /* let status = 200
      let Token = window.sessionStorage.getItem('token')
      this.$http
        .get('/api/api/books/', {
          hearders: {
            Authorization: Token,
          },
        })
        .then(function (response) {
          var data = JSON.stringify(response.data)
          // alert(data);
          window.sessionStorage.setItem('book', data)
        })
        .catch(function (response) {
          console.log(response)
        }) */
    },
    //退出按钮
    logout () {
      {
        var _this = this
        this.$http.post('/api/v1/auth/logout/')
          .then(function (res) {

            _this.$router.push('index');
            window.sessionStorage.clear();
          })
          .catch(function (error) {
          });
      }
    }
  }

}

</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-container {
  /* background-color: rgb(84, 92, 100); */
}

.main-content {
  width: 80%;
  margin: auto;
}
.el-menu {
  border-right: 0;
}
.sub-title {
  color: #333;
  font-weight: 700;
}
.el-header {
  /* background: url(../assets/img/head_bg.jpg) top center; */
  /* background-color: red  ; */
  display: flex;
  justify-content: space-between;
  margin-left: 0;
  padding-left: 0;
  width: 80%;
  margin: auto;
  border-bottom: 1px solid #e7e7e7;
}

.el-aside {
  /*background-color: gray;*/
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
