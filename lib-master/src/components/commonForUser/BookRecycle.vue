<template>
  <div>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">申请回收书籍表</header>
        <el-form
          :model="returnForm"
          :rules="returnrules"
          ref="returnForm"
          label-width="110px"
          class="form return_form"
        >
          <el-form-item label="订单编号" prop="orderid">
            <el-input v-model="returnForm.orderid"></el-input>
          </el-form-item>
          <el-form-item label="ISBN" prop="isbn">
            <el-input v-model="returnForm.isbn"></el-input>
          </el-form-item>
          <el-form-item label="书名" prop="title">
            <el-input v-model="returnForm.title"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="returnForm.description"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="returnForm.price"></el-input>
          </el-form-item>
          <el-form-item label="新书库存" prop="new_total">
            <el-input v-model="returnForm.new_total"></el-input>
          </el-form-item>
          <el-form-item label="旧书库存" prop="old_total">
            <el-input v-model="returnForm.old_total"></el-input>
          </el-form-item>
          <el-form-item label="是否被推荐" prop="recommended">
            <el-input v-model="returnForm.recommended"></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="tag">
            <el-input v-model="returnForm.tag"></el-input>
          </el-form-item>

          <!-- <el-form-item label="出版日期" prop="time_slot_id">
            <el-date-picker
              v-model="returnForm.time_slot_id"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="returns('returnForm')"
              >提交申请</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      RoomForm: JSON.parse(window.sessionStorage.getItem('rea')),
      pickerOptions: {},
      returnForm: {
        orderid: '',
        isbn: '',
        title: '',
        description: '',
        price: '',
        new_total: '',
        old_total: '',
        recommended:'',
        cover:'',
        tag:'',
      },
      returnrules: {
        // name: [{ required: true, message: '请输入书名', trigger: 'blur' }],
        // pid: [{ required: true, message: '请输入书籍位置' }],
      },
    }
  },
  // created() {
  //   this.roomshow()
  // },
  methods: {
    // //异步操作
    // tableRowStyle({ row, rowIndex }) {
    //   return 'background-color:pink;font-size:10px;'
    // },
    // //设置表头行的样式
    // tableHeaderColor({ row, column, rowIndex, columnIndex }) {
    //   return 'background-color:#eef1f6;color:#313131;font-wight:500;font-size:15px;text-align:center'
    // },
    // tableRowClassName({ row, rowIndex }) {
    //   if (rowIndex === 1) {
    //     return 'warning-row'
    //   } else if (rowIndex === 3) {
    //     return 'success-row'
    //   }
    //   return ''
    // },
    // roomshow() {
    //   let status = 200
    //   let Token = window.sessionStorage.getItem('token')
    //   this.$http
    //     .get('/apip/api/recommendations', {
    //       hearders: {
    //         Authorization: Token,
    //       },
    //     })
    //     .then(function(response) {
    //       var data = JSON.stringify(response.data)
    //       //    alert(data);
    //       window.sessionStorage.setItem('rea', data)
    //     })
    //     .catch(function(response) {
    //       console.log(response)
    //     })
    // },
    // // alert(window.sessionStorage.getItem('dat').data.);
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
