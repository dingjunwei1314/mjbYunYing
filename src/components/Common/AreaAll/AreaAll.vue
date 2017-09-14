<<<<<<< HEAD
<template>

      <div style="display:flex;" class="area_wap">
        <!--<el-form-item style="display:inline-block;width:125px">-->
          <el-select clearable v-model="new_area.sheng" placeholder="省" @change="area_change">
            <el-option v-for="(item,index) in area_arr" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
        <!--</el-form-item>-->

        <!--<el-form-item style="display:inline-block;width:125px;margin-left:10px;">-->
          <el-select clearable v-model="new_area.shi" placeholder="市" @change="city_area_change">
            <el-option v-for="(item,index) in city_area_arr" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
        <!--</el-form-item>-->

        <!--<el-form-item v-if="isshowqu" style="display:inline-block;width:125px;margin-left:10px;">-->
          <el-select v-if="isshowqu" clearable v-model="new_area.qu" placeholder="区">
            <el-option v-for="(item,index) in area_area_arr" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        <!--</el-form-item>-->

      </div>

</template>
<script>
import area_arr from './js/area';
export default {
    name:'area_all',
    props:{
      area:{
        required:true,
        type:Object,
        default:{sheng:'',shi:'',qu:''}
      },
      isshowqu:{
        type:Boolean,
        default:true
      }

    },
    data(){
      return{
        new_area:this.area,
        area_arr,
        city_area_arr:[],
        area_area_arr:[]
      }
    },
    computed:{

    },
    methods: {
      area_change(val){
        this.city_area_arr=[];
        this.area_area_arr=[];
        this.new_area.shi='';
        this.new_area.qu='';
        if(val!=''){
          for(let i in this.area_arr){
            if(this.area_arr[i].name==val){
             this.city_area_arr=area_arr[i].city
            }
          }
        }
      },
      city_area_change(val){
        if(this.isshowqu){
          this.area_area_arr=[];
          this.new_area.qu='';
          if(val != ''){
            for(var i in this.area_arr){
              if(this.area_arr[i].name==this.new_area.sheng){
                for(var j in this.area_arr[i].city){
                  if(this.area_arr[i].city[j].name==val){
                    this.area_area_arr=this.area_arr[i].city[j].area
                  }
                }
              }
            }
          }
        }
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>
  .area_wap{}
  .area_wap .lable_span{line-height: 36px;font-size: 14px;color: #777;padding-left: 5px;}
  .el-select{
    width:130px;
  }
</style>
=======
<template>
    
      <div style="display:inline-block;" class="area_wap">
       
          <el-select  style="width:140px" :disabled="isdisabled" clearable v-model="new_area.sheng" placeholder="省" @change="area_change">
            <el-option v-for="(item,index) in area_arr" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
     
      
        
          <el-select  style="width:140px" :disabled="isdisabled" clearable v-model="new_area.shi" placeholder="市" @change="city_area_change">
            <el-option v-for="(item,index) in city_area_arr" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
       
      
       
          <el-select style="width:140px" v-if="isshowqu" :disabled="isdisabled" clearable v-model="new_area.qu" placeholder="区">
            <el-option v-for="(item,index) in area_area_arr" :key="index" :label="item" :value="item"></el-option>
          </el-select>
       
      
      </div>
 
</template>
<script>
import area_arr from './js/area';
export default {
    name:'area_all',
    props:{
      area:{
        required:true,
        type:Object,
        default:{sheng:'',shi:'',qu:''}
      },
      isshowqu:{
        type:Boolean,
        default:true
      },
      isdisabled:{
        type:Boolean,
        default:false
      }

    },
    data(){
      return{
        new_area:this.area,
        area_arr,
        city_area_arr:[],
        area_area_arr:[]
      }
    },
    computed:{
      
    },
    methods: {
      area_change(val){
        this.city_area_arr=[];
        this.area_area_arr=[];
        this.new_area.shi='';
        this.new_area.qu='';
        if(val!=''){
          for(let i in this.area_arr){
            if(this.area_arr[i].name==val){
             this.city_area_arr=area_arr[i].city
            }
          }
        }
      },
      city_area_change(val){
        if(this.isshowqu){
          this.area_area_arr=[];
          this.new_area.qu='';
          if(val != ''){
            for(var i in this.area_arr){
              if(this.area_arr[i].name==this.new_area.sheng){
                for(var j in this.area_arr[i].city){
                  if(this.area_arr[i].city[j].name==val){
                    this.area_area_arr=this.area_arr[i].city[j].area
                  }
                }
              }
            }
          }
        }
      }
    },
    mounted(){
      
    }
  }
</script>

<style scoped>
  .area_wap{display: inline-block;}
  .area_wap .lable_span{line-height: 36px;font-size: 14px;color: #777;padding-left: 5px;}
</style>
>>>>>>> 146183db1db4633020c5b793d55e0de805eb6c8c
