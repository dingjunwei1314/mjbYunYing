<template>
    <div class="posts">
        <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav>
    </div>
</template>

<script>

    export default {
        name:'Posts',
        components:{
            Subnav,
            BigDialog,
            AreaAll
        },
        data() {
            return {

            }
        },
        filters:{

        },
        computed:{

        },
        created(){

        },
        methods: {

        },
        mounted(){

        }
    }
</script>

<style scoped>

</style>

<style>

</style>
