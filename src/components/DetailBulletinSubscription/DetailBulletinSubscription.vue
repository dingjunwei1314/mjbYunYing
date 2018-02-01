<template>
  <div class="debusu">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>

    <div style="padding:20px">
      
      <el-row style="padding:20px 10px 0px 10px;border:1px solid #eee;margin-bottom:20px">
        <el-col :span="20">
          <el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">
            <el-form-item label="用户名">
              <el-input   v-model="filterForm.userPhone" style="width:220px" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="用户状态">
              <el-select v-model="filterForm.userStatus">
                <el-option label="全部" value=""></el-option>
                <el-option label="当前订阅中" value="1"></el-option>
                <el-option label="已取消" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <el-button type="primary" @click="onSearchSubmit">查询</el-button>
        </el-col>
      </el-row>
      
      <div class="tabletopbar">
        <span style="margin-left:20px">查询结果：共</span> 
        <span style="color:#111">{{tableData.subCount}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="is_loading_tab"
        ref="multipleTable"
        :data="tableData.subUserInfoList"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          prop="subId"
          label="订阅id"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="用户名"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="userEvent"
          label="事件"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="时间"
          min-width="80">
        </el-table-column>
      </el-table>
      
      <el-pagination
        v-show="tableData.subCount>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next"
        :page-size=10
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="tableData.subCount">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>

import Subnav2 from '../Subnav2/Subnav2'
import message from '../../common/message'

export default {
    name:'debusu',
    components:{
      Subnav2
    },
    data() {
      return {
        navList:[
          {path:'/subscribe/bulletinsubscription',name:'首页'},
          {path:'/subscribe/bulletinsubscription',name:'订阅管理'},
          {path:this.$route.fullPath,name:'订阅用户详情'}
        ],
        currentPage:1,
        filterForm: {
          pageNum:0,
          pageSize:10,
          userPhone:'',
          userStatus:'',
          buildingId:this.$route.query.buildingId
        },
        tableData: {
          subCount:0,
          subUserInfoList:[]
        },
        is_loading_tab:false,
      };
    },
    computed:{
                                        
    },
    created(){
      this.getData()
    },
    methods: {
      //请求数据方法
      getData(){
        let _this = this;
        _this.is_loading_tab = true;
        this.$http('/backstageSub/getSubUserInfoList',{body:_this.filterForm},{},{},'post').then(res => {
          _this.is_loading_tab = false;
          if(res.data.code == 0){
            _this.tableData = res.data.response;
          }
        })
      },
      //触发搜索
      onSearchSubmit(){
        this.filterForm.pageNum = 0;
        if(this.currentPage != 1){
          this.currentPage = 1;
        }else{
          this.getData()
        }
      },
      //改变页码
      currentChange(page){
        this.currentPage = page;
        this.filterForm.pageNum = page-1;
        this.getData()
      },
      //刷新方法
      refresh(){
      },
    },
    mounted(){
      this.$store.dispatch('defaultIndexAction','/subscribe/bulletinsubscription');
    }
  }
</script>

<style scoped>
.el-dialog{margin-bottom: 0px;margin-top: -100px!important}
.slide-enter-active, .slide-leave-active {
  transition: height 1s
}
.slide-enter,.slide-leave-to{
  height: 0
}
.slide-leave,.slide-enter-to{
  height: 100px
}
.tabletopbar{height:40px;background:#eef1f6;border-left:1px solid #dfe6ec;border-right:1px solid #dfe6ec;border-top:1px solid #dfe6ec;line-height:40px;font-size:12px;color:#555;padding:0px 15px;}

</style>

<style>
  .el-table--border td, .el-table--border th{text-align: center;}
</style>
