<template>
  <div class="all-container">
    <el-form :model="ruleForm"
             status-icon
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm"
             style="margin-left:200px;margin-top:120px;">
      <el-form-item label="出版商邮箱"
                    prop="publisher_email">
        <el-input v-model.number="ruleForm.publisher_email"
                  style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="全局折扣率"
                    prop="discount_rate">
        <el-input v-model.number="ruleForm.discount_rate"
                  style="width:300px;"
                  type="number"></el-input>
      </el-form-item>
      <el-form-item label="二手书折扣率"
                    prop="old_rate">
        <el-input v-model.number="ruleForm.old_rate"
                  style="width:300px;"
                  type="number"></el-input>
      </el-form-item>
      <el-form-item label="回收折扣率"
                    prop="recycle_rate">
        <el-input v-model.number="ruleForm.recycle_rate"
                  style="width:300px;"
                  type="number"></el-input>
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
    return {
      ruleForm: []
    }
  },
  mounted: function () {
    var _this = this   //很重要！！
    this.$http.get('/api/v1/config/')
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
      if (_this.ruleForm.discount_rate >= 1) {
        alert("全局折扣率不能超过1")
        location.reload();
      }
      else if (_this.ruleForm.old_rate >= 1) {
        alert("二手书折扣率不能超过1")
        location.reload();
      }
      else if (_this.ruleForm.recycle_rate <= 0) {
        alert("回收折扣率不能低于0")
        location.reload();
      }
      else {
        this.$http.put('/api/v1/config/', _this.ruleForm)
          .then(function (res) {
            console.log(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        location.reload();
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
</style>
