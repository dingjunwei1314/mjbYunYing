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
//雇主管理
const ManagersList=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/ManagersList/ManagersList'))
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
                  path:'/index/managerslist',
                  component:ManagersList
                },
            ]
        }
    ]
})
