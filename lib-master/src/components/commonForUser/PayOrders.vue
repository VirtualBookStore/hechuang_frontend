<template>
  <div class="book-info">
    <el-table :data="orders" style="width: 100%" border :stripe="true">
      <el-table-column prop="id" label="订单编号"></el-table-column>
      <el-table-column prop="book.isbn" label="ISBN"></el-table-column>
      <el-table-column prop="book.title" label="书名"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="status" label="订单状态"></el-table-column>
      <el-table-column
        prop="time"
        label="订单创建时间"
        width="150px"
      ></el-table-column>
      <!-- <el-table-column
        prop='old'
        label="新书/旧书"
      ></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="
              editData(scope.$index, scope.row)
              PayDialogVisible = true
            "
            >支付</el-button
          >

          <el-dialog
            title="确认收货提示"
            :visible.sync="PayDialogVisible"
            width="30%"
            center
          >
            <p>您要确定付款吗？</p>
            <span>商品名称：{{ title }} 价格：{{ price }}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="PayDialogVisible = false">取消</el-button>
              <el-button
                type="primary"
                @click="
                  PayDialogVisible = false
                  payOrder()
                  paySuccess()
                "
                >确认付款</el-button
              >
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      RoomForm: JSON.parse(window.sessionStorage.getItem('rea')),
      pickerOptions: {},
      orders: [],
      title: '',
      price: 0,
      message: '',
      status: '',
      form: {},
      PayDialogVisible: false,
    }
  },

  mounted: function() {
    var _this = this //很重要！！
    this.$http
      .get('/api/v1/order/')
      .then(function(res) {
        console.log('orders:', res.data)
        for (let order in res.data) {
          console.log(res.data[order])
          res.data[order].price /= 100
          if (res.data[order].status === '待支付') {
            // console.log(order)
            _this.orders.push(res.data[order])
          }
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  methods: {
    paySuccess() {
      this.$message({
        message: '购买成功，谢谢您的支持！',
        type: 'success',
      })
    },
    editData(index, row) {
      console.log('index:' + index)
      this.form = this.orders[index]
      console.log(this.form)
      this.title = this.form['book'].title
      this.price = this.form['book'].price
      this.status = this.form['status']
      console.log(this.status)
    },

    payOrder() {
      this.$http
        .patch('/api/v1/order/' + this.form.id + '/pay/')
        .then((res) => {
          console.log(res.data)
          location.reload()
        })
        .catch(function(error) {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="less">
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
