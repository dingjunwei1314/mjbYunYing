<template>
    <div class="accountAdmin">
      <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
      <div class="accountAdminTop">
          <p>管理员管理</p>
          <div class="accountAdminInquire">
            <div class="accountAdminInquireInput">
              <div>
                <span>用户名</span>:
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
              <div>
                <span>真实姓名</span>:
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="accountAdminInquireDate">
              <span class="demonstration">发布时间</span>
              <el-date-picker
                v-model="value1"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
              <span class="demonstration">至</span>
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
            <el-button type="primary">查询</el-button>
          </div>
        <div class="accountAdminInquireTable">
              <div class="accountAdminInquireNum">
                <router-link to="/index/createNewAdmin">
                   <el-button type="primary">新建账户</el-button>
                </router-link>
                    <i>11</i>
              </div>
          <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="用户名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="真实姓名">
            </el-table-column>
            <el-table-column
              prop="address"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="address"
              label="角色分配">
            </el-table-column>
            <el-table-column
              prop="address"
              label="登陆IP">
            </el-table-column>
            <el-table-column width="180px" label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <router-link to="/index/counsultParticulars">
                  <el-button
                    size="small"
                    type="info"
                    @click="handleDelete(scope.$index, scope.row)">修改</el-button>
                </router-link>
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
              value1:'',
              value2:'',
              loading:true,
              tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
              }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
              }]
            }
        },
      methods:{
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
        open2($index) {
          this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.tableData.splice($index,1);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        handleDelete($index){
          this.open2($index);
        }
      },
      mounted(){
        this.$store.dispatch('mainLoadingAction',true);
        this.$store.dispatch('defaultIndexAction','/index/posts');
        var that=this;
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)
      }
    }
</script>

<style>
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
