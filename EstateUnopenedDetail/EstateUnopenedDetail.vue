<template>
  <div class="acqmana">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>

    <el-row style="padding:20px">
      <h6 style="margin-left:20px;margin:10px 0px 10px 20px;font-size: 12px;">当前楼盘名称：{{data.buildingName}}</h6>
      <p class="tit-lab">
        基础信息
      </p>
      <el-form style="padding-left:40px" label-width="150px">
      
        
        <el-form-item prop="user" label="所在地区：">
          {{data.locatArea}}
        </el-form-item>
        <el-form-item prop="user" label="详细地址：">
          {{data.buildingAddr}}
        </el-form-item>
        <el-form-item prop="user" label="楼幢数量：">
          {{data.buildingCount}}幢
        </el-form-item>
        <el-form-item prop="user" label="物业类型：">
          {{data.propertyType}}
        </el-form-item>
        
        <el-form-item prop="user" label="APP上是否上线：">
          <span v-if="data.buildingStatus === 1">是</span>
          <span v-if="data.buildingStatus === 0">否</span>
        </el-form-item>
      </el-form>
      <el-row>
        <p class="tit-lab" v-if = "$route.query.type == 'edit'">
          编辑操作
        </p>
        <el-form style="padding-left:40px;" :model="form" label-width="150px">
          <el-form-item prop="user" label="指派审核人：" v-if = "$route.query.type == 'edit'">
            <el-checkbox-group type="small" v-model="form.auditorId">
              <el-checkbox :label="item.key" v-for="(item,index) in perData" :key="index">{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item style="margin-left: 150px;margin-top: 40px">
            <el-button  type="primary" v-if = "$route.query.type == 'edit'"  @click="submit('ruleInline')">确定</el-button>
            <el-button   @click="back">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      
    </el-row>
  </div>
</template>
<script>
import Subnav2 from '../Subnav2/Subnav2'
import message from '../../common/message'
export default {
  name: 'acqmana',
  components:{
    Subnav2
  },
  data () {
    return {
      navList:[
        {path:'/task/estateunopenedmanagement',name:'首页'},
        {path:'/task/estateunopenedmanagement',name:'非开发楼盘审核'},
        {path:this.$route.fullPath,name:'详情'}
      ],
      form:{
        buildingId:'',
        auditorId:[]
      },
      perData:[],
      data:{
    
      },
    }
  },
  created(){
    this.$store.dispatch('defaultIndexAction','/task/estateunopenedmanagement');
    this.getPerData();
    this.initData();
  },
  methods: {
    //初始化
    initData(){
      let info = JSON.parse(this.$route.query.info);
      this.data = info;
      if(info.auditorId){
        this.form.auditorId = info.auditorId.split(',');
      }
      this.form.buildingId = info.buildingId;
     
    },
    //获取指派人员
    getPerData(){
      let _this = this;
     
      this.$http('/taskManage/getNoOpenUserList',{},{},{},'post').then(function(res){
        if(res.data.code == 0){
          _this.perData = res.data.response.assignorList;
        }
      })
    },
    refresh(){

    },
    //提交
    submit(){
      let _this = this,
      body = _.cloneDeep(this.form);
      body.auditorId = body.auditorId.join(',');
      this.$http('/taskManage/editNoOpenAuditing',{body},{},{},'post').then((res) => {
        if(res.data.code == '0'){
          if(res.data.response.status == 1){
            message(_this,'提交成功','success');
            _this.$router.push('/task/estateunopenedmanagement')
          }else{
            message(_this,'提交失败','warning');
          }
        }
      })
    },
    //返回
    back(){
      this.$router.push('/task/estateunopenedmanagement')
    }
  },
}
</script>

<style scoped>
  .tit-lab{
    height: 30px;
    line-height: 30px;
    background: #eee;
    padding-left: 22px;
    margin: 20px 0px;
    font-size: 13px;
  }
  .ivu-form-item{
    margin-bottom: 0px
  }
  .el-form-item{margin-bottom: 5px}
</style>
