<template>
	<div>
		<Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
		<div style="padding:20px">
			<el-form label-width="100px" :model="form" class="demo-form-inline">
				<el-form-item label="用户名" required>
					<span>{{form.userPhone}}</span>
				</el-form-item>
				<el-form-item label="楼盘名称" required>
	            	<span>{{form.buildingName}}</span>
	            </el-form-item>
	            <el-form-item label="楼栋号" required>
	            	<span>{{form.buildingNum}}</span>
	            </el-form-item>
	            <el-form-item label="单元" required>
	            	<span>{{form.unitNum}}</span>
	            </el-form-item>
	            <el-form-item label="楼层" required>
	            	<span>{{form.floor}}</span>
	            </el-form-item>
	            <el-form-item label="户号" required>
	            	<span>{{form.accountNum}}</span>
	            </el-form-item>
	            <el-form-item label="开通服务" required>
	            	<span v-if="form.operation===1">是</span>
	            	<span v-if="form.operation===0">否</span>
	            </el-form-item>
	            <el-form-item>
        			<el-button style="margin-left: 100px"  @click="back">返回</el-button>
	            </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Subnav from '../Subnav/Subnav';
	import message from '../../common/message';
	
	export default{
		name:'EstateProcessMonitoringUser',
		components:{
			Subnav,
		},
		data(){
			return{
				tabLoading:false,
				secondLevel:'服务管理',
        		threeLevel:'用户详情',
        		
        		buildingList:[],
        		form:{
        			userPhone:'',
					buildingName:'',
					buildingNum:'',
					unitNum:'',
					floor:'',
					accountNum:'',
					operation:'',
        		}
        		
			}
		},
		created(){
			this.getData();
      		this.$store.dispatch('defaultIndexAction','/index/estateprocessmonitoringservice');
		},
		methods:{
			//获取数据
		    getData(){
		        let _this = this,
		        body = {
		        	userId:this.$route.query.userId,
		        	buildingId:this.$route.query.buildingId
		        };
		 
		        this.$http('/buildingMonitor/getUserInfo',{body},{},{},'post').then(res => {
		          if(res.data.code == 0){
		          	_this.form = res.data.response.MonitorUserInfoList[0];
		          }else if(res.data.code == 300){
					_this.$router.push('/login')
		          }else{
		          	message(_this,'请求失败','warning')
		          }
		         
		        }).catch(err => {
		          console.log(err)
		        })
		    },
			//返回
			back(){
				this.$router.push({
					path:'/index/estateprocessmonitoringservice'
				})
			},
		    //刷新
		    refresh(){
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