<template>
  <div class="basetable"
       v-loading="loading"
       element-loading-text="拼命加载中">
    <!-- v-loading 设置加载 -->
    <div class="selectMenu">
      <!-- 点击触发add方法 -->
      <el-button type="primary"
                 @click="add">新增</el-button>
    </div>
    <div class="tableMain">
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="isbn"
                         label="isbn"></el-table-column>
        <el-table-column prop="title"
                         label="书名"></el-table-column>
        <el-table-column prop="description"
                         label="描述"></el-table-column>
        <el-table-column prop="price"
                         label="价格"></el-table-column>
        <el-table-column prop="new_total"
                         label="新书库存"></el-table-column>
        <el-table-column prop="old_total"
                         label="旧书库存"></el-table-column>
        <el-table-column prop="recommended"
                         label="是否被推荐"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 点击编辑进入编辑页面进行编辑表格数据 -->
            <el-button size="small"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <!-- 下面这个用来设置点击添加按钮的弹出框，里面可以进行嵌套表格来展示弹出的表格信息,使用下面的:visible.sync来控制显示与否 -->
    <!-- 里面绑定的是我们新设置的值，填写完成后，将我们这个新值塞到页面中所有的数据当中去 -->
    <el-dialog title="用户信息"
               :visible.sync="dialogFormVisible">
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :model="form">
        <el-form-item label="描述"
                      :label-width="formLabelWidth">
          <el-input v-model="form.description"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格"
                      :label-width="formLabelWidth">
          <el-input v-model="form.price"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新书库存"
                      :label-width="formLabelWidth">
          <el-input v-model="form.new_total"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="二手库存"
                      :label-width="formLabelWidth">
          <el-input v-model="form.old_total"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="推荐状态"
                      :label-width="formLabelWidth">
          <el-input v-model="form.recommended"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary"
                   @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      loading: true,
      //   表格的数据
      tableData: [
        {
          isbn: "士兵76",
          title: "男",
          description: "国王大道",
          price: "500",
          new_total: "5",
          old_total: "5",
          recommended: "false"
        }
      ],
      dialogFormVisible: false,
      formLabelWidth: "80px",
      // 设置form用于进行添加的时候绑定值
      form: {},
      value6: "",
      currentPage3: 1,
      currentIndex: ""
    };
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
    // 增加数据的方式，单独的设置一些值，用于增加功能，这些值放在对象里面进行设置，然后将这个新增的对象塞到总数据里面
    add () {
      this.form = {

      };
      //   设置点击按钮之后进行显示对话框
      this.dialogFormVisible = true;
    },
    update () {
      //   this.form.date = reformat(this.form.date);
      //    可以在html上面进行设置日期的格式化
      //   将我们添加的信息提交到总数据里面
      this.tableData.push(this.form);
      this.dialogFormVisible = false;
    },
    handleEdit (index, row) {
      // 将数据的index传递过来用于实现数据的回显
      this.form = this.tableData[index];
      this.currentIndex = index;
      // 设置对话框的可见
      this.dialogFormVisible = true;
    },
    handleDelete (index, row) {
      // 设置类似于console类型的功能
      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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