<template>
<!--   <el-menu :router="router" :default-active="defaultIndex" class="el-menu-vertical-demo leftbar" @open="handleOpen" @close="handleClose" :unique-opened=true style="overflow-x:hidden" :style="navStyle">
      <el-submenu :index="(index+1).toString()" v-for="(item,index) in navList" :key="item.name">
        <template slot="title">
          <i :class="item.icon" style="margin-right:10px"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <el-menu-item v-for="(item2,index2) in item.subList" :key="item2.name" :index="item2.sourceUrl">{{item2.name}}</el-menu-item>
      </el-submenu>                                     
  </el-menu> -->

  <el-menu :router="router" :default-active="defaultIndex" class="el-menu-vertical-demo leftbar" @open="handleOpen" @close="handleClose" :unique-opened=true style="overflow-x:hidden" :style="navStyle">
      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-building-o" style="margin-right:10px"></i>
          <span slot="title">楼盘</span>
        </template>
        <el-menu-item index="/estate/estatemanagement">楼盘管理</el-menu-item>
        <el-menu-item index="/estate/rankinglist">排行榜</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-wpforms" style="margin-right:10px"></i>
          <span slot="title">文章管理</span>
        </template>
        <el-menu-item index="/article/articlemanagement">文章管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-binoculars" style="margin-right:10px"></i>
          <span slot="title">全流程监控</span>
        </template>
        <el-menu-item index="/index/estateprocessmonitoringmanagement">全流程监控楼盘管理</el-menu-item>
        <el-menu-item index="/index/estateprocessmonitoringservice">服务管理</el-menu-item>
        <el-menu-item index="/index/estatepmsexamine">服务审核</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="fa fa-calendar" style="margin-right:10px"></i>
          <span slot="title">订阅管理</span>
        </template>
        <el-menu-item index="/subscribe/bulletinsubscription">订阅简报</el-menu-item>
        <el-menu-item index="/subscribe/bulletinorder">预约简报</el-menu-item>
      </el-submenu> 
      <el-submenu index="5">
        <template slot="title">
          <i class="fa fa-calendar" style="margin-right:10px"></i>
          <span slot="title">任务管理</span>
        </template>
        <el-menu-item index="/task/collectionmanagement">开放楼盘采集</el-menu-item>
        <el-menu-item index="/task/auditmanagement">开放楼盘审核</el-menu-item>
        <el-menu-item index="/task/estateunopenedmanagement">非开放楼盘审核</el-menu-item>
      </el-submenu> 
      <el-submenu index="6">
        <template slot="title">
          <i class="fa fa-calendar" style="margin-right:10px"></i>
          <span slot="title">未开放楼盘审核</span>
        </template>
        <el-menu-item index="/unopened/estateunopenedexamine">楼盘审核</el-menu-item>
        <el-menu-item index="/unopened/integralmanagement">积分管理</el-menu-item>
        <el-menu-item index="/unopened/integralchange">积分兑换</el-menu-item>
        <el-menu-item index="/unopened/integralrewardmanagement">楼盘奖励积分</el-menu-item>
      </el-submenu> 
      <el-submenu index="7">
        <template slot="title">
          <i class="fa fa-handshake-o" style="margin-right:10px"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item index="/order/cooperorders">合作买房</el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <i class="fa fa-laptop" style="margin-right:10px"></i>
          <span slot="title">活动管理</span>
        </template>
        <el-menu-item index="/activity/activitymanagement">活动管理</el-menu-item>
      </el-submenu>
      <el-submenu index="9">
        <template slot="title">
          <i class="fa fa-volume-control-phone" style="margin-right:10px"></i>
          <span slot="title">咨询管理</span>
        </template>
        <el-menu-item index="/consult/consultAdmin">咨询管理</el-menu-item>
      </el-submenu>
      <el-submenu index="10">
        <template slot="title">
          <i class="fa fa-user-o" style="margin-right:10px"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item index="/user/list">用户管理</el-menu-item>
        <el-menu-item index="/user/intentuserlist">买房意向管理</el-menu-item>
        <el-menu-item index="/user/messagemanagement">消息管理</el-menu-item>
      </el-submenu>
      <el-submenu index="11">
        <template slot="title">
          <i class="fa fa-user-plus" style="margin-right:10px"></i>
          <span slot="title">账户管理</span>
        </template>
        <el-menu-item index="/account/rolemanagement">角色管理</el-menu-item>
        <el-menu-item index="/account/accountmanagement">账户管理</el-menu-item>
        <el-menu-item index="/account/changePassword">修改密码</el-menu-item>
      </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex';
import message from '../../common/message';
export default {
    name:'leftbar',
    data() {
      return {
        router:true,
        navList:[]
      };
    },
    computed:{
      name () { 
          return 'first' 
      },
      ...mapState({
        navStyle:state => state.navStyle,
        defaultIndex:state => state.defaultIndex 
      })
    },
    created(){
      this.initData();
    },
    methods: {
      initData(){
        if(localStorage._Mjb_navList){
          this.navList = JSON.parse(localStorage._Mjb_navList);
        }else{
          this.$router.push('/login');
        }
      },
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
