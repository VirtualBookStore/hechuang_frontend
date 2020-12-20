<template>
  <div class="all-container">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm"
             style="margin-left:400px;margin-top:120px;">
      <el-form-item label="管理员名字"
                    prop="name">
        <el-input v-model.number="ruleForm.name"
                  style="width:300px;"
                  placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系方式"
                    prop="contact">
        <el-input v-model.number="ruleForm.contact"
                  style="width:300px;"
                  placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="pass">
        <el-input v-model.number="ruleForm.pass"
                  style="width:300px;"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="checkPass">
        <el-input v-model.number="ruleForm.checkPass"
                  style="width:300px;"
                  placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入相同的密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入的密码不同'))
      } else {
        callback()
      }
    }
    var checknum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('联系方式不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入电话号码'))
        } else {
          if (value.toString().length !== 11) {
            callback(new Error('电话号码必须有效'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var check = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入内容'))
      } else { callback() }
    }
    return {
      ruleForm: {
        name: '',
        contact: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        name: [
          { validator: check, trigger: 'blur' }
        ],
        contact: [
          { validator: checknum, trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return;
        let Token = window.sessionStorage.getItem('token');
        let msg = "";
        let status = 200;
        let names = this.ruleForm.name;
        let contacts = this.ruleForm.contact;
        let pass = this.ruleForm.pass;
        names = encodeURI(encodeURI(names));
        let result = await this.$http.post('/apip/api/AdminOp/CreateAdminAccount?name=' + names + '&password=' + pass + '&contact=' + contacts,
          {
            hearders: {
              'Authorization': Token,
            }
          })
          .catch(function (error) {
            if (error.response) {
              status = error.response.status;
              msg = error.response.data.msg;
            }
          });
        let idkey = result.data.id;
        let inf = result.data.error;
        if (inf === undefined) {
          inf = 'ID of new big brother is ' + idkey;
          this.$message.info(inf);
          alert(inf);
        }
        else {
          this.$message.info(inf);
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
</style>
