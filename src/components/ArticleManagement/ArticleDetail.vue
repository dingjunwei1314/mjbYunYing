<template>
    <div class="newText">
        <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
        <div style="padding:20px;color:#777" class="newTextTop_wap">
            <el-form    label-width="200px" class="demo-ruleForm">
              <el-form-item label="标题：" required>
                <span v-if="data.title==''">--</span>
                <span v-else>{{data.title}}</span>
              </el-form-item>
              <el-form-item label="作者：">
                <span v-if="data.publisher==''">--</span>
                <span v-else>{{data.publisher}}</span>
              </el-form-item>
              <el-form-item label="来源：">
                <span v-if="data.source==''">--</span>
                <span v-else>{{data.source}}</span>
              </el-form-item>
              <el-form-item label="缩略图：">
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <span v-if="data.img_list.length<=0">--</span>
                <ul v-else class="img_list">
                  <li v-for="(item,index) in data.img_list" :key="index">
                    <div>
                      <i @click="handlePreview(item.url)" class="el-icon-view"></i>
                    </div>
                    <img :src="item.url" alt="">
                  </li>
                </ul>
              </el-form-item>
              <el-form-item label="分类：" required>
                <span v-if="data.type==''">--</span>
                <span v-else>{{data.type}}</span>
              </el-form-item>
              <el-form-item label="摘要：" >
                <span v-if="data.abstract==''">--</span>
                <span v-else>{{data.abstract}}</span>
              </el-form-item>
              <el-form-item label="正文：" required>
                <span v-if="data.abstract==''">--</span>
                <div v-else v-html="data.main_body" style="background:#eee;margin-top:10px;border-top:1px solid #eee;width:80%">
                </div>
              </el-form-item>
              <el-form-item label="发布日期：" required>
                <span v-if="data.publish_time==''">--</span>
                <span v-else>{{data.publish_time}}</span>
              </el-form-item>
              <el-form-item label="文章关键词：">
                <span v-if="data.keywords.length==0">--</span>
                <el-tag type="warning" style="margin-right:10px" v-for="(item,index) in data.keywords" :key="index">{{item}}</el-tag>
              </el-form-item>
              <el-form-item label="文章显示区域：">
                <span v-if="data.address==''">--</span>
                <span v-else>{{data.address}}</span>
              </el-form-item>
              <el-form-item label="推荐为严选头条：">
                <span v-if="data.isTopLine==''">--</span>
                <span v-else>{{data.isTopLine}}</span>
              </el-form-item>
              <el-form-item label="置顶：">
                <span v-if="data.isTop==''">--</span>
                <span v-else>{{data.isTop}}</span>
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
            dialogVisible:false,
            dialogImageUrl:'',
            data:{
              id: '',
              abstract: '',
              title: '',
              type: '',
              address: '',
              img_list:[],
              keywords: [],
              active_area: '',
              main_body: '',
              publish_time: '',
              publisher: '',
              isTopLine: '',
              isTop: '',
              state: '',
              source: ''
            }
          }
        },
        filters:{

        },
        computed:{

        },
        created(){
          this.getdata()
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
            this.$http('/articledetail',{},{id:_this.$route.query.id}).then(function(res){
              console.log(res)
              if(res.data.code==1000){
                  _this.data=res.data.data;
              }
            }).catch(function(err){
              console.log(err)
            })
          },
          handlePreview(file) {
            this.dialogImageUrl=file;
            this.dialogVisible=true;
          },
          refresh(){
            this.$store.dispatch('mainLoadingAction',true);
            this.getdata()
            this.currentPage=1;
            for(var i in this.filterForm){
              if(i=='img_list' || i=='keywords'){
                this.filterForm[i]=[]
              }else{
                this.filterForm[i]=''
              }
            }
            var that=this
            setTimeout(function(){
              that.$store.dispatch('mainLoadingAction',false);
            },300)
          },
        },
        mounted(){
            this.$store.dispatch('mainLoadingAction',true);
            this.$store.dispatch('defaultIndexAction','/index/articlemanagement');
            var that=this
            setTimeout(function(){
                that.$store.dispatch('mainLoadingAction',false);
            },300)
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
