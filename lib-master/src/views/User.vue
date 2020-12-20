<template>

  <!--    页面布局-->
  <el-container class="home-container">
    <!--        头部区域-->
    <el-header>
      <div>
        <img src="../assets/img/tj_logo.png"
             height=40 />
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
    <el-container>
      <!--            侧边栏-->
      <el-aside width="200px">
        <el-menu router
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title"
                      background-color="#354764">信息管理</template>
            <el-menu-item index="/information">查看个人信息</el-menu-item>
            <el-menu-item index="/AdminChangeIf1">修改个人信息</el-menu-item>
            <el-menu-item index="/AdminChangePass1">修改密码</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              图书查询
            </template>
            <el-menu-item index="/BookReview">书籍推荐阅览</el-menu-item>
            <el-menu-item index="/SearchBox1">搜索书籍</el-menu-item>
            <el-menu-item index="/AllBook1">浏览全部书籍</el-menu-item>
            <el-menu-item index="/BookBorrows">借阅书籍</el-menu-item>
            <el-menu-item index="/s">浏览借阅记录</el-menu-item>
            <el-menu-item index="/BookExborrow">续借书籍</el-menu-item>
            <el-menu-item index="/BookReserve">书籍预约</el-menu-item>
            <el-menu-item index="/BookReviewUser">用户推荐书籍查询</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">自习室管理</template>
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
  data () {
    return {
      username: window.sessionStorage.getItem('token'),
      booklist:
      {
        book_id: '',
      }
    }
  },
  mounted: function () {
    this.warnings();
    this.bookcategory();

  },
  methods: {
    warnings () {
      window.sessionStorage.setItem('bookable', 'true')
      let Token = window.sessionStorage.getItem('token');
      let result1 = this.$http.get('/apip/api/home/tips/', {
        hearders: {
          'Authorization': Token,
        },
      })
      if (result1.data == 'false') {
        window.sessionStorage.setItem('bookable', 'false')
      }
      let result2 = this.$http.get('/apip/api/home/tips/', {
        hearders: {
          'Authorization': Token,
        },
      })
      if (result2.data == 'true') {
        alert("你有超期书籍未归还！");
      }

    },

    bookcategory () {
      let status = 200;
      let Token = window.sessionStorage.getItem('token');
      this.$http.get('/apip/api/books/', {
        hearders: {
          'Authorization': Token,
        },
      })
        .then(function (response) {
          var data = JSON.stringify(response.data);
          // alert(data);
          window.sessionStorage.setItem('book', data);
        }).catch(function (response) {
          console.log(response);
        });
    },
    //退出按钮
    logout () {
      window.sessionStorage.clear();
      this.$router.push("index")
    },
  }
};
</script>

<style scoped>
.el-container {
  background-color: rgb(84, 92, 100);
}
.home-container {
  height: 100%;
}
.el-menu {
  border-right: 0;
}

.el-header {
  background: url(../assets/img/head_bg.jpg) top center;
  background-color: rgb(64, 158, 255);
  display: flex;
  justify-content: space-between;
  margin-left: 0;
  padding-left: 0;
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
