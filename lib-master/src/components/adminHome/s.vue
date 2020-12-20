<template>
  <div class="room_reserves">
    <el-row style="margin-top: 20px;">
      <el-col :span="40"
              :offset="2">
        <header class="form_header"><h1>借阅信息</h1></header>
        <el-table :data="inForm"
				  style="width: 62.5rem"
				  border :stripe="true"
				  :row-style="tableRowStyle"
				  :header-cell-style="tableHeaderColor"
                  :row-class-name="tableRowClassName">
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
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  data () {
    return {
      inForm: JSON.parse(window.sessionStorage.getItem('his')),
    }
  },
  created () {
    this.infshow();
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
    infshow () {
      let Token = window.sessionStorage.getItem('token');
      this.$http.get('/apip/api/books/borrow', {
        hearders: {
          'Authorization': Token,
        },
      })
        .then(function (response) {
          var data = JSON.stringify(response.data);
          window.sessionStorage.setItem('his', data);
        }).catch(function (response) {
          console.log(response);
        });
    }
  }
}
</script>