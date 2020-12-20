<template>
    <div class="room_reserves">
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-row style="margin-top: 60px;">
                    <header class="form_header">未处理推荐管理</header>
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
                    <el-table-column fixed="right"
                                     label="操作"
                                     width="120">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="buyRow(scope.$index, RecommedForm,scope.row)"
                                       type="text"
                                       size="small">
                                已购买
                            </el-button>
                            <el-button @click.native.prevent="passRow(scope.$index, RecommedForm,)"
                                       type="text"
                                       size="small">
                                通过
                            </el-button>
                            <el-button @click.native.prevent="rejectRow(scope.$index, RecommedForm)"
                                       type="text"
                                       size="small">
                                拒绝
                            </el-button>
                        </template>
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
                RecommedForm: JSON.parse(window.sessionStorage.getItem('unrecommend')),
            }
        },
        created()
        {
            this.Userlook();
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
            buyRow(index, rows) {
                rows.splice(index, 1);
                alert(JSON.stringify(rows.id));

            },
            passRow(index, rows) {
                let Token = window.sessionStorage.getItem('token');
                alert(this.$http.get('/apip/api/recommendations/unprocessed', {
                    hearders: {
                        'Authorization': Token,
                    },
                    params: {
                        'recommendId': this.roomForm.room_id,
                        'state': 1,
                    }
                }));
                rows.splice(index, 1);
            },
            rejectRow(index, rows) {
                rows.splice(index, 1);

            },
            Userlook() {
                    let status = 200;
                    let Token = window.sessionStorage.getItem('token');
                this.$http.get('/apip/api/recommendations/unprocessed', {
                        hearders: {
                            'Authorization': Token,
                        },
                    })
                        .then(function (response) {
                            var data = JSON.stringify(response.data);
                           // alert(data);
                            window.sessionStorage.setItem('unrecommend', data);
							let arr = JSON.parse(window.sessionStorage.getItem('unrecommend'));
			                console.log(arr[2].id);
                        }).catch(function (response) {
                            console.log(response);
                        });

            },
			
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
