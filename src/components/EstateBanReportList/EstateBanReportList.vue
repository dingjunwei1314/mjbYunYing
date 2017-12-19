<template>
	<div>
		<Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
		<div style="padding:20px">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			    <el-tab-pane label="地基础报告" name="1">
			    	<h5 style="color:#333;font-weight:normal">园区评测报告</h5>
			   		<el-table
				        v-loading="tabLoading"
				        :data="tableData.rankList"
				        border
				        tooltip-effect="dark"
				        style="font-size:12px!important;">
				        <el-table-column
				          prop=""
				          label="报告类别"
				          min-width="60">
				        </el-table-column>
				        <el-table-column
				          prop=""
				          label="报告份数（在线／全部)"
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
				          label="最近更新时间">
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
				          </template>
				        </el-table-column>
				    </el-table>
				    <h5 style="color:#333;font-weight:normal">问题点及未整改报告</h5>
				    <el-table
				        v-loading="tabLoading"
				        :data="tableData.rankList"
				        border
				        tooltip-effect="dark"
				        style="font-size:12px!important;">
				        <el-table-column
				          prop=""
				          label="报告类别"
				          min-width="60">
				        </el-table-column>
				        <el-table-column
				          prop=""
				          label="报告份数（在线／全部)"
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
				          label="最近更新时间">
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
				          </template>
				        </el-table-column>
				    </el-table>
			    </el-tab-pane>
			    <el-tab-pane label="屋面工程" name="2">
			   		
			    </el-tab-pane>
			    <el-tab-pane label="外墙工程" name="3">
			   		
			    </el-tab-pane>
			    <el-tab-pane label="核心筒" name="4">
			   		
			    </el-tab-pane>
			</el-tabs>
		</div>
		
	</div>
</template>

<script>
	import Subnav from '../Subnav/Subnav';
	import message from '../../common/message';
	export default{
		name:'EstateParkBanList',
		components:{
			Subnav,
		},
		data(){
			return{
				secondLevel:'全流程监控',
        		threeLevel:'金地博悦',
        		activeName:'1',
        		tabLoading:false,
        		tableData:{
        			rankList:[{}]
        		}
			}
		},
		created(){
      		this.$store.dispatch('defaultIndexAction','/index/estateprocessmonitoringmanagement');
		},
		methods:{
			//tab切换
			handleClick(){

			},
			handle(){
				this.$router.push('/index/estatebanreportlistdetail')
			},
			//刷新
			refresh(){

			}
		}
	}
</script>

<style scoped>
	
</style>