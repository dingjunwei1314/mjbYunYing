<template>
  <div class="managers">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

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
            <el-form-item label="开发商">
              <el-input size="small"  v-model="filterForm.developer" style="width:200px" placeholder="开发商"></el-input>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-date-picker
                size="small"
                style="width:180px"
                @change="pickerChange"
                v-model="editTime"
                type="daterange"
                align="right"
                placeholder="选择日期范围">
              </el-date-picker>
            </el-form-item> 
            
            <el-form-item label="区域：">
              <MjbArea 
                :isShowArea="true"
                :_province.sync="filterForm.province" 
                :_city.sync="filterForm.city" 
                :_area.sync="filterForm.area"/>
            </el-form-item>
            <el-form-item label="关注">
              <el-select size="small" v-model="filterForm.ICareU" style="width:150px" placeholder="关注">
                <el-option label="不限" value="2"></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select size="small" v-model="filterForm.onlineStatus" style="width:150px" placeholder="状态">
                <el-option label="不限" value="2"></el-option>
                <el-option label="在线" value="1"></el-option>
                <el-option label="离线" value="0"></el-option>
              </el-select>
            </el-form-item>
             
          </el-form>
        </el-col>
        <el-col :span="4" style="text-align:right">
         
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
            <el-button type="primary" @click="addNew">新增楼盘</el-button>
        </el-col>
      </el-row>
      
      <div class="tabletopbar">
        <span style="margin-left:20px">查询结果：共</span> 
        <span style="color:#111">{{tableData.rowCount}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="tabLoading"
        ref="multipleTable"
        :data="tableData.buildingList"
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
          prop="area"
          label="所在地区"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="developer"
          label="开发商"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="fraction"
          label="工程质量、规划、落实、周边、景观、物业评分"
          min-width="60">
        </el-table-column>

        <el-table-column
          prop="ICareU"
          label="关注"
          width="60">
          <template scope="scope">
            <span v-if="scope.row.ICareU==0">否</span>
            <span v-if="scope.row.ICareU==1">是</span>
            <span v-if="scope.row.ICareU==2">不限</span>    
          </template>
        </el-table-column>
        <el-table-column
          prop="state" 
          width="80"
          label="状态">
          <template scope="scope">
            <span v-if="scope.row.onlineStatus==0">离线</span>
            <span v-if="scope.row.onlineStatus==1">在线</span>
            <span v-if="scope.row.onlineStatus==2">不限</span>    
          </template>
        </el-table-column>
        <el-table-column
          prop="editTime"
          min-width="80"
          label="更新时间">
        </el-table-column>
        <el-table-column
          width="320"
          label="操作">
          <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row,0)">
            <span v-if = "scope.row.onlineStatus ==0 ">上线</span>
            <span v-else>下线</span>
          </el-button>
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row,1)">
            查看
          </el-button>
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row,2)">
            编辑
          </el-button>
          </template>
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

import Subnav from '../Subnav/Subnav';
import message from '../../common/message';
import MjbArea from '../Common/MjbArea/MjbArea';
import MjbBuildingSearch from '../Common/MjbBuildingSearch/MjbBuildingSearch';
export default {
    name:'managers',
    components:{
      Subnav,
      MjbArea,
      MjbBuildingSearch
    },
    data() {
      return {
        currentPage:1,
        secondLevel:'楼盘',
        threeLevel:'楼盘管理',
        editTime:'',
        filterForm: {
          pageIndex:0,
          pageSize:10,
          buildingId:'',
          buildingName:'',
          developer:'',
          ICareU:'2',
          housePurchaseType:'2',
          rentType:'2',
          editTimeBegin:'',
          editTimeEnd:'',
          onlineStatus:'2',
          province:'',
          city:'',
          area:'',
        },
        tableData: {
          rowCount:0,
          buildingList:[]
        },
        tabLoading:false,
        multipleSelection: [],
      };
    },
    filters:{
     
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
        _this.tabLoading = true;
        this.$http('/backstageBuilding/getBuildingList',{},{body:_this.filterForm},{},'get').then(function(res){
          _this.tabLoading = false;
          _this.$store.dispatch('mainLoadingAction',false);
          if(res.data.code == 0){
            _this.tableData = res.data.response;
          }
        }).catch(function(err){
          console.log(err)
          _this.tabLoading=false;
          _this.$store.dispatch('mainLoadingAction',false);
        })
      },
      //触发搜索
      onSearchSubmit(){
        this.filterForm.pageIndex = 0;
        if(this.currentPage != 1){
          this.currentPage = 1;
        }else{
          this.getData()
        }
      },
      //改变时间格式
      pickerChange(val){
        this.filterForm.editTimeBegin=val.slice(0,10)
        this.filterForm.editTimeEnd=val.slice(13)
      },
      //改变页码
      currentChange(page){
        this.currentPage = page;
        this.filterForm.pageIndex = page-1;
        this.getData()
      },
      //刷新方法
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        this.editTime='';
        for(let i in this.filterForm){
          if(i=='pageIndex'){
            this.filterForm[i]=1
          }else if(i=='pageSize'){
            this.filterForm[i]=10
          }else if(i=='ICareU' || i=='housePurchaseType' || i=='rentType' || i=='onlineStatus'){
            this.filterForm[i]='2'
          }else{
            this.filterForm[i]=''
          }
        }
        if(this.currentPage!=1){
          this.currentPage=1;
        }else{
          this.getData()
        }     
      },
      //添加新的数据
      addNew(){
        this.$router.push({path:'/estate/estateadd',query:{type:'add'}})
      },
      //操作
      handleEdit(index, row ,type) {
        let _this =this;
        if(type == 1){
          this.$router.push({
            path:'/estate/estatedetail',
            query:{buildingId:row.buildingId}
          })
        }else if(type==2){
          this.$router.push({
            path:'/estate/estateedit',
            query:{buildingId:row.buildingId,type:'edit'}
          })
        }else if(type == 0){
          let body = {
            buildingId:row.buildingId,
          },text1,text2,text3;
          if(row.onlineStatus == 0){
            text1 = '确认上线吗?'
            text2 = '上线成功'
            text3 = '上线失败'
            body.onlineStatus = 1;
          }else{
            text1 = '确认下线吗?'
            text2 = '下线成功'
            text3 = '下线失败'
            body.onlineStatus = 0;
          }

          this.$confirm(text1, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http('/backstageBuilding/editBuildingStatus', {body}, {}, {}, 'post').then(function (res) {
              if (res.data.code == 0) {
                if(res.data.response.status == 1){
                  message(_this,text2,'success')
                  _this.getData()
                }else{
                  message(_this,text3,'warning')
                }
              }
            }).catch(function (err) {
              console.log(err)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });          
          });

        }
      },
           
    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/estate/estatemanagement');
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
