<template>
	<div>
		<Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
		<div style="padding:20px">
			<el-row style="border:1px solid #ccc;padding:20px 10px 0px">
				<el-col :span="20">
					<el-form :model="form" inline label-width="60px" class="demo-form-inline" v-if="!$route.query.buildingId">
						<el-form-item label="楼盘名">
			            	<el-select size="small" clearable v-model="form.buildingId" style="width:240px;" placeholder="楼盘名称">
						      <el-option v-for="(item,index) in buildingList" :key="index"  :label="item.buildingName" :value="item.buildingId"></el-option>
						    </el-select>
			            </el-form-item>
					</el-form>
					<BuildingLinkage 
					:_buildingId="form.buildingId"
					:_buildingNum.sync="form.buildingNum"
					:_unitNum.sync="form.unitNum"
					:_floor.sync="form.floor"
					:_accountNum.sync="form.accountNum"
					:inline="inline" 
					:required="required"
					:labelWidth="labelWidth"
					:itemStyle="itemStyle"
					/>
					<el-form :inline="true" label-width="60px" :model="form" class="demo-form-inline">
						<el-form-item label="ID">
							<el-input  size="small" v-model="form.userId" style="width:150px" placeholder="ID"></el-input>
						</el-form-item>
						<el-form-item label="用户名">
							<el-input  size="small" v-model="form.userPhone" style="width:150px" placeholder="用户名"></el-input>
						</el-form-item>
						<el-form-item label="类型">
							<el-select size="small" @change="timeTypeChange" v-model="form.timeType" style="width:150px;">
						      <el-option  label="开通时间" value="1"></el-option>
						      <el-option  label="关闭时间" value="2"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="时间">
			              <el-date-picker
			                size="small"
			                style="width:200px"
			                @change="pickerChange"
			                v-model="editTime"
			                type="daterange"
			                align="right"
			                placeholder="选择日期范围">
			              </el-date-picker>
			            </el-form-item>
					</el-form>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="onSearchSubmit">查询</el-button>
	            	<el-button type="primary" @click="addNew">添加新用户</el-button>
				</el-col>
			</el-row>
			<el-row style="margin-top:20px">
				<div class="tabletopbar">
			        <span>查询结果：共</span> 
			        <span style="color:#111">{{tableData.userCount}}</span> <span>条</span>
			    </div>
			    <el-table
			        v-loading="tabLoading"
			        :data="tableData.MonitorUserInfoList"
			        border
			        tooltip-effect="dark"
			        style="width: 100%;font-size:12px!important;">
			        <el-table-column
			          prop="userId"
			          label="ID"
			          min-width="100">
			        </el-table-column>
			        <el-table-column
			          prop="userPhone"
			          label="用户名"
			          min-width="100">
			        </el-table-column>       
			        <el-table-column
			          prop="buildingName"
			          min-width="100"
			          label="楼盘">
			        </el-table-column>
			        <el-table-column
			          prop="buildingNum"
			          min-width="100"
			          label="楼栋">
			        </el-table-column>
			         <el-table-column
			          prop="unitNum"
			          min-width="100"
			          label="单元号">
			        </el-table-column>
			        <el-table-column
			          prop="floor"
			          min-width="100"
			          label="楼层">
			        </el-table-column>
			        <el-table-column
			          prop="accountNum"
			          min-width="100"
			          label="户号">
			        </el-table-column>
			        <el-table-column
			          prop="beginTime"
			          min-width="100"
			          label="开通时间">
			        </el-table-column>
			        <el-table-column
			          prop="endTime"
			          min-width="100"
			          label="关闭时间">
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
			              @click="handle(scope.row,2)">
			              编辑
			            </el-button>
			          </template>
			        </el-table-column>
			    </el-table>
				<el-pagination
					v-show="tableData.userCount>0"
					style="margin: 0 auto;text-align:center;margin-top:20px"
					layout="prev, pager, next,jumper"
					:page-size="10"
					:currentPage="currentPage"
					@current-change="currentChange"
					:total="tableData.userCount">
				</el-pagination>
			</el-row>
		</div>
	</div>
</template>

