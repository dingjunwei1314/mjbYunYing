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
const ArticleManagement=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/ArticleManagement/ArticleManagement'))
  })
}
const NewArticle=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/ArticleManagement/NewArticle'))
  })
}
const ArticleDetail=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/ArticleManagement/ArticleDetail'))
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
const AccountManagement = function (resolve) {
    require.ensure([],function () {
      resolve(require('../components/AccountManagement/AccountManagement'))
    })
}

const ChangePassword = function (resolve) {
    require.ensure([],function () {
      resolve(require('../components/ChangePassword/ChangePassword'))
    })
}



//新建管理员
const CreateNewAccount = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/AccountManagement/CreateNewAccount'))
  })
}
//角色管理

const RoleManagement = function (resolve) {
    require.ensure([],function () {
      resolve(require('../components/AccountManagement/RoleManagement'))
    })
}
//新建角色
const CreateNewRole = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/AccountManagement/CreateNewRole'))
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
                  path:'/index/articlemanagement',
                  component:ArticleManagement
                },  
                {
                  path:'/index/articledetail',
                  component:ArticleDetail
                },
                {
                  path:'/index/newarticle',
                  component:NewArticle
                },
                {
                  path:'/index/accountmanagement',
                  component:AccountManagement,
                },
                {
                  path:'/index/rolemanagement',
                  component:RoleManagement
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
                  path:'/index/createnewrole',
                  component:CreateNewRole
                },
                {
                  path:'/index/createnewaccount',
                  component:CreateNewAccount
                },
                {
                  path: '/index/changePassword',
                  component: ChangePassword,
                },
            ]
        }
    ]
})

