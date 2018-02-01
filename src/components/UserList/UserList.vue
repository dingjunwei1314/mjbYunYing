
<template>
  <div class="userlist">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>

    <div style="padding:20px" class="search_wap">
      
      <el-row style="border: 1px solid #eee;padding: 20px;margin-bottom: 20px;padding-bottom: 0px">
        <el-col :span="20">
          <el-form :inline="true" :model="filterForm" class="demo-form-inline">
           
              
            <el-form-item label="id">
              <el-input  style="width: 150px" v-model="filterForm.id" placeholder="id" size="small"></el-input>
            </el-form-item>
           
            <el-form-item label="手机号">
              <el-input style="width: 150px" v-model="filterForm.userPhone" placeholder="手机号" size="small"></el-input>
            </el-form-item>

            <el-form-item label="用户昵称">
              <el-input style="width: 150px"  v-model="filterForm.userName" placeholder="用户昵称" size="small"></el-input>
            </el-form-item>
            
            <el-form-item label="区域">
              <MjbArea :_province.sync="filterForm.provinceId" :_city.sync="filterForm.cityId" />
            </el-form-item>

            <el-form-item label="时间">
              <el-select size="small" v-model="filterForm.timeType"  style="width: 150px"  placeholder="时间">
                <el-option label="注册时间" value="1"></el-option>
                <el-option label="登录时间" value="2"></el-option>
              </el-select>
              <el-date-picker
                size="small"
                style="width:300px"
                @change="pickerChange"
                v-model="editTime"
                type="datetimerange"
                align="right"
                placeholder="选择日期范围">
              </el-date-picker>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <el-button type="primary" @click="onSearchSubmit">搜索</el-button>
        </el-col>
      </el-row>
  
      <div class="tabletopbar">
        <span style="margin-left:20px">查询结果：共</span> 
        <span style="color:#111">{{tableData.rowCount}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="tabLoading"
        ref="multipleTable"
        :data="tableData.sysUserList"
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
          label="昵称"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="手机号"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="localArea"
          label="所在省市"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="userCode"
          label="邀请码"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="invitatNum"
          label="邀请人数"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="createTime"
          min-width="100"
          label="注册时间">
        </el-table-column>
        <el-table-column
          prop="editTime"
          min-width="100"
          label="最后一次登陆时间">
        </el-table-column>
        <el-table-column
          min-width="100"
          label="操作">
          <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row,'view')">
            查看
          </el-button>
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row,'edit')">
            编辑
          </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        v-show="tableData.rowCount>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next"
        :page-size=10
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="tableData.rowCount">
      </el-pagination>
    </div>
     
  </div>
</template>
<script>

import Subnav2 from '../Subnav2/Subnav2';
import MjbArea from '../Common/MjbArea/MjbArea';
export default {
    name:'userlist',
    components:{
      Subnav2,
      MjbArea
    },
    data() {
      return {
        navList:[
          {path:this.$route.fullPath,name:'首页'},
          {path:this.$route.fullPath,name:'用户管理'},
          {path:this.$route.fullPath,name:'列表'},
        ],
        currentPage:1,
        editTime:'',
        filterForm: {
          pageNum:0,
          pageSize:10,
          id:'',
          userPhone:'',
          provinceId:'',
          cityId:'',
          timeType:'1',
          startTime:'',
          endTime:''
        },
        tableData: {
          rowCount:0,
          sysUserList:[]
        },
        tabLoading:false,
      };
    },
    filters:{
     
    },
    computed:{
                                        
    },
    created(){
      this.getUserData()
    },
    methods: {
      getUserData(){
        let body = this.filterForm;
        this.tabLoading = true;
        this.$http('/sysUser/getSysUserList',{body},{},{},'post').then(res => {
          if(res.data.code == 0){
            this.tableData = res.data.response;
          }
          this.tabLoading = false;
        })
      },
      onSearchSubmit(){
        this.filterForm.pageNum = 0;
        if(this.currentPage != 1){
          this.currentPage = 1;
        }else{
          this.getUserData();
        }
      },
      pickerChange(val){
        this.filterForm.startTime = val.slice(0,19)
        this.filterForm.endTime = val.slice(22)
      },
      currentChange(page){
        this.filterForm.pageNum = page - 1;
        this.getUserData()
      },
      handleEdit(index,row,type){
        this.$router.push({
          path:'/user/detail',
          query:{
            info:JSON.stringify(row),
            type
          }
        })
      },
      refresh(){
        this.getUserData()    
      },    
    },
    mounted(){
      this.$store.dispatch('defaultIndexAction','/user/list');
    }
  }
</script>



