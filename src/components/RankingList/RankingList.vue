<template>
  <div class="RankingList">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

    <div style="padding:20px" class="search_wap">

      <el-row style="min-height:100px">
        <el-col :span="18">
          <el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">
            <el-form-item label="楼盘名称">
              <el-input  v-model="filterForm.name" placeholder="楼盘名称"></el-input>
            </el-form-item>
            <AreaAll :isshowqu="false" :area="filterForm"></AreaAll>
             <el-form-item label="状态" style="margin-left:10px">
              <el-select clearable v-model="filterForm.state" placeholder="不限">
                <el-option label="在线" value="1"></el-option>
                <el-option label="离线" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right">
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
            <el-button type="primary" @click="addNew">新增排行榜</el-button>
            <el-button type="primary" @click="addNew">排行榜排序</el-button>
        </el-col>
      </el-row>
<<<<<<< HEAD


=======
>>>>>>> ba8694653681a1915abe2543bb6b507fc13f835f
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
          prop="name"
          label="排行榜名称"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="省-市"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="housenumber"
          label="包含楼盘数"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="state"
          min-width="60"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="time"
          width="100"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="builder"
          width="100"
          label="创建人">
        </el-table-column>
        <el-table-column
          min-width="150"
          label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">
              查看
            </el-button>
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">
              下线
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="tableData.total>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next"
        :page-size=2
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="tableData.total">
      </el-pagination>
    </div>
    <BigDialog dialogTitle="新建排行榜" @dialogCancel="phbdialogCancel" @dialogConfirm="phbdialogConfirm" :dialogFormVisible="pgbAddAllData.phbdialogFormVisible">
      <div slot="dia_body" class="dia_body">
        <el-form ref="form" :model="pgbAddAllData.phbAddForm" label-width="200px" style="margin:0px auto;width:620px">

<<<<<<< HEAD


=======
          <el-form-item label="排行榜名称：">
            <el-input v-model="pgbAddAllData.phbAddForm.name" style="width:195px"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="区域：">
            <AreaAll :isshowqu="false" :area="pgbAddAllData.phbAddForm"></AreaAll> 
          </el-form-item>
          <el-form-item  v-for="(item,index) in pgbAddAllData.phbAddForm.range" :key="index">
            <span slot="label">添加楼盘NO{{index+1}}</span>
            <el-select v-model="pgbAddAllData.phbAddForm.range[index]" placeholder="请选择">
              <el-option
                label="楼盘1"
                value="1">
              </el-option>
              <el-option
                label="楼盘2"
                value="2">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>  
    </BigDialog>
>>>>>>> ba8694653681a1915abe2543bb6b507fc13f835f
  </div>
</template>

<script>
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
        filterForm: {
          name:'',
          sheng:'',
          shi:'',
          state:'',
        },
        tableData: {
          total:0,
          list:[]
        },
<<<<<<< HEAD
        is_loading_tab:false,
=======
        pgbAddAllData:{
          phbdialogFormVisible:true,
          phbAddForm:{
            name:'',
            sheng:'',
            shi:'',
            range:['','','','','','','','','','']
          }

        },
        is_loading_tab:false,      
>>>>>>> ba8694653681a1915abe2543bb6b507fc13f835f
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
        this.$http('/ranklist').then(function(res){
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
        this.$router.push({path:'/index/estateadd'})
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        let _this=this;
        this.$confirm('确认下线吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.onSearchSubmit();
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
      batchDelete(){

        if(this.multipleSelection.length>0){

          this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            for(let i in this.multipleSelection){
              this.tableData.splice(this.tableData.indexOf(this.multipleSelection[i]),1)
            }
            this.onSearchSubmit()
            this.multipleSelection=[];
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

        }else{
          this.$message({
            type: 'info',
            message: '请先勾选'
          });
        }
<<<<<<< HEAD
=======
        
      },
      phbdialogCancel(){

      },        
      phbdialogConfirm(){
>>>>>>> ba8694653681a1915abe2543bb6b507fc13f835f

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
  .search_wap .el-input{width:140px;}
</style>
