<template>
	<div style="padding:0px 20px">
		<el-form label-width="100px" style="width: 50%;" :model="form" class="demo-form-inline">
			<div style="border-bottom: 1px solid #ccc;margin-bottom: 20px;padding-bottom: 20px;position: relative;padding-top: 30px" v-for="(item,index) in form.list" v-show="item.isShow">
				<el-button style="position: absolute;right: 0;top: 0" type="text" @click="deleteList(index)">删除</el-button>
		        <el-form-item label="类别选择" required>
		          <el-select v-if="$route.query.type!='view'" size="small" v-model="item.name" style="width:200px;">
		            <el-option label="整体进度" value="1"></el-option>
		            <el-option label="园区进度" value="2"></el-option>
		            <el-option label="楼栋进度" value="3"></el-option>
		          </el-select>
		          <span v-else>{{item.name}}</span>
		        </el-form-item>
		        <el-form-item label="整体描述" required>
		          <el-input v-if="$route.query.type!='view'" type="textarea" size="small" v-model="item.name" placeholder="整体描述(请输入0-50字)" :maxlength = "50"></el-input>
		          <span v-else>{{item.name}}</span>
		        </el-form-item>
		        <div v-for="(item2,num) in item.imgData">
			        <el-form-item :label="'添加图片'+(num+1)" required>
			         	<ImgPreview 
		                    :backgroundPicUrl="cs[index].preImgSrcList[num].imgUrl"
		                    @previewImg="previewImg(index,num)"
		                    @deleteImg="deleteImg(index,num)"
		                />
		                <ImgUploader2
		                  :btnId="btnList[index][num]"
		                  @imgUploader="imgUploader(index,num)"
		                />
			        </el-form-item>
			        <el-form-item label="图片描述" required>
			          <el-input v-if="$route.query.type!='view'" type="textarea" size="small" v-model="item.name" placeholder="图片描述(请输入0-50字)" :maxlength = "50"></el-input>
			          <span v-else>{{item.name}}</span>
			        </el-form-item>  
			    </div>
			    <div>
			    	<el-button style="margin-left: 100px" type="text" @click="addImgData(index)">继续添加图片</el-button> 
					<el-button style="" type="text" @click="deleteImgData(index)" v-show="item.imgData.length>1">删除一组图片</el-button>
			    </div>
				
		    </div>
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
					list:[
						{
							isShow:true,
							name:'',
							imgData:[
								{
									imgUrl:''
								}
							]
						}
					]
				}
			}
		},
		created(){
      		if(this.$route.query.type == 'add'){
				this.initAddData();
			}
		},
		computed:{
			
		},
		methods:{
			initAddData(){
				this.btnList.push(['CBtn00'])
				this.cs.push({
					preImgSrcList:[{imgUrl:''}],
                	uploaderList:[{uploader:null}]
				})
				this.initUploader(0,0)
			},
			addImgData(index){
				let len = this.form.list[index].imgData.length;
				this.btnList[index].push(`CBtn${index}${len}`);
				this.cs[index].uploaderList.push({uploader:null});
				this.cs[index].preImgSrcList.push({imgUrl:''});
				this.form.list[index].imgData.push({
					imgUrl:''
				})
				this.initUploader(index,len)
			},
			deleteImgData(index){
				this.btnList[index].pop();
				this.cs[index].uploaderList.pop();
				this.cs[index].preImgSrcList.pop();
				this.form.list[index].imgData.pop();
			},
			addList(){
				let len = this.form.list.length;
				this.btnList.push([`CBtn${len}0`]);
				this.cs.push({
					preImgSrcList:[{imgUrl:''}],
                	uploaderList:[{uploader:null}]
				})
				this.form.list.push({
					isShow:true,
					name:'',
					imgData:[
						{
							imgUrl:''
						}
					]
				})
				this.initUploader(len,0)
			},
			deleteList(index){
				this.form.list[index].isShow = false;
			},
			getData(){

			},
			//楼盘景观图-插件初始化
		    initUploader(index,num){
		        let _this = this,
		        btnName = 'CBtn'+index+num;
		        
		        uploader2(function(src){
		          _this.cs[index].preImgSrcList[num].imgUrl = src;
		        },function(key){
		          _this.form.list[index].imgData[num].imgUrl = key;
		        },function(){
		          _this.cs[index].preImgSrcList[num].imgUrl = '';
		        },function(uploader){
		          _this.cs[index].uploaderList[num].uploader = uploader
		        },btnName,false)
		    },

		    //楼盘景观图-开始上传
		    imgUploader(index,num){
		        console.log(this.cs[index].uploaderList[num].uploader)
		        if(this.cs[index].uploaderList[num].uploader == null){
		          return;
		        }
		        this.cs[index].uploaderList[num].uploader.start() 
		    },    

		    //楼盘效果图-预览
		    previewImg(index,num){
		        this.dialogImgSrc = this.cs[index].preImgSrcList[num].imgUrl
		        this.dialogVisible = true;
		    },  

		    //楼盘效果图-删除
		    deleteImg(index,num){
		        this.cs[index].preImgSrcList[num].imgUrl = ''
		        this.form.list[index].imgData[num].imgUrl = ''
		    },
			onSubmit(){
				let swi = true;
				for(var i in this.form.list){
					if(this.form.list[i].name == ''){
						swi = false;
						break;
					}
					for(var j in this.form.list[i].imgData){
						if(this.form.list[i].imgData[j].imgUrl == ''){
							swi = false;
							break;
						}
					}
					if(!swi){
						break;
					}
				};
				if(!swi){
					message(this,'有必填项未填写','warning')
					return
				};

		        this.$confirm('确认提交吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          let body = _.cloneDeep(this.form),
		          url;
		          
		          if(this.$route.query.type == 'edit'){
		            url = '/backstageUser/updateInfo';
		          }else{
		            url = '/backstageUser/insertInfo';
		          }
		          
		          this.$http(url,{body},{},{},'post').then(res => {
		            if(res.data.code == 0){
		             
		            }
		          })
		        }).catch(() => {

		        })
			}
		}
	}
</script>
<style scoped>
	
</style>