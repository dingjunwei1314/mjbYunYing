<template>
  <div class="createAdmin">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <div class="createAdminTop">
      <p>新建角色</p>
      <div style="padding:0px 40px">
        <div class="adminName">
          <span>角色名称：</span><el-input v-model="updataForm.name" style="width:240px"></el-input>
        </div>
        <p>角色权限：</p>
        <div class="adminJurisdiction">
          <div class="houseAdmin">
            <el-checkbox @change="estatemanagement_select_all" v-model="is_estatemanagement_select_all">
              楼盘管理
            </el-checkbox>
          </div>
          <div class="houseAdminText">
            <el-checkbox-group v-model="updataForm.estatemanagement">
              <el-checkbox label="1" class="checkedAdmin">新增楼盘</el-checkbox>
              <el-checkbox label="2" class="checkedAdmin">楼盘管理</el-checkbox>
              <el-checkbox label="3" class="checkedAdmin">楼盘详情查看</el-checkbox>
              <el-checkbox label="4" class="checkedAdmin">楼盘详情查看,编辑</el-checkbox>
              <el-checkbox label="5" class="checkedAdmin">楼盘排行榜管理</el-checkbox>
              <el-checkbox label="6" class="checkedAdmin">楼盘排行榜查看</el-checkbox>
              <el-checkbox label="7" class="checkedAdmin">楼盘排行榜查看,编辑</el-checkbox>
              <el-checkbox label="8" class="checkedAdmin">用户期待楼盘管理</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="adminJurisdiction">
          <div class="houseAdmin">
            <el-checkbox @change="ordermanagement_select_all" v-model="is_ordermanagement_select_all">
              订单管理
            </el-checkbox>
          </div>
          <div class="houseAdminText">
          <el-checkbox-group v-model="updataForm.ordermanagement">
            <el-checkbox label="1" class="checkedAdmin">合作买房</el-checkbox>
          </el-checkbox-group>
          </div>
        </div>
        <div class="adminJurisdiction">
          <div class="houseAdmin">
            <el-checkbox @change="articlemanagement_select_all" v-model="is_articlemanagement_select_all">
              文章管理
            </el-checkbox>
          </div>
          <div class="houseAdminText">
            <el-checkbox-group v-model="updataForm.articlemanagement">
              <el-checkbox label="1" class="checkedAdmin">文章管理</el-checkbox>
              <el-checkbox label="2" class="checkedAdmin">文章查看</el-checkbox>
              <el-checkbox label="3" class="checkedAdmin">文章查看,编辑</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="adminJurisdiction">
          <div class="houseAdmin">
            <el-checkbox @change="activitymanagement_select_all" v-model="is_activitymanagement_select_all">活动管理</el-checkbox>
          </div>
          <div class="houseAdminText">
            <el-checkbox-group v-model="updataForm.activitymanagement">
              <el-checkbox label="1" class="checkedAdmin">活动管理</el-checkbox>
              <el-checkbox label="2" class="checkedAdmin">添加管理</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="adminJurisdiction">
          <div class="houseAdmin">
            <el-checkbox @change="consultmanagement_select_all" v-model="is_consultmanagement_select_all">咨询管理</el-checkbox>
          </div>
          <div class="houseAdminText">
            <el-checkbox-group v-model="updataForm.consultmanagement">
              <el-checkbox label="1" class="checkedAdmin">咨询管理</el-checkbox>
              <el-checkbox label="2" class="checkedAdmin">咨询详情查看</el-checkbox>
              <el-checkbox label="3" class="checkedAdmin">咨询详情查看,编辑</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="adminJurisdiction">
          <div class="houseAdmin">
            <el-checkbox @change="usermanagement_select_all" v-model="is_usermanagement_select_all">用户管理</el-checkbox>
          </div>
          <div class="houseAdminText">
            <el-checkbox-group v-model="updataForm.usermanagement">
              <el-checkbox label="1" class="checkedAdmin">用户管理</el-checkbox>
              <el-checkbox label="2" class="checkedAdmin">用户详情查看</el-checkbox>
              <el-checkbox label="3" class="checkedAdmin">用户详情查看,编辑</el-checkbox>
              <el-checkbox label="4" class="checkedAdmin">买房意向</el-checkbox>
              <el-checkbox label="5" class="checkedAdmin">消息管理</el-checkbox>
              <el-checkbox label="6" class="checkedAdmin">新建消息,删除消息</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="adminJurisdiction">
          <div class="houseAdmin">
            <el-checkbox @change="accountmanagement_select_all" v-model="is_accountmanagement_select_all">账户管理</el-checkbox>
          </div>
          <div class="houseAdminText">
            <el-checkbox-group v-model="updataForm.accountmanagement">
              <el-checkbox label="1" class="checkedAdmin">账户管理</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="houseAdmin">
          <el-checkbox @change="select_all" v-model="is_select_all">全选</el-checkbox>
        </div>
        <div class="houseAdminEare">
            <span>角色备注</span><span>:</span>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="updataForm.con">
            </el-input>
        </div>
        <div class="houseAdminEareBtn">
          <el-button @click="updata" type="primary">提交</el-button>
          <el-button @click="give_up" type="danger">取消</el-button>
        </div>
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
    data(){
      return{
        secondLevel:'角色管理',
        threeLevel:'新建角色',
        is_estatemanagement_select_all:false,
        is_ordermanagement_select_all:false,
        is_articlemanagement_select_all:false,
        is_activitymanagement_select_all:false,
        is_consultmanagement_select_all:false,
        is_usermanagement_select_all:false,
        is_accountmanagement_select_all:false,
        is_select_all:false,
       
        updataForm:{
          name:'',
          estatemanagement:[],
          ordermanagement:[],
          articlemanagement:[],
          activitymanagement:[],
          consultmanagement:[],
          usermanagement:[],
          accountmanagement:[],
          con:''
        }
      }
    },
    watch:{
      'updataForm.estatemanagement':{
        handler(val){
          console.log(val)
          if(val.length==8){
            this.is_estatemanagement_select_all=true
          }else{
            this.is_estatemanagement_select_all=false
          }
          if(this.updataForm.estatemanagement.length==8 && 
            this.updataForm.ordermanagement.length==1 && 
            this.updataForm.articlemanagement.length==3 && 
            this.updataForm.activitymanagement.length==2 && 
            this.updataForm.consultmanagement.length==3 && 
            this.updataForm.usermanagement.length==6 && 
            this.updataForm.accountmanagement.length==1 
          ){
            this.is_select_all=true
          }else{
            this.is_select_all=false
          }
        },
        deep:true
      },
      'updataForm.ordermanagement':{
        handler(val){
          console.log(val)
          if(val.length==1){
            this.is_ordermanagement_select_all=true
          }else{
            this.is_ordermanagement_select_all=false
          }
          if(this.updataForm.estatemanagement.length==8 && 
            this.updataForm.ordermanagement.length==1 && 
            this.updataForm.articlemanagement.length==3 && 
            this.updataForm.activitymanagement.length==2 && 
            this.updataForm.consultmanagement.length==3 && 
            this.updataForm.usermanagement.length==6 && 
            this.updataForm.accountmanagement.length==1 
          ){
            this.is_select_all=true
          }else{
            this.is_select_all=false
          }
        },
        deep:true
      },
      'updataForm.articlemanagement':{
        handler(val){
          console.log(val)
          if(val.length==3){
            this.is_articlemanagement_select_all=true
          }else{
            this.is_articlemanagement_select_all=false
          }
          if(this.updataForm.estatemanagement.length==8 && 
            this.updataForm.ordermanagement.length==1 && 
            this.updataForm.articlemanagement.length==3 && 
            this.updataForm.activitymanagement.length==2 && 
            this.updataForm.consultmanagement.length==3 && 
            this.updataForm.usermanagement.length==6 && 
            this.updataForm.accountmanagement.length==1 
          ){
            this.is_select_all=true
          }else{
            this.is_select_all=false
          }
        },
        deep:true
      },
      'updataForm.activitymanagement':{
        handler(val){
          console.log(val)
          if(val.length==2){
            this.is_activitymanagement_select_all=true
          }else{
            this.is_activitymanagement_select_all=false
          }
          if(this.updataForm.estatemanagement.length==8 && 
            this.updataForm.ordermanagement.length==1 && 
            this.updataForm.articlemanagement.length==3 && 
            this.updataForm.activitymanagement.length==2 && 
            this.updataForm.consultmanagement.length==3 && 
            this.updataForm.usermanagement.length==6 && 
            this.updataForm.accountmanagement.length==1 
          ){
            this.is_select_all=true
          }else{
            this.is_select_all=false
          }
        },
        deep:true
      },
      'updataForm.consultmanagement':{
        handler(val){
          console.log(val)
          if(val.length==3){
            this.is_consultmanagement_select_all=true
          }else{
            this.is_consultmanagement_select_all=false
          }
          if(this.updataForm.estatemanagement.length==8 && 
            this.updataForm.ordermanagement.length==1 && 
            this.updataForm.articlemanagement.length==3 && 
            this.updataForm.activitymanagement.length==2 && 
            this.updataForm.consultmanagement.length==3 && 
            this.updataForm.usermanagement.length==6 && 
            this.updataForm.accountmanagement.length==1 
          ){
            this.is_select_all=true
          }else{
            this.is_select_all=false
          }
        },
        deep:true
      },
      'updataForm.usermanagement':{
        handler(val){
          console.log(val)
          if(val.length==6){
            this.is_usermanagement_select_all=true
          }else{
            this.is_usermanagement_select_all=false
          }
          if(this.updataForm.estatemanagement.length==8 && 
            this.updataForm.ordermanagement.length==1 && 
            this.updataForm.articlemanagement.length==3 && 
            this.updataForm.activitymanagement.length==2 && 
            this.updataForm.consultmanagement.length==3 && 
            this.updataForm.usermanagement.length==6 && 
            this.updataForm.accountmanagement.length==1 
          ){
            this.is_select_all=true
          }else{
            this.is_select_all=false
          }
        },
        deep:true
      },
      'updataForm.accountmanagement':{
        handler(val){
          console.log(val)
          if(val.length==1){
            this.is_accountmanagement_select_all=true
          }else{
            this.is_accountmanagement_select_all=false
          }
          if(this.updataForm.estatemanagement.length==8 && 
            this.updataForm.ordermanagement.length==1 && 
            this.updataForm.articlemanagement.length==3 && 
            this.updataForm.activitymanagement.length==2 && 
            this.updataForm.consultmanagement.length==3 && 
            this.updataForm.usermanagement.length==6 && 
            this.updataForm.accountmanagement.length==1 
          ){
            this.is_select_all=true
          }else{
            this.is_select_all=false
          }
        },
        deep:true
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
        this.$http('/roledetail',{},{id:_this.$route.query.id}).then(function(res){
          console.log(res)
          if(res.data.code==1000){
              _this.updataForm=res.data.data;
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      estatemanagement_select_all(e){
        if(e.target.checked){
          this.updataForm.estatemanagement=['1','2','3','4','5','6','7','8']
        }else{
          this.updataForm.estatemanagement=[]
        }
      },
      ordermanagement_select_all(e){
        if(e.target.checked){
          this.updataForm.ordermanagement=['1']
        }else{
          this.updataForm.ordermanagement=[]
        }
      },   
      articlemanagement_select_all(e){
        if(e.target.checked){
          this.updataForm.articlemanagement=['1','2','3']
        }else{
          this.updataForm.articlemanagement=[]
        }
      },
      activitymanagement_select_all(e){
        if(e.target.checked){
          this.updataForm.activitymanagement=['1','2']
        }else{
          this.updataForm.activitymanagement=[]
        }
      },
      consultmanagement_select_all(e){
        if(e.target.checked){
          this.updataForm.consultmanagement=['1','2','3']
        }else{
          this.updataForm.consultmanagement=[]
        }    
      },   
      usermanagement_select_all(e){
        if(e.target.checked){
          this.updataForm.usermanagement=['1','2','3','4','5','6']
        }else{
          this.updataForm.usermanagement=[]
        }    
      },   
      accountmanagement_select_all(e){
        if(e.target.checked){
          this.updataForm.accountmanagement=['1']
        }else{
          this.updataForm.accountmanagement=[]
        }    
      },
      select_all(e){
        if(e.target.checked){
          this.updataForm.estatemanagement=['1','2','3','4','5','6','7','8']
          this.updataForm.ordermanagement=['1']
          this.updataForm.articlemanagement=['1','2','3']
          this.updataForm.activitymanagement=['1','2']
          this.updataForm.consultmanagement=['1','2','3']
          this.updataForm.usermanagement=['1','2','3','4','5','6']
          this.updataForm.accountmanagement=['1']
        }else{
          for(let i in this.updataForm){
            if(typeof this.updataForm[i]=='object' && this.updataForm[i].constructor==Array){
              this.updataForm[i]=[]
            }
          }
        }  
      },
      updata(){
        if(this.updataForm.name==''){
          this.$message({
            type: 'warning',
            message: '请输入名称!'
          });
          return;
        }
        this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({path:'/index/rolemanagement'})
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      },
      give_up(){
        this.$router.push({path:'/index/rolemanagement'})
      },
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        // this.getdata()
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
