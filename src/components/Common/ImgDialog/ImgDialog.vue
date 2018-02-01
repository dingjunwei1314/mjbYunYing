<template>
	<el-dialog :visible.sync="dialogVisible" size="tiny" :before-close="beforeClose">
      <img width="100%" :src="dialogImgSrc" alt="">
    </el-dialog>
</template>

<script>
	export default {
		name:'',
		components:{

		},
		props:{
		    dialogImgSrc:{
		    	type:String,
		    	default:true 
		    },
		    dialogVisible:{
		    	type:Boolean,
		    	default:false
		    }
		},
		data(){
			return{

			}
		},
		methods:{
	    	beforeClose(){
	    		this.$emit('update:dialogVisible',false)
	    	}
		}
	}
</script>

   