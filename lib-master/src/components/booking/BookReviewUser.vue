<template>
    <div class="room_reserves">
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <header class="form_header">用户推荐书籍查询</header>
                <header class="form_header">请输入要查询的用户</header>
                <el-form ref="Userformref" :model="Userform" :rules="UserformRules" label-width="110px" class="demo-now_Data">
                    <el-form-item label="用户ID" prop="userid">
                        <el-input v-model="Userform.userid" placeholder="用户ID"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="Userlook" class="submit_btn">提交申请</el-button>
                </el-form>
                <el-row style="margin-top: 60px;">
                    <header class="form_header">该用户推荐书籍总览</header>
                </el-row>
                <el-table :data="RecommedForm"
                          style="width: 100%"
                          :row-class-name="tableRowClassName">
                    <el-table-column prop="id"
                                     label="编号"
                                     width="180">
                    </el-table-column>
                    <el-table-column prop="recommender"
                                     label="推荐者"
                                     width="180">
                    </el-table-column>
                    <el-table-column prop="name"
                                     label="姓名">
                    </el-table-column>
                    <el-table-column prop="reason"
                                     label="原因">
                    </el-table-column>
                    <el-table-column prop="state"
                                     label="空闲">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                Userform: {
                    userid: '',
                },        
                UserformRules: {
                    userid: [
                    { required: true, message: "请输入用户ID", trigger: "blur" },
                ],
                },
                RecommedForm: JSON.parse(window.sessionStorage.getItem('recommend')),
            }
        },
        methods: {
            tableRowClassName({ row, rowIndex }) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            Userlook() {
                this.$refs.Userformref.validate(async valid => {
                    if (!valid) return;
                    let status = 200;
                    let Token = window.sessionStorage.getItem('token');
                    this.$http.get('/apip/api/recommendations/' + this.Userform.userid, {
                        hearders: {
                            'Authorization': Token,
                        },
                    })
                        .then(function (response) {
                            var data = JSON.stringify(response.data);
                           //alert(data);
                            window.sessionStorage.setItem('recommend', data);
                        }).catch(function (response) {
                            console.log(response);
                        });
                })
             }
        }
    }
</script>

<style lang="less">

    @import '../style/mixin';

    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
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
