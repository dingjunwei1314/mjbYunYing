<template>
  <div class="managers">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

    <div style="padding:20px" class="search_wap">
      
      <el-row style="min-height:150px">
        <el-col :span="20">
          <el-form :inline="true" style=""  @keyup.native.enter="onSearchSubmit" :model="filterForm" class="demo-form-inline">
            <div>
              <el-form-item label="楼盘id">
                <el-input   v-model="filterForm.id" placeholder="楼盘id"></el-input>
              </el-form-item>
              <el-form-item label="楼盘名称">
                <el-input  v-model="filterForm.name" placeholder="楼盘名称"></el-input>
              </el-form-item>
              <el-form-item label="开发商">
                <el-input  v-model="filterForm.developers" placeholder="开发商"></el-input>
              </el-form-item>
              <el-form-item label="省">
                <el-select clearable @change="pro_change" v-model="filterForm.sheng" placeholder="省">
                  <el-option v-for="(item,index) in pro_arr" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="市">
                <el-select clearable v-model="filterForm.shi" placeholder="市">
                  <el-option v-for="(item,index) in c_city_arr" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="区">
                <el-select clearable v-model="filterForm.qu" placeholder="区">
                  <el-option label="是" value="1"></el-option>
                  
                </el-select>
              </el-form-item> -->
            </div>

            <el-form-item label="严选">
              <el-select clearable v-model="filterForm.strict_select" placeholder="不限">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合作买房">
              <el-select clearable v-model="filterForm.cooper_buy" placeholder="不限">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="租金返还">
              <el-select clearable v-model="filterForm.rental_return" placeholder="不限">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select clearable v-model="filterForm.state" placeholder="不限">
                <el-option label="在线" value="1"></el-option>
                <el-option label="离线" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-date-picker
                @change="pickerChange"
                v-model="filterForm.time"
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
        style="width: 100%;font-size:12px!important;"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="id"
          label="楼盘id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="楼盘名"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="address"
          label="所在地区"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="developers"
          label="开发商"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="工程质量、规划、落实、周边评分"
          min-width="100">
          <template scope="scope">
            {{ scope.row.score[0]}}、
            {{ scope.row.score[1]}}、
            {{ scope.row.score[2]}}、
            {{ scope.row.score[3]}}
          </template>
         
        </el-table-column>

        <el-table-column
          prop="strict_select"
          label="严选"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="cooper_buy"
          nim-width="60"
          label="合作买房">
        </el-table-column>
        <el-table-column
          prop="rental_return"
          min-width="80"
          label="租金返还">
        </el-table-column>
        <el-table-column
          prop="state" 
          min-width="60"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="time"
          width="100"
          label="更新时间">
        </el-table-column>
        <el-table-column
          min-width="300"
          label="操作">
          <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">添加报告</el-button>
            <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">添加评分</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">下线</el-button>
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

    <BigDialog dialogTitle="添加管理员" @dialogCancel="dialogCancel" @dialogConfirm="dialogConfirm" :dialogFormVisible="dialogFormVisible">
      <div slot="dia_body">
        <el-form ref="form" :model="addNewForm" :rules="addNewFormRules" label-width="80px" style="margin:0px auto;width:500px">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="addNewForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户" prop="name">
            <el-input v-model="addNewForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="addNewForm.pass"></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="phpone">
            <el-input v-model="addNewForm.phpone"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="addNewForm.email"></el-input>
          </el-form-item>

          <el-form-item label="角色">
            <el-select v-model="addNewForm.role" placeholder="请选择角色">
              <el-option label="部门主任" value="部门主任"></el-option>
              <el-option label="老板" value="老板"></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="备注">
            <el-input type="textarea" v-model="addNewForm.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>  
    </BigDialog>
    
  </div>
</template>

<script>
import {pro_arr,city_arr} from '../../common/pc.js'
import Subnav from '../Subnav/Subnav'
import BigDialog from '../Common/BigDialog/BigDialog'
import exportExcel from '../../common/exportExcel'
export default {
    name:'managers',
    components:{
      Subnav,
      BigDialog
    },
    data() {
      return {
        pro_arr,
        city_arr,
        c_city_arr:[],
        currentPage:1,
        secondLevel:'楼盘',
        threeLevel:'楼盘管理',
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
          developers:'',
          time:'',
          rental_return:'',
          sheng:'',
          shi:'',
          qu:'',
          cooper_buy:'',
          strict_select:'',
          state:'',
          id:''
        },
        tableData: {
          total:0,
          list:[]
        },
        is_loading_tab:false,
        multipleSelection: [],
        dialogFormVisible: false,
        addNewForm: {
          sex: '',
          name: '',
          pass:'',
          phpone:'',
          email:'',
          role: '', 
          desc: ''
        },
        addNewFormRules:{
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          phpone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ]
        },
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
        this.$http('/emlist').then(function(res){
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
     
     
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        var that=this
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)        
      },
      addNew(){
        this.dialogFormVisible=true;
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(this.tableData.indexOf(row),1);
          this.onSearchSubmit()
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
      dialogCancel(){
        this.dialogFormVisible=false;
        this.clearAddForm()
      },
      dialogConfirm(){
        if(this.addNewForm.sex==''){
          this.$message({
            message: '请选择性别',
            type: 'warning'
          });
          return
        }
        if(this.addNewForm.name==''){
          this.$message({
            message: '用户名不能为空',
            type: 'warning'
          });
          return
        }
        if(this.addNewForm.pass==''){
          this.$message({
            message: '初始密码不能为空',
            type: 'warning'
          });
          return
        }
        if(this.addNewForm.phpone==''){
          this.$message({
            message: '手机号不能为空',
            type: 'warning'
          });
          return
        }
        if(this.addNewForm.email==''){
          this.$message({
            message: '邮箱不能为空',
            type: 'warning'
          });
          return
        }
        var joinDate=new Date(),
            joinDateMonth=(joinDate.getMonth()+1)<10? '0'+(joinDate.getMonth()+1) : (joinDate.getMonth()+1),
            joinDateDay=joinDate.getDate()<10? '0'+joinDate.getDate() : joinDate.getDate(),
            standardJoinDate=joinDate.getFullYear()+'-'+joinDateMonth+'-'+joinDateDay,
            new_data={
              id:this.tableData.length+100,
              use:'是',
              date:standardJoinDate,
              phpone:this.addNewForm.phpone,
              email:this.addNewForm.email,
              name: this.addNewForm.name,
              role: this.addNewForm.role
            };

        this.tableData.push(new_data)
        this.dialogFormVisible=false;
        this.onSearchSubmit()
        this.clearAddForm()
      },
      clearAddForm(){
        for(var i in this.addNewForm){
          this.addNewForm[i]=''
        }
      },
         
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
  .search_wap .el-input{width:140px;}
</style>
