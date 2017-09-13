<template>
  <div class="consultParticulars">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <div class="consultParticularsTop">
      <h4>买家帮</h4>
      <p v-for="(items,key) in consultParticularsArr">
        <span style="width: 90px;text-align: right">{{items.name}}</span>:<span>{{items.value}}</span>
      </p>
    </div>
    <div class="consultParticularsText">
      <div class="state">
        <span>状态</span>:
          <span>
            <el-select v-model="stateValue" placeholder="请选择" style="width:150px;">
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
                v-model="value1"
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
           type="textarea"
           :rows="2"
           placeholder="请输入内容"
           v-model="textarea">
         </el-input>
      </span>
      </div>
      <div class="consultParticularsFoot">
        <el-button type="primary">保存</el-button>
        <el-button type="danger">取消</el-button>
      </div>
    </div>
    <div class="message">
      <h4>信息备注</h4>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="备注信息">
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
        textarea:'',
        stateValue:'选项1',
        value1:[new Date()],
        consultParticularsArr:[
          {name:'咨询编号',value:'097774'},
          {name:'省市区',value:'河南-郑州-莞城'},
          {name:'楼盘',value:'禁地博悦'},
          {name:'用户名',value:'回忆'},
          {name:'手机号',value:'18910966666'},
          {name:'预约时间',value:'2017-08-18'},
          {name:'问题',value:'合作买房'}
        ],
        consultParticularsTextOptions: [{
          value: '选项1',
          label: '待回复'
        }, {
          value: '选项2',
          label: '待跟进'
        }, {
          value: '选项3',
          label: '转给销售'
        }, {
          value: '选项4',
          label: '完成'
        }],
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
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
    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/counsultParticulars');
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
