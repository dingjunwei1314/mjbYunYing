<template>
    <div class="login" @keyup.enter="submitForm('ruleForm2')">
        <div class="header">
          买家帮楼盘管理审核系统
        </div>
        <div class="loginBox">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" style="margin-top:90px;margin-right:170px;margin-left:70px">
              <el-form-item label="用户名"  prop="userName">
                <el-input v-model="ruleForm2.userName" ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="userPwd">
                <el-input type="password" v-model="ruleForm2.userPwd" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <el-input type="text" style="width:70%"    v-model="ruleForm2.code" auto-complete="off"></el-input>
                <span class="code" @click="changeCode">
                  <i>{{code}}</i>
                </span>
              </el-form-item>
              <el-form-item label-width="100px">
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">取消</el-button>
              </el-form-item>
            </el-form>
        </div>
        <div class="footer">买家帮楼盘管理审核系统</div>
    </div>
</template>

<script>
import message from '../../common/message';
export default {
    name:'login',
    data() {
      var checkAccout = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }else{

        }
        setTimeout(() => {
              callback();
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        setTimeout(() => {
            if (value.length < 6 || value.length>18) {
              callback(new Error('密码必须是6到16位字母或者数字'));
            } else {
              callback();
            }
        }, 1000); 
      };
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        }
        setTimeout(() => {
            if (value.length!=4) {
              callback(new Error('验证码必须是4位'));
            } else {
              callback();
            }
        }, 1000); 
      };
      return {
        code:'',
        ruleForm2: {
          userPwd: '',
          userName : '',
          code:''
        },
        rules2: {
          userPwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userName : [
            { validator: checkAccout, trigger: 'blur' }
          ],
          code : [
            { validator: validateCode, trigger: 'blur' }
          ],
        }
      };
    },
    created(){
      this.changeCode()
    },
    methods: {
      getData(id){
        let body = {id};
        this.$http('/backstageUser/querySourceListInfo',{body},{},{},'post').then(res => {
          if(res.data.code == 0){
            localStorage._Mjb_navList = '';
            localStorage._Mjb_navList = JSON.stringify(res.data.response.list);
            let path = res.data.response.list[0].subList[0].sourceUrl;
            if(path != null){
              this.$router.push(path);
            }else{
              message(this,'响应异常','warning');
            }
          }
        })
      },
      submitForm(formName) {
        let body=this.ruleForm2;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http('/backstageUser/login',{body},{},{},'post').then(res => {
              if(res.data.code==0){
                localStorage._Mjb_token = res.data.response.token;
                localStorage._Mjb_roleName = this.ruleForm2.userName;
                let id = res.data.response.id;
                this.getData(id);
              }else{
                if(res.data.message == '验证码已过期'){
                  this.changeCode()
                  message(this,'验证码已过期','warning')
                }
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.ruleForm2.userName='';
        this.ruleForm2.userPwd='';
        this.ruleForm2.code='';
      },
      changeCode(){
        this.$http('/backstageUser/verifyCode',{},{},{},'get').then(res => {
          console.log(res)
          if(res.data.code==0){
            this.code=res.data.response.code
          }
        })
      }
    }
  }
</script>

<style scoped>
.login{height: 100%;background: #3283AC url('../../assets/login/admin-login-bg.jpg') no-repeat center;min-height: 500px;min-width: 600px;position: absolute;left: 0;right: 0;bottom: 0;top: 0;}
.header{background: #426374;height: 60px;position: fixed;top: 0;left: 0;right: 0;z-index: 2;line-height: 60px;color: #fefefe;font-size: 24px;padding-left: 1%}
.footer{position: fixed;bottom: 0;left: 0;right: 0;height: 46px;line-height: 46px;text-align: center;background: #426374;color: white;font-size: 12px;}
.loginBox{position: absolute;left: 50%;top: 50%;width: 617px;height: 330px;margin-left: -309px;margin-top: -184px;background: url('../../assets/login/admin-loginform-bg.png') no-repeat}
.code{cursor:pointer;width:50px;height:36px;vertical-align:center;float:right;background: url('../../assets/login/admin-login-bg.jpg');text-align: center;line-height: 36px;color: #313131;font-weight: bold;letter-spacing:2px}
</style>
