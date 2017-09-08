<template>
    
      <div>
        <el-form-item style="display:inline-block;width:200px" :required="true" label="区域" prop="pass">
          <el-select clearable v-model="new_area.sheng" placeholder="省" @change="area_change">
            <el-option v-for="(item,index) in area_arr" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <span>省</span>
        <el-form-item style="display:inline-block;width:115px"  prop="pass">
          <el-select clearable v-model="new_area.shi" placeholder="市" @change="city_area_change">
            <el-option v-for="(item,index) in city_area_arr" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <span>市</span>
        <el-form-item style="display:inline-block;width:115px"  prop="pass">
          <el-select clearable v-model="new_area.qu" placeholder="市">
            <el-option v-for="(item,index) in area_area_arr" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <span>区</span>
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
    },
    mounted(){
      
    }
  }
</script>

<style scoped>
  
</style>
