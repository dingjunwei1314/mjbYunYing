<template>
  <div class="managers">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>

    <div style="padding:20px">
      
      <el-row style="padding:20px 10px 0px 10px;border:1px solid #eee;margin-bottom:20px">
        <el-col :span="22">
          <el-form :inline="true" :model="filterForm" class="demo-form-inline">

            <el-form-item label="Id">
              <el-input size="small" v-model="filterForm.userId" style="width:150px" placeholder="Id"></el-input>
            </el-form-item>
          
            <el-form-item label="用户昵称">
              <el-input size="small" v-model="filterForm.userName" style="width:150px" placeholder="用户昵称"></el-input>
            </el-form-item>

            <el-form-item label="手机号">
              <el-input size="small" v-model="filterForm.userPhone" style="width:150px" placeholder="手机号"></el-input>
            </el-form-item>
             
          </el-form>
        </el-col>
        <el-col :span="2" style="text-align:right">
         
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
            
        </el-col>
      </el-row>
      <div class="tabletopbar">
        <span style="margin-left:20px">查询结果：共</span> 
        <span style="color:#111">{{tableData.userCount}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="tabLoading"
        ref="multipleTable"
        :data="tableData.userScoreList"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          prop="userId"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户昵称"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="手机号"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="passCount"
          label="通过审核数据（张）"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="convertScore"
          label="已兑换积分"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="currentScore"
          min-width="80"
          label="当前积分">
        </el-table-column>
        <el-table-column
          prop="createTime"
          min-width="80"
          label="上次兑换时间">
        </el-table-column>
        <el-table-column
          width="200"
          label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row,1)">
              查看积分
            </el-button>
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row,2)">
              发放积分
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        v-show="tableData.userCount>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next,jumper"
        :page-size=10
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="tableData.userCount">
      </el-pagination>
    </div>
    
    <el-dialog title="发放积分" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width:50%;margin:0 auto">
        <el-form-item label="发放数量">
          <el-input size="small" v-model="form.scoreValue" style="width: 200px" type="number"></el-input>
        </el-form-item>

        <el-form-item label="发放事由">
          <el-select size="small" clearable v-model="form.eventDesId">
            <el-option label="邀请奖励" value="1"></el-option>
          </el-select>
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
          {path:this.$route.fullPath,name:'积分管理'},
          {path:this.$route.fullPath,name:'列表'}
        ],
        dialogFormVisible:false,
        filterForm: {
          pageNum:0,
          pageSize:10,
          userId:'',
          userName:'',
          userPhone:''
        },
        form:{
          userId:'',
          scoreValue:'',
          eventDesId:'1'
        },
        tableData: {
          userCount:0,
          userScoreList:[]
        },
        tabLoading:false,
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
        let body = this.filterForm;
        this.tabLoading = true;
        this.$http('/appUserScoreController/getScoreManagementList',{body},{},{},'post').then( res => {
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
      //操作
      handleEdit(index, row ,type) {
        if(type == 1){
          this.$router.push({
            path:'/unopened/integraldetail',
            query:{
              userId:row.userId
            }
          })
        }else if(type==2){
          for(let i in this.form){
            this.form[i] = i == 'userId'? row.userId : ''
          }
          this.form.eventDesId = '1';
          this.dialogFormVisible = true;
        }
      },
      //确认
      diaSure(){
        if(this.form.scoreValue == ''){
          message(this,'请填写数量','warning');
          return;
        }
        if(this.form.eventDesId == ''){
          message(this,'请选择事由','warning');
          return;
        }
        let body = this.form;
        this.$http('/appUserScoreController/addUserScore',{body},{},{},'post').then(res => {
          if(res.data.code == 0){
            if(res.data.response.status == 1){
              message(this,'提交成功','success');
              this.dialogFormVisible = false;
              this.getData();
            }else{
              message(this,'提交失败','warning');
            }
          }
        })
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
      }
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
