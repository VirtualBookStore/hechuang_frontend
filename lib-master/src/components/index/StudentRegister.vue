<!--有前端验证注册信息是否合理-->

<template>
  <div class="login_container">
    <div class="libtip">
      <h1>
        欢迎加入合创书店！
        <i class="el-icon-reading"></i>
      </h1>
      <p>成为合创书店会员，享受书店的所有权益！</p>
    </div>
    <section class="formCon"
             v-show="1">
      <!-- <div class="h1">
        <p>SIGN UP</p>
      </div> -->
      <el-form ref="registerFormRef"
               :model="registerForm"
               :rules="registerFormRules"
               label-width="100px">
        <el-form-item prop="username"
                      label="用户ID">
          <el-input v-model="registerForm.username"
                    placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item prop="tel"
                      label="邮箱">
          <el-input v-model="registerForm.tel"
                    placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password"
                      label="密码">
          <el-input type="password"
                    v-model="registerForm.password"
                    placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword"
                      label="确认密码">
          <el-input type="password"
                    v-model="registerForm.confirmPassword"
                    placeholder="确认密码"></el-input>
        </el-form-item>
        <el-button type="primary"
                   @click="register">注册</el-button>
        <!-- <a>Already Have One?</a> -->
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    let checkPassword = (rule, value, cb) => {
      const regPassword = /^\w{6,15}$/
      if (true) {
        //合法密码
        return cb()
      }
      cb(new Error('密码必须在个字符之间,只能由大小写字母数字下划线组成'))
    }

    return {
      //登录表单数据绑定
      registerForm: {
        username: '',
        tel: '',
        password: '',
        confirmPassword: '',
      },
      //表单的验证规则
      registerFormRules: {
        //    验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名必须在3-10个字符之间',
            trigger: 'blur'
          }
        ],
        //    验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入邮箱 ', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入密码 ', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    //异步操作
    //根据status判断是否注册成功,成功跳转页面,失败显示msg在合适的地方
    register () {
      this.$refs.registerFormRef.validate(async (valid) => {
        if (!valid) return
        let msg1 = ''
        let msg2 = ''
        let msg3 = ''
        let status = 500
        let result = await this.$http
          .post('/api/v1/auth/register/', {
            username: this.registerForm.username,
            email: this.registerForm.tel,
            password1: this.registerForm.password,
            password2: this.registerForm.confirmPassword,
          })
          .catch(function (error) {
            if (error.response) {
              status = error.response.status
              msg1 = error.response.data.username
              msg2 = error.response.data.email
              msg3 = error.response.data.password1
            }
          })
        if (status === 400) {
          // this.$message.info(msg);
          alert(msg1 + msg2 + msg3)
        } else {
          alert('注册成功')
          this.$router.push(
            { path: '/login' },
            (onComplete) => { },
            (onAbort) => { }
          )
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

.formCon {
  width: 380px;
  height: 350px;
  position: relative;
  top: 30%;
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
.h1 {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  font-weight: bold;
  color: #fff;
  font-size: 40px;
  font-family: "Microsoft Yahei", sans-serif;
}
.submit_btn {
  width: 100%;
  font-size: 16px;
}
</style>
