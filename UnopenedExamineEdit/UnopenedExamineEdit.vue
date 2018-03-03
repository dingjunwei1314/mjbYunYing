<template>
	<div>
		<Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
		<div style="padding:20px;margin-bottom: 100px">
			<el-form  :model="form" class="demo-form-inline">
				<el-form-item label="当前楼盘：">
					<span>{{form.buildingName}}</span>
				</el-form-item>
				<el-form-item label="照片状态：">
					<span v-if="form.isPass==1">未审核</span>
					<span v-if="form.isPass==2">已审核</span>
				</el-form-item>
				<el-form-item label="照片类型：" required>
	            	<el-select 
	            	  size="small" 
	            	  clearable 
	            	  v-model="form.menuId" 
	            	  @change="menuIdChange($event,true)" 
	            	  style="width:150px">
	                	<el-option 
	                		v-for="(item,index) in selectList" 
	                		:key="item.menuName" 
	                		:label="item.menuName" 
	                		:value="item.menuId">
	                	</el-option>
	                </el-select>
                </el-form-item>  
                <el-form-item label="照片分类：" required>
	                <el-select 
	                  size="small" 
	                  clearable 
	                  v-model="form.menuChildId" 
					  @change="menuChildIdChange($event,true)" 
	                  style="width:150px">
	                	<el-option 
	                		v-for="(item,index) in menuChildList" 
	                		:key="item.menuChildName" 
	                		:label="item.menuChildName" 
	                		:value="item.menuChildId">
	                	</el-option>
	                </el-select>
	                <el-select size="small" clearable v-show="menuGrandList.length>0" v-model="form.menuGrandId" style="width:150px">
	                	<el-option 
	                		v-for="(item,index) in menuGrandList" 
	                		:key="item.menuGrandName" 
	                		:label="item.menuGrandName" 
	                		:value="item.menuGrandId">
	                	</el-option>
	                </el-select>
                </el-form-item>
				</el-form-item>
				<el-form-item label="描述：">
	            	<span>{{form.describe}}</span>
	            </el-form-item>
				<el-form-item label="位置信息：">
	            	<span>
	            		{{form.buildingName}}
						<span v-if="form.locationType == 1">(自动定位)</span>
          				<span v-else>(手动选择)</span>	
	            	</span>
	            </el-form-item>
	            <el-form-item label="提交用户：">
	            	<span>{{form.userName}}{{form.userPhone}}</span>
	            </el-form-item>
	            <el-form-item label="提交时间：">
	            	<span>{{form.uploadTime}}</span>
	            </el-form-item>

	            <el-form-item label="照片：">
	          		<el-row :gutter="20" style="padding-left: 80px">
				        <el-col :span="8" v-for="(item,index) in form.buildingContributionPicsList" :key="index">
				          <div class="img-container" :style="{backgroundImage:'url('+item.picUrl+')'}" >
				            <el-checkbox 
				              style="position: absolute;left: 10px;top: 10px;z-index: 3" 
				              v-if="checks[index]" 
				              v-model="checks[index].checked"
				              @change="checkChange(checks[index].id)"> 
				            </el-checkbox>
				            <div class="wap" @click="viewImg(item.picUrl)">
				              <i class="el-icon-view ico"></i>
				            </div>
				          </div>
				        </el-col>
				    </el-row>
				    <span style="font-size: 13px;color: #1d90e6;position: relative;top: 10px;left: 80px">&nbsp请勾选您认为符合要求的照片</span>
	            </el-form-item>
	            <el-form-item label="请为不通过的照片选择理由：">
	            	<el-radio-group v-model="form.rejectReason" :disabled="selects.length == form.buildingContributionPicsList.length">
		              <el-radio label="1" class="raLab">照片包含违法信息</el-radio>
		              <el-radio label="2" class="raLab">照片与主题无关</el-radio>
		              <el-radio label="3" class="raLab">照片模糊不清</el-radio>
		              <el-radio label="4" class="raLab">照片重复上传</el-radio>
		              <el-radio label="5" class="raLab">同一问题重复提交</el-radio>
		              <el-radio label="6" class="raLab">照片不符合收录要求</el-radio>
		            </el-radio-group>
	            </el-form-item>
	            <el-form-item>
	            	<el-button style="margin-left: 150px" type="primary"  @click="submit">确认</el-button>
        			<el-button  @click="back">返回</el-button>
	            </el-form-item>
			</el-form>
		</div>
		<el-dialog :visible.sync="dialogVisible">
      		<img width="100%" :src="dialogImgSrc" alt="">
    	</el-dialog>
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
					{path:'/unopened/estateunopenedexamine',name:'首页'},
					{path:this.$route.query.path,name:'未开放楼盘审核'},
					{path:this.$route.fullPath,name:this.$route.query.name},
				],
				dialogImgSrc:'',
				dialogVisible:false,
				checks:[],
        		selects:[],
        		selectList:[],
        		menuChildList:[],
        		menuGrandList:[],
        		menuId:'',
        		menuChildId:'',
        		menuGrandId:'',
        		form:{
        			
        		}	
			}
		},
		created(){
			this.initData();
      		this.$store.dispatch('defaultIndexAction','/unopened/estateunopenedexamine');
		},
		methods:{
			//初始化数据
			initData(){
				let info = JSON.parse(this.$route.query.info);
				this.form = _.cloneDeep(info);
				this.menuId = this.form.menuId;
				this.menuChildId = this.form.menuChildId;
				this.menuGrandId = this.form.menuGrandId;
				this.initSelect();
				this.selectList = window.localStorage.eSelectList? JSON.parse(window.localStorage.eSelectList) : [];
				this.menuIdChange(this.form.menuId,false);
				this.menuChildIdChange(this.form.menuChildId,false);
			},
			initSelect(){
		        this.checks = [];
		        this.selects = [];
		        this.form.buildingContributionPicsList.forEach(item => {
		          this.checks.push({
		            id:item.id,
		            checked:false
		          })
		        });
		    },
			checkChange(id){
		        let set = new Set(this.selects);
		        if(set.has(id)){
		          set.delete(id);
		        }else{
		          set.add(id);
		        }
		        this.selects = Array.from(set);
		    },
			//menuId 改变
		    menuIdChange(menuId,swi){
		    	if(swi){
		    		this.form.menuChildId = '';
		        	this.form.menuGrandId = '';
		    	};
		    	this.menuChildList = [];
		        this.menuGrandList = [];
		        this.selectList.forEach(item => {
		          if(item.menuId == menuId){
		            this.menuChildList = item.menuChildList;
		          }
		        })
		    },
		    //menuChildId 改变
		    menuChildIdChange(menuChildId,swi){
		    	if(swi){
		    		this.form.menuGrandId = '';
		    	};
		    	this.menuGrandList = [];
		        this.selectList.forEach(item => {
		          if(item.menuId == this.form.menuId){
		            item.menuChildList.forEach(item1 => {
		              if(item1.menuChildId == menuChildId){
		                this.menuGrandList = item1.menuGrandList;
		              }
		            })
		          }
		        })
		    },
		    viewImg(src){
		        this.dialogImgSrc = src;
		        this.dialogVisible = true;
		    },
		    //提交
		    submit(){
		        if(this.form.menuId == ''){
				  message(this,'请选择照片类型','warning')
				  return;
		        }
		        if(this.form.menuChildId == '' || (this.menuGrandList.length>0 && this.form.menuGrandId == '')){
				  message(this,'请选择照片分类','warning')
				  return;
		        }
		        if(this.form.rejectReason == null && this.selects.length != this.form.buildingContributionPicsList.length){
		          message(this,'请选择驳回理由','warning')
		          return;
		        }
		        let body = _.cloneDeep(this.form);
		        for(let i in body){
		        	if(i != 'id' && i != 'menuId' && i != 'menuChildId' && i!= 'menuGrandId' && i != 'rejectReason' && i != 'isEdit' && i != 'buildingId' && i != 'userId'){
		        		delete body[i];
		        	}
		        }
		        body.isEdit = (body.menuId == this.menuId && body.menuChildId == this.menuChildId && body.menuGrandId == this.menuGrandId)? 1 : 2
		        body.picIds = this.selects.join(',');
		        this.$confirm('确认提交吗?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {
			        this.$http('/buildingContribution/updateInfo',{body},{},{},'post').then(res => {
			          if(res.data.code == 0){
			            if(res.data.response.res == 1){
			      		  this.$router.push(this.$route.query.path)
			              message(this,'提交成功','success')
			            }else{
			              message(this,'提交失败','warning')
			            }
			          }
			        })
			    }).catch(() => {

			    })
		    },
			//返回
			back(){
				this.$router.push({
					path:this.$route.query.path
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
	
	.img-container{
		position: relative;
		cursor: pointer;
		margin-top: 20px;
		height: 180px;
		position: relative;
		background-position: center center;
		background-repeat: no-repeat;
		background-size:cover; 
	}
	.img-container:hover .wap{
		display: block;
	}
	.img-container .wap{
		z-index: 2;
		text-align: center;
		position: absolute;
		left: 0;
		right: 0;
		top:0;
		bottom: 0;
		background: rgba(0,0,0,.5);
		line-height: 180px;
		display: none;
	}
	.img-container .wap .ico{
		color: #FFF;
	}
</style>