<template>
    <div class="newText">
        <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
        <div style="padding:20px" class="newTextTop_wap">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                <el-form-item label="标题" prop="title" required>
                    <el-input v-model="ruleForm.title" placeholder="标题" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="作者" >
                    <el-input v-model="ruleForm.publisher" placeholder="作者" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="来源">
                    <el-input v-model="ruleForm.source" placeholder="来源" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="缩略图">
                    <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="ruleForm.img_list"
                    list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="分类" prop="type">
                    <el-select v-model="ruleForm.type" :clearable="true" placeholder="分类">
                        <el-option label="严选头条" value="1"></el-option>
                        <el-option label="楼盘咨讯" value="2"></el-option>
                        <el-option label="其他咨讯" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="摘要" >
                    <el-input
                    type="textarea"
                    autosize
                    placeholder="摘要"
                    v-model="ruleForm.abstract"
                    style="width:50%">
                    </el-input>
                </el-form-item>
                <el-form-item label="正文" prop="main_body" required>
                    <quill-editor ref="myTextEditor"
                    v-model="ruleForm.main_body"
                    :config="editorOption"
                    style="width:80%;">
                    </quill-editor>
                </el-form-item>
                <el-form-item label="发布日期" required prop="publish_time">
                    <el-form-item>
                        <el-date-picker 
                        type="date" 
                        placeholder="发布日期" 
                        v-model="ruleForm.publish_time" 
                        style="width:150px">
                        </el-date-picker>
                    </el-form-item>
                </el-form-item>
                    <el-form-item label="文章关键词">
                    <el-input v-model="ruleForm.keywords" placeholder="多个关键词请以半角逗号分割" style="width:20%;"></el-input>
                </el-form-item>
                <el-form-item label="文章显示区域">
                    <el-select v-model="ruleForm.active_area" :clearable="true" placeholder="文章显示区域">
                        <el-option label="不限" value=""></el-option>
                        <el-option label="陕西" value="陕西"></el-option>
                        <el-option label="北京" value="北京"></el-option>
                        <el-option label="河南" value="河南"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐为严选头条">
                    <el-radio-group v-model="ruleForm.isTopLine">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="置顶">
                    <el-radio-group v-model="ruleForm.isTop">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left:200px" type="primary" @click="submitForm('ruleForm')">发布</el-button>
                    <el-button @click="resetForm">取消</el-button>
                </el-form-item>
                <p style="color:lightgray">注*为必填项</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueQuillEditor from 'vue-quill-editor'
    import Subnav from '../Subnav/Subnav.vue'
    Vue.use(VueQuillEditor);
    export default {
        name:'Posts',
        components:{
            Subnav,
        },
        data() {
            let validatePublishTime=(rule, value, callback) => {
                if (value === '') {
                callback(new Error('请选择发布时间'));
                } else {
                callback();
                }
            };
            return {
                secondLevel:'文章管理',
                threeLevel:'新建文章',
                editorOption:'',
                ruleForm: {
                    id: '',
                    abstract: '',
                    title: '',
                    type: '',
                    img_list:[],
                    keywords:'',
                    active_area: '',
                    main_body: '',
                    publish_time: '',
                    publisher: '',
                    isTopLine: '',
                    isTop: '',
                    source: ''
                },
                rules: {
                    title: [
                        { required: true, message: '请填写标题' },
                    ],
                    type: [
                        { required: true, message: '请选择类型' }
                    ],
                    publish_time: [
                        { validator: validatePublishTime }
                    ],
                    main_body: [
                        {required: true, message: '请填写正文' }
                    ]
                }
            }
        },
        filters:{

        },
        computed:{

        },
        created(){
            if(this.$route.query && this.$route.query.type && this.$route.query.type=='edit'){
                this.getdata()
            }
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
                    _this.ruleForm=res.data.data;
                    _this.ruleForm.keywords=_this.ruleForm.keywords.join()
                }
                }).catch(function(err){
                console.log(err)
                })
            },
            submitForm(formName) {
                let _this=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            console.log(_this.ruleForm)
                            _this.$router.push({path:'/index/articlemanagement'})
                            this.$message({
                                type: 'success',
                                message: '提交成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '有必填项未填写'
                        });
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm() {
                this.$router.push({path:'/index/articlemanagement'})
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
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
 </style>

<style>

</style>
