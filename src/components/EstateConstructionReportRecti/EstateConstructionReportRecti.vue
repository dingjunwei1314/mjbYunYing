<template>
	<div style="padding:0px 20px">
		<el-form label-width="150px" style="width: 80%;padding-top: 20px" :model="form" class="demo-form-inline">
			<div style="border-bottom: 1px solid #ccc;">
		        <el-form-item label="已整改记录" required v-for="(item,index) in form.reList" :key="index">
		          <el-button 
		          	style="float: right" 
		          	type="text"
		          	v-show="form.reList.length>1" 
		          	@click="deleteRe(index)">
		          	删除
		          </el-button>
		          <el-input 
		          	style="width: 80%"
		          	v-if="$route.query.type!='view'" 
		          	size="small" 
		          	v-model="item.re" 
		          	placeholder="整体描述(请输入0-30字)" 
		          	:maxlength = "30">		
		          </el-input>
		        </el-form-item>
		        <el-button style="margin-left: 150px" type="text" @click="addRe">继续添加整改记录</el-button>
		    </div>
	        <div v-for="(item,num) in form.reDetailList" :key="num" style="padding-top: 20px">
	        	<el-form-item label="已整改问题点" required>
		          <el-input 
		            style="width: 80%"
		          	v-if="$route.query.type!='view'" 
		          	type="textarea" size="small" 
		          	v-model="item.a" 
		          	placeholder="已整改问题点(请输入0-30字)" 
		          	:maxlength = "30">	
		          </el-input>
		        </el-form-item>  
		        <el-row>
		        	<el-col :span="12">
		        		<el-form-item label="整改前图片" required>
				         	<!-- <ImgPreview 
			                    :backgroundPicUrl="cs[index].preImgSrcList[num].imgUrl"
			                    @previewImg="previewImg(index,num)"
			                    @deleteImg="deleteImg(index,num)"
			                />
			                <ImgUploader2
			                  :btnId="btnList[index][num]"
			                  @imgUploader="imgUploader(index,num)"
			                /> -->
				        </el-form-item>
		        	</el-col>
		        	<el-col :span="12">
		        		<el-form-item label="整改后图片" required>
				         	<!-- <ImgPreview 
			                    :backgroundPicUrl="cs[index].preImgSrcList[num].imgUrl"
			                    @previewImg="previewImg(index,num)"
			                    @deleteImg="deleteImg(index,num)"
			                />
			                <ImgUploader2
			                  :btnId="btnList[index][num]"
			                  @imgUploader="imgUploader(index,num)"
			                /> -->
				        </el-form-item>
		        	</el-col>
		        </el-row>
		        <el-form-item label="整改描述" required>
		          <el-input 
		          	style="width: 80%"
		          	v-if="$route.query.type!='view'" 
		          	type="textarea" size="small" 
		          	v-model="item.b" 
		          	placeholder="整改描述(请输入0-50字)" 
		          	:maxlength = "50">	
		          </el-input>
		        </el-form-item>  
		    </div>


			    <!-- <div>
			    	<el-button style="margin-left: 100px" type="text" @click="addImgData(index)">继续添加图片</el-button> 
					<el-button style="" type="text" @click="deleteImgData(index)" v-show="item.imgData.length>1">删除一组图片</el-button>
			    </div> -->
				
		    
		    	<el-button style="margin-left: 100px" type="text" @click="addList">添加新的监测点信息</el-button>
		    	<el-form-item style="margin-top: 50px">
		          <el-button style="margin-left:100px" type="primary" @click="onSubmit" v-if="$route.query.type!='view'">确认</el-button>
		        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="dialogVisible"  size="tiny">
        <img width="100%" :src="dialogImgSrc" alt="">
      </el-dialog>
	</div>
