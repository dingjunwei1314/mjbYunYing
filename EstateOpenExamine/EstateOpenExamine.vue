<template>
  <div class="managers">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>

    <div style="padding:20px">
      
      <el-row style="padding:20px 10px 0px 10px;border:1px solid #eee;margin-bottom:20px">
        <el-col :span="22">
          <el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">
            
            <el-form-item label="楼盘id">
              <el-input  size="small" v-model="filterForm.buildingId" style="width:80px" placeholder="id"></el-input>
            </el-form-item>

            <el-form-item label="区域">
              <el-select size="small" @change="proChange" v-model="filterForm.province" :clearable="true" placeholder="省"  style="width:120px;">
                  <el-option
                  v-for="item in provinceIdsList"
                  :key="item.cityId"
                  :label="item.cityName"
                  :value="item.cityId" >
                  </el-option>
              </el-select> 
              <el-select size="small" @change="cityChange" v-model="filterForm.city" :clearable="true" placeholder="市"  style="width:120px;">
                  <el-option
                  v-for="item in cityIdsList"
                  :key="item.cityId"
                  :label="item.cityName"
                  :value="item.cityId" >
                  </el-option>
              </el-select> 
              <el-select size="small" v-model="filterForm.area" :clearable="true" placeholder="区"  style="width:120px;">
                  <el-option
                  v-for="item in areaIdsList"
                  :key="item.cityId"
                  :label="item.cityName"
                  :value="item.cityId" >
                  </el-option>
              </el-select> 
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

            <el-form-item label="是否严选">
              <el-select size="small" clearable v-model="filterForm.isAllocate" style="width:150px">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="交付状态">
              <el-select size="small" clearable v-model="filterForm.isAllocate" style="width:150px">
                <el-option label="在建楼盘" value="1"></el-option>
                <el-option label="二手盘" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="任务状态">
              <el-select size="small" clearable v-model="filterForm.isAllocate" style="width:150px">
                <el-option label="分配楼盘" value="1"></el-option>
                <el-option label="临时楼盘" value="2"></el-option>
              </el-select>
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
          prop="locatArea"
          label="开发商"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="isAllocate"
          label="是否为关注楼盘"
          min-width="80">
          <template scope="scope">
            <span v-if="scope.row.isAllocate===1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="collector"
          label="楼盘状态"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="assignor"
          label="期数"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="distributeTime"
          min-width="80"
          label="楼幢数">
        </el-table-column>
        <el-table-column
          prop="distributeTime"
          min-width="80"
          label="任务状态">
        </el-table-column>
        <el-table-column
          prop="distributeTime"
          min-width="80"
          label="待审核">
        </el-table-column>
        <el-table-column
          prop="distributeTime"
          min-width="80"
          label="已审核">
        </el-table-column>
        <el-table-column
          prop="distributeTime"
          min-width="80"
          label="楼盘创建时间">
        </el-table-column>
        <el-table-column
          width="320"
          label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row,2)">
              照片管理
            </el-button>
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row,1)">
              上传照片
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

export default {
    name:'managers',
    components:{
      Subnav2
    },
    data() {
      return {
        currentPage:1,
        navList:[
          {path:this.$route.fullPath,name:'首页'},
          {path:this.$route.fullPath,name:'采集任务管理'},
          {path:this.$route.fullPath,name:'列表'}
        ],
        buidingList:[],
        provinceIdsList:[],
        cityIdsList:[],
        areaIdsList:[],
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
      this.getProCityData(1)
      this.getdata()
      this.remoteMethod('')
    },
    methods: {
      //请求数据方法
      getdata(){
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
              _this.tabLoading=false;
          }).catch(function(err){
              _this.tabLoading=false;
              console.log(err)
          })   
      },
      //改变省份
      proChange(){
          this.filterForm.city = ''
          this.filterForm.area = ''
          this.getProCityData(2)
      },
      //改变市
      cityChange(){
          this.filterForm.area = ''
          this.getProCityData(3)
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
      //改变时间格式
      pickerChange(val){
        this.filterForm.coStartime=val.slice(0,19)
        this.filterForm.coEndtime=val.slice(22)
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
        let _this =this;
        if(type == 1){
          this.$router.push({
            path:'/index/collectiondetail',
            query:{
              type:'view',
              info:JSON.stringify(row)
            }
          })
        }else if(type==2){
          this.$router.push({
            path:'/index/collectiondetail',
            query:{
              type:'edit',
              info:JSON.stringify(row)
            }
          })
        }
      },
           
    },
    mounted(){
      this.$store.dispatch('defaultIndexAction','/index/estateopenexamine');
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
