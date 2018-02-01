<template>
	<div>
		<Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
		<div style="padding:20px">
			<el-form label-width="200px" :model="form" class="demo-form-inline">
				<el-form-item label="楼盘名称：">
					<span>{{form.buildingName}}</span>
				</el-form-item>
				<el-form-item label="所在地区：">
	            	<span>{{form.locatArea}}</span>
	            </el-form-item>
	            <el-form-item label="进度照片基础积分：">
	            	<span>{{form.prBasicScore}}</span>
	            </el-form-item>
	            <el-form-item label="执行比例：" required>
	            	<template v-if="$route.query.type == 'edit'">
	            		<el-input size="small" v-model="form.prRatio" :min="0" style="width:150px" type="number"></el-input> %
	            	</template>
	           		
	           		<span v-else>{{form.prRatio}}</span>
	            </el-form-item> 
	            <el-form-item label="楼栋工程质量照片基础积分：">
	            	<span>{{form.buBasicScore}}</span>
	            </el-form-item>
	            <el-form-item label="执行比例：" required>
	            	<template v-if="$route.query.type == 'edit'">
	            		<el-input size="small" v-model="form.buRatio" :min="0" style="width:150px" type="number"></el-input> %
	            	</template>
	            	<span v-else>{{form.buRatio}}</span>
	            </el-form-item>
	            <el-form-item label="园区工程质量照片基础积分：">
	            	<span>{{form.paBasicScore}}</span>
	            </el-form-item>
	            <el-form-item label="执行比例：" required>
	            	<template v-if="$route.query.type == 'edit'">
	            		<el-input size="small" v-model="form.paRatio" :min="0" style="width:150px" type="number"></el-input> %
	            	</template>
	            	<span v-else>{{form.paRatio}}</span>
	            </el-form-item>
	            <el-form-item label="楼盘预算：">
	            	<el-input v-if="$route.query.type == 'edit'" size="small" v-model="form.generalBudget" :min="0" style="width:150px" type="number"></el-input> 
	            	<span v-else>{{form.generalBudget}}</span>
	            </el-form-item>
	            <el-form-item label="已支出：">
	            	<span>{{form.alreadyPaid}}</span>
	            </el-form-item>
	            <el-form-item label="编辑人：">
	            	<span v-if="form.backstageUser == ''"></span>
	            	<span v-else>{{form.backstageUser}}</span>
	            </el-form-item>
	            <el-form-item label="编辑时间：">
	            	<span v-if="form.editTime == ''">--</span>
	            	<span v-else>{{form.editTime}}</span>
	            </el-form-item>
	            <el-form-item v-if="$route.query.type == 'edit'">
	            	<el-button style="margin-left: 200px" type="primary"   @click="submit">确认</el-button>
        			<el-button  @click="back">返回</el-button>
	            </el-form-item>
	            <el-form-item v-else>
        			<el-button style="margin-left: 200px"  @click="back">返回</el-button>
	            </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Subnav2 from '../Subnav2/Subnav2';
	import message from '../../common/message';
	
	export default{
		name:'EstateProcessMonitoringUser',
		components:{
			Subnav2,
		},
		data(){
			return{
				navList:[
					{path:'/unopened/integralrewardmanagement',name:'首页'},
					{path:'/unopened/integralrewardmanagement',name:'楼盘奖励积分'},
					{path:this.$route.fullPath,name:'详情'},
				],
				tabLoading:false,
				secondLevel:'服务管理',
        		threeLevel:'用户详情',
        		
        		buildingList:[],
        		form:{
        			buildingId:'',
        			buildingName:'',
        			locatArea:'',
        			prBasicScore:'',
        			prRatio:'',
        			buBasicScore:'',
        			buRatio:'',
        			paBasicScore:'',
        			paRatio:'',
        			generalBudget:'',
        			alreadyPaid:'',
        			backstageUser:'',
        			editTime:''
        		}
        		
			}
		},
		created(){
			this.initData();
      		this.$store.dispatch('defaultIndexAction','/unopened/integralrewardmanagement');
		},
		methods:{
			//初始化数据
			initData(){
				let info = JSON.parse(this.$route.query.info);
				this.form = _.cloneDeep(info);
				this.form.prRatio = parseInt(this.form.prRatio.slice(0,this.form.prRatio.length-1));
				this.form.buRatio = parseInt(this.form.buRatio.slice(0,this.form.buRatio.length-1));
				this.form.paRatio = parseInt(this.form.paRatio.slice(0,this.form.paRatio.length-1));
			},
		    //提交
		    submit(){
				let body = _.cloneDeep(this.form);
				if(body.prRatio == '' || body.buRatio == '' || body.paRatio == ''){
					message(this,'有必填项未填写','warning');
					return;
				}
				for(let i in body){
					if(i != 'buildingId' && i != 'prRatio' && i != 'buRatio' && i != 'paRatio' && i != 'generalBudget'){
						delete body[i];
					}
				}
				this.$confirm('确认提交吗?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {
					this.$http('/appUserScoreController/editRewardScore',{body},{},{},'post').then(res => {
			          if(res.data.code == 0){
			            if(res.data.response.status == 1){
			              message(this,'提交成功','success');
			              this.$router.push('/unopened/integralrewardmanagement');
			            }else{
			              message(this,'请求异常','warning');
			            }
			          }
			        })
			    }).catch(() => {

			    })
		    },
			//返回
			back(){
				this.$router.push({
					path:'/unopened/integralrewardmanagement'
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