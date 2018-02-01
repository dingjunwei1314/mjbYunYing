<template>
  <div class="busu">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>

    <div style="padding:20px">
      
      <el-row style="padding:20px 10px 0px 10px;border:1px solid #eee;margin-bottom:20px">
        <el-col :span="20">
          <el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">
            <el-form-item label="楼盘id">
              <el-input  size="small" v-model="filterForm.buildingId" style="width:80px" placeholder="id"></el-input>
            </el-form-item>
            <el-form-item label="楼盘名称">
              <MjbBuildingSearch :_buildingName.sync="filterForm.buildingName"/>
            </el-form-item>
            <el-form-item label="区域：">
              <MjbArea :_province.sync="filterForm.province" :_city.sync="filterForm.city"/>
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
        v-loading="tabLoading"
        ref="multipleTable"
        :data="tableData.SubscribeInfoList"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          prop="buildingId"
          label="楼盘id"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="订阅楼盘"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="area"
          label="所在地区"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="currentSubNum"
          label="当前订阅用户数"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="historySubNum"
          label="历史订阅用户数"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="cancelUserNum"
          label="取消用户数"
          min-width="60">
        </el-table-column>
        <el-table-column
          width="320"
          label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row,1)">
              查看订阅用户
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-show="tableData.subCount>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next,jumper"
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
import MjbArea from '../Common/MjbArea/MjbArea';
import MjbBuildingSearch from '../Common/MjbBuildingSearch/MjbBuildingSearch';
export default {
    name:'busu',
    components:{
      Subnav2,
      MjbArea,
      MjbBuildingSearch
    },
    data() {
      return {
        navList:[
          {path:this.$route.fullPath,name:'首页'},
          {path:this.$route.fullPath,name:'订阅管理'},
          {path:this.$route.fullPath,name:'订阅简报'}
        ],
        currentPage:1,

        filterForm: {
          pageNum:0,
          pageSize:10,
          province:'',
          city:'',
          buildingId:'',
          buildingName:'',
        },
        tableData: {
          subCount:0,
          SubscribeInfoList:[]
        },
        tabLoading:false,
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
        this.tabLoading = true;
        this.$http('/backstageSub/getSubReportList',{body:this.filterForm},{},{},'post').then(res => {
          this.tabLoading = false;
          this.$store.dispatch('mainLoadingAction',false);
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
      //刷新方法
      refresh(){
        
      },
      //操作
      handleEdit(index, row ,type) {
        if(type == 1){
          this.$router.push({
            path:'/subscribe/detailbulletinsubscription',
            query:{buildingId:row.buildingId}
          })
        }
      },
    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
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
