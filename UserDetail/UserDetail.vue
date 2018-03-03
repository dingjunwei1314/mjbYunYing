
<template>
  <div class="userlist">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>

    <div style="padding:20px" class="search_wap">
      
      <el-row style="padding: 20px;margin-bottom: 20px;padding-bottom: 0px">
          <el-form :model="filterForm" class="demo-form-inline">
            <el-form-item label="头像：">
              <ImgPreview 
               v-if="filterForm.userAvatar" 
               @previewImg="previewImg" 
               :backgroundPicUrl="filterForm.userAvatar" 
               :isShowDelete="false"/>
              <span v-else>--</span>
            </el-form-item>
           
            <el-form-item label="ID：">
              <span>{{filterForm.id}}</span>
            </el-form-item>

            <el-form-item label="用户昵称：">
              <el-input 
                v-if="$route.query.type=='edit'" 
                v-model="filterForm.userName" 
                placeholder="用户昵称" 
                size="small" 
                style="width:200px">
              </el-input>
              <span v-if="$route.query.type=='view' && filterForm.userName">{{filterForm.userName}}</span>
              <span v-if="$route.query.type=='view' && !filterForm.userName">--</span>
            </el-form-item>

            <el-form-item label="手机号　：">
              <el-input  
                v-if="$route.query.type=='edit'" 
                v-model="filterForm.userPhone" 
                placeholder="手机号" 
                size="small" 
                style="width:200px">
                </el-input>
                <span v-if="$route.query.type=='view' && filterForm.userPhone">{{filterForm.userPhone}}</span>
                <span v-if="$route.query.type=='view' && !filterForm.userPhone">--</span>
            </el-form-item>
            
            <el-form-item label="所在城市：">
              <MjbArea 
                v-show="$route.query.type=='edit'" 
                :_province.sync="filterForm.provinceId" 
                :_city.sync="filterForm.cityId" />
              <span v-if="$route.query.type=='view' && filterForm.localArea">{{filterForm.localArea}}</span>
              <span v-if="$route.query.type=='view' && !filterForm.localArea">--</span>
            </el-form-item>
            
            <el-form-item label="邀请码　：">
              <span v-if="filterForm.userCode">{{filterForm.userCode}}</span>
              <span v-else>--</span>
            </el-form-item>

            <el-form-item label="邀请人　：">
              <el-table
                :data="tableData.sysUserList"
                border
                tooltip-effect="dark"
                style="font-size:12px!important;width: 50%">
                <el-table-column
                  prop="userId"
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
                  prop="invitatTime"
                  min-width="100"
                  label="邀请时间">
                </el-table-column>
              </el-table>
          
              <el-pagination
                v-show="tableData.rowCount>0"
                style="width:50%;text-align:center;margin-top:20px;margin-left: 85px"
                layout="prev, pager, next"
                :page-size=10
                :currentPage="currentPage"
                @current-change="currentChange"
                :total="tableData.rowCount">
              </el-pagination>
            </el-form-item>

            <el-form-item label="注册时间：">
              <span v-if="filterForm.createTime">{{filterForm.createTime}}</span>
              <span v-else>--</span>
            </el-form-item>

            <el-form-item label="最近登录时间：">
              <span v-if="filterForm.editTime">{{filterForm.editTime}}</span>
              <span v-else>--</span>
            </el-form-item>

            <el-form-item label="密码：" v-if="$route.query.type=='edit'" >
              <el-button type="primary" @click="reSet" size="small">重置密码</el-button>
              <span style="font-size: 12px;color: #777;margin-left: 10px">重置后密码是123456</span>
            </el-form-item>

            <el-form-item style="margin-left: 85px;margin: 50px auto">
              <div style="width: 50%;text-align: center">
                <el-button type="primary" @click="submit">确认</el-button>
              </div>
            </el-form-item>
          </el-form>
      </el-row>
    </div>
    <ImgDialog :dialogImgSrc="filterForm.userAvatar" :dialogVisible.sync="dialogVisible" />
  </div>
</template>
<script>
import Subnav2 from '../Subnav2/Subnav2';
import MjbArea from '../Common/MjbArea/MjbArea';
import ImgPreview from '../Common/ImgPreview/ImgPreview';
import ImgDialog from '../Common/ImgDialog/ImgDialog';
import message from '../../common/message';
export default {
    name:'userlist',
    components:{
      Subnav2,
      MjbArea,
      ImgPreview,
      ImgDialog
    },
    data() {
      return {
        navList:[
          {path:'/user/list',name:'首页'},
          {path:'/user/list',name:'用户管理'},
          {path:this.$route.fullPath,name:''},
        ],
        dialogVisible:false,
        currentPage:1,
        form:{
          id:'',
          pageNum:0,
          pageSize:10
        },
        filterForm: {
          
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
      this.initData();
    },
    methods: {
      initData(){
        let query = this.$route.query,
        info = JSON.parse(query.info);
        this.filterForm = info;
        this.form.id = info.id;
        if(query.type == 'view'){
          this.navList[2].name = '详情';
        }else{
          this.navList[2].name = '编辑';
        }
        this.getDetailData();
      },
      getDetailData(){
        let body = this.form;
        this.tabLoading = true;
        this.$http('/sysUser/getInvitatUserList',{body},{},{},'post').then(res => {
          if(res.data.code == 0){
            this.tableData = res.data.response;
          }
          this.tabLoading = false;
        })
      },
      previewImg(){
        this.dialogImgSrc = this.filterForm.userAvatar;
        this.dialogVisible = true;
      },
      currentChange(page){
        this.currentPage　=　page-1;
        this.getDetailData();
      },
      reSet(){
        let body = {id:this.filterForm.id};
        this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http('/sysUser/resetUserPwd',{body},{},{},'post').then(res => {
            if(res.data.code == 0){
              if(res.data.response.status == 1){
                message(this,'重置成功','success');
              }else{
                message(this,'重置失败','warning');
              }
            }
          })
        }).catch(err => {
        })
      },
      submit(){
        if(this.$route.query.type == 'edit'){
          let [body,f] = [{},this.filterForm];
          body.id = f.id;
          body.userName = f.userName;
          body.userPhone = f.userPhone;
          body.provinceId = f.provinceId;
          body.cityId = f.cityId;
          if(!(/^1[3|4|5|7|8]\d{9}$/.test(body.userPhone))){ 
            message(this,'手机格式不正确','warning');
            return false; 
          }
          this.$confirm('确认提交吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http('/sysUser/editSysUserInfo',{body},{},{},'post').then(res => {
              if(res.data.code == 0){
                if(res.data.response.status == 1){
                  message(this,'提交成功','success');
                  this.$router.push('/user/list');
                }else{
                  message(this,'提交失败','warning');
                }
              }
            })
          }).catch(err => {
          })
        }else{
          this.$router.push('/user/list')
        }
      },
      refresh(){
        this.initData();
      },    
    },
    mounted(){
      this.$store.dispatch('defaultIndexAction','/user/list');
    }
  }
</script>
