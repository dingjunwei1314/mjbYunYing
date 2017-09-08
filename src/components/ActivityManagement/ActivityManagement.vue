<template>
  <div class="activitymanagment">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

    <div style="padding:20px" class="top_wap">
      <el-table
        v-loading="is_loading_tab"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%;font-size:12px!important;margin-bottom:20px">
         <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
          label="排序"
          width="100">
          <template scope="scope">
            <el-input style="width:30px;text-align:center" v-model="scope.row.show_sort" placeholder="排序"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          label="标题"
          min-width="100">
          <template scope="scope">
            <el-input v-model="scope.row.title" placeholder="标题"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="链接"
          min-width="100">
          <template scope="scope">
            <el-input v-model="scope.row.url" placeholder="链接"></el-input>
          </template>
        </el-table-column>
       
        <el-table-column
          prop="state" 
          min-width="60"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="time"
          width="100"
          label="发布时间">
        </el-table-column>
        <el-table-column
          min-width="100"
          label="操作">
          <template scope="scope">
          <span style="margin-right:10px;cursor:pointer" @click="handle(scope.$index, scope.row ,1)">上线</span>
          <span style="margin-right:10px;cursor:pointer" @click="handle(scope.$index, scope.row ,2)">更新</span>
          <span style="margin-right:10px;cursor:pointer" @click="handle(scope.$index, scope.row ,3)">编辑</span>
          <span style="cursor:pointer" @click="handle(scope.$index, scope.row ,4)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="small" @click="hide_or_show_add(true)">添加活动轮播图</el-button>
      <el-button type="primary" size="small" @click="handle_some(1)">批量删除</el-button>
      <el-button type="primary" size="small" @click="handle_some(2)">批量更新</el-button>
    </div>
    
    <div class="addnew_wap" v-if="is_show_add_wap">
      <p class="tit_wap">
        新建轮播图
        <i class="el-icon-close" @click="hide_or_show_add(false)"></i>
      </p>

      <el-form ref="form" :model="addNewForm" label-width="120px" style="width:50%;margin-top:40px">
        <el-form-item label="标题">
          <el-input style="width:60%" placeholder="请输入标题" v-model="addNewForm.title"></el-input>
        </el-form-item>
        
        <el-form-item label="链接地址">
          <el-input style="width:60%" placeholder="请输入链接"  v-model="addNewForm.url">
            <template slot="prepend">Http://</template>
          </el-input>
        </el-form-item>

        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" style="color:red;padding-left:10px" class="el-upload__tip">注：图片支持jpg及bmp格式，上传图片尺寸建议为750*360，图片大小2m内</span>
          </el-upload>
        </el-form-item>
        
        <el-form-item label="备注">
          <el-input type="textarea" placeholder="这是专为90后提供的家......" v-model="addNewForm.remark"></el-input>
        </el-form-item>
         
        <el-form-item label="排序">
          <el-input type="number" style="width:120px" v-model="addNewForm.sort"></el-input>
        </el-form-item> 

        <el-form-item label="活动上下线">
          <el-radio-group v-model="addNewForm.state">
            <el-radio label="1">上线</el-radio>
            <el-radio label="0">下线</el-radio>
          </el-radio-group>
        </el-form-item>
        

        <el-form-item>
          <el-button style="margin-left:120px" type="primary" @click="add_new">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  
    
  </div>
</template>

<script>

