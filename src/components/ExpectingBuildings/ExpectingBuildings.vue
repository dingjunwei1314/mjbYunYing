<template>
  <div class="ExpectingBuildings">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

    <div style="padding:20px" class="search_wap">
      
      <el-row style="min-height:100px">
        <el-col :span="18">
          <el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">         
            <el-form-item label="楼盘名称">
              <el-input  v-model="filterForm.name" placeholder="楼盘名称"></el-input>
            </el-form-item>
            <AreaAll :isshowqu="false" :area="filterForm"></AreaAll> 
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right">
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
        </el-col>
      </el-row>
  

      <div class="tabletopbar">
        <span>所有数据：共</span> <span style="color:#111">{{tableData.total}}</span> <span>条</span>
        <span style="margin-left:20px">查询结果：共</span> 
        <span style="color:#111">{{tableData.total}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="is_loading_tab"
        :data="tableData.list"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          prop="address"
          label="省-市"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="housename"
          label="楼盘"
          min-width="80">
        </el-table-column>       
        <el-table-column
          prop="userid" 
          min-width="60"
          label="用户id">
        </el-table-column>
        <el-table-column
          prop="phone"
          min-width="100"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="time"
          min-width="100"
          label="创建时间">
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="tableData.total>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next"
        :page-size=2
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="tableData.total">
      </el-pagination>
    </div>

   
    
  </div>
</template>

<script>
import AreaAll from '../Common/AreaAll/AreaAll'
import Subnav from '../Subnav/Subnav'

export default {
    name:'ExpectingBuildings',
    components:{
      Subnav,
      AreaAll,
    },
    data() {
      return {
        currentPage:1,
        secondLevel:'楼盘',
        threeLevel:'用户期待开放楼盘',
        filterForm: {
          name:'',
          sheng:'',
          shi:'',
        },
        tableData: {
          total:0,
          list:[]
        },
        is_loading_tab:false,      
      };
    },
    filters:{
     
    },
    computed:{
                                        
    },
    created(){
      this.getdata()
    },
    methods: {
      getdata(){
        let _this=this;
        _this.is_loading_tab=true;
        this.$http('/expectingbuildings').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.tableData=res.data.data;
          }
          _this.is_loading_tab=false;
        }).catch(function(err){
          console.log(err)
        })
      },
      onSearchSubmit(){
        this.currentPage=1;
        this.getdata();
      },
      currentChange(page){
        this.currentPage=page;
        this.getdata()
      },
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        var that=this
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)        
      },
    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/expectingbuildings');
      var that=this
      setTimeout(function(){
        that.$store.dispatch('mainLoadingAction',false);
      },300) 
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
  .search_wap .el-input{width:140px;}
</style>
