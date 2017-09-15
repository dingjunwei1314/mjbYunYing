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

const EstateEdit=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateEdit/EstateEdit'))
    })
}
const EstateDetail=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateDetail/EstateDetail'))
    })
}

const RankingList=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/RankingList/RankingList'))
    })
}

const CityHouseScore=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/CityHouseScore/CityHouseScore'))
    })
}

const ExpectingBuildings=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/ExpectingBuildings/ExpectingBuildings'))
    })
}
//订单管理
const CooperOrders=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/CooperOrders/CooperOrders'))
    })
}

//文章管理
const Posts=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Posts/posts'))
  })
}
//新建文章
const NewText=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Posts/newtext'))
  })
}

//活动管理
const ActivityManagement=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/ActivityManagement/ActivityManagement'))
    })
}

//资讯管理
const ConsultAdmin=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/consultAdmin/consultAdmin'))
  })
}
//资讯详情
const CounsultParticulars=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/consultAdmin/counsultParticulars'))
  })
}
//用户管理

const UserList=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/UserList/UserList'))
    })
}
const IntentUserList=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/IntentUserList/IntentUserList'))
    })
}

const MessageManagement=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/MessageManagement/MessageManagement'))
    })
}

//账户管理
const AccountAdmin = function (resolve) {
    require.ensure([],function () {
      resolve(require('../components/accountAdmin/accountAdmin'))
    })
}

//角色管理

const RoleAdmin = function (resolve) {
    require.ensure([],function () {
      resolve(require('../components/accountAdmin/roleAdmin'))
    })
}
//新建角色
const CreateAdmin = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/accountAdmin/createAdmin'))
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
                  path:'/index/estateedit',
                  component:EstateEdit
                },
                {
                  path:'/index/estatedetail',
                  component:EstateDetail
                },
                {
                  path:'/index/rankinglist',
                  component:RankingList
                },
                {
                  path:'/index/cityhousescore',
                  component:CityHouseScore
                },
                {
                  path:'/index/expectingbuildings',
                  component:ExpectingBuildings
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
                {
                path:'/index/intentuserlist',
                component:IntentUserList
                },
                {
                path:'/index/messagemanagement',
                component:MessageManagement
                },
                {
                  path:'/index/posts',
                  component:Posts
                },
                {
                  path:'/index/newText',
                  component:NewText
                },
                {
                  path:'/index/accountAdmin',
                  component:AccountAdmin,
                },
                {
                  path:'/index/roleAdmin',
                  component:RoleAdmin
                },
                {
                  path:'/index/consultAdmin',
                  component:ConsultAdmin
                },
                {
                  path:'/index/counsultParticulars',
                  component:CounsultParticulars
                },
                {
                  path:'/index/createAdmin',
                  component:CreateAdmin
                },
            ]
        }
    ]
})

