<template>
  <div class="basetable"
       v-loading="loading"
       element-loading-text="拼命加载中">

    <div class="tableMain">
      <el-table :data="tableData.filter(data => !search || data.order.user.username.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
        <el-table-column prop="order.id"
                         label="编号"
                         min-width="30%"></el-table-column>
        <el-table-column prop="order.book.title"
                         label="书名"
                         min-width="70%"></el-table-column>
        <el-table-column prop="price"
                         label="回收金额"
                         min-width="60%"
                         :formatter="priceFormat"></el-table-column>
        <el-table-column prop="number"
                         label="数量"
                         min-width="40%"></el-table-column>
        <el-table-column prop="order.user.username"
                         label="申请用户"
                         min-width="70%"></el-table-column>
        <el-table-column prop="message"
                         label="申请信息"
                         min-width="70%"></el-table-column>
        <el-table-column label="操作">
          <template slot="header"
                    slot-scope="scope">
            <el-input v-model="search"
                      size="mini"
                      placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <p>
              <el-button size="small"
                         @click="disagree(scope.$index)">拒绝
              </el-button>
            </p>
            <p>
              <el-button size="small"
                         @click="agree(scope.$index)">同意
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
    this.$http.get('/api/v1/recycle/?read=false')
      .then(function (res) {
        for (let order in res.data) {
          if (res.data[order].order.status === '申请回收中') {
            _this.tableData.push(res.data[order])
          }
        }
        console.log(res.data)
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
    priceFormat (row, column) {

      return row.price / 100

    },

    // 增加数据的方式，单独的设置一些值，用于增加功能，这些值放在对象里面进行设置，然后将这个新增的对象塞到总数据里面
    add () {
    },
    agree (index) {
      var _this = this;
      this.$http.patch('/api/v1/order/' + _this.tableData[index].order.id + '/recycle/check/',
        {
          allowed: "true"
        })
        .then(function (res) {
          console.log(res.data);
          location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    disagree (index) {
      var _this = this;
      this.$http.patch('/api/v1/order/' + _this.tableData[index].order.id + '/recycle/check/',
        {
          allowed: "false"
        })
        .then(function (res) {
          console.log(res.data);
          location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
</script>