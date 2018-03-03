<template>
	<div>
		<Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
		<div style="padding:20px">
			<el-row style="border:1px solid #ccc;padding:20px 10px 0px">
				<el-col :span="22">
					<el-form :model="form" inline label-width="60px" class="demo-form-inline" v-if="!$route.query.buildingId">
						<el-form-item label="楼盘名">
			            	<el-select size="small" clearable v-model="form.buildingId" style="width:240px;" placeholder="楼盘名称">
						      <el-option v-for="(item,index) in buildingList" :key="index"  :label="item.buildingName" :value="item.buildingId"></el-option>
						    </el-select>
			            </el-form-item>
			            <el-form-item label="状态">
							<el-select size="small" v-model="form.auditStatus" clearable style="width:150px;">
						      <el-option  label="待审核" value="1"></el-option>
						      <el-option  label="已通过" value="2"></el-option>
						      <el-option  label="已拒绝" value="3"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="ID">
							<el-input  size="small" v-model="form.userId" style="width:150px" placeholder="ID"></el-input>
						</el-form-item>
						<el-form-item label="用户名">
							<el-input  size="small" v-model="form.userPhone" style="width:150px" placeholder="用户名"></el-input>
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
				</el-col>
				<el-col :span="2">
					<el-button type="primary" @click="onSearchSubmit">查询</el-button>
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
			          min-width="80">
			        </el-table-column>
			        <el-table-column
			          prop="userPhone"
			          label="用户名"
			          min-width="80">
			        </el-table-column>       
			        <el-table-column
			          prop="realName"
			          min-width="80"
			          label="真实姓名">
			        </el-table-column>
			        <el-table-column
			          prop="houseNumber"
			          min-width="80"
			          label="购房编号">
			        </el-table-column>
			        <el-table-column
			          prop="buildingNum"
			          min-width="80"
			          label="楼栋">
			        </el-table-column>
			         <el-table-column
			          prop="unitNum"
			          min-width="80"
			          label="单元号">
			        </el-table-column>
			        <el-table-column
			          prop="floor"
			          min-width="80"
			          label="楼层">
			        </el-table-column>
			        <el-table-column
			          prop="accountNum"
			          min-width="80"
			          label="户号">
			        </el-table-column>
			        <el-table-column
			          prop="beginTime"
			          min-width="80"
			          label="审核状态">
			        	<template scope="scope">
			        		<span v-if="scope.row.auditStatus==1">待审核</span>
			        		<span v-if="scope.row.auditStatus==2">已通过</span>
			        		<span v-if="scope.row.auditStatus==3">已拒绝</span>
			        	</template>
			        </el-table-column>
			        <el-table-column
			          prop="applicatTime"
			          min-width="80"
			          label="申请时间">
			        </el-table-column>
			        <el-table-column
			          prop="auditorName"
			          min-width="80"
			          label="审核人">
			        </el-table-column>
			        <el-table-column
			          prop="auditorTime"
			          min-width="80"
			          label="审核时间">
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
			              :disabled="scope.row.auditStatus != 1"
			              @click="handle(scope.row,2)">
			              审核
			            </el-button>
			          </template>
			        </el-table-column>
			    </el-table>
				<el-pagination
					v-show="tableData.userCount>0"
					style="margin: 0 auto;text-align:center;margin-top:20px"
					layout="prev, pager, next,jumper"
					:page-size="10"
					:currentPage.sync="currentPage"
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
		name:'estatepmsexamine',
		components:{
			Subnav2,
			BuildingLinkage
		},
		data(){
			return{
				navList:[
					{path:this.$route.fullPath,name:'首页'},
					{path:this.$route.fullPath,name:'服务审核'},
				],
				tabLoading:false,
        		inline:true,
        		required:false,
        		labelWidth:'60px',
        		itemStyle:{width:'150px'},
        		buildingList:[],
   
        		form:{
        			pageNum:0,
        			pageSize:10,
        			userId:'',
        			userPhone:'',
    				auditStatus:'',
    				buildingId:'',
					buildingNum:'',
					unitNum:'',
					floor:'',
					accountNum:'',
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
      		this.$store.dispatch('defaultIndexAction','/index/estatepmsexamine');
		},
		watch:{ 
		    '$route': function(){
		    	this.getData()
		    }
	    },
		methods:{
			//获取数据
		    getBuildListData(){
		        let body = {
		        	pageNum:'',
		        	pageSize:''
		        };
		        this.$http('/buildingMonitor/getBuildingMonitorList',{},{body}).then(res => {
		          if(res.data.code == 0){
		          	this.buildingList = [];
		            let buildingMonitorInfo = res.data.response.buildingMonitorInfo;
		            buildingMonitorInfo.forEach(item => {
						this.buildingList.push({
							buildingId:item.buildingId,
							buildingName:item.buildingName
						})
		            })

		          }else{
		          	message(this,'请求失败','warning')
		          }
		         
		        }).catch(err => {
		          console.log(err)
		        })
		    },
			//搜索
			onSearchSubmit(){
				this.form.pageNum = 0;
				this.currentPage = 1;
				this.getData();
			},
		    //获取数据
		    getData(){
		        let body = _.cloneDeep(this.form)
		        this.tabLoading = true;
		        this.$http('/buildingMonitor/getAuditorUserInfo',{body},{},{},'post').then(res => {
		          if(res.data.code == 0){
		            this.tableData = res.data.response;
		          }
		          this.tabLoading = false;
		        })
		    },
			//页码改变
		    currentChange(page){
		    	this.form.pageNum = page-1;
		    	this.getData();
		    },
		    //操作
		    handle(row,type){
		    	let query  = {
		    		info:JSON.stringify(row),
		    	}
		    	query.type = type == 1? 'view':'edit';
				this.$router.push({
					path:'/index/estatepmsdetail',
					query
				})
		    },
		    //刷新
		    refresh(){
				this.form.pageNum = 0;
				this.currentPage = 1;
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