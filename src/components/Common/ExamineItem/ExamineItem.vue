<template>
	<el-card   class="ex-item">
    <el-tag type="info" class="tag" v-if="type==1">待审核</el-tag>
    <el-tag type="success" class="tag" v-if="type==2">已审核</el-tag>
    <el-tag type="danger" class="tag" v-if="type==3">未通过</el-tag>
    <el-row style="padding-left:0px;">
      <el-row style="font-size: 12px;color: #777;margin-top:20px;">
        <el-col :span="10">
          位置信息：{{data.buildingName}}
          <span v-if="data.locationType == 1">(自动定位)</span>
          <span v-else>(手动选择)</span>
        </el-col>
        <el-col :span="10">
          照片类型：{{data.menuName}}
        </el-col>
      </el-row>
      <el-row style="font-size: 12px;color: #777;margin-top:5px;">
        <el-col :span="10">照片分类：{{data.menuSecondName}}</el-col>
        <el-col :span="10">描述：{{data.describe}}</el-col>
      </el-row>
      <el-row style="font-size: 12px;color: #777;margin-top:5px;">
        <el-col :span="10">提交用户：{{data.userName}}{{data.userPhone}}</el-col>
        <el-col :span="10">提交时间：{{data.uploadTime}}</el-col>
      </el-row>
      <el-row style="font-size: 12px;color: #777;margin-top:5px;" v-if="type==2 || type == 3">
        <el-col :span="10">审核人：{{data.toExamineUserName}}</el-col>
        <el-col :span="10">审核时间：{{data.toExamineTime}}</el-col>
      </el-row>

      <el-row style="font-size: 12px;color: #777;margin-top:5px;" v-if="type==2">
        <el-col :span="10">
          是否编辑：
          <span v-if="data.isEdit==1">否</span>
          <span v-else>是</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in data.buildingContributionPicsList" :key="index">
          <div class="img-container" :style="{backgroundImage:'url('+item.picUrl+')'}">
            <el-checkbox 
              style="position: absolute;left: 10px;top: 10px;z-index: 3" 
              v-if="checks[index] && type == 1" 
              v-model="checks[index].checked"
              @change="checkChange(checks[index].id)"> 
            </el-checkbox>
            <div class="wap" @click="viewImg(item.picUrl)">
              <i class="el-icon-view ico"></i>
            </div>
          </div>
          <p style="text-align: center;font-size: 13px;color: #777;margin-top: 5px;">{{item.nearBuildingName}}</p>
        </el-col>
      </el-row>
      <span style="font-size: 13px;color: #1d90e6;position: relative;top: 10px" v-if="type == 1">&nbsp请勾选您认为符合要求的照片</span>
      <el-row style="text-align: center;margin-top:20px;" v-if="type == 1">
        <el-button type="primary" size="small" @click="hande(1)">通过审核</el-button>
        <el-button size="small" @click="hande(2)">编辑审核</el-button>
      </el-row>
    </el-row>


    <el-dialog title="审核" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width: 50%;margin: 0 auto">
        <el-form-item label="勾选的照片会通过审核">
        </el-form-item>
        <el-form-item label="请选择其他照片的驳回理由：">
            <el-radio-group v-model="form.rejectReason" :disabled="selects.length == data.buildingContributionPicsList.length">
              <el-radio label="1" class="raLab">照片包含违法信息</el-radio>
              <el-radio label="2" class="raLab">照片与主题无关</el-radio>
              <el-radio label="3" class="raLab">照片模糊不清</el-radio>
              <el-radio label="4" class="raLab">照片重复上传</el-radio>
              <el-radio label="5" class="raLab">同一问题重复提交</el-radio>
              <el-radio label="6" class="raLab">照片不符合收录要求</el-radio>
            </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="diaSure">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImgSrc" alt="">
    </el-dialog>

  </el-card >
</template>

