<template>
	<div>
		<el-form label-width="100px" :model="form" class="demo-form-inline">
        <el-form-item label="报告名称" required>
          <el-input v-if="$route.query.type!='view'"  size="small" v-model="form.reportName" style="width:300px" placeholder="报告名称"></el-input>
          <span v-else>{{form.reportName}}</span>
        </el-form-item>
        <el-form-item label="报告期数" required>
          <el-select v-if="$route.query.type!='view'" size="small" v-model="form.reportVersion" style="width:200px;">
            <el-option v-for="(item,index) in 40" :key="index" :label="'第'+item+'期'" :value="item"></el-option>
          </el-select>
          <span v-else>{{form.reportVersion}}</span>
        </el-form-item>
        <el-form-item label="当前状态" v-if="$route.query.type=='edit'">
          <el-select v-model="form.isOnline">
          	<el-option label="1">在线</el-option>
          	<el-option label="2">离线</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前状态" v-if="$route.query.type=='view'">
          
        </el-form-item>
        <el-form-item label="创建人" v-if="$route.query.type!='add'">
         
        </el-form-item>
        <el-form-item label="创建时间" v-if="$route.query.type!='add'">
         
        </el-form-item>
        <el-form-item label="编辑人" v-if="$route.query.type!='add'">
         
        </el-form-item>
        <el-form-item label="编辑时间" v-if="$route.query.type!='add'">
         
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left:100px" type="primary" @click="onSubmit" v-if="$route.query.type!='view'">确认</el-button>
        </el-form-item>
      </el-form>
	</div>
</template> 
<script>
	import message from '../../common/message';
	export default{
		name:'EstateConstructionReportTab',
		props:{
			buildingId:{
				default:''
			}
		},
		components:{
			
		},
		data(){
			return{
				form:{
					reportName:'楼盘建设进度报告',
					reportVersion:1,
					buildingId:this.buildingId,
				}
			}
		},
		created(){
      		if(this.$route.query.type != 'add'){
				this.getData()
			}
		},
		computed:{
			
		},
		methods:{
			getData(){

			},
			onSubmit(){
				if(this.form.reportName==''){
		          message(this,'请输入报告名','warning')
		          return;
		        }
		        if(this.form.reportVersion==''){
		          message(this,'请选择期数','warning')
		          return;
		        }
		        this.$confirm('确认提交吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          let body = _.cloneDeep(this.form),url;
		          
		          if(this.$route.query.type == 'edit'){
		            url = '/backstageUser/updateInfo';
		          }else{
		            url = '/buildingConstructionReport/insertInfo';
		          }
		          
		          this.$http(url,{body},{},{},'post').then(res => {
		            if(res.data.code == 0){
		              message(this,'提交成功','success');
		              this.$store.dispatch('reportIdAction',res.data.response.id);
		              console.log(this.$store.getters.GetReportId);
		            }
		          })
		        }).catch(() => {})
			}
		}
	}
</script>
<style scoped>
	
</style>