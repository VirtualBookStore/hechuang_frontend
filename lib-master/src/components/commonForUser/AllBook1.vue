<template>
  <div
    class="book_search"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <header class="form_header"></header>
    <el-form
      ref="bookFormRef"
      :model="bookForm"
      :rules="bookFormRules"
      label-width="110px"
      class="demo-now_Data"
    >
    </el-form>

    <!-- //todo:此处所需要的值应在props或data中建立，调用接口取出数据 -->
    <div class="book-info">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.title.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
        border
        :stripe="true"
      >
        <el-table-column
          prop="isbn"
          label="ISBN"
          v-model="isbn"
        ></el-table-column>
        <el-table-column prop="title" label="书名"></el-table-column>
        <el-table-column prop="description" label="简介"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="new_total" label="新书数量"></el-table-column>
        <el-table-column prop="old_total" label="旧书数量"></el-table-column>
        <el-table-column
          prop="recommended"
          label="是否推荐"
          :formatter="recommendedFormat"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 点击编辑进入编辑页面进行编辑表格数据 -->
            <el-button
              size="small"
              @click="editData(scope.$index, scope.row)"
              v-if="!isSure"
              >购买</el-button
            >
            <el-dialog
              title="创建订单提示"
              :visible.sync="OrderDialogVisible"
              width="30%"
              center
            >
              <p>您确定要购买该商品吗？确定后您将为您创建相应的订单</p>
              <span>商品名称：{{ title }} 价格：{{ price }}</span>
              <span slot="footer" class="dialog-footer">
                <el-button
                  @click="
                    OrderDialogVisible = false
                    isSure = false
                  "
                  >取 消</el-button
                >
                <el-button
                  type="primary"
                  @click="
                    OrderDialogVisible = false
                    old = false
                    purchase()
                  "
                  >购买新书</el-button
                >
                <el-button
                  type="primary"
                  @click="
                    OrderDialogVisible = false
                    old = true
                    purchase()
                  "
                  >购买旧书</el-button
                >
              </span>
            </el-dialog>
            <el-dialog
              title="购买提示"
              :visible.sync="PayDialogVisible"
              width="30%"
              center
            >
              <p>您确定要购买该商品吗？确定后您将为其付款</p>
              <span>商品名称：{{ title }} 价格：{{ price }}</span>
              <span slot="footer" class="dialog-footer">
                <el-button
                  @click="
                    PayDialogVisible = false
                    isSure = false
                    payFailure()
                  "
                  >取 消</el-button
                >
                <el-button
                  type="primary"
                  @click="
                    PayDialogVisible = false
                    isSure = false
                    paySuccess()
                    pay()
                  "
                  >确定付款</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSure: false,
      isbn: [],
      loading: true,
      tableData: [],
      search: '',
      title: '',
      price: 0,
      form: {},
      orderId: '',
      old: false,
      searchlist: [],
      searchdialogvisible: true,
      OrderDialogVisible: false,
      PayDialogVisible: false,
      Token: window.sessionStorage.getItem('token'),

      //图书表单数据绑定
      bookForm: {
        reader_id: '',
      },
      //表单的验证规则
      bookFormRules: {
        //    验证书名是否合法
        reader_id: [
          { required: true, message: '请输入读者ID', trigger: 'blur' },
        ],
      },
    }
  },
  mounted: function() {
    var _this = this //很重要！！
    this.$http
      .get('/api/v1/book/')
      .then(function(res) {
        console.log(res.data)
        _this.tableData = res.data
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  created() {
    //   设置回调函数，进行1.5秒的loading动画显示
    setTimeout(() => {
      this.loading = false
    }, 1500)
  },
  methods: {
    paySuccess() {
      this.$message({
        message: '购买成功，谢谢您的支持！',
        type: 'success',
      })
    },
    payFailure() {
      this.$message.error('付款失败!')
    },
    //转换“是否推荐”的格式
    recommendedFormat(row, column) {
      if (row.recommended === false) {
        return '未在推荐'
      } else {
        return '正在推荐'
      }
    },
    editData(index, row) {
      console.log('index:' + index)
      this.form = this.tableData[index]
      console.log('form:' + this.form.price)
      this.isSure = true
      console.log(this.form)
      this.title = this.form.title
      this.price = this.form.price
      this.OrderDialogVisible = true
    },

    purchase() {
      this.$http
        .post('/api/v1/book/' + this.form.isbn + '/purchase/', {
          old: this.old,
        })
        .then((res) => {
          console.log(res.data)
          console.log(this.old)
          console.log('orderid:', res.data.id)
          this.orderId = res.data.id
          this.PayDialogVisible = true
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    pay() {
      this.$http
        .patch('/api/v1/order/' + this.orderId + '/pay/', this.form)
        .then(function(res) {
          console.log(res.data)
          location.reload();
        })
        .catch(function(error) {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: rgb(64, 158, 255);
  display: flex;
  justify-content: space-between;
  margin-left: 0;
  padding-left: 0;
}

.el-aside {
  /*background-color: gray;*/
}

.el-main {
  /*background-color: lightgoldenrodyellow;*/
}

.book-info {
  margin-top: 20px;
}
.out-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-name {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
