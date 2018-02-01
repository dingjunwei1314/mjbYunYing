<template>
	<div style="display: inline-block">
		<el-date-picker
          size="small"
          style="width:300px"
          @change="pickerChange"
          v-model="editTime"
          type="datetimerange"
          align="right"
          placeholder="选择日期范围"
          >
        </el-date-picker>
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
			//改变时间格式
	        pickerChange(val){
	        	this.filterForm.startTime=val.slice(0,19);
	        	this.filterForm.endTime=val.slice(22);
	        },
		}
	}
</script> 