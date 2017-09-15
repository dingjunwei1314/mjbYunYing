<template>
  <div class="createNewAdmin">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <p>新建管理员</p>
    <div class="createNewAdminTop">
      <div class="spans">
          <span>用户名</span><span>:</span>
          <el-input v-model="input" placeholder="请输入用户名"></el-input>
      </div>
      <div class="spans">
        <span>真实姓名</span><span>:</span>
        <el-input v-model="input" placeholder="请输入姓名"></el-input>
      </div>
      <div>
        <span  class="spana">性别</span><span class="spana">:</span>
        <el-radio class="radio" v-model="radio" label="1">男</el-radio>
        <el-radio class="radio" v-model="radio" label="2">女</el-radio>
      </div>
    </div>
    <div  style="width:80%;margin:15px auto">
      <span  class="spana">省市</span><span class="spana">:</span>
      <AreaAll :area="filterForm" :isshowqu="false"></AreaAll>
    </div>
    <div class="createNewAdminTop">
      <div class="spans">
        <span>密码</span><span>:</span>
        <el-input v-model="input" placeholder="请输入用户名"></el-input>
      </div>
      <div class="spans">
        <span>确认密码</span><span>:</span>
        <el-input v-model="input" placeholder="请输入用户名"></el-input>
      </div>
      <div class="spanb">
        <span >角色分配</span><span>:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="consultParticularsFoot">
      <el-button type="primary">保存</el-button>
      <el-button type="danger">取消</el-button>
    </div>
  </div>
</template>

<script>
  import Subnav from '../Subnav/Subnav.vue'
  import AreaAll from '../Common/AreaAll/AreaAll'

  export default {
    name:'CreateNewAdmin',
    components:{
      Subnav,
      AreaAll
    },
    data(){
      return{
        secondLevel:'账户管理',
        threeLevel:'管理员管理',
        radio:'1',
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
        options: [{
          value: '选项1',
          label: '超级管理员'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '选项1'
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
  .createNewAdmin{
    border: 1px solid darkgray;margin:20px;
  }
 p{
  padding: 15px;
}
 .createNewAdminTop{
   width:80%;margin: auto;
 }
.createNewAdminTop div{
  display:-webkit-box;
  display:-webkit-flex;
  display:-ms-flexbox;
  display: flex;
  margin-top: 10px;
}
.createNewAdminTop input{
  width: 200px;
}
  .spans span{
    width: 100px;
    line-height: 56px;
    text-align: left;
    margin-left: 15px;
  }
  .spana{
    text-align: left;
    display:inline-block;
    *display:inline;
    *zoom:1;
    width: 81px;
    margin-left: 15px;
  }
  .consultParticularsFoot{
    margin: 20px auto;
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display: flex;
    justify-content: space-around;
    width:20%;
  }
  .consultParticularsFoot button{
    width:200px;
  }
  .spanb span{
    width:81px;
    margin-left:15px;
    line-height: 56px;
  }
</style>