<script>
  import message from '../../../common/message';
	export default {
		name:'',
		components:{

		},
		props:{
		  data:{
        default:{}
      },
      type:{
        default:'0'
      },
      dataSwi:{

      },
      geocoder:{
        default:null
      }
		},
		data(){
			return{
        dialogFormVisible:false,
        dialogVisible:false,
        dialogImgSrc:'',
        checks:[],
        selects:[],
        form:{
          buildingId:'',
          userId:'',
          id:'',
          menuId:'',
          menuChildId:'',
          menuGrandId:'',
          isEdit:'1',
          picIds:'',
          rejectReason:'',
        }
			}
		},
    mounted(){
      this.initSelect();
    },
    watch:{
      'dataSwi':{
        handler(val){
          this.initSelect();
        }
      }
    },
		methods:{
      searchAdd(x,y,func){
        var lnglatXY=[x,y];
        this.geocoder.getAddress(lnglatXY, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            func(result.regeocode.formattedAddress)
          }
        });  
      },
      initSelect(){
        for (let i in this.form){
          if(i == 'isEdit'){
            this.form[i] = '1';
          }else if(i == 'picIds' || i == 'rejectReason'){
            this.form[i] = '';
          }else{
            this.form[i] = this.data[i];
          }
        }
        this.checks = [];
        this.selects = [];
        this.data.buildingContributionPicsList.forEach(item => {
          this.checks.push({
            id:item.id,
            checked:false
          });
          if(item.nearBuildingName == ''){
            if(item.longitude == 0 && item.latitude == 0){
              return;
            }
            this.searchAdd(item.longitude,item.latitude,function(res){
              item.nearBuildingName = res? res:`经纬度为：${item.longitude},${item.latitude}`;
            })
          }
        });
      },
			checkChange(id){
        let set = new Set(this.selects);
        if(set.has(id)){
          set.delete(id);
        }else{
          set.add(id);
        }
        this.selects = Array.from(set);
      },
      hande(type){
        if(type == 1){
          this.form.rejectReason = '';
          this.dialogFormVisible = true;
        }else if(type == 2){
          this.$router.push({ 
            path:'/unopened/unopenedexamineedit',
            query:{
              info:JSON.stringify(this.data),
              path:this.$route.fullPath,
              name:this.$route.query.name
            }
          })
        }
      },
      viewImg(src){
        this.dialogImgSrc = src;
        this.dialogVisible = true;
      },
      diaSure(){
        if(this.form.rejectReason == '' && this.selects.length != this.data.buildingContributionPicsList.length){
          message(this,'请选择驳回理由','warning')
          return;
        }
        let body = _.cloneDeep(this.form);
        body.picIds = this.selects.join(',');

        this.$http('/buildingContribution/updateInfo',{body},{},{},'post').then(res => {
          if(res.data.code == 0){
            if(res.data.response.res == 1){
              this.dialogFormVisible = false;
              this.$emit('updata');
              message(this,'提交成功','success')
            }else{
              message(this,'提交失败','warning')
            }
          }else if(res.data.code == 301){
            message(this,res.data.response,'warning')
            this.dialogFormVisible = false;
            this.$emit('updata');
          }
        })
      }
		}
	}
</script>

<style scoped>
  .raLab{
    width:100%;
    margin-top:5px;
    margin-left: 0px
  }
  .ex-item{
    margin-top: 20px;
    position: relative;
  }
  .ex-item .el-form-item{
    margin-bottom: 0px;
  }
  .ex-item .el-tag{
    border-radius: 0px;
  }
  .ex-item .tag{
  }
  .img-container{
    position: relative;
    cursor: pointer;
    margin-top: 20px;
    height: 180px;
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    background-size:cover; 
  }
  .img-container:hover .wap{
    display: block;
  }
  .img-container .wap{
    z-index: 2;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    line-height: 180px;
    display: none;
  }
  .img-container .wap .ico{
    color: #FFF;
  }
</style>