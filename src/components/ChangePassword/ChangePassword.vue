<template>
  <div class="changePassword">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
    <div class="changePasswordTop">
      <div>
        <span>原密码 ：</span>
        <el-input type="password" size="small" v-model="updata.oldPwd"></el-input>
      </div>
      <div>
        <span>新密码 ：</span>
        <el-input type="password" size="small" v-model="updata.newPwd"></el-input>
      </div>
      <div>
        <span>确认密码 ：</span>
        <el-input type="password" size="small" v-model="updata.newPwd2"></el-input>
      </div>
    </div>
    <div class="consultParticularsFoot">
      <el-button type="primary" @click="updata_btn">保存</el-button>
    </div>
  </div>
</template>
<script>
  import Subnav2 from '../Subnav2/Subnav2.vue'
  import message from '../../common/message';
  export default {
    name:'changePassword',
    components:{
      Subnav2,
    },
    data(){
      return{
        navList:[
          {path:this.$route.fullPath,name:'首页'},
          {path:this.$route.fullPath,name:'修改密码'},
        ],
        updata:{
          oldPwd:'',
          newPwd:'',
          newPwd2:''
        }
      }
    },
    methods: {
      updata_btn(){
        if(this.updata.oldPwd.length<6 || this.updata.oldPwd.length>16){
          message(this,'旧密码必须是6-16位字符!','warning')
          return;
        }
        if(this.updata.newPwd.length<6 || this.updata.newPwd.length>16){
          message(this,'新密码必须是6-16位字符!','warning')
          return;
        }
        if(this.updata.newPwd2.length<6 || this.updata.newPwd2.length>16){
          message(this,'确认密码必须是6-16位字符!','warning')
          return;
        }
        if(this.updata.newPwd2!==this.updata.newPwd){
          message(this,'两次输入的密码不一致!','warning')
          return;
        }

        if(this.updata.oldPwd === this.updata.newPwd){
          message(this,'新密码不能与原密码一致','warning')
          return;
        }

        this.$confirm('确认修改吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let body = _.cloneDeep(this.updata);
              delete body.newPwd2;
              this.$http('/backstageUser/resetPwd',{body},{},{},'post').then(res => {
                if(res.data.code == 0){
                  if(res.data.response.res == 1){
                    message(this,'修改成功，请重新登陆','success');
                    setTimeout(() => {
                      this.$router.push('/login');
                    },800)
                  }else{
                    message(this,'修改失败','warning');
                  }
                }
              })
            }).catch((err) => {
              console.log(err)
            });
      },
      refresh(){
        for(let i in this.updata){
          this.updata[i] = '';
        }
      },

    },
    mounted(){
      this.$store.dispatch('defaultIndexAction','/account/changePassword');
    }
  }
</script>
<style>
  .changePasswordTop{
    border: 1px solid #ccc;margin:20px;
  }
   p{
    padding: 15px;
  }
  .changePasswordTop div{
    display: flex;
    width: 50%;
    margin: 10px auto;
  }
  .changePasswordTop input{
    width:200px;
  }
  .changePasswordTop span{
    width:150px;
    line-height: 56px;
    text-align: right;
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
</style>
