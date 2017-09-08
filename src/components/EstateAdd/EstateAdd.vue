<template>
  <div class="activitymanagment">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <div style="padding:20px">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="楼盘基本信息" name="first">
          
          <div class="first_item_1">
            <p class="tit">
              楼盘基本属性
            </p>
            
            <el-form :model="add_new_estate_form" :rules="add_new_estate_form_rule" ref="add_new_estate_form_ref" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <AreaAll :area="area"></AreaAll>  
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="add_new_estate_form.checkPass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model.number="add_new_estate_form.age"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('add_new_estate_form')">提交</el-button>
                <el-button @click="resetForm('add_new_estate_form')">重置</el-button>
              </el-form-item>
            </el-form>


          </div>

        </el-tab-pane>
        <el-tab-pane label="附加信息" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="楼盘相册" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="楼盘报告" name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="楼盘评分" name="five">定时任务补偿</el-tab-pane>
        <el-tab-pane label="楼盘设置" name="six">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  
    
  </div>
</template>

<script>
import AreaAll from '../Common/AreaAll/AreaAll'
import Subnav from '../Subnav/Subnav'
import BigDialog from '../BigDialog/BigDialog'
import exportExcel from '../../common/exportExcel'
export default {
    name:'activitymanagment',
    components:{
      Subnav,
      BigDialog,
      AreaAll
    },
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.add_new_estate_form.checkPass !== '') {
            this.$refs.add_new_estate_form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.add_new_estate_form.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
  

      return {
        area:{
          sheng:'',
          shi:'',
          qu:''
        },
        activeName:"first",
        secondLevel:'楼盘管理',
        threeLevel:'添加楼盘',
        tableData:[],
        add_new_estate_form:{
          sheng:'',
          shi:'',
          qu:''
        },
        add_new_estate_form_rule: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      
      };
    },
    filters:{
     
    },
    computed:{
                                        
    },
    created(){
      this.getdata()
    },
    methods: {
      getdata(){
        let _this=this;
        _this.is_loading_tab=true;
        this.$http('/activitymanagement').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.tableData=res.data.data;
          }
          _this.is_loading_tab=false;
        }).catch(function(err){
          console.log(err)
        })
      },
      handleClick(){

      },
        
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        this.getdata()
        this.currentPage=1;
        
        var that=this
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)        
      },    
    },
    mounted(){
      
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/estatemanagement');
      var that=this
      setTimeout(function(){
        that.$store.dispatch('mainLoadingAction',false);
      },300) 
    }
  }
</script>

<style scoped>
.el-dialog{margin-bottom: 0px;margin-top: -100px!important}
.slide-enter-active, .slide-leave-active {
  transition: height 1s
}
.slide-enter,.slide-leave-to{
  height: 0
}
.slide-leave,.slide-enter-to{
  height: 100px
}
.first_item_1{border: 1px solid #eee;margin:20px;}
.first_item_1 .tit{height: 30px;background: rgba(32,160,255,.8);color: white;line-height: 30px;font-size: 12px;padding: 0px 20px; }

</style>

<style>
  .activitymanagment .top_wap .el-input{width:160px;}
  .activitymanagment .top_wap .el-input__inner{height: 25px;}
  .activitymanagment .top_wap .el-table th>.cell{text-align: center;}
  .activitymanagment .top_wap .el-table .cell{text-align: center;}
</style>
