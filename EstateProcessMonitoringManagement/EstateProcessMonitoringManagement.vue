<template>
	<div>
		<Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
		<div style="padding:20px;">
			<div class="tabletopbar">
		        <span>查询结果：共</span> 
		        <span style="color:#111">{{tableData.totalCount}}</span> <span>条</span>
		    </div>
		    <el-table
		        v-loading="tabLoading"
		        :data="tableData.buildingMonitorInfo"
		        border
		        tooltip-effect="dark"
		        style="width: 100%;font-size:12px!important;">
		        <el-table-column
		          prop="buildingId"
		          label="楼盘id"
		          min-width="60">
		        </el-table-column>
		        <el-table-column
		          prop="buildingName"
		          label="楼盘名称"
		          min-width="100">
		        </el-table-column>       
		        <el-table-column
		          prop="startServiceTime"
		          min-width="100"
		          label="提供服务时间">
		        </el-table-column>
		        <el-table-column
		          prop="endServiceTime"
		          min-width="100"
		          label="终止服务时间">
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
		              查看服务
		            </el-button>
		          </template>
		        </el-table-column>
		    </el-table>
			<el-pagination
				v-show="tableData.totalCount>0"
				style="margin: 0 auto;text-align:center;margin-top:20px"
				layout="prev, pager, next,jumper"
				:page-size="10"
				:currentPage="currentPage"
				@current-change="currentChange"
				:total="tableData.totalCount">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import Subnav2 from '../Subnav2/Subnav2'
	import message from '../../common/message'
	export default{
		name:'EstateProcessMonitoringManagement',
		components:{
			Subnav2
		},
		data(){
			return{
				navList:[
					{path:'/index/estateprocessmonitoringmanagement',name:'首页'},
					{path:'/index/estateprocessmonitoringmanagement',name:'全流程监控楼盘列表'},
				],
				tabLoading:false,
				currentPage:1,
        		filterForm:{
					pageNum:0,
					pageSize:10
        		},
        		tableData:{
					buildingMonitorInfo:[],
					totalCount:0
        		}
			}
		},
		created(){
			this.getData();
      		this.$store.dispatch('defaultIndexAction','/index/estateprocessmonitoringmanagement');
		},
		methods:{
			//获取数据
		    getData(){
		        let _this = this,
		        body = _.cloneDeep(this.filterForm)
		        _this.tabLoading = true;
		        this.$http('/buildingMonitor/getBuildingMonitorList',{},{body}).then(res => {
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
		    	this.filterForm.pageNum = page-1;
		    	this.getData();
		    },
		    //操作
		    handle(row,type){
				if(type == 1){
					this.$router.push({
						path:'/index/estateprocessmonitoringdetail',
						query:{
							type:'view',
							buildingId:row.buildingId,	
							buildingName:row.buildingName,
						}
					})
				}else if(type == 2){
					this.$router.push({
						path:'/index/estateprocessmonitoringdetail',
						query:{
							type:'edit',
							buildingId:row.buildingId,
							buildingName:row.buildingName,
						}
					})
				}else{
					this.$router.push({
						path:'/index/estateprocessmonitoringservice',
						query:{
							buildingId:row.buildingId
						}
					})
				}
		    },
		    //刷新
			refresh(){
				this.filterForm.pageNum = 0;
				this.getData()
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