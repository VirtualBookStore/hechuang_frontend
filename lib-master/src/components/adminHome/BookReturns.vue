<template>
  <div class="basetable"
       v-loading="loading"
       element-loading-text="拼命加载中">
    <!-- v-loading 设置加载 -->
    <div class="selectMenu">
      <!-- 点击触发add方法 -->
      <el-button type="primary"
                 @click="add"
                 style="float:right">新增</el-button>
    </div>
    <div class="tableMain">
      <el-table :data="tableData.filter(data => !search || data.user.username.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
        <el-table-column prop="id"
                         label="订单编号"
                         min-width="70%"></el-table-column>
        <el-table-column prop="book.title"
                         label="书名"
                         min-width="70%"></el-table-column>
        <el-table-column prop="status"
                         label="订单状态"
                         min-width="90%"></el-table-column>
        <el-table-column prop="price"
                         label="订单金额"
                         min-width="70%"></el-table-column>
        <el-table-column prop="number"
                         label="数量"
                         min-width="50%"></el-table-column>
        <el-table-column prop="user.username"
                         label="下单用户"
                         min-width="70%"></el-table-column>
        <el-table-column prop="old"
                         label="书籍类别"
                         :formatter="oldFormat"
                         min-width="70%"></el-table-column>
        <el-table-column label="操作">
          <template slot="header"
                    slot-scope="scope">
            <el-input v-model="search"
                      size="mini"
                      placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <!-- 点击编辑进入编辑页面进行编辑表格数据 -->
            <el-button size="small"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="currentPage3"
                     :page-size="100"
                     layout="prev, pager, next, jumper"
                     :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
var ad = 1;
export default {
  data () {
    return {
      loading: true,
      //   表格的数据
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "80px",
      // 设置form用于进行添加的时候绑定值
      form: {},
      value6: "",
      currentPage3: 1,
      currentIndex: "",
      search: ''
    };
  },
  mounted: function () {
    var _this = this   //很重要！！
    this.$http.get('/api/v1/order/')
      .then(function (res) {
        console.log("data:",res.data)
        for(let item in res.data){
          res.data[item].price/=100
        }
        _this.tableData = res.data
      })
      .catch(function (error) {
      });
  },
  created () {
    //   设置回调函数，进行1.5秒的loading动画显示
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  },
  methods: {
    showTime () {
      this.$alert(this.value6, "起止时间", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: "已显示"
          });
        }
      });
    },
    oldFormat (row, column) {
      if (row.old === false) {
        return '二手书'
      } else {
        return '新书'
      }
    },
    // 增加数据的方式，单独的设置一些值，用于增加功能，这些值放在对象里面进行设置，然后将这个新增的对象塞到总数据里面
    add () {
      ad = 2;
      this.form = {

      };
      //   设置点击按钮之后进行显示对话框
      this.dialogFormVisible = true;
    },
    update () {
      console.log(this.form)
      if (ad === 1) {
        this.$http.patch('/api/v1/book/' + this.form.isbn + '/', this.form)
          .then(function (res) {
            console.log(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        location.reload();
      }
      else {
        this.$http.post('/api/v1/book/', this.form)
          .then(function (res) {
            console.log(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        ad = 1;
        location.reload();
      }
      /*  this.tableData.push(this.form);
       this.dialogFormVisible = false; */
    },
    handleEdit (index, row) {
      // 将数据的index传递过来用于实现数据的回显
      this.form = this.tableData[index];
      this.currentIndex = index;
      // 设置对话框的可见
      this.dialogFormVisible = true;
    },
    cancel () {
      // 取消的时候直接设置对话框不可见即可
      this.dialogFormVisible = false;
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>