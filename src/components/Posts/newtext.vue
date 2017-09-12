<template>
    <div class="newText">
        <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
        <div style="padding:20px" class="newTextTop_wap">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="ruleForm.name" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="作者" >
                    <el-input v-model="ruleForm.name" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="来源">
                    <el-input v-model="ruleForm.name" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="缩略图" class="imageLi">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList2"
                            list-type="picture"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="分类" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择咨讯分类">
                        <el-option label="严选头条" value="shanghai"></el-option>
                        <el-option label="楼盘咨讯" value="beijing"></el-option>
                        <el-option label="其他咨讯" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="摘要" >
                    <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入内容"
                            v-model="textarea2"
                            style="width:50%;"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="正文" prop="region">
                    <quill-editor ref="myTextEditor"
                                  v-model="content"
                                  :config="editorOption"
                                  style="width:80%;"
                    >
                    </quill-editor>
                </el-form-item>
                <el-form-item label="发布日期" required>
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                </el-form-item>
                    <el-form-item label="文章关键词">
                    <el-input v-model="textValue" placeholder="多个关键词请以半角逗号分割"
                              style="width:20%;"
                    ></el-input>
                </el-form-item>
                <el-form-item label="文章显示区域">
                    <el-select v-model="ruleForm.region" placeholder="请选择咨讯分类">
                        <el-option label="不限" value="shanghai"></el-option>
                        <el-option label="陕西" value="beijing"></el-option>
                        <el-option label="北京" value="beijing"></el-option>
                        <el-option label="河南" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐为严选头条">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="置顶">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
                <p style="color:lightgray">注*为必填项</p>
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
                threeLevel:'新建文章',
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            }
        },
        filters:{

        },
        computed:{

        },
        created(){

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        },
        mounted(){
            this.$store.dispatch('mainLoadingAction',true);
            this.$store.dispatch('defaultIndexAction','/index/newtext');
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
