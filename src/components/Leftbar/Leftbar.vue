<template>
  <el-menu :router="router" :default-active="defaultIndex" class="el-menu-vertical-demo leftbar" @open="handleOpen" @close="handleClose" :unique-opened=true style="overflow-x:hidden" :style="navStyle">
      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-user-o" style="margin-right:10px"></i>
          <span slot="title">楼盘</span>
        </template>
        <el-menu-item index="/index/estatemanagement">楼盘管理</el-menu-item>
        <el-menu-item index="/index/rankinglist">排行榜</el-menu-item>
        <!-- <el-menu-item index="/index/expectingbuildings">用户期待开放楼盘</el-menu-item> -->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-user-o" style="margin-right:10px"></i>
          <span slot="title">文章管理</span>
        </template>
        <el-menu-item index="/index/articlemanagement">文章管理</el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <i class="fa fa-user-o" style="margin-right:10px"></i>
          <span slot="title">订阅管理</span>
        </template>
        <el-menu-item index="/index/bulletinsubscription">订阅简报</el-menu-item>
        <el-menu-item index="/index/bulletinorder">预约简报</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-user-o" style="margin-right:10px"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item index="/index/cooperorders">合作买房</el-menu-item>
      </el-submenu>
    
      <el-submenu index="4">
        <template slot="title">
          <i class="fa fa-user-o" style="margin-right:10px"></i>
          <span slot="title">活动管理</span>
        </template>
        <el-menu-item index="/index/activitymanagement">活动管理</el-menu-item>
      </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="fa fa-user-o" style="margin-right:10px"></i>
        <span slot="title">咨询管理</span>
      </template>
      <el-menu-item index="/index/consultAdmin">咨询管理</el-menu-item>
    </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="fa fa-user-o" style="margin-right:10px"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item index="/index/userlist">用户管理</el-menu-item>
        <el-menu-item index="/index/intentuserlist">买房意向管理</el-menu-item>
        <el-menu-item index="/index/messagemanagement">消息管理</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="fa fa-user-o" style="margin-right:10px"></i>
          <span slot="title">账户管理</span>
        </template>
        <el-menu-item index="/index/rolemanagement">角色管理</el-menu-item>
        <el-menu-item index="/index/accountmanagement">账户管理</el-menu-item>
        <el-menu-item index="/index/changePassword">修改密码</el-menu-item>
      </el-submenu>
  </el-menu>


</template>

<script>
export default {
    name:'leftbar',
    data() {
      return {
        router:true,
      };
    },
    computed:{
      navStyle(){
        return this.$store.getters.GetNavStyle
      },
      defaultIndex(){
        return this.$store.getters.GetDefaultIndex
      }
    },
    methods: {
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
    },
    mounted(){

    }
  }
</script>

<style scoped>

.leftbar::-webkit-scrollbar-thumb{background: #324157;width: 3px}
.leftbar::-webkit-scrollbar-track{background: #ccc;width: 3px}
.leftbar::-webkit-scrollbar{width: 3px}
</style>
