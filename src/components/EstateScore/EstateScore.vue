<template>
  <div>
	  <div v-show="!is_show_score_swi">
	    <el-button type="text" @click="is_show_score(true)">添加评分</el-button>
	    <el-table
	      v-loading="is_loading_score_tab"
	      :data="score_data.list"
	      border
	      tooltip-effect="dark"
	      style="font-size:12px!important;margin-top:20px">
	      <el-table-column
	        prop="time"
	        label="评分时间"
	        min-width="100">
	      </el-table-column>
	      <el-table-column
	        prop="gczl"
	        label="工程质量"
	        min-width="60">
	      </el-table-column>
	      <el-table-column
	        prop="ghsj"
	        label="规划设计"
	        width="150">
	      </el-table-column>
	      <el-table-column
	        prop="ghls"
	        label="规划落实"
	        min-width="60">
	      </el-table-column>
	      <el-table-column
	        prop="zbpt"
	        label="周边配套"
	        min-width="60">
	      </el-table-column>
	      <el-table-column
	        prop="reporter"
	        label="发布人"
	        min-width="60">
	      </el-table-column>
	      <el-table-column
	        min-width="100"
	        label="操作">
	        <template scope="scope">
	          <el-button
	            size="small"
	            @click="handleScore(scope.$index, scope.row,1)">
	            查看
	          </el-button>
	          <el-button
	          size="small"
	          @click="handleScore(scope.$index, scope.row,2)">
	            删除
	          </el-button>
	        </template>
	      </el-table-column>
	    </el-table>
	    <el-pagination
          v-show="score_data.rowCount>0"
          style="margin: 0 auto;text-align:center;margin-top:20px"
          layout="prev, pager, next"
          :page-size=10
          :currentPage="currentPage"
          @current-change="scoreCurrentChange"
          :total="score_data.rowCount">
        </el-pagination>
	  </div>
	  <div v-if="is_show_score_swi" style="padding:20px">
	  	<el-button type="text"  @click="is_show_score(false)">返回列表</el-button>
	    <el-form  :model="add_new_score_form" :rules="add_new_score_form_rule" ref="add_new_score_form_ref" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:20px">
	      <el-form-item label="工程质量"  prop="gczl">
	        <el-input style="width:300px" v-model="add_new_score_form.gczl"></el-input>
	        <span style="font-size:12px;color:#999;">例：8或8.2</span>
	      </el-form-item>
	      <el-form-item label="评分概述">
	        <el-input style="width:500px" type="textarea" v-model="add_new_score_form.gczl_detail"></el-input>
	      </el-form-item>
	      <el-form-item label="规划设计" prop="ghsj">
	        <el-input style="width:300px" v-model="add_new_score_form.ghsj"></el-input>
	        <span style="font-size:12px;color:#999;">例：8或8.2</span>
	      </el-form-item>
	      <el-form-item label="评分概述">
	        <el-input style="width:500px" type="textarea"  v-model="add_new_score_form.ghsj_detail"></el-input>
	      </el-form-item>
	      <el-form-item label="规划落实" prop="ghls">
	        <el-input style="width:300px" v-model="add_new_score_form.ghls"></el-input>
	        <span style="font-size:12px;color:#999;">例：8或8.2</span>
	      </el-form-item>
	      <el-form-item label="评分概述">
	        <el-input style="width:500px" type="textarea"  v-model="add_new_score_form.ghls_detail"></el-input>
	      </el-form-item>
	      <el-form-item label="周边配套" prop="zbpt">
	        <el-input style="width:300px" v-model="add_new_score_form.zbpt"></el-input>
	        <span style="font-size:12px;color:#999;">例：8或8.2</span>
	      </el-form-item>
	      <el-form-item label="评分概述">
	        <el-input style="width:500px" type="textarea" v-model="add_new_score_form.zbpt_detail"></el-input>
	      </el-form-item>
	    </el-form>
	    <div style="text-align:center;margin-bottom:50px;width:80%">
	      <el-button type="primary"  @click="sure_add_score('add_new_score_form_ref')">保存</el-button>
	    </div>
	  </div>
  </div>
