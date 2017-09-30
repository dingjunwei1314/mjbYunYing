<template>
    <div class="accountAdmin">
      <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
      <div class="accountAdminTop">
        <p>管理员管理</p>
        <div class="accountAdminInquire">
          <div class="accountAdminInquireInput">
            <div>
              <span>用户名</span>:
                <el-input v-model="filterForm.user_name" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>真实姓名</span>:
                <el-input v-model="filterForm.real_name" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="accountAdminInquireDate">
            <span class="demonstration">创建时间</span>
            <el-date-picker
              v-model="filterForm.register_begin_time"
              align="right"
              type="date"
              placeholder="开始时间"
              >
            </el-date-picker>
            <span class="demonstration">至</span>
            <el-date-picker
              v-model="filterForm.register_end_time"
              align="right"
              type="date"
              placeholder="结束时间"
              >
            </el-date-picker>
          </div>
          <el-button type="primary" @click="search">查询</el-button>
        </div>
        <div class="accountAdminInquireTable">
          <div class="accountAdminInquireNum">
            <router-link to="/index/createnewaccount">
                <el-button type="primary">新建账户</el-button>
            </router-link>     
          </div>
          <el-table
            v-loading="is_loading_tab"
            :data="tableData"
            style="width: 100%;font-size:12px!important">
            <el-table-column
              prop="id"
              label="ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user_name"
              label="用户名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="real_name"
              label="真实姓名">
            </el-table-column>
            <el-table-column
              prop="created_time"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="role"
              label="角色分配">
            </el-table-column>
            <el-table-column
              prop="ip"
              label="登陆IP">
            </el-table-column>
            <el-table-column width="180px" label="操作">
              <template scope="scope">
                <router-link :to="{path:'/index/createnewaccount',query:{type:'edit',id:scope.row.id}}">
                  <el-button
                    size="small"
                    type="info">
                    编辑
                  </el-button>
                </router-link>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
  import Subnav from '../Subnav/Subnav.vue'

    export default {
      name:'AccountAdmin',
      components:{
        Subnav,
      },
      data(){
          return{
            secondLevel:'账户管理',
            threeLevel:'账户管理',
            filterForm:{
              user_name:'',
              real_name:'',
              register_begin_time:'',
              register_end_time:''
            },
            is_loading_tab:false,
            tableData: []
          }
      },
      created(){
        this.getdata()
      },
      methods:{
        getdata(){
          let _this=this;
          _this.is_loading_tab=true;
          this.$http('/accountlist',{},_this.filterForm).then(function(res){
          console.log(res)
          if(res.data.code==1000){
              _this.tableData=res.data.data;
          }
          _this.is_loading_tab=false;
          }).catch(function(err){
              _this.is_loading_tab=false;
              console.log(err)
          })
        },
        search(){
          this.getdata()
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
        //是否删除
        handleDelete(index,row){
          this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getdata()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
      },
      mounted(){
        this.$store.dispatch('mainLoadingAction',true);
        this.$store.dispatch('defaultIndexAction','/index/accountmanagement');
        var that=this;
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)
      }
    }
</script>

<style scoped>
    .accountAdminTop{
      border: 1px solid darkgray;margin:20px;
    }
    .accountAdminTop p{
      padding: 15px;
    }
  .accountAdminInquire{
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display: flex;
    justify-content: space-around;
    padding: 15px;
  }
  .accountAdminInquireInput{
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display: flex;
  }
  .accountAdminInquireInput input{
    width:150px;
    margin-left: 20px;
  }
    .accountAdminInquireInput div{
      display:-webkit-box;
      display:-webkit-flex;
      display:-ms-flexbox;
      display: flex;
      line-height: 36px;
    }
    .accountAdminInquireInput div span{
      width:100px;
      line-height: 36px;
    }
  .accountAdminInquireTable{
    padding: 15px;
  }
  .accountAdminInquireTable .accountAdminInquireNum{
    width: 100px;
    height:50px;
    display:inline-block;
    *display:inline;
    *zoom:1;
  }
  .accountAdminInquireNum{
    position: relative;
  }
  .accountAdminInquireNum button{
    display:inline-block;
    *display:inline;
    *zoom:1;
    margin-top: 5px;
  }
    .accountAdminInquireNum i{
      display:inline-block;
      *display:inline;
      *zoom:1;
      width: 20px;
      height: 20px;
      background: #20a0ff;
      color:#fff;
      text-align: center;
      position: absolute;
      right: 0;
      border: 1px solid #fff;
      border-radius: 5px;
      font-size:12px;
      line-height: 20px;
    }
</style>
