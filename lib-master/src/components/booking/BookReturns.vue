<template>
    <div class="book_borrows">
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <header class="form_header">返还图书</header>
                <el-form ref="bookFormRef" :model="bookForm" :rules="bookFormRules" label-width="110px" class="demo-now_Data">
                    <el-form-item label="图书ID" prop="book_id">
                        <el-input v-model="bookForm.book_id" placeholder="书籍ID"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="booking" class="submit_btn">提交申请</el-button>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //登录表单数据绑定
                bookForm: {
                    book_id: '',
                },
                //表单的验证规则
                bookFormRules: {
                    //    验证用户名是否合法
                    book_id: [
                        { required: true, message: "请输入书籍名称", trigger: "blur" },
                    ],
                }
            }
        },
        methods: {
            //异步操作
            booking() {
                this.$refs.bookFormRef.validate(async valid => {
                    if (!valid) return;
                    let status = 200;
                    let Token = window.sessionStorage.getItem('token');
                    let result = await this.$http.post('/apip/api/books/return?bookId=' + this.bookForm.book_id, {
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
                    if (status === 400) {
                        this.$message.info("该书ID不存在 !");
                    }
                        else {
                            let borrow_id = "" + result.data.borrow_id;
                            if (borrow_id == "undefined")
                                this.$message.info("还书失败！");
                            else
                                this.$message.info("还书成功！");
                        }
                });
            }
        }
    }
</script>

<style lang="less">

    @import '../style/mixin';

    .button_submit {
        text-align: center;
    }

    .form_header {
        text-align: center;
        margin-bottom: 30px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

        .avatar-uploader .el-upload:hover {
            border-color: #20a0ff;
        }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }

    .el-table .info-row {
        background: #c9e5f5;
    }

    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>
