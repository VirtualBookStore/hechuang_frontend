<template>
  <div class="basetable"
       v-loading="loading"
       element-loading-text="拼命加载中">
    <!-- v-loading 设置加载 -->
    <div class="tableMain">
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="isbn"
                         label="isbn"
                         min-width="70%"></el-table-column>
        <el-table-column prop="title"
                         label="书名"
                         min-width="70%"></el-table-column>
        <el-table-column prop="description"
                         label="描述"
                         min-width="90%"></el-table-column>
        <el-table-column prop="price"
                         label="价格"
                         min-width="40%"></el-table-column>
        <el-table-column prop="new_total"
                         label="新书库存"
                         min-width="50%"></el-table-column>
        <el-table-column prop="old_total"
                         label="旧书库存"
                         min-width="50%"></el-table-column>
        <el-table-column prop="recommended"
                         label="是否被推荐"
                         :formatter="recommendedFormat"
                         min-width="60%"></el-table-column>
        <el-table-column label="操作">
          <template slot="header"
                    slot-scope="scope">
            <el-input v-model="search"
                      size="mini"
                      placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="small"
                       @click="agree">同意</el-button>
            <el-button size="small"
                       @click="disagree">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    };
  },
  mounted: function () {
    var _this = this   //很重要！！
    this.$http.get('/api/v1/book/')
      .then(function (res) {
        console.log(res.data);
        _this.tableData = res.data
      })
      .catch(function (error) {
        console.log(error);
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
    recommendedFormat (row, column) {
      if (row.recommended === false) {
        return '未在推荐'
      } else {
        return '正在推荐'
      }
    },
    update () {
      this.$http.patch('/api/v1/book/' + this.form.isbn + '/', this.form)
        .then(function (res) {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      location.reload();
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