<template>
	<div>
		<Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
		<div style="padding:20px">
			<el-row style="border:1px solid #ccc;padding:20px 10px 0px">
				<el-col :span="20">
					<el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">
						<el-form-item label="状态：">
							<el-select size="small" v-model="filterForm.name" style="width:150px;">
						      <el-option  label="在线" value="1"></el-option>
						      <el-option  label="离线" value="2"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="时间：">
							<el-select size="small" v-model="filterForm.name" style="width:150px;">
						      <el-option  label="创建时间" value="1"></el-option>
						      <el-option  label="更新时间" value="2"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="更新时间">
			              <el-date-picker
			                size="small"
			                style="width:180px"
			                @change="pickerChange"
			                v-model="editTime"
			                type="daterange"
			                align="right"
			                placeholder="选择日期范围"
			              >
			              </el-date-picker>
			            </el-form-item>
					</el-form>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="onSearchSubmit">查询</el-button>
	            	<el-button type="primary" @click="addNew">添加报告</el-button>
				</el-col>
			</el-row>
			<el-row style="margin-top:20px">
				<div class="tabletopbar">
			        <span>所有数据：共</span> <span style="color:#111">{{tableData.rowCount}}</span> <span>条</span>
			        <span style="margin-left:20px">查询结果：共</span> 
			        <span style="color:#111">{{tableData.rowCount}}</span> <span>条</span>
			    </div>
			    <el-table
			        v-loading="tabLoading"
			        :data="tableData.rankList"
			        border
			        tooltip-effect="dark"
			        style="width: 100%;font-size:12px!important;">
			        <el-table-column
			          prop=""
			          label="报告名称"
			          min-width="100">
			        </el-table-column>
			        <el-table-column
			          prop=""
			          label="状态"
			          min-width="100">
			        </el-table-column>       
			        <el-table-column
			          prop="creationTime"
			          min-width="100"
			          label="创建时间">
			        </el-table-column>
			        <el-table-column
			          prop="founder"
			          min-width="100"
			          label="更新时间">
			        </el-table-column>
			        <el-table-column
			          min-width="100"
			          label="操作">
			          <template scope="scope">
			            <el-button
			              size="small"
			              @click="handle(scope.row,1)">
			              查看
			            </el-button>
			            <el-button
			              size="small"
			              @click="handle(scope.row,2)">
			              编辑
			            </el-button>
			            <el-button
			              size="small"
			              @click="handle(scope.row,3)">
			              删除
			            </el-button>
			            <el-button
			              size="small"
			              @click="handle(scope.row,4)">
			              下线
			            </el-button>
			          </template>
			        </el-table-column>
			    </el-table>
				<el-pagination
					v-show="tableData.rowCount>0"
					style="margin: 0 auto;text-align:center;margin-top:20px"
					layout="prev, pager, next"
					:page-size="10"
					:currentPage="currentPage"
					@current-change="currentChange"
					:total="tableData.rowCount">
				</el-pagination>
			</el-row>
			<BigDialog dialogTitle="添加户内全景" :dialogFormVisible="dialogFormVisible" @dialogCancel="dialogCancel" @dialogConfirm="dialogConfirm">
				<div slot="dia_body">
					<el-form style="" :model="paParkDetail" class="demo-form-inline" label-width="150px">
						<el-form-item label="添加报告：">
							<FileUploader
		                      :btnId="btnList[0]"
		                      :file="preFiles[0].preFile"
		                      @fileUploader="fileUploader(0)"
		                      @fileDelete="fileDelete(0)"
		                    />
			            </el-form-item>
			            <el-form-item label="上下线：">
							<el-checkbox-group size="small" v-model="paParkDetail.name">
							  <el-checkbox label="1">上线</el-checkbox>
							  <el-checkbox label="2">下线</el-checkbox>
							</el-checkbox-group>
			            </el-form-item>
					</el-form>
				</div>
			</BigDialog>

			<el-dialog :visible.sync="dialogVisible" size="tiny">
		    	<img width="100%" :src="dialogImgSrc" alt="">
		    </el-dialog>
		</div>
	</div>
</template>

<script>
	import Subnav from '../Subnav/Subnav';
	import uploaderFile from '../../common/uploaderFile.js'
	import FileUploader from '../Common/FileUploader/FileUploader'
	import BigDialog from '../Common/BigDialog/BigDialog';
	import message from '../../common/message';
	export default{
		name:'EstatePanoramaPark',
		components:{
			Subnav,
			BigDialog,
			FileUploader,
		},
		data(){
			return{
				tabLoading:false,
				dialogVisible:false,
				dialogImgSrc:'',
				dialogFormVisible:false,
				secondLevel:'全流程监控',
        		threeLevel:'金地博悦',
        		activeName:'first',
        		editTime:'',
        		btnList:['Btn0'],
		        preFiles:[{preFile:null}],
		        uploaderList:[{uploader:null}],
        		floorList:[
					{label:'1层',value:'1'}
				],
        		filterForm:{
        			pageIndex:0,
        			pageSie:10,
        			editTimeBegin:'',
        			editTimeEnd:''
        		},
        		paParkDetail:{	
					fileUrl:''
        		},
        		currentPage:1,
        		tableData:{
					rankList:[{}],
					rowCount:10
        		}
			}
		},
		created(){
      		
		},
		methods:{
			//tab切换
			handleClick(){

			},
			//搜索
			onSearchSubmit(){
				this.filterForm.pageIndex = 0;
				this.getData();
			},
			//新增
			addNew(){
				this.dialogFormVisible = true;
				if (this.uploaderList[0].uploader == null) {
		        	this.initUploader(0);
		        };
			},
			//页码改变
		    currentChange(page){
		    	this.filterForm.pageNum = page-1;
		    	this.getData();
		    },
			//初始化上传插件对象
		    initUploader(index){
		        let _this = this,
		          btnName = 'Btn' + index;
		        uploaderFile(function (file) {
		          _this.preFiles[0].preFile = file;
		        }, function (key) {
		          _this.paParkDetail.fileUrl = key;
		        }, function () {
		          _this.preFiles[0].preFile = '';
		        }, function (uploader) {
		          _this.uploaderList[index].uploader = uploader;
		        }, btnName ,false)
		    },
		    //删除文件
		    fileDelete(index){
		        this.preFiles[0].preFile = null;
		        this.paParkDetail.fileUrl = '';
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
			dialogConfirm(){
				this.dialogFormVisible = false;
			},
			//改变时间格式
		    pickerChange(val){
		        this.filterForm.editTimeBegin=val.slice(0,10)
		        this.filterForm.editTimeEnd=val.slice(13)
		    },
		    //获取数据
		    getData(){
		        let _this = this,
		        body = _.cloneDeep(this.filterForm)
		        _this.tabLoading = true;
		        this.$http('/backstageRank/getRankList',{body},{},{},'post').then(res => {
		          if(res.data.code == 0){
		            _this.tableData = res.data.response;
		          }else if(res.data.code == 300){
					_this.$router.push('/login')
		          }
		          _this.tabLoading = false;
		        }).catch(err => {
		          console.log(err)
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
					this.$router.push({
						path:'/index/estateprocessmonitoringdetail',
						query:{
							type:'view'	
						}
					})
				}else if(type == 2){
					this.$router.push({
						path:'/index/estateprocessmonitoringdetail',
						query:{
							type:'edit'
						}
					})
				}else{
					this.$router.push({
						path:'/index/estateprocessmonitoringdetail'
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