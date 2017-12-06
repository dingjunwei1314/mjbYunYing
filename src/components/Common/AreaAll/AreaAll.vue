<template>
      <div style="display:inline-block;" class="area_wap">
          <el-select  style="width:140px" :disabled="isdisabled" clearable v-model="new_area.province" placeholder="省" @change="area_change">
            <el-option v-for="(item,index) in area_arr" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
          <el-select  style="width:140px" :disabled="isdisabled" clearable v-model="new_area.city" placeholder="市" @change="city_area_change">
            <el-option v-for="(item,index) in city_area_arr" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
          <el-select style="width:140px" v-if="isshowqu" :disabled="isdisabled" clearable v-model="new_area.area" placeholder="区">
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
        default:{province:'',city:'',area:''}
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
        this.new_area.city='';
        this.new_area.area='';
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
          this.new_area.area='';
          if(val != ''){
            for(var i in this.area_arr){
              if(this.area_arr[i].name==this.new_area.province){
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
