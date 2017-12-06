<template>
  <div class="RankingList">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

    <div style="padding:20px" class="search_wap">
    
      <el-row style="min-height:100px">
        <el-col :span="18">
          <el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">         
            <el-form-item label="排行榜列表">
              <el-input  v-model="filterForm.rankName" placeholder="排行榜列表"></el-input>
            </el-form-item>
            
            <el-form-item label="所在地区" required>
              <el-select 
                v-model="filterForm.province" 
                clearable  
                @change = "provinceChange(filterForm.province,1)"
                placeholder="省">
                <el-option 
                  v-for="item in provinceIdsList"
                  :key="item.cityId"
                  :label="item.cityName"
                  :value="item.cityId">
                </el-option>
              </el-select>
              <el-select v-model="filterForm.city" clearable  placeholder="市">
                <el-option
                  v-for="item in cityIdsList"
                  :key="item.cityId"
                  :label="item.cityName"
                  :value="item.cityId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="状态" style="margin-left:10px">
              <el-select clearable v-model="filterForm.status" placeholder="不限">
                <el-option label="在线" value="1"></el-option>
                <el-option label="离线" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right">
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
            <el-button type="primary" @click="addNew">新增排行榜</el-button>
            <el-button type="primary" @click="rankSort">排行榜排序</el-button>
        </el-col>
      </el-row>
      <div class="tabletopbar">
        <span>所有数据：共</span> <span style="color:#111">{{tableData.rowCount}}</span> <span>条</span>
        <span style="margin-left:20px">查询结果：共</span> 
        <span style="color:#111">{{tableData.rowCount}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="is_loading_tab"
        :data="tableData.rankList"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          prop="buildingRankName"
          label="排行榜名称"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="area"
          label="省-市"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="buildingAmount"
          label="包含楼盘数"
          min-width="80">
        </el-table-column>       
        <el-table-column
          prop="buildingStatus" 
          min-width="60"
          label="状态">
          <template scope="scope">
            <span v-if = "scope.row.buildingStatus === 0">线下</span>
            <span v-else-if = "scope.row.buildingStatus === 1">线上</span>
            <span v-else>不限</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="creationTime"
          width="100"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="founder"
          width="100"
          label="创建人">
        </el-table-column>
        <el-table-column
          min-width="100"
          label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleView(scope.$index, scope.row)">
              查看
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleLine(scope.$index, scope.row)">
              <span v-if = "scope.row.buildingStatus === 1">下线</span>
              <span v-if = "scope.row.buildingStatus === 0">上线</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="tableData.rowCount>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next"
        :page-size="10"
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="tableData.rowCount">
      </el-pagination>
    </div>

    <BigDialog dialogTitle="排行榜排序" @dialogCancel="pxdialogCancel" @dialogConfirm="pxdialogCancel" :dialogFormVisible="pxAllData.pxdialogFormVisible">
      <div slot="dia_body" class="dia_body">
        <el-form ref="form" :inline="true" :model="pxAllData.pxForm"  style="margin:0px auto;width:620px">
          <el-form-item label="区域：">
            <el-select 
              v-model="pxAllData.pxForm.province" 
              clearable  
              @change = "provinceChange(pxAllData.pxForm.province,2)"
              placeholder="省">
              <el-option 
                v-for="item in provinceIdsList"
                :key="item.cityId"
                :label="item.cityName"
                :value="item.cityId">
              </el-option>
            </el-select>
            <el-select v-model="pxAllData.pxForm.city" clearable  placeholder="市">
              <el-option
                v-for="item in cityIdsList2"
                :key="item.cityId"
                :label="item.cityName"
                :value="item.cityId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-table
          empty-text="请选择省市"
          v-loading="is_loading_sort_tab"
          :data="sortTableData.rankList"
          style="width: 100%;font-size:12px!important;">
          <el-table-column
            prop="buildingRankName"
            label="排行榜名称"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="creationTime"
            min-width="100"
            label="创建时间">
          </el-table-column>
          <el-table-column
            min-width="100"
            label="操作">
            <template scope="scope">

              <i @click="handlerSort(scope.row,true)" v-if="!(scope.$index==0)" style="font-size:20px;cursor:pointer" class="fa fa-arrow-up"></i>
              <i @click="handlerSort(scope.row,false)" v-if="!(sortTableData.rankList.length == scope.$index+1)" style="font-size:20px;cursor:pointer" class="fa fa-arrow-down"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>  
    </BigDialog>

  </div>
</template>
<script>
import message from '../../common/message'
import AreaAll from '../Common/AreaAll/AreaAll'
import Subnav from '../Subnav/Subnav'
import BigDialog from '../Common/BigDialog/BigDialog'
export default {
    name:'RankingList',
    components:{
      Subnav,
      AreaAll,
      BigDialog
    },
    data() {
      return {
        currentPage:1,
        secondLevel:'楼盘',
        threeLevel:'排行榜',
        provinceIdsList:[
                   
        ],
        cityIdsList:[
           
        ],
        cityIdsList2:[

        ],
        filterForm: {
          rankName:'',
          province:'',
          city:'',
          status:'',
          pageNum:0,
          pageSize:10
        },
        tableData: {
          rowCount:0,
          rankList:[]
        },
        sortTableData:{
          rowCount:0,
          rankList:[]
        },
        pxAllData:{
          pxdialogFormVisible:false,
          pxForm:{
            province:'',
            city:''
          }
        },
        bjAllData:{
          bjdialogFormVisible:false,
          houselist:[],
          bjForm:{
            name:'',
            sheng:'',
            shi:'',
            range:[]
          }
        },
        is_loading_tab:false,  
        is_loading_sort_tab:false    
      };
    },
    filters:{
    },
    computed:{
            
    },
    watch:{
      'pxAllData.pxForm.province':{
        handler:function(val){
          this.getSortData()
        }
      },
      'pxAllData.pxForm.city':{
        handler:function(val){
          this.getSortData()
        }
      }
    },
    created(){
      this.getdata()
      this.getProData()
    },
    methods: {
      //获取省数据
      getProData(){
        let _this = this,
        body = {cityType:1};
        _this.$http('/citis/cityLists',{body},{},{},'post').then(function(res){
          if(res.data.code==0){
            _this.provinceIdsList = res.data.response.cityList   
          }else if(res.data.code == 300){
            _this.$router.push('/login')
          }else{
            message(_this,res.data.message,'warning')
          }
        }).catch(function(err){
          console.log(err)
        })  
      },
      //获取市数据
      getCityData(province = 9999,type){
        let _this = this,
        body = {cityType:2,parentid:province};
        _this.$http('/citis/cityLists',{body},{},{},'post').then(function(res){
          if(res.data.code == 0){
            if(type == 1){
              _this.filterForm.city = '';
              _this.cityIdsList = res.data.response.cityList 
            }else{
              _this.pxAllData.pxForm.city = '';
              _this.cityIdsList2 = res.data.response.cityList
            }
          }else if(res.data.code == 300){
            _this.$router.push('/login')
          }else{
            message(_this,res.data.message,'warning')
          }
        }).catch(function(err){
          console.log(err)
        })   
      },
      //省市联动
      provinceChange(province,type){
        this.getCityData(province,type)
      },
      //获取排行榜数据
      getdata(){
        let _this = this,
        body = _.cloneDeep(this.filterForm)
        _this.is_loading_tab=true;
        this.$http('/backstageRank/getRankList',{body},{},{},'post').then(function(res){
          if(res.data.code == 0){
            _this.tableData = res.data.response;
          }
          _this.is_loading_tab = false;
        }).catch(function(err){
          console.log(err)
          _this.is_loading_tab = false;
        })
      },
      //获取排行榜排序数据
      getSortData(){
        let _this = this,
        body = _this.pxAllData.pxForm;
        _this.is_loading_sort_tab=true;
        this.$http('/backstageRank/rankOrderList',{body},{},{},'post').then(function(res){
          if(res.data.code == 0){
            _this.sortTableData = res.data.response;
          }
          _this.is_loading_sort_tab=false;
        }).catch(function(err){
          console.log(err)
        })
      },
      //查询
      onSearchSubmit(){
        this.currentPage=1;
        this.getdata();
      },
      //页码改变
      currentChange(page){
        this.filterForm.pageNum = page-1;
        this.getdata()
      },
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        var that=this
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)        
      },
      addNew(){
        this.$router.push({
          path:'/index/rankinglistadd'
        })
      },
      //上下线
      handleLine(index, row) {
        let _this=this,
        text1,
        text2;

        if(row.buildingStatus === 1){
          text1 = '确认下线吗？'
          text2 = '下线成功'
        }else if(row.buildingStatus === 0){
          text1 = '确认上线吗？'
          text2 = '上线成功'
        }
        this.$confirm(text1, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let body = {
            rankId:row.rankId,
            onlineStatus:''
          }
          if(row.buildingStatus === 1){
            body.onlineStatus = 0
          }else{
            body.onlineStatus = 1
          }
          this.$http('/backstageRank/editRankStatus',{body},{},{},'post').then(function(res){
            if(res.data.code == 0){
              if(res.data.response.status == 1){
                message(_this,text2,'success')
                _this.getdata()
              }else{
                message(_this,text2,'warning')
              }
            }else if(res.data.code == 300){
              _this.$router.push('/login')
            }
            _this.is_loading_tab = false;
          }).catch(function(err){
            console.log(err)
            _this.is_loading_tab = false;
          })
        }).catch(() => {       
        });
      },
      //开启排行榜
      rankSort(){
        this.pxAllData.pxdialogFormVisible=true;
      },
      //关闭排行榜
      pxdialogCancel(){
        this.pxAllData.pxdialogFormVisible=false;
      },
      //排序
      handlerSort(row,type){
        console.log(row)
        let _this = this,
        body = {rankId:row.rankId};
        body.province = _this.pxAllData.pxForm.province;
        body.city = _this.pxAllData.pxForm.city;
        if(type){
          body.up = 1;
        }else{
          body.down = 1;
        }
        
        this.$http('/backstageRank/rankOrderList',{body},{},{},'post').then(function(res){
          if(res.data.code == 0){
            _this.getSortData()     
          }else{
            message(_this,'排序失败','warning')
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      //查看详情
      handleView(index,row){
        this.$router.push({
          path:'/index/rankingdetail',
          query:{
            rankId:row.rankId
          }
        }) 
      },
      //编辑排行榜
      handleEdit(index,row){
        this.$router.push({
          path:'/index/rankinglistedit',
          query:{
            rankId:row.rankId
          }
        })
      }
    },
    mounted(){
      
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/rankinglist');
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
  .RankingList .search_wap .el-input{width:140px;}
</style>
