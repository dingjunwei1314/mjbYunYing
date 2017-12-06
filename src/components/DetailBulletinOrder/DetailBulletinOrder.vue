<template>
  <div class="debuor">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

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
        <span style="color:#111">{{tableData.besCount}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="is_loading_tab"
        ref="multipleTable"
        :data="tableData.besUserInfoList"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          prop="besId"
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
        v-show="tableData.besCount>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next"
        :page-size=10
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="tableData.besCount">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>

import Subnav from '../Subnav/Subnav'
import message from '../../common/message'

export default {
    name:'debuor',
    components:{
      Subnav
    },
    data() {
      return {
        currentPage:1,
        secondLevel:'预约管理',
        threeLevel:'预约用户详情',
        filterForm: {
          pageNum:0,
          pageSize:10,
          userPhone:'',
          userStatus:'',
          buildingId:this.$route.query.buildingId
        },
        tableData: {
          besCount:0,
          besUserInfoList:[]
        },
        is_loading_tab:false,
      };
    },
    computed:{
                                        
    },
    created(){
      this.getdata()
    },
    methods: {
      //请求数据方法
      getdata(){
        let _this = this;
        _this.is_loading_tab = true;
        this.$http('/backstageSub/getBesUserInfoList',{body:_this.filterForm},{},{},'post').then(function(res){
          _this.is_loading_tab = false;
          _this.$store.dispatch('mainLoadingAction',false);
          if(res.data.code == 0){
            _this.tableData = res.data.response;
          }else if(res.data.code == 300){
            _this.$router.push('/login')
          }else{
            message(_this,res.data.message,'warning')
          }
        }).catch(function(err){
          console.log(err)
          _this.is_loading_tab=false;
          _this.$store.dispatch('mainLoadingAction',false);
        })
      },
      //触发搜索
      onSearchSubmit(){
        this.filterForm.pageNum = 0;
        if(this.currentPage != 1){
          this.currentPage = 1;
        }else{
          this.getdata()
        }
      },
      //改变页码
      currentChange(page){
        this.currentPage = page;
        this.filterForm.pageNum = page-1;
        this.getdata()
      },
      //刷新方法
      refresh(){
      },
    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/bulletinorder');
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