<script>
	import Subnav2 from '../Subnav2/Subnav2';
	import BuildingLinkage from '../Common/BuildingLinkage2/BuildingLinkage2';
	import message from '../../common/message';
	export default{
		name:'EstateProcessMonitoringService',
		components:{
			Subnav2,
			BuildingLinkage
		},
		data(){
			return{
				navList:[
					{path:'/index/estateprocessmonitoringservice',name:'首页'},
					{path:'/index/estateprocessmonitoringservice',name:'服务管理'},
				],
				tabLoading:false,
				secondLevel:'服务管理',
        		threeLevel:'服务管理',
        		activeName:'first',
        		inline:true,
        		required:false,
        		labelWidth:'60px',
        		itemStyle:{width:'150px'},
        		buildingList:[],
        		editTime:'',
        		floorList:[
					{label:'1层',value:'1'}
				],
        		form:{
        			pageNum:0,
        			pageSize:10,
        			timeType:'1',
        			userId:'',
        			userPhone:'',
        			buildingId:'',
					buildingNum:'',
					unitNum:'',
					floor:'',
					accountNum:'',
        			beStartTime:'',
        			beStopTime:'',
        			enStartTime:'',
        			enStopTime:''
        		},
        		paParkDetail:{	
					houseImgUrl:''
        		},
        		currentPage:1,
        		tableData:{
					MonitorUserInfoList:[],
					userCount:10
        		}
			}
		},
		created(){
			this.getBuildListData();
			this.getData();
      		this.$store.dispatch('defaultIndexAction','/index/estateprocessmonitoringservice');
      		
		},
		watch:{ 
		    '$route': function(){
		    	this.getData()
		    }
	    },
		methods:{
			//获取数据
		    getBuildListData(){
		        let _this = this,
		        body = {
		        	pageNum:'',
		        	pageSize:''
		        };
		        this.$http('/buildingMonitor/getBuildingMonitorList',{},{body}).then(res => {
		          if(res.data.code == 0){
		          	_this.buildingList = [];
		            let buildingMonitorInfo = res.data.response.buildingMonitorInfo;
		            buildingMonitorInfo.forEach(item => {
						_this.buildingList.push({
							buildingId:item.buildingId,
							buildingName:item.buildingName
						})
		            })

		          }else{
		          	message(_this,'请求失败','warning')
		          }
		         
		        }).catch(err => {
		          console.log(err)
		        })
		    },
			//搜索
			onSearchSubmit(){
				this.form.pageIndex = 0;
				this.getData();
			},
			//新增
			addNew(){
				this.$router.push({
					path:'/index/estateprocessmonitoringuser',
					query:{
						type:'create'
					}
				})
			},
			//改变时间类型
			timeTypeChange(){
				this.editTime = '';
		    	this.form.beStartTime = '';
		    	this.form.beStopTime = '';
		    	this.form.enStartTime = '';
		    	this.form.enStopTime = '';
			},
			//改变时间格式
		    pickerChange(val){
		    	if(this.form.timeType == '1'){
					this.form.beStartTime=val.slice(0,10)
		        	this.form.beStopTime=val.slice(13)
		    	}else{
					this.form.enStartTime=val.slice(0,10)
		        	this.form.enStopTime=val.slice(13)
		    	}
		    },
		    //获取数据
		    getData(){
		    	if(this.$route.query.buildingId){
	      			this.form.buildingId = this.$route.query.buildingId
	      		}
	      		
		        let _this = this,
		        body = _.cloneDeep(this.form)
		        _this.tabLoading = true;
		        this.$http('/buildingMonitor/getMonitorUserInfo',{body},{},{},'post').then(res => {
		          if(res.data.code == 0){
		            _this.tableData = res.data.response;
		          }
		          _this.tabLoading = false;
		        }).catch(err => {
		          console.log(err)
		          _this.tabLoading = false;
		        })
		    },
			//页码改变
		    currentChange(page){
		    	this.form.pageNum = page-1;
		    	this.getData();
		    },
		    //操作
		    handle(row,type){
				if(type == 1){
					this.$router.push({
						path:'/index/estateprocessmonitoringuserdetail',
						query:{
							userId:row.userId,
							buildingId:row.buildingId
						}
					})
				}else if(type == 2){
					this.$router.push({
						path:'/index/estateprocessmonitoringuser',
						query:{
							type:'edit',
							userId:row.userId,
							buildingId:row.buildingId
						}
					})
				}
		    },
		    //刷新
		    refresh(){
				this.form.pageNum = 0;
				this.getData();
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