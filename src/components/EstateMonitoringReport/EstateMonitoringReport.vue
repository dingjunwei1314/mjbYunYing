<template>
	<div style="padding:20px">
		<el-row>
			<el-col :span="4">
				<router-link :to="{path:'/index/estateparkreportList',query:$route.query}">
					<el-card :body-style="{ padding: '0px' }" class="report-card">
				      <div >
				        <p>园区报告</p>
				        <p>{{reportInfoList[0].reportNum}}份</p>
				        <p>{{reportInfoList[0].updateTime}}</p>
				      </div>
				    </el-card>
				</router-link>
			</el-col>
			<el-col :span="4">
				<router-link :to="{path:'/index/estatebanreportlist',query:$route.query}">
				    <el-card :body-style="{ padding: '0px' }" class="report-card">
				      <div >
				        <p>楼栋报告</p>
				        <p>{{reportInfoList[1].reportNum}}份</p>
				        <p>{{reportInfoList[1].updateTime}}</p>
				      </div>
				    </el-card>
				</router-link>
			</el-col>
			<el-col :span="4">
				<router-link :to="{path:'/index/estateindoorreportlist',query:$route.query}">
				    <el-card :body-style="{ padding: '0px' }" class="report-card">
				      <div>
				        <p>户内报告</p>
				        <p>{{reportInfoList[2].reportNum}}份</p>
				        <p>{{reportInfoList[2].updateTime}}</p>
				      </div>
				    </el-card>
				</router-link>
			</el-col>
			
		</el-row>
	</div>
</template>

<script>
	import message from '../../common/message';
	export default{
		name:'EstateProcessMonitoringManagement',
		components:{
			
		},
		data(){
			return{
				reportInfoList:[
					{reportNum:'',updateTime:''},
					{reportNum:'',updateTime:''},
					{reportNum:'',updateTime:''}
				]
			}
		},
		created(){
      		this.getReportData();
		},
		methods:{
			//获取数据
		    getReportData(){
		        let _this = this,
		        body = {
		        	buildingId:this.$route.query.buildingId
		        };
		        this.$http('/buildingReport/getReportNumAndTime',{body},{},{},'post').then(res => {
		          if(res.data.code == 0){
		            _this.reportInfoList = res.data.response.reportInfoList;
		          }else{
		          	message(_this,'请求失败','warning')
		          }
		        }).catch(err => {
		          console.log(err)
		        })
		    },
		}
	}
</script>

<style scoped>
	.report-card{
		padding: 14px;
		width: 120px;
		height:120px;
	}
	.report-card p{
		color: #777;
		font-size: 14px;
		text-align: center;
	}
	.report-card p:nth-child(1){
		margin:20px 0px;
		font-size: 16px;
		color: #333;
		font-weight: bold;
	}
</style>