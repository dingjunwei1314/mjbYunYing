<template>
	<el-form ref="form" :inline="inline" :model="form" :label-width="labelWidth">
	  <el-form-item label="楼栋号" :required="required">
		<el-select 
		size="small" 
		clearable
		:disabled="form.buildingId==''" 
		@change="conditionChange('buildingNum')" 
		v-model="form.buildingNum" 
		placeholder="不限" 
		:style="itemStyle">
		  <el-option v-for="(item,index) in buildingNumArray" :key="item.id" :label="item.id" :value="item.id"></el-option>
		</el-select>
	  </el-form-item>
	  <el-form-item label="单元" :required="required">
		<el-select 
		size="small" 
		clearable 
		:disabled="form.buildingNum==''" 
		@change="conditionChange('unitNum')" 
		v-model="form.unitNum" 
		placeholder="不限" 
		:style="itemStyle">
		  <el-option v-for="(item,index) in unitNumArray" :key="item.id" :label="item.id" :value="item.id"></el-option>
		</el-select>
	  </el-form-item>
	  <el-form-item label="楼层" :required="required">
		<el-select 
		size="small" 
		clearable 
		:disabled="form.buildingNum=='' || form.unitNum==''" 
		@change="conditionChange('floor')" 
		v-model="form.floor" placeholder="不限" 
		:style="itemStyle">
		  <el-option v-for="(item,index) in floorArray" :key="item.id" :label="item.id" :value="item.id"></el-option>
		</el-select>
	  </el-form-item>
	  <el-form-item label="户号" :required="required">
		<el-select 
		size="small" 
		clearable 
		:disabled="form.buildingNum=='' || form.unitNum=='' || form.floor==''" 
		@change="conditionChange('accountNum')" 
		v-model="form.accountNum" 
		placeholder="不限" 
		:style="itemStyle">
		  <el-option v-for="(item,index) in accountNumArray" :key="item.id" :label="item.id" :value="item.id"></el-option>
		</el-select>
	  </el-form-item>
	</el-form>
</template>

<script>
	export default{
		name:'BuildingLinkage',
		props:{
			_buildingId:{
				required:true,
				default:''
			},
			_buildingNum:{
				required:true,
				default:''
			},
			_unitNum:{
				required:true,
				default:''
			},
			_floor:{
				required:true,
				default:''
			},
			_accountNum:{
				required:true,
				default:''
			},
			inline:{
				default:true
			},
			required:{
				default:true
			},
			labelWidth:{
				default:'100px'
			},
			itemStyle:{
				default:function(){
					return {width:'200px'}
				}
			},
			changeSwith:{
				default:true
			}
		},
		data(){
			return{
				form:{
					buildingId:'',
					buildingNum:'',
					unitNum:'',
					floor:'',
					accountNum:'',
				},
				buildingNumArray:[],
				unitNumArray:[],
				floorArray:[],
				accountNumArray:[],
			}
		},
		watch:{
			'_buildingId':{
				handler:function(val){
					this.form.buildingId = val;
					this.form.buildingNum = '';
					this.$emit('update:_buildingNum','');
					this.conditionChange('buildingNum');
				}
			},
			'_buildingNum':{
				handler:function(val){
					this.form.buildingNum = val;
				}
			},
			'_unitNum':{
				handler:function(val){
					this.form.unitNum = val;
				}
			},
			'_floor':{
				handler:function(val){
					this.form.floor = val;
				}
			},
			'_accountNum':{
				handler:function(val){
					this.form.accountNum = val;
				}
			},
		},
		created(){
		},
		methods:{
			conditionChange(name){
				this.$emit('update:'+'_'+name,this.form[name]);
				if(name === 'buildingNum'){
					this.form.unitNum = '';
					this.form.floor = '';
					this.form.accountNum = '';
					this.$emit('update:_unitNum','');
					this.$emit('update:_floor','');
					this.$emit('update:_accountNum','');
				}else if(name === 'unitNum'){
					this.form.floor = '';
					this.form.accountNum = '';
					this.$emit('update:_floor','');
					this.$emit('update:_accountNum','');
				}else if(name === 'floor'){
					this.form.accountNum = '';
					this.$emit('update:_accountNum','');
				}
				let _this = this,
				body = _.cloneDeep(this.form);
				if(body.buildingId == ''){
					return;
				}
				this.$http('/buildingMonitor/pullDownExcelInfo',{body},{},{},'post').then(res => {
				  if(res.data.code == 0){
				  	let response = res.data.response;
				    _this.buildingNumArray = response.buildingNumArray;
				    _this.unitNumArray = response.unitNumArray;
				    _this.floorArray = response.floorArray;
				    _this.accountNumArray = response.accountNumArray;
				  }else if(res.data.code == 300){
					_this.$router.push('/login')
				  }
				}).catch(err => {
				  console.log(err);
				})
			},
		}
	}
</script>