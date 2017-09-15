<template>
  <div class="roleAdmin">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <div class="roleAdminTop">
      <div class="creareAdmin">
        <router-link to="/index/createAdmin">
        <el-button
          size="small"
          type="primary"
          @click="handleDelete(scope.$index, scope.row)">创建角色</el-button>
      </router-link>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="address"
          label="添加时间">
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
</template>

<script>
  import Subnav from '../Subnav/Subnav.vue'

  export default {
    name:'RoleAdmin',
    components:{
      Subnav,
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
    data(){
      return{
        secondLevel:'账户管理',
        threeLevel:'角色管理',
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
  .roleAdminTop{
    border: 1px solid darkgray;margin:20px;
  }
  .creareAdmin{
    padding:10px;
    text-align: right;
  }
</style>
