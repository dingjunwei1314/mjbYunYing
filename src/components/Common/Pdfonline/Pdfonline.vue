<template>
    
      <div class="pdfonline" v-if="isshowpdf">
        <i class="el-icon-close" @click="close"></i>
        <iframe :src="src" width="80%" height="80%"  style="margin-left:10%;margin-top:5%"></iframe>
      </div>
 
</template>
<script>

export default {
    name:'area_all',
    props:{
      pdfsrc:{
        required:true,
        type:String,
        default:''
      },
      isshowpdf:{
        required:true,
        type:Boolean,
        default:false
      }

    },
    data(){
      return{
      
      }
    },
    computed:{
      src(){
        return '/static/generic/web/viewer.html?file='+this.pdfsrc
      }
    },
    methods: {
      close(){
        this.$emit('close')
      }
    },
    mounted(){
      
    }
  }
</script>

<style scoped>
  .pdfonline{position: fixed;left: 0;right: 0;top: 0px;bottom: 0px;background: rgba(0,0,0,.6);z-index: 9999;}
  .pdfonline i{float: right;font-size: 20px;color:#999;cursor: pointer;margin-right: 5%;margin-top: 40px}
</style>
