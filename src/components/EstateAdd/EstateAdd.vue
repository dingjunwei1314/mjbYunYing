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
            <el-form :model="add_new_estate_form" :rules="add_new_estate_form_rule" ref="add_new_estate_form_ref" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
               
              <el-form-item label="区域" :required="true">
                <AreaAll :area="add_new_estate_form"></AreaAll> 
              </el-form-item>
              <el-form-item label="标题" style="width:400px" :required="true" prop="buidingName">
                <el-input v-model="add_new_estate_form.buidingName" placeholder="标题" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="楼盘别名" style="width:400px"  prop="nickName">
                <el-input v-model="add_new_estate_form.nickName"  placeholder="楼盘别名" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item label="描述"  prop="desc">
                <el-input v-model="add_new_estate_form.desc" placeholder="描述"  style="width:70%" type="textarea" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item label="物业类型" :required="true" prop="propertyType">
                <el-radio-group v-model="add_new_estate_form.propertyType">
                  <el-radio :label="0">普通住宅</el-radio>
                  <el-radio :label="1">公寓</el-radio>
                  <el-radio :label="2">商住</el-radio>
                  <el-radio :label="3">别墅</el-radio>
                  <el-radio :label="4">其他</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="销售状态" :required="true" prop="sellStatus">
                <el-radio-group v-model="add_new_estate_form.sellStatus">
                  <el-radio :label="0">在售</el-radio>
                  <el-radio :label="1">待售</el-radio>
                  <el-radio :label="2">售罄</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="开盘日期"  prop="sellTime">
                <el-date-picker
                  format="yyyy-MM-dd"
                  v-model="add_new_estate_form.sellTime"
                  type="date"
                  @change="sell_time_change"
                  placeholder="开盘日期">
                </el-date-picker>
                <span style="color:#999;font-size:12px">主要是以开盘说明为准，这里用于开盘日历及列表排序</span>
              </el-form-item>

              <el-form-item label="交房日期"  prop="deliverTime">
                <el-date-picker
                  format="yyyy-MM-dd"
                  v-model="add_new_estate_form.deliverTime"
                  type="date"
                  @change="deliver_time_change"
                  placeholder="交房日期">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="均价"  prop="avgPrice">
                <el-input v-model="add_new_estate_form.avgPrice" placeholder="均价" style="width:100px" auto-complete="off"></el-input>
                <span style="color:#999;font-size:12px">单位是：元/M2,不填写为待定;</span>
              </el-form-item>
             
              <el-form-item label="装修程度" :required="true" prop="decorationdLevel">
                <el-radio-group v-model="add_new_estate_form.decorationdLevel">
                  <el-radio :label="0">毛坯</el-radio>
                  <el-radio :label="1">简单装修</el-radio>
                  <el-radio :label="2">中档装修</el-radio>
                  <el-radio :label="3">高档装修</el-radio>
                  <el-radio :label="4">豪华装修</el-radio>
                  <el-radio :label="5">其它</el-radio>
                </el-radio-group>
              </el-form-item>
              
              <el-form-item label="楼层" :required="true"  prop="storey">
               
                <el-radio-group v-model="add_new_estate_form.storey">
                  <el-radio :label="0">底层</el-radio>
                  <el-radio :label="1">多层</el-radio>
                  <el-radio :label="2">小高层</el-radio>
                  <el-radio :label="3">高层</el-radio>
                  <el-radio :label="4">超高层</el-radio>
                </el-radio-group>
                <span style="color:#999;font-size:12px">1~3为底层，4~7为多层，8~12为小高层，13~25为高层，26层100米以上为超高层</span>
              </el-form-item>
              
              <el-form-item label="建筑类型"  prop="buildingType">
                <el-radio-group v-model="add_new_estate_form.buildingType">
                  <el-radio :label="1">板楼</el-radio>
                  <el-radio :label="2">塔楼</el-radio>
                  <el-radio :label="3">板塔结合</el-radio>
                  <el-radio :label="4">联排别墅</el-radio>
                  <el-radio :label="5">双拼别墅</el-radio>
                  <el-radio :label="6">独栋别墅</el-radio>
                  <el-radio :label="7">叠拼别墅</el-radio>
                </el-radio-group>
              </el-form-item>
              
              <el-form-item label="现房期房" :required="true"  prop="existing">
                <el-radio-group v-model="add_new_estate_form.existing">
                  <el-radio :label="0">现房</el-radio>
                  <el-radio :label="1">准现房</el-radio>
                  <el-radio :label="2">期房</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="产权年限" style="width:200px"  prop="housingProperty">
                <el-input v-model="add_new_estate_form.housingProperty" placeholder="产权年限" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item label="楼盘特色标签"   prop="housingLable">
                <el-checkbox-group v-model="add_new_estate_form.housingLable">
                  <el-checkbox :label="0">地铁沿线房</el-checkbox>
                  <el-checkbox :label="1">学区置业房</el-checkbox>
                  <el-checkbox :label="2">甜蜜新婚房</el-checkbox>
                  <el-checkbox :label="3">投资置业房</el-checkbox>
                  <el-checkbox :label="4">生态景观房</el-checkbox>
                  <el-checkbox :label="5">单身贵族房</el-checkbox>
                </el-checkbox-group>
              </el-form-item>

            </el-form>
          </div>

          <div class="first_item_2">
            <p class="tit">
              楼盘-地理信息
            </p>
            
            <el-form :model="add_new_estate_form"   label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="地铁" style="width:400px"  prop="metro">
                <el-input v-model="add_new_estate_form.metro" placeholder="地铁" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="环线"  prop="loopWire">
                <el-radio-group v-model="add_new_estate_form.loopWire">
                  <el-radio :label="0">一环以内</el-radio>
                  <el-radio :label="1">一至二环</el-radio>
                  <el-radio :label="2">二至三环</el-radio>
                  <el-radio :label="3">三至四环</el-radio>
                  <el-radio :label="4">四至五环</el-radio>
                  <el-radio :label="5">五至六环</el-radio>
                  <el-radio :label="6">六环外</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="楼盘地址" style="width:400px"  prop="buidingAddress">
                <el-input v-model="add_new_estate_form.buidingAddress"  placeholder="楼盘地址" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="接待时间">
                <el-time-select
                  placeholder="开始时间"
                  v-model="add_new_estate_form.serviceTimeBegin"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }">
                </el-time-select>
                <el-time-select
                  placeholder="结束时间"
                  v-model="add_new_estate_form.serviceTimeEnd"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                    minTime: add_new_estate_form.serviceTimeBegin
                  }">
                </el-time-select>
              </el-form-item>
              <el-form-item label="交通路线" style="width:400px"  prop="trafficRoutes">
                <el-input v-model="add_new_estate_form.trafficRoutes" placeholder="交通路线" type="textarea" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="地图" style="width:200px">
                <el-button type="text" @click="show_map()">位置标注</el-button>
                <div id="container" tabindex="0" v-show="is_show_map" style="width:800px;height:400px"></div>
              </el-form-item>
            </el-form>
          </div>

          <div class="first_item_3">
            <p class="tit">
              楼盘-服务信息
            </p>
            
            <el-form :model="add_new_estate_form"  label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="售楼电话" style="width:400px"  prop="serviceCall">
                <el-input v-model="add_new_estate_form.serviceCall" placeholder="售楼电话" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="售楼地址" style="width:400px"  prop="serviceAddress">
                <el-input v-model="add_new_estate_form.serviceAddress" placeholder="售楼地址" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="物业费" style="width:400px"  prop="propertyFee">
                <el-input v-model="add_new_estate_form.propertyFee" placeholder="物业费" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="物业公司" style="width:400px"  prop="propertyCompany">
                <el-input v-model="add_new_estate_form.propertyCompany" placeholder="物业公司" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="楼盘开发商" style="width:600px"  prop="developer">
                <el-input v-model="add_new_estate_form.developer" placeholder="楼盘开发商" auto-complete="off"></el-input>
              </el-form-item>
              <div v-for="(item,index) in add_new_estate_form.permitPresaleList" :key="index">
                <el-form-item label="预售许可证书" style="width:600px">
                  <el-input v-model="item.permitPresale"  placeholder="预售许可证书" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="发证时间" style="width:600px">
                  <el-date-picker
                    format="yyyy-MM-dd"
                    v-model="item.permitPresaleTime"
                    type="date"
                    onPick="pick"
                    placeholder="发证时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="绑定楼栋" style="width:600px">
                  <el-input v-model="item.bindbuiding"  placeholder="绑定楼栋" type="textarea" auto-complete="off"></el-input>
                </el-form-item>
              </div>
        
              <el-form-item label="添加许可证"  style="width:600px">
                <el-button  @click="add_new_permitpresale" type="primary">添加新预售许可证</el-button>
              </el-form-item>

            </el-form>
          </div>
          <div style="text-align:center">
            <el-button  @click="submitForm('add_new_estate_form_ref')" type="primary">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="附加信息" name="second">
          <div class="first_item_1">
            <p class="tit">
              楼盘-其他属性
            </p>
            <el-form :model="additionalInformationForm" :inline="true"  label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="得房率" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.dfl" auto-complete="off"></el-input>
                <span style="color:#999;font-size:12px">例：20%</span>
              </el-form-item>
              <el-form-item label="绿化率" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.lhl" auto-complete="off"></el-input>
                <span style="color:#999;font-size:12px">例：20%</span>
              </el-form-item>
              <el-form-item label="容积率" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.rjl" auto-complete="off"></el-input>
                <span style="color:#999;font-size:12px">例：2.00</span>
              </el-form-item>
              <el-form-item label="建筑面积" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.jzmj" auto-complete="off"></el-input>
                <span style="color:#999;font-size:12px">例：100M2</span>
              </el-form-item>
              <el-form-item label="占地面积" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.zdmj" auto-complete="off"></el-input>
                <span style="color:#999;font-size:12px">例：100M2</span>
              </el-form-item>
              <el-form-item label="车位占比" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.cwzb" auto-complete="off"></el-input>
                <span style="color:#999;font-size:12px">例：1:0.6</span>
              </el-form-item>
              <el-form-item label="学区所属" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.xqss" auto-complete="off"></el-input>

              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-相关视频
            </p>
            <el-form :model="additionalInformationForm"  label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="楼盘视频">
                <el-input style="width:430px" v-model="additionalInformationForm.v_url" auto-complete="off">
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
            <el-form :model="additionalInformationForm" :inline="true" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="规划户数" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.ghhs" auto-complete="off"></el-input>
                <span>户</span>
              </el-form-item>
              <el-form-item label="可售套数" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.ksts" auto-complete="off"></el-input>
                <span>套</span>
              </el-form-item>
              <el-form-item label="楼幢总量" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.ldzl" auto-complete="off"></el-input>
                <span>栋</span>
              </el-form-item>
              <el-form-item label="开发期数" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.kfzq" auto-complete="off"></el-input>
                <span>期</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-配套设施
            </p>
            <el-form :model="additionalInformationForm" :inline="true" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="供水" style="width:600px">
                <el-radio-group v-model="additionalInformationForm.gs">
                  <el-radio :label="1">市政供水</el-radio>
                  <el-radio :label="2">其它</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="供电" style="width:600px">
                <el-radio-group v-model="additionalInformationForm.gd">
                  <el-radio :label="1">市政供电</el-radio>
                  <el-radio :label="2">其它</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="供暖" style="width:600px">
                <el-radio-group v-model="additionalInformationForm.gn">
                  <el-radio :label="1">市政供暖</el-radio>
                  <el-radio :label="2">小区集中供暖</el-radio>
                  <el-radio :label="3">其它</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-施工进度信息
            </p>
            <el-form :model="additionalInformationForm" :inline="true" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="楼体进度" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.ztjd" auto-complete="off"></el-input>
                <span>%</span>
              </el-form-item>
              <el-form-item label="公共区域进度" style="width:300px">
                <el-input style="width:100px" v-model="additionalInformationForm.ggqy" auto-complete="off"></el-input>
                <span>%</span>
              </el-form-item>
              <el-form-item label="当前阶段">
                <el-input style="width:420px" v-model="additionalInformationForm.dqqd" auto-complete="off"></el-input>
               
              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-往期楼盘
            </p>
            <el-form :model="additionalInformationForm"  label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item v-for="(item,index) in additionalInformationForm.id_arr" :key="index" label="添加往期楼盘id">
                <el-input style="width:200px" v-model="item.id" auto-complete="off"></el-input>
              </el-form-item> 
              <el-form-item label="">
                <el-button style="margin-left:150px" type="primary" size="mini" @click="addid">继续添加</el-button>
              </el-form-item>              
            </el-form>
          </div>

          <div>
            <el-button style="margin-left:365px" @click="submitForm2" type="primary">提交</el-button>
            <el-button>取消</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="楼盘相册" name="third">
          <el-tabs v-model="activeName2">
            <el-tab-pane label="户型图" name="first">
              <div v-show="hxAllData.is_show_hx_main">
                <el-button type="primary" style="margin-bottom:10px" @click="show_add_hx_from(false)" size="small">添加户型图</el-button>
                <el-table
                  v-loading="hxAllData.is_loading_hx_tab"
                  :data="hxAllData.hxtableData.list"
                  border
                  tooltip-effect="dark"
                  style="width: 100%;font-size:12px!important;">
                  <el-table-column
                    label="图片"
                    min-width="100">
                    <template scope="scope">
                      <img style="width:100px;height:50px;margin-top:10px;" :src="scope.row.img_src"/>   
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="area"
                    label="面积"
                    min-width="80">
                  </el-table-column>
                  <el-table-column
                    prop="house_type"
                    label="户型"
                    min-width="80">
                  </el-table-column>
                  <el-table-column
                    prop="desc"
                    label="描述"
                    min-width="100">                
                  </el-table-column>
                  <el-table-column
                    prop="sale_state"
                    label="销售状态"
                    min-width="60">
                  </el-table-column>
                  <el-table-column
                    prop="state"
                    min-width="60"
                    label="状态">
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    min-width="80"
                    label="发布时间">
                  </el-table-column>
                  <el-table-column
                    min-width="200"
                    label="操作">
                    <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleHx(scope.$index, scope.row,1)">查看</el-button>
                    <el-button
                      size="small"
                      @click="handleHx(scope.$index, scope.row,2)">编辑</el-button>
                      <el-button
                      size="small"
                      @click="handleHx(scope.$index, scope.row,3)">删除</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleHx(scope.$index, scope.row,4)">下线</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-if="!hxAllData.is_show_hx_main">
                <el-form :model="hxAllData.addNewHouseType" :rules="hxAllData.addNewHouseTypeRule" ref="addNewHouseTypeRef" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px"> 
                  <el-form-item label="标题" style="width:400px" :required="true" prop="title">
                    <el-input :disabled="hxAllData.isdisabled" v-model="hxAllData.addNewHouseType.title" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="户型" style="width:800px" :required="true"  prop="housetype1">
                    <el-select :disabled="hxAllData.isdisabled" :clearable="true" style="width:100px" v-model="hxAllData.addNewHouseType.housetype1" placeholder="室">
                      <el-option label="一室" value="1"></el-option>
                      <el-option label="二室" value="2"></el-option>
                      <el-option label="三室" value="3"></el-option>
                      <el-option label="四室" value="4"></el-option>
                      <el-option label="五室" value="5"></el-option>
                      <el-option label="六室" value="6"></el-option>
                      <el-option label="七室及以上" value="7"></el-option>
                    </el-select>
                    <el-select :disabled="hxAllData.isdisabled" :clearable="true" style="width:100px" v-model="hxAllData.addNewHouseType.housetype2" placeholder="厅">
                      <el-option label="一厅" value="1"></el-option>
                      <el-option label="二厅" value="2"></el-option>
                      <el-option label="三厅" value="3"></el-option>
                      <el-option label="四厅及以上" value="4"></el-option>
                    </el-select>
                    <el-select :disabled="hxAllData.isdisabled" :clearable="true" style="width:100px" v-model="hxAllData.addNewHouseType.housetype3" placeholder="厨">
                      <el-option label="一厨" value="1"></el-option>
                      <el-option label="二厨" value="2"></el-option>
                      <el-option label="三厨及以上" value="3"></el-option>
                    </el-select>
                    <el-select :disabled="hxAllData.isdisabled" :clearable="true" style="width:100px" v-model="hxAllData.addNewHouseType.housetype4" placeholder="卫">
                      <el-option label="一卫" value="1"></el-option>
                      <el-option label="二卫" value="2"></el-option>
                      <el-option label="三卫" value="3"></el-option>
                      <el-option label="四卫及以上" value="4"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="面积区间" :required="true"  prop="areaMin">
                    <el-input :disabled="hxAllData.isdisabled" v-model="hxAllData.addNewHouseType.areaMin" style="width:100px"  auto-complete="off"></el-input>
                    <span style="color:#999;font-size:12px">-</span>
                    <el-input :disabled="hxAllData.isdisabled" v-model="hxAllData.addNewHouseType.areaMax" style="width:100px"  auto-complete="off"></el-input>
                    <span style="color:#999;font-size:12px">如果该户型只有一种面积，面积填入第一个输入框</span>
                  </el-form-item>

                  <el-form-item label="朝向" :required="true"   prop="orientation">
                    <el-select :disabled="hxAllData.isdisabled" :clearable="true"	 v-model="hxAllData.addNewHouseType.orientation" placeholder="朝向">
                      <el-option label="南北" value="1"></el-option>
                      <el-option label="东西" value="2"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="描述"  prop="desc">
                    <el-input :disabled="hxAllData.isdisabled" style="width:300px" v-model="hxAllData.addNewHouseType.desc" type="textarea"  auto-complete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="总价区间" :required="true"  prop="priceMin">
                    <el-input :disabled="hxAllData.isdisabled" v-model="hxAllData.addNewHouseType.priceMin" style="width:100px"  auto-complete="off"></el-input>
                    <span style="color:#999;font-size:12px">-</span>
                    <el-input :disabled="hxAllData.isdisabled" v-model="hxAllData.addNewHouseType.priceMax" style="width:100px"  auto-complete="off"></el-input>
                    <span style="color:#999;font-size:12px">如果该户型只有一种价格，价格填入第一个输入框</span>
                  </el-form-item>

                  <el-form-item label="销售状态" :required="true" prop="sale_state">
                    <el-radio-group :disabled="hxAllData.isdisabled" v-model="hxAllData.addNewHouseType.sale_state">
                      <el-radio :label="1">在售</el-radio>
                      <el-radio :label="2">待售</el-radio>
                      <el-radio :label="3">售罄</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="总套数"  prop="totalNumber">
                    <el-input :disabled="hxAllData.isdisabled" style="width:300px" v-model="hxAllData.addNewHouseType.totalNumber"  auto-complete="off"></el-input>
                  </el-form-item>

                  <el-form-item  label="可售套数"  prop="saleNumber">
                    <el-input :disabled="hxAllData.isdisabled" style="width:300px" v-model="hxAllData.addNewHouseType.saleNumber"  auto-complete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="待售套数"  prop="notsaleNumber">
                    <el-input :disabled="hxAllData.isdisabled" style="width:300px" v-model="hxAllData.addNewHouseType.notsaleNumber"  auto-complete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="套数占比"  prop="salepercent">
                    <el-input :disabled="hxAllData.isdisabled" style="width:300px" v-model="hxAllData.addNewHouseType.salepercent"  auto-complete="off"></el-input>
                  </el-form-item>
                  
                  <el-form-item label="标签" :required="true"  prop="tags">
                    <el-checkbox-group :disabled="hxAllData.isdisabled" v-model="hxAllData.addNewHouseType.tags">
                      <el-checkbox :label="1">南北通透</el-checkbox>
                      <el-checkbox :label="2">干湿分离</el-checkbox>
                      <el-checkbox :label="3">动静分离</el-checkbox>
                      <el-checkbox :label="4">全明户型</el-checkbox>
                      <el-checkbox :label="5">私密性好</el-checkbox>
                      <el-checkbox :label="6">格局方正</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>

                  <el-form-item label="上传">
                    <el-dialog v-model="hxAllData.dialogVisible" size="tiny">
                      <img width="100%" :src="hxAllData.dialogImageUrl" alt="">
                    </el-dialog>
                    <el-upload
                      class="upload-demo"
                      ref="uploadhx"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-change="hx_updata_change"
                      :on-preview="handlePreviewhx"
                      :on-remove="handleRemovehx"
                      :file-list="hxAllData.fileList"
                      list-type="picture-card"
                      :auto-upload="false">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div style="margin-bottom:50px">
                  <el-button style="margin-left:300px" type="primary" @click="hx_updata_sure('addNewHouseTypeRef')">确认</el-button>
                  <el-button @click="show_add_hx_from(true)">取消</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="实景图" name="second">
              <div v-show="sjAllData.is_show_sj_main">
                <el-button type="primary" style="margin-bottom:10px" @click="show_add_sj_from(false)" size="small">添加实景图</el-button>
                <el-table
                  :data="sjAllData.sjtableData.list"
                  border
                  v-loading="sjAllData.is_loading_sj_tab"
                  tooltip-effect="dark"
                  style="width: 100%;font-size:12px!important;">
                  <el-table-column
                    label="图片"
                    min-width="100">
                    <template scope="scope">
                      <img style="width:100px;height:50px;margin-top:10px;" v-if="scope.row.img_src[0]" :src="scope.row.img_src[0]"/> 
                      <img style="width:100px;height:50px;margin-top:10px;" v-if="scope.row.img_src[1]" :src="scope.row.img_src[1]"/> 
                      <img style="width:100px;height:50px;margin-top:10px;" v-if="scope.row.img_src[2]" :src="scope.row.img_src[2]"/>   
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    min-width="80"
                    label="拍摄时间">
                  </el-table-column>
                  <el-table-column
                    min-width="100"
                    label="操作">
                    <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleSj(scope.$index, scope.row,1)">查看</el-button>
                    <el-button
                      size="small"
                      @click="handleSj(scope.$index, scope.row,2)">编辑</el-button>
                      <el-button
                      size="small"
                      @click="handleSj(scope.$index, scope.row,3)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-if="!sjAllData.is_show_sj_main">
                <el-form :model="sjAllData.addNewsjType" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px"> 
                  <el-form-item label="拍摄时间" style="width:400px" :required="true" prop="title">
                    <el-date-picker
                      :disabled="sjAllData.isdisabled"
                      v-model="sjAllData.addNewsjType.time"
                      type="date"
                      placeholder="拍摄时间">
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item label="上传">
                    <el-dialog v-model="sjAllData.dialogVisible" size="tiny">
                      <img width="100%" :src="sjAllData.dialogImageUrl" alt="">
                    </el-dialog>
                    <el-upload
                      class="upload-demo"
                      ref="uploadhx"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-change="sj_updata_change"
                      :on-preview="handlePreviewsj"
                      :on-remove="handleRemovesj"
                      :file-list="sjAllData.fileList"
                      list-type="picture-card"
                      :auto-upload="false">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div style="margin-bottom:50px">
                  <el-button style="margin-left:300px" type="primary" @click="sj_updata_sure()">确认</el-button>
                  <el-button @click="show_add_sj_from(true)">取消</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="效果图" name="third" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">效果图</p>
              <el-dialog v-model="dialogVisible1" size="tiny">
                <img width="100%" :src="dialogImageUrl1" alt="">
              </el-dialog>
              <el-upload
                class="upload-demo"
                ref="upload1"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview1"
                :on-remove="handleRemove(1)"
                :file-list="fileList1"
                list-type="picture-card"
                :auto-upload="false">
                <i class="el-icon-plus"></i>
              </el-upload>
              <div>
                <el-button size="small" type="success" @click="submitUpload(1)">
                  确认上传
                </el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="样板间" name="fourth">
              <div v-show="ybjAllData.is_show_ybj_main">
                <el-button type="primary" style="margin-bottom:10px" @click="show_add_ybj_from(false)" size="small">添加样板间</el-button>
                <el-table
                  :data="ybjAllData.ybjtableData.list"
                  border
                   v-loading="ybjAllData.is_loading_ybj_tab"
                  tooltip-effect="dark"
                  style="width: 100%;font-size:12px!important;">
                  <el-table-column
                    label="图片"
                    min-width="100">
                    <template scope="scope">
                      <img style="width:100px;height:50px;margin-top:10px;" v-if="scope.row.img_src[0]" :src="scope.row.img_src[0]"/> 
                      <img style="width:100px;height:50px;margin-top:10px;" v-if="scope.row.img_src[1]" :src="scope.row.img_src[1]"/> 
                      <img style="width:100px;height:50px;margin-top:10px;" v-if="scope.row.img_src[2]" :src="scope.row.img_src[2]"/>   
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="title"
                    min-width="80"
                    label="标题">
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    min-width="80"
                    label="拍摄时间">
                  </el-table-column>
                  <el-table-column
                    min-width="100"
                    label="操作">
                    <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleYbj(scope.$index, scope.row,1)">查看</el-button>
                    <el-button
                      size="small"
                      @click="handleYbj(scope.$index, scope.row,2)">编辑</el-button>
                      <el-button
                      size="small"
                      @click="handleYbj(scope.$index, scope.row,3)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-if="!ybjAllData.is_show_ybj_main">
                <el-form :model="ybjAllData.addNewybjType" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px"> 
                  <el-form-item label="标题" :required="true" prop="name">
                     <el-input :disabled="ybjAllData.isdisabled" v-model="ybjAllData.addNewybjType.name" style="width:195px"  auto-complete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="拍摄时间" style="width:400px" :required="true" prop="time">
                    <el-date-picker
                      :disabled="ybjAllData.isdisabled"
                      v-model="ybjAllData.addNewybjType.time"
                      type="date"
                      placeholder="拍摄时间">
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item label="上传">
                    <el-dialog v-model="ybjAllData.dialogVisible" size="tiny">
                      <img width="100%" :src="ybjAllData.dialogImageUrl" alt="">
                    </el-dialog>
                    <el-upload
                      class="upload-demo"
                      ref="uploadhx"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-change="ybj_updata_change"
                      :on-preview="handlePreviewybj"
                      :on-remove="handleRemoveybj"
                      :file-list="ybjAllData.fileList"
                      list-type="picture-card"
                      :auto-upload="false">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div style="margin-bottom:50px">
                  <el-button style="margin-left:300px" type="primary" @click="ybj_updata_sure">确认</el-button>
                  <el-button @click="show_add_ybj_from(true)">取消</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="规划图" name="five" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">规划图</p>
              <el-dialog v-model="dialogVisible2" size="tiny">
                <img width="100%" :src="dialogImageUrl2" alt="">
              </el-dialog>
              <el-upload
                class="upload-demo"
                ref="upload2"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview2"
                :on-remove="handleRemove(2)"
                :file-list="fileList2"
                list-type="picture-card"
                :auto-upload="false">
                <i class="el-icon-plus"></i>
              </el-upload>
              <div>
                <el-button size="small" type="success" @click="submitUpload(2)">
                  确认上传
                </el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="交通图" name="six" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">交通图</p>
              <el-dialog v-model="dialogVisible3" size="tiny">
                <img width="100%" :src="dialogImageUrl3" alt="">
              </el-dialog>
              <el-upload
                class="upload-demo"
                ref="upload3"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview3"
                :on-remove="handleRemove(3)"
                :file-list="fileList3"
                list-type="picture-card"
                :auto-upload="false">
                <i class="el-icon-plus"></i>
              </el-upload>
              <div>
                <el-button size="small" type="success" @click="submitUpload(3)">
                  确认上传
                </el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="缩略图" name="seven" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">缩略图</p>
              <el-dialog v-model="dialogVisible4" size="tiny">
                <img width="100%" :src="dialogImageUrl4" alt="">
              </el-dialog>
              <el-upload
                class="upload-demo"
                ref="upload4"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview4"
                :on-remove="handleRemove(4)"
                :file-list="fileList4"
                list-type="picture-card"
                :auto-upload="false">
                <i class="el-icon-plus"></i>
              </el-upload>
              <div>
                <el-button size="small" type="success" @click="submitUpload(4)">
                  确认上传
                </el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="楼盘报告" name="fourth" style="padding:20px">
          <div v-show="!is_show_updata_repeat_swi">
            <el-button type="primary" @click="is_show_updata_repeat(true)">添加报告</el-button>
            <el-table
              v-loading="is_loading_repeat_tab"
              :data="repeat_data.list"
              border
              tooltip-effect="dark"
              style="width: 100%;font-size:12px!important;text-align:center;margin-top:20px">
              <el-table-column
                prop="name"
                label="报告名"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="type"
                label="报告类型"
                min-width="80">
              </el-table-column>
              <el-table-column
                prop="state"
                label="状态"
                min-width="60">
              </el-table-column>
              <el-table-column
                prop="time"
                label="发布时间"
                width="150">
              </el-table-column>
              <el-table-column
                prop="reporter"
                label="发布人"
                min-width="60">
              </el-table-column>
              <el-table-column
                min-width="100"
                label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="handleRepeat(scope.$index, scope.row,1)">
                    上线
                  </el-button>
                  <el-button
                  size="small"
                  @click="handleRepeat(scope.$index, scope.row,2)">
                    预览
                  </el-button>
                  <el-button
                  size="small"
                  @click="handleRepeat(scope.$index, scope.row,3)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show="is_show_updata_repeat_swi">
            <el-form  :model="add_new_repeat_form"  label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:20px">
              <el-form-item label="报告名称">
                <el-input style="width:300px" v-model="add_new_repeat_form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="报告类型" style="width:300px">
                <el-select v-model="add_new_repeat_form.type" placeholder="报告类型">
                  <el-option  label="工程质量" value="1"></el-option>
                  <el-option  label="规划" value="2"></el-option>
                  <el-option  label="规划落实" value="3"></el-option>
                  <el-option  label="周边配套" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上传报告" style="width:300px">
                <el-button type="primary" size="mini" @click="begin_updata">上传报告</el-button>
                <input type="file" ref="updata_repeat_input" style="display:none">
              </el-form-item>
            </el-form>
            <el-button type="primary" style="margin-left:230px" @click="sure_updata">保存</el-button>
            <el-button type="primary"  @click="is_show_updata_repeat(false)">取消</el-button>
          </div>
          <Pdfonline :isshowpdf="isshowpdf" :pdfsrc="pdfsrc" @close="closepdf"></Pdfonline>
        </el-tab-pane>
        <el-tab-pane label="楼盘评分" name="five">
          <div v-show="!is_show_score_swi">
            <el-button type="primary" @click="is_show_score(true)">更新评分</el-button>
            <el-table
              v-loading="is_loading_score_tab"
              :data="score_data.list"
              border
              tooltip-effect="dark"
              style="font-size:12px!important;margin-top:20px">
              <el-table-column
                prop="time"
                label="评分时间"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="gczl"
                label="工程质量"
                min-width="60">
              </el-table-column>
              <el-table-column
                prop="ghsj"
                label="规划设计"
                width="150">
              </el-table-column>
              <el-table-column
                prop="ghls"
                label="规划落实"
                min-width="60">
              </el-table-column>
              <el-table-column
                prop="zbpt"
                label="周边配套"
                min-width="60">
              </el-table-column>
              <el-table-column
                prop="reporter"
                label="发布人"
                min-width="60">
              </el-table-column>
              <el-table-column
                min-width="100"
                label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="handleScore(scope.$index, scope.row,1)">
                    查看
                  </el-button>
                  <el-button
                  size="small"
                  @click="handleScore(scope.$index, scope.row,2)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="is_show_score_swi">
            <el-form  :model="add_new_score_form" :rules="add_new_score_form_rule" ref="add_new_score_form_ref" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:20px">
              <el-form-item label="工程质量"  prop="gczl">
                <el-input style="width:300px" v-model="add_new_score_form.gczl" auto-complete="off"></el-input>
                <span style="font-size:12px;color:#999;">例：8或8.2</span>
              </el-form-item>
              <el-form-item label="评分概述">
                <el-input style="width:500px" type="textarea" v-model="add_new_score_form.gczl_detail" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="规划设计" prop="ghsj">
                <el-input style="width:300px" v-model="add_new_score_form.ghsj" auto-complete="off"></el-input>
                <span style="font-size:12px;color:#999;">例：8或8.2</span>
              </el-form-item>
              <el-form-item label="评分概述">
                <el-input style="width:500px" type="textarea"  v-model="add_new_score_form.ghsj_detail" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="规划落实" prop="ghls">
                <el-input style="width:300px" v-model="add_new_score_form.ghls" auto-complete="off"></el-input>
                <span style="font-size:12px;color:#999;">例：8或8.2</span>
              </el-form-item>
              <el-form-item label="评分概述">
                <el-input style="width:500px" type="textarea"  v-model="add_new_score_form.ghls_detail" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="周边配套" prop="zbpt">
                <el-input style="width:300px" v-model="add_new_score_form.zbpt" auto-complete="off"></el-input>
                <span style="font-size:12px;color:#999;">例：8或8.2</span>
              </el-form-item>
              <el-form-item label="评分概述">
                <el-input style="width:500px" type="textarea" v-model="add_new_score_form.zbpt_detail" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align:center;margin-bottom:50px;width:80%">
              <el-button type="primary"  @click="sure_add_score('add_new_score_form_ref')">保存</el-button>
              <el-button type="primary"  @click="is_show_score(false)">取消</el-button>
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="楼盘设置" name="six">
          <el-form  :model="house_setting_form" label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:20px">
              <el-form-item label="是否推荐至首页"  prop="gczl">
                <el-radio-group v-model="house_setting_form.tjsy">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="首页排序">
                <el-input  style="width:200px" v-model="house_setting_form.stpx" auto-complete="off"></el-input>
                <span style="color:#999;font-size:12px;">数值越小乐靠前</span>
              </el-form-item>
              <el-form-item label="楼盘置顶">
                <el-checkbox v-model="house_setting_form.lpzd">置顶</el-checkbox>
              </el-form-item>
              <el-form-item label="加入严选">
                <el-radio-group v-model="house_setting_form.jryx">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="合作买房" prop="zbpt">
                <el-radio-group v-model="house_setting_form.hzmf">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="租金返还">
                <el-radio-group v-model="house_setting_form.zjfh">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div style="text-align:center;margin-bottom:50px;width:80%">
              <el-button type="primary"  @click="house_setting_btn()">保存</el-button>
            </div>
        </el-tab-pane>
      </el-tabs>
    </div>    
  </div>
