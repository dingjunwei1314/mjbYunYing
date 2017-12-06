<template>
  <div class="estateadd">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <div style="padding:20px">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="楼盘基本信息" name="first">
          <div class="first_item_1">
            <p class="tit">
              楼盘基本属性
            </p>
            <el-form  label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
               
              <el-form-item label="区域：">
                {{houseBasicData.province}} {{houseBasicData.city}}
              </el-form-item>
              <el-form-item label="标题：" style="width:400px">
                {{houseBasicData.buildingName}}
                <span v-if="houseBasicData.buildingName === ''">--</span>
              </el-form-item>
              <el-form-item label="楼盘别名：" style="width:400px">
                {{houseBasicData.nickName}}
                <span v-if="houseBasicData.nickName === ''">--</span>
              </el-form-item>
              <el-form-item label="描述：">
                {{houseBasicData.desc}}
                <span v-if="houseBasicData.desc === ''">--</span>
              </el-form-item>
              <el-form-item label="物业类型：">
                <span v-if="houseBasicData.propertyType==='0'">普通住宅</span>
                <span v-else-if="houseBasicData.propertyType==='1'">公寓</span>
                <span v-else-if="houseBasicData.propertyType==='2'">商住</span>
                <span v-else-if="houseBasicData.propertyType==='3'">别墅</span>
                <span v-else-if="houseBasicData.propertyType==='' || houseBasicData.propertyType===null">--</span>
                <span v-else>{{houseBasicData.propertyType}}</span>
              </el-form-item>

              <el-form-item label="销售状态：">
                
                <span v-if="houseBasicData.sellStatus === '0' ">在售</span>
                <span v-else-if="houseBasicData.sellStatus === '1' ">待售</span>
                <span v-else-if="houseBasicData.sellStatus === '2' ">售罄</span>
                <span v-else-if="houseBasicData.sellStatus === '' || houseBasicData.sellStatus === null">--</span>
                <span v-else>{{houseBasicData.sellStatus}}</span>
              </el-form-item>

              <el-form-item label="开盘日期：">
                {{houseBasicData.sellTime}}
                <span v-if="houseBasicData.sellTime === ''">--</span>
              </el-form-item>

              <el-form-item label="交房日期：">
                {{houseBasicData.deliverTime}}
                <span v-if="houseBasicData.deliverTime === ''">--</span>
              </el-form-item>

              <el-form-item label="均价：">
                <span v-if="houseBasicData.avgPrice === ''">--</span>
                <span v-else>{{houseBasicData.avgPrice}} 元/m2</span>
              </el-form-item>
             
              <el-form-item label="装修程度：">
                
                <span v-if="houseBasicData.decorationdLevel === '0' ">毛坯</span>
                <span v-else-if="houseBasicData.decorationdLevel === '1' ">简单装修</span>
                <span v-else-if="houseBasicData.decorationdLevel === '2' ">中档装修</span>
                <span v-else-if="houseBasicData.decorationdLevel === '3' ">高档装修</span>
                <span v-else-if="houseBasicData.decorationdLevel === '4' ">豪华装修</span>
                <span v-else-if="houseBasicData.decorationdLevel==='' || houseBasicData.decorationdLevel===null">--</span>
                <span v-else>{{houseBasicData.decorationdLevel}}</span>
              </el-form-item>
              
              <el-form-item label="楼层：">
                <span v-if="houseBasicData.storey === ''">--</span>
                <span v-if="houseBasicData.storey==='0'">底层</span>
                <span v-if="houseBasicData.storey==='1'">多层</span>
                <span v-if="houseBasicData.storey==='2'">小高层</span>
                <span v-if="houseBasicData.storey==='3'">高层</span>
                <span v-if="houseBasicData.storey==='4'">超高层</span>
              </el-form-item>
              
              <el-form-item label="建筑类型：">
                <span v-if="houseBasicData.buildingType === '0' ">板式楼</span>
                <span v-else-if="houseBasicData.buildingType === '1' ">点式楼</span>
                <span v-else-if="houseBasicData.buildingType === '2' ">板点结合</span>
                <span v-else-if="houseBasicData.buildingType === '3' ">塔楼</span>
                <span v-else-if="houseBasicData.buildingType === '4' ">复式</span>
                <span v-else-if="houseBasicData.buildingType==='' || houseBasicData.buildingType===null">--</span>
                <span v-else>{{houseBasicData.buildingType}}</span>
               
              </el-form-item>
              
              <el-form-item label="现房期房：">
                <span v-if="houseBasicData.housingType === ''">--</span>
                <span v-if="houseBasicData.housingType === 0">现房</span>
                <span v-if="houseBasicData.housingType === 1">准现房</span>
                <span v-if="houseBasicData.housingType === 2">期房</span>
              </el-form-item>

              <el-form-item label="产权年限：">
                {{houseBasicData.housingProperty}}
                <span v-if="houseBasicData.housingProperty === ''">--</span>
              </el-form-item>

              <el-form-item label="楼盘特色标签：">
                <el-tag type="warning" style="margin-right:5px" v-for="(item,index) in houseBasicData.housingLable" :key="index">{{item}}</el-tag>
                <span v-if="houseBasicData.housingLable.length==0">--</span>
              </el-form-item>
            </el-form>
          </div>

          <div class="first_item_2">
            <p class="tit">
              楼盘-地理信息
            </p>
            
            <el-form   label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="地铁：" style="width:400px">
                {{houseBasicData.metro}}
                <span v-if="houseBasicData.metro === ''">--</span>
              </el-form-item>
              <el-form-item label="环线：">
                <span v-if="houseBasicData.loopWire === ''">--</span>
                <span v-if="houseBasicData.loopWire=='0'">一环以内</span>
                <span v-if="houseBasicData.loopWire=='1'">一至二环</span>
                <span v-if="houseBasicData.loopWire=='2'">二至三环</span>
                <span v-if="houseBasicData.loopWire=='3'">三至四环</span>
                <span v-if="houseBasicData.loopWire=='4'">四至五环</span>
                <span v-if="houseBasicData.loopWire=='5'">五至六环</span>
                <span v-if="houseBasicData.loopWire=='6'">六环外</span>
              </el-form-item>
              <el-form-item label="楼盘地址：" style="width:400px">
                {{houseBasicData.buildingAddress}}
                <span v-if="houseBasicData.buildingAddress === ''">--</span>
              </el-form-item>
              <el-form-item label="接待时间：" style="width:400px">
                <span v-if="houseBasicData.serviceTime === ''">--</span>
                <span v-else>{{houseBasicData.serviceTime}}</span>
              </el-form-item>
              <el-form-item label="交通路线：" style="width:400px">
                {{houseBasicData.trafficRoutes}}
                <span v-if="houseBasicData.trafficRoutes === ''">--</span>
              </el-form-item>
              <el-form-item label="地图：" style="width:200px">
                <div id="container" tabindex="0" style="width:800px;height:400px"></div>
              </el-form-item>
            </el-form>
          </div>

          <div class="first_item_3">
            <p class="tit">
              楼盘-服务信息
            </p>
            <el-form  label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="售楼电话：" style="width:400px">
                {{houseBasicData.serviceCall}}
                <span v-if="houseBasicData.serviceCall === ''">--</span>
              </el-form-item>
              <el-form-item label="售楼地址：" style="width:400px">
                {{houseBasicData.serviceAddress}}
                <span v-if="houseBasicData.serviceAddress === ''">--</span>
              </el-form-item>
              <el-form-item label="物业费：" style="width:400px">
                {{houseBasicData.propertyFee}}
                <span v-if="houseBasicData.propertyFee === ''">--</span>
              </el-form-item>
              <el-form-item label="物业公司：" style="width:400px">
                {{houseBasicData.propertyCompany}}
                <span v-if="houseBasicData.propertyCompany === ''">--</span>
              </el-form-item>
              <el-form-item label="楼盘开发商：" style="width:600px">
                {{houseBasicData.developer}}
                <span v-if="houseBasicData.developer === ''">--</span>
              </el-form-item>

              <div style="border-top:1px solid #ccc" v-for="(item,index) in houseBasicData.permitPresaleList" :key="index">
                <el-form-item label="预售许可证书" style="width:600px">
                  {{item.permitName}}
                  <span v-if="item.permitName === ''">--</span>
                </el-form-item>
                <el-form-item label="发证时间" style="width:600px">
                  {{item.createTime}}
                  <span v-if="item.createTime === ''">--</span>
                </el-form-item>
                <el-form-item label="绑定楼栋" style="width:600px">
                  {{item.building}}
                  <span v-if="item.building === ''">--</span>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="附加信息" name="second">
          <div class="first_item_1">
            <p class="tit">
              楼盘-其他属性
            </p>
            <el-form :inline="true"  label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="得房率：" style="width:300px">
                <span v-if="infoData.acquireBuilding === ''">--</span>
                <span v-else>{{infoData.acquireBuilding}}%</span>
              </el-form-item>
              <el-form-item label="绿化率：" style="width:300px">
                <span v-if="infoData.greeningRate === ''">--</span>
                <span v-else>{{infoData.greeningRate}}%</span>
              </el-form-item>
              <el-form-item label="容积率：" style="width:300px">
                <span v-if="infoData.plotRatio === ''">--</span>
                <span v-else>{{infoData.plotRatio}}%</span>
              </el-form-item>
              <el-form-item label="建筑面积：" style="width:300px">
                <span v-if="infoData.buildingArea === ''">--</span>
                <span v-else>{{infoData.buildingArea}} 平方米</span>
              </el-form-item>
              <el-form-item label="占地面积：" style="width:300px">
                <span v-if="infoData.areaCovered === ''">--</span>
                <span v-else>{{infoData.areaCovered}} 平方米</span>
              </el-form-item>
              <el-form-item label="停车位：">
                <span v-if="infoData.parkingCount === ''">--</span>
                <span v-else>{{infoData.parkingCount}}</span>
              </el-form-item>
              <el-form-item label="学区所属：" style="width:300px">
                <span v-if="infoData.schoolDistrict === ''">--</span>
                <span v-else>{{infoData.schoolDistrict}}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-相关视频
            </p>
            <el-form label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="楼盘视频：">
                {{infoData.videoUrl}}
                <span v-if="infoData.videoUrl === ''">--</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-销售及规划
            </p>
            <el-form :inline="true" label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="规划户数：" style="width:300px">
                {{infoData.livingCount}}
                <span v-if="infoData.livingCount === ''">--</span>
                <span>户</span>
              </el-form-item>
              <el-form-item label="可售套数：" style="width:300px">
                {{infoData.salableNumber}}
                <span v-if="infoData.salableNumber === ''">--</span>
                <span>套</span>
              </el-form-item>
              <el-form-item label="楼幢总量：" style="width:300px">
                {{infoData.buildingCount}}
                <span v-if="infoData.buildingCount === ''">--</span>
                <span>栋</span>
              </el-form-item>
              <el-form-item label="开发期数：" style="width:300px">
                {{infoData.developNumber}}
                <span v-if="infoData.developNumber === ''">--</span>
                <span>期</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-配套设施
            </p>
            <el-form  :inline="true" label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="供水：" style="width:600px">
               
                <span v-if="infoData.waterSupplyType === ''">--</span>
                <span v-else-if="infoData.waterSupplyType === '0'">市政供水</span>
                <span v-else>{{infoData.waterSupplyType}}</span>
               
              </el-form-item>
              <el-form-item label="供电：" style="width:600px">
               
                <span v-if="infoData.powerSupplyType === ''">--</span>
                <span v-else-if="infoData.powerSupplyType === '0'">市政供电</span>
                <span v-else>{{infoData.powerSupplyType}}</span>
              </el-form-item>
              <el-form-item label="供暖：" style="width:600px">
               
                <span v-if="infoData.heatingMethod === ''">--</span>
                <span v-else-if="infoData.heatingMethod === '0'">市政供暖</span>
                <span v-else-if="infoData.heatingMethod === '1'">小区集中供暖</span>
                <span v-else>{{infoData.heatingMethod}}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-施工进度信息
            </p>
            <el-form  :inline="true" label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="楼体进度：" style="width:300px">
                <span v-if="infoData.buildingSchedule === ''">--</span>
                <span v-else>{{infoData.buildingSchedule}}%</span>
              </el-form-item>
              <el-form-item label="公共区域进度：" style="width:300px">
                <span v-if="infoData.publicAreaSchedule === ''">--</span>
                <span v-else>{{infoData.publicAreaSchedule}}%</span>
              </el-form-item>
              <el-form-item label="当前阶段：">
                <span v-if="infoData.currentStage === ''">--</span>
                <span v-else>{{infoData.currentStage}}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-往期楼盘
            </p>
            <el-form  label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item  label="往期楼盘id：" v-for="(item,index) in infoData.historyBuilding" :key="index">
                <span v-if = "item">{{item}}</span>
                <span v-else> -- </span>
              </el-form-item>            
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="楼盘相册" name="third">
          <el-tabs v-model="activeName2" @tab-click="imgTabClick">
            <el-tab-pane label="户型图" name="first" style="padding:0px 20px">
              <div v-show="hxAllData.is_show_hx_main">
                <el-table
                  v-loading="hxAllData.is_loading_tab"
                  :data="hxAllData.hxTableData.houseList"
                  border
                  tooltip-effect="dark"
                  style="width: 100%;font-size:12px!important;">
                  <el-table-column
                    label="图片"
                    min-width="100">
                    <template scope="scope">
                      <img style="width:100px;height:50px;margin-top:10px;" :src="scope.row.imgUrl"/>   
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="area"
                    label="面积"
                    min-width="80">
                  </el-table-column>
                  <el-table-column
                    prop="house"
                    label="户型"
                    min-width="80">
                  </el-table-column>
                  <el-table-column
                    prop="describe"
                    label="描述"
                    min-width="100">                
                  </el-table-column>
                  <el-table-column
                    prop="saleStatus"
                    label="销售状态"
                    min-width="60">
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    min-width="80"
                    label="发布时间">
                  </el-table-column>
                  <el-table-column
                    min-width="200"
                    label="操作">
                    <template scope="scope">
                    <el-button
                      size="small"
                      @click="hxDetailView(scope.row)">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  v-show="hxAllData.hxTableData.rowCount>0"
                  style="margin: 0 auto;text-align:center;margin-top:20px"
                  layout="prev, pager, next"
                  :page-size=10
                  :currentPage="hxAllData.currentPage"
                  @current-change="hxListCurrentChange"
                  :total="hxAllData.hxTableData.rowCount">
                </el-pagination>
              </div>
              <div v-show="!hxAllData.is_show_hx_main">
                <el-button type="text" @click="show_add_hx_form(true)">返回列表</el-button>
                <el-form 
                  :model="hxAllData.addNewHouseType" 
                  ref="addNewHouseTypeRef" 
                  label-width="100px" 
                  class="demo-dynamic" 
                  style="width:55%;margin:0 auto;margin-top:40px"> 
                  
                  <h5 class="addtit">户型图</h5>
                  <el-form-item label="标题：" style="width:400px">
                    <span>{{hxAllData.addNewHouseType.houseName}}</span>
                  </el-form-item>
                  <el-form-item label="户型：" style="width:800px">
                    <span v-if="hxAllData.addNewHouseType.room == 1">一室</span>
                    <span v-if="hxAllData.addNewHouseType.room == 2">二室</span>
                    <span v-if="hxAllData.addNewHouseType.room == 3">三室</span>
                    <span v-if="hxAllData.addNewHouseType.room == 4">四室</span>

                    <span v-if="hxAllData.addNewHouseType.hall == 1">一厅</span>
                    <span v-if="hxAllData.addNewHouseType.hall == 2">二厅</span>
                    <span v-if="hxAllData.addNewHouseType.hall == 3">三厅</span>

                    <span v-if="hxAllData.addNewHouseType.kitchen == 1">一厨</span>
                    <span v-if="hxAllData.addNewHouseType.kitchen == 2">二厨</span>

                    <span v-if="hxAllData.addNewHouseType.bathRoom == 1">一卫</span>
                    <span v-if="hxAllData.addNewHouseType.bathRoom == 2">二卫</span>
                   
                  </el-form-item>

                  <el-form-item label="面积区间：">
                    <span>{{hxAllData.addNewHouseType.areaMin}}</span>
                    至
                    <span>{{hxAllData.addNewHouseType.areaMax}}</span>  
                  </el-form-item>

                  <el-form-item label="朝向：">
                    <span v-if = "hxAllData.addNewHouseType.roomLocation == 1">南北</span>
                    <span v-if = "hxAllData.addNewHouseType.roomLocation == 2">东西</span>
                    <span v-if = "hxAllData.addNewHouseType.roomLocation == 3">东北</span>
                    <span v-if = "hxAllData.addNewHouseType.roomLocation == 4">东南</span>
                    <span v-if = "hxAllData.addNewHouseType.roomLocation == 5">西北</span>
                    <span v-if = "hxAllData.addNewHouseType.roomLocation == 6">西南</span>
                  </el-form-item>

                  <el-form-item label="描述：">
                    <span>{{hxAllData.addNewHouseType.dec}}</span>
                  </el-form-item>

                  <el-form-item label="总价区间：">
                    <span>{{hxAllData.addNewHouseType.priceMin}}</span>
                    至
                    <span>{{hxAllData.addNewHouseType.priceMax}}</span>  
                  </el-form-item>

                  <el-form-item label="销售状态：">
                    <span v-if = "hxAllData.addNewHouseType.saleStatus === 0">在售</span>
                    <span v-if = "hxAllData.addNewHouseType.saleStatus === 1">待售</span>
                    <span v-if = "hxAllData.addNewHouseType.saleStatus === 2">售罄</span>
                  </el-form-item>

                  <el-form-item label="总套数：">
                    <span>{{hxAllData.addNewHouseType.houseNum}}</span>
                  </el-form-item>

                  <el-form-item  label="可售套数：">
                    <span>{{hxAllData.addNewHouseType.saleNum}}</span>
                  </el-form-item>

                  <el-form-item label="待售套数：">
                    <span>{{hxAllData.addNewHouseType.forSaleNum}}</span>
                  </el-form-item>

                  <el-form-item label="套数占比：">
                    <span>{{hxAllData.addNewHouseType.scaleRoom}}</span>
                  </el-form-item>
                  
                  <el-form-item label="标签：">
                    <el-tag 
                    style = "margin-right: 20px;"
                    type = "danger" 
                    :key = "index"
                    v-for = "(item,index) in hxAllData.addNewHouseType.houseLable">
                      {{item}}
                    </el-tag>

                    <span v-if = "hxAllData.addNewHouseType.houseLable.length<= 0"> -- </span>

                  </el-form-item>
                  
                  <el-form-item label="预览" class="previewFormItem">
                    <ImgPreview 
                      v-show="hxAllData.addNewHouseType.houseImgUrl"
                      :isShowDelete = "isShowDelete"
                      :backgroundPicUrl="hxAllData.addNewHouseType.houseImgUrl"
                      @previewImg="previewImgHx(hxAllData.addNewHouseType.houseImgUrl)"
                    />
                    <p v-if = "!hxAllData.addNewHouseType.houseImgUrl" class="no-img">
                      暂无预览图
                    </p>
                  </el-form-item>
                </el-form>  
              </div>
            </el-tab-pane>
            <el-tab-pane label="实景图" name="second" style="padding:0px 20px">
              <div v-show = "sjAllData.is_show_sj_main">
                <el-table
                  :data="sjAllData.sjTableData.sceneList"
                  border
                  tooltip-effect="dark"
                  style="width: 100%;font-size:12px!important;">
                  <el-table-column
                    label="图片"
                    min-width="100">
                    <template scope="scope">
                      <img style="width:100px;height:50px;margin-top:10px;" v-if="scope.row.imgUrl" :src="scope.row.imgUrl"/> 
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="takeTime"
                    min-width="80"
                    label="拍摄时间">
                  </el-table-column>
                  <el-table-column
                    min-width="100"
                    label="操作">
                    <template scope="scope">
                    <el-button
                      size="small"
                      @click="sjDetailView(scope.row)">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  v-show="sjAllData.sjTableData.rowCount>0"
                  style="margin: 0 auto;text-align:center;margin-top:20px"
                  layout="prev, pager, next"
                  :page-size=10
                  :currentPage="sjAllData.currentPage"
                  @current-change="sjListCurrentChange"
                  :total="sjAllData.sjTableData.rowCount">
                </el-pagination>
              </div>
              <div v-show = "!sjAllData.is_show_sj_main">
                <el-button type="text" @click="sjAllData.is_show_sj_main = true">返回列表</el-button>
                <el-form 
                  :model="sjAllData.addNewSj" 
                  label-width="100px" 
                  class="demo-dynamic" 
                  style="width:55%;margin:0 auto;margin-top:40px"> 
                  
                  <h5 class="addtit">实景图</h5>
                

                  <el-form-item label="拍摄时间：">
                    <span v-if="sjAllData.addNewSj.takeTime == null || sjAllData.addNewSj.takeTime == ''">--</span>
                    <span>{{sjAllData.addNewSj.takeTime}}</span>
                  </el-form-item>

                  <el-form-item label="预览" class="previewFormItem">
                    <ImgPreview 
                      v-show="sjAllData.addNewSj.imgUrl"
                      :isShowDelete = "isShowDelete"
                      :backgroundPicUrl="sjAllData.addNewSj.imgUrl"
                      @previewImg="previewImgSj(sjAllData.addNewSj.imgUrl)"
                    />
                    <p v-if = "!sjAllData.addNewSj.imgUrl" class="no-img">
                      暂无预览图
                    </p>
                  </el-form-item>
                </el-form> 
              </div>
              
            </el-tab-pane>
            <el-tab-pane label="效果图" name="third" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">效果图预览列表</p>
              <el-form :model="xgAllData" label-width="100px" class="demo-dynamic"> 
                <el-form-item label="" class="previewFormItem">
                  <ImgPreview 
                    :isShowDelete = "isShowDelete"
                    v-for = "(item,index) in xgAllData.preImgSrcList"
                    :key = "index"
                    :backgroundPicUrl="item.imgUrl"
                    @previewImg="previewImgXg(index)"
                  />
                  <p v-if = "xgAllData.preImgSrcList.length <= 0" class="no-img">
                    暂无预览图
                  </p>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="样板间" name="fourth" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">样板间预览列表</p>
              <el-form :model="ybjAllData" label-width="100px" class="demo-dynamic"> 
                <el-form-item label="" class="previewFormItem">
                  <ImgPreview 
                    :isShowDelete = "isShowDelete"
                    v-for = "(item,index) in ybjAllData.preImgSrcList"
                    :key = "index"
                    :backgroundPicUrl="item.imgUrl"
                    @previewImg="previewImgYbj(index)"
                  />
                  <p v-if = "ybjAllData.preImgSrcList.length <= 0" class="no-img">
                    暂无预览图
                  </p>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="规划图" name="five" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">规划图预览列表</p>
              <el-form :model="ghAllData" label-width="100px" class="demo-dynamic"> 
                <el-form-item label="" class="previewFormItem">
                  <ImgPreview 
                    :isShowDelete = "isShowDelete"
                    v-for = "(item,index) in ghAllData.preImgSrcList"
                    :key = "index"
                    :backgroundPicUrl="item.imgUrl"
                    @previewImg="previewImgGh(index)"
                  />
                  <p v-if = "ghAllData.preImgSrcList.length <= 0" class="no-img">
                    暂无预览图
                  </p>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="交通图" name="six" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">交通图预览列表</p>
              <el-form :model="jtAllData" label-width="100px" class="demo-dynamic"> 
                <el-form-item label="" class="previewFormItem">
                  <ImgPreview 
                    :isShowDelete = "isShowDelete"
                    v-for = "(item,index) in jtAllData.preImgSrcList"
                    :key = "index"
                    :backgroundPicUrl="item.imgUrl"
                    @previewImg="previewImgJt(index)"
                  />
                  <p v-if = "jtAllData.preImgSrcList.length <= 0" class="no-img">
                    暂无预览图
                  </p>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="缩略图" name="seven" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">缩略图预览列表</p>
              <el-form :model="slAllData" label-width="100px" class="demo-dynamic"> 
                <el-form-item label="" class="previewFormItem">
                  <ImgPreview 
                    :isShowDelete = "isShowDelete"
                    v-for = "(item,index) in slAllData.preImgSrcList"
                    :key = "index"
                    :backgroundPicUrl="item.imgUrl"
                    @previewImg="previewImgSl(index)"
                  />
                  <p v-if = "slAllData.preImgSrcList.length <= 0" class="no-img">
                    暂无预览图
                  </p>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="楼盘报告" name="fourth" style="padding:20px">
          <div>
            <h5>当前楼盘：金地铂悦</h5>
            <el-form :model="form"   label-width="100px" class="demo-dynamic">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="report_data.form.reportType" @change="formTypeChange">
                <el-checkbox v-for="type in typeList" :label="type.id" :key="type.id">{{type.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form>
              <el-table
                v-loading="is_loading_report_table"
                :data="report_data.reportList"
                border
                tooltip-effect="dark"
                style="width: 100%;font-size:12px!important;text-align:center;margin-top:20px">
                <el-table-column
                  prop="reportName"
                  label="报告名"
                  min-width="100">
                </el-table-column>
                <el-table-column
                  prop="reportType"
                  label="报告类型"
                  min-width="80">
                  <template scope = "scope">
                    <span v-if = "scope.row.reportType === '0'">【施工质量评测报告】</span>
                    <span v-if = "scope.row.reportType === '1'">【周边配套评测报告】</span>
                    <span v-if = "scope.row.reportType === '2'">【规划落实评测报告】</span>
                    <span v-if = "scope.row.reportType === '3'">【规划设计评测报告】</span>
                    <span v-if = "scope.row.reportType === '4'">【景观规划评测报告】</span>
                    <span v-if = "scope.row.reportType === '5'">【楼盘物业评测报告】</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="onlineTime"
                  label="发布时间"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="operateMan"
                  label="发布人"
                  min-width="60">
                </el-table-column>
                <el-table-column
                  min-width="100"
                  label="操作">
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleRepeat(scope.row,1)">
                      查看
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                  v-show="report_data.rowCount>0"
                  style="margin: 0 auto;text-align:center;margin-top:20px"
                  layout="prev, pager, next"
                  :page-size=10
                  :currentPage="report_data.currentPage"
                  @current-change="reportCurrentChange"
                  :total="report_data.rowCount">
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="楼盘设置" name="six">
          <el-form  label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:20px">
              <el-form-item label="是否推荐至首页：">
                <span v-if="form.configList[0].configValue==='' || form.configList[0].configValue===null">--</span>
                <span v-if="form.configList[0].configValue===1">是</span>
                <span v-if="form.configList[0].configValue===0">否</span>
              </el-form-item>
              <el-form-item label="楼盘置顶：">
                <span v-if="form.configList[1].configValue==='' || form.configList[1].configValue===null">--</span>
                <span v-if="form.configList[1].configValue===1">是</span>
                <span v-if="form.configList[1].configValue===0">否</span>
              </el-form-item>
              <el-form-item label="加入严选：">
                <span v-if="form.configList[2].configValue==='' || form.configList[2].configValue===null">--</span>
                <span v-if="form.configList[2].configValue===1">是</span>
                <span v-if="form.configList[2].configValue===0">否</span>
              </el-form-item>
            </el-form>         
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImgSrc" alt="">
    </el-dialog>
  </div>
</template>

<script>
import Subnav from '../Subnav/Subnav'
import message from '../../common/message'
import ImgPreview from '../Common/ImgPreview/ImgPreview'
import coordinatearr from '../../common/coordinate'
export default {
    name:'activitymanagment',
    components:{
      Subnav,
      ImgPreview
    },
    data() {

      return {
        dialogVisible:false,
        dialogImgSrc:'',
        isShowDelete:false,
        activeName:"first",
        activeName2:'first', 
        secondLevel:'楼盘管理',
        threeLevel:'添加楼盘',
        //楼盘基本数据
        houseBasicData:{
          province:'',
          city:'',
          area:'',
          buildingName:'',
          nickName:'',
          desc:'',
          propertyType:'',
          sellStatus:'',
          sellTime:'',
          deliverTime:'',
          avgPrice:'',
          decorationdLevel:'',
          storey:'',
          buildingType:'',
          housingType:'',
          housingProperty:'',
          housingLable:[],
          metro:'',
          loopWire:'',
          buildingAddress:'',
          serviceTime:'',
          trafficRoutes:'',
          serviceCall:'',
          serviceAddress:'',
          propertyFee:'',
          propertyCompany:'',
          developer:'',
          mapLon:'',
          mapLat:'',
          permitPresaleList:[
            {
              permitPresale:'',
              permitPresaleTime:'',
              bindbuiding:''
            }
          ]
        },
        //楼盘附加数据
        infoData:{
          acquireBuilding:'',
          greeningRate:'',
          plotRatio:'',
          buildingArea:'',
          areaCovered:'',
          parkingCount:'',
          schoolDistrict:'',
          videoUrl:'',
          livingCount:'',
          salableNumber:'',
          buildingCount:'',
          developNumber:'',
          waterSupplyType:'',
          powerSupplyType:'',
          heatingMethod:'',
          buildingSchedule:'',
          publicAreaSchedule:'',
          currentStage:'',
          historyBuilding:[]
        },
        
        //户型图数据
        hxAllData:{
          currentPage:1,
          is_show_hx_main:true,
          is_loading_hx_tab:false,
          form:{
            buildingId:'',
            pageIndex:0,
            pageSize:10
          },
          hxTableData:{
            houseList:[],
            rowCount:0
          },
          addNewHouseType:{
            houseLable:[]
          },
          houseLableList:[]
        },
        //实景图数据
        sjAllData:{
          currentPage:1,
          is_loading_sj_tab:false,
          is_show_sj_main:true,
          form:{
            buildingId:'',
            pageIndex:0
          },
          sjTableData:{
            sceneList:[],
            rowCount:0
          },
          addNewSj:{
            sceneId:'',
            takeTime:'',
            imgUrl:''
          }

        },
        //效果图全部数据
        xgAllData:{
          preImgSrcList:[],
        },
        //样板间全部数据
        ybjAllData:{
          preImgSrcList:[],
        },
        //规划图全部数据
        ghAllData:{
          preImgSrcList:[],
        },
        //交通图全部数据
        jtAllData:{
          preImgSrcList:[],
        },
        //缩略图全部数据
        slAllData:{
          preImgSrcList:[],
        },
        
        checkAll:false,
        isIndeterminate:false,
        typeList:[
          {
            id:'0',
            name:'施工质量评测报告'
          },
          
          {
            id:'1',
            name:'周边配套评测报告'
          },
          {
            id:'2',
            name:'规划落实评测报告'
          },
          {
            id:'3',
            name:'规划设计评测报告'
          },
          
          {
            id:'4',
            name:'景观规划评测报告'
          },
          {
            id:'5',
            name:'楼盘物业评测报告'
          },
        ],
        //楼盘报告数据
        report_data:{
          currentPage:1,
          form:{
            buildingId:'',
            reportType:[],
            pageSize:10,
            pageIndex:0
          },
          reportList:[]
        },

        //楼盘设置数据
        form:{
          configList:[
            {configType:0,configValue:''},
            {configType:1,configValue:''},
            {configType:2,configValue:''},
          ]
        },
        
        is_loading_report_table:false,
        is_show_map:false,
        markers:[],
        map:'',
        center:[116.480983, 40.0958],   
        provinceIdsList:[],
        cityIdsList:[],
        houseLableList:[]
      };
    },
    computed:{
                               
    },
    watch:{
     
    },
    created(){
      
      this.getLabelsData(1)
      this.getLabelsData(2)
      this.getProData()
      this.getCityData('')
      this.getInfoData()
      this.getreportdata('')
      this.getsettingdata()
      this.getHxData()
    },
    methods: {
      handleClick(){
            
      },
      imgTabClick(tab){
        let name = tab.name;
        if(name == 'second'){

          if(this.sjAllData.sjTableData.sceneList.length <= 0){
            this.getSjData()
          }
        }else if(name == 'third'){
          if(this.xgAllData.preImgSrcList.length <= 0){
            this.getImgData(4)
          }
        }else if(name == 'fourth'){
          if(this.ybjAllData.preImgSrcList.length <= 0){
            this.getImgData(3)
          }
        }else if(name == 'five'){
          if(this.ghAllData.preImgSrcList.length <= 0){
            this.getImgData(5)
          }
        }else if(name == 'six'){
          if(this.jtAllData.preImgSrcList.length <= 0){
            this.getImgData(1)
          }
        }else if(name == 'seven'){
          if(this.slAllData.preImgSrcList.length <= 0){
            this.getSlData()
          }
        }
      },
      //获取基本信息
      getbasicdata(){
        let _this=this,
        body = {buildingId:this.$route.query.buildingId};
        this.$http('/backstageBuilding/getBuildingInfo',{},{body},{}).then(function(res){
          if(res.data.code == 0){
            _this.houseBasicData = res.data.response;
            
            _this.provinceIdsList.forEach(item => {
              if(item.cityId == _this.houseBasicData.province){
                _this.houseBasicData.province = item.cityName
              }
            })
            _this.cityIdsList.forEach(item => {
              if(item.cityId == _this.houseBasicData.city){
                _this.houseBasicData.city = item.cityName
              }
            })
            
            _this.houseBasicData.housingLable = _this.houseBasicData.housingLable.split(',')
            let _housingLable = _.cloneDeep(_this.houseBasicData.housingLable)

            _this.houseBasicData.housingLable = [];
            _this.houseLableList.forEach(item => {
              _housingLable.forEach(item2 => {
                if(item.lableId == item2){
                  _this.houseBasicData.housingLable.push(item.lableName)
                }
              })
            })
            
            //标注
            _this.center = [_this.houseBasicData.mapLon,_this.houseBasicData.mapLat];
            let content= "<div classname='buildingAdd' style='background:rgba(0,0,0,.7);width: 60px;height: 20px;line-height: 20px;text-align: center;font-size: 12px;color: white;'>楼盘位置</div>";
            let marker = new AMap.Marker({ 
              content,
              position: _this.center,
              map:_this.map
            });
            _this.markers.push(marker)

          }else if(res.data.code == 300){
            _this.$router.push({
              path:'/login'
            })
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      //获取附加信息
      getInfoData(){
        let _this = this,
        body = {buildingId:this.$route.query.buildingId};
        
        this.$http('/backstageBuilding/getBuildingAttachInfo',{},{body},{},'get').then(function(res){
          if(res.data.code == 0){
            _this.infoData = res.data.response;
            _this.infoData.historyBuilding = _this.infoData.historyBuilding.split(',')
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
            _this.getbasicdata() 
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
      getCityData(province = ''){
        let _this = this,
        body = {cityType:2,parentid:province};
        _this.$http('/citis/cityLists',{body},{},{},'post').then(function(res){
          if(res.data.code == 0){
            _this.cityIdsList = res.data.response.cityList 
          }else if(res.data.code == 300){
            _this.$router.push('/login')
          }else{
            message(_this,res.data.message,'warning')
          }
        }).catch(function(err){
          console.log(err)
        })   
      },
      
      //获取标签
      getLabelsData(type){
        let _this = this,
        body = {lableType:type};
        this.$http('/backstageBuilding/getBuildingLable', {}, {body}, {}, 'get').then(function (res) {
          if (res.data.code == 0) {
            if(type == 1){
              _this.houseLableList = res.data.response.lableList;
            }else{
              _this.hxAllData.houseLableList = res.data.response.lableList;
            }
            
          } else if (res.data.code == 300) {
            _this.$router.push('/login')
          } else {
            message(_this,res.data.message,'warning')
          }
        }).catch(function (err) {
          console.log(err)
        })
      },

      //获取户型数据
      getHxData(){
        let _this = this,
        body = _.cloneDeep(this.hxAllData.form);
        body.buildingId = this.$route.query.buildingId;
        if(!body.buildingId){
          return;
        }
        _this.hxAllData.is_loading_hx_tab=true;
        this.$http('/backstageBuilding/getBuildingHouseList',{},{body},{}).then(res => {
          if(res.data.code == 0){
            _this.hxAllData.hxTableData=res.data.response;
          }else{
            message(_this,res.data.message,'warning')
          }
          _this.hxAllData.is_loading_hx_tab=false;
        }).catch(err => {
          console.log(err)
          _this.hxAllData.is_loading_hx_tab=false;
        })
      },
      //户型图页码切换
      hxListCurrentChange(page){
        this.hxAllData.form.pageIndex = page - 1;
        this.getHxData()
      },
      //户型图-查看详情
      hxDetailView(scope){
        let _this = this,
        body = {
          houseId:scope.houseId
        };
       
        this.$http('/backstageBuilding/getBuildingHouse',{},{body},{}).then(res => {
          if(res.data.code == 0){
            _this.hxAllData.addNewHouseType = res.data.response;
            _this.hxAllData.addNewHouseType.houseLable = _this.hxAllData.addNewHouseType.houseLable.split(',')
            
            
            let _houseLable = _.cloneDeep(_this.hxAllData.addNewHouseType.houseLable);
            _this.hxAllData.addNewHouseType.houseLable = [];

            _this.hxAllData.houseLableList.forEach(item => {
              _houseLable.forEach(item2 => {
                if(item2 == item.lableId){
                  _this.hxAllData.addNewHouseType.houseLable.push(item.lableName)
                }
              })
            })

            _this.show_add_hx_form(false)

          }else{
            message(_this,res.data.message,'warning')
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //户型详情-打开关闭
      show_add_hx_form(swit){
        this.hxAllData.is_show_hx_main = swit
      },



      //获取实景图数据
      getSjData(){
        let _this = this,
        body = _.cloneDeep(this.sjAllData.form);
        body.buildingId = this.$route.query.buildingId;
        _this.sjAllData.is_loading_sj_tab = true;
        this.$http('/backstageBuilding/getBuildingSceneList',{},{body},{}).then(res => {
          if(res.data.code == 0){
            _this.sjAllData.sjTableData = res.data.response;
          }
          _this.sjAllData.is_loading_sj_tab = false;
        }).catch(err => {
          console.log(err)
        })
      },
      //实景-页码切换
      sjListCurrentChange(page){
        this.sjAllData.form.pageIndex = page - 1;
        this.getSjData()
      },
      //实景-查看详情
      sjDetailView(scope){
        let _this = this,
        body = {
          sceneId:scope.sceneId
        };
       
        this.$http('/backstageBuilding/getBuildingSceneInfo',{},{body},{}).then(res => {
          if(res.data.code == 0){
            _this.sjAllData.is_show_sj_main = false;
            _this.sjAllData.addNewSj = res.data.response;
          }else{
            message(_this,'获取失败','warning')
          }
        }).catch(err => {
          console.log(err)
        })
      },

      //实景图-预览
      previewImgSj(src){
        this.dialogImgSrc = src;
        this.dialogVisible = true;
      },
      
      //获取缩略图数据
      getSlData(){
        let _this = this,
        body = {
          buildingId: this.$route.query.buildingId
        }
        if(!body.buildingId){
          return;
        }
        this.$http('/backstageBuilding/getBuildingThumbnail',{},{body},{}).then(res => {
          if(res.data.code == 0){
            _this.slAllData.preImgSrcList = res.data.response.imgList;
          }
        }).catch(err => {
          console.log(err)
        })
      },

      //获取交通等图片数据
      getImgData(type){
        let _this = this,
        body = {
          buildingId: this.$route.query.buildingId,
          albumType:type
        }
        if(!body.buildingId){
          return;
        }
        this.$http('/backstageBuilding/getBuildingAlbumList',{},{body},{}).then(res => {
          if(res.data.code == 0){
            if(type == 1){
              _this.jtAllData.preImgSrcList = res.data.response.albumList;
            }else if(type == 5){
              _this.ghAllData.preImgSrcList = res.data.response.albumList;
            }else if(type == 3){
              _this.ybjAllData.preImgSrcList = res.data.response.albumList;
            }else if(type == 4){
              _this.xgAllData.preImgSrcList = res.data.response.albumList;
            }
            
          }
        }).catch(err => {
          console.log(err)
        })
      },


      //户型图预览
      previewImgHx(src){
        this.dialogImgSrc = src;
        this.dialogVisible = true;
      },
      //效果图-预览上传图
      previewImgXg(index){
        this.dialogImgSrc = this.xgAllData.preImgSrcList[index].imgUrl
        this.dialogVisible = true;
      },
      //样板间-预览上传图
      previewImgYbj(index){
        this.dialogImgSrc = this.ybjAllData.preImgSrcList[index].imgUrl
        this.dialogVisible = true;
      },
      //规划图-预览上传图
      previewImgGh(index){
        this.dialogImgSrc = this.ghAllData.preImgSrcList[index].imgUrl
        this.dialogVisible = true;
      },
      //交通图-预览上传图
      previewImgJt(index){
        this.dialogImgSrc = this.jtAllData.preImgSrcList[index].imgUrl
        this.dialogVisible = true;
      },
      //缩略图-预览上传图
      previewImgSl(index){
        this.dialogImgSrc = this.slAllData.preImgSrcList[index].imgUrl
        this.dialogVisible = true;
      },
      


      //获取楼盘报告请求
      getreportdata(reportType = ''){
        let _this = this,
        body = _.cloneDeep(this.report_data.form);
        body.buildingId = this.$route.query.buildingId;
        body.reportType = reportType;
        _this.is_loading_report_table = true;
        this.$http('/backstageBuilding/getBuildingReportList',{},{body},{}).then(res =>{ 
          _this.is_loading_report_table=false;
          if(res.data.code == 0){
            _this.report_data.reportList = res.data.response.reportList;
          }else{
            message(_this,res.data.message,'warning')
          }
        }).catch(function(err){
          _this.is_loading_report_table=false;
          console.log(err)
        })
      },

      handleCheckAllChange(val) {
        this.report_data.form.reportType = this.checkAll ? ['0','1','2','3','4','5'] : [];
        this.isIndeterminate = false;
        let reportType = this.checkAll ? '-1' : ''
        this.getreportdata(reportType)
      },
      //搜索
      formTypeChange(val){
        if(this.report_data.form.reportType.length >= 6){
          this.checkAll = true;
        }else{
          this.checkAll = false;
        }

        let _reportType = _.cloneDeep(this.report_data.form.reportType),
        reportType;
        if(_reportType.length >= 6){
          reportType = '-1'
        }else{
          reportType = _reportType.join(',')
        }
        this.getreportdata(reportType)
      },
      //查看报告
      handleRepeat(scope,type){
        let _this = this,
        body = {
          reportId:scope.reportId,
          reportType:scope.reportType
        };
        if(type == 1){
          let newTab = window.open('about:blank');
          this.$http('/backstageBuilding/getReportInfo',{},{body},{}).then(res =>{ 
            if(res.data.code == 0){
              let url = res.data.response.reportUrl;
              newTab.location.href = url
            }else{
          message(_this,res.data.message,'warning')
          newTab.close()
            }
          }).catch(err =>{
            console.log(err)
            newTab.close()
          })
        }
      },
      //切换页码
      reportCurrentChange(page){
        this.report_data.form.pageIndex = page - 1
      }, 
      //获取楼盘设置请求
      getsettingdata(){
          let _this = this,
          body = {buildingId:this.$route.query.buildingId};
          this.$http('/backstageBuilding/getBuildingConfig',{},{body},{}).then(function(res){
            if(res.data.code == 0){
              let _form = res.data.response.configList;
              _form.forEach((item,index) => {
                if(item.configType == 0){
                  _this.form.configList[0].configValue = item.configValue
                }else if(item.configType == 1){
                  _this.form.configList[1].configValue = item.configValue
                }else if(item.configType == 2){
            _this.form.configList[2].configValue = item.configValue
                }
              })
            }
          }).catch(function(err){
            console.log(err)
          })
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
      this.init_map()
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
.no-img{text-align: center;line-height: 200px;color: #777}
.addtit{text-align: center;margin-bottom: 50px}
.slide-enter-active, .slide-leave-active {
  transition: height 1s
}
.slide-enter,.slide-leave-to{
  height: 0
}
.slide-leave,.slide-enter-to{
  height: 100px;
}
.first_item_1,.first_item_2,.first_item_3{border: 1px solid #eee;margin:20px;}
.first_item_1 .tit,.first_item_2 .tit,.first_item_3 .tit{height: 30px;background: rgba(32,160,255,.8);color: white;line-height: 30px;font-size: 12px;padding: 0px 20px; }

</style>

<style>
  .estateadd  .el-table th>.cell{text-align: center;}
  .estateadd  .el-table .cell{text-align: center;}
  .estateadd .el-upload--picture-card{display:none}
  .previewFormItem .el-form-item__content{padding: 20px;border: 1px solid #ccc;max-width: 840px;min-height: 160px;min-width: 200px}
  .el-table__body-wrapper{overflow:hidden;}
  .el-dialog--tiny{width: 40%}
</style>
