<template>
  <div class="createAdmin">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <div class="createAdminTop">
        <p>新建角色</p>
          <div class="adminName">
      <span>角色名称</span><span>:</span><el-input></el-input>
           </div>
      <div class="adminJurisdiction">
          <div class="houseAdmin">
            <el-checkbox v-model="checked">楼盘管理</el-checkbox>
          </div>
          <div class="houseAdminText">
            <el-checkbox v-model="checked" class="checkedAdmin">新增楼盘</el-checkbox>
            <el-checkbox v-model="checked" class="checkedAdmin">楼盘管理</el-checkbox>
            <el-checkbox v-model="checked" class="checkedAdmin">楼盘详情查看</el-checkbox>
            <el-checkbox v-model="checked" class="checkedAdmin">楼盘详情查看,编辑</el-checkbox>
            <el-checkbox v-model="checked" class="checkedAdmin">楼盘排行榜管理</el-checkbox>
            <el-checkbox v-model="checked" class="checkedAdmin">楼盘排行榜查看</el-checkbox>
            <el-checkbox v-model="checked" class="checkedAdmin">楼盘排行榜查看,编辑</el-checkbox>
            <el-checkbox v-model="checked" class="checkedAdmin">用户期待楼盘管理</el-checkbox>
          </div>
      </div>
      <div class="adminJurisdiction">
        <div class="houseAdmin">
          <el-checkbox v-model="checked">订单管理</el-checkbox>
        </div>
        <div class="houseAdminText">
          <el-checkbox v-model="checked" class="checkedAdmin">合作买房</el-checkbox>
        </div>
      </div>
      <div class="adminJurisdiction">
        <div class="houseAdmin">
          <el-checkbox v-model="checked">文章管理</el-checkbox>
        </div>
        <div class="houseAdminText">
          <el-checkbox v-model="checked" class="checkedAdmin">文章管理</el-checkbox>
          <el-checkbox v-model="checked" class="checkedAdmin">文章查看</el-checkbox>
          <el-checkbox v-model="checked" class="checkedAdmin">文章查看,编辑</el-checkbox>
        </div>
      </div>
      <div class="adminJurisdiction">
        <div class="houseAdmin">
          <el-checkbox v-model="checked">活动管理</el-checkbox>
        </div>
        <div class="houseAdminText">
          <el-checkbox v-model="checked" class="checkedAdmin">活动管理</el-checkbox>
        </div>
      </div>
      <div class="adminJurisdiction">
        <div class="houseAdmin">
          <el-checkbox v-model="checked">咨询管理</el-checkbox>
        </div>
        <div class="houseAdminText">
          <el-checkbox v-model="checked" class="checkedAdmin">咨询管理</el-checkbox>
          <el-checkbox v-model="checked" class="checkedAdmin">咨询详情查看</el-checkbox>
          <el-checkbox v-model="checked" class="checkedAdmin">咨询详情查看,编辑</el-checkbox>
        </div>
      </div>
      <div class="adminJurisdiction">
        <div class="houseAdmin">
          <el-checkbox v-model="checked">用户管理</el-checkbox>
        </div>
        <div class="houseAdminText">
          <el-checkbox v-model="checked" class="checkedAdmin">用户管理</el-checkbox>
          <el-checkbox v-model="checked" class="checkedAdmin">用户详情查看</el-checkbox>
          <el-checkbox v-model="checked" class="checkedAdmin">用户详情查看,编辑</el-checkbox>
          <el-checkbox v-model="checked" class="checkedAdmin">买房意向</el-checkbox>
          <el-checkbox v-model="checked" class="checkedAdmin">消息管理</el-checkbox>
          <el-checkbox v-model="checked" class="checkedAdmin">新建消息,删除消息</el-checkbox>
        </div>
      </div>
      <div class="adminJurisdiction">
        <div class="houseAdmin">
          <el-checkbox v-model="checked">账户管理</el-checkbox>
        </div>
        <div class="houseAdminText">
          <el-checkbox v-model="checked" class="checkedAdmin">账户管理</el-checkbox>
        </div>
      </div>
      <div class="houseAdmin">
        <el-checkbox v-model="checked">全选</el-checkbox>
      </div>
      <div class="houseAdminEare">
          <span>角色备注</span><span>:</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
      </div>
      <div class="houseAdminEareBtn">
        <el-button type="primary">提交</el-button>
        <el-button type="danger">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Subnav from '../Subnav/Subnav.vue'

  export default {
    name:'CreateAdmin',
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
      handleCheckAllChange(event) {
        this.checkedCities = event.target.checked ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    },
    data(){
      return{
        secondLevel:'角色管理',
        threeLevel:'新建角色',
        checkAll: true,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true,
        textarea:'',
        checked:true
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
  .createAdminTop{
    border: 1px solid darkgray;margin:20px;
  }
  .createAdminTop p {
    padding: 10px;
  }
  .adminName{
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display: flex;
    padding: 10px;
  }
  .adminName input{
    width:200px;
  }
  .adminName span{
    width:100px;
    display:inline-block;
    *display:inline;
    *zoom:1;
    line-height: 36px;
  }
  .houseAdmin{
      background:rgba(32,160,255,.8);
      padding: 5px 0 0 20px;
  }
  .houseAdmin span{
    color:#fff;
  }
  .houseAdminText .checkedAdmin{
    width:250px;
    text-align: left;
    margin: 20px;
  }
  .houseAdminEare{
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display: flex;
    padding: 20px;
  }
  .houseAdminEare span{
    width:80px;
    text-align: center;
    line-height: 53px;
  }
  .houseAdminEareBtn{
    padding: 15px;
    width: 350px;
    margin: auto;
  }
  .houseAdminEareBtn button{
    width: 150px;
  }
</style>
