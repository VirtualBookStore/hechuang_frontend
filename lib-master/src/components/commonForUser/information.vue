<template>
  <div class="room_reserves">
    <el-row style="margin-top: 20px;">
      <el-col :span="40"
              :offset="2">
        <header class="form_header"><h1>用户基本信息</h1></header>
        <el-table :data="inForm"
                  style="width: 1000px"
				  border :stripe="true"
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
          <el-table-column prop="Credit_Score"
                           label="信用分">
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
      inForm: JSON.parse(window.sessionStorage.getItem('rme')),
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
      this.$http.get('/apip/api/home/info', {
        hearders: {
          'Authorization': Token,
        },
      })
        .then(function (response) {
          var data = JSON.stringify(response.data);
          window.sessionStorage.setItem('rme', data);
        }).catch(function (response) {
          console.log(response);
        });
    }
  }
}
</script>
<style>
	.room_reserves {
		/* height: 200%;
		width: 100%; */
		background-size: cover;
		background-color:white;
	    /* background: url(../../assets/img/head_bg.jpg) top center; */
	        /* background-attachment: scroll;
	    background-attachment: fixed; */
	    height: 1018px;
	    padding-top: 32px;
	}
	.el-main{
		padding:0px;
	}
</style>