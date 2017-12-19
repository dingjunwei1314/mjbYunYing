<template>
	<div>
		<Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
		<div style="padding:20px">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			    <el-tab-pane label="楼栋规划详情" name="first">
			   		<EstatePlanDetail />
			    </el-tab-pane>
			    <el-tab-pane label="楼盘全景图" name="second">
			   		<EstatePanoramaTab />
			    </el-tab-pane>
			    <el-tab-pane label="楼盘报告" name="third">
			   		<EstateMonitoringReport />
			    </el-tab-pane>
			</el-tabs>
		</div>
		
	</div>
</template>

<script>
	import Subnav from '../Subnav/Subnav';
	import EstatePlanDetail from '../EstatePlanDetail/EstatePlanDetail';  
	import EstatePanoramaTab from '../EstatePanoramaTab/EstatePanoramaTab';  
	import EstateMonitoringReport from '../EstateMonitoringReport/EstateMonitoringReport';
	import message from '../../common/message';
	export default{
		name:'EstateProcessMonitoringManagement',
		components:{
			Subnav,
			EstatePlanDetail,
			EstatePanoramaTab,
			EstateMonitoringReport
		},
		data(){
			return{
				secondLevel:'全流程监控',
        		threeLevel:'金地博悦',
        		activeName:'first'
			}
		},
		created(){
      		this.$store.dispatch('defaultIndexAction','/index/estateprocessmonitoringmanagement');
		},
		methods:{
			//tab切换
			handleClick(){

			},
			//刷新
			refresh(){

			}
		}
	}
</script>

<style scoped>
	
</style>