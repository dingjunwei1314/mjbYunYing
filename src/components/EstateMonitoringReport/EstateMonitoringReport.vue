<template>
	<div style="padding:20px">
		<el-row>
			<el-col :span="4">
				<router-link to="/index/estateparkreportList">
					<el-card :body-style="{ padding: '0px' }" class="report-card">
				      <div >
				        <p>园区报告</p>
				        <p>100份</p>
				        <p>2017-10-20</p>
				      </div>
				    </el-card>
				</router-link>
			</el-col>
			<el-col :span="4">
				<router-link to="/index/estatebanreportlist">
				    <el-card :body-style="{ padding: '0px' }" class="report-card">
				      <div >
				        <p>楼栋报告</p>
				        <p>100份</p>
				        <p>2017-10-20</p>
				      </div>
				    </el-card>
				</router-link>
			</el-col>
			<el-col :span="4">
				<router-link to="/index/estateindoorreportlist">
				    <el-card :body-style="{ padding: '0px' }" class="report-card">
				      <div >
				        <p>户内报告</p>
				        <p>100份</p>
				        <p>2017-10-20</p>
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
				
			}
		},
		created(){
      		
		},
		methods:{
		
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