<template>
	<div class="EstatePanorama">
		<div class="first_item_1">
	    	<p class="tit">
	     		楼盘全景
	    	</p>
	    	<div style="padding:20px" v-show = "showMain">
	    		<div style="text-align:right;margin-bottom:10px">
	    			<el-button  @click="add" type="primary">新建</el-button>
	    		</div>
		    	<div class="tabletopbar">
			        <span style="margin-left:20px">查询结果：共</span> 
			        <span style="color:#111">{{tableData.rowCount}}</span> <span>条</span>
			    </div>
			    <el-table
			        v-loading="loading"
			        ref="multipleTable"
			        :data="tableData.buildingList"
			        border
			        tooltip-effect="dark"
			        style="width: 100%;font-size:12px!important;"
			        >
			        <el-table-column
			          prop="buildingId"
			          label="ID"
			          width="60">
			        </el-table-column>
			        <el-table-column
			          prop="buildingName"
			          label="鸟瞰图"
			          min-width="60">
			        </el-table-column>
			        <el-table-column
			          prop="area"
			          label="楼盘全景"
			          min-width="60">
			        </el-table-column>
			        <el-table-column
			          prop="developer"
			          label="楼盘沙盘"
			          min-width="80">
			        </el-table-column>
			        <el-table-column
			          prop="fraction"
			          label="周报配套"
			          min-width="60">
			        </el-table-column>
			        <el-table-column
			          prop="state" 
			          label="创建时间">
			          <template scope="scope">
			            <span v-if="scope.row.onlineStatus==0">离线</span>
			            <span v-if="scope.row.onlineStatus==1">在线</span>
			            <span v-if="scope.row.onlineStatus==2">不限</span>    
			          </template>
			        </el-table-column>
			        <el-table-column
			          prop="editTime"
			          
			          label="最近更新时间">
			        </el-table-column>
			        <el-table-column
			          width="320"
			          label="操作">
			          <template scope="scope">
			          <el-button
			            size="small"
			            @click="handleEdit(scope.row,1)">
			            查看
			          </el-button>
			          <el-button
			            size="small"
			            @click="handleEdit(scope.row,2)">
			            编辑
			          </el-button>
			          <el-button
			            size="small"
			            @click="handleEdit(scope.row,3)">
			            删除
			          </el-button>
			          </template>
			        </el-table-column>
			    </el-table>
			    <el-pagination
			        v-show="tableData.rowCount>0"
			        style="margin: 0 auto;text-align:center;margin-top:20px"
			        layout="prev, pager, next"
			        :page-size=10
			        :currentPage="currentPage"
			        @current-change="currentChange"
			        :total="tableData.rowCount">
			    </el-pagination>
			</div>
			<div v-show = "showDetail">
				<el-button
		            size = "small"
		    		type = "text"
		    		@click = "backMain(1)">
		            返回列表
		        </el-button>
				aa
			</div>
		</div>
	</div>	
</template>

<script>
	import message from '../../common/message'
	export default {
		name:'EstatePanorama',
		data(){
			return{
				currentPage:0,
				loading:false,
				showMain:true,
				showDetail:false,
				filterForm:{
					pageIndex:0,
					pageSize:10
				},
				tableData:{
					rowCount:10,
					buildingList:[

					]
				}
			}
		},
		methods:{
			//请求数据方法
		    getdata(){
		        let _this = this;
		        _this.loading = true;
		        this.$http('/backstageBuilding/getBuildingList',{},{body:_this.filterForm},{},'get').then(function(res){
		          _this.loading = false;
		          if(res.data.code == 0){
		            _this.tableData = res.data.response;
		          }else{
		            message(_this,res.data.message,'warning')
		          }
		        }).catch(function(err){
		          console.log(err)
		          _this.loading=false;
		        })
		    },
		    //改变页码
		    currentChange(page){
		        this.currentPage = page;
		        this.filterForm.pageIndex = page-1;
		        this.getdata()
		    },
		    //新增
		    add(){
				this.showMain = false;
				this.showDetail = true;
		    },
		    //返回列表
		    backMain(type){
				
		    },
		    //操作
		    handleEdit(row,type){
		    	let _this = this;
				if(type == 1){

				}else if(type == 2){

				}else{
					_this.$confirm('确认删除吗?', '提示', {
			            confirmButtonText: '确定',
			            cancelButtonText: '取消',
			            type: 'warning'
			        }).then(() => {
			            _this.$http('/backstageBuilding/delBuildingHouseInfo',{body},{},{},'post').then(res => {
			              if(res.data.response.status == 1){
			                _this.getdata()
			                message(_this,'删除成功','success')
			              }else{
			                message(_this,'删除失败','warning')
			              }
			            })
			        }).catch(() => {
			            message(_this,'已取消删除','info')        
			        });
				}
		    }
		}
	}
</script>

<style scoped>
	.first_item_1{border: 1px solid #eee;margin:20px;}
	.first_item_1 .tit{height: 30px;background: rgba(32,160,255,.8);color: white;line-height: 30px;font-size: 12px;padding: 0px 20px; }
	.tabletopbar{height:40px;background:#eef1f6;border-left:1px solid #dfe6ec;border-right:1px solid #dfe6ec;border-top:1px solid #dfe6ec;line-height:40px;font-size:12px;color:#555;padding:0px 15px;}
</style>