<template>
  <div class="changePassword">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <p>修改密码</p>
    <div class="changePasswordTop">
        <div>
          <span>原密码 ：</span>
          <el-input v-model="input"></el-input>
        </div>
      <div>
        <span>新密码 ：</span>
        <el-input v-model="input"></el-input>
      </div>
      <div>
        <span>确认密码 ：</span>
        <el-input v-model="input"></el-input>
      </div>
    </div>
    <div class="consultParticularsFoot">
      <el-button type="primary">保存</el-button>
      <el-button type="danger">取消</el-button>
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

      }
    },
    methods: {
      refresh(){
        this.$store.dispatch('mainLoadingAction', true);
        this.getdata()
        this.currentPage = 1;
        for (var i in this.filterForm) {
          this.filterForm[i] = ''
        }
        var that = this
        setTimeout(function () {
          that.$store.dispatch('mainLoadingAction', false);
        }, 300)
      },

    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/accountAdmin');
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
