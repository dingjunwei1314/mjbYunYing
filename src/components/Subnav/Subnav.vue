<template>
    
      
  <div class="header">
    
    <el-breadcrumb separator="/" style="float:left:margin-top:14px">
      <i class="fa fa-home" style="float:left;font-size:16px;color:#324157;position:relative;margin-right:3px;top:-2px"></i>
      <el-breadcrumb-item to = "/estate/estatemanagement">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to = "subSrc">{{secondLevel}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{threeLevel}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click.native="refresh" style="float:right;margin-top:7px;"><i class="fa fa-refresh"></i></el-button>
  </div>
        
 
</template>

<script>
export default {
    name:'subnav',
    props:{
      secondLevel:{
        required:true,
        type:String,
        default:'二级导航'
      },
      threeLevel:{
        required:true,
        type:String,
        default:'三级导航'
      },
      subSrc:{
        required:false,
        type:String,
        default:'/estate/estatemanagement'
      }
    },
    data() {
      return {
  
      };
    },
    computed:{
      
    },
    methods: {
      refresh(){
        this.$emit('refresh')
      }
    },
    mounted(){
      
    }
  }
</script>

<style scoped>
  .header{background: #eef1f6;height: 40px;padding: 0px 20px;font-size: 13px;border-bottom: 1px solid #ccc;}
  .el-breadcrumb{float: left;margin-top: 14px}
  .el-button{padding: 5px 8px}
</style>
