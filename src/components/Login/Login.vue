<template>
    <div class="login">
        <div class="header">
          买家帮运营管理系统
        </div>
        <div class="loginBox">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" style="margin-top:90px;margin-right:170px;margin-left:70px">
              <el-form-item label="账号" prop="account">
                <el-input v-model="ruleForm2.account"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label-width="100px">
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">取消</el-button>
              </el-form-item>
            </el-form>
        </div>
        <div class="footer">买家帮运营管理平台</div>
    </div>
</template>

<script>
export default {
    name:'login',
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
         
            if (value.length < 6 || value.length>18) {
              callback(new Error('账号必须是6到16位字母或者数字'));
            } else {
              callback();
            }
          
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
      
      return {
        ruleForm2: {
          pass: '',
          account : ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          account : [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm2.account=='admin1'&&this.ruleForm2.pass=='123456'){
                this.$router.push('/index/estatemanagement')
            }else{
                this.$message({
                  message: '账号或者密码错误',
                  type: 'warning'
                });
            }    
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.ruleForm2.account='';
        this.ruleForm2.pass='';
      }
    }
  }
</script>

<style scoped>
.login{height: 100%;background: #3283AC url('../../assets/login/admin-login-bg.jpg') no-repeat center;min-height: 500px;min-width: 600px;position: absolute;left: 0;right: 0;bottom: 0;top: 0;}
.header{background: #426374;height: 60px;position: fixed;top: 0;left: 0;right: 0;z-index: 2;line-height: 60px;color: #fefefe;font-size: 24px;padding-left: 1%}
.footer{position: fixed;bottom: 0;left: 0;right: 0;height: 46px;line-height: 46px;text-align: center;background: #426374;color: white;font-size: 12px;}
.loginBox{position: absolute;left: 50%;top: 50%;width: 617px;height: 330px;margin-left: -309px;margin-top: -184px;background: url('../../assets/login/admin-loginform-bg.png') no-repeat}
</style>
