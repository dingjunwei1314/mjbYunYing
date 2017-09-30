<template>
  <div class="managers">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

    <div style="padding:20px" class="search_wap">
      
      <el-row style="min-height:150px">
        <el-col :span="20">
          <el-form :inline="true" style=""  @keyup.native.enter="onSearchSubmit" :model="filterForm" class="demo-form-inline">
            <div>
              <el-form-item label="报名编号">
                <el-input   v-model="filterForm.registration_number" placeholder="报名编号"></el-input>
              </el-form-item>
              <el-form-item label="用户id">
                <el-input   v-model="filterForm.id" placeholder="楼盘id"></el-input>
              </el-form-item>
              <el-form-item label="用户名">
                <el-input  v-model="filterForm.name" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input  v-model="filterForm.phone" placeholder="手机号"></el-input>
              </el-form-item>
              <el-form-item label="预约号">
                <el-input  v-model="filterForm.reservation_number" placeholder="预约号"></el-input>
              </el-form-item>
             
            </div>
            <el-form-item label="楼盘名称">
              <el-input  v-model="filterForm.houres_name" placeholder="楼盘名称"></el-input>
            </el-form-item>

            <el-form-item label="区域">
              <AreaAll  :area="filterForm"></AreaAll> 
            </el-form-item>
            
            <el-form-item label="租金返还">
              <el-select clearable v-model="filterForm.rental_return" placeholder="不限">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" style="text-align:right">
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
        </el-col>
      </el-row>
  
      <div class="tabletopbar">
        <span>所有数据：共</span> <span style="color:#111">{{tableData.total}}</span> <span>条</span>
        <span style="margin-left:20px">查询结果：共</span> 
        <span style="color:#111">{{tableData.total}}</span> <span>条</span>
      </div>
      <el-table
        v-loading="is_loading_tab"
        ref="multipleTable"
        :data="tableData.list"
        border
        tooltip-effect="dark"
        style="width: 100%;font-size:12px!important;">
        <el-table-column
          prop="registration_number"
          label="报名编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="id"
          label="楼盘id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="reservation_number"
          label="预约号"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="address"
          label="楼盘所在地"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="houres_name"
          label="楼盘"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="rental_return"
          min-width="80"
          label="租金返还">
        </el-table-column>
        <el-table-column
          prop="rental_return_number" 
          min-width="60"
          label="租金返还">
        </el-table-column>
        <el-table-column
          prop="time"
          width="100"
          label="报名时间">
        </el-table-column>
        <el-table-column
          min-width="100"
          label="操作">
          <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
    
    <BigDialog dialogTitle="合作买房" @dialogCancel="dialogCancel" @dialogConfirm="dialogConfirm" :dialogFormVisible="dialogFormVisible">
      <div slot="dia_body" class="dia_body">
        <el-form ref="form" :model="dia_data" label-width="150px" style="margin:0px auto;width:620px">
          <el-form-item label="报名编号：" prop="sex">
            {{dia_data.registration_number}}
          </el-form-item>
          <el-form-item label="用户id：" prop="name">
            {{dia_data.id}}
          </el-form-item>
          <el-form-item label="用户名：" prop="pass">
            {{dia_data.name}}
          </el-form-item>

          <el-form-item label="手机号：" prop="phpone">
            {{dia_data.phone}}
          </el-form-item>

          <el-form-item label="预约号：" prop="email">
            {{dia_data.reservation_number}}
          </el-form-item>

          <el-form-item label="预约号使用次数：" prop="email">
            第{{dia_data.number}}次
          </el-form-item>

          <el-form-item label="报名楼盘：" prop="email">
            {{dia_data.houres_name}}
          </el-form-item>

          <el-form-item label="所在省市区：" prop="email">
            {{dia_data.address}}
          </el-form-item>

          <el-form-item label="报名时间：" prop="email">
            {{dia_data.time}}
          </el-form-item>

          <el-form-item label="租金返还：" style="margin-bottom:5px!important">
            <el-select style="width:220px" v-model="dia_data.rental_return" placeholder="请选择角色">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="租金返还金额：" prop="email">
            <el-input style="width:220px" type="email" v-model="dia_data.rental_return_number"></el-input>&nbsp元/每月
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
    name:'managers',
    components:{
      Subnav,
      BigDialog,
      AreaAll
    },
    data() {
      return {
        currentPage:1,
        dialogFormVisible:false,
        secondLevel:'楼盘管理',
        threeLevel:'合作买房',
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
          name:'',
          registration_number:'',
          reservation_number:'',
          houres_name:'',
          phone:'',
          rental_return:'',
          sheng:'',
          shi:'',
          qu:'',
          id:''
        },
        dia_data:{
          sheng:'',
          shi:'',
          qu:'',
          sex: '',
          name: '',
          pass:'',
          phpone:'',
          email:'',
          role: '', 
          desc: ''
        },
        tableData: {
          total:0,
          list:[]
        },
        is_loading_tab:false,
        formLabelWidth: '120px'
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
        this.$http('/cooperorders').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.tableData=res.data.data;
          }
          _this.is_loading_tab=false;
        }).catch(function(err){
          console.log(err)
        })
      },
      pro_change(val){
    
        let _index=this.pro_arr.indexOf(val)
      
        if(_index==-1){
          this.c_city_arr=[]
        }else{
          this.c_city_arr=this.city_arr[_index]
        }
      
      },
      onSearchSubmit(){
        this.currentPage=1;
        this.getdata();
      },
      pickerChange(){

      },
      currentChange(page){
        this.currentPage=page;
        this.getdata()
      },
      handleEdit(index,row){
        let _this=this;
        this.$http('/cooperorderdetail').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.dia_data=res.data.data;
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
        let _this=this;
        this.$confirm('确认修改吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.getdata()
            this.dialogFormVisible=false;
            this.$message({
              message: '修改成功',
              type: 'success'
            });
        }).catch(() => {
            _this.$message({
                type: 'info',
                message: '已取消'
            });
        });
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
      this.$store.dispatch('defaultIndexAction','/index/cooperorders');
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
</style>

<style>
  .search_wap .el-input{width:140px;}
</style>
