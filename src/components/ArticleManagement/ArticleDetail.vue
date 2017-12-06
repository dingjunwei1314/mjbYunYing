<template>
    <div class="newText">
        <Subnav :subSrc= "subSrc" :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
        <div style="padding:20px;color:#777" class="newTextTop_wap">
            <el-form    label-width="200px" class="demo-ruleForm">
              <el-form-item label="标题：" required>
                <span v-if="data.title=='' || data.title==null">--</span>
                <span v-else>{{data.title}}</span>
              </el-form-item>
              <el-form-item label="作者：">
                <span v-if="data.author=='' || data.author==null">--</span>
                <span v-else>{{data.author}}</span>
              </el-form-item>
              <el-form-item label="来源：">
                <span v-if="data.source=='' || data.source==null">--</span>
                <span v-else>{{data.source}}</span>
              </el-form-item>
              <el-form-item label="缩略图：">
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <span v-if="data.backgroundPicUrl==null">--</span>
                <ul v-else class="img_list">
                  <li>
                    <div>
                      <i @click="handlePreview(data.backgroundPicUrl)" class="el-icon-view"></i>
                    </div>
                    <img :src="data.backgroundPicUrl" alt="">
                  </li>
                </ul>
              </el-form-item>
              <el-form-item label="分类：" required>
                <span v-if="data.newsTypeId == null">--</span>
                <span v-if="data.newsTypeId==1">验房维权</span>
                <span v-if="data.newsTypeId==2">行业动态</span>
                <span v-if="data.newsTypeId==3">置业指引</span>
                <span v-if="data.newsTypeId==4">政策解读</span>
              </el-form-item>
              <el-form-item label="摘要：" >
                <span v-if="data.abstracts=='' || data.abstracts==null">--</span>
                <span v-else>{{data.abstracts}}</span>
              </el-form-item>
              <el-form-item label="正文：" required>
                <span v-if="data.content==''">--</span>
                <div v-else v-html="data.content" style="background:#eee;margin-top:10px;border-top:1px solid #eee;width:80%">
                </div>
              </el-form-item>
              <el-form-item label="发布日期：" required>
                <span v-if="data.releaseTime==''">--</span>
                <span v-else>{{data.releaseTime}}</span>
              </el-form-item>
              <el-form-item label="文章标签：">
                <span v-if="data.articleKeyword==null">--</span>
                <el-tag type="warning" style="margin-right:10px" v-for="(item,index) in data.articleKeyword" :key="index">{{item}}</el-tag>
              </el-form-item>
              <el-form-item label="文章显示区域：">
                <!-- <p v-if="data.provinceIds==''">--</p> -->
                <p>{{data.provinceIds}}</p>
                <p>{{data.cityIds}}</p>
              </el-form-item>
              <el-form-item label="推荐：">
                <!-- <span v-if="data.newsLocation.length==0">--</span> -->
                
                <span v-if="data.newsLocation==0">不推荐</span>
               
                <span v-if="data.newsLocation==2">推荐至banner位</span>
                <span v-if="data.newsLocation==3">推荐至展示位</span>
                <span v-if="data.newsLocation==4">推荐至资讯列表</span>
                
              </el-form-item>
              <el-form-item label="置顶：">
                <!-- <span v-if="data.isTop.length==0">--</span> -->
                <span v-if="data.isTop==1">是</span>
                <span v-if="data.isTop==0">否</span>
              </el-form-item>
              <el-form-item label="上下线：">
                <!-- <span v-if="data.status.length==0">--</span> -->
                <span v-if="data.status==1">上线</span>
                <span v-if="data.status==0">下线</span>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Subnav from '../Subnav/Subnav.vue'
    export default {
        name:'Posts',
        components:{
          Subnav,
        },
        data() {
          return {
            secondLevel:'文章管理',
            threeLevel:'文章详情',
            subSrc:'/index/articlemanagement',
            dialogVisible:false,
            dialogImageUrl:'',
            data:{
              id: '',
              abstracts: '',
              title: '',
              newsTypeId: '',
              provinceIds: '',
              cityIds:'',
              backgroundPicUrl:'',
              articleKeyword: '',
              content: '',
              releaseTime: '',
              author: '',
              newsLocation: '',
              isTop: '',
              status: '',
              source: ''
            }
          }
        },
        filters:{

        },
        computed:{

        },
        created(){
          this.getProCityData(1)
          this.getProCityData(2)
        },
        methods: {
          getdata(){
            let _this=this;
            if(_this.$route.query.id==''){
              this.$message({
                type: 'warning',
                message: '参数错误'
              });
              return;
            }
            this.$http('/news/queryNewsInfo',{body:{newsId:_this.$route.query.id}},{},{},'post').then(function(res){
              _this.$store.dispatch('mainLoadingAction',false);
              if(res.data.code==0){
                    
                  _this.data = res.data.response;
                 
                  if(_this.data.articleKeyword && _this.data.articleKeyword!==null){
                    _this.data.articleKeyword = _this.data.articleKeyword.split(',');
                  }
                  
                  let _provinceIds = '',_cityIds = ''
                  //处理省份城市
                  _this.data.provinceIds.forEach((item,index) => {
                    _this.provinceIdsList.forEach((proItem,proIndex) => {
                      if(item == proItem.cityId){
                        _provinceIds += proItem.cityName
                        _this.data.provinceIds = _provinceIds
                        
                      }
                    })
                    if(_this.data.provinceIds[0] == 0){
                      _this.data.provinceIds='全部省'
                    }
                  })
                  //处理市区城市
                  _this.data.cityIds.forEach((item,index) => {
                    
                    _this.cityIdsList.forEach((citItem,citIndex) => {
                      if(item == citItem.cityId){
                        
                        _cityIds += citItem.cityName
                        _this.data.cityIds = _cityIds
                        
                      }
                    })
                    if(_this.data.cityIds[0] == 0){
                      _this.data.cityIds='全部市'
                    }
                  })    

                  if(_this.data.provinceIds.length <= 0){
                    _this.data.provinceIds = '--'
                  }

                  if(_this.data.cityIds.length <= 0){
                    _this.data.cityIds = '--'
                  }

                    
                }else if(res.data.code==300){
                    _this.$router.push('/login')
                }else{
                    _this.$message({
                      message: res.data.message,
                      type: 'warning'
                    });
                }
            }).catch(function(err){
              _this.$store.dispatch('mainLoadingAction',false);
              console.log(err)
            })
          },
          //获取省数据
          getProCityData(pramas){
            let _this=this;
            let body = '';
            if(pramas == 1){
                body = {cityType:1}
            }else{
                body = {cityType:2}
            }
            _this.$http('/citis/cityLists',{body},{},{},'post').then(function(res){
              if(res.data.code==0){
                
                  if(pramas==1){
                    _this.provinceIdsList = res.data.response.cityList
                  }else{
                    _this.cityIdsList = res.data.response.cityList
                    _this.getdata()
                  }
               
              }else if(res.data.code==300){
                _this.$router.push('/login')
              }else{
                _this.$message({
                  message: res.data.message,
                  type: 'warning'
                });
              }
            }).catch(function(err){
              console.log(err)
            })   
          },
          //图片预览
          handlePreview(file) {
            this.dialogImageUrl=file;
            this.dialogVisible=true;
          },
          //刷新
          refresh(){
            this.$store.dispatch('mainLoadingAction',true);
            this.getProCityData(1)
            this.getProCityData(2)
          },
        },
        mounted(){
            this.$store.dispatch('mainLoadingAction',true);
            this.$store.dispatch('defaultIndexAction','/index/articlemanagement');
        }
    }
</script>

<style scoped>
    .newText .newTextTop_wap{
        border: 1px solid darkgray;margin:20px;
    }
    .upload-demo{
        width:30%;
    }
    .img_list{display:inline-table;margin-top:10px;width: 80%}
    .img_list li{float:left;width:148px;height:148px;border-radius:3px;list-style: none;margin-right:10px;position: relative;overflow: hidden}
    .img_list li:hover div{display: flex}
    .img_list li>div{position: absolute;left: 0;right: 0;top: 0;bottom: 0;background: rgba(0,0,0,.5);z-index: 2;display: flex;align-items: center;justify-content: center;color:#f1f1f1;font-size: 20px;display: none;}
    .img_list li>div i{cursor: pointer}
    .img_list li img{width:100%;height: 100%;border-radius: 3px}
 </style>

<style>

</style>
