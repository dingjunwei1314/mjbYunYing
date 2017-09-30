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
                {{houseBasicData.province}}{{houseBasicData.city}}{{houseBasicData.area}}
              </el-form-item>
              <el-form-item label="标题：" style="width:400px">
                {{houseBasicData.buidingName}}
                <span v-if="houseBasicData.buidingName==''">--</span>
              </el-form-item>
              <el-form-item label="楼盘别名：" style="width:400px">
                {{houseBasicData.nickName}}
                <span v-if="houseBasicData.nickName==''">--</span>
              </el-form-item>
              <el-form-item label="描述：">
                {{houseBasicData.desc}}
                <span v-if="houseBasicData.desc==''">--</span>
              </el-form-item>

              <el-form-item label="物业类型：">
                <span v-if="houseBasicData.propertyType==''">--</span>
                <span v-if="houseBasicData.propertyType==0">普通住宅</span>
                <span v-if="houseBasicData.propertyType==1">公寓</span>
                <span v-if="houseBasicData.propertyType==2">商住</span>
                <span v-if="houseBasicData.propertyType==3">别墅</span>
                <span v-if="houseBasicData.propertyType==4">其他</span>
              </el-form-item>

              <el-form-item label="销售状态：">
                <span v-if="houseBasicData.sellStatus==''">--</span>
                <span v-if="houseBasicData.sellStatus==0">在售</span>
                <span v-if="houseBasicData.sellStatus==1">待售</span>
                <span v-if="houseBasicData.sellStatus==2">售罄</span>
              </el-form-item>

              <el-form-item label="开盘日期：">
                {{houseBasicData.sellTime}}
                <span v-if="houseBasicData.sellTime==''">--</span>
              </el-form-item>

              <el-form-item label="交房日期：">
                {{houseBasicData.deliverTime}}
                <span v-if="houseBasicData.deliverTime==''">--</span>
              </el-form-item>

              <el-form-item label="均价：">
                {{houseBasicData.avgPrice}}
                <span v-if="houseBasicData.avgPrice==''">--</span>
              </el-form-item>
             
              <el-form-item label="装修程度：">
                <span v-if="houseBasicData.decorationdLevel==''">--</span>
                <span v-if="houseBasicData.decorationdLevel==0">毛坯</span>
                <span v-if="houseBasicData.decorationdLevel==1">简单装修</span>
                <span v-if="houseBasicData.decorationdLevel==2">中档装修</span>
                <span v-if="houseBasicData.decorationdLevel==3">高档装修</span>
                <span v-if="houseBasicData.decorationdLevel==4">豪华装修</span>
                <span v-if="houseBasicData.decorationdLevel==5">其它</span>
              </el-form-item>
              
              <el-form-item label="楼层：">
                <span v-if="houseBasicData.storey==''">--</span>
                <span v-if="houseBasicData.storey==0">底层</span>
                <span v-if="houseBasicData.storey==1">多层</span>
                <span v-if="houseBasicData.storey==2">小高层</span>
                <span v-if="houseBasicData.storey==3">高层</span>
                <span v-if="houseBasicData.storey==4">超高层</span>
              </el-form-item>
              
              <el-form-item label="建筑类型：">
                <span v-if="houseBasicData.buildingType==''">板楼</span>
                <span v-if="houseBasicData.buildingType==0">塔楼</span>
                <span v-if="houseBasicData.buildingType==1">板塔结合</span>
                <span v-if="houseBasicData.buildingType==2">联排别墅</span>
                <span v-if="houseBasicData.buildingType==3">双拼别墅</span>
                <span v-if="houseBasicData.buildingType==4">独栋别墅</span>
                <span v-if="houseBasicData.buildingType==5">叠拼别墅</span>
              </el-form-item>
              
              <el-form-item label="现房期房：">
                <span v-if="houseBasicData.existing==''">--</span>
                <span v-if="houseBasicData.existing==0">现房</span>
                <span v-if="houseBasicData.existing==1">准现房</span>
                <span v-if="houseBasicData.existing==2">期房</span>
              </el-form-item>

              <el-form-item label="产权年限：">
                {{houseBasicData.housingProperty}}
                <span v-if="houseBasicData.housingProperty==''">--</span>
              </el-form-item>

              <el-form-item label="楼盘特色标签：">
                <el-tag type="warning" v-for="(item,index) in houseBasicData.housingLable" :key="index">地铁房</el-tag>
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
                <span v-if="houseBasicData.metro==''">--</span>
              </el-form-item>
              <el-form-item label="环线：">
                <span v-if="houseBasicData.loopWire==''">--</span>
                <span v-if="houseBasicData.loopWire=='0'">一环以内</span>
                <span v-if="houseBasicData.loopWire=='1'">一至二环</span>
                <span v-if="houseBasicData.loopWire=='2'">二至三环</span>
                <span v-if="houseBasicData.loopWire=='3'">三至四环</span>
                <span v-if="houseBasicData.loopWire=='4'">四至五环</span>
                <span v-if="houseBasicData.loopWire=='5'">五至六环</span>
                <span v-if="houseBasicData.loopWire=='6'">六环外</span>
              </el-form-item>
              <el-form-item label="楼盘地址：" style="width:400px">
                {{houseBasicData.buidingAddress}}
                <span v-if="houseBasicData.buidingAddress==''">--</span>
              </el-form-item>
              <el-form-item label="接待时间：" style="width:400px">
                {{houseBasicData.serviceTimeBegin}}
                --
                {{houseBasicData.serviceTimeEnd}}
              </el-form-item>
              <el-form-item label="交通路线：" style="width:400px">
                {{houseBasicData.trafficRoutes}}
                <span v-if="houseBasicData.trafficRoutes==''">--</span>
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
                <span v-if="houseBasicData.serviceCall==''">--</span>
              </el-form-item>
              <el-form-item label="售楼地址：" style="width:400px">
                {{houseBasicData.serviceAddress}}
                <span v-if="houseBasicData.serviceAddress==''">--</span>
              </el-form-item>
              <el-form-item label="物业费：" style="width:400px">
                {{houseBasicData.propertyFee}}
                <span v-if="houseBasicData.propertyFee==''">--</span>
              </el-form-item>
              <el-form-item label="物业公司：" style="width:400px">
                {{houseBasicData.propertyCompany}}
                <span v-if="houseBasicData.propertyCompany==''">--</span>
              </el-form-item>
              <el-form-item label="楼盘开发商：" style="width:600px">
                {{houseBasicData.developer}}
                <span v-if="houseBasicData.developer==''">--</span>
              </el-form-item>

              <div v-for="(item,index) in houseBasicData.permitPresaleList" :key="index">
                <el-form-item label="预售许可证书" style="width:600px">
                  {{item.permitPresale}}
                  <span v-if="item.permitPresale==''">--</span>
                </el-form-item>
                <el-form-item label="发证时间" style="width:600px">
                  {{item.permitPresaleTime}}
                  <span v-if="item.permitPresaleTime==''">--</span>
                </el-form-item>
                <el-form-item label="绑定楼栋" style="width:600px">
                  {{item.bindbuiding}}
                  <span v-if="item.bindbuiding==''">--</span>
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
                {{infoData.dfl}}
                <span v-if="infoData.dfl==''">--</span>
              </el-form-item>
              <el-form-item label="绿化率：" style="width:300px">
                {{infoData.lhl}}
                <span v-if="infoData.lhl==''">--</span>
              </el-form-item>
              <el-form-item label="容积率：" style="width:300px">
                {{infoData.rjl}}
                <span v-if="infoData.rjl==''">--</span>
              </el-form-item>
              <el-form-item label="建筑面积：" style="width:300px">
                {{infoData.jzmj}}
                <span v-if="infoData.jzmj==''">--</span>
              </el-form-item>
              <el-form-item label="占地面积：" style="width:300px">
                {{infoData.zdmj}}
                <span v-if="infoData.zdmj==''">--</span>
              </el-form-item>
              <el-form-item label="车位占比：" style="width:300px">
                {{infoData.cwzb}}
                <span v-if="infoData.cwzb==''">--</span>
              </el-form-item>
              <el-form-item label="学区所属：" style="width:300px">
                {{infoData.xqss}}
                <span v-if="infoData.xqss==''">--</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-相关视频
            </p>
            <el-form   label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="楼盘视频：">
                {{infoData.v_url}}
                <span v-if="infoData.v_url==''">--</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-销售及规划
            </p>
            <el-form :inline="true" label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="规划户数：" style="width:300px">
                {{infoData.ghhs}}
                <span v-if="infoData.ghhs==''">--</span>
                <span>户</span>
              </el-form-item>
              <el-form-item label="可售套数：" style="width:300px">
                {{infoData.ksts}}
                <span v-if="infoData.ksts==''">--</span>
                <span>套</span>
              </el-form-item>
              <el-form-item label="楼幢总量：" style="width:300px">
                {{infoData.ldzl}}
                <span v-if="infoData.ldzl==''">--</span>
                <span>栋</span>
              </el-form-item>
              <el-form-item label="开发期数：" style="width:300px">
                {{infoData.kfzq}}
                <span v-if="infoData.kfzq==''">--</span>
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
               
                <span v-if="infoData.gs==''">--</span>
                <span v-if="infoData.gs==1">市政供水</span>
                <span v-if="infoData.gs==2">其它</span>
               
              </el-form-item>
              <el-form-item label="供电：" style="width:600px">
               
                <span v-if="infoData.gd==''">--</span>
                <span v-if="infoData.gd==1">市政供电</span>
                <span v-if="infoData.gd==2">其它</span>
              </el-form-item>
              <el-form-item label="供暖：" style="width:600px">
               
                <span v-if="infoData.gn==''">--</span>
                <span v-if="infoData.gn==1">市政供暖</span>
                <span v-if="infoData.gn==2">小区集中供暖</span>
                <span v-if="infoData.gn==3">其它</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-施工进度信息
            </p>
            <el-form  :inline="true" label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="楼体进度：" style="width:300px">
                {{infoData.ztjd}}
                <span v-if="infoData.ztjd==''">--</span>
              </el-form-item>
              <el-form-item label="公共区域进度：" style="width:300px">
                {{infoData.ggqy}}
                <span v-if="infoData.ggqy==''">--</span>
              </el-form-item>
              <el-form-item label="当前阶段：">
                {{infoData.dqqd}}
                <span v-if="infoData.dqqd==''">--</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="first_item_1">
            <p class="tit">
              楼盘-往期楼盘
            </p>
            <el-form  label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item  label="往期楼盘id">
                --
              </el-form-item>            
            </el-form>
          </div>

      
        </el-tab-pane>
        <el-tab-pane label="楼盘相册" name="third">
          <el-tabs v-model="activeName2">
            <el-tab-pane label="户型图" name="first">
              <el-table
                v-loading="hxAllData.is_loading_tab"
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
                    @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="实景图" name="second">
             
              <el-table
                :data="sjAllData.sjtableData.list"
                border
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
                    @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
             

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
              </div>
            </el-tab-pane>
            <el-tab-pane label="样板间" name="fourth">
            
                <el-table
                  :data="ybjAllData.ybjtableData.list"
                  border
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
                      @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>

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
             
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="楼盘报告" name="fourth" style="padding:20px">
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
                @click="handleEdit(scope.$index, scope.row,2)">
                  预览
                </el-button>
              
              </template>
            </el-table-column>
          </el-table>
          <Pdfonline :isshowpdf="isshowpdf" :pdfsrc="pdfsrc" @close="closepdf"></Pdfonline>
        </el-tab-pane>
        <el-tab-pane label="楼盘评分" name="five">
          <div v-show="!is_show_score_swi">
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
                prop="ghybj"
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
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="is_show_score_swi">
            <el-form  :model="add_new_score_form" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:20px">
              <el-form-item label="工程质量"  prop="gczl">
                <el-input style="width:300px" :disabled="is_score_form_disabled" v-model="add_new_score_form.gczl" auto-complete="off"></el-input>
                <span style="font-size:12px;color:#999;">例：8或8.2</span>
              </el-form-item>
              <el-form-item label="评分概述">
                <el-input style="width:500px" :disabled="is_score_form_disabled" type="textarea" v-model="add_new_score_form.gczl_detail" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="规划设计" prop="ghsj">
                <el-input style="width:300px" :disabled="is_score_form_disabled" v-model="add_new_score_form.ghsj" auto-complete="off"></el-input>
                <span style="font-size:12px;color:#999;">例：8或8.2</span>
              </el-form-item>
              <el-form-item label="评分概述">
                <el-input style="width:500px" :disabled="is_score_form_disabled" type="textarea"  v-model="add_new_score_form.ghsj_detail" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="规划落实" prop="zbpt">
                <el-input style="width:300px" :disabled="is_score_form_disabled" v-model="add_new_score_form.zbpt" auto-complete="off"></el-input>
                <span style="font-size:12px;color:#999;">例：8或8.2</span>
              </el-form-item>
              <el-form-item label="评分概述">
                <el-input style="width:500px" :disabled="is_score_form_disabled" type="textarea"  v-model="add_new_score_form.ghls_detail" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="周边配套" prop="zbpt">
                <el-input style="width:300px" :disabled="is_score_form_disabled" v-model="add_new_score_form.zbpt" auto-complete="off"></el-input>
                <span style="font-size:12px;color:#999;">例：8或8.2</span>
              </el-form-item>
              <el-form-item label="评分概述">
                <el-input style="width:500px" :disabled="is_score_form_disabled" type="textarea" v-model="add_new_score_form.zbpt_detail" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align:center;margin-bottom:50px;width:80%">
              <el-button type="primary"  @click="is_show_score(false)">取消</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="楼盘设置" name="six">
          <el-form  label-width="150px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:20px">
              <el-form-item label="是否推荐至首页："  prop="gczl">
                <span v-if="house_setting_form.tjsy==''">--</span>
                <span v-if="house_setting_form.tjsy==1">是</span>
                <span v-if="house_setting_form.tjsy==2">否</span>
              </el-form-item>
              <el-form-item label="首页排序：">
                <span v-if="house_setting_form.stpx==''">--</span>
                <span v-else>{{house_setting_form.stpx}}</span>
              </el-form-item>
              <el-form-item label="楼盘置顶：">
                <span v-if="house_setting_form.lpzd==''">--</span>
                <span v-if="house_setting_form.lpzd==1">是</span>
                <span v-if="house_setting_form.lpzd==2">否</span>
              </el-form-item>
              <el-form-item label="加入严选：">
                <span v-if="house_setting_form.jryx==''">--</span>
                <span v-if="house_setting_form.jryx==1">是</span>
                <span v-if="house_setting_form.jryx==2">否</span>
              </el-form-item>
              <el-form-item label="合作买房：">
                <span v-if="house_setting_form.hzmf==''">--</span>
                <span v-if="house_setting_form.hzmf==1">是</span>
                <span v-if="house_setting_form.hzmf==2">否</span>
              </el-form-item>
              <el-form-item label="租金返还：">
                <span v-if="house_setting_form.zjfh==''">--</span>
                <span v-if="house_setting_form.zjfh==1">是</span>
                <span v-if="house_setting_form.zjfh==2">否</span>
              </el-form-item>
            </el-form>
           
        </el-tab-pane>
      </el-tabs>
    </div>    
  </div>
