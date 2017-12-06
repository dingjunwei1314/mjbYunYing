<template>
  <div class="RankingListAdd">

    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

    <div class="itemA">
      <el-form  ref="form"  label-width="150px" style="width:80%">
        <el-form-item label="排行榜名称：" style="width:50%">
          <p v-if = "detailData.rankName" style="color:#777">{{detailData.rankName}}</p>
          <p v-else style="color:#777">--</p>
        </el-form-item>
        <el-form-item label="区域：">
          <span v-if = "detailData.province" style="color:#777">{{detailData.province}}</span>
          <span v-else style="color:#777">--</span>
          <span v-if = "detailData.province && detailData.city" style="color:#777">-</span>
          <span v-if = "detailData.city" style="color:#777">{{detailData.city}}</span>
          <span v-else style="color:#777">--</span>
        </el-form-item>
      </el-form>
    </div>

    <div class="itemB">
      <h5 style="text-align:center;width:80%" v-if = "detailData.buildingInfoList.length <= 0 ">还未添加楼盘</h5>
      <el-form  class="formList"  label-width="150px" v-for="(item,index) in detailData.buildingInfoList" :key="index">
        <h5>楼盘{{index+1}}</h5>
        <el-form-item label="楼盘名称：" style="color:#777">
          <p style="color:#777" v-if ="item.buildingId">{{item.buildingId}}</p>
          <p style="color:#777" v-else>--</p>
        </el-form-item>
        <el-form-item label="排位次序：" style="color:#777">
          <p style="color:#777" v-if ="item.weight">{{item.weight}}</p>
          <p style="color:#777" v-else>--</p>
        </el-form-item>
        <el-form-item label="上榜理由：" style="color:#777">
          <p style="color:#777" v-if ="item.reason">{{item.reason}}</p>
          <p style="color:#777" v-else>--</p>
        </el-form-item>
        <el-form-item label="楼盘详情分析：">
          <div v-if ="item.detailedAnalysis" v-html="item.detailedAnalysis">
          </div>
          <p v-else style="color:#777">--</p>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
import message from '../../common/message'
import AreaAll from '../Common/AreaAll/AreaAll'
import Subnav from '../Subnav/Subnav'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor);
export default {
    name:'RankingListAdd',
    components:{
      Subnav,
      AreaAll
    },
    data() {
      return {
        count:0,
        secondLevel:'楼盘',
        threeLevel:'排行榜详情',
        buidingList:[

        ],
        provinceIdsList:[
                   
        ],
        cityIdsList:[
           
        ],
        detailData:{
          buildingInfoList:[]
        }
      };
    },
    filters:{
    },
    computed:{
     
    },
    watch:{
      'count':function(val){
        if(val == 3){
          this.getdata()
        }
      }
    },
    created(){
      this.remoteMethod('')
      this.getProData()
      this.getCityData('')
    },
    methods: {
      getdata(){
        let _this = this,
        body = {rankId:_this.$route.query.rankId}
  
        this.$http('/backstageRank/selectRankInfo',{body},{},{},'post').then(function(res){

          if(res.data.code == 0){
            _this.detailData = res.data.response;

            _this.buidingList.forEach( item1 => {
              _this.detailData.buildingInfoList.forEach( item2 => {
                if(item2.buildingId == item1.key){
                  item2.buildingId = item1.value
                }
              })
            })

            _this.provinceIdsList.forEach( item => {
              if(item.cityId == _this.detailData.province){
                _this.detailData.province = item.cityName
              }
            })

            _this.cityIdsList.forEach( item => {
              if(item.cityId == _this.detailData.city){
                _this.detailData.city = item.cityName
              }
            })
          }
  
        }).catch(function(err){
          console.log(err)
        })
      },
      //获取省数据
      getProData(){
        let _this = this,
        body = {cityType:1};
        _this.$http('/citis/cityLists',{body},{},{},'post').then(function(res){
          if(res.data.code==0){
            _this.provinceIdsList = res.data.response.cityList  
            _this.count++ 
          }else if(res.data.code == 300){
            _this.$router.push('/login')
          }else{
            message(_this,res.data.message,'warning')
          }
        }).catch(function(err){
          console.log(err)
        })  
      },
      //获取市数据
      getCityData(province = 9999){
        let _this = this,
        body = {cityType:2,parentid:province};
        _this.$http('/citis/cityLists',{body},{},{},'post').then(function(res){
          if(res.data.code == 0){
            _this.cityIdsList = res.data.response.cityList 
            _this.count++
          }else if(res.data.code == 300){
            _this.$router.push('/login')
          }else{
            message(_this,res.data.message,'warning')
          }
        }).catch(function(err){
          console.log(err)
        })   
      },
      //模糊搜索
      remoteMethod(val){
        let _this = this,
        body = {buildingName: val};
       
        this.$http('/backstageBuilding/getBuildingNameList', {body}, {}, {}, 'post').then(function (res) {
          if (res.data.code == 0) {
              _this.buidingList = res.data.response;
              _this.count ++;
          } else if (res.data.code == 300) {
              _this.$router.push('/login')
          } else {
              message(_this,res.data.message,'warning')
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        var that=this
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)        
      },
    },
    mounted(){
      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/index/rankinglist');
      var that=this
      setTimeout(function(){
        that.$store.dispatch('mainLoadingAction',false);
      },300) 
    }
  }
</script>

<style scoped>
  .RankingListAdd .itemA,.RankingListAdd .itemB{padding: 20px 20px 20px 60px;border-bottom: 1px solid #eee}
  .RankingListAdd .itemB .formList{margin-bottom: 10px;border-bottom: 1px dashed #eee;padding-bottom: 10px}
  .RankingListAdd .itemB .formList:nth-child(1){margin-bottom: 0;border-bottom: none}
</style>

<style>
  .RankingListAdd .itemB .el-form-item{margin-bottom: 0px}
  .RankingListAdd .itemB .el-form-item__label{color: #777}
</style>
