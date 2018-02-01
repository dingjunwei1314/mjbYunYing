<template>
	<div>
		<Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
		<div style="padding:20px" class="dia_wap_in">
			<el-row style="border:1px solid #ccc;padding:20px 10px 0px">
				<el-col :span="20">
					<el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">
						<el-form-item label="楼栋号：">
							<el-select size="small" v-model="filterForm.fkId" clearable style="width:150px;">
						      <el-option v-for="(item,index) in bBanlList" :key="index" :label="item.id" :value="item.id"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="状态：">
							<el-select size="small" v-model="filterForm.onlineStatus" clearable style="width:150px;">
						      <el-option  label="在线" value="1"></el-option>
						      <el-option  label="离线" value="0"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="时间：">
							<el-select size="small" v-model="filterForm.timeType" @change="timeTypeChange" style="width:150px;">
						      <el-option  label="创建时间" value="1"></el-option>
						      <el-option  label="更新时间" value="2"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="更新时间">
			              <el-date-picker
			                size="small"
			                style="width:300px"
			                @change="pickerChange"
			                v-model="editTime"
			                type="datetimerange"
			                align="right"
			                placeholder="选择日期范围"
			              >
			              </el-date-picker>
			            </el-form-item>
					</el-form>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" style="float: right;margin-left: 10px" v-if="$route.query.type=='edit'" @click="addNew">添加报告</el-button>
					<el-button type="primary" style="float: right;" @click="onSearchSubmit">查询</el-button>
				</el-col>
			</el-row>
			<el-row style="margin-top:20px">
				<div class="tabletopbar">
			        <span>查询结果：共</span> 
			        <span style="color:#111">{{tableData.pageCount}}</span> <span>条</span>
			    </div>
			    <el-table
			        v-loading="tabLoading"
			        :data="tableData.list"
			        border
			        tooltip-effect="dark"
			        style="width: 100%;font-size:12px!important;">
			        <el-table-column   
			          prop="rName"
			          label="报告名称"
			          min-width="100">
			        </el-table-column>
			        <el-table-column   
			          prop="fkId"
			          label="楼栋号"
			          min-width="100">
			        </el-table-column>
			        <el-table-column
			          prop="questionNum"
			          label="问题点个数"
			          min-width="100">
			        </el-table-column>
			        <el-table-column
			          prop="handleQuestionNum"
			          label="已整改点个数"
			          min-width="100">
			        </el-table-column>
			        <el-table-column
			          prop="onlineStatus"
			          label="状态"
			          min-width="100">
			          <template scope="scope">
			            <span v-if="scope.row.onlineStatus==0">离线</span>
			            <span v-if="scope.row.onlineStatus==1">在线</span>    
			          </template>
			        </el-table-column>       
			        <el-table-column
			          prop="submitTime"
			          min-width="100"
			          label="创建时间">
			        </el-table-column>
			        <el-table-column
			          prop="updateTime"
			          min-width="100"
			          label="更新时间">
			        </el-table-column>
			        <el-table-column
			          width="200"
			          label="操作">
			          <template scope="scope">
			            <el-button
			              size="small"
			              @click="handle(scope.row,1)">
			              查看
			            </el-button>
			            <el-button
			              size="small"
			              v-if="$route.query.type=='edit'"
			              @click="handle(scope.row,2)">
			              编辑
			            </el-button>
			            <el-button
			              size="small"
			              v-if="$route.query.type=='edit'"
			              @click="handle(scope.row,3)">
			              删除
			            </el-button>
			          </template>
			        </el-table-column>
			    </el-table>
				<el-pagination
					v-show="tableData.pageCount>0"
					style="margin: 0 auto;text-align:center;margin-top:20px"
					layout="prev, pager, next,jumper"
					:page-size="10"
					:currentPage="currentPage"
					@current-change="currentChange"
					:total="tableData.pageCount">
				</el-pagination>
			</el-row>
			<BigDialog dialogTitle="添加报告" :dialogFormVisible="dialogFormVisible" @dialogCancel="dialogCancel(1)" @dialogConfirm="dialogConfirm(1)">
				<div slot="dia_body">
					<el-form style="" :model="paParkDetail" class="demo-form-inline" label-width="150px">
						<el-form-item label="添加报告：" required>
							<FileUploader
		                      :btnId="btnList[0]"
		                      :file="paParkDetail.rName"
		                      @fileUploader="fileUploader(0)"
		                      @fileDelete="fileDelete(0)"
		                    />
			            </el-form-item>
			            
						<el-form-item label="位置：" required>
							<el-select size="small" v-model="paParkDetail.fkId" clearable style="width:150px;">
						      <el-option v-for="(item,index) in bBanlList" :key="index" :label="item.id" :value="item.id"></el-option>
						    </el-select>
			            </el-form-item>
			            <el-form-item label="问题点：" required>
							<el-input
							  placeholder="请输入问题点的个数"
							  v-model="paParkDetail.questionNum"
							  type="number"
							  >
							</el-input>
			            </el-form-item>
			            <el-form-item label="已整改：" required>
							<el-input
							  placeholder="请输入已整改点的个数"
							  v-model="paParkDetail.handleQuestionNum"
							  type="number"
							  >
							</el-input>
			            </el-form-item>
			            <el-form-item label="上下线：" required>
							<el-radio-group size="small" v-model="paParkDetail.onlineStatus">
							    <el-radio :label="1">上线</el-radio>
							    <el-radio :label="0">下线</el-radio>
							</el-radio-group>
			            </el-form-item>
			            <el-form-item label="创建：" v-if="handleType=='edit'">
			            	<span>{{paParkDetail.submitManName}}</span>
			            	<span>{{paParkDetail.submitTime}}</span>
			            </el-form-item>
			            <el-form-item label="最近编辑："  v-if="handleType=='edit'">
			            	<span>{{paParkDetail.updateManName}}</span>
			            	<span>{{paParkDetail.updateTime}}</span>
			            </el-form-item>
					</el-form>
				</div>
			</BigDialog>

			<BigDialog dialogTitle="报告详情" :isShowCancel="false" @dialogCancel="dialogCancel(2)" :dialogFormVisible="dialogFormVisible2" @dialogConfirm="dialogConfirm(2)">
				<div slot="dia_body">
					<el-form style="" :model="paParkDetail" class="demo-form-inline" label-width="150px">
						<el-form-item label="报告：">
							<a :href="paParkDetailView.httpUrl" target="_blank">{{paParkDetailView.rName}}</a>
			            </el-form-item>
			            <el-form-item label="位置：">
			            	<span>楼栋号{{paParkDetailView.fkId}}</span>
			            </el-form-item>
			            <el-form-item label="问题点：">
			            	<span>{{paParkDetailView.questionNum}}</span>
			            </el-form-item>
			            <el-form-item label="已整改：">
			            	<span>{{paParkDetailView.handleQuestionNum}}</span>
			            </el-form-item>
			            <el-form-item label="是否上线：">
			            	<span v-if = "paParkDetailView.onlineStatus==1">是</span>
			            	<span v-else>否</span>
			            </el-form-item>
			            <el-form-item label="创建：">
			            	<span>{{paParkDetailView.submitManName}}</span>
			            	<span>{{paParkDetailView.submitTime}}</span>
			            </el-form-item>
			            <el-form-item label="最近编辑：">
			            	<span>{{paParkDetailView.updateManName}}</span>
			            	<span>{{paParkDetailView.updateTime}}</span>
			            </el-form-item>
					</el-form>
				</div>
			</BigDialog>
		</div>
	</div>
