<template>


  <el-menu router="true" theme="dark"  class="el-menu-demo" index="" default-active="10" mode="horizontal" style="height:45px;line-height:45px;padding:0px 20px;padding-right:10px">
    <router-link to="/index/managers" style="color:#f1f1f1;line-height:45px;">
      <span style="font-size:14px">买家帮运营管理平台</span>
    </router-link>
    <el-button style="padding:3px 7px;margin-left:15px"  @click.native="changeNav">
      <i class="fa fa-bars"></i>
    </el-button>
    <el-submenu index="" style="height:45px;line-height:45px;float:right">
      <template slot="title" style="height:45px;line-height:45px">管理员</template>
      <el-menu-item index="4" style="height:45px;line-height:45px">个人信息</el-menu-item>
      <el-menu-item  index="/index/changePassword" style="height:45px;line-height:45px">修改密码</el-menu-item>
      <el-menu-item index="3" style="height:45px;line-height:45px">退出</el-menu-item>
    </el-submenu>
  </el-menu>


</template>

<script>
export default {
    name:'topbar',
    data() {
      return {

      };
    },
    computed:{

    },
    methods: {

      changeNav(){
        var navStyleWidth = this.$store.getters.GetNavStyle.width
        if(navStyleWidth=='160px'){
          this.$store.dispatch('navStyleAction',{width:'0px',flex:'0 0 0px'});
        }else{
          this.$store.dispatch('navStyleAction',{width:'160px',flex:'0 0 160px'});
        }
      },
    },
    mounted(){

    }
  }
</script>

<style scoped>
  .el-menu--horizontal .el-menu-item{height: 45px;line-height: 45px;width: 100px}
  .el-submenu__title{height: 45px!important;line-height: 45px!important}
  .el-menu--horizontal .el-submenu>.el-menu{top: 50px!important;overflow-x: hidden;}
  .el-menu--horizontal .el-submenu .el-menu-item{width: 100px!important}
  .el-menu{border-radius: 0px!important}

</style>
<style type="text/css">
  .el-menu--horizontal .el-submenu .el-submenu__title{height: 45px;line-height: 45px;}
</style>
