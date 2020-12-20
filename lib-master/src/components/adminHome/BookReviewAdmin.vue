<template>
    <div class="room_reserves">
        <el-row style="margin-top: 15px;">
            <el-col :span="40" :offset="2">
                <header class="form_header"><h1>书籍推荐总览</h1></header>
                <el-table :data="RoomForm"
						  style="width: 62.5rem"
						  border :stripe="true"
						  :row-style="tableRowStyle"
						  :header-cell-style="tableHeaderColor"
                          :row-class-name="tableRowClassName">
                    <el-table-column prop="id"
                                     label="推荐号"
                                     width="180">
                    </el-table-column>
                    <el-table-column prop="recommender"
                                     label="推荐人ID"
                                     width="180">
                    </el-table-column>
                    <el-table-column prop="name"
                                     label="推荐人名字">
                    </el-table-column>
                    <el-table-column prop="reason"
                                     label="推荐理由">
                    </el-table-column>
                    <el-table-column prop="state"
                                     label="审核状态">
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
                RoomForm: JSON.parse(window.sessionStorage.getItem('rea')),
            }
        },
        created() {
            this.roomshow();
        },
        methods: {
            //异步操作
			tableRowStyle({row,rowIndex}){
			                return 'background-color:pink;font-size:10px;'
			            },
			            //设置表头行的样式
			            tableHeaderColor({row,column,rowIndex,columnIndex}){
			                return 'background-color:#eef1f6;color:#313131;font-wight:500;font-size:15px;text-align:center'
			
			            },
            tableRowClassName({ row, rowIndex }) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            roomshow() {
                let status = 200;
                let Token = window.sessionStorage.getItem('token');
                this.$http.get('/apip/api/recommendations', {
                    hearders: {
                        'Authorization': Token,
                    },
                })
                    .then(function (response) {
                        var data = JSON.stringify(response.data);
                    //    alert(data);
                        window.sessionStorage.setItem('rea', data);
                    }).catch(function (response) {
                        console.log(response);
                    });
            }
            // alert(window.sessionStorage.getItem('dat').data.);
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
