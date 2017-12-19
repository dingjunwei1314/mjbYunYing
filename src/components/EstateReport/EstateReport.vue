<template>
	<div>
		<div>
			<el-form :model="form"   label-width="100px" class="demo-dynamic">
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox-group v-model="form.reportType" @change="formTypeChange">
					<el-checkbox v-for="type in typeList" :label="type.id" :key="type.id">{{type.name}}</el-checkbox>
				</el-checkbox-group>
			</el-form>
		    <el-table
		      v-loading="is_loading_report_table"
		      :data="report_data.reportList"
		      border
		      tooltip-effect="dark"
		      style="width: 100%;font-size:12px!important;text-align:center;margin-top:20px">
		      <el-table-column
		        prop="reportName"
		        label="报告名"
		        min-width="100">
		      </el-table-column>
		      <el-table-column
		        prop="reportType"
		        label="报告类型"
		        min-width="80">
		        <template scope = "scope">
		        	<span v-if = "scope.row.reportType == '0'">【施工质量评测报告】</span>
		        	<span v-if = "scope.row.reportType == '1'">【周边配套评测报告】</span>
		        	<span v-if = "scope.row.reportType == '2'">【规划落实评测报告】</span>
		        	<span v-if = "scope.row.reportType == '3'">【规划设计评测报告】</span>
		        	<span v-if = "scope.row.reportType == '4'">【景观规划评测报告】</span>
		        	<span v-if = "scope.row.reportType == '5'">【楼盘物业评测报告】</span>
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="onlineTime"
		        label="发布时间"
		        width="200">
		      </el-table-column>
		      <el-table-column
		        label="状态"
		        width="200">
		       	<template scope = "scope">
		        	<span v-if = "scope.row.isOnline == '1'">离线</span>
		        	<span v-if = "scope.row.isOnline == '2'">在线</span>
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="operateMan"
		        label="发布人"
		        min-width="60">
		      </el-table-column>
		      <el-table-column
		        min-width="100"
		        label="操作">
		        <template scope="scope">
		          <el-button
		            size="small"
		            @click="handleRepeat(scope.row,1)">
		            查看
		          </el-button>
		          <el-button
		          size="small"
		          @click="handleRepeat(scope.row,2)">
		          	<span v-if = "scope.row.isOnline == 1">上线</span>
		          	<span v-else>下线</span>
		          </el-button>
		          
		        </template>
		      </el-table-column>
		    </el-table>
		    <el-pagination
	          v-show="report_data.rowCount>0"
	          style="margin: 0 auto;text-align:center;margin-top:20px"
	          layout="prev, pager, next"
	          :page-size=10
	          :currentPage="currentPage"
	          @current-change="reportCurrentChange"
	          :total="report_data.rowCount">
	        </el-pagination>

	    </div>
	</div>
</template>

