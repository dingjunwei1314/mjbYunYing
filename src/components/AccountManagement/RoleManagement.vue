<template>
  <div class="roleAdmin">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <div class="roleAdminTop">
      <div class="creareAdmin">
        <router-link :to="{path:'/index/createnewrole',query:{type:'add'}}">
        <el-button
          size="small"
          type="primary">
          创建角色
        </el-button>
      </router-link>
      </div>
      <el-table
        :data="tableData"
        v-loading="is_loading_tab"
        style="width: 100%;font-size:12px;">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="con"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="time"
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
                type="info"
                @click="handle(scope.$index, scope.row,2)">修改</el-button>
         
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
      Subnav
    },
    data(){
      return{
        secondLevel:'账户管理',
        threeLevel:'角色管理',
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
          this.$http('/rolelist',{},_this.filterForm).then(function(res){
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
      //删除 编辑
      handle(index,row,type){
        let _this=this;
        if(type==1){
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
        }else{
          this.$router.push({path:'/index/createnewrole',query:{type:'edit',id:row.id}})
        }
      },
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        this.getdata()
        var that=this
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)
      },
    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/rolemanagement');
      var that=this;
      setTimeout(function(){
        that.$store.dispatch('mainLoadingAction',false);
      },300)
    }
  }
</script>

<style scoped>
  .roleAdminTop{
    border: 1px solid darkgray;margin:20px;
  }
  .creareAdmin{
    padding:10px;
    text-align: right;
  }
</style>
