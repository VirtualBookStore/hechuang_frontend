<template>
  <div class="reader_reserves">
    <el-row style="margin-top: 20px;">
      <el-col :span="40"
              :offset="2">
        <header class="form_header"><h1>读者列表</h1></header>
        <el-table :data="readerForm"
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
          <el-table-column prop="credit_Score"
                           label="信用分"
                           width="180">
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
      readerForm: JSON.parse(window.sessionStorage.getItem('rdlist')),
    }
  },
  created () {
    this.readershow();
  },
  methods: {
	  tableRowStyle({row,rowIndex}){
	                  return 'background-color:pink;font-size:10px;'
	              },
	              //设置表头行的样式
	              tableHeaderColor({row,column,rowIndex,columnIndex}){
	                  return 'background-color:#eef1f6;color:#313131;font-wight:500;font-size:15px;text-align:center'
	  
	              },
    tableRowClassName ({ row, rowIndex }) { },
    readershow () {
      let Token = window.sessionStorage.getItem('token');
      this.$http.get('/apip/api/adminop/getreaderlist ', {
        hearders: {
          'Authorization': Token,
        },
      })
        .then(function (response) {
          var data = JSON.stringify(response.data);
          var len = data.length;
          data = data.substring(27, len - 1);
          window.sessionStorage.setItem('rdlist', data);
        }).catch(function (response) {
          console.log(response);
        });
    }
  }
}
</script>
<style>
	.reader_reserves {
		background-color:white;
	}

</style>
