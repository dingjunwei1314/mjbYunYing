<template>
      <div :style="style1">
        <div id="container">
          <el-button size="small"  @click.native="fileUploader" :id="btnId">
            <span v-show="file">
              更新文件
            </span>
            <span v-show="!file">
              选择文件
            </span>
          </el-button>
          <span v-if ="file" style="margin-left:20px;font-size:12px;">{{text1}}：</span>
          <span v-if ="file" style="color:#20a0ff;font-size:12px;">{{file}}</span>
          <el-button style="margin-left:10px" size="small" v-show ="file"  @click.native="fileDelete">
            <span>
              {{btnName}}
            </span>
          </el-button>
        </div>
      </div>
</template>
<script>

export default {
    name:'fileUploader',
    props:{
      style1:{
        type:Object,
        default:function(){
          return {}
        }
      },
      btnId:{
        type:String,
        default:''
      },
      text1:{
        type:String,
        default:'文件名称'
      },
      btnName:{
        type:String,
        default:'删除文件'
      },
      file:{
       
        default:''
      }
    },
    data(){
      return{
       
      }
    },
    computed:{
      
    },
    methods: {
      fileUploader(){
        this.$emit('fileUploader')
      },
      fileDelete(){
        console.log('fileDelete')
        this.$emit('fileDelete')
      }
    },
    mounted(){
    }
  }
</script>

<style scoped>

</style>
