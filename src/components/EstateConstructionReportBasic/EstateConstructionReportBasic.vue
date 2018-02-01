<template>
	<div>
		<el-form label-width="100px" :model="form" class="demo-form-inline">
        <el-form-item label="报告名称" required>
          <el-input v-if="$route.query.type!='view'"  size="small" v-model="form.name" style="width:300px" placeholder="报告名称"></el-input>
          <span v-else>{{form.name}}</span>
        </el-form-item>
        <el-form-item label="报告期数" required>
          <el-select v-if="$route.query.type!='view'" size="small" v-model="form.name" style="width:200px;">
            <el-option v-for="(item,index) in 40" :key="index" :label="'第'+item+'期'" :value="item"></el-option>
          </el-select>
          <span v-else>{{form.name}}</span>
        </el-form-item>
        <el-form-item label="当前状态">
          
        </el-form-item>
        <el-form-item label="创建人">
         
        </el-form-item>
        <el-form-item label="创建时间">
         
        </el-form-item>
        <el-form-item label="编辑人">
         
        </el-form-item>
        <el-form-item label="编辑时间">
         
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
					name:'',
					buildingId:this.buildingId
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
				if(this.form.name==''){
		          message(this,'请输入报告名','warning')
		          return;
		        }

		        if(this.form.name==''){
		          message(this,'请选择期数','warning')
		          return;
		        }
		        
		        this.$confirm('确认提交吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          let body = _.cloneDeep(this.form),
		          url;
		          
		          if(this.$route.query.type == 'edit'){
		            url = '/backstageUser/updateInfo';
		          }else{
		            url = '/backstageUser/insertInfo';
		          }
		          
		          this.$http(url,{body},{},{},'post').then(res => {
		            if(res.data.code == 0){
		             
		            }
		          })
		        }).catch(() => {

		        })
			}
		}
	}
</script>
<style scoped>
	
</style>