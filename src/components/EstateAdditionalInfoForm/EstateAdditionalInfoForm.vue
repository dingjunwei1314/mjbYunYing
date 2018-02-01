<template>
	<div>
	  <div class="first_item_1">
        <p class="tit">
          楼盘-其他属性
        </p>
        <el-form :model="additionalInformationForm" :inline="true"  label-width="150px" class="demo-dynamic" style="width:80%;margin-left:15%;margin-top:40px">
          <el-form-item label="得房率" style="width:400px">
            <el-input size="small" style="width:100px" type="number"  v-model="additionalInformationForm.acquireBuilding"></el-input>
            <span style="color:#999;font-size:12px">单位：%</span>
          </el-form-item>
          <el-form-item label="绿化率" style="width:400px">
            <el-input size="small" style="width:100px" type="number" v-model="additionalInformationForm.greeningRate"></el-input>
            <span style="color:#999;font-size:12px">单位：%</span>
          </el-form-item>
          <el-form-item label="容积率" style="width:400px">
            <el-input size="small" style="width:100px" type="number" v-model="additionalInformationForm.plotRatio"></el-input>
            <span style="color:#999;font-size:12px">例：2</span>
          </el-form-item>
          <el-form-item label="建筑面积" style="width:400px">
            <el-input size="small" style="width:100px" type="number" v-model="additionalInformationForm.buildingArea"></el-input>
            <span style="color:#999;font-size:12px">单位：M2</span>
          </el-form-item>
          <el-form-item label="占地面积" style="width:400px">
            <el-input size="small" style="width:100px" type="number" v-model="additionalInformationForm.areaCovered"></el-input>
            <span style="color:#999;font-size:12px">单位：M2</span>
          </el-form-item>
          <el-form-item label="停车位" style="width:400px">
            <el-input size="small" style="width:100px" v-model="additionalInformationForm.parkingCount"></el-input>
          </el-form-item>
          <el-form-item label="学区所属" style="width:400px">
            <el-input size="small" style="width:100px" v-model="additionalInformationForm.schoolDistrict"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="first_item_1">
        <p class="tit">
          楼盘-相关视频
        </p>
        <el-form :model="additionalInformationForm"  label-width="150px" class="demo-dynamic" style="width:80%;margin-left:15%;margin-top:40px">
          <el-form-item label="楼盘视频">
            <el-input size="small" style="width:430px" v-model="additionalInformationForm.videoUrl">
              <template slot="prepend">Http://</template>
            </el-input>
            <span style="color:#999;font-size:12px">楼盘视频播放地址</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="first_item_1">
        <p class="tit">
          楼盘-销售及规划
        </p>
        <el-form :model="additionalInformationForm" :inline="true" label-width="150px" class="demo-dynamic" style="width:80%;margin-left:15%;margin-top:40px">
          <el-form-item label="规划户数" style="width:400px">
            <el-input size="small" style="width:100px" type="number" v-model="additionalInformationForm.livingCount"></el-input>
            <span>户</span>
          </el-form-item>
          <el-form-item label="可售套数" style="width:400px">
            <el-input size="small" style="width:100px" type="number" v-model="additionalInformationForm.salableNumber"></el-input>
            <span>套</span>
          </el-form-item>
          <el-form-item label="楼幢总量" style="width:400px">
            <el-input size="small" style="width:100px" type="number" v-model="additionalInformationForm.buildingCount"></el-input>
            <span>栋</span>
          </el-form-item>
          <el-form-item label="开发期数" style="width:400px">
            <el-input size="small" style="width:100px" type="number" v-model="additionalInformationForm.developNumber"></el-input>
            <span>期</span>
          </el-form-item>
          <el-form-item label="面积区间" style="width:400px">
            <el-input size="small" style="width:100px" v-model="additionalInformationForm.areaRegion"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="first_item_1">
        <p class="tit">
          楼盘-配套设施
        </p>
        <el-form :model="additionalInformationForm" :inline="true" label-width="150px" class="demo-dynamic" style="width:80%;margin-left:15%;margin-top:40px">
          <el-form-item label="供水" style="width:600px">
            <el-radio-group 
              v-model="additionalInformationForm.waterSupplyTypeRadio"
              @change="waterSupplyTypeRadioChange">
              <el-radio label="0">市政供水</el-radio>
              <el-radio label="2">其它</el-radio>
            </el-radio-group>
            <el-input size="small" 
              style="width:200px;margin-left:10px" 
              placeholder="请填写其它选项"
              v-show="additionalInformationForm.waterSupplyTypeRadio == 2" 
              v-model="additionalInformationForm.waterSupplyType">
            </el-input>
          </el-form-item>
          <el-form-item label="供电" style="width:600px">
            <el-radio-group 
              v-model="additionalInformationForm.powerSupplyTypeRadio"
              @change="powerSupplyTypeRadioChange">
              <el-radio label="0">市政供电</el-radio>
              <el-radio label="2">其它</el-radio>
            </el-radio-group>
            <el-input size="small" 
              style="width:200px;margin-left:10px" 
              placeholder="请填写其它选项"
              v-show="additionalInformationForm.powerSupplyTypeRadio == 2" 
              v-model="additionalInformationForm.powerSupplyType">
            </el-input>
          </el-form-item>
          <el-form-item label="供暖" style="width:600px">
            <el-radio-group 
              v-model="additionalInformationForm.heatingMethodRadio"
              @change="heatingMethodRadioChange">
              <el-radio label="0">市政供暖</el-radio>
              <el-radio label="1">小区集中供暖</el-radio>
              <el-radio label="2">其它</el-radio>
            </el-radio-group>
            <el-input size="small" 
              style="width:200px;margin-left:10px" 
              placeholder="请填写其它选项"
              v-show="additionalInformationForm.heatingMethodRadio == 2" 
              v-model="additionalInformationForm.heatingMethod">
            </el-input>
          </el-form-item>
          </el-form-item>
        </el-form>
      </div>
      <div class="first_item_1">
        <p class="tit">
          楼盘-施工进度信息
        </p>
        <el-form :model="additionalInformationForm" :inline="true" label-width="150px" class="demo-dynamic" style="width:80%;margin-left:15%;margin-top:40px">
          <el-form-item label="楼体进度" style="width:400px">
            <el-input size="small" style="width:100px" v-model="additionalInformationForm.buildingSchedule"></el-input>
            <span>%</span>
          </el-form-item>
          <el-form-item label="公共区域进度" style="width:400px">
            <el-input size="small" style="width:100px" v-model="additionalInformationForm.publicAreaSchedule"></el-input>
            <span>%</span>
          </el-form-item>
          <el-form-item label="当前阶段">
            <el-input size="small" style="width:420px" v-model="additionalInformationForm.currentStage"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="first_item_1">
        <p class="tit">
          楼盘-往期楼盘
        </p>
        <el-form :model="additionalInformationForm"  label-width="150px" class="demo-dynamic" style="width:80%;margin-left:15%;margin-top:40px">
          <el-form-item v-for="(item,index) in additionalInformationForm.id_arr" :key="index" label="添加往期楼盘id">
            <el-input size="small" style="width:200px" v-model="item.historyBuilding"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left:150px" type="primary" size="mini" @click="addId">继续添加</el-button>
          </el-form-item>              
        </el-form>
      </div>

      <div style="text-align:center">
        <el-button  @click="submitForm2" type="primary">提交</el-button>
      </div>
	</div>
