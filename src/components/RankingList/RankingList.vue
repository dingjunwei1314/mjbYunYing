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
            <el-button type="primary" @click="rankSort">排行榜排序</el-button>
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
              @click="handleView(scope.$index, scope.row)">
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

          <el-form-item label="排行榜名称：">
            <el-input v-model="pgbAddAllData.phbAddForm.name" style="width:195px"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="区域：">
            <AreaAll :isshowqu="false" :area="pgbAddAllData.phbAddForm"></AreaAll> 
          </el-form-item>
          <el-form-item  v-for="(item,index) in pgbAddAllData.phbAddForm.range" :key="index">
            <span slot="label">添加楼盘NO{{index+1}}</span>
            <el-select :clearable="true" v-model="pgbAddAllData.phbAddForm.range[index]" placeholder="请选择">
              <el-option
                v-for="(item,index) in pgbAddAllData.houselist"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button style="margin-left:100px" @click="addmore" type="text">继续添加楼盘</el-button>
        </el-form>
      </div>  
    </BigDialog>

    <BigDialog dialogTitle="编辑排行榜" @dialogCancel="bjdialogCancel" @dialogConfirm="bjdialogConfirm" :dialogFormVisible="bjAllData.bjdialogFormVisible">
      <div slot="dia_body" class="dia_body">
        <el-form ref="form" :model="bjAllData.bjForm" label-width="200px" style="margin:0px auto;width:620px">

          <el-form-item label="排行榜名称：">
            <el-input v-model="bjAllData.bjForm.name" style="width:195px"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="区域：">
            {{bjAllData.bjForm.sheng}}{{bjAllData.bjForm.shi}}
          </el-form-item>
          <el-form-item  v-for="(item,index) in bjAllData.bjForm.range" :key="index">
            <span slot="label">添加楼盘NO{{index+1}}</span>
            <el-select :clearable="true" v-model="bjAllData.bjForm.range[index]" placeholder="请选择">
              <el-option
                v-for="(item,index) in bjAllData.houselist"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button style="margin-left:100px" @click="bjaddmore" type="text">继续添加楼盘</el-button>
        </el-form>
      </div>  
    </BigDialog>

    <BigDialog dialogTitle="排行榜排序" @dialogCancel="pxdialogCancel" @dialogConfirm="pxdialogCancel" :dialogFormVisible="pxAllData.pxdialogFormVisible">
      <div slot="dia_body" class="dia_body">
        <el-form ref="form" :model="pxAllData.pxForm" label-width="200px" style="margin:0px auto;width:620px">
          <el-form-item label="区域：">
            <AreaAll :isshowqu="false" :area="pxAllData.pxForm"></AreaAll> 
          </el-form-item>
        </el-form>
        <el-table
          empty-text="请选择省市"
          v-loading="is_loading_sort_tab"
          :data="sortTableDataComput.list"
          style="width: 100%;font-size:12px!important;">
          <el-table-column
            prop="name"
            label="排行榜名称"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="time"
            min-width="100"
            label="创建时间">
          </el-table-column>
          <el-table-column
            min-width="100"
            label="操作">
            <template scope="scope">
              <i @click="handlerSort(scope.$index, scope.row,true)" v-if="scope.row.sort!=1 && sortTableDataComput.list.length!=1" style="font-size:20px;cursor:pointer" class="fa fa-arrow-up"></i>
              <i @click="handlerSort(scope.$index, scope.row,false)" v-if="scope.row.sort!=sortTableDataComput.list.length && sortTableDataComput.list.length!=1" style="font-size:20px;cursor:pointer" class="fa fa-arrow-down"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>  
    </BigDialog>

    <BigDialog dialogTitle="排行榜详情" @dialogCancel="pxDetaildialogCancel" @dialogConfirm="pxDetaildialogCancel" :dialogFormVisible="pxDetailAllData.pxDetaildialogFormVisible">
      <div slot="dia_body" class="dia_body">
        <el-form ref="form" label-width="200px" style="margin:0px auto;width:620px"> 
          <el-form-item label="排行榜名称：">
            {{pxDetailAllData.data.name}}
          </el-form-item>
          <el-form-item label="区域：">
            {{pxDetailAllData.data.sheng}}{{pxDetailAllData.data.shi}}
          </el-form-item>
          <el-form-item  v-for="(item,index) in pxDetailAllData.data.range" :key="index">
            <span slot="label">NO{{index+1}}：</span>
            <router-link to="">{{item}}</router-link>
          </el-form-item>
        </el-form>
      </div>  
    </BigDialog>

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
        sortTableData:{
          total:0,
          list:[]
        },
        pgbAddAllData:{
          phbdialogFormVisible:false,
          houselist:[],
          phbAddForm:{
            name:'',
            sheng:'',
            shi:'',
            range:['','','','','','','','','','']
          }
        },
        pxAllData:{
          pxdialogFormVisible:false,
          pxForm:{
            sheng:'',
            shi:''
          }
        },
        pxDetailAllData:{
          pxDetaildialogFormVisible:false,
          data:{
            name:'',
            area:'',
            range:[]
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
      sortTableDataComput(){
        let _this=this;
        let arr=_.cloneDeep(_this.sortTableData)
        arr.list.sort(function(a,b){
          return a.sort-b.sort
        })
        return arr;
      }          
    },
    watch:{
      'pgbAddAllData.phbAddForm.sheng':{
        handler:function(val){
          this.gethouselistdata(1)
          for(let i in this.pgbAddAllData.phbAddForm.range){
            this.pgbAddAllData.phbAddForm.range[i]=''
          }
        }
      },
      'pgbAddAllData.phbAddForm.shi':{
        handler:function(val){
          this.gethouselistdata(1)
          for(let i in this.pgbAddAllData.phbAddForm.range){
            this.pgbAddAllData.phbAddForm.range[i]=''
          }
        }
      },
      'pxAllData.pxForm.sheng':{
        handler:function(val){
          this.getSortData()
        }
      },
      'pxAllData.pxForm.shi':{
        handler:function(val){
          this.getSortData()
        }
      }
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
      getSortData(){
        let _this=this;
        _this.is_loading_sort_tab=true;
        this.$http('/ranklist').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.sortTableData=res.data.data;
          }
          _this.is_loading_sort_tab=false;
        }).catch(function(err){
          console.log(err)
        })
      },
      getpxDetailData(type){
        let _this=this;
        this.$http('/pxdetail').then(function(res){
          if(res.data.code==1000){
            if(type==1){
              _this.pxDetailAllData.data=res.data.data;
              _this.pxDetailAllData.pxDetaildialogFormVisible=true;
            }else{
              _this.bjAllData.bjForm=res.data.data;
              _this.gethouselistdata(2)
              _this.bjAllData.bjdialogFormVisible=true;
            }
            
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      gethouselistdata(type){
        let _this=this;
        this.$http('/houselist').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            if(type==1){
              _this.pgbAddAllData.houselist=res.data.data;
            }else{
              _this.bjAllData.houselist=res.data.data;
            }
           
          }
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
        this.pgbAddAllData.houselist=[];
        this.pgbAddAllData.phbdialogFormVisible=true;
        for(let i in this.pgbAddAllData.phbAddForm){
          if(i=='range'){
            this.pgbAddAllData.phbAddForm[i]=['','','','','','','','','','']
          }else{
            this.pgbAddAllData.phbAddForm[i]=''
          }
        }
      },
      addmore(){
        this.pgbAddAllData.phbAddForm.range.push(...['','','','',''])
      },
      bjaddmore(){
        this.bjAllData.bjForm.range.push(...['','','','',''])
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        this.bjAllData.bjdialogFormVisible=true;
        this.getpxDetailData(2)
      },
      handleDelete(index, row) {
        let _this=this;
        this.$confirm('确认下线吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.onSearchSubmit()
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
        
      },
      phbdialogCancel(){
        this.pgbAddAllData.phbdialogFormVisible=false;
      },        
      phbdialogConfirm(){
        if(this.pgbAddAllData.phbAddForm.name==''){
          this.$message({
            type: 'warning',
            message: '请填写标题!'
          });
          return;
        }
        if(this.pgbAddAllData.phbAddForm.sheng==''){
          this.$message({
            type: 'warning',
            message: '请选择区域!'
          });
          return;
        }
        if(this.pgbAddAllData.phbAddForm.range[0]==''){
          this.$message({
            type: 'warning',
            message: '请选择排序!'
          });
          return;
        }
        this.pgbAddAllData.phbdialogFormVisible=false;
        this.getdata()
      },
      bjdialogCancel(){
        this.bjAllData.bjdialogFormVisible=false;
      },
      bjdialogConfirm(){
        if(this.bjAllData.bjForm.name==''){
          this.$message({
            type: 'warning',
            message: '请填写标题!'
          });
          return;
        }
        if(this.bjAllData.bjForm.range[0]==''){
          this.$message({
            type: 'warning',
            message: '请选择排序!'
          });
          return;
        }
        this.bjAllData.bjdialogFormVisible=false;
        this.getdata()
      },
      rankSort(){
        this.pxAllData.pxdialogFormVisible=true;
      },
      pxdialogCancel(){
        this.pxAllData.pxdialogFormVisible=false;
      },
      pxDetaildialogCancel(){
        this.pxDetailAllData.pxDetaildialogFormVisible=false;
      },
      handlerSort(index,row,type){
        if(type){
          this.sortTableData.list.forEach(function(item,i){
            if(row.id==item.id){
              item.sort-=1;
            }else if(row.sort-item.sort==1){
              item.sort+=1;  
            }
          })
        }else{
          this.sortTableData.list.forEach(function(item,i){
            if(row.id==item.id){
              item.sort+=1;
            }else if(row.sort-item.sort==-1){
              item.sort-=1;  
            }
          })
        }
      },
      handleView(index,row){
        this.getpxDetailData(1)
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
