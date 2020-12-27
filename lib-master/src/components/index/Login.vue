<template>
  <div class="login_container">
    <div class="libtip">
      <h1>
        合创书店
        <i class="el-icon-reading"></i>
      </h1>
      <p>合创书店，一个为书籍爱好者设计的集购买、回收于一体的网上书店。</p>
    </div>
    <transition name="form-fade"
                mode="in-out">
      <section class="formCon">
        <el-form ref="loginFormRef"
                 :model="loginForm"
                 :rules="loginFormRules"
                 label-width="100px">
          <el-form-item prop="username"
                        label="用户ID">
            <el-input v-model="loginForm.username"
                      placeholder="ID"></el-input>
          </el-form-item>
          <el-form-item prop="password"
                        label="密码">
            <el-input type="password"
                      v-model="loginForm.password"
                      placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="login">登录</el-button>
            <el-button>忘记密码</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      //登录表单数据绑定
      loginForm: {
        username: '',
        password: '',
      },
      //表单的验证规则
      loginFormRules: {
        //    验证用户名是否合法
        username: [
          { required: true, message: '请输入ID', trigger: 'blur' },
          {
            min: 0,
            max: 100,
            message: '登录凭据必须为ID或邮箱',
            trigger: 'blur',
          },
        ],
        //    验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码必须在6-15个字符之间',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    //异步操作
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        let msg = ''
        let status = 200
        let key = this.loginForm.username
        let pass = this.loginForm.password
        let result = await this.$http
          .post('/api/v1/auth/login/', {
            username: key,
            password: pass,
          })
          .catch(function (error) {
            if (error.response) {
              status = error.response.status;
              msg = error.response.data.non_field_errors;
            }
          })

        if (status !== 200) {
          alert(msg)
        } else {
          var name = "csrftoken=";
          var ca = document.cookie.split(';');
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
              var newToken = c.substring(name.length, c.length);
            }
          }
          alert(newToken);
          window.sessionStorage.setItem('token', newToken);

          if (key === 'admin')
            await this.$router.push({ path: '/Admin' });
          else
            await this.$router.push({ path: '/User' });

          // if (newToken != "undefined")
          // {
          //     await this.$router.push({path: '/studentHome'});
          // }
          // else if (userType === 1)
          // {
          //     let result1 = await this.$http.post(this.$api.getClubNameUrl);
          //     window.sessionStorage.setItem('name', result1.data.name);
          //     await this.$router.push({path: '/principalHome'});
          // }
          // else
          //     await this.$router.push({path: '/adminHome'});
        }
      })
    },
  },
}
</script>

<style scoped>
.login_container {
  height: 100%;
  width: 100%;
  /* background-image: url(../../assets/img/bg1.jpg); */
  background-size: 100%;
  background-attachment: fixed;
}

.formCon {
  width: 320px;
  height: 190px;
  position: relative;
  top: 36%;
  left: 30%;

  /* margin-top: 160px;
		margin-left: 95px; */
  /* .wh(320px, 190px);
		.ctp(320px, 190px); */
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fdffff;
}
.libtip {
  position: absolute;
  width: 100%;
  padding-top: 50px;
  text-align: center;
}
.libtip h1 {
  font-size: 34px;
  margin: 0;
  line-height: 48px;
  color: #555;
}
.libtip p {
  font-size: 18px;
  line-height: 28px;
  color: #888;
  margin: 10px 0 5px;
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
