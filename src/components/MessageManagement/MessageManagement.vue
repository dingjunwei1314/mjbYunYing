<template>
  <div class="MessageManagement">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

    <div style="padding:20px" class="search_wap">
      
      <el-row style="min-height:60px">
        <el-col :span="18">
          <el-form :inline="true" style=""  @keyup.native.enter="onSearchSubmit" :model="filterForm" class="demo-form-inline">
              
            <el-form-item label="消息标题">
              <el-input   v-model="filterForm.title" placeholder="消息标题"></el-input>
            </el-form-item>
             
            <el-form-item label="分类">
              <el-select clearable v-model="filterForm.type" placeholder="分类">
                <el-option label="通知信息" value="1"></el-option>
                <el-option label="严选咨询" value="2"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="区域">
              <AreaAll  :area="filterForm"></AreaAll> 
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right">
            <el-button type="primary" @click="onSearchSubmit">搜索</el-button>
            <el-button type="primary" @click="addNew">新建消息</el-button>
            <el-button type="danger" @click="deleteSome">批量删除</el-button>
        </el-col>
      </el-row>
  
      <el-table
        v-loading="is_loading_tab"
        ref="multipleTable"
        :data="tableData.list"
        border
        @selection-change="handleSelectionChange"
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="title"
          label="发送内容标题"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="type"
          label="消息分类"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="address"
          label="发送区域"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="sender"
          label="发送人"
          min-width="80">
        </el-table-column>
         <el-table-column
          prop="send_number"
          label="发送人数"
          min-width="80">
        </el-table-column>
         <el-table-column
          prop="send_time"
          label="发送日期"
          min-width="80">
        </el-table-column>
        <el-table-column
          min-width="100"
          label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">
              查看
            </el-button>
            <el-button
              size="small"
              @click="handledlete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- <el-pagination
        v-show="tableData.total>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next"
        :page-size=2
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="tableData.total">
      </el-pagination> -->
    </div>
     
    <BigDialog dialogTitle="用户详情" @dialogCancel="dialogCancel" @dialogConfirm="dialogConfirm" :dialogFormVisible="dialogFormVisible">
      <div slot="dia_body" class="dia_body">
        <el-form v-if="dialogFormVisible" ref="form" :model="addNewForm" label-width="150px" style="margin:0px auto;width:620px">
          <el-form-item label="发送对象：">
            <AreaAll :isdisabled="type==1" :isshowqu="false"  :area="addNewForm"></AreaAll>
          </el-form-item>

          <el-form-item label="消息类型：">
            <el-radio-group :disabled="type==1" v-model="addNewForm.type">
              <el-radio :label="1">通知消息</el-radio>
              <el-radio :label="2">严选资讯</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="发送人：">
            {{addNewForm.sender}}
          </el-form-item>

          <el-form-item label="发送时间：">
            <el-date-picker
              :disabled="type==1"
              v-model="addNewForm.send_time"
              type="date"
              placeholder="发送时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="消息标题：">
            <el-input v-model="addNewForm.title" :disabled="type==1" placeholder="发送人"></el-input>
          </el-form-item>

          <el-form-item label="消息内容：">
            <el-input v-model="addNewForm.content" type="textarea" :disabled="type==1" placeholder="发送人"></el-input>
          </el-form-item>
        </el-form>
      </div>  
    </BigDialog>
  
  </div>
</template>
<script>

import Subnav from '../Subnav/Subnav'
import BigDialog from '../Common/BigDialog/BigDialog'
import AreaAll from '../Common/AreaAll/AreaAll'
export default {
    name:'MessageManagement',
    components:{
      Subnav,
      BigDialog,
      AreaAll
    },
    data() {
      return {
        currentPage:1,
        type:'',
        dialogFormVisible:false,
        secondLevel:'用户管理',
        threeLevel:'消息标题',
        filterForm: {
          title:'',
          type:'',
          sheng:'',
          shi:'',
          qu:''
        },
        addNewForm: {
          sheng:'',
          shi:'',
          type:'',
          sender:'admin',
          send_time:'',
          title:'',
          content:''
        },
        tableData: {
          total:0,
          list:[]
        },
        is_loading_tab:false,
        multipleSelection:[]
      };
    },
    filters:{
     
    },
    computed:{
                                        
    },
    created(){
      this.getdata()
    },
    methods: {
      handleSelectionChange(val){
        console.log(val)
        this.multipleSelection=val;
      },
      getdata(){
        let _this=this;
        _this.is_loading_tab=true;
        this.$http('/messagemanagement',{},_this.filterForm).then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.tableData=res.data.data;
          }
          _this.is_loading_tab=false;
        }).catch(function(err){
          console.log(err)
        })
      },
      onSearchSubmit(){
        this.currentPage=1;
        this.getdata();
      },
      pickerChange(){

      },
      addNew(){
        for(let i in this.addNewForm){
          if(i!='sender'){
            this.addNewForm[i]='';
          }
        }
        this.type=2
        this.dialogFormVisible=true;
      },
      handledlete(index,row){
        let _this=this;
        _this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.getdata()
          _this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      deleteSome(){
        if(this.multipleSelection.length<=0){
          this.$message({
            message: '请先勾选',
            type: 'warning'
          });
          return;
        }
        let _this=this;
        _this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.getdata()
          _this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      currentChange(page){
        this.currentPage=page;
        this.getdata()
      },
      handleEdit(index,row){
        let _this=this,
            data={id:row.id};
        this.type=1
        this.$http('/messagedetail',{},data).then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.addNewForm=res.data.data;
            _this.dialogFormVisible=true;
          }
        }).catch(function(err){
          console.log(err)
        })
        
      },
      dialogCancel(){
        this.dialogFormVisible=false;
      },
      dialogConfirm(){
        if(this.type==1){
          this.dialogFormVisible=false;
        }else{
          if(this.addNewForm.sheng=='' || this.addNewForm.shi==''){
            this.$message({
              type: 'warning',
              message: '请选择区域'
            });
            return;
          }
          if(this.addNewForm.type==''){
            this.$message({
              type: 'warning',
              message: '请选择消息类型'
            });
            return;
          }
          if(this.addNewForm.send_time==''){
            this.$message({
              type: 'warning',
              message: '请选择发送时间'
            });
            return;
          }
          if(this.addNewForm.title==''){
            this.$message({
              type: 'warning',
              message: '请填写标题'
            });
            return;
          }
          if(this.addNewForm.content==''){
            this.$message({
              type: 'warning',
              message: '请填写内容'
            });
            return;
          }
          this.$message({
            type: 'success',
            message: '发送成功'
          });
          this.dialogFormVisible=false;
          this.getdata()
        }
        
      },
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        this.getdata()
        this.currentPage=1;
        for(var i in this.filterForm){
          this.filterForm[i]=''
        }
        var that=this
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)        
      },    
    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/messagemanagement');
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
  .search_wap .el-input{width:140px;}
</style>
