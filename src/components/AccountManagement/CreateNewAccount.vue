<template>
  <div class="createNewAdmin">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
    <div style="padding:20px">
      <el-form label-width="100px" :model="form" class="demo-form-inline">
        <el-form-item label="用户名" required>
          <el-input  size="small" v-model="form.user_name" style="width:200px" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="所在区域" required>
          <MjbArea 
            :_province.sync="form.provinceId" 
            :_city.sync="form.cityId" />
        </el-form-item>
        <el-form-item label="所在部门" required>
          <el-select size="small" v-model="form.departmentId" style="width:200px;">
            <el-option v-for="(item,index) in deptList" :key="index" :label="item.departmentName" :value="item.id"></el-option>  
          </el-select>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input  size="small" v-model="form.user_password" @focus="foucus('user_password')" type="password" style="width:200px" placeholder="密码"></el-input>
          <span style="color: #777;font-size: 13px;">&nbsp密码必须是6到16位字符</span>
        </el-form-item>
        <el-form-item label="确认密码" required>
          <el-input  size="small" v-model="form.user_password2" @focus="foucus('user_password2')" type="password" style="width:200px" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item label="角色分配" required>
          <el-select size="small" v-model="form.roleId" style="width:200px;">
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备ip">
          <el-input  size="small" v-model="form.equipmentId" style="width:200px" placeholder="设备ip"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input  size="small" v-model="form.describ" style="width:600px" type="textarea" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left:100px" type="primary" @click="onSubmit">确认</el-button>
          <el-button  @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Subnav2 from '../Subnav2/Subnav2.vue'
  import message from '../../common/message';
  import MjbArea from '../Common/MjbArea/MjbArea';
  export default {
    name:'CreateNewAdmin',
    components:{
      Subnav2,
      MjbArea
    },
    data(){
      return{
        navList:[
          {path:'/account/accountmanagement',name:'首页'},
          {path:'/account/accountmanagement',name:'账户管理'},
          {path:this.$route.fullPath,name:'新增账户'}
        ],
        deptList:[],
        roleList:[],
        form: {
          user_name:'',
          departmentId:'',
          roleId:'',
          equipmentId:'',
          user_password:'',
          user_password2:'',
          describ:'',
          provinceId:'',
          cityId:''
        },
      }
    },
    created(){
      this.getApartData()
      this.getRoleData()
      if(this.$route.query.type=='edit'){
        this.initUser()
      }
    },
    methods:{
      foucus(key){
        this.form[key] = '';
      },
      //初始化数据
      initUser(){
        let info = JSON.parse(this.$route.query.info);
        for(var i in this.form){
          this.form[i] = info[i]
        }
        this.form.user_password2 = this.form.user_password
      },
      //获取部门数据
      getApartData(){
        this.$http('/backstageUser/queryDeptListInfo',{},{},{},'post').then(res => {
          if(res.data.code==0){
            this.deptList = res.data.response;
          }
        })  
      },
      //获取角色列表
      getRoleData(){
        this.$http('/backstageRole/queryRoleListInfo',{},{},{},'post').then(res => {
          if(res.data.code == 0){
            this.roleList = res.data.response.list;
          }
        })
      },
      //提交
      onSubmit(){
        if(this.form.user_name==''){
          message(this,'请输入用户名','warning')
          return;
        }

        if(this.form.provinceId=='' || this.form.cityId==''){
          message(this,'请选择区域','warning')
          return;
        }
        
        if(this.form.departmentId==''){
          message(this,'请选择部门','warning')
          return;
        }

        if(this.form.user_password.length<6 || this.form.user_password.length>16){
          message(this,'密码必须是6到16位字符','warning')
          return;
        }
        if(this.form.user_password2 !== this.form.user_password){
          message(this,'两次输入的密码不一致','warning')
          return;
        }
        if(this.form.roleId==''){
          message(this,'请选择角色','warning')
          return;
        }
        this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let
          body = _.cloneDeep(this.form),
          url;
          
          delete body.user_password2;

          if(this.$route.query.type == 'edit'){
            url = '/backstageUser/updateInfo';
            body.id = JSON.parse(this.$route.query.info).id;
          }else{
            url = '/backstageUser/insertInfo';
          }
          
          this.$http(url,{body},{},{},'post').then(res => {
            if(res.data.code == 0){
              if(this.$route.query.type == 'edit'){
                if(res.data.response.res == 1){
                  message(this,'提交成功','success')
                  this.$router.push({path:'/account/accountmanagement'})
                }else{
                  message(this,'请求失败','warning');
                }
              }else{
                message(this,'提交成功','success')
                this.$router.push({path:'/account/accountmanagement'})
              }
            }else if(res.data.code == 500){
              message(this,'该用户已注册','warning');
            }
          })
        }).catch(() => {
        });
      },
      back(){
        this.$router.push({path:'/account/accountmanagement'})
      },
      refresh(){
      }
    },
    mounted(){
      this.$store.dispatch('defaultIndexAction','/account/accountmanagement');
    }
  }
</script>
<style scoped>
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
