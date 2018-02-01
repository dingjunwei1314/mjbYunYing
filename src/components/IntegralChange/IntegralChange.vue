<template>
  <div class="managers">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>

    <div style="padding:20px">
      
      <el-row style="padding:20px 10px 0px 10px;border:1px solid #eee;margin-bottom:20px">
        <el-col :span="22">
          <el-form :inline="true" :model="filterForm" class="demo-form-inline">
            
            <el-form-item label="用户昵称">
              <el-input size="small" v-model="filterForm.userName" style="width:150px" placeholder="用户昵称"></el-input>
            </el-form-item>

            <el-form-item label="手机号">
              <el-input size="small" v-model="filterForm.userPhone" style="width:150px" placeholder="手机号"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select size="small" v-model="filterForm.status" clearable style="width:150px">
                <el-option  label="待处理" value="1"></el-option>
                <el-option  label="已打款" value="2"></el-option>
                <el-option  label="已拒绝" value="3"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="商品">
              <el-select size="small" v-model="filterForm.exchangeGood" clearable style="width:150px">
                <el-option  label="100元红包" value="1"></el-option>
                <el-option  label="200元红包" value="2"></el-option>
                <el-option  label="500元红包" value="3"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="时间类型">
              <el-select size="small" v-model="filterForm.timeType" clearable style="width:150px">
                <el-option  label="申请时间" value="1"></el-option>
                <el-option  label="打款时间" value="2"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="时　　间">
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
        <span style="color:#111">{{tableData.rowCount}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="tabLoading"
        ref="multipleTable"
        :data="tableData.exchangeInfoList"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          prop="id"
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
          prop="wechatNumber"
          label="微信"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="兑换商品"
          min-width="60">
          <template scope="scope">
            <span v-if="scope.row.exchangeGood===1">100元红包</span>
            <span v-if="scope.row.exchangeGood===2">200元红包</span>
            <span v-if="scope.row.exchangeGood===3">500元红包</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="scoreValue"
          label="消耗积分"
          min-width="60">
        </el-table-column>
        <el-table-column
          min-width="80"
          label="状态">
          <template scope="scope">
            <span v-if="scope.row.status===1">待处理</span>
            <span v-if="scope.row.status===2">已打款</span>
            <span v-if="scope.row.status===3">已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="applicationTime"
          min-width="80"
          label="申请时间">
        </el-table-column>
        <el-table-column
          prop="makingTime"
          min-width="80"
          label="打款时间">
        </el-table-column>
        <el-table-column
          prop="backstageUser"
          min-width="80"
          label="操作人">
        </el-table-column>
        <el-table-column
          width="150"
          label="操作">
          <template scope="scope">
            <el-button
              size="small"
              :disabled="scope.row.status!==1"
              @click="handleEdit(scope.$index, scope.row)">
              编辑状态
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
    
    <el-dialog title="请选择处理结果" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item style="width: 50%;margin: 0 auto">
            <el-radio-group v-model="form.status">
              <el-radio label="2">已完成</el-radio>
              <el-radio label="3">已拒绝</el-radio>
            </el-radio-group>
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
          {path:this.$route.fullPath,name:'积分兑换'},
          {path:this.$route.fullPath,name:'列表'}
        ],
        dialogFormVisible:false,
        editTime:'',
        filterForm: {
          pageNum:0,
          pageSize:10,
          userName:'',
          userPhone:'',
          status:'',
          exchangeGood:'',
          timeType:'1',
          startTime:'',
          endTime:'',
        },
        form:{
          id:'',
          scoreValue:'',
          status:''
        },
        tableData: {
          rowCount:0,
          exchangeInfoList:[]
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
        this.$http('/appUserScoreController/getExchangScoreList',{body},{},{},'post').then(res => {
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
      //改变时间格式
      pickerChange(val){
        this.filterForm.startTime = val.slice(0,19)
        this.filterForm.endTime = val.slice(22)
      },
      //改变页码
      currentChange(page){
        this.currentPage = page;
        this.filterForm.pageNum = page-1;
        this.getData()
      },
      //操作
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.form.id = row.id;
        this.form.scoreValue = row.scoreValue;
        this.form.status = '';
      },
      //确认弹框
      diaSure(){
        if(this.form.status == ''){
          message(this,'请选择处理结果','warning');
          return;
        }
        let body = this.form;
        this.$http('/appUserScoreController/editExchangStatus',{body},{},{},'post').then(res => {
          if(res.data.code == 0){
            if(res.data.response.status == 1){
              this.getData();
              this.dialogFormVisible = false;
              message(this,'修改成功','success');
            }else{
              message(this,'修改失败','success');
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
            if(i === 'timeType'){
              this.filterForm[i] = '1';
            }else{
              this.filterForm[i] = '';
            }
          } 
        };
        this.editTime = '';
        this.currentPage = 1;
        this.getData();
      }
    },
    mounted(){
      this.$store.dispatch('defaultIndexAction','/unopened/integralchange');
    }
  }
</script>
<style scoped>
  .el-dialog{margin-bottom: 0px;margin-top: -100px!important}
</style>

<style>
  .el-table--border td, .el-table--border th{text-align: center;}
</style>