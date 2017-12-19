<template>
  <div class="cityhousescore">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <div style="padding:20px" class="search_wap">
      <el-row style="min-height:100px">
        <el-col :span="18">
          <el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">         
            <el-form-item label="城市">
              <AreaAll :isshowqu="false" :area="filterForm"></AreaAll> 
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right">
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
            <el-button type="primary" @click="addNew">添加</el-button>
        </el-col>
      </el-row>
      <div class="tabletopbar">
        <span>所有数据：共</span> <span style="color:#111">{{tableData.total}}</span> <span>条</span>
        <span style="margin-left:20px">查询结果：共</span> 
        <span style="color:#111">{{tableData.total}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="is_loading_tab"
        :data="tableData.list"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          label="省-市"
          min-width="80">
          <template scope="scope">
            <span>{{scope.row.sheng}}-{{scope.row.shi}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="gczl"
          label="工程质量"
          min-width="80">
        </el-table-column>       
        <el-table-column
          prop="ghsj" 
          min-width="60"
          label="规划设计">
        </el-table-column>
        <el-table-column
          prop="ghls"
          min-width="100"
          label="规划落实">
        </el-table-column>
        <el-table-column
          prop="zbpt"
          min-width="100"
          label="周边配套">
        </el-table-column>
        <el-table-column
          prop="builder"
          min-width="100"
          label="创建人">
        </el-table-column>
        <el-table-column
          min-width="100"
          label="操作">
          <template scope="scope">
  
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
          
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="tableData.total>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next,jumper"
        :page-size=2
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="tableData.total">
      </el-pagination>
      <BigDialog :dialogTitle="dialog.dialogTitle" :dialogFormVisible="dialog.dialogFormVisible" @dialogCancel="dialogCancel" @dialogConfirm="dialogConfirm">
        <div slot="dia_body">
          <el-form :inline="true" style="margin-left:150px"  :model="updataForm" :rules="updataFormRule" ref="updataFormRef" class="demo-form-inline">         
            <el-form-item label="城市">
              <AreaAll :isshowqu="false" :area="updataForm"></AreaAll> 
            </el-form-item>
            <div>
              <el-form-item label="工程质量" prop="gczl">
                <el-input  v-model="updataForm.gczl" placeholder="工程质量"></el-input>
              </el-form-item>
              <el-form-item label="规划设计" prop="ghsj">
                <el-input  v-model="updataForm.ghsj" placeholder="规划设计"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="规划落实" prop="ghls">
                <el-input  v-model="updataForm.ghls" placeholder="规划落实"></el-input>
              </el-form-item>
              <el-form-item label="周边配套" prop="zbpt">
                <el-input  v-model="updataForm.zbpt" placeholder="周边配套"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </BigDialog>
    </div>    
  </div>
</template>
<script>
import BigDialog from '../Common/BigDialog/BigDialog'
import AreaAll from '../Common/AreaAll/AreaAll'
import Subnav from '../Subnav/Subnav'

export default {
    name:'cityhousescore',
    components:{
      Subnav,
      BigDialog,
      AreaAll,
    },
    data() {
      var scopeValidateGczl = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请为工程质量评分'));
        }else{
          callback();
        }
      };
      var scopeValidateGhsj = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请为规划设计评分'));
        }else{
          callback();
        }
      };
      var scopeValidateGhls = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请为规划落实评分'));
        }else{
          callback();
        }
      };
      var scopeValidateZbpt = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请为周边配套评分'));
        }else{
          callback();
        }
      };
      return {
        currentPage:1,
        secondLevel:'楼盘',
        threeLevel:'城市楼盘评分均值',
        filterForm: {
          sheng:'',
          shi:'',  
        },
        updataForm:{
          sheng:'',
          shi:'', 
          gczl:'',
          ghsj:'',
          ghls:'',
          zbpt:'',
        },
        tableData: {
          total:0,
          list:[]
        },
        dialog:{
          dialogTitle:'详情',
          dialogFormVisible:false
        },
        updataFormRule:{
          gczl: [
            { validator: scopeValidateGczl, trigger: 'blur' }
          ],
          ghsj: [
            { validator: scopeValidateGhsj, trigger: 'blur' }
          ],
          ghls: [
            { validator: scopeValidateGhls, trigger: 'blur' }
          ],
          zbpt: [
            { validator: scopeValidateZbpt, trigger: 'blur' }
          ],
        },
        is_loading_tab:false,      
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
        this.$http('/cityhousescore').then(function(res){
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
      currentChange(page){
        this.currentPage=page;
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
        this.dialog.dialogFormVisible=true;
        for(let i in this.updataForm){
          this.updataForm[i]=''
        }
      },
      handleEdit(index, row) {
        this.dialog.dialogFormVisible=true;
        for(let i in this.updataForm){
          this.updataForm[i]=row[i]
        }
      },
      dialogCancel(){
        this.dialog.dialogFormVisible=false;
      },
      dialogConfirm(){
        let _this=this;
        this.$refs.updataFormRef.validate((valid) => {
          if (valid) {
            _this.$confirm('确认提交吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              _this.dialog.dialogFormVisible=false;
              _this.getdata()
              _this.$message({
                type: 'success',
                message: '提交成功!'
              });
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '已取消提交'
              });          
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      } 
    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/cityhousescore');
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
