<template>
	<div>
		<Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
		<div style="padding:20px">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			    <el-tab-pane :label="item.rRootName" :name="item.rRootId" v-for="(item,index) in rRootNameList" :key="index">
			    	<h5 style="color:#333;font-weight:normal">园区评测报告</h5>
			   		<el-table
				        v-loading="tabLoading"
				        :data="tableData[item.rRootId].rOneNameList"
				        border
				        tooltip-effect="dark"
				        style="font-size:12px!important;">
				        <el-table-column
				          prop="rOneName"
				          label="报告类别"
				          min-width="60">
				        </el-table-column>
				        <el-table-column
				          prop="reportNum"
				          label="报告份数（在线／全部)"
				          min-width="100">
				        </el-table-column>       
				        <el-table-column
				          prop="submitTime"
				          min-width="100"
				          label="创建时间">
				        </el-table-column>
				        <el-table-column
				          prop="updateTime"
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
				        v-loading="tabLoading2"
				        :data="tableData[item.rRootId].questionReportInfo"
				        border
				        tooltip-effect="dark"
				        style="font-size:12px!important;">
				        <el-table-column
				          prop="rOneName"
				          label="报告类别"
				          min-width="60">
				        </el-table-column>
				        <el-table-column
				          prop="reportNum"
				          label="报告份数（在线／全部)"
				          min-width="100">
				        </el-table-column>       
				        <el-table-column
				          prop="submitTime"
				          min-width="100"
				          label="创建时间">
				        </el-table-column>
				        <el-table-column
				          prop="updateTime"
				          min-width="100"
				          label="最近更新时间">
				        </el-table-column>
				        <el-table-column
				          min-width="100"
				          label="操作">
				          <template scope="scope">
				            <el-button
				              size="small"
				              @click="handle(scope.row,3)">
				              查看
				            </el-button>
				            <el-button
				              size="small"
				              @click="handle(scope.row,4)">
				              编辑
				            </el-button>
				          </template>
				        </el-table-column>
				    </el-table>
			    </el-tab-pane>
			</el-tabs>
		</div>
		
	</div>
</template>

<script>
	import Subnav2 from '../Subnav2/Subnav2';
	import message from '../../common/message';
	export default{
		name:'EstateParkReportList',
		components:{
			Subnav2,
		},
		data(){
			let name = this.$route.query.buildingName;
			return{
				navList:[
					{path:'/index/estateprocessmonitoringmanagement',name:'首页'},
					{path:this.$route.fullPath.replace(/estateindoorreportlist/,'estateprocessmonitoringdetail'),name},
					{path:this.$route.fullPath,name:'户内报告'}
				],
				rRootNameList:[],
        		activeName:'',
        		tabLoading:false,
        		tabLoading2:false,
        		tableData:{

        		},
			}
		},
		created(){
			this.getReportData('');
      		this.$store.dispatch('defaultIndexAction','/index/estateprocessmonitoringmanagement');
		},
		methods:{
			//获取评测报告数据
			getReportData(rRootId){
				let _this = this,
				body = {
					buildingId:this.$route.query.buildingId,
					rType:3,
					rRootId
				};
				this.tabLoading = true;
				this.$http('/buildingReport/getReportHomePageInfo',{body},{},{},'post').then(res => {
				  _this.tabLoading = false;
				  if(res.data.code == 0){
				  	if(rRootId == ''){
				  	  _this.rRootNameList = res.data.response.rRootNameList;
					  _this.rRootNameList.forEach((item,index) => {
					    _this.rRootNameList[index].rRootId = item.rRootId.toString();
					    let str = item.rRootId.toString();
					    _this.tableData[str] = {rOneNameList:[],questionReportInfo:[]};
					  })
				  	  _this.activeName = _this.rRootNameList[0].rRootId;
				    }
				    let rId = rRootId == ''? _this.rRootNameList[0].rRootId : rRootId;
				    _this.tableData[rId].rOneNameList = res.data.response.rOneNameList;
				    _this.getRectificationReportData(rRootId);
				    console.log(_this.tableData)
				  }else if(res.data.code == 300){
					_this.$router.push('/login')
				  }
				}).catch(err => {
				  _this.tabLoading = false;
				  console.log(err)
				})
			},
			//获取整改报告数据
			getRectificationReportData(rRootId){
				let _this = this,
				body = {
					buildingId:this.$route.query.buildingId,
					rType:1,
					rRootId
				};
				this.tabLoading2 = true;
				this.$http('/buildingReport/getReportQuestionInfo',{body},{},{},'post').then(res => {
				  _this.tabLoading2 = false;
				  if(res.data.code == 0){

				  	let rId = rRootId == ''? _this.rRootNameList[0].rRootId : rRootId;
				  	_this.tableData[rId].questionReportInfo = res.data.response.questionReportInfo;
				  	_this.tableData[rId].questionReportInfo.forEach((item,index) => {
					  _this.tableData[rId].questionReportInfo[index].rOneName = '问题点及未整改报告'
				  	})

				  }else if(res.data.code == 300){
					_this.$router.push('/login')
				  }
				}).catch(err => {
				  _this.tabLoading2 = false;
				  console.log(err)
				})
			},
			//tab切换
			handleClick(tab){
				let rRootId = tab.name,
				len = this.tableData[tab.name].rOneNameList.length;
				if(len <= 0){
					this.getReportData(rRootId);
				}
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