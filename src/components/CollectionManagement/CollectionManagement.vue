<template>
  <div class="managers">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>

    <div style="padding:20px">
      
      <el-row style="padding:20px 10px 0px 10px;border:1px solid #eee;margin-bottom:20px">
        <el-col :span="22">
          <el-form :inline="true" :model="filterForm" class="demo-form-inline">
            
            <el-form-item label="区域">
              <MjbArea 
                :isShowArea="true"
                :_province.sync="filterForm.province" 
                :_city.sync="filterForm.city" 
                :_area.sync="filterForm.area"/>
            </el-form-item>

            <el-form-item label="楼盘名称">
              <MjbBuildingSearch :_buildingName.sync="filterForm.buildingName"/>
            </el-form-item>

            <el-form-item label="指派人">
              <el-select size="small" v-model="filterForm.collector" clearable style="width:150px">
                <el-option v-for="(item,index) in perData" :key="index" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否分配">
              <el-select size="small" clearable v-model="filterForm.isAllocate" style="width:150px">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="分配时间">
              <el-date-picker
                size="small"
                style="width:300px"
                @change="pickerChange"
                v-model="editTime"
                type="datetimerange"
                align="right"
                placeholder="选择日期范围"
                >
              </el-date-picker>
            </el-form-item> 
             
          </el-form>
        </el-col>
        <el-col :span="2" style="text-align:right">
         
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
            
        </el-col>
      </el-row>
      
      <div class="tabletopbar">
        <span style="margin-left:20px">查询结果：共</span> 
        <span style="color:#111">{{tableData.bCount}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="tabLoading"
        ref="multipleTable"
        :data="tableData.collectorInfo"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          prop="buildingId"
          label="ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="楼盘名"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="locatArea"
          label="所在地区"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="isAllocate"
          label="是否分配"
          min-width="80">
          <template scope="scope">
            <span v-if="scope.row.isAllocate===1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="collector"
          label="采集人"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="assignor"
          label="分配人"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="distributeTime"
          min-width="80"
          label="分配时间">
        </el-table-column>
        <el-table-column
          width="320"
          label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row,2)">
              编辑
            </el-button>
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row,1)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        v-show="tableData.bCount>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next,jumper"
        :page-size=10
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="tableData.bCount">
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
    name:'managers',
    components:{
      Subnav2,
      MjbArea,
      MjbBuildingSearch
    },
    data() {
      return {
        currentPage:1,
        navList:[
          {path:this.$route.fullPath,name:'首页'},
          {path:this.$route.fullPath,name:'开发楼盘采集'},
          {path:this.$route.fullPath,name:'列表'}
        ],
        editTime:'',
        
        filterForm: {
          pageNum:0,
          pageSize:10,
          province:'',
          city:'',
          area:'',
          buildingName:'',
          collector:'',
          isAllocate:'',
          coStartime:'',
          coEndtime:'',
        },
        tableData: {
          bCount:0,
          collectorInfo:[]
        },
        tabLoading:false,
        perData: [],
      };
    },
    filters:{
     
    },
    computed:{
                                        
    },
    created(){
      this.getPerData()
      this.getData()
    },
    methods: {
      //请求数据方法
      getData(){
        let _this = this;
        _this.tabLoading = true;
        this.$http('/taskManage/getCollectionList',{body:_this.filterForm},{},{},'post').then(function(res){
          _this.tabLoading = false;
          if(res.data.code == 0){
            _this.tableData = res.data.response;
          }else{
            message(_this,res.data.message,'warning')
          }
        }).catch(function(err){
          console.log(err)
          _this.tabLoading=false;
        })
      },
      //获取指派人员
      getPerData(){
        let _this = this;
       
        this.$http('/taskManage/getBackUserList',{},{},{},'post').then(function(res){
          if(res.data.code == 0){
            _this.perData = res.data.response.collectorList;
          }else{
            message(_this,res.data.message,'warning')
          }
        }).catch(function(err){
          console.log(err)
        
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
      //改变时间格式
      pickerChange(val){
        this.filterForm.coStartime=val.slice(0,19)
        this.filterForm.coEndtime=val.slice(22)
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
        let _this =this;
        if(type == 1){
          this.$router.push({
            path:'/task/collectiondetail',
            query:{
              type:'view',
              info:JSON.stringify(row)
            }
          })
        }else if(type==2){
          this.$router.push({
            path:'/task/collectiondetail',
            query:{
              type:'edit',
              info:JSON.stringify(row)
            }
          })
        }
      },
    },
    mounted(){
      this.$store.dispatch('defaultIndexAction','/task/collectionmanagement');
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
