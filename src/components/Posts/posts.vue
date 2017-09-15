<template>
    <div class="posts">
        <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
        <div style="padding:20px" class="postsTop_wap">
            <div class="postsSeek">
                <div style=";">
                    <div class="bao">
                        <span>按：</span>
                        <el-select v-model="seekValue" placeholder="请选择" class="postsOption">
                            <el-option
                                    v-for="item in seekOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value" >
                            </el-option>
                        </el-select>
                        <el-input v-model="input" placeholder="请输入内容" class="postsInputSeek"></el-input>
                        <span>分类：</span>
                        <el-select v-model="classValue" placeholder="请选择"  style="width:120px;">
                            <el-option
                                    v-for="item in classOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value" >
                            </el-option>
                        </el-select>
                        <span>文章状态：</span>
                        <el-select v-model="textValue" placeholder="请选择" style="width:80px;">
                            <el-option
                                    v-for="item in textOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value" >
                            </el-option>
                        </el-select>
                        <span>头条：</span>
                        <el-select v-model="titleValue" placeholder="请选择" style="width:80px;">
                            <el-option
                                    v-for="item in titleOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value" >
                            </el-option>
                        </el-select>
                        <span>置顶：</span>
                        <el-select v-model="topValue" placeholder="请选择"  style="width:80px;">
                            <el-option
                                    v-for="item in topOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value" >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="bao" style="
                     display:-webkit-box;
                      display:-webkit-flex;
                      display:-ms-flexbox;
                      display: flex;
                    justify-content: space-around">
                      <div>
                        <span class="demonstration">发布时间</span>
                        <el-date-picker
                          v-model="value2"
                          align="right"
                          type="date"
                          placeholder="选择日期"
                          :picker-options="pickerOptions1">
                        </el-date-picker>
                        <span class="demonstration">至</span>
                        <el-date-picker
                          v-model="value2"
                          align="right"
                          type="date"
                          placeholder="选择日期"
                          :picker-options="pickerOptions1">
                        </el-date-picker>
                      </div>

                        <div>
                            <span style="line-height:36px;float:left;">区域：</span>
                          <AreaAll :area="filterForm"></AreaAll>
                        </div>
                    </div>
                </div>
                <div class="inquireBtn">
                    <el-button type="primary">查询</el-button>
                  <router-link to="/index/newtext">
                    <el-button type="primary">发布文章</el-button>
                  </router-link>
                </div>
            </div>
        </div>
        <div class="postsSeekBtn">

              <div style="width:100%;height:250px;overflow: scroll">
                <el-table
                  ref="multipleTable"
                  :data="tableData3"
                  border
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="50"
                  >
                  </el-table-column>
                  <el-table-column
                    label="ID"
                    width="100"
                    prop="id"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="title"
                    label="标题"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="classify"
                    label="文章分类"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="发布城市"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="发布时间"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="头条"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="置顶"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="发布人"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="文章来源"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="状态"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column width="260px" label="操作">
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
                        @click="handleDelete(scope.$index, scope.row)">查看</el-button>
                      <el-button
                        size="small"
                        type="danger"
                        @click="noLonger(scope.$index, scope.row)">下线</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

            <div class="blockPage">
                <el-button type="danger" @click="removesHander()">批量删除</el-button>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage1"
                        :page-size="20"
                        layout="total, prev, pager, next"
                        :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import Subnav from '../Subnav/Subnav.vue'
//    import vueAddress2 from './city.vue'
    import AreaAll from '../Common/AreaAll/AreaAll'
    export default {
        name:'Posts',
        components:{
            Subnav,
//            vueAddress2,
            AreaAll
        },
        data() {
            return {
                secondLevel:'文章管理',
                threeLevel:'文章管理',
                input: '',
                currentPage1:1,
                seekValue: '选项1',
                classValue: '选项1',
                textValue: '选项1',
                multipleSelection: [],
                topValue: '选项1',
                titleValue: '选项1',
                value1: '',
                value2: '',
                removesArr:[],

              filterForm: {
                name:'',
                developers:'',
                time:'',
                rental_return:'',
                sheng:'',
                shi:'',
                qu:'',
                cooper_buy:'',
                strict_select:'',
                state:'',
                id:''
              },
                seekOptions: [{
                    value: '选项1',
                    label: 'ID'
                }, {
                    value: '选项2',
                    label: '发布人'
                }, {
                    value: '选项3',
                    label: '选项'
                }, {
                    value: '选项4',
                    label: '来源'
                }],
                classOptions: [{
                    value: '选项1',
                    label: '不限'
                }, {
                    value: '选项2',
                    label: '严选头条'
                }, {
                    value: '选项3',
                    label: '置业指引'
                }, {
                    value: '选项4',
                    label: '行业动态'
                },{
                    value: '选项5',
                    label: '新政解读'
                }],
                textOptions: [{
                    value: '选项1',
                    label: '不限'
                }, {
                    value: '选项2',
                    label: '上线'
                }, {
                    value: '选项3',
                    label: '下线'
                }],
                titleOptions: [{
                    value: '选项1',
                    label: '是'
                }, {
                    value: '选项2',
                    label: '否'
                }],
                topOptions: [{
                    value: '选项1',
                    label: '是'
                }, {
                    value: '选项2',
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
                tableData3: [{
                    id: '00',
                    title: '王小虎',
                    classify: '上海市普陀区金沙江路 1518 弄',
                }, {
                    id: '11',
                    title: '王小虎',
                    classify: '上海市普陀区金沙江路 1518 弄',
                }, {
                    id: '22',
                    title: '王小虎',
                    classify: '上海市普陀区金沙江路 1518 弄',
                }, {
                    id: '33',
                    title: '王小虎',
                    classify: '上海市普陀区金沙江路 1518 弄',
                }],
            }
        },
        filters:{

        },
        computed:{

        },
        created(){

        },
        methods: {

            refresh(){
                this.$store.dispatch('mainLoadingAction',true);
                this.getdata()
                this.currentPage=1;
                for(var i in this.filterForm){
                    this.filterForm[i]=''
                }
                var that=this
                setTimeout(function(){
                    that.$store.dispatch('mainLoadingAction',false);
                },300)
            },
          handleDelete($index,scope){
                this.open2($index);
          },
          //勾选变化
          handleSelectionChange(k){
            this.removesArr=k;
          },
          handleSizeChange(){
            console.log(`每页 1 条`);
          },
          handleCurrentChange($val){
            console.log($val);
            this.$store.dispatch('mainLoadingAction',true);
            this.$store.dispatch('defaultIndexAction','/index/posts');
            var that=this;
            setTimeout(function(){
              that.$store.dispatch('mainLoadingAction',false);
            },300)
          },
          //是否删除
          open2($index) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.tableData3.splice($index,1);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          //是否下线
          noLonger($index) {
            this.$confirm('确定上线／下线该条资讯？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.tableData3.splice($index,1);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });
          },
          //批量删除
          removesHander(){
              this.$confirm('此操作将永久删除所有选中文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                let ids = this.removesArr.map(item => item.id);//获取所有选中行的id组成的字符串，以逗号分隔
                let lens = ids.length;
                for(let i = 0;i<lens;i++){
//                  this.tableData3.splice(ids[i],1);
                  console.log(ids[i]);
                }
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
          }
        },
        mounted(){
            this.$store.dispatch('mainLoadingAction',true);
            this.$store.dispatch('defaultIndexAction','/index/posts');
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
            overflow: scroll;
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