</template>

<script>
	export default{
		name:'',
		components:{

		},
		data(){
		      var scopeValidateGczl = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请为工程质量评分'));
		        }else{
		          callback();
		        }
		      };
		      var scopeValidateGhsj = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请为规划设计评分'));
		        }else{
		          callback();
		        }
		      };
		      var scopeValidateGhls = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请为规划落实评分'));
		        }else{
		          callback();
		        }
		      };
		      var scopeValidateZbpt = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请为周边配套评分'));
		        }else{
		          callback();
		        }
		      }; 
			return{
				currentPage:1,
				is_loading_score_tab:false,
				//楼盘评分数据
		        score_data:{
		          list:[{

		          }],
		          rowCount:1,
		        },
		        form:{
					pageIndex:'',
					pageSize:10
		        },
		        //添加新的评分表单
		        add_new_score_form:{
		          gczl:'',
		          gczl_detail:'',
		          ghsj:'',
		          ghsj_detail:'',
		          ghls:'',
		          ghls_detail:'',
		          zbpt:'',
		          zbpt_detail:''
		        },
		        is_loading_score_tab:false,//报告表格loading
		        is_show_score_swi:false,//是否显示添加评分
		        //楼盘评分规则
		        add_new_score_form_rule:{
		          gczl: [
		            { validator: scopeValidateGczl, trigger: 'blur' }
		          ],
		          ghsj: [
		            { validator: scopeValidateGhsj, trigger: 'blur' }
		          ],
		          ghls: [
		            { validator: scopeValidateGhls, trigger: 'blur' }
		          ],
		          zbpt: [
		            { validator: scopeValidateZbpt, trigger: 'blur' }
		          ],
		        },
			}
		},
		methods:{
		  //获取楼盘评分请求
	      getScoreData(){
	        let _this=this;
	        _this.is_loading_score_tab=true;
	        this.$http('/score').then(function(res){
	          console.log(res)
	          _this.is_loading_score_tab=false;
	          if(res.data.code==1000){
	            _this.score_data=res.data.data;
	          }
	        }).catch(function(err){
	          _this.is_loading_score_tab=false;
	          console.log(err)
	        })
	      },
	      //页码改变
	      scoreCurrentChange(page){
			this.form.pageIndex = page - 1;
			this.getScoreData()
	      },
	      //查看删除评分
	      handleScore(index,scope,type){
	        let _this=this;
	        if(type==1){
	          this.is_show_score_swi=true;
	          this.is_score_form_disabled=true;
	          for(let i in this.add_new_score_form){
	            this.add_new_score_form[i]=scope[i]
	          }
	        }else{
	          _this.$confirm('确认删除吗?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	          }).then(() => {
	            _this.getScoreData()
	            _this.$message({
	              type: 'success',
	              message: '删除成功!'
	            });
	          }).catch(() => {
	            _this.$message({
	              type: 'info',
	              message: '已取消删除'
	            });          
	          });
	        }
	      },
	      //确认更新或者保存评分
	      sure_add_score(formName){
	        let _this=this;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            _this.$confirm('确认提交吗?', '提示', {
	              confirmButtonText: '确定',
	              cancelButtonText: '取消',
	              type: 'warning'
	            }).then(() => {
	              _this.$message({
	                type: 'success',
	                message: '提交成功!'
	              });
	              _this.is_show_score_swi=false;
	              _this.getScoreData()
	            }).catch(() => {
	              _this.$message({
	                type: 'info',
	                message: '已取消提交'
	              });          
	            });

	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      //添加新的评分
	      is_show_score(swi){
	        this.is_show_score_swi=swi;
	        if(true){
	          for(let i in this.add_new_score_form){
	            this.add_new_score_form[i]='';
	          }
	          this.is_score_form_disabled=false;
	        }
	      },
		},

	}
</script>

<style scoped>
	
</style>