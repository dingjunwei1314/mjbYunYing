import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



const Login=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/Login/Login'))
    })
}

const Index=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/Index/Index'))
    })
}
//楼盘
const EstateManagement=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateManagement/EstateManagement'))
    })
} 

const EstateAdd=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateAdd/EstateAdd'))
    })
}
//订单管理
const CooperOrders=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/CooperOrders/CooperOrders'))
    })
}


//活动管理
const ActivityManagement=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/ActivityManagement/ActivityManagement'))
    })
}

//用户管理

const UserList=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/UserList/UserList'))
    })
}

export default new Router({
    mode: 'hash',
    base: __dirname,
    routes: [
        { path: '/', redirect: '/login' },
        {
            path: '/login',
            component: Login,
        },
        {
            path:'/index',
            component:Index,
            children:[
                {
                  path:'/index/estatemanagement',
                  component:EstateManagement
                },
                {
                  path:'/index/estateadd',
                  component:EstateAdd
                },
                {
                  path:'/index/cooperorders',
                  component:CooperOrders
                },
                {
                  path:'/index/activitymanagement',
                  component:ActivityManagement
                },
                {
                  path:'/index/userlist',
                  component:UserList
                },
            ]
        }
    ]
})

