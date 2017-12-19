<template>
	<div>
		<Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
		<div style="padding:20px">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			    <el-tab-pane label="安全文明" name="1">
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
			    <el-tab-pane label="围墙工程" name="2">
			   		
			    </el-tab-pane>
			    <el-tab-pane label="硬质地面工程" name="3">
			   		
			    </el-tab-pane>
			    <el-tab-pane label="构筑、景观小品" name="4">
			   		
			    </el-tab-pane>
			    <el-tab-pane label="绿化工程" name="5">
			   		
			    </el-tab-pane>
			    <el-tab-pane label="给排水工程" name="6">
			   		
			    </el-tab-pane>
			    <el-tab-pane label="电气工程" name="7">
			   		
			    </el-tab-pane>
			    <el-tab-pane label="成品安装" name="8">
			   		
			    </el-tab-pane>
			    <el-tab-pane label="景观验收" name="9">
			   		
			    </el-tab-pane>
			    <el-tab-pane label="配套设施落实" name="10">
			   		
			    </el-tab-pane>
			    <el-tab-pane label="不利因素的落实" name="11">
			   		
			    </el-tab-pane>
			    <el-tab-pane label="水，电，暖设备安装落实" name="12">
			   		
			    </el-tab-pane>
			</el-tabs>
		</div>
		
	</div>
</template>

<script>
	import Subnav from '../Subnav/Subnav';
	import message from '../../common/message';
	export default{
		name:'EstateParkReportList',
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
				this.$router.push('/index/estateparkreportlistdetail')
			},
			//刷新
			refresh(){

			}
		}
	}
</script>

<style scoped>
	
</style>