</template>

<script>
import formatTime from '../../common/formatTime'
import Pdfonline from '../Common/Pdfonline/Pdfonline'
import AreaAll from '../Common/AreaAll/AreaAll'
import Subnav from '../Subnav/Subnav'
import coordinatearr from '../../common/coordinate'
export default {
    name:'activitymanagment',
    components:{
      Subnav,
      AreaAll,
      Pdfonline
    },
    data() {
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
      var scopeValidateGczl = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请为工程质量评分'));
        }else{
          callback();
        }
      };
      var scopeValidateGhsj = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请为规划设计评分'));
        }else{
          callback();
        }
      };
      var scopeValidateGhls = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请为规划落实评分'));
        }else{
          callback();
        }
      };
      var scopeValidateZbpt = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请为周边配套评分'));
        }else{
          callback();
        }
      }; 
      var validatehxTitle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入标题'));
        }else{
          callback();
        }
      }; 
      var validatehxHousetype1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入户型'));
        }else{
          callback();
        }
      };  
      var validatehxAreaMin = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入面积区间'));
        }else{
          callback();
        }
      }; 
      var validatehxOrientation = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入朝向'));
        }else{
          callback();
        }
      }; 
      var validatehxPriceMin = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入价格区间'));
        }else{
          callback();
        }
      }; 
      var validatehxSale_state = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入销售状态'));
        }else{
          callback();
        }
      };
      var validatehxTags = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择标签'));
        }else{
          callback();
        }
      };
      return {
        coordinatearr,
        secondLevel:'楼盘管理',
        threeLevel:'添加楼盘',
        is_show_map:false,
        activeName:"first",
        activeName2:'first',

        //添加新的楼盘基本信息表单
        add_new_estate_form:{
          province:'',
          city:'',
          area:'',
          buidingName:'',
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
          existing:'',
          housingProperty:'',
          housingLable:[],
          metro:'',
          loopWire:'',
          buidingAddress:'',
          serviceTimeBegin:'',
          serviceTimeEnd:'',
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

        //楼盘报告数据
        repeat_data:{
          list:[]
        },
        //添加新的报告表单
        add_new_repeat_form:{
          name:'',
          type:'',
        },
        is_loading_repeat_tab:false,//是否加载报告表格loading
        is_show_updata_repeat_swi:false,//是否显示添加报告
        pdfsrc:'/static/pdf.pdf',
        isshowpdf:false,


        //楼盘评分数据
        score_data:{
          list:[]
        },
        //添加新的评分表单
        add_new_score_form:{
          gczl:'',
          gczl_detail:'',
          ghsj:'',
          ghsj_detail:'',
          ghls:'',
          ghls_detail:'',
          zbpt:'',
          zbpt_detail:''
        },
        is_loading_score_tab:false,//报告表格loading
        is_show_score_swi:false,//是否显示添加评分
        //楼盘评分规则
        add_new_score_form_rule:{
          gczl: [
            { validator: scopeValidateGczl, trigger: 'blur' }
          ],
          ghsj: [
            { validator: scopeValidateGhsj, trigger: 'blur' }
          ],
          ghls: [
            { validator: scopeValidateGhls, trigger: 'blur' }
          ],
          zbpt: [
            { validator: scopeValidateZbpt, trigger: 'blur' }
          ],
        },


        //户型图全部数据
        hxAllData:{
          dialogVisible:false,
          isdisabled:false,
          is_show_hx_main:true,
          is_loading_hx_tab:false,
          dialogImageUrl:'',
          fileList:[],
          updatafiles:[],
          addNewHouseType:{
            title:'',
            housetype1:'',
            housetype2:'',
            housetype3:'',
            housetype4:'',
            areaMin:'',
            areaMax:'',
            orientation:'',
            desc:'',
            priceMin:'',
            priceMax:'',
            sale_state:'',
            totalNumber:'',
            saleNumber:'',
            notsaleNumber:'',
            salepercent:'',
            tags:[],
          },
          addNewHouseTypeRule:{
            title: [
              { validator: validatehxTitle, trigger: 'blur' }
            ],
            housetype1: [
              { validator: validatehxHousetype1, trigger: 'blur' }
            ], 
            areaMin:[
              { validator: validatehxAreaMin, trigger: 'blur' }
            ],
            orientation:[
              { validator: validatehxOrientation, trigger: 'blur' }
            ],
            priceMin:[
              { validator: validatehxPriceMin, trigger: 'blur' }
            ],
            sale_state:[
              { validator: validatehxSale_state, trigger: 'blur' }
            ],
            tags:[
              { validator: validatehxTags, trigger: 'blur' }
            ],
          },
          hxtableData:{
            list:[]
          },
        },


        //实景图全部数据
        sjAllData:{
          dialogVisible:false,
          isdisabled:false,
          dialogImageUrl:'',
          fileList:[],
          updatafiles:[],
          is_loading_sj_tab:false,
          is_show_sj_main:true,
          sjtableData:{
            list:[]
          },
          addNewsjType:{
            time:''
          }
        },


        //样板间全部数据
        ybjAllData:{
          dialogVisible:false,
          isdisabled:false,
          dialogImageUrl:'',
          fileList:[],
          updatafiles:[],
          is_loading_ybj_tab:false,
          is_show_ybj_main:true,
          ybjtableData:{
            list:[]
          },
          addNewybjType:{
            name:'',
            time:'',
          }
        },


        is_score_form_disabled:false,
        //楼盘设置表单
        house_setting_form:{
          tjsy:'',
          lpzd:'',
          stpx:'',
          jryx:'',
          hzmf:'',
          zjfh:''
        },
        
        dialogVisible1:false,
        dialogImageUrl1:'',
        fileList1:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        dialogVisible2:false,
        dialogImageUrl2:'',
        fileList2:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        dialogVisible3:false,
        dialogImageUrl3:'',
        fileList3:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        dialogVisible4:false,
        dialogImageUrl4:'',
        fileList4:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        
        //添加新的楼盘附加信息表单
        additionalInformationForm:{
          dfl:'',
          lhl:'',
          rjl:'',
          jzmj:'',
          zdmj:'',
          cwzb:'',
          xqss:'',
          v_url:'',
          ghhs:'',
          ksts:'',
          ldzl:'',
          kfzq:'',
          gs:'',
          gd:'',
          gn:'',
          ztjd:'',
          ggqy:'',
          dqqd:'',
          id_arr:[{id:''},{id:''}]
        },
        //添加新的楼盘基本信息表单验证规则
        add_new_estate_form_rule: {
          buidingName: [
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
          existing: [
            { validator: validateExisting, trigger: 'blur' }
          ],
        },
        //地图标记以及中心位置
        markers:[],
        center:[116.480983, 40.0958],      
      };
    },
    computed:{
                               
    },
    watch:{
      'add_new_estate_form.sheng':{
        handler:function(val){
          for(let i in this.coordinatearr){
            if(this.coordinatearr[i].pro==val){
              this.center=this.coordinatearr[i].coordinate
            }
          }
          console.log(this.center)
          this.init_map()
        }
      }
    },
    created(){
      this.getrepeatdata()
      this.getscoredata()
      this.gethxdata()
      this.getsjdata()
      this.getybjdata()
    },
    methods: {
      sell_time_change(val){
        this.add_new_estate_form.sellTime=val
      },
      deliver_time_change(val){
        this.add_new_estate_form.deliverTime=val
      },
      //添加新预售许可证
      add_new_permitpresale(){
        this.add_new_estate_form.permitPresaleList.push({permitPresale:'',permitPresaleTime:'',bindbuiding:''})
      },
      //楼盘基本信息提交
      submitForm(formName) {
        
        console.log(this.add_new_estate_form)
        let _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(_this.add_new_estate_form)
            _this.$confirm('确认提交吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              for(let i in this.add_new_estate_form.permitPresaleList){
                this.add_new_estate_form.permitPresaleList[i].permitPresaleTime=formatTime(this.add_new_estate_form.permitPresaleList[i].permitPresaleTime)
              }
              this.$http('/add',{body:_this.add_new_estate_form},{},{},'post').then(function(res){
                if(res.data.code==0){
                  if(res.data.response.status==1){
                    _this.$message({
                      message: res.data.response.message,
                      type: 'warning'
                    });
                  }else{
                    _this.$message({
                      message: res.data.response.message,
                      type: 'warning'
                    });
                  }
                }else{
                  _this.$message({
                    message: res.data.message,
                    type: 'warning'
                  });
                }
              }).catch(function(err){
                console.log(err)
                _this.$message({
                  message: '请求失败，请稍后重试',
                  type: 'warning'
                });
              })
            
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '已取消提交'
              });          
            });

          } else {
            _this.$message({
              type: 'info',
              message: '有必填项未填'
            });
            return false;
          }
        });
      },





      //获取楼盘评分请求
      getscoredata(){
        let _this=this;
        _this.is_loading_score_tab=true;
        this.$http('/score').then(function(res){
          console.log(res)
          _this.is_loading_score_tab=false;
          if(res.data.code==1000){
            _this.score_data=res.data.data;
          }
        }).catch(function(err){
          _this.is_loading_score_tab=false;
          console.log(err)
        })
      },
      //查看删除评分
      handleScore(index,scope,type){
        let _this=this;
        if(type==1){
          this.is_show_score_swi=true;
          this.is_score_form_disabled=true;
          for(let i in this.add_new_score_form){
            this.add_new_score_form[i]=scope[i]
          }
        }else{
          _this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.getscoredata()
            _this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        }
      },
      //确认更新或者保存评分
      sure_add_score(formName){
        let _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$confirm('确认提交吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              _this.$message({
                type: 'success',
                message: '提交成功!'
              });
              _this.is_show_score_swi=false;
              _this.getscoredata()
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '已取消提交'
              });          
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //添加新的评分
      is_show_score(swi){
        this.is_show_score_swi=swi;
        if(true){
          for(let i in this.add_new_score_form){
            this.add_new_score_form[i]='';
          }
          this.is_score_form_disabled=false;
        }
      },



      //获取楼盘报告请求
      getrepeatdata(){
        let _this=this;
        _this.is_loading_repeat_tab=true;
        this.$http('/repeat').then(function(res){
          console.log(res)
          _this.is_loading_repeat_tab=false;
          if(res.data.code==1000){
            _this.repeat_data=res.data.data;
          }
        }).catch(function(err){
          _this.is_loading_repeat_tab=false;
          console.log(err)
        })
      },
      //添加新的报告
      is_show_updata_repeat(swi){
        this.is_show_updata_repeat_swi=swi;
      },
      //关闭pdf
      closepdf(){
          this.isshowpdf = false
      },
      //上线查看删除报告
      handleRepeat(index,scope,type){
        let _this=this;
        console.log(scope)
        if(type==2){
          this.isshowpdf=true
        }else if(type==3){
          _this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.getrepeatdata()
            _this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        }else{
          _this.$confirm('确认上线/下线吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.getrepeatdata()
            _this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消'
            });          
          });
        }
      },
      //确认添加报告
      sure_updata(){
        let _this=this;
        if(this.add_new_repeat_form.name==''){
          _this.$message({
            type: 'warning',
            message: '请填写报告名!'
          });
          return;
        }
        if(this.add_new_repeat_form.type==''){
          _this.$message({
            type: 'warning',
            message: '请选择报告类型!'
          });
          return;
        }
        this.is_show_updata_repeat_swi=false;
        this.getrepeatdata()
      },



      //获取户型数据请求
      gethxdata(){
        let _this=this;
        _this.hxAllData.is_loading_hx_tab=true;
        this.$http('/hxlist').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.hxAllData.hxtableData=res.data.data;
          }
          _this.hxAllData.is_loading_hx_tab=false;
        }).catch(function(err){
          console.log(err)
        })
      },
      //获取户型图详情
      gethxDetaildata(){
        let _this=this;
      
        this.$http('/hxdetail').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.hxAllData.addNewHouseType=res.data.data;
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      //添加户型图
      show_add_hx_from(swi){
        this.hxAllData.is_show_hx_main=swi;
        this.hxAllData.updatafiles=[];
        for(let i in this.hxAllData.addNewHouseType){
          if(i=='tags'){
            this.hxAllData.addNewHouseType[i]=[]
          }else{
            this.hxAllData.addNewHouseType[i]=''
          }
        }
      },
      //查看编辑删除上下线户型图
      handleHx(index,scope,type){
        let _this=this;
        if(type==2){
          this.hxAllData.isdisabled=false;
          this.hxAllData.is_show_hx_main=false;
          this.gethxDetaildata()
        }else if(type==1){
          this.hxAllData.isdisabled=true;
          this.hxAllData.is_show_hx_main=false;
          this.gethxDetaildata()
        }else if(type==3){
          _this.$confirm('确认删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              _this.gethxdata()
              _this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
        }else{
            _this.$confirm('确认上线/下线吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              _this.gethxdata()
              _this.$message({
                type: 'success',
                message: '操作成功!'
              });
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '已取消'
              });          
            });
        }
      },
      //确认修改添加户型图
      hx_updata_sure(formName){
        if(this.hxAllData.isdisabled){
          this.hxAllData.is_show_hx_main=true;
          return;
        }
        let _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.hxAllData.updatafiles);
            _this.hxAllData.is_show_hx_main=true;
            _this.gethxdata();
            _this.$message({
              type: 'success',
              message: '已添加'
            });   
            let param = new FormData(); 
            if(_this.hxAllData.updatafiles.length>0){
              for(let i in _this.hxAllData.updatafiles){
                param.append('hximg',_this.hxAllData.updatafiles[i].raw.name)
              }
            }
            console.log(param.get('hximg'));
            for(let j in _this.hxAllData.addNewHouseType){
              param.append(j,_this.hxAllData.addNewHouseType[j])
            }
            console.log(param.get('title'));
            let config = {
              'Content-Type':'multipart/form-data'
            };  //添加请求头
            this.$http('/xxx',{},param,config,'post')
            .then(response=>{
              console.log(response.data);
            })      
          } else {
            _this.$message({
              type: 'warning',
              message: '有必填项未填写'
            });
            console.log('error submit!!');
            return false;
          }
        })
      }, 

      

      //获取实景图数据请求
      getsjdata(){
        let _this=this;
        _this.sjAllData.is_loading_sj_tab=true;
        this.$http('/sjlist').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.sjAllData.sjtableData=res.data.data;
          }
          _this.sjAllData.is_loading_sj_tab=false;
        }).catch(function(err){
          console.log(err)
        })
      },
      //获取实景图详情
      getsjDetaildata(){
        let _this=this;
        _this.sjAllData.is_loading_sj_tab=true;
        this.$http('/sjdetail').then(function(res){
          console.log(res)
           _this.sjAllData.is_loading_sj_tab=false;
          if(res.data.code==1000){
            _this.sjAllData.addNewsjType=res.data.data;
          }
        }).catch(function(err){
           _this.sjAllData.is_loading_sj_tab=false;
          console.log(err)
        })
      },
      //显示添加实景图
      show_add_sj_from(swi){
        this.sjAllData.is_show_sj_main=swi;
        this.sjAllData.updatafiles=[];
        for(let i in this.sjAllData.addNewsjType){
          if(i=='tags'){
            this.sjAllData.addNewsjType[i]=[]
          }else{
            this.sjAllData.addNewsjType[i]=''
          }
        }
      },
      //查看编辑删除实景图
      handleSj(index,scope,type){
        let _this=this;
        if(type==1){
          this.sjAllData.isdisabled=true;
          this.sjAllData.is_show_sj_main=false;
          this.getsjDetaildata()
        }else if(type==2){
          this.sjAllData.isdisabled=false;
          this.sjAllData.is_show_sj_main=false;
          this.getsjDetaildata()
        }else{
          _this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.getsjDetaildata()
            _this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消'
            });          
          });
        }
      },
      //确认更新添加实景图
      sj_updata_sure(){
        if(this.sjAllData.isdisabled){
          this.sjAllData.is_show_sj_main=true;
          return;
        }
        let _this=this;
        if(_this.sjAllData.addNewsjType.time==''){
          _this.$message({
            type: 'warning',
            message: '请选择时间'
          });
          return;
        }
        _this.sjAllData.is_show_sj_main=true;
        _this.getsjdata();
        _this.$message({
          type: 'success',
          message: '操作成功'
        });  
      },
      //删除预览图
      handleRemovesj(){

      },
      


      //获取样板间数据请求
      getybjdata(){
        let _this=this;
        _this.ybjAllData.is_loading_ybj_tab=true;
        this.$http('/ybjlist').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.ybjAllData.ybjtableData=res.data.data;
          }
          _this.ybjAllData.is_loading_ybj_tab=false;
        }).catch(function(err){
          console.log(err)
        })
      },
      //获取实景图详情
      getybjDetaildata(){
        let _this=this;
        _this.ybjAllData.is_loading_ybj_tab=true;
        this.$http('/ybjdetail').then(function(res){
          console.log(res)
           _this.ybjAllData.is_loading_ybj_tab=false;
          if(res.data.code==1000){
            _this.ybjAllData.addNewybjType=res.data.data;
          }
        }).catch(function(err){
           _this.ybjAllData.is_loading_ybj_tab=false;
          console.log(err)
        })
      },
      //显示添加样板间
      show_add_ybj_from(swi){
        this.ybjAllData.is_show_ybj_main=swi;
        this.ybjAllData.updatafiles=[];
        for(let i in this.ybjAllData.addNewybjType){
          if(i=='tags'){
            this.ybjAllData.addNewybjType[i]=[]
          }else{
            this.ybjAllData.addNewybjType[i]=''
          }
        }
      },
      //查看编辑样板间
      handleYbj(index,scope,type){
        let _this=this;
        if(type==1){
          this.ybjAllData.isdisabled=true;
          this.ybjAllData.is_show_ybj_main=false;
          this.getybjDetaildata()
        }else if(type==2){
          this.ybjAllData.isdisabled=false;
          this.ybjAllData.is_show_ybj_main=false;
          this.getybjDetaildata()
        }else{
          _this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.getybjDetaildata()
            _this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消'
            });          
          });
        }
      },
      handleRemoveybj(){

      },
      //确认更新样板间
      ybj_updata_sure(){
        let _this=this;
        if(this.ybjAllData.isdisabled){
          this.ybjAllData.is_show_ybj_main=true;
          return;
        }
        if(_this.ybjAllData.addNewybjType.name==''){
          _this.$message({
            type: 'warning',
            message: '请输入标题'
          });
          return;
        }
        if(_this.ybjAllData.addNewybjType.time==''){
          _this.$message({
            type: 'warning',
            message: '请选择时间'
          });
          return;
        }
        _this.ybjAllData.is_show_ybj_main=true;
        _this.getybjdata();
        _this.$message({
          type: 'success',
          message: '操作成功'
        });  
      },
      //楼盘附加信息提交
      submitForm2(){
        let _this=this;
        _this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$message({
            type: 'success',
            message: '提交成功!'
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消提交'
          });          
        });
      },
      
      //显示地图
      show_map(){
        this.is_show_map=!this.is_show_map
      },
      //初始化地图
      init_map(){
        let _this=this;
        var map = new AMap.Map('container',{
            resizeEnable: true,
            zoom: 6,
            center: _this.center
        });
        AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
            function(){
                map.addControl(new AMap.ToolBar());

                map.addControl(new AMap.Scale());
                
                map.addControl(new AMap.OverView({isOpen:true}));
               
        });
        map.on('click', function (e) {
          if(_this.markers.length>0){
            _this.markers[0].setMap(null)
          }   
          _this.markers=[]        
          let add_arr=[e.lnglat.getLng(),e.lnglat.getLat()] 
          _this.add_new_estate_form.mapLon=e.lnglat.getLng()
          _this.add_new_estate_form.mapLat=e.lnglat.getLat()
      
          var marker = new AMap.Marker({ 
            position: add_arr,
            map
          });
          _this.markers.push(marker)
          console.log(marker)
        });
      },
      addid(){
        this.additionalInformationForm.id_arr.push({id:''})
      },
      begin_updata(){
        this.$refs.updata_repeat_input.click()
      },
    
      handleEdit(index,scope,type){
        let _this=this;
        console.log(scope)
        if(type==2){
          this.isshowpdf=true
        }else if(type==3){
          _this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let _index=this.repeat_tableData.indexOf(scope)
            _this.repeat_tableData.splice(_index,1)
            _this.$message({
              type: 'success',
              message: '提交成功!'
            });
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消提交'
            });          
          });
        }else{
          _this.$confirm('确认上线/下线吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消'
            });          
          });
        }
      },
      house_setting_btn(){
        let _this=this;
        _this.$confirm('确认保存吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$message({
            type: 'success',
            message: '保存成功!'
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消保存'
          });          
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
      handleClick(){

      }, 
      handleRemove(file, fileList,type) {
        console.log(file, fileList);
      },
      handleRemovehx(file, fileList){
        console.log(file);
      },
      handlePreviewhx(file){
        this.hxAllData.dialogImageUrl=file.url;
        this.hxAllData.dialogVisible=true;
      },   
      handlePreviewsj(file){
        this.sjAllData.dialogImageUrl=file.url;
        this.sjAllData.dialogVisible=true;
      },  
      handlePreviewybj(file){
        this.ybjAllData.dialogImageUrl=file.url;
        this.ybjAllData.dialogVisible=true;
      },  
      hx_updata_change(file,fileList){
        this.hxAllData.updatafiles=fileList;
      },
      sj_updata_change(file,fileList){
        this.sjAllData.updatafiles=fileList;
      },
      ybj_updata_change(file,fileList){
        this.ybjAllData.updatafiles=fileList;
      },
      handlePreview1(file){
          this.dialogImageUrl1=file.url;
          this.dialogVisible1=true;
      },
      handlePreview2(file){
          this.dialogImageUrl2=file.url;
          this.dialogVisible2=true;
      },
      handlePreview3(file){
          this.dialogImageUrl3=file.url;
          this.dialogVisible3=true;
      },
      handlePreview4(file){
          this.dialogImageUrl4=file.url;
          this.dialogVisible4=true;
      },
      submitUpload(type){
        if(type==1){
          this.$refs.upload1.submit();
        }else if(this.type==2){
          this.$refs.upload2.submit();
        }else if(this.type==3){
          this.$refs.upload3.submit();
        }else{
          this.$refs.upload4.submit();
        }
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
  /* .estateadd .el-upload--picture-card{width: 40px;height: 40px;line-height: 50px} */
</style>
