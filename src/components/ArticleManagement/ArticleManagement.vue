<template>
    <div class="posts">
        <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
        <div style="padding:20px;font-size:14px" class="postsTop_wap">
            <div class="postsSeek">
                <div>
                    <div class="bao">
                        <span>按：</span>
                        <el-select style="width:100px" v-model="filterForm.seekType" class="postsOption">
                            <el-option
                            v-for="item in seekOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" >
                            </el-option>
                        </el-select>
                        <el-input v-model="filterForm.seekValue" style="width:140px" class="postsInputSeek"></el-input>
                        <span style="margin-left:10px">分类：</span>
                        <el-select v-model="filterForm.type" :clearable="true" placeholder="分类"  style="width:80px;">
                            <el-option
                            v-for="item in classOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" >
                            </el-option>
                        </el-select>
                        <span style="margin-left:10px">文章状态：</span>
                        <el-select v-model="filterForm.state" :clearable="true" placeholder="状态" style="width:80px;">
                            <el-option
                            v-for="item in textOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" >
                            </el-option>
                        </el-select>
                        <span style="margin-left:10px">区域：</span>
                        <AreaAll :area="filterForm" :isshowqu="false"></AreaAll>
                    </div>
                    <div class="bao">
                      
                        <span class="demonstration">发布时间：</span>
                        <el-date-picker
                          :clearable="true"
                          v-model="filterForm.beginTime"
                          align="right"
                          type="date"
                          placeholder="选择日期"
                          :picker-options="pickerOptions1">
                        </el-date-picker>
                        <span class="demonstration">至</span>
                        <el-date-picker
                          :clearable="true"
                          v-model="filterForm.endTime"
                          align="right"
                          type="date"
                          placeholder="选择日期" 
                          :picker-options="pickerOptions1">
                        </el-date-picker>
                        <span style="margin-left:10px">头条：</span>
                        <el-select v-model="filterForm.isTopLine" :clearable="true" placeholder="头条" style="width:80px;">
                            <el-option
                            v-for="item in titleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" >
                            </el-option>
                        </el-select>
                        <span style="margin-left:10px">置顶：</span>
                        <el-select v-model="filterForm.isTop" :clearable="true" placeholder="置顶"  style="width:80px;">
                            <el-option
                            v-for="item in topOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="inquireBtn">
                    <el-button type="primary" @click="search">查询</el-button>
                    <router-link :to="{path:'/index/newarticle',query:{type:'add'}}">
                      <el-button type="primary">发布文章</el-button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="postsSeekBtn">
            <el-table
                ref="multipleTable"
                :data="data.list"
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
                width="200">
                </el-table-column>
                <el-table-column
                prop="type"
                label="文章分类"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="发布城市"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="publish_time"
                label="发布时间"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="isTopLine"
                label="头条"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="isTop"
                label="置顶"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="publisher"
                label="发布人"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="source"
                label="文章来源"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="state"
                label="状态"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column width="300px" fixed="right" label="操作">
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
                        size="small"
                        type="danger"
                        @click="noLonger(scope.$index, scope.row)">下线</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="blockPage">
                <el-button type="danger" @click="removesHander()">批量删除</el-button>
                <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="2"
                layout="total, prev, pager, next"
                :total="data.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import Subnav from '../Subnav/Subnav.vue'
    import AreaAll from '../Common/AreaAll/AreaAll'
    export default {
        name:'Posts',
        components:{
            Subnav,
            AreaAll
        },
        data(){
            return {
                secondLevel:'文章管理',
                threeLevel:'文章管理',
                currentPage:1,
                is_loading_tab:false,
                multipleSelection: [],
                removesArr:[],
                filterForm: {
                    page:1,
                    id:'',
                    seekType:'id',
                    seekValue:'',
                    isTopLine:'',
                    isTop:'',
                    beginTime:'',
                    endTime:'',
                    type:'',
                    state:'',
                    sheng:'',
                    shi:'',
                    qu:'',
                },
                data:{
                    list:[]
                },
                seekOptions: [{
                    value: 'id',
                    label: 'ID'
                 }, {
                    value: 'publisher',
                    label: '发布人'
                 }, {
                    value: 'title',
                    label: '标题'
                 }, {
                    value: 'source',
                    label: '来源'
                }],
                classOptions: [{
                    value: '1',
                    label: '不限'
                 }, {
                    value: '2',
                    label: '严选头条'
                 }, {
                    value: '3',
                    label: '置业指引'
                 }, {
                    value: '4',
                    label: '行业动态'
                 },{
                    value: '5',
                    label: '新政解读'
                }],
                textOptions: [{
                    value: '1',
                    label: '不限'
                 }, {
                    value: '2',
                    label: '上线'
                 }, {
                    value: '3',
                    label: '下线'
                }],
                titleOptions: [{
                    value: '1',
                    label: '是'
                 }, {
                    value: '2',
                    label: '否'
                }],
                topOptions: [{
                    value: '1',
                    label: '是'
                 }, {
                    value: '2',
                    label: '否'
                }],
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
                            picker.$emit('pick', date);
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
        },
        methods: {
            getdata(){
                let _this=this;
                _this.is_loading_tab=true;
                this.$http('/articlelist',{},_this.filterForm).then(function(res){
                console.log(res)
                if(res.data.code==1000){
                    _this.data=res.data.data;
                }
                _this.is_loading_tab=false;
                }).catch(function(err){
                    _this.is_loading_tab=false;
                    console.log(err)
                })
            },
            //搜索
            search(){
                this.currentPage=1;
                this.filterForm.page=1;
                this.getdata()
            },
            //勾选变化
            handleSelectionChange(k){
                console.log(k)
                this.removesArr=k;
            },
            //page变化
            handleCurrentChange($val){
                this.filterForm.page=$val;
                this.getdata();
            },
            //是否删除
            handleDelete($index,row){
                this.$confirm('确认删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.getdata()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
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
                this.$router.push({path:'/index/newarticle',query})
            },
            //查看详情
            handleSee(index,row){
                let query={id:row.id}
                this.$router.push({path:'/index/articledetail',query})
            },
            //是否下线
            noLonger($index) {
                this.$confirm('确定上线／下线该条资讯？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.getdata()
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
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
                this.$confirm('此操作将永久删除所有选中文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = this.removesArr.map(item => item.id);//获取所有选中行的id组成的字符串，以逗号分隔
                    _this.getdata()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
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
                    this.filterForm[i]=''
                }
                this.search()
                var that=this
                setTimeout(function(){
                    that.$store.dispatch('mainLoadingAction',false);
                },300)
            },
        },
        mounted(){
            this.$store.dispatch('mainLoadingAction',true);
            this.$store.dispatch('defaultIndexAction','/index/articlemanagement');
            var that=this;
            setTimeout(function(){
                that.$store.dispatch('mainLoadingAction',false);
            },300)
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
            border: 1px solid darkgray;margin:20px;
            padding:10px;
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
