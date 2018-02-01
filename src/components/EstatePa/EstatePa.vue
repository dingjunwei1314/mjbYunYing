<template>
	<div class="estate-pa">
		<div v-show="showType == 1">
			<el-button type="text" @click="add">新建</el-button>
		    <el-table
		      v-loading="tabLoading"
		      :data="paData.buidingVRList"
		      border
		      tooltip-effect="dark"
		      style="font-size:12px!important;text-align:center;margin-top:20px">
		      <el-table-column
		        prop="id"
		        label="ID"
		        min-width="60">
		      </el-table-column>
		      <el-table-column
		        prop="airscapeUrl"
		        label="鸟瞰图"
		        min-width="100">
		        <template scope="scope">
		        	<p :title="scope.row.airscapeUrl" class="url-p">{{scope.row.airscapeUrl}}</p>
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="sceneUrl"
		        label="楼盘实景"
		        min-width="100">
		        <template scope="scope">
		        	<p :title="scope.row.sceneUrl" class="url-p">{{scope.row.sceneUrl}}</p>
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="sampleUrl"
		        label="样板间"
		        min-width="100">
		        <template scope="scope">
		        	<p :title="scope.row.sampleUrl" class="url-p">{{scope.row.sampleUrl}}</p>
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="sandTableUrl"
		        label="楼盘沙盘"
		        min-width="100">
		        <template scope="scope">
		        	<p :title="scope.row.sandTableUrl" class="url-p">{{scope.row.sandTableUrl}}</p>
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="perimetUrl"
		        label="周边配套"
		        min-width="100">
		        <template scope="scope">
		        	<p :title="scope.row.perimetUrl" class="url-p">{{scope.row.perimetUrl}}</p>
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="createDate"
		        label="创建时间"
		        min-width="150">
		      </el-table-column>
		      <el-table-column
		        prop="editTime"
		        label="最近更新时间"
		        min-width="150">
		      </el-table-column>
		      <el-table-column
		        width="300"
		        label="操作">
		        <template scope="scope">
		          <el-button
		            size="small"
		            @click="handle(scope.row,1)">
		            查看
		          </el-button>
		          <el-button
		            size="small"
		            @click="handle(scope.row,2)">
		            编辑
		          </el-button>
		          <el-button
		            size="small"
		            @click="handle(scope.row,3)">
		            删除
		          </el-button>
		        </template>
		      </el-table-column>
		    </el-table>
		    <el-pagination
	          v-show="paData.rowCount>0"
	          style="margin: 0 auto;text-align:center;margin-top:20px"
	          layout="prev, pager, next"
	          :page-size=10
	          :currentPage="currentPage"
	          @current-change="currentChange"
	          :total="paData.rowCount">
	        </el-pagination>
	    </div>
	    <div v-show="showType == 2">
	    	<el-button type="text" @click="back">返回列表</el-button>
            <el-form 
              :model="handleForm" 
              label-width="100px" 
              class="demo-dynamic" 
              style="width:70%;margin:0 auto;margin-top:40px"> 
              
           
              <el-form-item label="全景缩略图" style="width:800px" required>
				
				<ImgPreview 
                  :backgroundPicUrl="preImgSrcList[0].preImgSrc"
                  :isShowDelete="handleType != 'view'"
                  @previewImg="previewImgPa(0)"
                  @deleteImg="deleteImgPa(0)"
                />

             	<ImgUploader2
             	  v-show = "handleType != 'view'"
                  :btnId="btnList[0]"
                  @imgUploader="imgUploaderPa(0)"
                /> 
              </el-form-item>

              <el-form-item label="鸟瞰图">
              	<a v-if="handleType=='view'" class="pa-href" :href="handleForm.airscapeUrl" target="_blank">{{handleForm.airscapeUrl}}</a>
              	<div v-else>
              		<el-input size="small" style="width:350px" v-model="handleForm.airscapeUrl"></el-input>
               		<el-button style="margin-left: 10px" type="text" @click="see('airscapeUrl')">查看</el-button>
              	</div>
              </el-form-item>

              <el-form-item label="楼盘实景">
              	<a v-if="handleType=='view'" class="pa-href" :href="handleForm.sceneUrl" target="_blank">{{handleForm.sceneUrl}}</a>
              	<div v-else>
                	<el-input size="small" style="width:350px" v-model="handleForm.sceneUrl"></el-input>
                	<el-button style="margin-left: 10px" type="text" @click="see('sceneUrl')">查看</el-button>
                </div>
              </el-form-item>

              <el-form-item label="样板间">
              	<a v-if="handleType=='view'" class="pa-href" :href="handleForm.sampleUrl" target="_blank">{{handleForm.sampleUrl}}</a>
              	<div v-else>
                    <el-input size="small" style="width:350px" v-model="handleForm.sampleUrl"></el-input>
                    <el-button style="margin-left: 10px" type="text" @click="see('sampleUrl')">查看</el-button>
                </div>
              </el-form-item>

              <el-form-item label="楼盘沙盘">
              	<a v-if="handleType=='view'" class="pa-href" :href="handleForm.sandTableUrl" target="_blank">{{handleForm.sandTableUrl}}</a>
              	<div v-else>
                    <el-input size="small" style="width:350px" v-model="handleForm.sandTableUrl"></el-input>
                    <el-button style="margin-left: 10px" type="text" @click="see('sandTableUrl')">查看</el-button>
                </div>
              </el-form-item>

              <el-form-item label="周边配套">
              	<a v-if="handleType=='view'" class="pa-href" :href="handleForm.perimetUrl" target="_blank">{{handleForm.perimetUrl}}</a>
              	<div v-else>
                    <el-input size="small" style="width:350px" v-model="handleForm.perimetUrl"></el-input>
                    <el-button style="margin-left: 10px" type="text" @click="see('perimetUrl')">查看</el-button>
                </div>
              </el-form-item>

              <el-form-item label="首张全景" required>
              	<span v-if="handleType=='view' && handleForm.vrType==1">鸟瞰图</span>
              	<span v-else-if="handleType=='view' && handleForm.vrType==2">楼盘实景</span>
              	<span v-else-if="handleType=='view' && handleForm.vrType==3">样板间</span>
              	<span v-else-if="handleType=='view' && handleForm.vrType==4">楼盘沙盘</span>
              	<span v-else-if="handleType=='view' && handleForm.vrType==5">周边配套</span>
                <el-radio-group v-model="handleForm.vrType" v-else>
                  <el-radio :label="1">鸟瞰图</el-radio>
                  <el-radio :label="2">楼盘实景</el-radio>
                  <el-radio :label="3">样板间</el-radio>
                  <el-radio :label="4">楼盘沙盘</el-radio>
                  <el-radio :label="5">周边配套</el-radio>
                </el-radio-group>
              </el-form-item>  

              <el-form-item label="本期更新内容" v-if="handleType!='add'">
              	<span v-if="handleForm.updateMessage">{{handleForm.updateMessage}}</span>
              	<span v-else>--</span>
              </el-form-item>

              <el-form-item label="创建人" v-if="handleType!='add'">
              	<span v-if="handleForm.createMan">{{handleForm.createMan}}&nbsp&nbsp&nbsp{{handleForm.createDate}}</span>
              	<span v-else>--</span>

              </el-form-item>

              <el-form-item label="最近编辑" v-if="handleType!='add'">
              	<span v-if="handleForm.editMan">{{handleForm.editMan}}&nbsp&nbsp&nbsp{{handleForm.editTime}}</span>
              	<span v-else>--</span>
              </el-form-item>

              <el-form-item label="">
                <el-button v-show="handleType!='view'" style="margin-left:100px" type="primary" @click="sure">
                  确认
                </el-button>
              </el-form-item>
            </el-form> 
	    </div>
	    <el-dialog :visible.sync="dialogVisible" size="tiny">
	      <img width="100%" :src="dialogImgSrc" alt="">
	    </el-dialog>
	</div>
