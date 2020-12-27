<template>
    <div>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
  				<header class="form_header">新增图书</header>
                <el-form :model="returnForm" :rules="returnrules" ref="returnForm" label-width="110px" class="form return_form">
                    <el-form-item label="书名" prop="name">
                        <el-input v-model="returnForm.name"></el-input>
                    </el-form-item>
					<el-form-item label="作者" prop="aname">
					    <el-input v-model="returnForm.aname"></el-input>
					</el-form-item>
					<el-form-item label="出版社" prop="pname">
					    <el-input v-model="returnForm.pname"></el-input>
					</el-form-item>
					<el-form-item label="ISBN" prop="isbn">
					    <el-input v-model="returnForm.isbn"></el-input>
					</el-form-item>
					<el-form-item label="简介" prop="intro">
					    <el-input v-model="returnForm.intro"></el-input>
					</el-form-item>
					<el-form-item label="位置ID" prop="pid">
					    <el-input v-model="returnForm.pid"></el-input>
					</el-form-item>
                    <el-form-item label="出版日期" prop="time_slot_id">
                        <el-date-picker v-model="returnForm.time_slot_id"
                                        align="right"
                                        type="date"
										value-format="yyyy-MM-dd"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="returns('returnForm')">新增</el-button>
                    </el-form-item>
                </el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
    export default {
    	data(){
    		return {
				pickerOptions: {},
    			returnForm: {
    				name: '',
					aname:'',
					pname:'',
					isbn:'',
					intro:'',
					pid: '',
    				time_slot_id: '',
    			},
    			returnrules: {
                    name: [
						{ required: true, message: '请输入书名', trigger: 'blur' },
                    ],
                    pid: [
                        { required: true, message: '请输入书籍位置'},
                    ],
    			},
    		}
    	},

    	computed: {
    	},
    	methods: {
    		
		    // returns(returnForm){
		    // 	this.$refs[returnForm].validate(async (valid) => {
				// 	if (valid) {
				// 		let place = parseInt(this.returnForm.pid);
						
				// 		let Token = window.sessionStorage.getItem('token');
				// 		const data = {
				// 			book_name: this.returnForm.name,
				// 			author: this.returnForm.aname,
				// 			publishing_house:this.returnForm.pname,
				// 			isbn:this.returnForm.isbn,
				// 			publication_date:this.returnForm.time_slot_id,
				// 			introduction:this.returnForm.intro,
				// 			state:0,
				// 			place_id:place,
				// 		}
				// 		try{
				// 			const result = await this.$http.post('/apip/api/books',data,{
        //             hearders: {
        //                 'Authorization': Token,
        //             },}).catch(function (error)
        //             {
        //                 if (error.response)
        //                 {
        //                     status = error.response.status;
        //                     msg = error.response.data.msg;
        //                 }
        //             });
				// 	console.log(result.data.id);		
				// 			if (result.data.id != 0) {
				// 				console.log(result)
				// 				this.$message({
				// 	            	type: 'success',
				// 	            	message: 'registration succeed',
				// 	          	});window.location.reload();
				// 			}else{
				// 				this.$message({
				// 	            	type: 'error',
				// 	            	message: 'registration failed',
									
				// 	          	});window.location.reload();
				// 			}
				// 		}catch(err){
				// 			console.log(err)
				// 		}
				// 	} else {
				// 		this.$notify.error({
				// 			title: 'error',
				// 			message: 'Please check register info',
				// 			offset: 100
				// 		});
				// 		return false;
				// 	}
				// });
		    // }
		}
    }</script>

<style lang="less">
	@import '../style/mixin';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.return_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
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
	.cell{
		text-align: center;
	}
</style>
