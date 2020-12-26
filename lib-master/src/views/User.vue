<template>
  <!--    页面布局-->
  <el-container class="home-container">
    <!--        头部区域-->
    <el-header class="elheader">
      <div>
        <img src="../assets/img/bookstoreIcon.png" height="59" />
      </div>
      <!--            <div class="header-name">-->
      <!--                {{username}}-->
      <!--            </div>-->
      <div class="out-button">
        <el-button @click="logout" size="medium" round> 退出</el-button>
      </div>
    </el-header>
    <!--        页面主体-->
    <el-container class="main-content">
      <!--            侧边栏-->
      <el-aside width="150px">
        <el-menu router text-color="#444" active-text-color="#409eff">
          <el-submenu index="1">
            <template slot="title"><p class="sub-title">信息管理</p></template>
            <el-menu-item index="/information">查看个人信息</el-menu-item>
            <el-menu-item index="/AdminChangeIf1">修改个人信息</el-menu-item>
            <el-menu-item index="/AdminChangePass1">修改密码</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><p class="sub-title">商城</p></template>
            <el-menu-item index="/BookReview">书籍推荐阅览</el-menu-item>
            <el-menu-item index="/SearchBox1">搜索书籍</el-menu-item>
            <el-menu-item index="/AllBook1">浏览全部书籍</el-menu-item>
            <el-menu-item index="/BookBorrows">借阅书籍</el-menu-item>
            <el-menu-item index="/s">浏览借阅记录</el-menu-item>
            <el-menu-item index="/BookExborrow">续借书籍</el-menu-item>
            <el-menu-item index="/BookReserve">书籍预约</el-menu-item>
            <el-menu-item index="/BookReviewUser"
              >用户推荐书籍查询</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><p class="sub-title">自习室管理</p></template
            >
            <el-menu-item index="/RoomList1">浏览自习室列表</el-menu-item>
            <el-menu-item index="/RoomReserve">预约自习室</el-menu-item>
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
  data() {
    return {
      username: window.sessionStorage.getItem('token'),
      booklist: {
        book_id: '',
      },
    }
  },
  mounted: function() {
    this.warnings()
    this.bookcategory()
  },
  methods: {
    warnings() {
      window.sessionStorage.setItem('bookable', 'true')
      let Token = window.sessionStorage.getItem('token')
      let result1 = this.$http.get('/apip/api/home/tips/', {
        hearders: {
          Authorization: Token,
        },
      })
      if (result1.data == 'false') {
        window.sessionStorage.setItem('bookable', 'false')
      }
      let result2 = this.$http.get('/apip/api/home/tips/', {
        hearders: {
          Authorization: Token,
        },
      })
      if (result2.data == 'true') {
        alert('你有超期书籍未归还！')
      }
    },

    bookcategory() {
      let status = 200
      let Token = window.sessionStorage.getItem('token')
      this.$http
        .get('/apip/api/books/', {
          hearders: {
            Authorization: Token,
          },
        })
        .then(function(response) {
          var data = JSON.stringify(response.data)
          // alert(data);
          window.sessionStorage.setItem('book', data)
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    //退出按钮
    logout() {
      let status = 200
      let Token = window.sessionStorage.getItem('token')
      this.$http.post('/api/v1/auth/logout/').catch(function(error) {
        if (error.response) {
          status = error.response.status
          alert('123')
          msg = error.response.data.non_field_errors
        }
      })
      if (status === 400) {
        alert(msg)
        //this.$message.info(msg);
      } else {
        this.$router.push('index')
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
