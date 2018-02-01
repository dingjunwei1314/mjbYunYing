<template>
	<div>
		<el-row style="border:1px solid #ccc;padding:20px 10px 0px">
			<el-col :span="20">
				<el-form :inline="true" :model="filterForm" class="demo-form-inline">
					<el-form-item label="状态：">
						<el-select size="small" v-model="filterForm.timeType" style="width:150px;">
					      <el-option  label="在线" value="1"></el-option>
					      <el-option  label="离线" value="0"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="时间：">
						<el-select size="small" v-model="filterForm.timeType" style="width:150px;">
					      <el-option  label="创建时间" value="1"></el-option>
					      <el-option  label="更新时间" value="2"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="时间范围">
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
				<el-button style="float:right;margin-left:5px;" type="primary" @click="addNew" v-if="type==='edit'">添加报告</el-button>
				<el-button style="float:right" type="primary" @click="onSearchSubmit">查询</el-button>
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
		        style="font-size:12px!important">
		        <el-table-column
		          prop="pName"
		          label="名称"
		          min-width="100">
		        </el-table-column>
		        <el-table-column
		          prop="httpUrl"
		          label="期数"
		          min-width="100">
		        </el-table-column>
		        <el-table-column
		          prop="buildingPanoramaLableName"
		          label="状态"
		          min-width="100">
		        </el-table-column>       
		        <el-table-column
		          prop="submitTime"
		          min-width="100"
		          label="创建人">
		        </el-table-column>
		        <el-table-column
		          prop="editTime"
		          min-width="100"
		          label="编辑人">
		        </el-table-column>
		        <el-table-column
		          prop="editTime"
		          min-width="100"
		          label="创建时间">
		        </el-table-column>
		        <el-table-column
		          prop="editTime"
		          min-width="100"
		          label="最后更新时间">
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
		              v-if="type==='edit'"
		              @click="handle(scope.row,2)">
		              编辑
		            </el-button>
		            <el-button
		              size="small"
		              v-if="type==='edit'"
		              @click="handle(scope.row,3)">
		              <span>上线</span>
		            </el-button>
		            <el-button
		              size="small"
		              v-if="type==='edit'"
		              @click="handle(scope.row,4)">
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
	</div>
</template>

<script>
	import message from '../../common/message';
	export default{
		name:'EstateConstructionReport',
		components:{
			
		},
		data(){
			return{
				tabLoading:false,
        		currentPage:1,
        		editTime:'',
        		filterForm:{
        			timeType:'1',
        			pageNum:0,
        			pageSize:10,
        			bId:this.$route.query.buildingId,
        			startTime:'',
        			endTime:''
        		},
        		tableData:{
					list:[],
					pageCount:10
        		}
			}
		},
		computed:{
			type:function(){
				return this.$route.query.type;
			},
			buildingId:function(){
				return this.$route.query.buildingId;
			}
		},
		created(){
	        
		},
		mounted(){
			this.getData();
		},
		methods:{
			//获取数据
		    getData(){
		        let _this = this,
		        body = _.cloneDeep(this.filterForm);
		        _this.tabLoading = true;
		        this.$http('/buildingPanorama/queryListInfo',{body},{},{},'post').then(res => {
		          if(res.data.code == 0){
		            _this.tableData = res.data.response;
		          }else{
		          	message(_this,'请求失败','warning')
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
			//搜索
			onSearchSubmit(){
				this.filterForm.pageNum = 0;
				this.getData();
			},
			//新增
			addNew(){
				this.$router.push({
					path:'/index/estateconstructionreporttab',
					query:{
						path:this.$route.fullPath,
						type:'add',
						buildingName:this.$route.query.buildingName,
						buildingId:this.$route.query.buildingId
					}
				})
			},
			//改变时间格式
		    pickerChange(val){
		        this.filterForm.startTime=val.slice(0,19);
		        this.filterForm.endTime=val.slice(22);
		    },
		    //操作
		    handle(row,type){
				if(type == 1){
					
				}else if(type == 2){
					
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
	                    _this.$http('/buildingPanorama/delInfo',{body},{},{},'post').then(res =>{
	                        if(res.data.code==0){
	                        	if(res.data.response.res == 1){
	                        		message(_this,'删除成功!','success');
	                            	_this.getData();
	                        	}else{
	                        		message(_this,'删除失败','warning');
	                        	}
	                        }else{
	                        	message(_this,'删除失败','warning');
	                        }
	                    }).catch(function(err){
	                        console.log(err)
	                    })
	                }).catch(() => {
	                });
				}
		    },
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
	.el-checkbox{
		margin-left: 0px;
		margin-right: 10px;
	}
</style>