import Subnav from '../Subnav/Subnav'
import BigDialog from '../Common/BigDialog/BigDialog'
import exportExcel from '../../common/exportExcel'
export default {
    name:'activitymanagment',
    components:{
      Subnav,
      BigDialog
    },
    data() {
      return {
        fileList:[],
        is_show_add_wap:false,
        secondLevel:'活动管理',
        threeLevel:'活动管理',
       
      
        addNewForm: {
          title: '',
          url: '',
          remark:'',
          sort:'',
          state:'',
        },
        current_data:{
          type:'',
          data:[]
        },
        tableData:[],
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
      getdata(){
        let _this=this;
        _this.is_loading_tab=true;
        this.$http('/activitymanagement').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.tableData=res.data.data;
          }
          _this.is_loading_tab=false;
        }).catch(function(err){
          console.log(err)
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      add_new(){
        let _this=this;
        if(this.addNewForm.title==''){
          this.$message({
            type: 'warning',
            message: '请添加标题'
          }); 
          return;
        }else if(this.addNewForm.url==''){
          this.$message({
            type: 'warning',
            message: '请添加链接'
          });
          return;
        }else if(this.addNewForm.sort==''){
          this.$message({
            type: 'warning',
            message: '请添加排序'
          });
          return;
        }else if(this.addNewForm.state==''){
          this.$message({
            type: 'warning',
            message: '请添加状态'
          });
          return;
        }
        this.$http('',_this.addNewForm).then(function(res){

        }).catch(function(err){
          console.log(err)
        })
        this.$message({
          type: 'success',
          message: '添加成功'
        });
        this.getdata();
        this.is_show_add_wap=false;
        for(let i in this.addNewForm){
          this.addNewForm[i]=''
        }
      },
      handleSelectionChange(val){
        console.log(val)
        this.multipleSelection=val;
      },
      handle_some(type){
        if(this.multipleSelection.length<=0){
          this.$message({
            message: '请先勾选',
            type: 'warning'
          });
          return;
        }
        
        let _this=this,
            show_message_tit="",
            show_message_success="",
            show_message_error="";

        if(type==1){
          show_message_tit="确定删除吗？";
          show_message_success="删除成功!";
          show_message_error="已取消删除";
        }else{
          show_message_tit="确定更新吗？";
          show_message_success="更新成功!";
          show_message_error="已取消更新";
        }

        this.$confirm(show_message_tit, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.getdata()
          this.$message({
            type: 'success',
            message: show_message_success
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: show_message_error
          });          
        });
      },
      handle(index,row,type){
        console.log(row)
        console.log(index)

        let _this=this,
            show_message_tit="",
            show_message_success="",
            show_message_error="";

        this.current_data.type=type;
        this.current_data.data=row;

        if(type==1){
          show_message_tit="确定上线／下线该楼盘？";
          show_message_success="成功!";
          show_message_error="已取消";
        }else if(type==2){
          show_message_tit="确定更新该楼盘？";
          show_message_success="更新成功!";
          show_message_error="已取消更新";
        }else if(type==3){
          
        }else{
          show_message_tit="确定删除该楼盘？";
          show_message_success="删除成功!";
          show_message_error="已取消删除";
        }
        this.$confirm(show_message_tit, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.getdata()
          this.$message({
            type: 'success',
            message: show_message_success
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: show_message_error
          });          
        });
      },
      hide_or_show_add(swi){
        this.is_show_add_wap=swi;
        for(let i in this.addNewForm){
          this.addNewForm[i]=''
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
      this.$store.dispatch('defaultIndexAction','/index/activitymanagement');
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
.dia_body .el-form-item{margin-bottom: 0px!important}
.activitymanagment .top_wap{border: 1px solid #20a0ff;margin:20px;}
.addnew_wap{border: 1px solid #eee;margin:20px;}
.addnew_wap .tit_wap{height: 40px;background: #20a0ff;color: white;line-height: 40px;font-size: 14px;padding: 0px 20px; }
.addnew_wap .tit_wap i{float: right;line-height: 40px;cursor: pointer;}
</style>

<style>
  .activitymanagment .top_wap .el-input{width:160px;}
  .activitymanagment .top_wap .el-input__inner{height: 25px;}
  .activitymanagment .top_wap .el-table th>.cell{text-align: center;}
  .activitymanagment .top_wap .el-table .cell{text-align: center;}
</style>
