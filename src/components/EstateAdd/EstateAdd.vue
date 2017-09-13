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
              <el-form-item label="标题" style="width:400px" :required="true" prop="title">
                <el-input v-model="add_new_estate_form.title" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="楼盘别名" style="width:400px"  prop="alias">
                <el-input v-model="add_new_estate_form.alias" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item label="描述"  prop="desc">
                <el-input v-model="add_new_estate_form.desc" style="width:70%" type="textarea" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item label="物业类型" :required="true" prop="type">
                <el-radio-group v-model="add_new_estate_form.type">
                  <el-radio :label="1">普通住宅</el-radio>
                  <el-radio :label="2">公寓</el-radio>
                  <el-radio :label="3">商住</el-radio>
                  <el-radio :label="4">别墅</el-radio>
                  <el-radio :label="5">其他</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="销售状态" :required="true" prop="state">
                <el-radio-group v-model="add_new_estate_form.state">
                  <el-radio :label="1">在售</el-radio>
                  <el-radio :label="2">待售</el-radio>
                  <el-radio :label="3">售罄</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="开盘日期"  prop="openingDate">
                <el-date-picker
                  v-model="add_new_estate_form.openingDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                <span style="color:#999;font-size:12px">主要是以开盘说明为准，这里用于开盘日历及列表排序</span>
              </el-form-item>

              <el-form-item label="交房日期"  prop="handoverDate">
                <el-date-picker
                  v-model="add_new_estate_form.handoverDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="均价"  prop="averagePrice">
                <el-input v-model="add_new_estate_form.averagePrice" style="width:100px" auto-complete="off"></el-input>
                <span style="color:#999;font-size:12px">单位是：元/M2,不填写为待定;</span>
              </el-form-item>
             
              <el-form-item label="装修程度" :required="true" prop="decorationDegree">
                <el-radio-group v-model="add_new_estate_form.decorationDegree">
                  <el-radio :label="1">毛坯</el-radio>
                  <el-radio :label="2">简单装修</el-radio>
                  <el-radio :label="3">中档装修</el-radio>
                  <el-radio :label="4">高档装修</el-radio>
                  <el-radio :label="5">豪华装修</el-radio>
                  <el-radio :label="6">其它</el-radio>
                </el-radio-group>
              </el-form-item>
              
              <el-form-item label="楼层" :required="true"  prop="floor">
                <el-checkbox-group v-model="add_new_estate_form.floor">
                  <el-checkbox label="1">底层</el-checkbox>
                  <el-checkbox label="2">多层</el-checkbox>
                  <el-checkbox label="3">小高层</el-checkbox>
                  <el-checkbox label="4">高层</el-checkbox>
                  <el-checkbox label="5">超高层</el-checkbox>
                </el-checkbox-group>
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
                  <el-radio :label="1">现房</el-radio>
                  <el-radio :label="2">准现房</el-radio>
                  <el-radio :label="3">期房</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="产权年限" style="width:200px"  prop="year">
                <el-input v-model="add_new_estate_form.year" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item label="楼盘特色标签"   prop="feature">
                <el-checkbox-group v-model="add_new_estate_form.feature">
                  <el-checkbox label="1">地铁沿线房</el-checkbox>
                  <el-checkbox label="2">学区置业房</el-checkbox>
                  <el-checkbox label="3">甜蜜新婚房</el-checkbox>
                  <el-checkbox label="4">投资置业房</el-checkbox>
                  <el-checkbox label="5">生态景观房</el-checkbox>
                  <el-checkbox label="6">单身贵族房</el-checkbox>
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
                <el-input v-model="add_new_estate_form.metro" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="环线"  prop="loopLine">
                <el-radio-group v-model="add_new_estate_form.loopLine">
                  <el-radio :label="1">一环以内</el-radio>
                  <el-radio :label="2">一至二环</el-radio>
                  <el-radio :label="3">二至三环</el-radio>
                  <el-radio :label="4">三至四环</el-radio>
                  <el-radio :label="5">四至五环</el-radio>
                  <el-radio :label="6">五至六环</el-radio>
                  <el-radio :label="7">六环外</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="楼盘地址" style="width:400px"  prop="buildingAddress">
                <el-input v-model="add_new_estate_form.buildingAddress" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="接待时间" style="width:400px">
                
                  <el-time-picker
                    is-range
                    v-model="add_new_estate_form.recepationtime"
                    placeholder="选择时间范围">
                  </el-time-picker>
              
              </el-form-item>
              <el-form-item label="交通路线" style="width:400px"  prop="trafficRoute">
                <el-input v-model="add_new_estate_form.trafficRoute" type="textarea" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="地图" style="width:200px">
                <el-button type="primary" @click="show_map" size="mini">标注位置</el-button>
                <div id="container" tabindex="0" v-show="is_show_map" style="width:800px;height:400px"></div>
              </el-form-item>
            </el-form>
          </div>

          <div class="first_item_3">
            <p class="tit">
              楼盘-服务信息
            </p>
            
            <el-form :model="add_new_estate_form"  label-width="100px" class="demo-dynamic" style="width:60%;margin-left:15%;margin-top:40px">
              <el-form-item label="售楼电话" style="width:400px"  prop="sailphone">
                <el-input v-model="add_new_estate_form.sailphone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="售楼地址" style="width:400px"  prop="sailaddress">
                <el-input v-model="add_new_estate_form.sailaddress" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="物业费" style="width:400px"  prop="propertyfee">
                <el-input v-model="add_new_estate_form.propertyfee" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="物业公司" style="width:400px"  prop="propertycompany">
                <el-input v-model="add_new_estate_form.propertycompany" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="楼盘开发商" style="width:600px"  prop="buildBuild">
                <el-input v-model="add_new_estate_form.buildBuild" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="预售许可证书" style="width:600px"  prop="ys">
                <el-input v-model="add_new_estate_form.ys" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="发证时间" style="width:600px"  prop="fz">
              
                <el-date-picker
                  v-model="add_new_estate_form.fz"
                  type="date"
                  placeholder="选择日期"
                 >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="绑定楼栋" style="width:600px"  prop="bd">
                <el-input v-model="add_new_estate_form.bd" type="textarea" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div>
            <el-button style="margin-left:320px" @click="submitForm('add_new_estate_form_ref')" type="primary">提交</el-button>
            <el-button>取消</el-button>
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
        <el-tab-pane label="楼盘相册" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="楼盘报告" name="fourth" style="padding:20px">
          <div v-show="!is_show_updata_repeat_swi">
            <el-button type="primary" @click="is_show_updata_repeat(true)">添加报告</el-button>
            <el-table
              v-loading="is_loading_baogao_tab"
              :data="repeat_tableData"
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
                    @click="handleEdit(scope.$index, scope.row,1)">
                    上线
                  </el-button>
                  <el-button
                  size="small"
                  @click="handleEdit(scope.$index, scope.row,2)">
                    预览
                  </el-button>
                  <el-button
                  size="small"
                  @click="handleEdit(scope.$index, scope.row,3)">
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
              :data="score_tableData"
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
              <el-button type="primary" v-show="!is_score_form_disabled" @click="sure_add_score('add_new_score_form_ref')">保存</el-button>
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

      return {
        coordinatearr,
        pdfsrc:'/static/pdf.pdf',
        isshowpdf:false,
        is_loading_baogao_tab:false,
        is_show_score_swi:false,
        repeat_tableData:[
          {id:1,name:'xx报告',type:'工程质量',state:'下线',time:'2017-9-10',reporter:'丁军伟'}
        ],
        score_tableData:[
          {id:1,time:'2017-9-11',gczl:'9',ghsj:'9',ghls:'8',zbpt:'7',reporter:'djw'},
          {id:2,time:'2017-9-12',gczl:'1',ghsj:'1',ghls:'1',zbpt:'1',reporter:'hhh'}
        ],
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
        is_show_updata_repeat_swi:false,
        is_loading_score_tab:false,
        is_show_map:false,
        activeName:"first",
        secondLevel:'楼盘管理',
        threeLevel:'添加楼盘',
        add_new_estate_form:{
          sheng:'',
          shi:'',
          qu:'',
          title:'',
          alias:'',
          desc:'',
          type:'',
          state:'',
          openingDate:'',
          handoverDate:'',
          averagePrice:'',
          decorationDegree:'',
          floor:[],
          buildingType:'',
          existing:'',
          year:'',
          feature:[],
          metro:'',
          buildingAddress:'',
          recepationtime:'',
          trafficRoute:'',
          sailphone:'',
          sailaddress:'',
          propertyfee:'',
          propertycompany:'',
          buildBuild:'',
          addressJW:[],
          ys:'',
          fz:'',
          bd:''
        },
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
        add_new_estate_form_rule: {
          title: [
            { validator: validateTitle, trigger: 'blur' }
          ],
          type: [
            { validator: validateType, trigger: 'blur' }
          ],
          state: [
            { validator: validateState, trigger: 'blur' }
          ],
          decorationDegree: [
            { validator: validateDecorationDegree, trigger: 'blur' }
          ],
          floor: [
            { validator: validateFloor, trigger: 'blur' }
          ],
          existing: [
            { validator: validateExisting, trigger: 'blur' }
          ],
        },
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
        markers:[],
        center:[116.480983, 40.0958],      
      };
    },
    filters:{
     
    },
    computed:{
                               
    },
    watch:{
      'area':{
        handler:function(val){
          console.log(val)
        },
        deep:true
      },
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
      this.getdata()
    },
    methods: {
      getdata(){
        let _this=this;
        _this.is_loading_tab=true;
        this.$http('/activitymanagement').then(function(res){
          console.log(res)
          if(res.data.code==1000){
            _this.tableData=res.data.data;
          }
          _this.is_loading_tab=false;
        }).catch(function(err){
          console.log(err)
        })
      },
      submitForm(formName) {
        let _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(_this.add_new_estate_form)
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

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
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
      show_map(){
        this.is_show_map=!this.is_show_map
      },
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
          _this.add_new_estate_form.addressJW=[e.lnglat.getLng(),e.lnglat.getLat()]        
          var marker = new AMap.Marker({
            position: add_arr,
            map
          });
          _this.markers.push(marker)
        });
      },
      addid(){
        this.additionalInformationForm.id_arr.push({id:''})
      },
      is_show_updata_repeat(swi){
        this.is_show_updata_repeat_swi=swi
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
      begin_updata(){
        this.$refs.updata_repeat_input.click()
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
      sure_updata(){

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
  height: 100px
}
.first_item_1,.first_item_2,.first_item_3{border: 1px solid #eee;margin:20px;}
.first_item_1 .tit,.first_item_2 .tit,.first_item_3 .tit{height: 30px;background: rgba(32,160,255,.8);color: white;line-height: 30px;font-size: 12px;padding: 0px 20px; }

</style>

<style>
  .estateadd  .el-table th>.cell{text-align: center;}
  .estateadd  .el-table .cell{text-align: center;}
</style>
