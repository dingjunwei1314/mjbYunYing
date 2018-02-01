<template>
	<div>
		<Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
		<div style="padding:20px">
			<el-form label-width="100px" :model="form" class="demo-form-inline">
				<el-form-item label="ID：">
					<span>{{form.userId}}</span>
				</el-form-item>
				<el-form-item label="用户名：">
					<span>{{form.userPhone}}</span>
				</el-form-item>
				<el-form-item label="用户姓名：">
	            	<span>{{form.realName}}</span>
	            </el-form-item>
	            <el-form-item label="购房编号：">
	            	<span>{{form.houseNumber}}</span>
	            </el-form-item>
	            <el-form-item label="楼栋号：">
	            	<span>{{form.buildingNum}}</span>
	            </el-form-item>
	            <el-form-item label="单元：">
	            	<span>{{form.unitNum}}</span>
	            </el-form-item>
	            <el-form-item label="楼层：">
	            	<span>{{form.floor}}</span>
	            </el-form-item>
	            <el-form-item label="户号：">
	            	<span>{{form.accountNum}}</span>
	            </el-form-item>
	            <el-form-item label="申请时间：">
	            	<span>{{form.applicatTime}}</span>
	            </el-form-item>
	            <el-form-item label="审核人：" v-if="$route.query.type=='view'">
	            	<span>{{form.auditorName}}</span>
	            </el-form-item>
	            <el-form-item label="审核时间：" v-if="$route.query.type=='view'">
	            	<span>{{form.auditorTime}}</span>
	            </el-form-item>
	            <el-form-item v-if="$route.query.type=='edit'">
	            	<el-button style="margin-left: 100px" type="primary" @click="submit(2)">通过审核</el-button>
        			<el-button  @click="submit(3)">拒绝</el-button>
	            </el-form-item>
	            <el-form-item v-else>
        			<el-button style="margin-left: 100px"  @click="back">确认</el-button>
	            </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Subnav2 from '../Subnav2/Subnav2';
	import message from '../../common/message';
	
	export default{
		name:'EstatePMSDetail',
		components:{
			Subnav2,
		},
		data(){
			return{
				navList:[
					{path:'/index/estatepmsexamine',name:'首页'},
					{path:'/index/estatepmsexamine',name:'服务审核'},
					{path:this.$route.fullPath,name:'用户详情'},
				],
				tabLoading:false,
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
			this.initData();
      		this.$store.dispatch('defaultIndexAction','/index/estatepmsexamine');
		},
		methods:{
			//获取数据
		    initData(){
		    	let info = JSON.parse(this.$route.query.info);
		    	this.form = info;
		    },
		    //审核
		    submit(status){
		    	this.$confirm('确认提交吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
					let body = {
			        	status,
			        	userId:this.form.userId
			        };
			        this.$http('/buildingMonitor/auditorUserInfo',{},{body}).then(res => {
			          if(res.data.code == 0){
			          	if(res.data.response.status == 1){
			          		message(this,'提交成功','success');
			          		this.$router.push('/index/estatepmsexamine')
			          	}else{
							message(this,'提交失败','warning');
			          	}
			          }
			        })
			    }).catch(()=>{})
		    },
			//返回
			back(){
				this.$router.push({
					path:'/index/estatepmsexamine'
				})
			},
		    //刷新
		    refresh(){
		    	this.initData()
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