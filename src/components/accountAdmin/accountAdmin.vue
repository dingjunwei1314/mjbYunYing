<template>
    <div class="accountAdmin">
      <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    </div>
</template>

<script>
  import Subnav from '../Subnav/Subnav.vue'

    export default {
      name:'AccountAdmin',
      components:{
        Subnav,
      },
        data(){
            return{
              secondLevel:'账户管理',
              threeLevel:'账户管理',
            }
        },
      methods:{
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
        this.$store.dispatch('defaultIndexAction','/index/posts');
        var that=this;
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)
      }
    }
</script>

<style>

</style>
