<template>
  <div class="consultParticulars">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <div class="consultParticularsTop">
      <h4>咨询-
        <span v-if="data.username==''">--</span>
        <span v-else>{{data.username}}</span>
      </h4>
      <p>
        <span style="width: 90px;text-align: right">咨询编号</span>:
        <span v-if="data.id==''">--</span>
        <span>{{data.id}}</span>
      </p>
      <p>
        <span style="width: 90px;text-align: right">省市区</span>:
        <span v-if="data.address==''">--</span>
        <span v-else>{{data.address}}</span>
      </p>
      <p>
        <span style="width: 90px;text-align: right">楼盘</span>:
        <span v-if="data.house==''">--</span>
        <span v-else>{{data.house}}</span>
      </p>
      <p>
        <span style="width: 90px;text-align: right">用户名</span>:
        <span v-if="data.username==''">--</span>
        <span v-else>{{data.username}}</span>
      </p>
      <p>
        <span style="width: 90px;text-align: right">手机号</span>:
        <span v-if="data.phone==''">--</span>
        <span v-else>{{data.phone}}</span>
      </p>
      <p>
        <span style="width: 90px;text-align: right">预约时间</span>:
        <span v-if="data.appointment_time==''">--</span>
        <span v-else>{{data.appointment_time}}</span>
      </p>
      <p>
        <span style="width: 90px;text-align: right">问题</span>:
        <span v-if="data.problem==''">--</span>
        <span v-else>{{data.problem}}</span>
      </p>
    </div>
    <div class="consultParticularsText">
      <div class="state">
        <span>状态</span>:
        <span>
          <el-select v-model="updataForm.state" :disabled="isdisabled" placeholder="状态" style="width:150px;">
            <el-option
              v-for="item in consultParticularsTextOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value" >
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="state">
        <span>回复时间</span>:
        <span>
          <div class="block">
            <el-date-picker
              :disabled="isdisabled"
              v-model="updataForm.recovery_time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </span>
      </div>
      <div class="state">
        <span>备注</span>:
        <span style="width:500px">
         <el-input
           :disabled="isdisabled"
           type="textarea"
           :rows="2"
           placeholder="备注"
           v-model="updataForm.recovery_con">
         </el-input>
      </span>
      </div>
      <div class="consultParticularsFoot" v-if="!isdisabled">
        <el-button @click="updata(true)" type="primary">保存</el-button>
        <el-button @click="updata(false)" type="danger">取消</el-button>
      </div>
    </div>
    <div class="message">
      <h4>信息备注</h4>
      <el-table
        v-loading="is_load_table"
        :data="data.list"
        style="width: 100%;font-size:12px">
        <el-table-column
          prop="time"
          label="回复时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="con"
          label="回复内容">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import Subnav from '../Subnav/Subnav.vue'

  export default {
    name:'ConsultParticulars',
    components:{
      Subnav,
    },
    data(){
      return{
        secondLevel:'咨询管理',
        threeLevel:'咨询详情',
        isdisabled:false,
        data:{
          id: '',
          address: '',
          house: '',
          username: '',
          phone: '',
          appointment_time: '',
          problem: '',
          state: '',
          recovery_time: '',
          recovery_con: '',
          list:[]
        },
        is_load_table:false,
        updataForm:{
          state:'',
          recovery_time:new Date(),
          recovery_con:'',
        },
        consultParticularsTextOptions: [{
          value: '1',
          label: '待回复'
        }, {
          value: '2',
          label: '待跟进'
        }, {
          value: '3',
          label: '转给销售'
        }, {
          value: '4',
          label: '完成'
        }],
      }
    },
    created(){
      this.getdata()
      if(this.$route.query.type=='see'){
        this.isdisabled=true;
      }else{
        this.isdisabled=false;
      }
    },
    methods:{
      getdata(){
        let _this=this;
        _this.is_load_table=true;
        this.$http('/consultationdetail',{}).then(function(res){
          console.log(res)
          if(res.data.code==1000){
              _this.data=res.data.data;
              if(_this.$route.query.type=='see'){
                _this.updataForm.state=_this.data.state;
                _this.updataForm.recovery_time=_this.data.recovery_time;
                _this.updataForm.recovery_con=_this.data.recovery_con;
              }
              _this.is_load_table=false;
          }
        }).catch(function(err){
          console.log(err)
          _this.is_load_table=false;
        })
      },
      updata(swi){
        let _this=this;
        if(swi){
          if(this.updataForm.state==''){
            this.$message({
              message: '请选择状态',
              type: 'warning'
            });
            return;
          }
          this.$confirm('确认提交吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              console.log(_this.updataForm)
              _this.$router.push({path:'/index/consultAdmin'})
              _this.$message({
                  type: 'success',
                  message: '提交成功!'
              });
          }).catch(() => {
              _this.$message({
                  type: 'info',
                  message: '已取消'
              });
          });
        }else{
          this.$router.push({path:'/index/consultAdmin'})
        }
      },
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        this.getdata()
        var that=this
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)
      },
    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/consultAdmin');
      var that=this;
      setTimeout(function(){
        that.$store.dispatch('mainLoadingAction',false);
      },300)
    }
  }
</script>

<style>
  .consultParticularsTop{
    border: 1px solid darkgray;margin:20px;
  }
  .consultParticulars h4{
    padding: 10px 0 15px 10px;
  }
  .consultParticularsTop p{
    padding: 5px 0 5px 10px;
    text-align: left;
  }
  .consultParticularsTop p span{
    width: 150px;
    text-align: left;
    display:inline-block;
    *display:inline;
    *zoom:1;
    margin: 0 20px 0 20px;
  }
  .consultParticularsText{
    border: 1px solid darkgray;margin:20px;
  }
  .consultParticularsText .state{
    padding: 5px 0 5px 10px;
  }
  .consultParticularsText .state span{
    display:inline-block;
    *display:inline;
    *zoom:1;
    margin: 0 20px 0 20px;
    width: 90px;
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
  .consultParticulars .message{
    border: 1px solid darkgray;margin:20px;
  }
</style>
