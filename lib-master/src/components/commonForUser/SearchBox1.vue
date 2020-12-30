<template>
  <div class="book_search">
    <div>
      <p class="cur-p">查询图书</p>
    </div>
    <el-form class="demo-now_Data">
      <el-form-item>
        <el-input
          v-model="isbn"
          placeholder="输入需要查询书籍的ISBN"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      @click="
        search()
        searchdialogvisible = true
      "
      class="submit_btn "
      >查询</el-button
    >

    <el-dialog title="书名搜索" :visible.sync="searchdialogvisible" width="70%">
      <el-table :data="bookInfo" style="width: 100%" border :stripe="true">
        <el-table-column
          prop="title"
          label="书名"
          width="120"
        ></el-table-column>
        <el-table-column prop="description" label="简介"></el-table-column>
        <el-table-column prop="price" label="价格(元)"></el-table-column>
        <el-table-column prop="new_total" label="新书数量"></el-table-column>
        <el-table-column prop="old_total" label="旧书数量"></el-table-column>
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
      bookInfo: [],
      //图书表单数据绑定
      isbn: '',
      title: '',
      description: '',
      price: 0,
      new_total: 0,
      old_total: 0,
      //表单的验证规则
      bookFormRules: {
        //    验证书名是否合法
        book_name: [
          { required: true, message: '请输入书籍ISBN', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    //异步操作
    search() {
      this.$http
        .get('/api/v1/book/' + this.isbn)
        .then((res) => {
          console.log(res.data)
          if (this.isbn != '') {
            res.data.price/=100
            this.bookInfo = [res.data]
          } else {
            for (let item in res.data) {
              res.data[item].price /= 100
            }
            this.bookInfo = res.data
          }
          // this.bookInfo = res.data
          console.log('bookinfo:', this.bookInfo)
        })
        .catch(function(error) {
          console.log(error)
        })
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
