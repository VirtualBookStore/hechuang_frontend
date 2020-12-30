<template>
  <div class="all-container">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm"
             style="margin-left:200px;margin-top:120px;">
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model.number="ruleForm.username"
                  style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        <el-input v-model.number="ruleForm.email"
                  style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="地址"
                    prop="address">
        <el-input v-model.number="ruleForm.address"
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
    /*var checknum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('联系方式不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value.toString().length !== 11) {
            callback(new Error('必须为11位数'))
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
    }*/
    return {
      ruleForm: []
    }
  },
  mounted: function () {
    var _this = this   //很重要！！
    this.$http.get('/api/v1/profile/')
      .then(function (res) {
        console.log(res.data);
        _this.ruleForm = res.data
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    submitForm (formName) {
      var _this = this


      this.$http.put('/api/v1/profile/', _this.ruleForm)
        .then(function (res) {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      location.reload();

    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
</style>
