<template>
  <div class="room_reserves">
    <el-row style="margin-top: 20px;">
      <el-col :span="40"
              :offset="2">
        <header class="form_header">
          <h1>用户基本信息</h1>
        </header>
        <el-table :data="inForm"
                  style="width: 62.5rem"
                  border
                  :stripe="true"
                  :row-style="tableRowStyle"
                  :header-cell-style="tableHeaderColor"
                  :row-class-name="tableRowClassName">
          <el-table-column prop="ID"
                           label="ID">
          </el-table-column>
          <el-table-column prop="Name"
                           label="用户名">
          </el-table-column>
          <el-table-column prop="Contact"
                           label="联系电话">
          </el-table-column>
          <el-table-column prop="Gender"
                           label="性别">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  data () {
    return {
      inForm: JSON.parse(window.sessionStorage.getItem('me')),
    }
  },
  created () {
    this.infshow();
  },
  methods: {
    tableRowStyle ({ row, rowIndex }) {
      return 'background-color:pink;font-size:10px;'
    },
    //设置表头行的样式
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      return 'background-color:#eef1f6;color:#313131;font-wight:500;font-size:15px;text-align:center'

    },
    tableRowClassName ({ row, rowIndex }) { },
    infshow () {
      let Token = window.sessionStorage.getItem('token');
      this.$http.get('/apip/api/home/info', {
        hearders: {
          'Authorization': Token,
        },
      })
        .then(function (response) {
          var data = JSON.stringify(response.data);
          window.sessionStorage.setItem('me', data);
        }).catch(function (response) {
          console.log(response);
        });
    }
  }
}
</script>