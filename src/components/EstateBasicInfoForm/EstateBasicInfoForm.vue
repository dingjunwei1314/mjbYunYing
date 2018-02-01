<template>
  <div>
  	<!-- 测试 -->
	<div class="first_item_1">
	    <p class="tit">
	      楼盘基本属性
	    </p>
	    <el-form :model="addForm" :rules="addFormRule" ref="addFormRef" label-width="100px" class="demo-dynamic" style="width:70%;margin-left:15%;margin-top:40px">
	       
	      <el-form-item label="区域" :required="true">
	        <MjbArea 
                :isShowArea="true"
                :_province.sync="addForm.province" 
                :_city.sync="addForm.city" 
                :_area.sync="addForm.area"/>
	      </el-form-item>
	      <el-form-item label="楼盘名称" style="width:400px" :required="true" prop="buildingName">
	      	<el-input size="small"  v-model="addForm.buildingName"  placeholder="楼盘名称"></el-input>
	      </el-form-item>
	      <el-form-item label="楼盘别名" style="width:400px"  prop="nickName">
	        <el-input size="small" v-model="addForm.nickName"  placeholder="楼盘别名"></el-input>
	      </el-form-item>

	      <el-form-item label="描述"  prop="desc">
	        <el-input  v-model="addForm.desc" placeholder="描述" :autosize="true" style="width:70%" type="textarea"></el-input>
	      </el-form-item>  
	      <el-form-item label="物业类型" :required="true" prop="propertyType">
	        <el-radio-group 
	        size="small"
	        v-model="addForm.propertyTypeRadio"
	        @change="propertyTypeRadioChange">
	          <el-radio label="0">普通住宅</el-radio>
	          <el-radio label="1">公寓</el-radio>
	          <el-radio label="2">商住</el-radio>
	          <el-radio label="3">别墅</el-radio>
	          <el-radio label="4">其他</el-radio>
	        </el-radio-group>
	        <el-input 
	          size="small"
	          style="width:200px;margin-left:10px" 
	          placeholder="请填写其它选项"
	          v-show="addForm.propertyTypeRadio == '4'" 
	          v-model="addForm.propertyType">
	        </el-input>
	      </el-form-item>

	      <el-form-item label="销售状态" :required="true" prop="sellStatus">
	        <el-radio-group 
	        size="small"
	        v-model="addForm.sellStatusRadio"
	        @change="sellStatusRadioChange">
	          <el-radio label="0">在售</el-radio>
	          <el-radio label="1">待售</el-radio>
	          <el-radio label="2">售罄</el-radio>
	          <el-radio label="4">其它</el-radio>
	        </el-radio-group>
	        <el-input 
	          size="small"
	          style="width:200px;margin-left:10px" 
	          placeholder="请填写其它选项"
	          v-show="addForm.sellStatusRadio == '4'" 
	          v-model="addForm.sellStatus">
	        </el-input>
	      </el-form-item>
	        
	      <el-form-item label="开盘日期"  prop="sellTime">
	        <el-date-picker
	          size="small"
	          format="yyyy-MM-dd"
	          v-model="addForm.sellTime"
	          type="date"
	          placeholder="开盘日期">
	        </el-date-picker>
	        <span style="color:#999;font-size:12px">主要是以开盘说明为准，这里用于开盘日历及列表排序</span>
	      </el-form-item>

	      <el-form-item label="交房日期"  prop="deliverTime">
	        <el-date-picker
	          size="small"
	          format="yyyy-MM-dd"
	          v-model="addForm.deliverTime"
	          type="date"
	          placeholder="交房日期">
	        </el-date-picker>
	      </el-form-item>

	      <el-form-item label="均价"  prop="avgPrice">
	        <el-input size="small" v-model="addForm.avgPrice" type="number" placeholder="均价" style="width:100px"></el-input>
	        <span style="color:#999;font-size:12px">单位是：元/M2,不填写为待定;</span>
	      </el-form-item>
	     
	      <el-form-item label="装修程度" :required="true" prop="decorationdLevel">
	        <el-radio-group 
	          size="small"
	          v-model="addForm.decorationdLevelRadio"
	          @change="decorationdLevelRadioChange">
	          <el-radio label="0">毛坯</el-radio>
	          <el-radio label="1">简单装修</el-radio>
	          <el-radio label="2">中档装修</el-radio>
	          <el-radio label="3">高档装修</el-radio>
	          <el-radio label="4">豪华装修</el-radio>
	          <el-radio label="5">其它</el-radio>
	          <el-input 
	            style="width:200px;margin-left:10px" 
	            placeholder="请填写其它选项"
	            v-show="addForm.decorationdLevelRadio == '5'" 
	            v-model="addForm.decorationdLevel">
	          </el-input>
	        </el-radio-group>
	      </el-form-item>
	      
	      <el-form-item label="楼层" :required="true"  prop="storey">
	       
	        <el-checkbox-group size="small" v-model="addForm.storey">                 
	          <el-checkbox label="0">底层</el-checkbox>
	          <el-checkbox label="1">多层</el-checkbox>
	          <el-checkbox label="2">小高层</el-checkbox>
	          <el-checkbox label="3">高层</el-checkbox>
	          <el-checkbox label="4">超高层</el-checkbox>
	        </el-checkbox-group>
	        <span style="color:#999;font-size:12px">1~3为底层，4~7为多层，8~12为小高层，13~25为高层，26层100米以上为超高层</span>
	      </el-form-item>
	      
	      <el-form-item label="建筑类型"  prop="buildingType">
	        <el-radio-group 
	          size="small"
	          v-model="addForm.buildingTypeRadio"
	          @change="buildingTypeRadioChange">
	          <el-radio label="0">板式楼</el-radio>
	          <el-radio label="1">点式楼</el-radio>
	          <el-radio label="2">板点结合</el-radio>
	          <el-radio label="3">塔楼</el-radio>
	          <el-radio label="4">复式</el-radio>
	          <el-radio label="5">其它</el-radio>
	          <el-input 
	            style="width:200px;margin-left:10px" 
	            placeholder="请填写其它选项"
	            v-show="addForm.buildingTypeRadio == '5'" 
	            v-model="addForm.buildingType">
	          </el-input>
	        </el-radio-group>
	      </el-form-item>
	      
	      <el-form-item label="现房期房" :required="true"  prop="housingType">
	        <el-radio-group size="small" v-model="addForm.housingType">
	          <el-radio :label="0">现房</el-radio>
	          <el-radio :label="1">准现房</el-radio>
	          <el-radio :label="2">期房</el-radio>
	        </el-radio-group>
	      </el-form-item>

	      <el-form-item label="产权年限"  prop="housingProperty">
	        <el-input size="small" v-model="addForm.housingProperty" style="width:200px" placeholder="产权年限"></el-input>
	        <span style="color:#999;font-size:12px">*输入格式如下：住宅70年，商住50年或住宅70年</span>
	      </el-form-item>

	      <el-form-item label="楼盘标签"   prop="housingLable">
	        <el-checkbox-group size="small" v-model="addForm.housingLable">
	          <el-checkbox 
	          :label="item.lableId" 
	          v-for = "(item,index) in houseLableList" 
	          :key="index">
	            {{item.lableName}}
	      	  </el-checkbox>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-form>
    </div>

	<div class="first_item_2">
	    <p class="tit">
	      楼盘-地理信息
	    </p>
	    
	    <el-form :model="addForm"   label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
	      <el-form-item label="地铁" style="width:400px"  prop="metro">
	        <el-input size="small" v-model="addForm.metro" placeholder="地铁"></el-input>
	      </el-form-item>
	      <el-form-item label="环线"  prop="loopWire">
	        <el-radio-group size="small" v-model="addForm.loopWire">
	          <el-radio :label="0">一环以内</el-radio>
	          <el-radio :label="1">一至二环</el-radio>
	          <el-radio :label="2">二至三环</el-radio>
	          <el-radio :label="3">三环以外</el-radio>
	        </el-radio-group>
	      </el-form-item>
	      <el-form-item label="楼盘地址" style="width:600px"  prop="buildingAddress">
	        <el-input size="small" v-model="addForm.buildingAddress"  placeholder="楼盘地址"></el-input>
	      </el-form-item>
	      <el-form-item label="接待时间">
	       	<el-input size="small" v-model="addForm.serviceTime"  placeholder="例：10：00-17：00"></el-input>
	      </el-form-item>
	      <el-form-item label="交通路线" style="width:600px"  prop="trafficRoutes">
	        <el-input size="small" v-model="addForm.trafficRoutes" :autosize="autosize" placeholder="交通路线" type="textarea"></el-input>
	      </el-form-item>
	      <el-form-item label="位置标注" style="width:200px">
	        <div id="container" tabindex="0" style="width:800px;height:400px;position:relative">
	        	<div class="setWap">
	        		<el-form>
	        			<el-input size="small" v-model="mapForm.address" style="width:160px" placeholder="搜索区域" type="text"></el-input>
	        			<el-button  @click="mapSearch" type="primary">搜索</el-button>
	        		</el-form>
	        	</div>
	        </div>
	      </el-form-item>
	    </el-form>
	</div>

	<div class="first_item_3">
	    <p class="tit">
	      楼盘-服务信息
	    </p>
	    
	    <el-form :model="addForm"  label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
	      <el-form-item label="售楼电话" style="width:400px"  prop="serviceCall">
	        <el-input size="small" v-model="addForm.serviceCall" placeholder="售楼电话"></el-input>
	      </el-form-item>
	      <el-form-item label="售楼地址" style="width:400px"  prop="serviceAddress">
	        <el-input size="small" v-model="addForm.serviceAddress" placeholder="售楼地址"></el-input>
	      </el-form-item>
	      <el-form-item label="物业费" style="width:400px"  prop="propertyFee">
	        <el-input size="small" v-model="addForm.propertyFee" type="number" placeholder="物业费"></el-input>
	      </el-form-item>
	      <el-form-item label="物业公司" style="width:400px"  prop="propertyCompany">
	        <el-input size="small" v-model="addForm.propertyCompany" placeholder="物业公司"></el-input>
	      </el-form-item>
	      <el-form-item label="楼盘开发商" style="width:600px"  prop="developer">
	        <el-input size="small" v-model="addForm.developer" placeholder="楼盘开发商"></el-input>
	      </el-form-item>
	      <div 
	        v-for="(item,index) in addForm.permitPresaleList" 
	        :key="index" 
	        style="border-top:1px solid #ccc;padding-top:10px">

	        <el-form-item label="许可证证号" style="width:600px">
	          <el-input size="small" v-model="item.permitName"  placeholder="预售许可证书"></el-input>
	        </el-form-item>
	        <el-form-item label="发证时间" style="width:600px">
	          <el-date-picker
	            size="small"
	            format="yyyy-MM-dd"
	            v-model="item.createTime"
	            type="date"
	            onPick="pick"
	            placeholder="发证时间">
	          </el-date-picker>
	        </el-form-item>
	        <el-form-item label="绑定楼栋" style="width:600px">
	          <el-input size="small" v-model="item.building"  placeholder="绑定楼栋"></el-input>
	        </el-form-item>
	      </div>

	      <el-form-item  style="width:600px">
	        <el-button  @click="add_new_permitpresale" style="margin-left:100px" type="primary">添加新预售许可证</el-button>
	      </el-form-item>
	    </el-form>
	  </div>
	  <div style="text-align:center" v-if = "($route.query.type == 'edit') || ($route.query.type == 'add' && !id)">
	    <el-button  @click="submitForm('addFormRef')" type="primary">提交</el-button>
	  </div>	
  </div>
