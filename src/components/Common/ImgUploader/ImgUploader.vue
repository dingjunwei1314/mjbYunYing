<template>
      <div>
        <div v-show="backgroundPicUrl" class="uploadImgCon">
          <img :src="backgroundPicUrl"alt="">
          <div class="upWap">
            <i @click="previewImg" class="el-icon-view"></i>
            <i @click="deleteImg" class="el-icon-delete"></i>
          </div>
        </div>
        <el-dialog :visible.sync="dialogVisible"  size="tiny" :before-close="dialogClose">
          <img width="100%" :src="backgroundPicUrl" alt="">
        </el-dialog>
        <div id="container">
          <el-button size="small" type="primary" @click="imgUploader" id="upbtn">
            <span v-if = "backgroundPicUrl == ''">点击上传</span>
            <span v-else>重新上传</span>
          </el-button>
        </div>
      </div>
</template>
<script>

export default {
    name:'ImgUploader',
    props:{
      backgroundPicUrl:{
        type:String,
        default:''
      },
      dialogVisible:{
        type:Boolean,
        default:false
      },
    },
    data(){
      return{
       
      }
    },
    computed:{
      
    },
    methods: {
      previewImg(){
        this.$emit('previewImg')
      },
      deleteImg(){
        this.$emit('deleteImg')
      },
      imgUploader(){
        this.$emit('imgUploader')
      },
      dialogClose(){
        this.$emit('dialogClose')
      }
    },
    mounted(){
    }
  }
</script>

<style scoped>
    .uploadImgCon{
      width: 148px;
      height: 148px;
      border-radius: 5px;
      overflow:hidden;
      position: relative;
      cursor: pointer;
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
