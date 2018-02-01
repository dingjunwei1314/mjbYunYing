<template>
	<div style="display: inline-block">
		<el-select 
	        size="small"
	        style="width: 150px"
	        v-model="filterForm.province" 
	        clearable  
	        @change = "provinceChange(filterForm.province)"
	        placeholder="省">
	        <el-option 
	          v-for="item in provinceIdsList"
	          :key="item.cityId"
	          :label="item.cityName"
	          :value="item.cityId">
	        </el-option>
      	</el-select>
      	<el-select size="small" 
	      	style="width: 150px" 
	      	v-model="filterForm.city" 
	      	@change = "cityChange(filterForm.city)" 
	      	clearable  
	      	placeholder="市">
	        <el-option
	          v-for="item in cityIdsList"
	          :key="item.cityId"
	          :label="item.cityName"
	          :value="item.cityId">
	        </el-option>
	    </el-select>
	    <el-select size="small" 
	    	v-if = "isShowArea"
	      	style="width: 150px" 
	      	v-model="filterForm.area" 
	      	@change = "areaChange(filterForm.area)" 
	      	clearable  
	      	placeholder="区">
	        <el-option
	          v-for="item in areaIdsList"
	          :key="item.cityId"
	          :label="item.cityName"
	          :value="item.cityId">
	        </el-option>
	    </el-select>
	</div>
</template>
<script>
	export default{
		props:{
			_province:{
				default:'',
				require:true
			},
			_city:{
				default:'',
				require:true
			},
			_area:{
				default:''
			},
			isShowArea:{
				default:false
			}
		},
		data(){
			return {
				swi:false,
				filterForm:{
					province:this._province,
					city:this._city,
					area:this._area
				},
				provinceIdsList:[],
				cityIdsList:[],
				areaIdsList:[]
			}
		},
		created(){
			this.getData(1);
			if(this._province){
				this.getData(2,this._province);
			}
			if(this.isShowArea && this._city){
				this.getData(3,this._city);
			}
		},
		watch:{
			'_province':function(val){
				this.filterForm.province = val;
			},
			'_city':function(val){
				this.filterForm.city = val;
			},
			'_area':function(val){
				this.filterForm.area = val;
			},
		},
		methods:{
			//获取省市区数据
			getData(cityType,parentid = ''){
				let body = {cityType,parentid};
				
				this.$http('/citis/cityLists',{body},{},{},'post').then(res => {
				  if(res.data.code == 0){
				  	if(cityType == 1){
				  		this.provinceIdsList = res.data.response.cityList; 
				  	}else if(cityType == 2){
						this.cityIdsList = parentid == ''? [] : res.data.response.cityList;
						this.areaIdsList = [];
						if(this.swi){
							this.filterForm.city = '';
							this.filterForm.area = '';
						}
						if(!this.isShowArea){
							this.swi = true;
						}
				  	}else{
						this.areaIdsList = parentid == ''? [] : res.data.response.cityList;
						if(this.swi){
							this.filterForm.area = '';
						}
						this.swi = true;
				  	}     
				  }
				})
			},
			//联动
			provinceChange(province){
				this.getData(2,province);	
				this.$emit('update:_province',province);
			},
			cityChange(city){
				if(this.isShowArea){
					this.getData(3,city);
				}
				this.$emit('update:_city',city);
			},
			areaChange(area){
				this.$emit('update:_area',area);
			}
		}
	}
</script>