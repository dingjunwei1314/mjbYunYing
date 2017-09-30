<template>
  <div class="createNewAdmin">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <p>新建管理员</p>
    <div class="createNewAdminTop">
      <div class="spans">
          <span>用户名</span><span>:</span>
          <el-input v-model="updataForm.user_name" placeholder="用户名"></el-input>
      </div>
      <div class="spans">
        <span>真实姓名</span><span>:</span>
        <el-input v-model="updataForm.real_name" placeholder="真实姓名"></el-input>
      </div>
    </div>
    <div class="createNewAdminTop">
      <div class="spans">
        <span>密码</span><span>:</span>
        <el-input v-model="updataForm.password" type="password" placeholder="密码"></el-input>
      </div>
      <div class="spans">
        <span>确认密码</span><span>:</span>
        <el-input v-model="updataForm.password_sure" type="password" placeholder="确认密码"></el-input>
      </div>
      <div class="spans">
        <span style="width:81px">性别</span><span style="width:81px">:</span>
        <el-radio-group v-model="updataForm.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </div>
      <div class="spanb">
        <span >角色分配</span><span>:</span>
        <el-select v-model="updataForm.role" placeholder="角色分配">
          <el-option
            label="超级管理员"
            value="1">
          </el-option>
          <el-option
            label="普通管理员"
            value="2">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="consultParticularsFoot">
      <el-button @click="updata_sure" type="primary">保存</el-button>
    
      <el-button type="danger" @click="give_up">取消</el-button>
      
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
        threeLevel:'新建管理员',
        updataForm: {
          user_name:'',
          real_name:'',
          password:'',
          sex:'',
          password_sure:'',
          role:''
        },
      }
    },
    created(){
      if(this.$route.query.type=='edit'){
        this.getdata();
      }
    },
    methods:{
      getdata(){
        let _this=this;
        this.$http('/accountdetail',{},{id:_this.$route.query.id}).then(function(res){
          console.log(res)
          if(res.data.code==1000){
              _this.updataForm=res.data.data;
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      updata_sure(){
        if(this.updataForm.user_name==''){
          this.$message({
            type: 'warning',
            message: '请输入用户名!'
          });
          return;
        }
        if(this.updataForm.real_name==''){
          this.$message({
            type: 'warning',
            message: '请输入真实姓名!'
          });
          return;
        }

        if(this.updataForm.password.length<6 || this.updataForm.password.length>16){
          this.$message({
            type: 'warning',
            message: '密码必须是6到16位字符!'
          });
          return;
        }
        if(this.updataForm.password_sure!='' && this.updataForm.password_sure!== this.updataForm.password){
          this.$message({
            type: 'warning',
            message: '两次输入的密码不一致!'
          });
          return;
        }
        if(this.updataForm.role==''){
          this.$message({
            type: 'warning',
            message: '请选择角色!'
          });
          return;
        }
        this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
          this.$router.push({path:'/index/accountmanagement'})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      give_up(){
        this.$router.push({path:'/index/accountmanagement'})
      },
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        if(this.$route.query.type=='edit'){
          this.getdata();
        }else{
          for(var i in this.updataForm){
            this.updataForm[i]=''
          }
        }
        var that=this
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)
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
