<template>
    
      
  <el-dialog :title="dialogTitle" top="7%" :visible.sync="dialogFormVisible" :before-close="beforeClose" >
    <slot name="dia_body"></slot>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="dialogConfirm">确 定</el-button>
    </div>
  </el-dialog>
        
 
</template>
<script>

export default {
    name:'bigDialog',
    props:{
      dialogTitle:{
        required:true,
        type:String,
        default:'标题'
      },
      dialogFormVisible:{
        required:true,
        type:Boolean,
        default:false,
      }
    },
    data() {
      return{
      }
    },
    computed:{
      
    },
    methods: {
      dialogCancel(){
        this.$emit('dialogCancel')
      },
      dialogConfirm(){
        this.$emit('dialogConfirm')
      },
      beforeClose(){
        this.$emit('dialogCancel')
      }
    },
    mounted(){
      
    }
  }
</script>

<style scoped>
  
</style>
