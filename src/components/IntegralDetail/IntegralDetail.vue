<template>
  <div class="managers">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>

    <div style="padding:20px">
    
      <el-button type="text" style="margin-bottom:20px" @click="back">返回</el-button>
      <div class="tabletopbar">
        <span style="margin-left:20px">查询结果：共</span> 
        <span style="color:#111">{{tableData.rowCount}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="tabLoading"
        ref="multipleTable"
        :data="tableData.scoreFlowList"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="scoreValue"
          label="积分"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="eventDes"
          label="事件"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="时间"
          min-width="60">
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="tableData.rowCount>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next,jumper"
        :page-size=10
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="tableData.rowCount">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>

import Subnav2 from '../Subnav2/Subnav2'
import message from '../../common/message'

export default {
    name:'managers',
    components:{
      Subnav2
    },
    data() {
      return {
        currentPage:1,
        navList:[
          {path:'/unopened/integralmanagement',name:'首页'},
          {path:'/unopened/integralmanagement',name:'积分管理'},
          {path:this.$route.fullPath,name:'详情'}
        ],
        filterForm: {
          userId:this.$route.query.userId,
          pageNum:0,
          pageSize:10,
        },
        tableData: {
          rowCount:0,
          scoreFlowList:[]
        },
        tabLoading:false,
      };
    },
    created(){
      this.getData()
    },
    methods: {
      //请求数据方法
      getData(){
        let body = this.filterForm;
        this.tabLoading = true;
        this.$http('/appUserScoreController/getUserScoreList',{},{body}).then(res => {
          this.tabLoading = false;
          if(res.data.code == 0){
            this.tableData = res.data.response;
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
      //返回
      back(){
        this.$router.push('/unopened/integralmanagement')
      },
      //刷新方法
      refresh(){
        this.filterForm.pageNum = 0;
        this.currentPage = 1;
        this.getData();
      },
           
    },
    mounted(){
      this.$store.dispatch('defaultIndexAction','/unopened/integralmanagement');
    }
  }
</script>

<style scoped>
  .el-dialog{margin-bottom: 0px;margin-top: -100px!important}
</style>
<style>
  .el-table--border td, .el-table--border th{text-align: center;}
</style>
