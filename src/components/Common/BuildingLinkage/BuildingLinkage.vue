<template>
	<el-form ref="form" :inline="true" :model="form">
	  <el-form-item label="楼栋号">
		<el-select 
		size="small" 
		clearable 
		@change="conditionChange('buildingNum')" 
		v-model="form.buildingNum" 
		placeholder="不限" 
		style="width:150px;">
		  <el-option v-for="(item,index) in buildingNumArray" :key="item.id" :label="item.id" :value="item.id"></el-option>
		</el-select>
	  </el-form-item>
	  <el-form-item label="单元">
		<el-select 
		size="small" 
		clearable 
		:disabled="form.buildingNum==''" 
		@change="conditionChange('unitNum')" 
		v-model="form.unitNum" 
		placeholder="不限" 
		style="width:150px;">
		  <el-option v-for="(item,index) in unitNumArray" :key="item.id" :label="item.id" :value="item.id"></el-option>
		</el-select>
	  </el-form-item>
	  <el-form-item label="楼层">
		<el-select 
		size="small" 
		clearable 
		:disabled="form.buildingNum=='' || form.unitNum==''" 
		@change="conditionChange('floor')" 
		v-model="form.floor" placeholder="不限" 
		style="width:150px;">
		  <el-option v-for="(item,index) in floorArray" :key="item.id" :label="item.id" :value="item.id"></el-option>
		</el-select>
	  </el-form-item>
	  <el-form-item label="户号">
		<el-select 
		size="small" 
		clearable 
		:disabled="form.buildingNum=='' || form.unitNum=='' || form.floor==''" 
		@change="conditionChange('accountNum')" 
		v-model="form.accountNum" 
		placeholder="不限" 
		style="width:150px;">
		  <el-option v-for="(item,index) in accountNumArray" :key="item.id" :label="item.id" :value="item.id"></el-option>
		</el-select>
	  </el-form-item>
	  <el-form-item label="户型">
		<el-select 
		size="small" 
		clearable 
		:disabled="form.buildingNum=='' || form.unitNum=='' || form.floor=='' ||form.accountNum==''" 
		@change="conditionChange('houseType')" 
		v-model="form.houseType" 
		placeholder="不限" 
		style="width:150px;">
		  <el-option v-for="(item,index) in houseTypeArray" :key="item.name" :label="item.name" :value="item.name"></el-option>
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
			_houseType:{
				required:true,
				default:''
			},
			isDisabled:{
				required:false,
				default:false
			}
		},
		data(){
			return{
				form:{
					buildingId:this._buildingId,
					buildingNum:'',
					unitNum:'',
					floor:'',
					accountNum:'',
					houseType:'',
				},
				buildingNumArray:[],
				unitNumArray:[],
				floorArray:[],
				accountNumArray:[],
				houseTypeArray:[],
			}
		},
		created(){
			this.conditionChange(name)
		},
		methods:{
			conditionChange(name){
				this.$emit('update:'+'_'+name,this.form[name]);
				if(name === 'buildingNum'){
					this.form.unitNum = '';
					this.form.floor = '';
					this.form.accountNum = '';
					this.form.houseType = '';
					this.$emit('update:_unitNum','');
					this.$emit('update:_floor','');
					this.$emit('update:_accountNum','');
					this.$emit('update:_houseType','');
				}else if(name === 'unitNum'){
					this.form.floor = '';
					this.form.accountNum = '';
					this.form.houseType = '';
					this.$emit('update:_floor','');
					this.$emit('update:_accountNum','');
					this.$emit('update:_houseType','');
				}else if(name === 'floor'){
					this.form.accountNum = '';
					this.form.houseType = '';
					this.$emit('update:_accountNum','');
					this.$emit('update:_houseType','');
				}else if(name === 'accountNum'){
					this.form.houseType = '';
					this.$emit('update:_houseType','');
				};
				let _this = this,
				body = _.cloneDeep(this.form);
				delete body.houseType;
				this.$http('/buildingMonitor/pullDownExcelInfo',{body},{},{},'post').then(res => {
				  if(res.data.code == 0){
				  	let response = res.data.response;
				    _this.buildingNumArray = response.buildingNumArray;
				    _this.unitNumArray = response.unitNumArray;
				    _this.floorArray = response.floorArray;
				    _this.accountNumArray = response.accountNumArray;
				    _this.houseTypeArray = response.houseTypeArray;
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