</template>

<script>
	import message from '../../common/message';
	import uploader2 from '../../common/uploader2.js';
	import ImgUploader2 from '../Common/ImgUploader2/ImgUploader2';
	import ImgPreview from '../Common/ImgPreview/ImgPreview';
	export default{
		name:'',
		components:{
			ImgPreview,
			ImgUploader2
		},
		data(){
			return{
				tabLoading:false,
				currentPage:1,
				handleType:'',
				showType:1,
				dialogVisible:false,
				dialogImgSrc:'',
				btnList:['paBtn0'],
				preImgSrcList:[{preImgSrc:''}],
          		uploaderList:[{uploader:null}],
				form:{
					buidingId:'',
					pageNum:0,
					pageSize:10
				},
				handleForm:{
					buidingId:'',
					picUrl:'',
					airscapeUrl:'',
					sceneUrl:'',
					sampleUrl:'',
					sandTableUrl:'',
					perimetUrl:'',
					vrType:1,
				},
		        paData:{
		          buidingVRList:[],
		          rowCount:0,
		        },
			}
		},
		computed:{
			id:function(){
				return this.$store.getters.GetBuildingId;
			}
		},
		created(){
		 	this.initUploaderPa(0);
		},
		methods:{
	      //获取数据
	      getData(){
	      		if(this.$route.query.type && this.$route.query.type == 'add'){
					return;
	      		}
		        let [_this,body] = [this,_.cloneDeep(this.form)];
		        body.buidingId = this.id;
		        _this.tabLoading = true;
		        this.$http('/backstageBuilding/getBuildVRList',{body},{},{},'post').then(res =>{ 
		          _this.tabLoading = false;
		          if(res.data.code == 0){
		            _this.paData = res.data.response;
		          }
		        })
	      },
		  //新增
		  add(){
		  	let _this = this;
		  	for(let i in this.handleForm){
		  		this.handleForm[i] = '';
		  	}
		  	this.preImgSrcList[0].preImgSrc = '';
			this.handleType = "add";
			this.showType = 2;
			this.handleForm.vrType = 1;
			this.$http('/backstageBuilding/selBuildVRInfo',{body:{buidingId:this.id}},{},{},'post').then(res =>{ 
	          if(res.data.code == 0){
	          	if(res.data.response.buidingVRList.length > 0){
					_this.handleForm = res.data.response.buidingVRList[0];
					_this.preImgSrcList[0].preImgSrc = _this.handleForm.picUrl;
	          	}
	          }
	        })
		  },
		  //返回
		  back(){
			this.showType = 1;
		  },
		  //查看
		  see(name){
			if(this.handleForm[name] == ''){
				message(this,'请先输入URL地址','warning')
				return;
			}
			window.open(this.handleForm[name])
		  },
		  //确认提交
		  sure(){
		  	if(this.handleForm.airscapeUrl=='' && this.handleForm.vrType==1){
		  		message(this,'请填写鸟瞰图全景地址','warning');
				return;
		  	}
		  	if(this.handleForm.sceneUrl=='' && this.handleForm.vrType==2){
		  		message(this,'请填写楼盘实景全景地址','warning');
				return;
		  	}
		  	if(this.handleForm.sampleUrl=='' && this.handleForm.vrType==3){
		  		message(this,'请填写样板间全景地址','warning');
				return;
		  	}
		  	if(this.handleForm.sandTableUrl=='' && this.handleForm.vrType==4){
		  		message(this,'请填写楼盘沙盘全景地址','warning');
				return;
		  	}
		  	if(this.handleForm.perimetUrl=='' && this.handleForm.vrType==5){
		  		message(this,'请填写周边配套全景地址','warning');
				return;
		  	}
		  	if(this.handleForm.vrType == ''){
		  		message(this,'请选择首张全景图','warning');
				return;
		  	}
			let [_this,body,url] = [this,_.cloneDeep(this.handleForm)];
			body.buidingId = this.id;
			url = this.handleType == 'add'? '/backstageBuilding/addBuildVR':'/backstageBuilding/editBuildVRInfo';
			delete body.createDate;
			delete body.createMan;
			delete body.editMan;
			delete body.editTime;
			delete body.createDate;
			delete body.updateMessage;
			if(this.handleType == 'add'){
				delete body.id;
			}
			_this.$confirm('确认提交吗?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	          }).then(() => {
	          	_this.$http(url,{body},{},{},'post').then(res =>{ 
		          if(res.data.code == 0){
		          	if(res.data.response.status == 1){
						message(_this,'提交成功','success');
						_this.getData();
						_this.showType = 1;
		          	}
		          }
		        })
	          }).catch(() => {
	           
	          });
		  },
		  //初始化上传插件对象
	      initUploaderPa(index){
	        let _this = this,
	        btnName = 'paBtn' + index;
	        uploader2(function (src) {
	          _this.preImgSrcList[0].preImgSrc = src;
	        }, function (key) {
	          _this.handleForm.picUrl = key;
	        }, function () {
	          _this.preImgSrcList[0].preImgSrc = '';
	        }, function (uploader) {
	          _this.uploaderList[index].uploader = uploader;
	        }, btnName ,false)
	      },
		  //上传
		  imgUploaderPa(index){
	        if (this.uploaderList[index].uploader == null) {
	          return;
	        }     
	        this.uploaderList[index].uploader.start()
	      },
	      //预览上传图
	      previewImgPa(index){
	        this.dialogImgSrc = this.preImgSrcList[index].preImgSrc
	        this.dialogVisible = true;
	      },
	      //删除图片
	      deleteImgPa(index){
	        this.preImgSrcList[index].preImgSrc = '';
	        this.handleForm.picUrl = '';
	      },
	      //操作
	      handle(scope,type){
	        let _this = this;
	        if(type == 1){
	          this.handleType = 'view';
	          this.showType = 2;
	          this.handleForm = _.cloneDeep(scope);
	          this.preImgSrcList[0].preImgSrc = this.handleForm.picUrl;
	        }else if(type==3){
	          this.$confirm('确认删除吗?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	          }).then(() => {
	          	let [_this,body] = [this,{id:scope.id}];
	          	this.$http('/backstageBuilding/delBuildVRInfo',{body},{},{},'post').then(res =>{ 
		          if(res.data.code == 0){
		          	if(res.data.response.status == 1){
						message(_this,'删除成功','success');
		            	_this.getData();
		          	}else{
						message(_this,'删除失败','warning');
		          	}
		          }
		        })
	          }).catch(() => {
	          });
	        }else{
	       	  this.handleType = 'edit';
	          this.showType = 2;
	          this.handleForm = _.cloneDeep(scope);
	          this.preImgSrcList[0].preImgSrc = this.handleForm.picUrl;
	        }
	      },
	      //切换页码
	      currentChange(page){
		    this.form.pageNum = page - 1;
		    this.getData();
	      }								
		},
		mounted(){
			if(this.$route.query.type && this.$route.query.type == 'edit'){
				this.getData();
			}
		}
	}
</script>

<style scoped>
	.list-row{margin-bottom: 10px;width: 60%}
	.url-p{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}
	.pa-href{
		color: #20a0ff;
		display: inline-block;
		width: 70%;
		word-break: break-all;
	}
</style>
<style type="text/css">
	
</style>