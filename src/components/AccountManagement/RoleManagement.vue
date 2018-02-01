<template>
  <div class="roleAdmin">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
    <div class="roleAdminTop">
      <div class="creareAdmin">
        <router-link :to="{path:'/account/createnewrole',query:{type:'add'}}">
          <el-button
            size="small"
            type="primary">
            创建角色
          </el-button>
        </router-link>
      </div>
      <el-table
        :data="tableData.list"
        border
        v-loading="tab_loading"
        style="width: 100%;font-size:12px;">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间">
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
</template>

<script>
  import Subnav2 from '../Subnav2/Subnav2';
  import message from '../../common/message';
  export default {
    name:'RoleAdmin',
    components:{
      Subnav2
    },
    data(){
      return{
        navList:[
          {path:this.$route.fullPath,name:'首页'},
          {path:this.$route.fullPath,name:'账户管理'},
          {path:this.$route.fullPath,name:'角色管理'}
        ],
        currentPage:1,
        tab_loading:false,
        filterForm:{
          pageNum:0,
          pageSize:10
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
          this.tab_loading = true;
          this.$http('/backstageRole/queryListInfo',{body},{},{},'post').then(res => {
            if(res.data.code == 0){
              this.tableData = res.data.response;
            }
            this.tab_loading = false;
          })
      },
      //页码改变
      currentChange(page){
        this.filterForm.pageNum = page-1;
        this.getData();
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
            this.$http('/backstageRole/delInfo',{body},{},{},'post').then(res => {
              if(res.data.code == 0){
                if(res.data.response.res == 1){
                  this.getData();
                  message(this,'删除成功','success');
                }else{
                  message(this,'删除失败','warning');
                }
              }
            })
          }).catch(err => {
            console.log(err)
          });
        }else{
          this.$router.push({
            path:'/account/createnewrole',
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
      this.$store.dispatch('defaultIndexAction','/account/rolemanagement');
    }
  }
</script>

<style scoped>
  .roleAdminTop{
    padding:20px;
  }
  .creareAdmin{
    margin-bottom:10px;
  }
</style>
