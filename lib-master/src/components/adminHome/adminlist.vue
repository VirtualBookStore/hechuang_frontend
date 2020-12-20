<template>
  <div class="admin_reserves">
    <el-row style="margin-top: 20px;">
      <el-col :span="40"
              :offset="2">
        <header class="form_header"><h1>管理员列表</h1></header>
        <el-table :data="adminForm"
				  style="width: 62.5rem"
				  border :stripe="true"
				  :row-style="tableRowStyle"
				  :header-cell-style="tableHeaderColor"
                  :row-class-name="tableRowClassName">
          <el-table-column prop="id"
                           label="ID"
                           width="180">
          </el-table-column>
          <el-table-column prop="name"
                           label="用户名">
          </el-table-column>
          <el-table-column prop="contact"
                           label="联系电话">
          </el-table-column>
          <el-table-column prop="gender"
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
      adminForm: JSON.parse(window.sessionStorage.getItem('adlist')),
    }
  },
  created () {
    this.adminshow();
  },
  methods: {
	  tableRowStyle({row,rowIndex}){
	                  return 'background-color:pink;font-size:10px;'
	              },
	              //设置表头行的样式
	              tableHeaderColor({row,column,rowIndex,columnIndex}){
	                  return 'background-color:#eef1f6;color:#313131;font-wight:500;font-size:15px;text-align:center'
	  
	              },
    tableRowClassName ({ row, rowIndex }) {
    },
    adminshow () {
      let Token = window.sessionStorage.getItem('token');
      this.$http.get('/apip/api/adminop/getadminlist  ', {
        hearders: {
          'Authorization': Token,
        },
      })
        .then(function (response) {
          var data = JSON.stringify(response.data);
          window.sessionStorage.setItem('adlist', data);
        }).catch(function (response) {
          console.log(response);
        });
    }
  }

}
</script>
