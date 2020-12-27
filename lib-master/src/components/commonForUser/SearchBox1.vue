<template>
  <div class="book_search">
    <div>
      <p class="cur-p">查询图书</p>
    </div>
    <el-form
      ref="bookFormRef"
      :model="bookForm"
      :rules="bookFormRules"
      class="demo-now_Data"
    >
      <!-- //todo:此处需要的参数是一个ISBN号 -->
      <el-form-item prop="book_name">
        <el-input
          v-model="bookForm.book_name"
          placeholder="输入需要查询书籍的ISBN"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="search" class="submit_btn "
      >查询</el-button
    >
    <!-- //todo：这里需要在props或data中建立相应的参数 -->
    <el-dialog title="书名搜索" :visible.sync="searchdialogvisible" width="70%">
      <el-table :data="searchlist" style="width: 100%" border :stripe="true">
        <el-table-column
          prop="book_name"
          label="书名"
          width="120"
        ></el-table-column>
        <el-table-column prop="id" label="简介"></el-table-column>
        <el-table-column prop="place_id" label="价格"></el-table-column>
        <el-table-column
          prop="publishing_house"
          label="新书数量"
        ></el-table-column>
        <el-table-column
          prop="publication_date"
          label="旧书数量"
        ></el-table-column>
      </el-table>
      <!-- 底部按钮区域 -->
      <div class="button-down">
        <el-button @click="searchdialogvisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchlist: [],
      searchdialogvisible: false,
      //图书表单数据绑定
      bookForm: {
        book_name: '',
      },
      //表单的验证规则
      bookFormRules: {
        //    验证书名是否合法
        book_name: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    //异步操作
    search() {
      this.$refs.bookFormRef.validate(async (valid) => {
        if (!valid) return
        let msg = ''
        let status = 200
        let key = this.bookForm.book_name
        let Token = window.sessionStorage.getItem('token') //this.$message.info("The database isn't ready.");
        let result = await this.$http
          .get('/apip/api/booksarch?name=' + this.bookForm.book_name, {
            hearders: {
              Authorization: Token,
            },
          })
          .catch(function(error) {
            if (error.response) {
              status = error.response.status
              msg = error.response.data.msg
            }
          })
        this.searchlist = result.data
        if (status === 400) {
          this.$message.info('该书不存在 !')
        }
      })

      this.searchdialogvisible = true
    },
  },
}
</script>

<style scoped>
.home-container {
  height: 100%;
}

.cur-p {
  font-weight: bold;
  margin-left: 0%;
  margin-top: 20px;
}
.el-header {
  background-color: rgb(64, 158, 255);
  display: flex;
  justify-content: space-between;
  margin-left: 0;
  padding-left: 0;
}

.el-aside {
  /*background-color: gray;*/
}

.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 200px;
}
.el-main {
  /*background-color: lightgoldenrodyellow;*/
}
.el-button {
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
.button-down {
  text-align: center;
}
</style>
