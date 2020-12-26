<template>
  <el-table :data="tableData"
            border
            style="width: 100%">
    <el-table-column fixed
                     prop="date"
                     label="日期"
                     width="150">
    </el-table-column>
    <el-table-column prop="name"
                     label="用户名"
                     width="120">
    </el-table-column>
    <el-table-column prop="province"
                     label="订单"
                     width="120">
    </el-table-column>
    <el-table-column prop="city"
                     label="书籍"
                     width="120">
    </el-table-column>
    <el-table-column prop="address"
                     label="地址"
                     width="300">
    </el-table-column>
    <el-table-column prop="zip"
                     label="邮编"
                     width="120">
    </el-table-column>
    <el-table-column fixed="right"
                     label="操作"
                     width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)"
                   type="text"
                   size="small">查看</el-button>
        <el-button type="text"
                   size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      RoomForm: JSON.parse(window.sessionStorage.getItem('rea')),
    }
  },
  created () {
    this.roomshow();
  },
  methods: {
    //异步操作
    tableRowStyle ({ row, rowIndex }) {
      return 'background-color:pink;font-size:10px;'
    },
    //设置表头行的样式
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      return 'background-color:#eef1f6;color:#313131;font-wight:500;font-size:15px;text-align:center'

    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    roomshow () {
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
@import "../style/mixin";

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
