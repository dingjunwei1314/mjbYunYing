<template>
  <div class="estateadd">
    <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    <div style="padding:20px">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="楼盘基本信息" name="first">
          <EstateBasicInfoForm />
        </el-tab-pane> 
        <el-tab-pane label="附加信息" name="second" :disabled = "!id">
          <EstateAdditionalInfoForm />
        </el-tab-pane>
        <el-tab-pane label="楼盘相册" name="third" :disabled = "!id">
          <el-tabs v-model="activeName2" @tab-click="imgTabClick">
            <el-tab-pane label="户型图" name="first">
              <div v-show="hxAllData.is_show_hx_main">
                <el-button type="text" style="margin-bottom:10px" @click="show_add_hx_form(false)" size="small">添加户型图</el-button>
                <el-table
                  v-loading="hxAllData.is_loading_hx_tab"
                  :data="hxAllData.hxtableData.houseList"
                  border
                  tooltip-effect="dark"
                  style="width: 100%;font-size:12px!important;">
                  <el-table-column
                    prop="houseId"
                    label="ID"
                    min-width="80">
                  </el-table-column>
                  <el-table-column
                    label="图片"
                    min-width="100">
                    <template scope="scope">
                      <img style="width:100px;height:50px;margin-top:10px;" v-if="scope.row.imgUrl" :src="scope.row.imgUrl"/>
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
                    min-width="100"
                    label="操作">
                    <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleHx(scope.$index, scope.row,1)">修改</el-button>
                      <el-button
                      size="small"
                      @click="handleHx(scope.$index, scope.row,2)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  v-show="hxAllData.hxtableData.rowCount>0"
                  style="margin: 0 auto;text-align:center;margin-top:20px"
                  layout="prev, pager, next,jumper"
                  :page-size=10
                  :currentPage="hxAllData.currentPage"
                  @current-change="hxListCurrentChange"
                  :total="hxAllData.hxtableData.rowCount">
                </el-pagination>
              </div>
              <div v-show="!hxAllData.is_show_hx_main">
                <el-button type="text" @click="show_add_hx_form(true)">返回列表</el-button>
                <el-form 
                  :model="hxAllData.addNewHouseType" 
                  :rules="hxAllData.addNewHouseTypeRule" 
                  ref="addNewHouseTypeRef" 
                  label-width="100px" 
                  class="demo-dynamic" 
                  style="width:70%;margin:0 auto;margin-top:40px"> 
                  
                  <h4 class="addtit">添加户型图</h4>
                  <el-form-item label="标题" style="width:400px" :required="true" prop="title">
                    <el-input size="small" v-model="hxAllData.addNewHouseType.houseName"></el-input>
                  </el-form-item>
                  <el-form-item label="户型" style="width:800px" :required="true"  prop="room">
                    <el-select :clearable="true" style="width:150px" v-model="hxAllData.addNewHouseType.room" placeholder="室">
                      <el-option label="一室" :value="1"></el-option>
                      <el-option label="二室" :value="2"></el-option>
                      <el-option label="三室" :value="3"></el-option>
                      <el-option label="四室及以上" :value="4"></el-option>
                    </el-select>
                    <el-select :clearable="true" style="width:150px" v-model="hxAllData.addNewHouseType.hall" placeholder="厅">
                      <el-option label="一厅" :value="1"></el-option>
                      <el-option label="二厅" :value="2"></el-option>
                      <el-option label="三厅" :value="3"></el-option>
                    </el-select>
                    <el-select :clearable="true" style="width:150px" v-model="hxAllData.addNewHouseType.kitchen" placeholder="厨">
                      <el-option label="一厨" :value="1"></el-option>
                      <el-option label="二厨" :value="2"></el-option>
                    </el-select>
                    <el-select :clearable="true" style="width:150px" v-model="hxAllData.addNewHouseType.bathRoom" placeholder="卫">
                      <el-option label="一卫" :value="1"></el-option>
                      <el-option label="二卫" :value="2"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="面积区间" :required="true"  prop="areaMin">
                    <el-input size="small" v-model="hxAllData.addNewHouseType.areaMin" type="number" style="width:100px" ></el-input>
                    <span style="color:#999;font-size:12px">-</span>
                    <el-input size="small" v-model="hxAllData.addNewHouseType.areaMax" type="number" style="width:100px" ></el-input>
                    <span style="color:#999;font-size:12px">如果该户型只有一种面积，面积填入第一个输入框</span>
                  </el-form-item>

                  <el-form-item label="朝向" :required="true"   prop="roomLocation">
                    <el-select :clearable="true"   v-model="hxAllData.addNewHouseType.roomLocation" placeholder="朝向">
                      <el-option label="南北" value="1"></el-option>
                      <el-option label="东西" value="2"></el-option>
                      <el-option label="东北" value="3"></el-option>
                      <el-option label="东南" value="4"></el-option>
                      <el-option label="西北" value="5"></el-option>
                      <el-option label="西南" value="6"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="描述"  prop="dec">
                    <el-input size="small" style="width:300px" v-model="hxAllData.addNewHouseType.dec" type="textarea" ></el-input>
                  </el-form-item>

                  <el-form-item label="总价区间">
                    <el-input size="small" v-model="hxAllData.addNewHouseType.priceMin" type="number" style="width:100px" ></el-input>
                    <span style="color:#999;font-size:12px">-</span>
                    <el-input size="small" v-model="hxAllData.addNewHouseType.priceMax" type="number" style="width:100px" ></el-input>
                    <span style="color:#999;font-size:12px">如果该户型只有一种价格，价格填入第一个输入框</span>
                  </el-form-item>

                  <el-form-item label="销售状态" :required="true" prop="saleStatus">
                    <el-radio-group v-model="hxAllData.addNewHouseType.saleStatus">
                      <el-radio :label="0">在售</el-radio>
                      <el-radio :label="1">待售</el-radio>
                      <el-radio :label="2">售罄</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="总套数"  prop="houseNum">
                    <el-input size="small" style="width:300px" type="number" v-model="hxAllData.addNewHouseType.houseNum" ></el-input>
                  </el-form-item>

                  <el-form-item  label="可售套数"  prop="saleNum">
                    <el-input size="small" style="width:300px" type="number" v-model="hxAllData.addNewHouseType.saleNum" ></el-input>
                  </el-form-item>

                  <el-form-item label="待售套数"  prop="forSaleNum">
                    <el-input size="small" style="width:300px" type="number" v-model="hxAllData.addNewHouseType.forSaleNum" ></el-input>
                  </el-form-item>

                  <el-form-item label="套数占比"  prop="scaleRoom">
                    <el-input size="small" style="width:300px" type="number" v-model="hxAllData.addNewHouseType.scaleRoom" ></el-input>
                  </el-form-item>
                  
                  <el-form-item label="标签">
                    <el-checkbox-group v-model="hxAllData.addNewHouseType.houseLable">
                      <el-checkbox 
                      v-for="(item,index) in hxAllData.houseLableList" 
                      :key="index" 
                      :label="item.lableId">
                        {{item.lableName}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="上传">
                    <ImgUploader2
                      :btnId="hxAllData.btnList[0]"
                      @imgUploader="imgUploaderHx(0)"
                      />
                  </el-form-item>
                  <el-form-item label="预览" class="previewFormItem">
                    <ImgPreview 
                      v-for = "(item,index) in hxAllData.preImgSrcList"
                      :key = "index"
                      :backgroundPicUrl="item.preImgSrc"
                      @previewImg="previewImgHx(index)"
                      @deleteImg="deleteImgHx(index)"
                    />
                    <p v-if = "hxAllData.preImgSrcList[0].preImgSrc == ''" class="no-img">
                      暂无预览图
                    </p>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button style="margin-left:100px" type="primary" @click="hx_updata_sure('addNewHouseTypeRef')">
                      确认
                    </el-button>
                  </el-form-item>
                </el-form>
               
              </div>
            </el-tab-pane>
            <el-tab-pane label="实景图" name="second">
              <div v-show="sjAllData.is_show_sj">
                <el-button type="text" style="margin-bottom:10px" @click="addSj" size="small">添加实景图</el-button>

                <el-table
                  :data="sjAllData.sjtableData.sceneList"
                  border
                  v-loading="sjAllData.is_loading_sj_tab"
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
                      @click="handleSj(scope.$index, scope.row,1)">修改</el-button>
                      <el-button
                      size="small"
                      @click="handleSj(scope.$index, scope.row,2)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  v-show="sjAllData.sjtableData.rowCount>0"
                  style="margin: 0 auto;text-align:center;margin-top:20px"
                  layout="prev, pager, next,jumper"
                  :page-size=10
                  :currentPage="sjAllData.currentPage"
                  @current-change="sjListCurrentChange"
                  :total="sjAllData.sjtableData.rowCount">
                </el-pagination>
              </div>


              <div v-show="sjAllData.is_show_sj_add">
                <el-button type="text" @click="backSj(1)">返回列表</el-button>

                <el-form :model="sjAllData.addNewsjType" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px"> 
                  <h5 style="text-align:center">添加实景图</h5>
                  <el-form-item label="拍摄时间" :required="true" prop="title">
                    <el-date-picker
                      v-model="sjAllData.addNewsjType.takeTime"
                      type="date"
                      placeholder="拍摄时间">
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item label="上传">
                    <ImgUploader2
                      :btnId="sjAllData.btnList[0]"
                      @imgUploader="imgUploaderSj(0)"
                      />
                  </el-form-item>
                  <el-form-item label="预览" class="previewFormItem">
                    <ImgPreview 
                      v-for = "(item,index) in sjAllData.preImgSrcList"
                      :key = "index"
                      :backgroundPicUrl="item.preImgSrc"
                      @previewImg="previewImgSj(index)"
                      @deleteImg="deleteImgSj(index)"
                    />
                    <p v-if = "sjAllData.preImgSrcList.length <= 0" class="no-img">
                      暂无预览图
                    </p>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" style="margin-left:100px;margin-bottom:100px" @click="sj_updata_sure(1)">确认</el-button>
                  </el-form-item>
                </el-form>
              </div>

              <div v-show="sjAllData.is_show_sj_edit">
                <el-button type="text" @click="backSj(2)">返回列表</el-button>

                <el-form :model="sjAllData.editNewsjType" label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px"> 
                  <h5 style="text-align:center">编辑实景图</h5>
                  <el-form-item label="拍摄时间" :required="true" prop="title">
                    <el-date-picker
                      v-model="sjAllData.editNewsjType.takeTime"
                      type="date"
                      placeholder="拍摄时间">
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item label="上传">
                    <ImgUploader2
                      :btnId="sjAllData._btnList[0]"
                      @imgUploader="_imgUploaderSj(0)"
                      />
                  </el-form-item>
                  <el-form-item label="预览" class="previewFormItem">
                    <ImgPreview 
                      v-for = "(item,index) in sjAllData._preImgSrcList"
                      :key = "index"
                      :backgroundPicUrl="item.preImgSrc"
                      @previewImg="_previewImgSj(index)"
                      @deleteImg="_deleteImgSj(index)"
                    />
                    <p v-if = "sjAllData._preImgSrcList.length <= 0" class="no-img">
                      暂无预览图
                    </p>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" style="margin-left:100px;margin-bottom:100px" @click="sj_updata_sure(2)">确认</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="效果图" name="third" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">效果图</p>
              <el-form :model="xgAllData.addNewxgType" label-width="100px" class="demo-dynamic"> 
                <el-form-item label="上传">
                  <ImgUploader2
                    :btnId="xgAllData.btnList[0]"
                    @imgUploader="imgUploaderXg(0)"
                    />
                </el-form-item>
                <el-form-item label="预览" class="previewFormItem">
                  <ImgPreview 
                    v-for = "(item,index) in xgAllData.preImgSrcList"
                    :key = "index"
                    :backgroundPicUrl="item.imgUrl"
                    @previewImg="previewImgXg(index)"
                    @deleteImg="deleteImgXg(index)"
                  />
                  <p v-if = "xgAllData.preImgSrcList.length <= 0" class="no-img">
                    暂无预览图
                  </p>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" style="margin-left:100px;margin-bottom:100px" @click="img_submit(4)">确认</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="样板间" name="fourth" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">样板间</p>
              <el-form :model="ybjAllData.addNewybjType" label-width="100px" class="demo-dynamic"> 
                <el-form-item label="上传">
                  <ImgUploader2
                    :btnId="ybjAllData.btnList[0]"
                    @imgUploader="imgUploaderYbj(0)"
                    />
                </el-form-item>
                <el-form-item label="预览" class="previewFormItem">
                  <ImgPreview 
                    v-for = "(item,index) in ybjAllData.preImgSrcList"
                    :key = "index"
                    :backgroundPicUrl="item.imgUrl"
                    @previewImg="previewImgYbj(index)"
                    @deleteImg="deleteImgYbj(index)"
                  />
                  <p v-if = "ybjAllData.preImgSrcList.length <= 0" class="no-img">
                    暂无预览图
                  </p>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" style="margin-left:100px;margin-bottom:100px" @click="img_submit(3)">
                    确认
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="规划图" name="five" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">规划图</p>
              <el-form :model="ghAllData.addNewghType" label-width="100px" class="demo-dynamic"> 
                <el-form-item label="上传">
                  <ImgUploader2
                    :btnId="ghAllData.btnList[0]"
                    @imgUploader="imgUploaderGh(0)"
                    />
                </el-form-item>
                <el-form-item label="预览" class="previewFormItem">
                  <ImgPreview 
                    v-for = "(item,index) in ghAllData.preImgSrcList"
                    :key = "index"
                    :backgroundPicUrl="item.imgUrl"
                    @previewImg="previewImgGh(index)"
                    @deleteImg="deleteImgGh(index)"
                  />
                  <p v-if = "ghAllData.preImgSrcList.length <= 0" class="no-img">
                    暂无预览图
                  </p>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" style="margin-left:100px;margin-bottom:100px" @click="img_submit(5)">确认</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="交通图" name="six" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">交通图</p>
              <el-form :model="jtAllData.addNewjtType" label-width="100px" class="demo-dynamic"> 
                <el-form-item label="上传">
                  <ImgUploader2
                    :btnId="jtAllData.btnList[0]"
                    @imgUploader="imgUploaderJt(0)"
                    />
                </el-form-item>
                <el-form-item label="预览" class="previewFormItem">
                  <ImgPreview 
                    v-for = "(item,index) in jtAllData.preImgSrcList"
                    :key = "index"
                    :backgroundPicUrl="item.imgUrl"
                    @previewImg="previewImgJt(index)"
                    @deleteImg="deleteImgJt(index)"
                  />
                  <p v-if = "jtAllData.preImgSrcList.length <= 0" class="no-img">
                    暂无预览图
                  </p>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" style="margin-left:100px;margin-bottom:100px" @click="img_submit(1)">确认</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="配套图" name="seven" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">配套图</p>
              <el-form :model="ptAllData.addNewptType" label-width="100px" class="demo-dynamic"> 
                <el-form-item label="上传">
                  <ImgUploader2
                    :btnId="ptAllData.btnList[0]"
                    @imgUploader="imgUploaderPt(0)"
                    />
                </el-form-item>
                <el-form-item label="预览" class="previewFormItem">
                  <ImgPreview 
                    v-for = "(item,index) in ptAllData.preImgSrcList"
                    :key = "index"
                    :backgroundPicUrl="item.imgUrl"
                    @previewImg="previewImgPt(index)"
                    @deleteImg="deleteImgPt(index)"
                  />
                  <p v-if = "ptAllData.preImgSrcList.length <= 0" class="no-img">
                    暂无预览图
                  </p>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" style="margin-left:100px;margin-bottom:100px" @click="img_submit(2)">确认</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="缩略图" name="eight" style="padding:0px 20px">
              <p style="color:#313131;margin-bottom:10px;">缩略图</p>
              <el-form :model="slAllData.addNewslType" label-width="100px" class="demo-dynamic"> 
                <el-form-item label="上传">
                    <ImgUploader2
                    :btnName = "btnName1"
                    style = "float:left;margin-right:5px"
                    :btnId="slAllData.btnList[0]"
                    @imgUploader="imgUploaderSl(0)"
                    />
                    <ImgUploader2
                    :btnName = "btnName2"
                    style = "float:left;margin-right:5px"
                    :btnId="slAllData.btnList[1]"
                    @imgUploader="imgUploaderSl(1)"
                    />
                    <ImgUploader2
                    :btnName = "btnName3"
                    style = "float:left;margin-right:5px"
                    :btnId="slAllData.btnList[2]"
                    @imgUploader="imgUploaderSl(2)"
                    />
                    <ImgUploader2
                    :btnName = "btnName4"
                    style = "float:left;margin-right:5px"
                    :btnId="slAllData.btnList[3]"
                    @imgUploader="imgUploaderSl(3)"
                    />
                    <ImgUploader2
                    :btnName = "btnName5"
                    style = "float:left;margin-right:5px"
                    :btnId="slAllData.btnList[4]"
                    @imgUploader="imgUploaderSl(4)"
                    />
                </el-form-item>
                <el-form-item label="预览" class="previewFormItem">
                  <div style="display:inline-block" v-for = "(item,index) in slAllData.preImgSrcList" :key = "index">
                    <ImgPreview 
                      :backgroundPicUrl="item.imgUrl"
                      @previewImg="previewImgSl(index)"
                      @deleteImg="deleteImgSl(index)"
                    />
                    <p v-if="item.imgUrl" style="text-align:center;font-size:12px;margin-right:20px">缩略图{{index+1}}</p>
                  </div>
                  <p 
                    v-if = "slAllData.preImgSrcList[0].imgUrl == '' &&
                            slAllData.preImgSrcList[1].imgUrl == '' &&
                            slAllData.preImgSrcList[2].imgUrl == '' &&
                            slAllData.preImgSrcList[3].imgUrl == '' &&
                            slAllData.preImgSrcList[4].imgUrl == '' 
                           " 
                    class="no-img">
                    暂无预览图
                  </p>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" style="margin-left:100px;margin-bottom:100px" @click="sl_img_submit">确认</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="楼盘全景" name="fourth" :disabled = "!id">
          <EstatePanorama />
        </el-tab-pane>
        <el-tab-pane label="楼盘报告" name="five" :disabled = "!id">
          <EstateReport />
        </el-tab-pane>
        <el-tab-pane label="楼盘设置" name="six" :disabled = "!id">
          <EstateSetting />
        </el-tab-pane>
      </el-tabs>
    </div>    

    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImgSrc" alt="">
    </el-dialog>
  </div>
</template>

<script>
import formatTime from '../../common/formatTime'
import message from '../../common/message'
import uploader2 from '../../common/uploader2.js'
import ImgUploader2 from '../Common/ImgUploader2/ImgUploader2'
import Subnav from '../Subnav/Subnav'
import ImgPreview from '../Common/ImgPreview/ImgPreview'
import EstateBasicInfoForm from '../EstateBasicInfoForm/EstateBasicInfoForm'
import EstateAdditionalInfoForm from '../EstateAdditionalInfoForm/EstateAdditionalInfoForm'
import EstatePanorama from '../EstatePanorama/EstatePanorama'
import EstateReport from '../EstateReport/EstateReport'
import EstateScore from '../EstateScore/EstateScore'
import EstateSetting from '../EstateSetting/EstateSetting'
export default {
    name:'activitymanagment',
    components:{
      Subnav,
      ImgUploader2,
      ImgPreview,
      EstateBasicInfoForm,
      EstateAdditionalInfoForm,
      EstatePanorama,
      EstateReport,
      EstateScore,
      EstateSetting,
    },
    data() {

      const validatehxTitle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入标题'));
        }else{
          callback();
        }
      }; 
      const validatehxHousetype1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入户型'));
        }else{
          callback();
        }
      };  
      const validatehxAreaMin = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入面积区间'));
        }else{
          callback();
        }
      }; 
      const validatehxOrientation = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入朝向'));
        }else{
          callback();
        }
      }; 
      const validatehxSale_state = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入销售状态'));
        }else{
          callback();
        }
      };

      return {
        secondLevel:'楼盘管理',
        threeLevel:'添加楼盘',
        dialogVisible:false,
        dialogImgSrc:'',
        activeName:"first",
        activeName2:'first',
        btnName1:'缩略图一',
        btnName2:'缩略图二',
        btnName3:'缩略图三',
        btnName4:'缩略图四',
        btnName5:'缩略图五',

        //户型图全部数据
        hxAllData:{
          houseLableList:[],
          type:'',
          is_show_hx_main:true,
          is_loading_hx_tab:false,
          currentPage:1,
          btnList:['hxBtn0'],
          preImgSrcList:[{preImgSrc:''}],
          uploaderList:[{uploader:null}],
          form:{
            buildingId:'',
            pageIndex:0,
            pageSize:10
          },
          addNewHouseType:{
            buildingId:'',
            houseName:'',
            room:1,
            hall:1,
            kitchen:1,
            bathRoom:1,
            areaMin:'',
            areaMax:'',
            roomLocation:'',
            dec:'',
            priceMin:'',
            priceMax:'',
            saleStatus:'',
            houseNum:0,
            saleNum:0,
            forSaleNum:0,
            scaleRoom:0,
            houseLable:[],
            houseImgUrl:'',
            houseId:''
          },
          addNewHouseTypeRule:{
            title: [
              { validator: validatehxTitle, trigger: 'blur' }
            ],
            room: [
              { validator: validatehxHousetype1, trigger: 'blur' }
            ], 
            areaMin:[
              { validator: validatehxAreaMin, trigger: 'blur' }
            ],
            roomLocation:[
              { validator: validatehxOrientation, trigger: 'blur' }
            ],
            saleStatus:[
              { validator: validatehxSale_state, trigger: 'blur' }
            ]
          },
          hxtableData:{
            houseList:[],
            rowCount:0
          },
        },


        //实景图全部数据
        sjAllData:{
          is_loading_sj_tab:false,
          is_show_sj:true,
          is_show_sj_add:false,
          
          currentPage:1,
          btnList:['sjBtn0'],
          preImgSrcList:[],
          uploaderList:[{uploader:null}],
          form:{
            buildingId:'',
            pageIndex:0,
            pageSize:10
          },
        
          sjtableData:{
            sceneList:[],
            rowCount:0
          },
          addNewsjType:{
            picType:0,
            buildingId:'',
            takeTime:'',
            imgList:[]
          },
          

          is_show_sj_edit:false,
          _btnList:['_sjBtn0'],
          _preImgSrcList:[
            {
              preImgSrc:''
            }          
          ],
          _uploaderList:[{uploader:null}],
          editNewsjType:{
            sceneId:'',
            takeTime:'',
            imgUrl:''
          }
        },

        //效果图全部数据
        xgAllData:{
          
          btnList:['xgBtn0'],
          preImgSrcList:[],
          uploaderList:[{uploader:null}],
          addNewxgType:{
            buildingId:'',
            imgList:[]
          }
        },

        //样板间全部数据
        ybjAllData:{
          btnList:['ybjBtn0'],
          preImgSrcList:[],
          uploaderList:[{uploader:null}],

          addNewybjType:{
            buildingId:'',
            imgList:[]
          }
        },

        //规划图全部数据
        ghAllData:{
          btnList:['ghBtn0'],
          preImgSrcList:[],
          uploaderList:[{uploader:null}],

          addNewghType:{
            buildingId:'',
            imgList:[]
          }
        },
 
        //交通图全部数据
        jtAllData:{
          btnList:['jtBtn0'],
          preImgSrcList:[],
          uploaderList:[{uploader:null}],

          addNewjtType:{
            buildingId:'',
            imgList:[]
          }
        },

        //配套图全部数据
        ptAllData:{
          btnList:['ptBtn0'],
          preImgSrcList:[],
          uploaderList:[{uploader:null}],

          addNewptType:{
            buildingId:'',
            imgList:[]
          }
        },

        
        //缩略图全部数据
        slAllData:{
          btnList:['slBtn0','slBtn1','slBtn2','slBtn3','slBtn4'],
          preImgSrcList:[{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''}],
          uploaderList:[{uploader:null},{uploader:null},{uploader:null},{uploader:null},{uploader:null}],
          bpList:[
            {
              bpId:'',
              imgUrl:''
            },
            {
              bpId:'',
              imgUrl:''
            },
            {
              bpId:'',
              imgUrl:''
            },
            {
              bpId:'',
              imgUrl:''
            },
            {
              bpId:'',
              imgUrl:''
            }
          ]
        },
       
        
        dialogVisible1:false,
        dialogImageUrl1:'',
      };
    },
    computed:{
      id:function(){
        return this.$store.getters.GetBuildingId
      }       
    },
    watch:{
     
    },
    created(){
      this.$store.dispatch('buildingIdAction',this.$route.query.buildingId)
      this.getLabelsData(2)
    },
    methods: {
      //大的tab切换
      handleClick(tab){
        console.log(tab.name)
        if(!this.id){
          if(tab.name != 'first'){
            message(this,'请先提交基本信息','warning')
            this.activeName = 'first'
            return;
          }
        }
      },
      //图片tab切换
      imgTabClick(tab){
        let name = tab.name;
        if(name == 'eight'){
          this.getSlData()
        }
      },
      //获取标签
      getLabelsData(type){
        let _this =this,
        body = {lableType:type};
        this.$http('/backstageBuilding/getBuildingLable', {}, {body}, {}, 'get').then(function (res) {
          if (res.data.code == 0) {
            _this.hxAllData.houseLableList = res.data.response.lableList;
          }
        })
      },
      //户型获取户型数据请求
      gethxdata(){
        let _this = this,
        body = this.hxAllData.form;
        body.buildingId = this.id;
        _this.hxAllData.is_loading_hx_tab=true;
        this.$http('/backstageBuilding/getBuildingHouseList',{},{body},{}).then(function(res){
          if(res.data.code == 0){
            _this.hxAllData.hxtableData = res.data.response;
          }
          _this.hxAllData.is_loading_hx_tab = false;
        })
      },
      //户型图页码切换
      hxListCurrentChange(page){
        this.hxAllData.form.pageIndex = page - 1;
        this.gethxdata()
      },
      //户型获取户型图详情
      gethxDetaildata(scope){
        let _this = this,
        body = {houseId:scope.houseId};
        this.$http('/backstageBuilding/getBuildingHouse',{},{body},{}).then(function(res){
          if(res.data.code == 0){
            _this.hxAllData.addNewHouseType = res.data.response;
            _this.hxAllData.addNewHouseType.houseLable = _this.hxAllData.addNewHouseType.houseLable.split(',');
            _this.hxAllData.preImgSrcList[0].preImgSrc = res.data.response.houseImgUrl;
          }
        })
      },
      //户型初始化上传插件对象
      initUploaderHx(index){
        let _this = this,
          btnName = 'hxBtn' + index;
        uploader2(function (src) {
          _this.hxAllData.preImgSrcList[0].preImgSrc = src;
        }, function (key) {
          _this.hxAllData.addNewHouseType.houseImgUrl = key;
        }, function () {
          _this.hxAllData.preImgSrcList[0].preImgSrc = '';
        }, function (uploader) {
          _this.hxAllData.uploaderList[index].uploader = uploader;
        }, btnName ,false)
      },
      //户型预览上传图
      previewImgHx(index){
        this.dialogImgSrc = this.hxAllData.preImgSrcList[index].preImgSrc
        this.dialogVisible = true;
      },
      //户型删除图片
      deleteImgHx(index){
        this.hxAllData.preImgSrcList[0].preImgSrc = '';
        this.hxAllData.addNewHouseType.houseImgUrl = '';
      },
      //户型开始上传
      imgUploaderHx(index){
      
        if (this.hxAllData.uploaderList[index].uploader == null) {
          return;
        }     
        this.hxAllData.uploaderList[index].uploader.start()   
      },
      //户型添加户型图
      show_add_hx_form(swi){
        this.hxAllData.is_show_hx_main = swi;
        if(!swi){
          this.hxAllData.type = 'add'
          this.hxAllData.preImgSrcList[0].preImgSrc = ''
          for(let i in this.hxAllData.addNewHouseType){
            if(i == 'houseLable'){
              this.hxAllData.addNewHouseType[i] = []
            }else if(i == 'room' || i == 'hall' || i == 'kitchen' || i=='bathRoom'){
              this.hxAllData.addNewHouseType[i] = 1
            }else if(i == 'houseNum' || i == 'saleNum' || i == 'forSaleNum' || i == 'scaleRoom'){
              this.hxAllData.addNewHouseType[i] = 0
            }else{
              this.hxAllData.addNewHouseType[i] = ''
            }
          }
        }
      },
      //户型编辑删除户型图
      handleHx(index,scope,type){
        let _this = this;
        if(type == 1){
          this.show_add_hx_form(false)
          this.hxAllData.type = 'edit'
          this.gethxDetaildata(scope)
        }else if(type == 2){
          let body = {houseId:scope.houseId}
          _this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.$http('/backstageBuilding/delBuildingHouseInfo',{body},{},{},'post').then(res => {
              if(res.data.response.status == 1){
                _this.gethxdata()
                message(_this,'删除成功','success')
              }else{
                message(_this,'删除失败','warning')
              }
            })
          }).catch(() => {
            
          })
        }
      },
      //户型确认修改添加户型图
      hx_updata_sure(formName){
        let _this = this,
        url = '',
        body = _.cloneDeep(_this.hxAllData.addNewHouseType);
        body.houseLable = body.houseLable.join(',');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$confirm('确认提交吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              if(this.hxAllData.type == 'add'){
                body.buildingId = this.id;
                delete body.houseId;
                url = '/backstageBuilding/insertBuildingHouseInfo';
              }else if(this.hxAllData.type == 'edit'){
                delete body.buildingId;
                url = '/backstageBuilding/editBuildingHouseInfo';
              }
              _this.$http(url,{body},{},{},'post').then(res => {
                if(res.data.response.status == 1){
                  _this.gethxdata()
                  _this.show_add_hx_form(true)
                  message(_this,'提交成功','success')
                }else{
                  message(_this,'提交失败','warning')
                }
              })
            }).catch(() => {
            
            })

          } else {
            message(_this,'有必填项未填写','warning')
          }
        })
      }, 
      




      //实景-获取实景图数据请求
      getsjdata(){
        let _this = this,
        body = _.cloneDeep(this.sjAllData.form);
        body.buildingId = this.id;
        _this.sjAllData.is_loading_sj_tab=true;
        this.$http('/backstageBuilding/getBuildingSceneList',{},{body},{}).then(res => {
          _this.sjAllData.is_loading_sj_tab = false;
          if(res.data.code == 0){
            _this.sjAllData.sjtableData = res.data.response;
          }
        })
      },
      //实景-获取实景图详情
      getsjDetaildata(scope){
        let _this = this,
        body = {sceneId:scope.sceneId};
        this.sjAllData.type = 'edit';
        this.$http('/backstageBuilding/getBuildingSceneInfo',{},{body},{},'get').then(function(res){
          
          if(res.data.code == 0){
            _this.sjAllData.editNewsjType = res.data.response;
            _this.sjAllData.is_show_sj = false;
            _this.sjAllData.is_show_sj_edit = true;
            _this.sjAllData._preImgSrcList[0].preImgSrc = _this.sjAllData.editNewsjType.imgUrl;
          }
        })
      },
      //实景-页码切换
      sjListCurrentChange(page){
        this.sjAllData.form.pageIndex = page - 1;
        this.getsjdata()
      },
      //实景-添加实景图
      addSj(){
        this.sjAllData.type = 'add';
        this.sjAllData.is_show_sj = false;
        this.sjAllData.is_show_sj_add = true;
        this.sjAllData.preImgSrcList = [];
        for(let i in this.sjAllData.addNewsjType){
          if(i == 'imgList'){
            this.sjAllData.addNewsjType[i] = []
          }else if(i == 'picType'){
            this.sjAllData.addNewsjType[i] = 0
          }else{
            this.sjAllData.addNewsjType[i] = ''
          }
        }
      },
      //实景图-返回列表
      backSj(type){
        if(type == 1){
          this.sjAllData.is_show_sj_add = false;
          this.sjAllData.is_show_sj = true;
        }else{
          this.sjAllData.is_show_sj_edit = false;
          this.sjAllData.is_show_sj = true;
        }
      },
      //实景-查看编辑删除实景图
      handleSj(index,scope,type){
        let _this=this;
        if(type==1){
          this.getsjDetaildata(scope)
        }else if(type==2){
          _this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            let _this = this,
            body = {sceneId:scope.sceneId};
            this.$http('/backstageBuilding/delBuildingPicInfo',{body},{},{},'post').then(function(res){
              
              if(res.data.code == 0){
                if(res.data.response.status == 1){
                  message(_this,'删除成功','success')
                  _this.getsjdata()
                }
              }
            })
          }).catch(() => {
            
          })
        }
      },
      //实景-确认更新添加实景图
      sj_updata_sure(type){

        let _this=this;
        if(_this.sjAllData.addNewsjType.takeTime==''){
          _this.$message({
            type: 'warning',
            message: '请选择时间'
          });
          return;
        }

        _this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let body,url;
          if(type == 1){
            url = '/backstageBuilding/insertBuildingPicInfo';
            body = _this.sjAllData.addNewsjType;
            body.buildingId = _this.id
          }else{
            url = '/backstageBuilding/editBuildingSceneInfo'
            body = _this.sjAllData.editNewsjType;
          }
          
          body.takeTime = formatTime(body.takeTime);
          _this.$http(url,{body},{},{},'post').then(res => {
            if(res.data.response.status == 1){
              message(_this,'提交成功','success')
              _this.getsjdata();
              _this.sjAllData.is_show_sj = true;
              if(type == 1){
                _this.sjAllData.is_show_sj_add = false;
              }else{
                _this.sjAllData.is_show_sj_edit = false;
              }
            }else{
              message(_this,res.data.message,'warning')
            }
          })

        }).catch(() => {
          message(_this,'已取消','info');       
        });
      },
      //实景-初始化上传插件对象
      initUploaderSj(index){
        let _this = this,
          btnName = 'sjBtn' + index;
        uploader2(function (src) {
          _this.sjAllData.preImgSrcList.push({preImgSrc:src});
        }, function (key) {
          _this.sjAllData.addNewsjType.imgList.push({imgUrl:key});
        }, function () {
          let len = _this.sjAllData.preImgSrcList.length;
          _this.sjAllData.preImgSrcList.splice(len-1,1);
        }, function (uploader) {
          _this.sjAllData.uploaderList[index].uploader = uploader;
        }, btnName)
      },
      _initUploaderSj(index){
        let _this = this,
          btnName = '_sjBtn' + index;
        uploader2(function (src) {
          _this.sjAllData._preImgSrcList[0].preImgSrc = src;
        }, function (key) {
          _this.sjAllData.editNewsjType.imgUrl = key;
        }, function () {
          _this.sjAllData._preImgSrcList[0].preImgSrc = '';
        }, function (uploader) {
          _this.sjAllData._uploaderList[index].uploader = uploader;
        }, btnName,false)
      },
      //实景-预览上传图
      previewImgSj(index){
        this.dialogImgSrc = this.sjAllData.preImgSrcList[index].preImgSrc
        this.dialogVisible = true;
      },
      _previewImgSj(index){
        this.dialogImgSrc = this.sjAllData.preImgSrcList[index].preImgSrc
        this.dialogVisible = true;
      },
      //实景-删除图片
      deleteImgSj(index){
        this.sjAllData.preImgSrcList.splice(index,1);
        this.sjAllData.addNewsjType.imgList.splice(index,1);
      },
      _deleteImgSj(index){
        this.sjAllData._preImgSrcList[0].imgUrl = '';
        this.sjAllData.editNewsjType.imgUrl = ''
      },
      //实景-开始上传
      imgUploaderSj(index){
        if (this.sjAllData.uploaderList[index].uploader == null) {
          return;
        }     
        this.sjAllData.uploaderList[index].uploader.start()
      },
      _imgUploaderSj(index){
        if (this.sjAllData._uploaderList[index].uploader == null) {
          return;
        }     
        this.sjAllData._uploaderList[index].uploader.start()
      },



    
      //效果图-初始化上传插件对象
      initUploaderXg(index){
        let _this = this,
          btnName = 'xgBtn' + index;
        uploader2(function (src) {
          _this.xgAllData.preImgSrcList.push({imgUrl:src});
        }, function (key) {
          _this.xgAllData.addNewxgType.imgList.push({imgUrl:key});
        }, function () {
          let len = _this.xgAllData.preImgSrcList.length;
          _this.xgAllData.preImgSrcList.splice(len-1,1);
        }, function (uploader) {
          _this.xgAllData.uploaderList[index].uploader = uploader;
        }, btnName)
      },
      //效果图-预览上传图
      previewImgXg(index){
        this.dialogImgSrc = this.xgAllData.preImgSrcList[index].imgUrl;
        this.dialogVisible = true;
      },
      //效果图-删除图片
      deleteImgXg(index){
        this.xgAllData.preImgSrcList.splice(index,1);
        this.xgAllData.addNewxgType.imgList.splice(index,1);
      },
      //效果图-开始上传
      imgUploaderXg(index){
        if (this.xgAllData.uploaderList[index].uploader == null) {
          return;
        }     
        this.xgAllData.uploaderList[index].uploader.start()
      },





      //样板间-初始化上传插件对象
      initUploaderYbj(index){
        let _this = this,
          btnName = 'ybjBtn' + index;
        uploader2(function (src) {
          _this.ybjAllData.preImgSrcList.push({imgUrl:src});
        }, function (key) {
          _this.ybjAllData.addNewybjType.imgList.push({imgUrl:key});
        }, function () {
          let len = _this.ybjAllData.preImgSrcList.length;
          _this.ybjAllData.preImgSrcList.splice(len-1,1);
        }, function (uploader) {
          _this.ybjAllData.uploaderList[index].uploader = uploader;
        }, btnName)
      },
      //样板间-预览上传图
      previewImgYbj(index){
        this.dialogImgSrc = this.ybjAllData.preImgSrcList[index].imgUrl
        this.dialogVisible = true;
      },
      //样板间-删除图片
      deleteImgYbj(index){
        this.ybjAllData.preImgSrcList.splice(index,1);
        this.ybjAllData.addNewybjType.imgList.splice(index,1);
      },
      //样板间-开始上传
      imgUploaderYbj(index){
        if (this.ybjAllData.uploaderList[index].uploader == null) {
          return;
        }     
        this.ybjAllData.uploaderList[index].uploader.start()
      },


      


      //规划图-初始化上传插件对象
      initUploaderGh(index){
        let _this = this,
          btnName = 'ghBtn' + index;
        uploader2(function (src) {
          _this.ghAllData.preImgSrcList.push({imgUrl:src});
        }, function (key) {
          _this.ghAllData.addNewghType.imgList.push({imgUrl:key});
        }, function () {
          let len = _this.ghAllData.preImgSrcList.length;
          _this.ghAllData.preImgSrcList.splice(len-1,1);
        }, function (uploader) {
          _this.ghAllData.uploaderList[index].uploader = uploader;
        }, btnName)
      },
      //规划图-预览上传图
      previewImgGh(index){
        this.dialogImgSrc = this.ghAllData.preImgSrcList[index].imgUrl
        this.dialogVisible = true;
      },
      //规划图-删除图片
      deleteImgGh(index){
        this.ghAllData.preImgSrcList.splice(index,1);
        this.ghAllData.addNewghType.imgList.splice(index,1);
      },
      //规划图-开始上传
      imgUploaderGh(index){
        if (this.ghAllData.uploaderList[index].uploader == null) {
          return;
        }     
        this.ghAllData.uploaderList[index].uploader.start()
      },


      //交通图-初始化上传插件对象
      initUploaderJt(index){
        let _this = this,
          btnName = 'jtBtn' + index;
        uploader2(function (src) {
          _this.jtAllData.preImgSrcList.push({imgUrl:src});
        }, function (key) {
          _this.jtAllData.addNewjtType.imgList.push({imgUrl:key});
        }, function () {
          let len = _this.jtAllData.preImgSrcList.length;
          _this.jtAllData.preImgSrcList.splice(len-1,1);
        }, function (uploader) {
          _this.jtAllData.uploaderList[index].uploader = uploader;
        }, btnName)
      },
      //交通图-预览上传图
      previewImgJt(index){
        this.dialogImgSrc = this.jtAllData.preImgSrcList[index].imgUrl
        this.dialogVisible = true;
      },
      //交通图-删除图片
      deleteImgJt(index){
        this.jtAllData.preImgSrcList.splice(index,1);
        this.jtAllData.addNewjtType.imgList.splice(index,1);
      },
      //交通图-开始上传
      imgUploaderJt(index){
        if (this.jtAllData.uploaderList[index].uploader == null) {
          return;
        }     
        this.jtAllData.uploaderList[index].uploader.start()
      },


      //配套图-初始化上传插件对象
      initUploaderPt(index){
        let _this = this,
          btnName = 'ptBtn' + index;
        uploader2(function (src) {
          _this.ptAllData.preImgSrcList.push({imgUrl:src});
        }, function (key) {
          _this.ptAllData.addNewptType.imgList.push({imgUrl:key});
        }, function () {
          let len = _this.ptAllData.preImgSrcList.length;
          _this.ptAllData.preImgSrcList.splice(len-1,1);
        }, function (uploader) {
          _this.ptAllData.uploaderList[index].uploader = uploader;
        }, btnName)
      },
      //配套图-预览上传图
      previewImgPt(index){
        this.dialogImgSrc = this.ptAllData.preImgSrcList[index].imgUrl
        this.dialogVisible = true;
      },
      //配套图-删除图片
      deleteImgPt(index){
        this.ptAllData.preImgSrcList.splice(index,1);
        this.ptAllData.addNewptType.imgList.splice(index,1);
      },
      //配套图-开始上传
      imgUploaderPt(index){
        if (this.ptAllData.uploaderList[index].uploader == null) {
          return;
        }     
        this.ptAllData.uploaderList[index].uploader.start()
      },




      //缩略图-初始化上传插件对象
      initUploaderSl(index){
        let _this = this,
          btnName = 'slBtn' + index;
        uploader2(function (src) {
          _this.slAllData.preImgSrcList[index].imgUrl = src;
        }, function (key) {
          _this.slAllData.bpList[index].imgUrl = key;
        }, function () {
          console.log(_this.slAllData.preImgSrcList)
          _this.slAllData.preImgSrcList[index].imgUrl = '';
        }, function (uploader) {
          _this.slAllData.uploaderList[index].uploader = uploader;
        }, btnName,false)
      },
      //缩略图-预览上传图
      previewImgSl(index){
        this.dialogImgSrc = this.slAllData.preImgSrcList[index].imgUrl
        this.dialogVisible = true;
      },
      //缩略图-删除图片
      deleteImgSl(index){
        this.slAllData.preImgSrcList[index].imgUrl = '';
        this.slAllData.bpList[index].imgUrl = ''
      },
      //缩略图-开始上传
      imgUploaderSl(index){
      
        if (this.slAllData.uploaderList[index].uploader == null) {
          return;
        }     
        this.slAllData.uploaderList[index].uploader.start()
      },
      //缩略图-获取
      getSlData(){
        let _this = this;
        if(this.id == ''){
          return;
        }
        let body = {
          buildingId: this.id
        }
        
        this.$http('/backstageBuilding/getBuildingThumbnail',{},{body},{},'get').then(res => {
          if(res.data.code == 0){
            _this.slAllData.bpList = res.data.response.imgList
            _this.slAllData.bpList.forEach( (item,index) => {
              _this.slAllData.preImgSrcList[index].imgUrl = item.imgUrl;
            })
          }
        })
      },
      //缩略图-提交
      sl_img_submit(){
        let _this = this;
        this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let body = {bpList:_this.slAllData.bpList};
          
          _this.$http('/backstageBuilding/editBuildingThumbnail',{body},{},{},'post').then(res => {
            if(res.data.response.status == 1){
              message(_this,'提交成功','success')
            }else{
              message(_this,'提交失败','warning')
            }
          })
        }).catch(() => {
            
        })
      },

      //图-提交
      img_submit(type){
        let _this = this;
        this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let body = {},
          url;

          if(this.$route.query.type && this.$route.query.type == 'edit'){
            url = '/backstageBuilding/editBuildingPicInfo'
          }else{
            url = '/backstageBuilding/insertBuildingPicInfo'
          }
          
          if(type == 4){
            body = _.cloneDeep(this.xgAllData.addNewxgType);
          }else if(type == 3){
            body = _.cloneDeep(this.ybjAllData.addNewybjType);
          }else if(type == 1){
            body = _.cloneDeep(this.jtAllData.addNewjtType);
          }else if(type == 5){
            body = _.cloneDeep(this.ghAllData.addNewghType);
          }else if(type == 2){
            body = _.cloneDeep(this.ptAllData.addNewptType);
          }
          body.buildingId = _this.id;
          body.picType = type;
          _this.$http(url,{body},{},{},'post').then(res => {
            if(res.data.response.status == 1){
              message(_this,'提交成功','success')
            }else{
              message(_this,'提交失败','warning')
            }
          })
        }).catch(() => {
            
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
      let _this = this;
      this.initUploaderSj(0);
      this.initUploaderHx(0);
      this.initUploaderXg(0);
      this.initUploaderYbj(0);
      this.initUploaderGh(0);
      this.initUploaderJt(0);
      this.initUploaderPt(0);
      this.initUploaderSl(0);
      this.initUploaderSl(1);
      this.initUploaderSl(2);
      this.initUploaderSl(3);
      this.initUploaderSl(4);
      this._initUploaderSj(0);

      this.$store.dispatch('mainLoadingAction',true);
      this.$store.dispatch('defaultIndexAction','/estate/estatemanagement');

      var that=this
      setTimeout(function(){
        that.$store.dispatch('mainLoadingAction',false);
      },300) 
    }
  }
</script>

<style scoped>
.no-img{text-align: center;line-height: 200px;color: #777}
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

.addtit{text-align: center;margin-bottom: 50px}

</style>

<style>
  .el-table__body-wrapper{overflow: hidden;}
  .estateadd  .el-table th>.cell{text-align: center;}
  .estateadd  .el-table .cell{text-align: center;}
  
  .el-menu--horizontal .el-submenu>.el-menu{overflow-y: hidden;}
  .previewFormItem .el-form-item__content{padding: 20px;border: 1px solid #ccc;width: 840px;min-height: 160px}
</style>
