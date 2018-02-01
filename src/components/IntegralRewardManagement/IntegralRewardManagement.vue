<template>
  <div class="managers">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>

    <div style="padding:20px">

      <el-row style="padding:20px 10px 0px 10px;border:1px solid #eee;margin-bottom:20px">
        <el-col :span="20">
          <el-form :inline="true" style=""  class="demo-form-inline">
            
            <el-form-item label="楼盘进度照片基础积分：">
              <span>{{basicData.BasicScoreList[0].prBasicScore}}</span>
            </el-form-item>

            <el-form-item label="楼栋工程质量照片基础积分：">
              <span>{{basicData.BasicScoreList[0].buBasicScore}}</span>
            </el-form-item>

            <el-form-item label="园区工程质量照片基础积分：">
              <span>{{basicData.BasicScoreList[0].paBasicScore}}</span>
            </el-form-item>
             
          </el-form>
        </el-col>
        
        <el-col :span="4" style="text-align: right">
          <el-button type="primary" @click="basicSetting">基础积分设置</el-button>
        </el-col>
      </el-row>

      
      <el-row style="padding:20px 10px 0px 10px;border:1px solid #eee;margin-bottom:20px">
        <el-col :span="22">
          <el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">
            
            <el-form-item label="楼盘id">
              <el-input  size="small" v-model="filterForm.buildingId" style="width:80px" placeholder="id"></el-input>
            </el-form-item>

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
             
          </el-form>
        </el-col>
        <el-col :span="2" style="text-align:right">
          <el-button type="primary" @click="onSearchSubmit">查询</el-button>
        </el-col>
      </el-row>
      
      <div class="tabletopbar">
        <span style="margin-left:20px">查询结果：共</span> 
        <span style="color:#111">{{tableData.rowCount}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="tabLoading"
        ref="multipleTable"
        :data="tableData.buildScoreList"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          prop="buildingId"
          label="ID"
          width="80">
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
          prop="prBasicScore"
          label="进度照片基础积分"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="prRatio"
          label="执行比例"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="buBasicScore"
          label="工程质量照片基础积分"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="buRatio"
          label="执行比例"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="paBasicScore"
          label="园区质量照片"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="paRatio"
          label="执行比例"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="generalBudget"
          label="总预算（元）"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="alreadyPaid"
          label="已支出（元）"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="backstageUser"
          min-width="80"
          label="编辑人">
        </el-table-column>
        <el-table-column
          prop="editTime"
          min-width="80"
          label="编辑时间">
        </el-table-column>
        <el-table-column
          width="150"
          label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row,1)">
              查看
            </el-button>
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row,2)">
              审核
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

    <el-dialog title="基础积分设置" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width: 50%;margin:0 auto">
        <el-form-item label="进度照片基础积分" required>
          <el-input v-model="form.prBasicScore" :min="0" type="number" size="small"></el-input>
        </el-form-item>
        <el-form-item label="楼栋工程质量照片基础积分" required>
          <el-input v-model="form.buBasicScore" :min="0" type="number" size="small"></el-input>
        </el-form-item>
        <el-form-item label="园区工程质量照片基础积分" required>
          <el-input v-model="form.paBasicScore" :min="0" type="number" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="diaSure">确 定</el-button>
      </div>
    </el-dialog>
    
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
          {path:this.$route.fullPath,name:'楼盘奖励积分'},
          {path:this.$route.fullPath,name:'列表'}
        ],
        basicData:{
          BasicScoreList:[
            {
              prBasicScore:'',
              buBasicScore:'',
              paBasicScore:''
            }
          ]
        },
        form:{
          prBasicScore:'',
          buBasicScore:'',
          paBasicScore:''
        },
        dialogFormVisible:false,
        filterForm: {
          pageNum:0,
          pageSize:10,
          buildingId:'',
          province:'',
          city:'',
          area:'',
          buildingName:'',
        },
        tableData: {
          rowCount:0,
          buildScoreList:[]
        },
        tabLoading:false,
      };
    },
    created(){
      this.getData()
      this.getBasicData()
    },
    methods: {
      //请求数据方法
      getData(){
        let body = this.filterForm;
        this.tabLoading = true;
        this.$http('/appUserScoreController/getRewardScoreList',{body},{},{},'post').then(res => {
          this.tabLoading = false;
          if(res.data.code == 0){
            this.tableData = res.data.response;
          }
        })
      },
      //获取基础积分
      getBasicData(){
        this.$http('/appUserScoreController/getBasicScore',{body:{}},{},{},'post').then(res => {
          if(res.data.code == 0){
            this.basicData = res.data.response;
          }
        })
      },
      //基础分数设置
      basicSetting(){
        this.dialogFormVisible = true;
        this.form.prBasicScore = this.basicData.BasicScoreList[0].prBasicScore;
        this.form.buBasicScore = this.basicData.BasicScoreList[0].buBasicScore;
        this.form.paBasicScore = this.basicData.BasicScoreList[0].paBasicScore;
      },
      //确认弹框
      diaSure(){
        let [body,result] = [this.form];
        result = Object.values(this.form).every(item => {
          return item != '';
        });
        if(!result){
          message(this,'有必填项未填写','warning');
          return;
        }
        this.$http('/appUserScoreController/editBasicScore',{body},{},{},'post').then(res => {
          if(res.data.code == 0){
            if(res.data.response.status == 1){
              this.dialogFormVisible = false;
              this.getBasicData();
              this.getData();
              message(this,'提交成功','success');
            }else{
              message(this,'请求异常','warning');
            }
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
        for(let i in this.filterForm){
          if(i === 'pageNum'){
            this.filterForm[i] = 0;
          }else if(i !== 'pageSize'){ 
            this.filterForm[i] = '';
          }
        };
        this.currentPage = 1;
        this.getData();
      },
      //操作
      handleEdit(index, row ,type) {
        if(type == 1){
          this.$router.push({
            path:'/unopened/integralrewarddetail',
            query:{
              type:'view',
              info:JSON.stringify(row)
            }
          })
        }else if(type==2){
          this.$router.push({
            path:'/unopened/integralrewarddetail',
            query:{
              type:'edit',
              info:JSON.stringify(row)
            }
          })
        }
      },
    },
    mounted(){
      this.$store.dispatch('defaultIndexAction','/unopened/integralrewardmanagement');
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