</template>

<script>
	import formatTime from '../../common/formatTime';
	import message from '../../common/message';
	import MjbArea from '../Common/MjbArea/MjbArea';
	export default {
		name:'',
		components:{
			MjbArea
		},
		data(){
          var validateTitle = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入标题'));
	        } else {
	          callback();
	        }
	      };

	      var validateType = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请选择物业类型'));
	        } else {
	          callback();
	        }
	      };
	      var validateState = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请选择销售状态'));
	        } else {
	          callback();
	        }
	      };
	      var validateDecorationDegree = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请选择装修程度'));
	        } else {
	          callback();
	        }
	      };
	      var validateFloor = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请选择楼层'));
	        }else{
	          callback();
	        }
	      };
	      var validateExisting = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请选择现房期房'));
	        }else{
	          callback();
	        }
	      };
		  return{
		  	swi:true,
		  	autosize:true,
			houseLableList:[],
			mapForm:{
				address:''
			},
			//添加新的楼盘基本信息表单
		    addForm:{
		      province:'',
		      city:'',
		      area:'',
		      buildingName:'',
		      nickName:'',
		      desc:'',
		      propertyTypeRadio:'',
		      propertyType:'',
		      sellStatusRadio:'',
		      sellStatus:'',
		      sellTime:'',
		      deliverTime:'',
		      avgPrice:0,
		      decorationdLevelRadio:'',
		      decorationdLevel:'',
		      storey:[],
		      buildingTypeRadio:'0',
		      buildingType:'0',
		      housingType:'',
		      housingProperty:0,
		      housingLable:[],
		      metro:'',
		      loopWire:0,
		      buildingAddress:'',
		      serviceTime:'',
		      trafficRoutes:'',
		      serviceCall:'',
		      serviceAddress:'',
		      propertyFee:0,
		      propertyCompany:'',
		      developer:'',
		      mapLon:'',
		      mapLat:'',
		      permitPresaleList:[
		        {
		          permitName:'',
		          createTime:'',
		          building:'',
		        }
		      ]
		    },
		    //添加新的楼盘基本信息表单验证规则
	        addFormRule: {
	          buildingName: [
	            { validator: validateTitle, trigger: 'blur' }
	          ],
	          propertyType: [
	            { validator: validateType, trigger: 'blur' }
	          ],
	          sellStatus: [
	            { validator: validateState, trigger: 'blur' }
	          ],
	          decorationdLevel: [
	            { validator: validateDecorationDegree, trigger: 'blur' }
	          ],
	          storey: [
	            { validator: validateFloor, trigger: 'blur' }
	          ],
	          housingType: [
	            { validator: validateExisting, trigger: 'blur' }
	          ],
	        },
	        //地图标记以及中心位置
	        markers:[],
	        center:[116.480983, 40.0958],
	        map:'',
	        _placeSearch:null,
	      }
		},
		computed:{
			id:function(){
				return this.$store.getters.GetBuildingId
			}
		},
		created(){
			this.getLabelsData(1);
			if(this.$route.query.type && this.$route.query.type == 'edit'){
				this.getBasicData()
			}
		},
		methods:{
		  //获取标签
	      getLabelsData(type){
	        let _this =this,
	        body = {lableType:type};
	        this.$http('/backstageBuilding/getBuildingLable', {}, {body}, {}, 'get').then(function (res) {
	          if (res.data.code == 0) {
	            _this.houseLableList = res.data.response.lableList;
	          }
	        })
	      },
	      //获取基本信息
	      getBasicData(){
	        let _this=this,
	        body = {buildingId:this.$route.query.buildingId};
	        this.$http('/backstageBuilding/getBuildingInfo',{},{body},{}).then(function(res){
	          if(res.data.code == 0){
	          	
	            _this.addForm = res.data.response

	            if( 
        		 _this.addForm.propertyType === '0' || 
        		 _this.addForm.propertyType === '1' ||
        		 _this.addForm.propertyType === '2' ||
        		 _this.addForm.propertyType === '3'){
					_this.addForm.propertyTypeRadio = _this.addForm.propertyType
	            }else{
	            	let _d = _this.addForm.propertyType;
	            	_this.addForm.propertyTypeRadio = '4'
	            	_this.$nextTick(() => {
	                    _this.addForm.propertyType = _d
	                })
	            }
	           

	            if(
	              _this.addForm.sellStatus === '0' ||
				  _this.addForm.sellStatus === '1' ||
				  _this.addForm.sellStatus === '2'
	            	){
					_this.addForm.sellStatusRadio = _this.addForm.sellStatus
	            }else{
	            	let _d = _this.addForm.sellStatus;
	            	_this.addForm.sellStatusRadio = '4'
	            	_this.$nextTick(() => {
	                    _this.addForm.sellStatus = _d
	                })
	            }


	            if(
	              _this.addForm.decorationdLevel === '0' ||
				  _this.addForm.decorationdLevel === '1' ||
				  _this.addForm.decorationdLevel === '2' ||
				  _this.addForm.decorationdLevel === '3' ||
				  _this.addForm.decorationdLevel === '4'
	            	){
					_this.addForm.decorationdLevelRadio = _this.addForm.decorationdLevel
	            }else{
	            	let _d = _this.addForm.decorationdLevel;
	            	_this.addForm.decorationdLevelRadio = '5'
	            	_this.$nextTick(() => {
	                    _this.addForm.decorationdLevel = _d
	                })
	            }

	            if(
	              _this.addForm.buildingType === '0' ||
				  _this.addForm.buildingType === '1' ||
				  _this.addForm.buildingType === '2' ||
				  _this.addForm.buildingType === '3' ||
				  _this.addForm.buildingType === '4'
	            	){
					_this.addForm.buildingTypeRadio = _this.addForm.buildingType
	            }else{
	            	let _d = _this.addForm.buildingType;
	            	_this.addForm.buildingTypeRadio = '5'
	            	_this.$nextTick(() => {
	                    _this.addForm.buildingType = _d	
	                })
	            }
				
				_this.addForm.storey = _this.addForm.storey.split(',')
				_this.addForm.housingLable = _this.addForm.housingLable.split(',')
				

	  			_this.addForm.mapLon = _this.addForm.mapLon === ''? 0:_this.addForm.mapLon
				_this.addForm.mapLat = _this.addForm.mapLat === ''? 0:_this.addForm.mapLat
				
				// _this.addForm = _.cloneDeep(_this.addForm)

	            _this.center = [_this.addForm.mapLon,_this.addForm.mapLat];
				

				let content= "<div classname='buildingAdd' style='background:rgba(0,0,0,.7);width: 60px;height: 20px;line-height: 20px;text-align: center;font-size: 12px;color: white;'>楼盘位置</div>";
	            let marker = new AMap.Marker({ 
	            	content,
		            position: _this.center,
		            map:_this.map
		        });
	            _this.markers.push(marker)
				
	          }
	        })
	      },
          //物业类型显示其它选项框
	      propertyTypeRadioChange(val){
	        if(val == 4){
	          this.addForm.propertyType = ''
	        }else{
	          this.addForm.propertyType = val
	        }
	      },
	      //销售状态显示其它选项框
	      sellStatusRadioChange(val){
	        if(val == 4){
	          this.addForm.sellStatus = ''
	        }else{
	          this.addForm.sellStatus = val
	        }
	      },
	      //装修程度显示其它选项框
	      decorationdLevelRadioChange(val){
	        if(val == 5){
	          this.addForm.decorationdLevel = ''
	        }else{
	          this.addForm.decorationdLevel = val
	        }
	      },
	      //建筑类型显示其它选项框
	      buildingTypeRadioChange(val){
	        if(val == 5){
	          this.addForm.buildingType = ''
	        }else{
	          this.addForm.buildingType = val
	        }
	      },
	      //初始化地图
	      init_map(){
	        let _this=this;
	        _this.map = new AMap.Map('container',{
	            resizeEnable: true,
	            zoom: 6,
	            center: _this.center
	        });
	        AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
	            function(){
	                _this.map.addControl(new AMap.ToolBar());

	                _this.map.addControl(new AMap.Scale());
	                
	                _this.map.addControl(new AMap.OverView({isOpen:true}));
	               
	        });
	        //标注
	        _this.map.on('click', function (e) {
	          
	          if(_this.markers.length>0){
	            _this.markers[0].setMap(null)
	          }   
	          _this.markers=[]        
	          let add_arr=[e.lnglat.getLng(),e.lnglat.getLat()] 
	          _this.addForm.mapLon=e.lnglat.getLng()
	          _this.addForm.mapLat=e.lnglat.getLat()
	      		
	      	  let content= "<div classname='buildingAdd' style='background:rgba(0,0,0,.7);width: 60px;height: 20px;line-height: 20px;text-align: center;font-size: 12px;color: white;'>楼盘位置</div>";
	          let marker = new AMap.Marker({ 
	          	content,
	            position: add_arr,
	            map:_this.map
	          });
	          _this.markers.push(marker)
	         
	        });
	      },
	      mapSearch(){
	      	let _this = this;
			if(this.mapForm.address == ''){
				message(this,'请输入区域','warning')
				return;
			}

			AMap.service('AMap.PlaceSearch',function(){
			    //实例化PlaceSearch
			    let placeSearch = new AMap.PlaceSearch({
					pageSize: 5,
            		pageIndex: 1,
            		city: "",
            		map: _this.map
				});
				_this.map.clearMap();
				_this.addForm.mapLat = '';
				_this.addForm.mapLon = '';
				placeSearch.search(_this.mapForm.address, function(status, result) {
					if(status == 'no_data'){
						message(_this,'未找到匹配区域','info')
					}
        		});
			})
	      },
	      //添加新预售许可证
	      add_new_permitpresale(){
	        this.addForm.permitPresaleList.push({permitName:'',createTime:'',building:''})
	      },
	      //楼盘基本信息提交
	      submitForm(formName) {
		        let _this = this;
		        console.log(this.addForm)
		        this.$refs[formName].validate((valid) => {
		          if (valid) {

		            _this.$confirm('确认提交吗?', '提示', {
		              confirmButtonText: '确定',
		              cancelButtonText: '取消',
		              type: 'warning'
		            }).then(() => {
		              let body = _.cloneDeep(_this.addForm),
		              url;
					  if(!this.swi){
						return false;
				      }
				      this.swi = false;
		              if(this.$route.query.type && this.$route.query.type == 'edit'){
		              	url = '/backstageBuilding/editBuildingBaseInfo'
		              }else{
		              	url = '/backstageBuilding/insertBuildingBaseInfo'
		              }
		              //格式化时间以及处理数组
		              body.permitPresaleList.forEach((item,index) => {
		                item.createTime = formatTime(item.createTime)
		              })
		             
		              body.sellTime = formatTime(body.sellTime)
		              body.deliverTime = formatTime(body.deliverTime)
		              body.housingLable = body.housingLable.join(',')
		              body.storey = body.storey.join(',')

		              delete(body.propertyTypeRadio)
		              delete(body.sellStatusRadio)
		              delete(body.decorationdLevelRadio)
		              delete(body.buildingTypeRadio)
						
					  body.mapLat = body.mapLat === '' ? 0 : body.mapLat
					  body.mapLon = body.mapLon === '' ? 0 : body.mapLon
		              
 													  
		              this.$http(url,{body},{},{},'post').then(function(res){
						_this.swi = true;
		                if(res.data.code == 0){
		                  if(_this.$route.query.type && _this.$route.query.type == 'edit'){
							if(res.data.response.status == 1){
								message(_this,'修改成功','success')
							}
			              }else{
			              	message(_this,'提交成功','success')
			              	_this.$store.dispatch('buildingIdAction',res.data.response.buildingID)
			              }
		                }
		              })
		            
		            }).catch(() => {
			    	
			    	})

		          } else {
		            message(_this,'有必填项未填','info')  
		          }
		        })
	      },
		},
		mounted(){
		  this.init_map()
		}
	}
</script>

<style scoped>
	.first_item_1,.first_item_2,.first_item_3{border: 1px solid #eee;margin:20px;}
	.first_item_1 .tit,.first_item_2 .tit,.first_item_3 .tit{height: 30px;background: rgba(32,160,255,.8);color: white;line-height: 30px;font-size: 12px;padding: 0px 20px; }

</style>

<style>
	.buildingAdd{}
	.setWap{position:absolute;width:260px;height:40px;z-index:999;right: 0;top: 10px}
</style>