</template> 
<script>
	import message from '../../common/message';
	import uploader2 from '../../common/uploader2.js'
	import ImgPreview from '../Common/ImgPreview/ImgPreview';
	import ImgUploader2 from '../Common/ImgUploader2/ImgUploader2'
	export default{
		name:'EstateConstructionReportTab',
		props:{
			buildingId:{
				default:''
			}
		},
		components:{
			ImgUploader2,
      		ImgPreview
		},
		data(){
			return{
				dialogImgSrc:'',
        		dialogVisible:false,
				cs:[],
				btnList:[],
				form:{
					reList:[{re:''}],
					reDetailList:[
						{
							a:'',
							pica:'',
							picb:'',
							b:''
						}
					]
				}
			}
		},
		created(){
      		if(this.$route.query.type == 'add'){
				// this.initAddData();
			}
		},
		computed:{
			
		},
		methods:{
			addRe(){
				this.form.reList.push({
					re:''
				})
			},
			deleteRe(index){
				this.form.reList.splice(index,1)
			}
		}
		// methods:{
		// 	initAddData(){
		// 		this.btnList.push(['CBtn00'])
		// 		this.cs.push({
		// 			preImgSrcList:[{imgUrl:''}],
  //               	uploaderList:[{uploader:null}]
		// 		})
		// 		this.initUploader(0,0)
		// 	},
		// 	addImgData(index){
		// 		let len = this.form.list[index].imgData.length;
		// 		this.btnList[index].push(`CBtn${index}${len}`);
		// 		this.cs[index].uploaderList.push({uploader:null});
		// 		this.cs[index].preImgSrcList.push({imgUrl:''});
		// 		this.form.list[index].imgData.push({
		// 			imgUrl:''
		// 		})
		// 		this.initUploader(index,len)
		// 	},
		// 	deleteImgData(index){
		// 		this.btnList[index].pop();
		// 		this.cs[index].uploaderList.pop();
		// 		this.cs[index].preImgSrcList.pop();
		// 		this.form.list[index].imgData.pop();
		// 	},
		// 	addList(){
		// 		let len = this.form.list.length;
		// 		this.btnList.push([`CBtn${len}0`]);
		// 		this.cs.push({
		// 			preImgSrcList:[{imgUrl:''}],
  //               	uploaderList:[{uploader:null}]
		// 		})
		// 		this.form.list.push({
		// 			isShow:true,
		// 			name:'',
		// 			imgData:[
		// 				{
		// 					imgUrl:''
		// 				}
		// 			]
		// 		})
		// 		this.initUploader(len,0)
		// 	},
		// 	deleteList(index){
		// 		this.form.list[index].isShow = false;
		// 	},
		// 	getData(){

		// 	},
		// 	//楼盘景观图-插件初始化
		//     initUploader(index,num){
		//         let _this = this,
		//         btnName = 'CBtn'+index+num;
		        
		//         uploader2(function(src){
		//           _this.cs[index].preImgSrcList[num].imgUrl = src;
		//         },function(key){
		//           _this.form.list[index].imgData[num].imgUrl = key;
		//         },function(){
		//           _this.cs[index].preImgSrcList[num].imgUrl = '';
		//         },function(uploader){
		//           _this.cs[index].uploaderList[num].uploader = uploader
		//         },btnName,false)
		//     },

		//     //楼盘景观图-开始上传
		//     imgUploader(index,num){
		//         console.log(this.cs[index].uploaderList[num].uploader)
		//         if(this.cs[index].uploaderList[num].uploader == null){
		//           return;
		//         }
		//         this.cs[index].uploaderList[num].uploader.start() 
		//     },    

		//     //楼盘效果图-预览
		//     previewImg(index,num){
		//         this.dialogImgSrc = this.cs[index].preImgSrcList[num].imgUrl
		//         this.dialogVisible = true;
		//     },  

		//     //楼盘效果图-删除
		//     deleteImg(index,num){
		//         this.cs[index].preImgSrcList[num].imgUrl = ''
		//         this.form.list[index].imgData[num].imgUrl = ''
		//     },
		// 	onSubmit(){
		// 		let swi = true;
		// 		for(var i in this.form.list){
		// 			if(this.form.list[i].name == ''){
		// 				swi = false;
		// 				break;
		// 			}
		// 			for(var j in this.form.list[i].imgData){
		// 				if(this.form.list[i].imgData[j].imgUrl == ''){
		// 					swi = false;
		// 					break;
		// 				}
		// 			}
		// 			if(!swi){
		// 				break;
		// 			}
		// 		};
		// 		if(!swi){
		// 			message(this,'有必填项未填写','warning')
		// 			return
		// 		};

		//         this.$confirm('确认提交吗?', '提示', {
		//           confirmButtonText: '确定',
		//           cancelButtonText: '取消',
		//           type: 'warning'
		//         }).then(() => {
		//           let body = _.cloneDeep(this.form),
		//           url;
		          
		//           if(this.$route.query.type == 'edit'){
		//             url = '/backstageUser/updateInfo';
		//           }else{
		//             url = '/backstageUser/insertInfo';
		//           }
		          
		//           this.$http(url,{body},{},{},'post').then(res => {
		//             if(res.data.code == 0){
		             
		//             }
		//           })
		//         }).catch(() => {

		//         })
		// 	}
		// }
	}
</script>
<style scoped>
	
</style>