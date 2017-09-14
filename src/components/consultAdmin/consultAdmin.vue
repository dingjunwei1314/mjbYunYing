<template>
  <div class="consultAdmin">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <div style="padding:20px" class="postsTop_wap">
      <div class="postsSeek">
        <div style="width: 80%;">
          <div style="
            display:-webkit-box;
            display:-webkit-flex;
            display:-ms-flexbox;
            display: flex;
          justify-content: space-around">
            <div>
              <span>查询ID</span>
              <el-input v-model="input" placeholder="请输入内容" style="width:150px;"></el-input>
            </div>
            <div>
              <span>用户名</span>
              <el-input v-model="input" placeholder="请输入内容" style="width:150px;"></el-input>
            </div>
            <div>
              <span>手机号</span>
              <el-input v-model="input" placeholder="请输入内容" style="width:150px;"></el-input>
            </div>
            <div>
              <span>楼盘</span>
              <el-input v-model="input" placeholder="请输入内容" style="width:150px;"></el-input>
            </div>
            <div>
              <span>状态</span>
              <el-select v-model="textValue" placeholder="请选择" style="width:100px;">
                <el-option
                  v-for="(item,key) in textOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="bao" style="
            display:-webkit-box;
            display:-webkit-flex;
            display:-ms-flexbox;
            display: flex;
          justify-content: space-around">
            <div>
              <span class="demonstration">发布时间</span>
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
              <span class="demonstration">至</span>
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
            <div>
              <span style="line-height:36px;float:left;">区域：</span>
              <AreaAll :area="filterForm"></AreaAll>
            </div>
          </div>
        </div>
        <div class="inquireBtn">
          <el-button type="primary">查询</el-button>
        </div>
      </div>
    </div>
    <div class="consultAdminTible">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="咨询ID"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="所在省市区"
         >
        </el-table-column>
        <el-table-column
          prop="address"
          label="楼盘">
        </el-table-column>
        <el-table-column
          prop="address"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="address"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="address"
          label="预约时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="问题">
        </el-table-column>
        <el-table-column
          label="状态"
          color="red"
        >
          <template scope="scope">
            <span style="color:red">{{name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="回复时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="回复概要">
        </el-table-column>
        <el-table-column width="180px" label="操作">
          <template scope="scope">
            <router-link to="/index/counsultParticulars">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">查看详情</el-button>
            </router-link>
            <router-link to="/index/counsultParticulars">
              <el-button
                size="small"
                type="info"
                @click="handleDelete(scope.$index, scope.row)">详情编辑</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import Subnav from '../Subnav/Subnav.vue'
  import AreaAll from '../Common/AreaAll/AreaAll'

  export default {
    name:'ConsultAdmin',
    components:{
      Subnav,
      AreaAll
    },
    data(){
      return{
        input:'',
        secondLevel:'咨询管理',
        threeLevel:'咨询管理',
        name:'已完成',
        textValue:'',
        pickerOptions1:'',
        value2:'',
        filterForm: {
          name:'',
          developers:'',
          time:'',
          rental_return:'',
          sheng:'',
          shi:'',
          qu:'',
          cooper_buy:'',
          strict_select:'',
          state:'',
          id:''
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
        }],
        textOptions: [{
          value: '选项1',
          label: '是'
        }, {
          value: '选项2',
          label: '否'
        }],
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
      handleDelete(){

      }
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
  .consultAdminTible{
    border: 1px solid darkgray;margin:20px;
  }
  .consultAdmin .postsTop_wap{
    border: 1px solid darkgray;margin:20px;
  }
  .consultAdmin .postsSeek .postsOption{
    width:12%;
  }
  .consultAdmin .postsSeek .postsInputSeek{
    width:20%;
  }
  .consultAdmin .postsSeek .bao{
    width:100%;
    display:inline-block;
    *display:inline;
    *zoom:1;
    margin-top: 15px;
  }
  .consultAdmin .postsSeek{
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display: flex;
    justify-content: space-between;
  }
  .inquireBtn button{
    width:150px;
    height:50px;

  }
  .inquireBtn{
    line-height: 50px;
    padding-top: 24px;
    padding-bottom: 24px;
  }
</style>
