<template>
	<div>
		<Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
		<div style="padding:20px" class="dia_wap_in">
			<el-row style="border:1px solid #ccc;padding:20px 10px 0px">
				<el-col :span="20">
					<el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">
						<el-form-item label="楼栋号：">
							<el-select size="small" v-model="filterForm.bBan" clearable style="width:150px;">
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
							<el-select size="small" v-model="timeType" @change="timeTypeChange" style="width:150px;">
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
			        <span style="color:#111">{{tableData.oneReCount}}</span> <span>条</span>
			    </div>
			    <el-table
			        v-loading="tabLoading"
			        :data="tableData.oneReportInfoList"
			        border
			        tooltip-effect="dark"
			        style="width: 100%;font-size:12px!important;">
			        <el-table-column
			          prop="rName"
			          label="报告名称"
			          min-width="100">  
			        </el-table-column>
			        <el-table-column
			          prop="bBan"
			          label="楼栋号"
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
			          width="300"
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
			            <el-button
			              size="small"
			              v-if="$route.query.type=='edit'"
			              @click="handle(scope.row,4)">
			              <span v-if="scope.row.onlineStatus==1">下线</span>
			              <span v-else>上线</span>
			            </el-button>
			          </template>
			        </el-table-column>
			    </el-table>
				<el-pagination
					v-show="tableData.oneReCount>0"
					style="margin: 0 auto;text-align:center;margin-top:20px"
					layout="prev, pager, next,jumper"
					:page-size="10"
					:currentPage="currentPage"
					@current-change="currentChange"
					:total="tableData.oneReCount">
				</el-pagination>
			</el-row>
			<BigDialog dialogTitle="添加报告" :dialogFormVisible="dialogFormVisible" @dialogCancel="dialogCancel" @dialogConfirm="dialogConfirm(1)">
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
							<el-select size="small" v-model="paParkDetail.bBan" clearable style="width:150px;">
						      <el-option v-for="(item,index) in bBanlList" :key="index" :label="item.id" :value="item.id"></el-option>
						    </el-select>
			            </el-form-item>
			            <el-form-item label="上下线：" required>
							<el-radio-group size="small" v-model="paParkDetail.onlineStatus">
							    <el-radio :label="1">上线</el-radio>
							    <el-radio :label="0">下线</el-radio>
							</el-radio-group>
			            </el-form-item>
			            <el-form-item label="创建：" v-if="handleType=='edit'">
			            	<span>{{paParkDetail.submitMan}}</span>
			            	<span>{{paParkDetail.submitTime}}</span>
			            </el-form-item>
			            <el-form-item label="最近编辑："  v-if="handleType=='edit'">
			            	<span>{{paParkDetail.updateMan}}</span>
			            	<span>{{paParkDetail.updateTime}}</span>
			            </el-form-item>
					</el-form>
				</div>
			</BigDialog>

			<BigDialog dialogTitle="添加报告" :isShowCancel="false" :dialogFormVisible="dialogFormVisible2" @dialogConfirm="dialogConfirm(2)">
				<div slot="dia_body">
					<el-form style="" :model="paParkDetail" class="demo-form-inline" label-width="150px">
						<el-form-item label="报告：">
							<a :href="paParkDetailView.rUrl" target="_blank">{{paParkDetailView.rName}}</a>
			            </el-form-item>
			            <el-form-item label="位置：">
			            	<span>楼栋号{{paParkDetailView.bBan}}</span>
			            </el-form-item>
			            <el-form-item label="是否上线：">
			            	<span v-if = "paParkDetailView.onlineStatus==1">是</span>
			            	<span v-else>否</span>
			            </el-form-item>
			            <el-form-item label="创建：">
			            	<span>{{paParkDetailView.submitMan}}</span>
			            	<span>{{paParkDetailView.submitTime}}</span>
			            </el-form-item>
			            <el-form-item label="最近编辑：">
			            	<span>{{paParkDetailView.updateMan}}</span>
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
        			buildingId:this.$route.query.buildingId,
        			reOneId:this.$route.query.rOneId,
        			rType:2,
        			bBan:'',
        			onlineStatus:'',
        			crStartTime:'',
        			crStopTime:'',
        			upStartTime:'',
        			upStopTime:''
        		},
				

				handleType:'',
        		paParkDetail:{	
        			buildingId:this.$route.query.buildingId,
        			rType:2,
        			rOneId:this.$route.query.rOneId,
        			fileSize:'',
        			rId:'',
        			bBan:'',
					rName:'',
					onlineStatus:'',
					rUrl:'',
					submitMan:'',
					submitTime:'',
					updateMan:'',
					updateTime:''
        		},
				
				paParkDetailView:{
					rName:'',
					bBan:'',
					onlineStatus:'',
					submitMan:'',
					submitTime:'',
					updateMan:'',
					updateTime:''
				},
        		currentPage:1,
        		tableData:{
					oneReportInfoList:[],
					oneReCount:0
        		}
			}
		},
		created(){
      		this.initNav();
      		this.getData();
      		this.bBanlList = JSON.parse(localStorage.buildingNumArray);
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
					if(i !='rType' && i != 'rOneId' && i != 'buildingId'){
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
		          _this.paParkDetail.fileSize = (file.size/1024/1024).toFixed(2)+'MB';
		        }, function (key) {
		          _this.paParkDetail.rUrl = key;
		        }, function () {
		          _this.paParkDetail.rName = '';
		          _this.paParkDetail.fileSize = '';
		        }, function (uploader) {
		          _this.uploaderList[index].uploader = uploader;
		        }, btnName ,false)
		    },
		    //删除文件
		    fileDelete(index){
		        this.paParkDetail.rName = '';
		        this.paParkDetail.rUrl = '';
		        this.paParkDetail.fileSize = '';
		    },
		    //开始上传
		    fileUploader(index){
		        if (this.uploaderList[index].uploader == null) {
		          return;
		        }     
		        this.uploaderList[index].uploader.start()
		    },
			//关闭-模态框
			dialogCancel(){
				this.dialogFormVisible = false;
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
					let _this = this,
					url,
					body = _.cloneDeep(this.paParkDetail);
					delete body.submitMan;
					delete body.submitTime;
					delete body.updateMan;
					delete body.updateTime;
					if(this.handleType == 'add'){
						url = '/buildingReport/insertOneReport';
						delete body.rId;
					}else{
						url = '/buildingReport/updateOneReport'
					};
					this.$http(url,{body},{},{},'post').then(res => {
			          if(res.data.code == 0){
			          	if(res.data.response.status == 1){
			          		message(_this,'提交成功','success');
			          		_this.dialogFormVisible = false;
				          	if(_this.handleType == 'add'){
								_this.filterForm.onlineStatus = '';
								_this.filterForm.bBan = '';
								_this.filterForm.crStartTime = '';      
								_this.filterForm.crStopTime = '';
								_this.filterForm.upStartTime = '';
								_this.filterForm.upStopTime = '';
								_this.editTime = '';
								_this.timeType = '1';
			          		}
			          		_this.getData();
			          	}else{
			          		message(_this,'提交失败','warning');
			          	}
			            _this.tableData = res.data.response;
			          }
			        })
				
				}else{
					this.dialogFormVisible2 = false;
				}	
			},
			//改变时间格式
		    pickerChange(val){
		    	if(this.timeType == 1){
					this.filterForm.crStartTime=val.slice(0,19)
		        	this.filterForm.crStopTime=val.slice(22)
		    	}else{
					this.filterForm.upStartTime=val.slice(0,19)
		        	this.filterForm.upStopTime=val.slice(22)
		    	}
		    },
		    timeTypeChange(val){
				this.editTime = '';
				if(val == 1){
					this.filterForm.upStartTime = '';
        			this.filterForm.upStopTime = '';
				}else{
					this.filterForm.crStartTime = '';
        			this.filterForm.crStopTime = '';
				}
		    },
		    //获取数据
		    getData(){
		        let _this = this,
		        body = _.cloneDeep(this.filterForm)
		        _this.tabLoading = true;
		        this.$http('/buildingReport/getOneReportList',{body},{},{},'post').then(res => {
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
					this.paParkDetail.rOneId = this.$route.query.rOneId;
					this.paParkDetail.buildingId = this.$route.query.buildingId;
					this.paParkDetail.rType = 2;
				}else if(type == 3){
					let _this = this,
					body = {
						rId:row.rId
					};
	                this.$confirm('是否确定删除该条数据?', '提示', {
	                    confirmButtonText: '确定',
	                    cancelButtonText: '取消',
	                    type: 'warning'
	                }).then(() => {
	                    _this.$http('/buildingReport/deleteOneReport',{body},{},{},'post').then(res =>{
	                        if(res.data.code==0){
	                        	if(res.data.response.status == 1){
	                        		message(_this,'删除成功!','success');
	                            	_this.getData();
	                        	}else{
	                        		message(_this,'删除失败','warning');
	                        	}
	                        }
	                    })
	                }).catch(() => {
			    	
			    	
			    	})
				}else{
					let _this = this,
					body = {
						rId:row.rId
					},
					text1,text2,text3;
					if(row.onlineStatus == 1){
						text1 = '确认下线吗？';
						text2 = '下线成功';
						text3 = '下线失败';
						body.upload = 0;
					}else{
						text1 = '确认上线吗？';
						text2 = '上线成功';
						text3 = '上线失败';
						body.upload = 1;
					}
	                this.$confirm(text1, '提示', {
	                    confirmButtonText: '确定',
	                    cancelButtonText: '取消',
	                    type: 'warning'
	                }).then(() => {
	                    _this.$http('/buildingReport/updateReportLine',{body},{},{},'post').then(res =>{
	                        if(res.data.code==0){
	                        	if(res.data.response.status == 1){
	                        		message(_this,text2,'success');
	                            	_this.getData();
	                        	}else{
	                        		message(_this,text3,'warning');
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