<template>
  <div>
    <div class="selectMenu">
      <!-- 点击触发add方法 -->
      <el-button type="primary"
                 @click="readAll"
                 style="float:right">一键已读</el-button>
    </div>
    <el-table :data="notifications"
              style="width: 100%"
              border
              :stripe="true">
      <el-table-column prop="id"
                       label="通知编号"></el-table-column>
      <el-table-column prop="actor.id"
                       label="订单编号"></el-table-column>
      <el-table-column prop="actor.book.title"
                       label="书名"></el-table-column>
      <el-table-column prop="actor.status"
                       label="订单状态"></el-table-column>
      <el-table-column prop="verb"
                       label="通知"></el-table-column>
      <el-table-column prop="timestamp"
                       label="通知时间"></el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-button size="small">阅读</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      RoomForm: JSON.parse(window.sessionStorage.getItem('rea')),
      pickerOptions: {},
      orders: [],
      title: '',
      orderId: '',
      price: 0,
      message: '',
      status: '',
      form: {},
      notifications: [],
      RecycleDialogVisible: false,
    }
  },

  mounted: function () {
    var _this = this //很重要！！
    this.$http
      .get('/api/v1/notification/')
      .then(function (res) {
        console.log('orders:', res.data)
        _this.notifications = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    readAll () {
      this.$http
        .patch('/api/v1/notification/mark-all-read/')
        .then((res) => {
          console.log(res.data)
          location.reload()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    editData (index, row) {
      console.log('index:' + index)
      this.form = this.orders[index]
      console.log(this.form)
      this.title = this.form['book'].title
      this.price = this.form['book'].price
      this.status = this.form['status']
      console.log(this.status)
    },
    checkStatus () {
      if (this.status === '已完成') {
        this.RecycleDialogVisible = true
      } else {
        this.$message({
          showClose: true,
          message: '订单状态不为已完成，无法进行回收！',
          type: 'error',
        })
      }
    },
    submitForm () {
      this.$http
        .post('/api/v1/order/' + this.form.id + '/recycle/', this.message)
        .then((res) => {
          console.log(res.data)
          location.reload()
        })
        .catch(function (error) {
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