</template>

<script>
	import Subnav2 from '../Subnav2/Subnav2';
	import uploaderFile from '../../common/uploaderFile.js'
	import FileUploader from '../Common/FileUploader/FileUploader'
	import BigDialog from '../Common/BigDialog/BigDialog';
	import message from '../../common/message';
	export default{
		name:'EstatePanoramaPark',
		components:{
			Subnav2,
			BigDialog,
			FileUploader,
		},
		data(){
			return{
				navList:[
					
				],
				tabLoading:false,
				dialogFormVisible:false,
				dialogFormVisible2:false,
        		activeName:'first',
				

				bBanlList:[],
        		btnList:['Btn0'],
		        preFiles:[{preFile:null}],
		        uploaderList:[{uploader:null}],
				
				timeType:'1',
				editTime:'',
        		filterForm:{
        			pageNum:0,
        			pageSize:10,
        			bId:this.$route.query.buildingId,
        			rId:this.$route.query.rOneId,
        			timeType:'1',
        			rType:2,
        			fkId:'',
        			onlineStatus:'',
        			startTime:'',
        			endTime:''
        		},
				

				handleType:'',
        		paParkDetail:{	
        			bId:this.$route.query.buildingId,
        			rId:this.$route.query.rOneId,
					rName:'',
					questionNum:'',
					rType:2,
					fkId:'',
					handleQuestionNum:'',
					onlineStatus:'',
					httpUrl:'',
					submitManName:'',
					submitTime:'',
					updateManName:'',
					updateTime:''
        		},
				
				paParkDetailView:{
					rName:'',
					fkId:'',
					onlineStatus:'',
					submitManName:'',
					submitTime:'',
					updateManName:'',
					updateTime:''
				},
        		currentPage:1,
        		tableData:{
					list:[],
					pageCount:10
        		}
			}
		},
		created(){
			this.bBanlList = JSON.parse(localStorage.buildingNumArray)
      		this.initNav();
      		this.getData();
      		this.$store.dispatch('defaultIndexAction','/index/estateprocessmonitoringmanagement');
		},
		methods:{
			//初始化导航
			initNav(){
				let q = this.$route.query,
	      		buildingName = q.buildingName,
	      		rRootName = q.rRootName,
	      		rOneName = q.rOneName,
	      		fullPath = this.$route.fullPath,
	      		path1 = '/index/estateprocessmonitoringdetail?type=edit&buildingId='+q.buildingId+'&buildingName='+q.buildingName,
				path2 = '/index/estatebanreportList?type=edit&buildingId='+q.buildingId+'&buildingName='+q.buildingName+'&activeName='+q.activeName;
	      		this.navList = [
					{path:'/index/estateprocessmonitoringmanagement',name:'首页'},
					{path:path1,name:buildingName},
					{path:path2,name:'楼栋报告'},
					{path:path2,name:rRootName},
					{path:fullPath,name:rOneName}
	      		]
			},
			//搜索
			onSearchSubmit(){
				this.filterForm.pageNum = 0;
				this.getData();
			},
			//新增
			addNew(){
				this.dialogFormVisible = true;
				this.handleType = 'add';
				for(var i in this.paParkDetail){
					if(i != 'bId' && i != 'rId' && i != 'rType'){
						this.paParkDetail[i] = ''
					}
				}
				if (this.uploaderList[0].uploader == null) {
		        	this.initUploader(0);
		        };
			},
			//初始化上传插件对象
		    initUploader(index){
		        let _this = this,
		          btnName = 'Btn' + index;
		        uploaderFile(function (file) {
		          _this.paParkDetail.rName = file.name;
		        }, function (key) {
		          _this.paParkDetail.httpUrl = key;
		        }, function () {
		          _this.paParkDetail.rName = '';
		        }, function (uploader) {
		          _this.uploaderList[index].uploader = uploader;
		        }, btnName ,false)
		    },
		    //删除文件
		    fileDelete(index){
		        this.paParkDetail.rName = ''
		        this.paParkDetail.httpUrl = '';
		    },
		    //开始上传
		    fileUploader(index){
		        if (this.uploaderList[index].uploader == null) {
		          return;
		        }     
		        this.uploaderList[index].uploader.start()
		    },
			//关闭-模态框
			dialogCancel(type){
				if(type == 1){
					this.dialogFormVisible = false;
				}else{
					this.dialogFormVisible2 = false;
				}
				
			},
			//确认-模态框
			dialogConfirm(type){
				if(type == 1){
					if(this.paParkDetail.rName == ''){
						message(this,'请上传报告','warning');
						return;
					} 
					if(this.paParkDetail.onlineStatus === ''){
						message(this,'请选择状态','warning');
						return;
					}
					if(this.paParkDetail.questionNum == ''){
						message(this,'请填写问题点数量','warning');
						return;
					}
					if(this.paParkDetail.handleQuestionNum == ''){
						message(this,'请填写已处理问题点数量','warning');
						return;
					}
					let _this = this,
					url,
					body = _.cloneDeep(this.paParkDetail);
					if(this.handleType == 'add'){
						url = '/buildingReport/insertReportQuestionInfo';
						delete body.submitManName;
						delete body.submitTime;
						delete body.updateManName;
						delete body.updateTime;
					}else{
						url = '/buildingReport/updateReportQuestionInfo';
						delete body.submitManName;
						delete body.submitTime;
						delete body.updateManName;
						delete body.updateTime;
					};
					this.$http(url,{body},{},{},'post').then(res => {
			          if(res.data.code == 0){
			          	_this.dialogFormVisible = false;
			          	message(_this,'提交成功','success');
			          	if(_this.handleType == 'add'){
							_this.filterForm.onlineStatus = '';
							_this.filterForm.fkId = '';
							_this.filterForm.startTime = '';      
							_this.filterForm.endTime = '';
							_this.editTime = '';
							_this.filterForm.timeType = '1';
		          		}
			            _this.getData();
			          }
			          _this.tabLoading = false;
			        })
				
				}else{
					this.dialogFormVisible2 = false;
				}	
			},
			//改变时间格式
		    pickerChange(val){
				this.filterForm.startTime=val.slice(0,19)
	        	this.filterForm.endTime=val.slice(22)
		    },
		    timeTypeChange(val){
		    	this.editTime = '';
				this.filterForm.startTime = '';
        		this.filterForm.endTime = '';
		    },
		    //获取数据
		    getData(){
		        let _this = this,
		        body = _.cloneDeep(this.filterForm)
		        _this.tabLoading = true;
		        this.$http('/buildingReport/queryReportQuestionList',{body},{},{},'post').then(res => {
		          if(res.data.code == 0){
		            _this.tableData = res.data.response;
		          }
		          _this.tabLoading = false;
		        })
		    },
			//页码改变
		    currentChange(page){
		    	this.filterForm.pageNum = page-1;
		    	this.getData();
		    },
		    //操作
		    handle(row,type){
				if(type == 1){
					this.paParkDetailView = row;
					this.dialogFormVisible2 = true;
				}else if(type == 2){
					if (this.uploaderList[0].uploader == null) {
			        	this.initUploader(0);
			        };
					this.handleType = 'edit';
					this.dialogFormVisible = true;
					this.paParkDetail = _.cloneDeep(row);
				}else{
					let _this = this,
					body = {
						id:row.id
					};
	                this.$confirm('是否确定删除该条数据?', '提示', {
	                    confirmButtonText: '确定',
	                    cancelButtonText: '取消',
	                    type: 'warning'
	                }).then(() => {
	                    _this.$http('/buildingReport/delReportQuestionInfo',{body},{},{},'post').then(res =>{
	                        if(res.data.code==0){
	                        	if(res.data.response.res == 1){
	                        		message(_this,'删除成功!','success');
	                            	_this.getData();
	                        	}else{
	                        		message(_this,'删除失败','warning');
	                        	}
	                        }
	                    })
	                }).catch(() => {
			    	
			    	})
				}
		    },
		    //刷新
		    refresh(){

		    }
		}
	}
</script>

<style scoped>
	.tabletopbar{
		height:40px;
		background:#eef1f6;
		border-left:1px solid #dfe6ec;
		border-right:1px solid #dfe6ec;
		border-top:1px solid #dfe6ec;
		line-height:40px;
		font-size:12px;
		color:#555;
		padding:0px 15px;
	}
</style>

<style type="text/css">
	.dia_wap_in .el-dialog__headerbtn{
		display: none;
	}
</style>