<script>
	import message from '../../common/message'
	export default{
		name:'',
		components:{

		},
		data(){
			return{
				is_loading_report_table:false,
				currentPage:1,
				checkAll:false,
				isIndeterminate:false,
				typeList:[
					{
						id:'0',
						name:'施工质量评测报告'
					},
					
					{
						id:'1',
						name:'周边配套评测报告'
					},
					{
						id:'2',
						name:'规划落实评测报告'
					},
					{
						id:'3',
						name:'规划设计评测报告'
					},
					
					{
						id:'4',
						name:'景观规划评测报告'
					},
					{
						id:'5',
						name:'楼盘物业评测报告'
					},
				],
				form:{
					buildingId:'',
					reportType:[],
					pageSize:10,
					pageIndex:0
				},
				//楼盘报告数据
		        report_data:{
		          reportList:[
		          	
		          ],
		          rowCount:2,
		        },
		        reportType:''
			}
		},
		computed:{
			id:function(){
				return this.$store.getters.GetBuildingId
			}
		},
		created(){
		 	
		},
		methods:{
	      //获取楼盘报告请求
	      getreportdata(reportType = ''){
	      		if(this.$route.query.type && this.$route.query.type == 'add'){
					return;
	      		}
		        let _this = this,
		        body = _.cloneDeep(this.form);
		        body.buildingId = this.id;
		        body.reportType = reportType;
		        _this.is_loading_report_table = true;
		        this.$http('/backstageBuilding/getBuildingReportList',{},{body},{}).then(res =>{ 
		          _this.is_loading_report_table=false;
		          if(res.data.code == 0){
		            _this.report_data=res.data.response;
		          }else{
		          	message(_this,res.data.message,'warning')
		          }
		        }).catch(function(err){
		          _this.is_loading_report_table=false;
		          console.log(err)
		        })
	      },

	      handleCheckAllChange(val) {
	        this.form.reportType = this.checkAll ? ['0','1','2','3','4','5'] : [];
	        this.isIndeterminate = false;
	        this.reportType = this.checkAll ? '-1' : ''
	        this.getreportdata(this.reportType)
	      },
	      //搜索
	      formTypeChange(val){
	      	if(this.form.reportType.length >= 6){
				this.checkAll = true;
	      	}else{
	      		this.checkAll = false;
	      	}

	      	let _reportType = _.cloneDeep(this.form.reportType);
	      
			if(_reportType.length >= 6){
				this.reportType = '-1'
			}else{
				this.reportType = _reportType.join(',')
			}
			this.getreportdata(this.reportType)
	      },
	      //上线查看删除报告
	      handleRepeat(scope,type){
		        let _this = this,
		       	body = {
		       		reportId:scope.reportId,
		       		reportType:scope.reportType
		       	};
		        if(type == 1){
		        	let newTab = window.open('about:blank');
		        	this.$http('/backstageBuilding/getReportInfo',{},{body},{}).then(res =>{ 
			          if(res.data.code == 0){
			            let url = res.data.response.reportUrl;
			            newTab.location.href = url
			          }else{
					    message(_this,res.data.message,'warning')
					    newTab.close()
			          }
			        }).catch(err =>{
			        	console.log(err)
			        	newTab.close()
			        })
		        }else if(type==3){
		          _this.$confirm('确认删除吗?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		          }).then(() => {
		          	let body = {
		          	  reportId: scope.reportId,
		              reportType: scope.reportType,
		          	};
		          	_this.$http('/backstageBuilding/editBuildingReportOperator',{body},{},{},'post').then(res =>{ 
			          if(res.data.code == 0){
			          	message(_this,msg,'warning')
			            _this.getreportdata(this.reportType)
			          }else{
					    message(_this,res.data.message,'warning')
			          }
			        }).catch(err =>{
			        	console.log(err)
			        })
		          }).catch(() => {
		          	message(_this,'已取消删除','info')        
		          });
		        }else{
		       	  let text = scope.isOnline == 2? '确认下线吗?':'确认上线吗?'
		          _this.$confirm(text, '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		          }).then(() => {
		            let body = {
		              reportId: scope.reportId,
		              reportType: scope.reportType,
		              operator: scope.isOnline == 1? '2':'1'
		            },
		            msg = scope.isOnline == 2? '下线成功':'上线成功';
		            _this.$http('/backstageBuilding/editBuildingReportOperator',{body},{},{},'post').then(res =>{ 
			          if(res.data.code == 0){
			          	if(res.data.response.status == 1){
							message(_this,msg,'success')
			            	_this.getreportdata(this.reportType)
			          	}else if(res.data.response.status == 0){
							message(_this,'操作失败','warning')
			          	}else if(res.data.response.status == 2){
							message(_this,'已存在上线报告，需先下线原来报告在进行上线','warning')
			          	}
			          }else{
					    message(_this,res.data.message,'warning')
			          }
			        }).catch(err =>{
			        	console.log(err)
			        })
		            
		          }).catch(() => {
		          	message(_this,'已取消','info')       
		          });
		        }
	      },
	      //切换页码
	      reportCurrentChange(page){
		    this.form.pageIndex = page - 1
	      }								
		},
		mounted(){
			if(this.$route.query.type && this.$route.query.type == 'edit'){
				this.getreportdata(this.reportType)
			}
			
		}
	}
</script>

<style scoped>
	.list-row{margin-bottom: 10px;width: 60%}
</style>