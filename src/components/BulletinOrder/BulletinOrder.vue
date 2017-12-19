<template>
  <div class="buor">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

    <div style="padding:20px">
      
      <el-row style="padding:20px 10px 0px 10px;border:1px solid #eee;margin-bottom:20px">
        <el-col :span="20">
          <el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">
            
            <el-form-item label="楼盘id">
              <el-input size="small"   v-model="filterForm.buildingId" style="width:80px" placeholder="id"></el-input>
            </el-form-item>
            <el-form-item label="楼盘名称">
              <el-autocomplete
                size="small"
                v-model="filterForm.buildingName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入关键词"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
        
            <el-form-item label="区域：">
              <el-select size="small" @change="proChange" v-model="filterForm.province" :clearable="true" placeholder="省"  style="width:120px;">
                  <el-option
                  v-for="item in provinceIdsList"
                  :key="item.cityId"
                  :label="item.cityName"
                  :value="item.cityId" >
                  </el-option>
              </el-select> 
              <el-select size="small" v-model="filterForm.city" :clearable="true" placeholder="市"  style="width:120px;">
                  <el-option
                  v-for="item in cityIdsList"
                  :key="item.cityId"
                  :label="item.cityName"
                  :value="item.cityId" >
                  </el-option>
              </el-select>
            </el-form-item> 
            <el-form-item label="楼盘当前状态">
              <el-select size="small" v-model="filterForm.buildStatus" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option label="已支持订阅" value="1"></el-option>
                <el-option label="仅预约" value="2"></el-option>
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
        :data="tableData.bespeakInfoList"
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
          label="预约楼盘"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="area"
          label="所在地区"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="currentBesNum"
          label="当前预约用户数"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="historyBesNum"
          label="历史预约用户数"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="cancelUserNum"
          label="取消用户数"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="buildStatus"
          label="楼盘当前状态"
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

import Subnav from '../Subnav/Subnav'
import message from '../../common/message'

export default {
    name:'buor',
    components:{
      Subnav
    },
    data() {
      return {
        currentPage:1,
        secondLevel:'订阅管理',
        threeLevel:'预约简报',
        buidingList:[],
        provinceIdsList:[],
        cityIdsList:[],
        
        editTime:'',
        filterForm: {
          pageNum:0,
          pageSize:10,
          province:'',
          city:'',
          buildingId:'',
          buildingName:'',
          buildStatus:''
        },
        tableData: {
          subCount:0,
          bespeakInfoList:[]
        },
        is_loading_tab:false,
      };
    },
    computed:{
                                        
    },
    created(){
      this.getProCityData(1)
      this.getdata()
      this.remoteMethod('')
    },
    methods: {
      //请求数据方法
      getdata(){
        let _this = this;
        _this.is_loading_tab = true;
        this.$http('/backstageSub/getBesReportList',{body:_this.filterForm},{},{},'post').then(function(res){
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
      //获取省市数据
      getProCityData(pramas){
          let _this=this;
          let body = '';
          if(pramas == 1){
              body = {cityType:1}
          }else if(pramas == 2){
              body = {cityType:2,parentid:_this.filterForm.province}
          }else{
              body = {cityType:3,parentid:_this.filterForm.city}
          }
          _this.$http('/citis/cityList',{body},{},{},'post').then(function(res){
             
              if(res.data.code==0){
                  
                  if(pramas == 1){
                      _this.provinceIdsList = res.data.response.cityList
                  }else if(pramas == 2){
                      _this.cityIdsList = res.data.response.cityList
                  }else{
                      _this.areaIdsList = res.data.response.cityList
                  }
                  
              }else if(res.data.code==300){
                  _this.$router.push('/login')
              }else{
                  _this.$message({
                    message: res.data.message,
                    type: 'warning'
                  });
              }
              _this.is_loading_tab=false;
          }).catch(function(err){
              _this.is_loading_tab=false;
              console.log(err)
          })   
      },
      //改变省份
      proChange(){
          this.filterForm.city = ''
          this.filterForm.area = ''
          this.getProCityData(2)
      },
      //模糊搜索
      remoteMethod(val){
        let _this = this,
        body = {buildingName: val};
       
        this.$http('/backstageBuilding/getBuildingNameList', {body}, {}, {}, 'post').then(function (res) {
          if (res.data.code == 0) {
            _this.buidingList = res.data.response;
          } else if (res.data.code == 300) {
            _this.$router.push('/login')
          } else {
            message(_this,res.data.message,'warning')
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      //搜索
      querySearchAsync(queryString,cb){
        let buidingList = this.buidingList;
        var results = queryString ? buidingList.filter(this.createStateFilter(queryString)) : buidingList;
        cb(results)
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
      handleSelect(str){
        console.log(str)
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
      //操作
      handleEdit(index, row ,type) {
        if(type == 1){
          this.$router.push({
            path:'/index/detailbulletinorder',
            query:{buildingId:row.buildingId}
          })
        }
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
