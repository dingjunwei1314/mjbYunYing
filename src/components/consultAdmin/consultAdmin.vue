<template>
  <div class="consultAdmin">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <div style="padding:20px" class="postsTop_wap">
      <div class="postsSeek">
        <div style="width: 80%;">
          <div style="display: flex;">
            <div>
              <span>查询ID</span>
              <el-input v-model="filterForm.id" placeholder="id" style="width:60px;"></el-input>
            </div>
            <div>
              <span style="margin-left:10px">用户名</span>
              <el-input v-model="filterForm.username" placeholder="用户名" style="width:100px;"></el-input>
            </div>
            <div>
              <span style="margin-left:10px">手机号</span>
              <el-input v-model="filterForm.phone" placeholder="手机号" style="width:150px;"></el-input>
            </div>
            <div>
              <span style="margin-left:10px">楼盘</span>
              <el-input v-model="filterForm.house" placeholder="楼盘" style="width:150px;"></el-input>
            </div>
            <div>
              <span style="margin-left:10px">状态</span>
              <el-select v-model="filterForm.state" placeholder="状态" style="width:100px;">
                <el-option label="在线" value="1"></el-option>
                <el-option label="离线" value="2"></el-option>
              </el-select>
            </div>
          </div>
          <div class="bao">
            <span>区域：</span>
            <AreaAll :area="filterForm"></AreaAll>
            <span class="demonstration" style="margin-left:10px">时间</span>
            <el-date-picker
              v-model="filterForm.time"
              align="right"
              type="date"
              placeholder="选择日期">
            </el-date-picker>  
          </div>
        </div>
        <div class="inquireBtn">
          <el-button @click="search" type="primary">查询</el-button>
        </div>
      </div>
    </div>
    <div class="consultAdminTible">
      <el-table
        :data="data.list"
        border
        v-loading="is_loading_tab"
        tooltip-effect="dark"
        style="font-size:12px!important">
        <el-table-column
          prop="id"
          label="咨询ID"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="所在省市区"
         >
        </el-table-column>
        <el-table-column
          prop="house"
          label="楼盘">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="appointment_time"
          label="预约时间">
        </el-table-column>
        <el-table-column
          prop="problem"
          label="问题">
        </el-table-column>
        <el-table-column
          label="状态"
          color="red">
          <template scope="scope">
            <span style="color:red">{{scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="recovery_time"
          label="回复时间">
        </el-table-column>
        <el-table-column
          prop="recovery_con"
          label="回复概要">
        </el-table-column>
        <el-table-column width="180px" label="操作">
          <template scope="scope">
            <router-link :to="{path:'/index/counsultParticulars',query:{id:scope.row.id,type:'see'}}">
            <el-button
              size="small"
              type="info">
              查看详情
            </el-button>
            </router-link>
            <router-link :to="{path:'/index/counsultParticulars',query:{id:scope.row.id,type:'edit'}}">
              <el-button
                size="small"
                type="info"
                >详情编辑</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin:20px 0px">
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="2"
        layout="total, prev, pager, next"
        :total="data.total">
        </el-pagination>
      </div>
      
    </div>
  </div>
</template>

<script>
  import Subnav from '../Subnav/Subnav.vue'
  import AreaAll from '../Common/AreaAll/AreaAll'

  export default {
    name:'ConsultAdmin',
    components:{
      Subnav,
      AreaAll
    },
    data(){
      return{
        secondLevel:'咨询管理',
        threeLevel:'咨询管理',
        currentPage:1,
        is_loading_tab:false,
        filterForm: {
          page:1,
          id:'',
          username:'',
          time:'',
          sheng:'',
          shi:'',
          qu:'',
          state:'',
        },
        data:{
          total:0,
          list:[]
        }
      }
    },
    created(){
      this.getdata()
    },
    methods:{
      getdata(){
          let _this=this;
          _this.is_loading_tab=true;
          this.$http('/consultationlist',{},_this.filterForm).then(function(res){
          console.log(res)
          if(res.data.code==1000){
              _this.data=res.data.data;
          }
          _this.is_loading_tab=false;
          }).catch(function(err){
              _this.is_loading_tab=false;
              console.log(err)
          })
      },
      search(){
        this.filterForm.page=1;
        this.currentPage=1;
        this.getdata()
      },
      handleCurrentChange(page){
        this.filterForm.page=page;
        this.getdata()
      },
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        this.currentPage=1;
        for(var i in this.filterForm){
          if(i=='page'){
            this.filterForm[i]=1
          }else{
            this.filterForm[i]=''
          }
        }
        this.getdata()
        var that=this
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)
      },
    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/consultAdmin');
      var that=this;
      setTimeout(function(){
        that.$store.dispatch('mainLoadingAction',false);
      },300)
    }
  }
</script>

<style scoped>
  .consultAdminTible{
    border: 1px solid darkgray;margin:20px;
  }
  .consultAdmin .postsTop_wap{
    border: 1px solid darkgray;margin:20px;
  }
  .consultAdmin .postsSeek .postsOption{
    width:12%;
  }
  .consultAdmin .postsSeek .postsInputSeek{
    width:20%;
  }
  .consultAdmin .postsSeek .bao{
    width:100%;
    display:inline-block;
    *display:inline;
    *zoom:1;
    margin-top: 15px;
  }
  .consultAdmin .postsSeek{
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display: flex;
    justify-content: space-between;
  }
  .inquireBtn button{
    width:150px;
    height:50px;

  }
  .inquireBtn{
    line-height: 50px;
    padding-top: 24px;
    padding-bottom: 24px;
  }
</style>

