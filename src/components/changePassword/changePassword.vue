<template>
  <div class="changePassword">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <p>修改密码</p>
    <div class="changePasswordTop">
      <div>
        <span>原密码 ：</span>
        <el-input type="password" v-model="updata.old_password"></el-input>
      </div>
      <div>
        <span>新密码 ：</span>
        <el-input type="password" v-model="updata.new_password"></el-input>
      </div>
      <div>
        <span>确认密码 ：</span>
        <el-input type="password" v-model="updata.new_password_sure"></el-input>
      </div>
    </div>
    <div class="consultParticularsFoot">
      <el-button type="primary" @click="updata_btn">保存</el-button>
    </div>
  </div>
</template>
<script>
  import Subnav from '../Subnav/Subnav.vue'

  export default {
    name:'changePassword',
    components:{
      Subnav,
    },
    data(){
      return{
        secondLevel:'修改密码',
        threeLevel:'修改密码',
        updata:{
          old_password:'',
          new_password:'',
          new_password_sure:''
        }
      }
    },
    methods: {
      updata_btn(){
        if(this.updata.old_password.length<6 || this.updata.old_password.length>16){
          this.$message({
            type: 'warning',
            message: '旧密码必须是6-16位字符!'
          });
          return;
        }
        if(this.updata.new_password.length<6 || this.updata.new_password.length>16){
          this.$message({
            type: 'warning',
            message: '新密码必须是6-16位字符!'
          });
          return;
        }
        if(this.updata.new_password_sure.length<6 || this.updata.new_password_sure.length>16){
          this.$message({
            type: 'warning',
            message: '确认密码必须是6-16位字符!'
          });
          return;
        }
        if(this.updata.new_password_sure!==this.updata.new_password){
          this.$message({
            type: 'warning',
            message: '两次输入的密码不一致!'
          });
          return;
        }
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      },
      refresh(){
        this.$store.dispatch('mainLoadingAction', true);
        var that = this
        setTimeout(function () {
          that.$store.dispatch('mainLoadingAction', false);
        }, 300)
      },

    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/changePassword');
      var that=this;
      setTimeout(function(){
        that.$store.dispatch('mainLoadingAction',false);
      },300)
    }
  }
</script>
<style>
  .changePasswordTop{
    border: 1px solid darkgray;margin:20px;
  }
   p{
    padding: 15px;
  }
  .changePasswordTop div{
    display: flex;
    width: 50%;
    margin: 10px auto;
  }
  .changePasswordTop input{
    width:200px;
  }
  .changePasswordTop span{
    width:150px;
    line-height: 56px;
    text-align: right;
  }
  .consultParticularsFoot{
    margin: 20px auto;
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display: flex;
    justify-content: space-around;
    width:20%;
  }
  .consultParticularsFoot button{
    width:200px;
  }
</style>
