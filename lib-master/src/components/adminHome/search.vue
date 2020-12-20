<template>
  <div class="book_search">
    <el-row style="margin-top: 20px;">
      <el-col :span="14"
              :offset="4">
        <header class="form_header">查询图书借阅记录</header>
        <el-form ref="bookFormRef"
                 :model="bookForm"
                 :rules="bookFormRules"
                 label-width="110px"
                 class="demo-now_Data">
          <el-form-item label="图书ID"
                        prop="id">
            <el-input v-model="bookForm.id"
                      placeholder="图书ID"></el-input>
          </el-form-item>
          <el-button type="primary"
                     @click="search"
                     class="submit_btn">查询</el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog title="书名搜索"
               :visible.sync="searchdialogvisible"
               width="50%">
      <el-table :data="searchlist"
                style="width: 100%"
                border
                :stripe="true">
        <el-table-column prop="borrow_id"
                         label="借阅单号">
        </el-table-column>
        <el-table-column prop="book_id"
                         label="书籍ID">
        </el-table-column>
        <el-table-column prop="reader_id"
                         label="借书人id">
        </el-table-column>
        <el-table-column prop="renew"
                         label="续借次数">
        </el-table-column>
        <el-table-column prop="state"
                         label="图书当前状态">
        </el-table-column>
        <el-table-column prop="borrow_Time"
                         label="借阅时间">
        </el-table-column>
        <el-table-column prop="expire_Time"
                         label="最晚归还时间">
        </el-table-column>
        <el-table-column prop="return_Time"
                         label="实际归还时间">
        </el-table-column>
      </el-table>
      <!-- 底部按钮区域 -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="searchdialogvisible=false">确定</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
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
          { required: true, message: "请输入书籍名称", trigger: "blur" },
        ],
      }
    }
  },
  methods: {
    //异步操作
    search () {
      this.$refs.bookFormRef.validate(async valid => {
        if (!valid) return;
        let msg = "";
        let status = 200;
        let key = this.bookForm.id;
        let Token = window.sessionStorage.getItem('token'); //this.$message.info("The database isn't ready.");
        let result = await this.$http.get('/apip/api/books/borrow/' + key, {
          hearders: {
            'Authorization': Token
          },
        })
          .catch(function (error) {
            if (error.response) {
              status = error.response.status;
              msg = error.response.data.msg;
            }
          });
        this.searchlist = result.data
      });

      this.searchdialogvisible = true


    }
  }
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