<template>
  <div class="RankingListEdit">

    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>

    <div class="itemA">
      <el-form  ref="form" :model="addAllData.addForm" label-width="150px" style="width:80%">
        <el-form-item label="排行榜名称：" style="width:50%">
          <el-input size="small"  v-model="addAllData.addForm.rankName" placeholder="排行榜名称"></el-input>
        </el-form-item>
        <el-form-item label="区域：">
          <el-select 
            disabled
            size="small"
            v-model="addAllData.addForm.province" 
            clearable  
            @change = "provinceChange(addAllData.addForm.province)"
            placeholder="省">
            <el-option 
              v-for="item in provinceIdsList"
              :key="item.cityId"
              :label="item.cityName"
              :value="item.cityId">
            </el-option>
          </el-select>
          <el-select disabled size="small" v-model="addAllData.addForm.city" clearable  placeholder="市">
            <el-option
              v-for="item in cityIdsList"
              :key="item.cityId"
              :label="item.cityName"
              :value="item.cityId">
            </el-option>
          </el-select>
        </el-form-item>
        <div style="text-align:center">
          <el-button type="primary" @click="onSubmitOne">保存</el-button> 
        </div>
      </el-form>
    </div>

    <div class="itemB">
      <h5 style="text-align:center;width:80%" v-if = "addAllData.rankData.buildingInfoList.length <= 0 ">还未添加楼盘</h5>
      <el-form  class="formList"  label-width="150px" v-for="(item,index) in addAllData.rankData.buildingInfoList" :key="index">
        <h5>楼盘{{index+1}}</h5>
        <el-button type="text" @click="editRankBuild(item)">编辑</el-button>
        <el-form-item label="楼盘名称：" style="color:#777">
          <p style="color:#777">{{item.buildingId}}</p>
        </el-form-item>
        <el-form-item label="排位次序：" style="color:#777">
          <p style="color:#777">{{item.weight}}</p>
        </el-form-item>
        <el-form-item label="上榜理由：" style="color:#777">
          <p style="color:#777">{{item.reason}}</p>
        </el-form-item>
        <el-form-item label="楼盘详情分析：">
          <div v-html="item.detailedAnalysis">
          </div>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="itemA">
      <el-form  ref="buildForm" :model="addAllData.buildForm" :rules="addAllData.buildFormRules"  label-width="150px" style="width:80%">
        <el-form-item label="添加楼盘：" style="width:400px" :required="true" prop="buildingId">
          <el-select
            size="small"
            v-model="addAllData.buildForm.buildingId"
            filterable
            remote
            reserve-keyword
            style="width:250px"
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="searchLoading">
            <el-option
              v-for="(item,index) in buidingList"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排位次序：" style="width:50%" required prop="weight">
          <el-input size="small"  v-model="addAllData.buildForm.weight" type="number" placeholder="排位次序"></el-input>
        </el-form-item>
        <el-form-item label="上榜理由：" required prop="reason" >
          <el-input size="small"  v-model="addAllData.buildForm.reason" type="textarea" placeholder="上榜理由"></el-input>
        </el-form-item>
        <el-form-item label="楼盘详情分析：" required prop="detailedAnalysis">
          <quill-editor
            v-model="addAllData.buildForm.detailedAnalysis">
            </quill-editor>
          </el-form-item>
        <div style="text-align:center">
          <el-button type="primary" @click="onSubmitTwo('buildForm')">保存</el-button> 
        </div>
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
    name:'RankingListEdit',
    components:{
      Subnav,
      AreaAll
    },
    data() {
      return {
        num:0,
        secondLevel:'楼盘',
        threeLevel:'新建排行榜',
        buidingList:[

        ],
        buidingList1:[

        ],
        searchLoading:false,
        provinceIdsList:[
                   
        ],
        cityIdsList:[
           
        ],
        addAllData:{
          type:'buildAdd',
          rankId:'',
          addForm:{
            rankName:'',
            province:'',
            city:'',
            rankId:'',
          },
          rankData:{
            buildingInfoList:[]
          },
          buildForm:{
            buildingId:'',
            weight:'',
            reason:'',
            detailedAnalysis:'',
            rankId:'',
          },
          buildFormRules: {
              buildingId: [
                  { required: true, message: '请选择楼盘' },
              ],
              weight: [
                  { required: true, message: '请填写次序' }
              ],
              reason: [
                  { required: true, message: '请填写上榜理由' }
              ],
              detailedAnalysis: [
                  { required: true, message: '请填写楼盘详情' }
              ]
              
          }
        }
      };
    },
    filters:{
    },
    computed:{
     
    },
    watch:{
      
    },
    created(){
      this.addAllData.addForm.rankId = this.$route.query.rankId;
      this.addAllData.rankId = this.$route.query.rankId;
      this.getCityData()
      this.remoteMethod('',2)
      this.getProData()
    },
    methods: {
      //获取排行榜数据
      getData(type = 0){
        let _this = this,
        body = {rankId:this.$route.query.rankId}
  
        this.$http('/backstageRank/selectRankInfo',{body},{},{},'post').then(function(res){

          if(res.data.code == 0){
            if(type == 1){
              _this.addAllData.addForm.rankName = res.data.response.rankName
              _this.addAllData.addForm.province = res.data.response.province
              _this.addAllData.rankData = res.data.response;
              _this.addAllData.addForm.city = res.data.response.city
            }
            
            _this.buidingList1.forEach( item1 => {
              _this.addAllData.rankData.buildingInfoList.forEach( item2 => {
                if(item2.buildingId == item1.key){
                  item2.buildingId = item1.value
                }
              })
            })
            
          }
  
        }).catch(function(err){
          console.log(err)
        })
      },
      getSwi(){
        this.num++;
        if(this.num >= 3){
          this.getData(1)
        }
      },
      //获取省数据
      getProData(){
        let _this = this,
        body = {cityType:1};
        _this.$http('/citis/cityLists',{body},{},{},'post').then(function(res){
          if(res.data.code==0){
            _this.provinceIdsList = res.data.response.cityList   
            _this.getSwi()
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
            _this.addAllData.addForm.city = '';
            _this.cityIdsList = res.data.response.cityList 
            _this.getSwi()
          }else if(res.data.code == 300){
            _this.$router.push('/login')
          }else{
            message(_this,res.data.message,'warning')
          }
        }).catch(function(err){
          console.log(err)
        })   
      },
      //省市联动
      provinceChange(province){
        this.getCityData(province)
      },
      //模糊搜索
      remoteMethod(val,type = 1){
        let _this = this,
        body = {buildingName: val};
       
        this.$http('/backstageBuilding/getBuildingNameList', {body}, {}, {}, 'post').then(function (res) {
          if (res.data.code == 0) {
              _this.buidingList = res.data.response;
              if(type == 2){
                _this.buidingList1 = res.data.response;
              }
              _this.getSwi()
          } else if (res.data.code == 300) {
              _this.$router.push('/login')
          } else {
              message(_this,res.data.message,'warning')
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      //添加排行榜
      onSubmitOne(){
        let _this = this;
        if(this.addAllData.addForm.rankName==''){
          message(_this,'排行榜名称不能为空','warning')     
          return
        }
        if(this.addAllData.addForm.province==''){
          message(_this,'请选择区域','warning')       
          return
        }
        _this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = '/backstageRank/updateRankInfo',
          body = _this.addAllData.addForm;
          _this.$http(url,{body},{},{},'post').then( res => {
            if(res.data.code == 0){
              if(res.data.response.status == 1){
                message(_this,'提交成功','success')
              }else{
                message(_this,'提交失败','warning')
              }
            }else if(res.data.code == 300){
              _this.$router.push('/login')
            }else{
              message(_this,'提交失败','warning')
            }  
          }).catch( err => {
            console.log(err)
          })
        }).catch(() => {
          message(_this,'已取消提交','info')         
        });
      },
      //添加楼盘
      onSubmitTwo(formName){
        let _this=this;
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$confirm('确认提交吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  let url,
                  body = _.cloneDeep(_this.addAllData.buildForm)
                  if(_this.addAllData.type == 'buildAdd'){
                    url = '/backstageRank/insertBuildingInfo';
                    body.rankId = _this.addAllData.rankId;
                    delete body.buildInfoId;
                    
                    if(body.rankId === '' || body.rankId === undefined){
                      message(_this,'请先添加排行榜','warning')
                      return;
                    }

                  }else if(_this.addAllData.type == 'buildEdit'){
                    url = '/backstageRank/updateRankBuildInfo';
                    delete body.rankId;
                  }
                 
                  
                  _this.$http(url,{body},{},{},'post').then( res => {
                    if(res.data.code == 0){
                      message(_this,'提交成功','success')
                      _this.getData()
                      _this.addAllData.type = 'buildAdd'
                      for (let i in _this.addAllData.buildForm){
                        _this.addAllData.buildForm[i] = ''
                      }
                    }else if(res.data.code == 300){
                      _this.$router.push('/login')
                    }else{
                      message(_this,'提交失败','warning')
                    }  
                  }).catch( err => {
                    console.log(err)
                  })
                }).catch(() => {
                    message(this,'已取消','info')
                });
            } else {
                message(this,'有必填项未填写或者格式错误','warning')
            }
        });
      },
      //编辑已经添加的楼盘
      editRankBuild(row){
        document.getElementsByClassName('main_content')[0].scrollTop = '10000'
        this.addAllData.type = 'buildEdit'
        this.addAllData.buildForm = _.cloneDeep(row);
        this.buidingList1.forEach(item => {
          if(item.value == row.buildingId){
            this.addAllData.buildForm.buildingId = item.key
          }      
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
      this.$store.dispatch('defaultIndexAction','/estate/rankinglist');
      var that=this
      setTimeout(function(){
        that.$store.dispatch('mainLoadingAction',false);
      },300) 
    }
  }
</script>

<style scoped>
  .RankingListEdit .itemA,.RankingListEdit .itemB{padding: 20px 20px 20px 60px;border-bottom: 1px solid #eee}
  .RankingListEdit .itemB .formList{width:80%;}
  .RankingListEdit .itemB .formList:nth-child(1){margin-bottom: 0;border-bottom: none}
</style>

<style>
  .RankingListEdit .itemB .el-form-item{margin-bottom: 0px}
  .RankingListEdit .itemB .el-form-item__label{color: #777}
</style>
