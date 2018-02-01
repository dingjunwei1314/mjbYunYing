<template>
    <div class="accountAdmin">
      <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
      <div class="accountAdminTop">

        <el-row style="border:1px solid #ccc;padding:20px 10px;margin-bottom: 20px">
          <el-col :span="20">
            <el-form :inline="true" style="" :model="filterForm" class="demo-form-inline">
              <el-form-item label="用户名">
                <el-input  size="small" v-model="filterForm.user_name" style="width:180px" placeholder="用户名"></el-input>
              </el-form-item>
              
              <el-form-item label="创建时间">
                <el-date-picker
                  size="small"
                  style="width:300px"
                  @change="pickerChange"
                  v-model="editTime"
                  type="datetimerange"
                  align="right"
                  placeholder="选择日期范围"
                  >
                </el-date-picker>
              </el-form-item> 
            </el-form>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="create">新建账户</el-button>
          </el-col>
        </el-row>
        <div class="accountAdminInquireTable">
          <el-table
            border
            v-loading="tabLoading"
            :data="tableData.list"
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
              label="所在区域">
              <template scope="scope">
                <span>{{scope.row.provinceName}}{{scope.row.cityName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="departmentName"
              label="所在部门">
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="editTime"
              label="编辑时间">
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色分配">
            </el-table-column>
            <el-table-column width="180px" label="操作">
              <template scope="scope">
                  <el-button
                    size="small"
                    type="danger"
                    @click="handle(scope.$index, scope.row,1)">删除</el-button>
                  <el-button
                    size="small"
                    @click="handle(scope.$index, scope.row,2)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-show="tableData.pageCount>0"
            style="margin: 0 auto;text-align:center;margin-top:20px"
            layout="prev, pager, next,jumper"
            :page-size="10"
            :currentPage="currentPage"
            @current-change="currentChange"
            :total="tableData.pageCount">
          </el-pagination>
        </div>
      </div>
    </div>
</template>
<script>
  import Subnav2 from '../Subnav2/Subnav2.vue'
  import message from '../../common/message';
    export default {
      name:'AccountAdmin',
      components:{
        Subnav2,
      },
      data(){
          return{
            navList:[
              {path:this.$route.fullPath,name:'首页'},
              {path:this.$route.fullPath,name:'账户管理'},
              {path:this.$route.fullPath,name:'账户列表'}
            ],
            currentPage:1,
            tabLoading:false,
            editTime:'',
            filterForm:{
              pageNum:0,
              pageSize:10,
              user_name:'',
              startTime:'',
              endTime:''
            },
            tableData: []
          }
      },
      created(){
        this.getData()
      },
      methods:{
        getData(){
            let body = this.filterForm;
            this.tabLoading = true;
            this.$http('/backstageUser/queryListInfo',{body},{},{},'post').then(res => {
              if(res.data.code == 0){
                this.tableData = res.data.response;
              }else{
                message(this,'请求失败','warning');
              }
              this.tabLoading = false;
            }).catch(function(err){
              this.tabLoading = false;
              console.log(err)
            })
        },
        //查询
        search(){
          this.filterForm.pageNum = 0;
          this.getData();
        },
        //改变时间格式
        pickerChange(val){
          this.filterForm.startTime=val.slice(0,19);
          this.filterForm.endTime=val.slice(22);
        },
        //页码改变
        currentChange(page){
          this.filterForm.pageNum = page-1;
          this.getData();
        },
        //新增
        create(){
          this.$router.push({
            path:'/account/createnewaccount'
          })
        },
        //删除 编辑
        handle(index,row,type){
          if(type==1){
            this.$confirm('确认删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let body = {
                id:row.id
              };
              this.$http('/backstageUser/delInfo',{body},{},{},'post').then(res => {
                if(res.data.code == 0){
                  if(res.data.response.res == 1){
                    this.getData();
                    message(this,'删除成功','success');
                  }else{
                    message(this,'删除失败','warning');
                  }
                }
              })
            }).catch((err) => {
              console.log(err)
            });
          }else{
            this.$router.push({
              path:'/account/createnewaccount',
              query:{
                type:'edit',
                info:JSON.stringify(row)
              }
            })
          }
        },
        refresh(){
          this.getData()
        },      
      },
      mounted(){
        this.$store.dispatch('defaultIndexAction','/account/accountmanagement');
      }
    }
</script>

<style scoped>
    .accountAdminTop{
      margin:20px;
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
    /*padding: 15px;*/
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
