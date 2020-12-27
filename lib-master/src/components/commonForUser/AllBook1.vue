<template>
  <div class="book_search">
    <header class="form_header"></header>
    <el-form
      ref="bookFormRef"
      :model="bookForm"
      :rules="bookFormRules"
      label-width="110px"
      class="demo-now_Data"
    >
      <el-button
        type="primary"
        @click="search"
        class="submit_btn"
        v-if="searchdialogvisible"
        >点击获得所有图书商品信息</el-button
      >
    </el-form>

    <!-- //todo:此处所需要的值应在props或data中建立，调用接口取出数据 -->
    <div class="book-info">
      <el-table :data="searchlist" style="width: 100%" border :stripe="true">
        <el-table-column
          prop="book_name"
          label="书名"
          width="120"
        ></el-table-column>
        <el-table-column prop="id" label="ISBN"></el-table-column>
        <el-table-column prop="place_id" label="简介"></el-table-column>
        <el-table-column prop="publishing_house" label="价格"></el-table-column>
        <el-table-column prop="introduction" label="新书数量"></el-table-column>
        <el-table-column
          prop="publication_date"
          label="旧书数量"
        ></el-table-column>
        <!-- <el-table-column prop="isbn" label="是否推荐"></el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchlist: [],
      searchdialogvisible: true,
      //图书表单数据绑定
      bookForm: {
        reader_id: '',
      },
      //表单的验证规则
      bookFormRules: {
        //    验证书名是否合法
        reader_id: [
          { required: true, message: '请输入读者ID', trigger: 'blur' },
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
        let key = this.bookForm.reader_id
        let Token = window.sessionStorage.getItem('token') //this.$message.info("The database isn't ready.");
        let result = await this.$http
          .get('/apip/api/books', {
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
          this.$message.info('该人不存在 !')
        }
      })

      this.searchdialogvisible = false
    },
  },
}
</script>

<style scoped>
.home-container {
  height: 100%;
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

.el-main {
  /*background-color: lightgoldenrodyellow;*/
}

.book-info {
  margin-top: 20px;
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
