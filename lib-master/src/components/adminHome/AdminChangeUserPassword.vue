<template>
  <div class="all-container">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm"
             style="margin-left:400px;margin-top:120px;">
      <el-form-item label="用户ID"
                    prop="id">
        <el-input v-model.number="ruleForm.id"
                  style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="新密码"
                    prop="pass">
        <el-input type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                  style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="checkPass">
        <el-input type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                  style="width:300px;"></el-input>
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
        else {
          if (value.toString().length < 8) {
            callback(new Error('必须为8-24位数'))
          }
          else if (value.toString().length > 24) {
            callback(new Error('必须为8-24位数'))
          }
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var check = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else { callback() }
    }
    return {
      ruleForm: {
        id: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        id: [
          { validator: check, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
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
        let id = "" + this.ruleForm.id;
        let pass = "" + this.ruleForm.pass;
        let result = await this.$http.put('/apip/api/adminop/resetuserpw?modid=' + id + '&newpw=' + pass,
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
        let inf = result.data.error;
        if (inf === undefined) {
          inf = 'submit successfully'
          this.$message.info(inf);
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
