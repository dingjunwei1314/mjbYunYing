<template>
	<div v-show="backgroundPicUrl" class="uploadImgCon">
      <img :src="backgroundPicUrl" alt="">
      <div class="upWap">
        <i @click="previewImg" class="el-icon-view"></i>
        <i v-if="isShowDelete" @click="deleteImg" class="el-icon-delete"></i>
      </div>
    </div>
</template>

<script>
	export default {
		name:'',
		components:{

		},
		props:{
		  backgroundPicUrl:{
        type:String,
        default:''
	    },
	    isShowDelete:{
	    	type:Boolean,
	    	default:true 
	    }
		},
		data(){
			return{
			}
		},
		methods:{
			previewImg(){
	    	this.$emit('previewImg')
	    },
	    deleteImg(){
	    	this.$emit('deleteImg')
	    },
		}
	}
</script>

<style scoped>
    .uploadImgCon{
      display: inline-block;
      width: 148px;
      height: 148px;
      border-radius: 5px;
      overflow:hidden;
      position: relative;
      cursor: pointer;
      margin-right: 20px;
      box-shadow: 0px 0px 10px #666
    }
    .uploadImgCon .upWap{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0,0,0,.5);
      text-align: center;
      opacity: 0;
      transition: all .5s;
    }
    .uploadImgCon .upWap i{
      color: #f1f1f1;
      font-size: 18px;
      line-height: 148px;
    }
    .uploadImgCon .upWap i:nth-child(1){
      margin-right: 10px
    }
    .uploadImgCon img{width: 100%;height: 100%}
    .uploadImgCon:hover .upWap{opacity: 1;}
</style>