</template>

<script>
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

      return {
        coordinatearr,
        pdfsrc:'/static/pdf.pdf',
        isshowpdf:false,
        is_show_score_swi:false,
        hxAllData:{
          dialogVisible:false,
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
          hxtableData:{
            list:[]
          },
        },
        sjAllData:{
          dialogVisible:false,
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
        ybjAllData:{
          dialogVisible:false,
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
        add_new_repeat_form:{
          name:'',
          type:'',
        },
        is_score_form_disabled:false,
        add_new_score_form:{
          gczl:'',
          gczl_detail:'',
          ghsj:'',
          ghls_detail:'',
          ghls:'',
          ghls_detail:'',
          zbpt:'',
          zbpt_detail:''
        },
        house_setting_form:{
          tjsy:'',
          lpzd:'',
          stpx:'',
          jryx:'',
          hzmf:'',
          zjfh:''
        },
        is_loading_score_tab:false,
        is_show_map:false,
        activeName:"first",
        activeName2:'first',
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
        secondLevel:'楼盘管理',
        threeLevel:'添加楼盘',
        houseBasicData:{
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
        infoData:{
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
        repeat_data:{
          list:[]
        },
        is_loading_repeat_tab:false,
        score_data:{
          list:[]
        },
        markers:[],
        center:[116.480983, 40.0958],      
      };
    },
    filters:{
     
    },
    computed:{
                               
    },
    watch:{
     
    },
    created(){
      this.getbasicdata()
      this.getinfodata()
      this.getrepeatdata()
      this.getscoredata()
      this.getsettingdata()
      this.gethxdata()
      this.getsjdata()
      this.getybjdata()
    },
    methods: {
      getbasicdata(){
        let _this=this;
        this.$http('/basicdata').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.houseBasicData=res.data.data;
            if(_this.houseBasicData.jw){
               _this.center=_this.houseBasicData.jw
            }
            console.log( _this.center)
            _this.init_map( _this.center)
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      getinfodata(){
        let _this=this;
        this.$http('/infodata').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.infoData=res.data.data;
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      //获取楼盘报告请求
      getrepeatdata(){
        let _this=this;
        this.$http('/repeat').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.repeat_data=res.data.data;
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      //获取楼盘评分请求
      getscoredata(){
        let _this=this;
        this.$http('/score').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.score_data=res.data.data;
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      //获取楼盘设置请求
      getsettingdata(){
        let _this=this;
        this.$http('/setting').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.house_setting_form=res.data.data;
          }
        }).catch(function(err){
          console.log(err)
        })
      },
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
      init_map(){
        let _this=this;
        var map = new AMap.Map('container',{
            resizeEnable: true,
            zoom: 20,
            center: _this.center
        });
        AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
            function(){
                map.addControl(new AMap.ToolBar());

                map.addControl(new AMap.Scale());
                
                map.addControl(new AMap.OverView({isOpen:true}));
               
        });
        let add_arr=_this.center;
        var marker = new AMap.Marker({
          position: add_arr,
          map
        });
      },
      is_show_score(swi){
        this.is_show_score_swi=swi;
        if(true){
          for(let i in this.add_new_score_form){
            this.add_new_score_form[i]='';
          }
          this.is_score_form_disabled=false;
        }
      },
      closepdf(){
          this.isshowpdf = false
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
            let _index=this.score_tableData.indexOf(scope)
            _this.score_tableData.splice(_index,1)
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
      }
    },
    mounted(){
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
  .estateadd .el-upload--picture-card{display:none}
</style>
