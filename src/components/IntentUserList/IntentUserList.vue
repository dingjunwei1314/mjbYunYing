<template>
  <div class="intentuserlist">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

    <div style="padding:20px" class="search_wap">
      
      <el-row style="min-height:60px">
        <el-col :span="22">
          <el-form :inline="true" :model="filterForm" class="demo-form-inline">
              
            <el-form-item label="用户id">
              <el-input   v-model="filterForm.id" placeholder="用户id"></el-input>
            </el-form-item>
           
            <el-form-item label="城市">
              <AreaAll :isshowqu="false" :area="filterForm"></AreaAll> 
            </el-form-item>
             
            <el-form-item label="购买目的">
              <el-select clearable v-model="filterForm.objective" placeholder="状态">
                <el-option label="居住" value="1"></el-option>
                <el-option label="投资" value="2"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="注册时间">
              <el-date-picker
                v-model="filterForm.registe_time"
                type="date"
                placeholder="注册时间">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="信息完善">
              <el-select clearable v-model="filterForm.information_compete" placeholder="信息完善">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="2" style="text-align:right">
         
            <el-button type="primary" @click="onSearchSubmit">搜索会员</el-button>
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
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
          min-width="60">
        </el-table-column>
         <el-table-column
          prop="address"
          label="所在省市"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="objective"
          label="购房目的"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="first_pay_range"
          label="首付款范围"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="most_care"
          label="最关心的房屋因素"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="is_all_pay"
          label="是否全流程监控"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="all_pay"
          min-width="100"
          label="全流程付费">
        </el-table-column>
        <el-table-column
          prop="buy_cooperation"
          min-width="100"
          label="合作买房">
        </el-table-column>
         <el-table-column
          prop="plan_buy_time"
          min-width="100"
          label="计划买房时间">
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
     
    <BigDialog dialogTitle="用户详情" @dialogCancel="dialogCancel" @dialogConfirm="dialogConfirm" :dialogFormVisible="dialogFormVisible">
      <div slot="dia_body" class="dia_body">
        <el-form ref="form" :model="addNewForm" label-width="200px" style="margin:0px auto;width:620px">

          <el-form-item label="ID：">
            {{dia_data.id}}
          </el-form-item>
          <el-form-item label="昵称：">
            {{dia_data.name}}
          </el-form-item>

          <el-form-item label="省市：">
            {{dia_data.address}}
          </el-form-item>

          <el-form-item label="购房目的：">
            {{dia_data.objective}}
          </el-form-item>

          <el-form-item label="房屋类型：">
            {{dia_data.house_type}}
          </el-form-item>

          <el-form-item label="意向户型：">
            {{dia_data.want_type}}
          </el-form-item>

          <el-form-item label="首付款：">
            {{dia_data.first_pay_range}}
          </el-form-item>

          <el-form-item label="购房最关心因素：">
            {{dia_data.most_care}}
          </el-form-item>

          <el-form-item label="是否需要全流程监控：">
            {{dia_data.is_all_pay}}
          </el-form-item>

          <el-form-item label="全流程可接受费用：">
            {{dia_data.all_pay}}
          </el-form-item>

          <el-form-item label="合作买房：">
            {{dia_data.buy_cooperation}}
          </el-form-item>

          <el-form-item label="预计买房时间：">
            {{dia_data.plan_buy_time}}
          </el-form-item>

          <el-form-item label="提交时间：">
            {{dia_data.updata_time}}
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
    name:'intentuserlist',
    components:{
      Subnav,
      AreaAll,
      BigDialog
    },
    data() {
      return {
        currentPage:1,
        dialogFormVisible:false,
        secondLevel:'用户管理',
        threeLevel:'买房意向管理',
        filterForm: {
          id:'',
          sheng:'',
          shi:'',
          objective:'',
          registe_time:'',
          information_compete:'',
        },
        dia_data:{
          img_src: '',
          id: '',
          address: '',
          name: '',
          sex: '',
          phone: '',
          wechat_number: '',
          register_time: '',
          last_login_time: ''
        },
        addNewForm: {
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
        this.$http('/intentuserlist',{},_this.filterForm).then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.tableData=res.data.data;
          }
          _this.is_loading_tab=false;
        })
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
        let _this=this,
            data={id:row.id};
        this.$http('/intentuserlistdetail',{},data).then(function(res){
          console.log(res)
          if(res.data.code == 0){
            _this.dia_data=res.data.data;
            _this.dialogFormVisible=true;
          }
        })
        
      },
      dialogCancel(){
        this.dialogFormVisible=false;
      },
      dialogConfirm(){
        this.dialogFormVisible=false;
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
      this.$store.dispatch('defaultIndexAction','/user/intentuserlist');
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
