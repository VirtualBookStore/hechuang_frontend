<template>

    <el-table :data="orders" style="width: 100%" border :stripe="true">
      <el-table-column prop="id" label="订单编号"></el-table-column>
      <el-table-column prop="book.isbn" label="ISBN"></el-table-column>
      <el-table-column prop="book.title" label="书名"></el-table-column>
      <el-table-column prop="price" label="价格(元)"></el-table-column>
      <el-table-column prop="status" label="订单状态"></el-table-column>
      <el-table-column
        prop="time"
        label="订单创建时间"
        width="200px"
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
              checkStatus()
            "
            >回收</el-button
          >

          <el-dialog
            title="创建订单提示"
            :visible.sync="RecycleDialogVisible"
            width="30%"
            center
          >
            <p>您确定要回收该订单中的书籍吗？</p>
            <span>商品名称：{{ title }} 回收价格：{{ price*(1-recycle_rate).toFixed(1) }}</span>
            <el-input placeholder="请输入回收原因" v-model="message" clearable>
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="RecycleDialogVisible = false"
                >我再想想</el-button
              >
              <el-button
                type="primary"
                @click="
                  RecycleDialogVisible = false
                  submitForm()
                "
                >确认回收</el-button
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
      recycle_rate:0,
      message: '',
      status: '',
      old: false,
      form: {},
      RecycleDialogVisible: false,
    }
  },

  mounted: function() {
    var _this = this //很重要！！
    this.recycle_rate = window.sessionStorage.getItem('recycle_rate')
    this.$http
      .get('/api/v1/order/')
      .then(function(res) {
        console.log('orders:', res.data)
        for(let item in res.data){
          res.data[item].price/=100
        }
        _this.orders = res.data
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  methods: {
    bookTypeFormate(row) {
      if (row.old) {
        return '旧书'
      } else return '新书'
    },
    editData(index, row) {
      console.log('index:' + index)
      this.form = this.orders[index]
      console.log(this.form)
      this.title = this.form['book'].title
      this.price = this.form.price
      this.status = this.form['status']
      this.old = this.form['old']
      console.log(this.status)
      console.log(this.old)
    },
    // checkBookOld(){
    //   if (this.old === 'true') {
    //     this.RecycleDialogVisible = true
    //   } else {
    //     this.$message({
    //       showClose: true,
    //       message: '订单状态不为已完成，无法进行回收！',
    //       type: 'error',
    //     })
    //   }
    // },
    checkStatus() {
      if(this.old === true){
        this.$message({
          showClose: true,
          message: '该书籍已经为二手书，无法再次进行回收！',
          type: 'error',
        })
        return
      } 
      if (this.status === '已完成') {
        this.RecycleDialogVisible = true
      } 
      else {
        this.$message({
          showClose: true,
          message: '订单状态不为已完成，无法进行回收！',
          type: 'error',
        })
      }
    },
    submitForm() {
      this.$http
        .post(
          '/api/v1/order/' + this.form.id + '/recycle/',
          {"message":this.message}
        )
        .then((res) => {
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
