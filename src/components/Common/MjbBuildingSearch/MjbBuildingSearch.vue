<template>
	<div style="display: inline-block">
		<el-autocomplete
			size="small"
			v-model="buildingName"
			:fetch-suggestions="querySearchAsync"
			placeholder="请输入关键词"
			@select="handleSelect">
		</el-autocomplete>
	</div>
</template>
<script>
	export default{
		props:{
			_buildingName:{
				default:'',
			},
		},
		data(){
			return {
				buidingList:[],
				buildingName:''
			}
		},
		created(){
			this.remoteMethod('');
		},
		watch:{
			
		},
		methods:{
			//模糊搜索
			remoteMethod(val){
				let body = {buildingName: val};
				this.$http('/backstageBuilding/getBuildingNameList', {body}, {}, {}, 'post').then( res => {
				  if (res.data.code == 0) {
					this.buidingList = res.data.response;
				  }
				})
			},
			//搜索
			querySearchAsync(queryString,cb){
				this.$emit('update:_buildingName',queryString);
				let buidingList = this.buidingList;
				var results = queryString ? buidingList.filter(this.createStateFilter(queryString)) : buidingList;
				cb(results)
			},
			createStateFilter(queryString) {
				return (state) => {
				  return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
				};
			},
			handleSelect(str){
				this.$emit('update:_buildingName',this.buildingName)
			},
		}
	}
</script> 