</template>

<script>
	import message from '../../common/message'
	export default {
		name:'',
		data(){
			return{
				//添加新的楼盘附加信息表单
        additionalInformationForm:{
          buildingId:'',
          acquireBuilding:'',
          greeningRate:'',
          plotRatio:'',
          buildingArea:'',
          areaCovered:'',
          developNumber:'',
          parkingCount:'',
          schoolDistrict:'',
          videoUrl:'',
          livingCount:'',
          salableNumber:'',
          buildingCount:'',
          areaRegion:'',
          waterSupplyTypeRadio:'',
          waterSupplyType:'',
          powerSupplyTypeRadio:'',
          powerSupplyType:'',
          heatingMethodRadio:'',
          heatingMethod:'',
          buildingSchedule:'',
          publicAreaSchedule:'',
          currentStage:'',
          historyBuilding:'',
          id_arr:[{historyBuilding:''}]
        },
			}
		},
    computed:{
      id:function(){
        return this.$store.getters.GetBuildingId
      }
    },
		methods:{
		    //供水显示其它选项框
	      waterSupplyTypeRadioChange(val){
	        if(val == 0){
	          this.additionalInformationForm.waterSupplyType = 0
	        }else if(val == 2){
	          this.additionalInformationForm.waterSupplyType = ''
	        }
	      },
	      //供电显示其它选项框
	      powerSupplyTypeRadioChange(val){
	        if(val == 0){
	          this.additionalInformationForm.powerSupplyType = 0
	        }else if(val == 2){
	          this.additionalInformationForm.powerSupplyType = ''
	        }
	      },
	      //供暖显示其他选项框
	      heatingMethodRadioChange(val){
	        if(val == 0 || val ==1){
	          this.additionalInformationForm.heatingMethod = val
	        }else if(val == 2){
	          this.additionalInformationForm.heatingMethod = ''
	        }
	      },
        //获取数据
        getData(){
          let body = {
            buildingId:this.id
          },
          _this = this;
          this.$http('/backstageBuilding/getBuildingAttachInfo',{},{body},{},'get').then(function(res){
            if(res.data.code == 0){
                _this.additionalInformationForm = res.data.response;
                let _id_arr = []
                _id_arr = _this.additionalInformationForm.historyBuilding.split(',')
                _this.additionalInformationForm.id_arr = []
                _id_arr.forEach(item => {
                  _this.additionalInformationForm.id_arr.push({
                    historyBuilding:item
                  })
                })

                if(_this.additionalInformationForm.waterSupplyType === '0'){
                  _this.additionalInformationForm.waterSupplyTypeRadio = '0';
                }else if(_this.additionalInformationForm.waterSupplyType === '' || _this.additionalInformationForm.waterSupplyType === null){
                  _this.additionalInformationForm.waterSupplyTypeRadio = ''
                }else{
                  let _d = _this.additionalInformationForm.waterSupplyType;
                  _this.additionalInformationForm.waterSupplyTypeRadio = '2'
                  _this.$nextTick(() => {
                    _this.additionalInformationForm.waterSupplyType = _d
                  })
                }

                if(_this.additionalInformationForm.powerSupplyType === '0'){
                  _this.additionalInformationForm.powerSupplyTypeRadio = '0';
                }else if(_this.additionalInformationForm.powerSupplyType === '' || _this.additionalInformationForm.powerSupplyType === null){
                  _this.additionalInformationForm.powerSupplyTypeRadio = ''
                }else{
                  let _d = _this.additionalInformationForm.powerSupplyType;
                  _this.additionalInformationForm.powerSupplyTypeRadio = '2'
                  _this.$nextTick(() => {
                    _this.additionalInformationForm.powerSupplyType = _d
                  })
                }

                if(_this.additionalInformationForm.heatingMethod === '0'){
                  _this.additionalInformationForm.heatingMethodRadio = '0';
                }else if(_this.additionalInformationForm.heatingMethod === '1'){
                  _this.additionalInformationForm.heatingMethodRadio = '1';
                }else if(_this.additionalInformationForm.heatingMethod === '' || _this.additionalInformationForm.heatingMethod === null){
                  _this.additionalInformationForm.heatingMethodRadio = ''
                }else{
                  let _d = _this.additionalInformationForm.heatingMethod;
                  _this.additionalInformationForm.heatingMethodRadio = '2'
                  _this.$nextTick(() => {
                    _this.additionalInformationForm.heatingMethod = _d
                  })
                }

                
                _this.additionalInformationForm = _.cloneDeep(_this.additionalInformationForm)
               
            }
          })
        },
		    //楼盘附加信息提交
	      submitForm2(){
	        let _this = this,
          url = '',
	        idArr = [],
	        body = _.cloneDeep(_this.additionalInformationForm)
          body.buildingId = this.id
	        body.id_arr.forEach((item,index) => {
	          if(item.historyBuilding != ''){
	            idArr.push(item.historyBuilding)
	          }
	        });
	        body.historyBuilding = idArr.join(',');
	        delete body.id_arr;
	        delete body.heatingMethodRadio;
	        delete body.powerSupplyTypeRadio;
	        delete body.waterSupplyTypeRadio;
          
          if(this.$route.query.type && this.$route.query.type == 'edit'){
            url = '/backstageBuilding/editBuildingAttachInfo';
          }else{
            url = '/backstageBuilding/addBuildingAttach';
          }

	        _this.$confirm('确认提交吗?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          _this.$http(url,{body},{},{},'post').then( res => {
	            if(res.data.code == 0){
                message(_this,'提交成功','success')
	            }
	          })
	        }).catch(() => {
            
          })
	      },
	      
	      //添加一组往期楼盘ID
	      addId(){
	        this.additionalInformationForm.id_arr.push({historyBuilding:''})
          console.log(this.additionalInformationForm.id_arr)
	      },
		},
		mounted(){
      if(this.$route.query.type && this.$route.query.type == 'edit'){
        this.getData()
      }
		},
	}
</script>

<style scoped>
	.first_item_1{border: 1px solid #eee;margin:20px;}
	.first_item_1 .tit{height: 30px;background: rgba(32,160,255,.8);color: white;line-height: 30px;font-size: 12px;padding: 0px 20px; }
</style>