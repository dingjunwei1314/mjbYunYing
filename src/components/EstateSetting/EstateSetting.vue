<template>
  <div>
	<el-form  :model="form" label-width="150px" class="demo-dynamic">
      <el-form-item label="是否推荐至首页"  prop="gczl">
        <el-radio-group v-model="form.configList[0].configValue">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
        <el-button type="text" class="submitBtn"  @click="submit(0)">保存</el-button>
      </el-form-item>
      <el-form-item label="楼盘置顶">
      	<el-radio-group v-model="form.configList[1].configValue">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
        <el-button type="text" class="submitBtn"  @click="submit(1)">保存</el-button>
      </el-form-item>
      <el-form-item label="加入关注">
        <el-radio-group v-model="form.configList[2].configValue">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
        <el-button type="text" class="submitBtn"  @click="submit(2)">保存</el-button>
      </el-form-item>
      <el-form-item label="全流程监控楼盘">
        <el-radio-group v-model="form.configList[3].configValue">
          <el-radio :label="1">启动</el-radio>
          <el-radio :label="0">停止</el-radio>
        </el-radio-group>
        <el-button type="text" class="submitBtn"  @click="submit(3)">保存</el-button>
      </el-form-item>
      <el-form-item label="监控楼盘">
        <el-radio-group v-model="form.configList[4].configValue">
          <el-radio :label="1">启动</el-radio>
          <el-radio :label="0">停止</el-radio>
        </el-radio-group>
        <el-button type="text" class="submitBtn"  @click="submit(4)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
	import message from '../../common/message';
	export default{
		name:'',
		components:{

		},
		data(){
			return{
				//楼盘设置表单
				form:{
			        configList:[
						{configType:0,configValue:''},
						{configType:1,configValue:''},
						{configType:2,configValue:''},
						{configType:3,configValue:''},
						{configType:4,configValue:''},
			        ]
		    	}
			}
		},
		computed:{
			id:function(){
				return this.$store.getters.GetBuildingId
			}
		},
		methods:{
			//获取数据
			getSettingData(){
		        let _this = this,
		        body = {buildingId:this.$route.query.buildingId};
		        this.$http('/backstageBuilding/getBuildingConfig',{},{body},{}).then(function(res){
		          if(res.data.code == 0){
		            let _form = res.data.response.configList;
		            _form.forEach((item,index) => {
		              _this.form.configList[item.configType].configValue = item.configValue
		            })
		          }
		        }).catch(function(err){
		          console.log(err)
		        })
		    },
			//提交数据
	    	submit(configType){
		        let _this = this,
		        	url = '/backstageBuilding/editBuildingConfig',
		        	body = {
		        		buildingId:this.id,
						configType,
						configValue:this.form.configList[configType].configValue
		        	};

		        _this.$confirm('确认保存吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		            this.$http(url,{body},{},{},'post').then(res =>{ 
			          if(res.data.code == 0){
			          	if(res.data.response.status == 1){
							message(_this,'保存成功','success')
			          	}else{
			          		message(_this,'保存失败','warning')
			          	}
			       		
			          }else{
			          	message(_this,res.data.message,'warning')
			          }
			        }).catch(err =>{
			        	console.log(err)
			        })
		        }).catch(() => {
		            message(_this,'已取消保存','info')        
		        });
	      	},
		},
		mounted(){
			if(this.$route.query.type && this.$route.query.type === 'edit'){
				this.getSettingData()
			}
		}

	}
</script>

<style scoped>
	.demo-dynamic{
		width:800px;
		margin:20px auto 0px;
	}
	.submitBtn{
		float: right;margin-right: 500px
	}
</style>