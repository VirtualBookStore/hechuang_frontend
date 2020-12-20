<template>
  <el-container class="index-container">
    <!--        上边框-->
    <el-header class="elheader">
      <el-container class="mainArea">
        <!--            开启了路由模式-->
        <el-menu
          router
          default-active="/login"
          class="elmenu"
          mode="horizontal"
        >
          <el-menu-item index="/login">登录</el-menu-item>
          <el-menu-item index="/studentRegister">注册</el-menu-item>
        </el-menu>
      </el-container>
    </el-header>

    <!--        主体区域-->
    <el-main class="elmain">
      <!--            路由占位符-->
      <router-view></router-view>
    </el-main>
    <el-footer class="elfooter">
      <div class="bottomNav">
        <a href="#" class="border-right">意见反馈</a>
        <a href="#" class="border-right">联系我们</a>
        <a href="#" class="border-right">投诉举报</a>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data: function() {
    return {}
  },
}
</script>

<style scoped>
@import url('//at.alicdn.com/t/font_2280831_jxhnjmjk6m.css');
.index-container {
  height: 100%;
}
.elheader {
  margin: auto;
  width: 60%;
  border-bottom: 1px solid #e7e7e7;
}
.mainArea {
  margin: auto;
}
.elmenu {
  /* border-radius: 2px; */
  list-style: none;
  position: relative;
  padding-left: 0;
}

.elmain {
  background-color: rgb(255, 255, 255);
  padding-top: 1px;
  padding: 0px;
}
.elfooter {
  margin: auto;
  width: 60%;
  border-top: 1px solid #e7e7e7;
}
.bottomNav {
  margin-top: 10px;
  text-align: center;
}
.border-right {
  clear: both;
  text-align: center;
  color: #999;
  font: 12px/1.5 Arial;
  white-space: nowrap;
  border-right: 1px solid #d8d8d8;
  padding: 0 10px;
}
</style>
