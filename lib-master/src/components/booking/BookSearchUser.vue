<template>
  <div class="book_search">
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">查询借阅记录</header>
        <el-form
          ref="reviewFormRef"
          :model="reviewForm"
          :rules="reviewFormRules"
          label-width="110px"
          class="demo-now_Data"
        >
          <el-form-item label="读者ID" prop="reader_id">
            <el-input v-model="reviewForm.reader_id" placeholder="读者ID"></el-input>
          </el-form-item>
          <el-button type="primary" @click="review" class="submit_btn">查询</el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog title="借阅日志搜索" :visible.sync="reviewdialogvisible" width="50%">
        <el-table :data="reviewlist" style="width: 100%" border :stripe="true">
            <el-table-column prop="borrow_id" label="序号" width="120"></el-table-column>
            <el-table-column prop="book_id" label="馆藏ID"></el-table-column>
            <el-table-column prop="reader_id" label="读者ID"></el-table-column>
            <el-table-column prop="time_slot_id" label="时间戳"></el-table-column>
            <el-table-column prop="renew" label="续借次数"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
            <el-table-column prop="return_Time" label="换书时间"></el-table-column>   
        </el-table>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="reviewdialogvisible=false">确定</el-button>

        </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                reviewlist:[],
                reviewdialogvisible:false,
                //图书表单数据绑定
                reviewForm: {
                    reader_id: '',
                },
                //表单的验证规则
                reviewFormRules: {
                    //    验证书名是否合法
                    reader_id: [
                        { required: true, message: "请输入读者ID", trigger: "blur" },
                    ],
                }
            }
        },
        methods: {
            //异步操作
            review() {
                this.$refs.reviewFormRef.validate(async valid => {
                    if (!valid) return;
                    let msg = "";
                    let status = 200; 
                    let key = this.reviewForm.reader_id; 
                    let Token = window.sessionStorage.getItem('token'); //this.$message.info("The database isn't ready.");
                    let result = await this.$http.get('/apip/api/books/borrow', {
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
                        this.reviewlist=result.data
                    if (status === 400) {
                        this.$message.info("该人不存在 !");
                    }
                });

                this.reviewdialogvisible=true


            }
        }
    }
</script>

<style scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: rgb(64,158,255);
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

    .out-button{
        display: flex;
        justify-content: center;
        align-items: center;
    }


    .header-name{
        display: flex;
        justify-content: center;
        align-items: center;

    }

</style>