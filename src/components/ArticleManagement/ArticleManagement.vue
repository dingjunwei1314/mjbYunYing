<template>
    <div class="posts">
        <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
        <div style="padding:20px;font-size:12px" class="postsTop_wap">
            <div class="postsSeek">
                <div>
                    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
                        <el-form-item label="文章名">
                            <el-input size="small" v-model="filterForm.title" style="width:140px" class="postsInputSeek"></el-input>
                        </el-form-item>
                        <el-form-item label="分类">
                            <el-select size="small" v-model="filterForm.newsTypeId" :clearable="true" placeholder="分类"  style="width:120px;">
                                <el-option
                                v-for="item in classOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="发布人">
                            <el-select size="small" v-model="filterForm.backstageUserId" :clearable="true" placeholder="分类"  style="width:120px;">
                                <el-option
                                v-for="(item,index) in backstageUserIdList"
                                :key="index"
                                :label="item.value"
                                :value="item.key" >
                                </el-option>
                            </el-select> 
                        </el-form-item>
                        <el-form-item label="区域">
                            <el-select size="small" @change="proChange" v-model="filterForm.provinceIds" :clearable="true" placeholder="省"  style="width:120px;">
                                <el-option
                                v-for="item in provinceIdsList"
                                :key="item.cityId"
                                :label="item.cityName"
                                :value="item.cityId" >
                                </el-option>
                            </el-select>
                            <el-select size="small" v-model="filterForm.cityIds" :clearable="true" placeholder="市"  style="width:120px;">
                                <el-option
                                v-for="item in cityIdsList"
                                :key="item.cityId"
                                :label="item.cityName"
                                :value="item.cityId" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                         
                        <el-form-item label="发布时间">
                            <el-date-picker
                              size="small"
                              :clearable="true"
                              v-model="filterForm.releaseTimeMin"
                              align="right"
                              type="datetime"
                              @change="timePreChange"
                              placeholder="选择日期"
                              :picker-options="pickerOptions1">
                            </el-date-picker>

                            <span class="demonstration">至</span>

                            <el-date-picker
                              size="small"
                              :clearable="true"
                              v-model="filterForm.releaseTimeMax"
                              align="right"
                              type="datetime"
                              @change="timeNextChange"
                              placeholder="选择日期" 
                              :picker-options="pickerOptions1">
                            </el-date-picker>
                        </el-form-item>
                        
                        <el-form-item label="头条">
                            <el-select size="small" v-model="filterForm.isHeadline" :clearable="true" placeholder="头条" style="width:100px;">
                                <el-option label="是"  value="1"></el-option>
                                <el-option label="否"  value="0"></el-option>
                            </el-select>
                        </el-form-item>
                       
                        <el-form-item label="推荐位置">
                            <el-select size="small" v-model="filterForm.newsLocation" :clearable="true" placeholder="推荐位置" style="width:150px;">
                                <el-option label="不推荐"  value="0"></el-option>
                                <el-option label="推荐至banner位" value="2"></el-option>
                                <el-option label="推荐至展示位" value="3"></el-option>  
                                <el-option label="推荐至资讯列表" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="置顶">
                            <el-select size="small" v-model="filterForm.isTop" :clearable="true" placeholder="置顶"  style="width:80px;">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                            </el-select>
                        </el-form-item> 
                    </el-form>
                </div>
                <div class="inquireBtn">
                    <el-button type="primary" @click="search">查询</el-button>
                    <router-link :to="{path:'/article/newarticle',query:{type:'add'}}">
                      <el-button type="primary">发布文章</el-button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="postsSeekBtn">
            <el-table
                ref="multipleTable"
                :data="data.newsList"
                v-loading="is_loading_tab"
                border
                tooltip-effect="dark"
                style="font-size:12px!important"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="50">
                </el-table-column>

                <el-table-column
                label="ID"
                width="50"
                prop="id">
                </el-table-column>

                <el-table-column
                prop="title"
                label="标题"
                >
                </el-table-column>

                <el-table-column
                prop="newsTypeId"
                label="文章分类"
                show-overflow-tooltip>
                    <template scope="scope">
                        <span v-if="scope.row.newsTypeId=='1'">验房维权</span>
                        <span v-if="scope.row.newsTypeId=='3'">置业指引</span>
                        <span v-if="scope.row.newsTypeId=='2'">行业动态</span>
                        <span v-if="scope.row.newsTypeId=='4'">政策解读</span>
                        <span v-if="scope.row.newsTypeId=='0'">不限</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="发布城市"
                show-overflow-tooltip>
                    <template scope="scope">
                        <span>{{scope.row.provinceList}}</span>
                        <span>{{scope.row.cityList}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                prop="releaseTime"
                label="发布时间"
                show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                label="推荐位置"
                show-overflow-tooltip>
                    <template scope="scope">
                        <span v-if="scope.row.newsLocation=='0'">不推荐</span>
                        <span v-if="scope.row.newsLocation=='2'">推荐至banner位</span>
                        <span v-if="scope.row.newsLocation=='3'">推荐至展示位</span>
                        <span v-if="scope.row.newsLocation=='4'">推荐至资讯列表</span>
                    </template>
                </el-table-column>

                <el-table-column
                label="置顶"
                show-overflow-tooltip>
                    <template scope="scope">
                        <span v-if="scope.row.isTop=='1'">是</span>
                        <span v-if="scope.row.isTop=='0'">否</span>
                    </template>
                </el-table-column>

                <el-table-column
                prop="userName"
                label="发布人"
                show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                label="状态"
                show-overflow-tooltip>
                    <template scope="scope">
                        <span v-if="scope.row.status=='1'">在线</span>
                        <span v-if="scope.row.status=='0'">离线</span>
                    </template>
                </el-table-column>

                <el-table-column width="300px" label="操作">
                    <template scope="scope" >
                        <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button
                        size="small"
                        type="primary"
                        @click="handleSee(scope.$index, scope.row)">查看</el-button>

                        <el-button
                        v-if="scope.row.status==1"
                        size="small"
                        type="danger"
                        @click="noLonger(scope.$index, scope.row)">下线</el-button>

                        <el-button
                        v-if="scope.row.status==0"
                        size="small"
                        type="danger"
                        @click="noLonger(scope.$index, scope.row)">上线</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <div class="blockPage">
                <el-button type="danger" @click="removesHander()">批量删除</el-button>
                <el-pagination
                v-show="data.pageCount>0"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="10"
                layout="total, prev, pager, next,jumper"
                :total="data.pageCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import Subnav2 from '../Subnav2/Subnav2.vue'
    export default {
        name:'Posts',
        components:{
            Subnav2
        },
        data(){
            return {
                navList:[
                    {path:this.$route.fullPath,name:'首页'},
                    {path:this.$route.fullPath,name:'文章管理'},
                    {path:this.$route.fullPath,name:'列表'},
                ],
                currentPage:1,
                is_loading_tab:false,
                multipleSelection: [],
                removesArr:[],
                filterForm: {
                    pageNum:'0',
                    pageSize:'10',
                    title:'',
                    backstageUserId:'',
                    provinceIds:'',
                    cityIds:'',
                    isHeadline:'',
                    newsLocation:'',
                    isTop:'',
                    releaseTimeMin:'',
                    releaseTimeMax:'',
                    newsTypeId:'',
                },
                data:{
                    newsList:[]
                },
                classOptions: [{
                    value: '',
                    label: '不限'
                 }, {
                    value: '1',
                    label: '验房维权'
                 }, {
                    value: '3',
                    label: '置业指引'
                 }, {
                    value: '2',
                    label: '行业动态'
                 },{
                    value: '4',
                    label: '新政解读'
                }],
                backstageUserIdList:[
                    
                ],
                provinceIdsList:[
                   
                ],
                cityIdsList:[
                   
                ],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);[]
                        }
                    }]
                },
            }
        },
        filters:{

        },
        computed:{

        },
        created(){
            this.getdata()
            this.getProCityData(1)
            this.getUserListData()
        },
        methods: {
            getdata(){
                let _this=this;
                _this.is_loading_tab=true;
                this.$http('/news/newsInfoList',{body:_this.filterForm},{},{},'post').then(function(res){
                    _this.$store.dispatch('mainLoadingAction',false);
                    if(res.data.code==0){
                        
                        _this.data=res.data.response;
                        _this.data.newsList.forEach((item,index) => {
                            item.provinceList = item.provinceList.join()
                            item.cityList = item.cityList.join()
                        })
                       
                    }else if(res.data.code==300){
                        _this.$router.push('/login')
                    }else{
                        _this.$message({
                          message: res.data.message,
                          type: 'warning'
                        });
                    }
                    _this.is_loading_tab=false;
                }).catch(function(err){
                    _this.is_loading_tab=false;
                    _this.$store.dispatch('mainLoadingAction',false);
                    console.log(err)
                })
            },
            //获取省市数据
            getProCityData(pramas){
                let _this=this;
                let body = '';
                if(pramas == 1){
                    body = {cityType:1}
                }else{
                    body = {cityType:2,parentid:_this.filterForm.provinceIds}
                }
                _this.$http('/citis/cityList',{body},{},{},'post').then(function(res){
                   
                    if(res.data.code==0){
                        
                        if(pramas==1){
                            _this.provinceIdsList = res.data.response.cityList
                        }else{
                            _this.cityIdsList = res.data.response.cityList
                            if(_this.filterForm.provinceIds == ''){
                               _this.cityIdsList = []
                            }
                        }
                        
                    }else if(res.data.code==300){
                        _this.$router.push('/login')
                    }else{
                        _this.$message({
                          message: res.data.message,
                          type: 'warning'
                        });
                    }
                    _this.is_loading_tab=false;
                }).catch(function(err){
                    _this.is_loading_tab=false;
                    console.log(err)
                })   
            },
            //改变省份
            proChange(){
                this.filterForm.cityIds=''
                this.getProCityData(2)
            },
            //改变时间格式
            timePreChange(val){
                this.filterForm.releaseTimeMin = val? val:''
            },
            //改变时间格式
            timeNextChange(val){
                this.filterForm.releaseTimeMax = val? val:''
            },
            //获取用户数据
            getUserListData(){
                let _this=this;
                _this.$http('/backstageUser/userList',{},{},{},'post').then(function(res){
                    
                    if(res.data.code==0){
                        _this.backstageUserIdList = res.data.response
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
            //搜索
            search(){
                this.currentPage=1;
                this.filterForm.pageNum=0;
                this.getdata()
            },
            //勾选变化
            handleSelectionChange(k){
                console.log(k)
                this.removesArr=k;
            },
            //page变化
            handleCurrentChange($val){
                this.filterForm.pageNum=$val-1;
                this.getdata();
            },
            //是否删除
            handleDelete($index,row){
                let _this = this;
                this.$confirm('确定删除该条资讯?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http('/news/delNewsInfo',{body:{newsId:row.id}},{},{},'post').then(function(res){
                        console.log(res)
                        if(res.data.code==0){
                            
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            _this.getdata()
                            
                        }else if(res.data.code==300){
                            _this.$router.push('/login')
                        }else{
                            _this.$message({
                              message: res.data.message,
                              type: 'warning'
                            });
                        }
                        _this.is_loading_tab=false;
                    }).catch(function(err){
                        _this.is_loading_tab=false;
                        console.log(err)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //编辑
            handleEdit(index,row){
                let query={id:row.id,type:'edit'}
                this.$router.push({path:'/article/newarticle',query})
            },
            //查看详情
            handleSee(index,row){
                let query={id:row.id}
                this.$router.push({path:'/article/articledetail',query})
            },
            //是否下线
            noLonger($index,row) {
                let _this=this,
                strText='',
                strResultText='',
                body={newsId:row.id,status:''};
                if(row.status==1){
                    strText='确定下线该条资讯？'
                    strResultText='下线成功'
                    body.status=0
                }else{
                    strText='确定上线该条资讯？'
                    strResultText='上线成功'
                    body.status=1
                }
                this.$confirm( strText, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http('/news/updateNewsInfo',{body},{},{},'post').then(function(res){
                        console.log(res)
                        if(res.data.code==0){
                            
                            _this.$message({
                                type: 'success',
                                message: strResultText
                            });
                            _this.getdata()
                            
                        }else if(res.data.code==300){
                            _this.$router.push('/login')
                        }else{
                            _this.$message({
                              message: res.data.message,
                              type: 'warning'
                            });
                        }
                        _this.is_loading_tab=false;
                    }).catch(function(err){
                        _this.is_loading_tab=false;
                        console.log(err)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            //批量删除
            removesHander(){
                let _this=this;
                if(this.removesArr.length<=0){
                    this.$message({
                    type: 'warning',
                    message: '请先勾选!'
                });
                return;
                }
                this.$confirm('确定批量删除资讯?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = this.removesArr.map(item => item.id);//获取所有选中行的id组成的字符串，以逗号分隔
                    
                    ids=ids.join(',')
                    _this.$http('/news/delNewsInfo',{body:{newsId:ids}},{},{},'post').then(function(res){
                        
                        if(res.data.code==0){
                            
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            _this.getdata()
                            
                        }else if(res.data.code==300){
                            _this.$router.push('/login')
                        }else{
                            _this.$message({
                              message: res.data.message,
                              type: 'warning'
                            });
                        }
                        _this.is_loading_tab=false;
                    }).catch(function(err){
                        _this.is_loading_tab=false;
                        console.log(err)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            refresh(){
                this.$store.dispatch('mainLoadingAction',true);  
                for(var i in this.filterForm){
                    if(i == 'pageNum'){
                        this.filterForm[i] = '0'
                    }else if(i == 'pageSize'){
                        this.filterForm[i] = '10'
                    }else{
                        this.filterForm[i] = ''
                    }
                }
                this.search()
            },
        },
        mounted(){
            this.$store.dispatch('mainLoadingAction',true);
            this.$store.dispatch('defaultIndexAction','/article/articlemanagement');
        }
    }
</script>

<style scoped>
        .posts{
            width:100%;
        }
        .postsTopDiv p{
            padding:15px 0 30px 25px;
            font-weight: 700;
            font-size: 15px;
            color:gray;
        }
        .posts .postsTop_wap{
            border: 1px solid darkgray;margin:20px;
        }
        .postsSeek .postsOption{
            width:12%;
        }
        .postsSeek .postsInputSeek{
            width:20%;
        }
        .postsSeek .bao{
            width:100%;
            display:inline-block;
            *display:inline;
            *zoom:1;
            margin-top: 15px;
        }
        .postsSeek{
            display:-webkit-box;
            display:-webkit-flex;
            display:-ms-flexbox;
            display: flex;
            justify-content: space-between;
        }
        .inquireBtn button{
            width:100px;
            height:50px;
            margin: 5px;
        }
        .inquireBtn{
          line-height: 50px;
          padding-top: 24px;
          padding-bottom: 24px;
          display:-webkit-box;
          display:-webkit-flex;
          display:-ms-flexbox;
          display: flex;
        }
        .postsSeekBtn{
            /*border: 1px solid darkgray;*/
            margin:20px;
            /*padding:10px;*/
        }
        .blockPage{
          display:-webkit-box;
          display:-webkit-flex;
          display:-ms-flexbox;
          display: flex;
          justify-content: space-between;
            padding: 20px;
        }
        
</style>
<style type="text/css">
    .posts .el-table .el-tooltip.cell{
        white-space: normal;
    }
</style>
