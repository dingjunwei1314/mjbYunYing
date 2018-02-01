<template>
	<div>
		<Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
		<div style="padding:20px">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			    <el-tab-pane label="楼栋规划详情" name="first">
			   		<EstatePlanDetail :buildingId="buildingId"/>
			    </el-tab-pane>
			    <el-tab-pane label="楼盘全景图" name="second">
			   		<EstatePanoramaTab :buildingId="buildingId"/>
			    </el-tab-pane>
			    <el-tab-pane label="建设中报告" name="third">
			   		<EstateConstructionReport  :buildingId="buildingId"/>
			    </el-tab-pane>
			    <el-tab-pane label="交房后报告" name="four">
			   		<EstateMonitoringReport :buildingId="buildingId"/>
			    </el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template> 
<script>
	import Subnav2 from '../Subnav2/Subnav2';
	import EstatePlanDetail from '../EstatePlanDetail/EstatePlanDetail';  
	import EstatePanoramaTab from '../EstatePanoramaTab/EstatePanoramaTab';  
	import EstateConstructionReport from '../EstateConstructionReport/EstateConstructionReport';
	import EstateMonitoringReport from '../EstateMonitoringReport/EstateMonitoringReport';
	import message from '../../common/message';
	export default{
		name:'EstateProcessMonitoringDetail',
		components:{
			Subnav2,
			EstatePlanDetail,
			EstatePanoramaTab,
			EstateConstructionReport,
			EstateMonitoringReport
		},
		data(){
			let name = this.$route.query.buildingName;
			return{
				activeName:'first',
				navList:[
					{path:'/index/estateprocessmonitoringmanagement',name:'首页'},
					{path:'/index/estateprocessmonitoringmanagement',name},
				]
			}
		},
		created(){
      		this.$store.dispatch('defaultIndexAction','/index/estateprocessmonitoringmanagement');
		},
		computed:{
			buildingId:function(){
				return this.$route.query.buildingId;
			}
		},
		methods:{
			//tab切换
			handleClick(tab){
				if(tab.name == 'first'){
					if(this.navList.length == 3){
						this.navList.pop();
					}
				}else if(tab.name == 'second'){
					if(this.navList.length == 3){
						this.navList.pop();
						this.navList.push({path:this.$route.fullPath,name:'楼盘全景'})
					}else{
						this.navList.push({path:this.$route.fullPath,name:'楼盘全景'})
					}
				}else if(tab.name == 'third'){
					if(this.navList.length == 3){
						this.navList.pop();
						this.navList.push({path:this.$route.fullPath,name:'建设中报告'})
					}else{
						this.navList.push({path:this.$route.fullPath,name:'建设中报告'})
					}
				}else{
					if(this.navList.length == 3){
						this.navList.pop();
						this.navList.push({path:this.$route.fullPath,name:'交房后报告报告'})
					}else{
						this.navList.push({path:this.$route.fullPath,name:'交房后报告报告'})
					}
				}
			},
			//刷新
			refresh(){
			
			}
		}
	}
</script>
<style scoped>
	
</style>