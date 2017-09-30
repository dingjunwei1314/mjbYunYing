<template>
  <div class="managers">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

    <div style="padding:20px" class="search_wap">
      
      <el-row style="min-height:150px">
        <el-col :span="20">
          <el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">
            <div>
              <el-form-item label="楼盘id">
                <el-input   v-model="filterForm.buidingId" placeholder="楼盘id"></el-input>
              </el-form-item>
              <el-form-item label="楼盘名称">
                <el-input  v-model="filterForm.buidingName" placeholder="楼盘名称"></el-input>
              </el-form-item>
              <el-form-item label="开发商">
                <el-input  v-model="filterForm.developer" placeholder="开发商"></el-input>
              </el-form-item>
              <AreaAll :area="filterForm"></AreaAll> 
            </div>

            <el-form-item label="严选">
              <el-select clearable v-model="filterForm.ICareU" placeholder="严选">
                <el-option label="不限" value="2"></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合作买房">
              <el-select clearable v-model="filterForm.housePurchaseType" placeholder="合作买房">
                <el-option label="不限" value="2"></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="租金返还">
              <el-select clearable v-model="filterForm.rentaType" placeholder="租金返还">
                <el-option label="不限" value="2"></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select clearable v-model="filterForm.onlineStatus" placeholder="状态">
                <el-option label="不限" value="2"></el-option>
                <el-option label="在线" value="1"></el-option>
                <el-option label="离线" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-date-picker
                style="width:150px"
                @change="pickerChange"
                v-model="editTime"
                type="daterange"
                align="right"
                placeholder="选择日期范围"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>  
          </el-form>
        </el-col>
        <el-col :span="4" style="text-align:right">
         
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
            <el-button type="primary" @click="addNew">新增楼盘</el-button>
        </el-col>
      </el-row>
  

      <div class="tabletopbar">
        <span style="margin-left:20px">查询结果：共</span> 
        <span style="color:#111">{{tableData.rowCount}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="is_loading_tab"
        ref="multipleTable"
        :data="tableData.buidingList"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="buidingId"
          label="楼盘id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="buidingName"
          label="楼盘名"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="area"
          label="所在地区"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="developer"
          label="开发商"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="fraction"
          label="工程质量、规划、落实、周边评分"
          min-width="100">
        </el-table-column>

        <el-table-column
          prop="ICareU"
          label="严选"
          min-width="60">
          <template scope="scope">
            <span v-if="scope.row.ICareU==0">否</span>
            <span v-if="scope.row.ICareU==1">是</span>
            <span v-if="scope.row.ICareU==2">不限</span>    
          </template>
        </el-table-column>
        <el-table-column
          prop="cooper_buy"
          nim-width="60"
          label="合作买房">
           <template scope="scope">
            <span v-if="scope.row.housePurchaseType==0">否</span>
            <span v-if="scope.row.housePurchaseType==1">是</span>
            <span v-if="scope.row.housePurchaseType==2">不限</span>    
          </template>
        </el-table-column>
        <el-table-column
          prop="rental_return"
          min-width="80"
          label="租金返还">
          <template scope="scope">
            <span v-if="scope.row.rentaType==0">否</span>
            <span v-if="scope.row.rentaType==1">是</span>
            <span v-if="scope.row.rentaType==2">不限</span>    
          </template>
        </el-table-column>
        <el-table-column
          prop="state" 
          min-width="60"
          label="状态">
          <template scope="scope">
            <span v-if="scope.row.onlineStatus==0">离线</span>
            <span v-if="scope.row.onlineStatus==1">在线</span>
            <span v-if="scope.row.onlineStatus==2">不限</span>    
          </template>
        </el-table-column>
        <el-table-column
          prop="editTime"
          width="100"
          label="更新时间">
        </el-table-column>
        <el-table-column
          width="400"
          label="操作">
          <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row,1)">查看</el-button>
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row,2)">编辑</el-button>
            <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row,3)">添加报告</el-button>
            <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row,4)">添加评分</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">下线</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        v-show="tableData.rowCount>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next"
        :page-size=2
        :currentPage="currentPage"
        @current-change="currentChange"
        :total="tableData.rowCount">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
import AreaAll from '../Common/AreaAll/AreaAll'
import Subnav from '../Subnav/Subnav'

export default {
    name:'managers',
    components:{
      Subnav,
      AreaAll,
    },
    data() {
      return {
        currentPage:1,
        secondLevel:'楼盘',
        threeLevel:'楼盘管理',
        editTime:'',
        pickerOptions:{
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        filterForm: {
          pageIndex:1,
          pageSize:2,
          buidingName:'',
          developer:'',
          editTimeBegin:'',
          editTimeEnd:'',
          rentaType:'',
          province:'',
          city:'',
          area:'',
          housePurchaseType:'',
          ICareU:'',
          onlineStatus:'',
          buidingId:''
        },
        tableData: {
          rowCount:0,
          buidingList:[]
        },
        is_loading_tab:false,
        multipleSelection: [],
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
        this.$http('/emlist',{body:_this.filterForm},{},{},'post').then(function(res){
          console.log(res)
          _this.is_loading_tab=false;
          if(res.data.code==0){
            if(res.data.response.status==1){
              _this.tableData=res.data.response.data;
            }else{
              _this.$message({
                message: res.data.response.message,
                type: 'warning'
              });
            }
          }else{
            _this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
        }).catch(function(err){
          console.log(err)
          _this.is_loading_tab=false;
          _this.$message({
            message: '请求失败，请稍后重试',
            type: 'warning'
          });
        })
      },
      onSearchSubmit(){
        this.filterForm.pageIndex=1;
        if(this.currentPage!=1){
          this.currentPage=1;
        }else{
          this.getdata()
        }
      },
      pickerChange(val){
        this.filterForm.editTimeBegin=val.slice(0,10)
        this.filterForm.editTimeEnd=val.slice(13)
      },
      currentChange(page){
        this.currentPage=page;
        this.filterForm.pageIndex=page;
        this.getdata()
      },
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        this.editTime='';
        for(let i in this.filterForm){
          if(i=='pageIndex'){
            this.filterForm[i]=1
          }else if(i=='pageSize'){
            this.filterForm[i]=2
          }else{
            this.filterForm[i]=''
          }
        }
        if(this.currentPage!=1){
          this.currentPage=1;
        }else{
          this.getdata()
        }
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
      handleEdit(index, row ,type) {
        console.log(index, row);
        if(type==1){
          this.$router.push({path:'/index/estatedetail'})
        }else if(type==2){
          this.$router.push({path:'/index/estateedit',query:{type:1}})
        }else if(type==3){
          this.$router.push({path:'/index/estateedit',query:{type:2}})
        }else if(type==4){
          this.$router.push({path:'/index/estateedit',query:{type:3}})
        }
      },
      handleDelete(index, row) {
        let _this=this;
        this.$confirm('确认上线/下线吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.onSearchSubmit()
          _this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消'
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
        
      }         
    },
    mounted(){
      
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/estatemanagement');
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
  .search_wap .el-input{width:110px;}
</style>
