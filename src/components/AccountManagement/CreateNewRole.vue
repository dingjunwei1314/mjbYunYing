<template>
  <div class="createAdmin">
    <Subnav2 :navList="navList" @refresh="refresh"></Subnav2>
    <div class="createAdminTop">
      <el-form ref="form" :model="form" label-width="120px" style="font-size: 12px">
        <el-form-item label="角色名称：" required>
          <el-input size="small" v-model="form.roleName" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="角色权限：">
          <el-row v-for="(item,index) in souList" :key="index">
            <el-row style="background:#eee;padding-left: 10px">
              <el-checkbox @change="selectItemAll(index)" v-model="form.itemCheckAll[index].isCheck">
                {{item.name}}
              </el-checkbox>
            </el-row>
            <el-row style="padding-left: 10px;margin: 10px 0px;">
              <el-checkbox-group style="margin-left:0px" type="small" v-model="form.itemCheckList[index].checkList" @change="selectItem(index)">
                <el-checkbox :label="item2.id" v-for="(item2,index2) in item.subList" :key="index" class="checkedAdmin">{{item2.name}}</el-checkbox>
              </el-checkbox-group>
            </el-row>
          </el-row>

          <el-row style="background:#eee;padding-left: 10px">
            <el-checkbox @change="selectAll(form.selectAll)" v-model="form.selectAll">
              全选
            </el-checkbox>
          </el-row>
        </el-form-item>

        <el-form-item label="备注：">
          <el-input size="small" v-model="form.roleDesc" type="textarea" style="width:600px"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button style="margin-left: 120px;" type="primary" @click="submitBtn">
            提交
          </el-button>
          <el-button @click="back">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Subnav2 from '../Subnav2/Subnav2';
  import message from '../../common/message';
  export default {
    name:'CreateAdmin',
    components:{
      Subnav2,
    },
    data(){
      return{
        navList:[
          {path:'/account/rolemanagement',name:'首页'},
          {path:'/account/rolemanagement',name:'账户管理'},
          {path:this.$route.fullPath,name:''}
        ],
        
        souList:[],
        idsData:[],

        form:{
          roleName:'',
          roleDesc:'',
          itemCheckAll:[
          
          ],
          itemCheckList:[
             
          ],
          selectAll:false,
        },
      }
    },
    watch:{
      
    },
    created(){
      this.getSouData();
      if(this.$route.query.type == 'edit'){
        this.navList[2].name = '修改角色'
      }else{
        this.navList[2].name = '创建角色'
      }
    },
    methods:{
      //初始化数据
      initUser(){
        let info = JSON.parse(this.$route.query.info);
        this.form.roleName = info.roleName;
        this.form.roleDesc = info.roleDesc;
        info.sourceInfos = eval(info.sourceInfos);
        this.idsData.forEach((item,index) => {
          info.sourceInfos.forEach((item2,index2) => {
            if(item2.indexOf(item.id) >= 0){
              let set = new Set(item2);
              set.delete(item.id);
              if(set.size == item.ids.length){
                this.form.itemCheckAll[index].isCheck = true;  
              }
              this.form.itemCheckList[index].checkList = Array.from(set);
            }
          })
        })
        this.checkIsAll();
      },
      //获取权限
      getSouData(){
          this.$http('/backstageRole/querySourceListInfo',{},{},{},'post').then(res => {
            if(res.data.code == 0){
              this.souList = res.data.response.list;
              this.souList.forEach((item,index) => {
                this.form.itemCheckAll.push({
                  isCheck:false
                });
                this.form.itemCheckList.push({
                  checkList:[]
                });
                this.idsData.push({
                  id:item.id,
                  ids:[]
                });
                item.subList.forEach(item2 => {
                  this.idsData[index].ids.push(item2.id);
                })
              })
              if(this.$route.query.type == 'edit'){
                this.initUser();
              }
            }
          })
      },
      //单选全部
      selectItemAll(index){
        if(this.form.itemCheckAll[index].isCheck){
          this.form.itemCheckList[index].checkList = this.idsData[index].ids;
        }else{
          this.form.itemCheckList[index].checkList = [];
        }
        this.checkIsAll()
      },
      //单选
      selectItem(index){
        let len1 = this.form.itemCheckList[index].checkList.length,
        len2 = this.idsData[index].ids.length;
        this.form.itemCheckAll[index].isCheck = len1 === len2;
        this.checkIsAll()
      },
      //全选
      selectAll(val){
        this.form.itemCheckAll.forEach(item => {
          item.isCheck = val;
        })
        this.form.itemCheckList.forEach((item,index) => {
          if(val){
            item.checkList = this.idsData[index].ids;
          }else{
            item.checkList = []
          }
        })
      },
      //检测是否全选
      checkIsAll(){
        let count = 0;
        this.form.itemCheckAll.forEach(item => {
          if(item.isCheck){
            count++
          }
        })
        this.form.selectAll = count == this.form.itemCheckAll.length;
      },
      //提交
      submitBtn(){
        if(this.form.roleName == ''){
          message(this,'请输入角色名称','warning')
          return;
        }
        
        let res = this.form.itemCheckList.every(item => {
          return item.checkList.length <= 0
        })

        if(res){
          message(this,'请选择权限','warning')
          return;
        }

        this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let 
          body = {
            roleName:this.form.roleName,
            roleDesc:this.form.roleDesc,
            sourceInfos:[]
          },
          arr = _.cloneDeep(this.form.itemCheckList),
          url;
          arr.forEach((item,index,self) => {
            if(item.checkList.length > 0){
              self[index].checkList.push(this.idsData[index].id);
              body.sourceInfos.push(item.checkList);
            };
          });

          if(this.$route.query.type == 'edit'){
            url = '/backstageRole/updateInfo';
            body.id = JSON.parse(this.$route.query.info).id;
          }else{
            url = '/backstageRole/insertInfo';
          }
          
          this.$http(url,{body},{},{},'post').then(res => {
            if(res.data.code == 0){
              if(this.$route.query.type == 'edit'){
                if(res.data.response.res == 1){
                  message(this,'提交成功','success')
                  this.$router.push({path:'/account/rolemanagement'})
                }else{
                  message(this,'请求失败','warning');
                }
              }else{
                message(this,'提交成功','success')
                this.$router.push({path:'/account/rolemanagement'})
              }
            }
          })
          
        }).catch(() => {
        });

      },
      back(){
        this.$router.push({path:'/account/rolemanagement'})
      },
      refresh(){
      },
    },
    mounted(){
      this.$store.dispatch('defaultIndexAction','/account/rolemanagement');
    }
  }
</script>

<style scoped>
  .createAdminTop{
    border: 1px solid darkgray;
    padding:20px 10px;
    margin: 20px
  }

  .createAdminTop p {
    padding: 10px;
  }
  .adminName{
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display: flex;
    padding: 10px;
  }
  .adminName input{
    width:200px;
  }
  .adminName span{
    line-height: 36px;
  }
  .houseAdmin{
      background:rgba(32,160,255,.8);
      padding: 5px 0 0 20px;
  }
  .houseAdmin span{
    color:#fff;
  }
  .houseAdminText .checkedAdmin{
    width:250px;
    text-align: left;
    margin: 20px;
  }
  .houseAdminEare{
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display: flex;
    padding: 20px;
  }
  .houseAdminEare span{
    width:80px;
    text-align: center;
    line-height: 53px;
  }
  .houseAdminEareBtn{
    padding: 15px;
    width: 350px;
    margin: auto;
  }
  .houseAdminEareBtn button{
    width: 150px;
  }
</style>


<style type="text/css">
  .createAdminTop .el-form-item__label{
    font-size: 13px;
  }
</style>