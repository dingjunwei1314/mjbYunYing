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

const RankingListAdd=function(resolve){
  require.ensure([],function(){
      resolve(require('../components/RankingListAdd/RankingListAdd'))
  })
}   

const RankingListEdit=function(resolve){
  require.ensure([],function(){
      resolve(require('../components/RankingListEdit/RankingListEdit'))
  })
}

const RankingDetail=function(resolve){
  require.ensure([],function(){
      resolve(require('../components/RankingDetail/RankingDetail'))
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
//订阅管理
const BulletinSubscription=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/BulletinSubscription/BulletinSubscription'))
    })
}

const BulletinOrder=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/BulletinOrder/BulletinOrder'))
    })
}  

const DetailBulletinOrder=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/DetailBulletinOrder/DetailBulletinOrder'))
    })
}  

const DetailBulletinSubscription=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/DetailBulletinSubscription/DetailBulletinSubscription'))
    })
}

//全流程监控管理
const EstateProcessMonitoringManagement=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateProcessMonitoringManagement/EstateProcessMonitoringManagement'))
    })
}  


const EstateProcessMonitoringDetail=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateProcessMonitoringDetail/EstateProcessMonitoringDetail'))
    })
}  

const EstateProcessMonitoringService=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateProcessMonitoringService/EstateProcessMonitoringService'))
    })
} 

const EstateProcessMonitoringUser=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateProcessMonitoringUser/EstateProcessMonitoringUser'))
    })
}   

const EstateParkReportList=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateParkReportList/EstateParkReportList'))
    })
}   

const EstateBanReportList=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateBanReportList/EstateBanReportList'))
    })
}  

const EstateIndoorReportList=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateIndoorReportList/EstateIndoorReportList'))
    })
}   

const EstateParkReportListDetail=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateParkReportListDetail/EstateParkReportListDetail'))
    })
}    

const EstateBanReportListDetail=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateBanReportListDetail/EstateBanReportListDetail'))
    })
}   

const EstateIndoorReportListDetail=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateIndoorReportListDetail/EstateIndoorReportListDetail'))
    })
}  

const EstateProcessMonitoringUserDetail=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateProcessMonitoringUserDetail/EstateProcessMonitoringUserDetail'))
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
                  path:'/index/rankinglistadd',
                  component:RankingListAdd
                },  
                {
                  path:'/index/rankinglistedit',
                  component:RankingListEdit
                },
                {
                  path:'/index/cityhousescore',
                  component:CityHouseScore
                },  
                {
                  path:'/index/rankingdetail',
                  component:RankingDetail
                },
                {
                  path:'/index/bulletinsubscription',
                  component:BulletinSubscription
                },
                {
                  path:'/index/bulletinorder',
                  component:BulletinOrder
                },
                {
                  path:'/index/detailbulletinOrder',
                  component:DetailBulletinOrder
                },
                {
                  path:'/index/detailbulletinsubscription',
                  component:DetailBulletinSubscription
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
                {
                  path:'/index/estateprocessmonitoringmanagement',
                  component:EstateProcessMonitoringManagement
                },
                {
                  path:'/index/estateprocessmonitoringdetail',
                  component:EstateProcessMonitoringDetail
                },
                {
                  path:'/index/estateprocessmonitoringservice',
                  component:EstateProcessMonitoringService
                },
                {
                  path:'/index/estateprocessmonitoringuser',
                  component:EstateProcessMonitoringUser
                },
                {
                  path:'/index/estateparkreportList',
                  component:EstateParkReportList
                },
                {
                  path:'/index/estatebanreportlist',
                  component:EstateBanReportList
                },
                {
                  path:'/index/estateindoorreportlist',
                  component:EstateIndoorReportList
                },
                {
                  path:'/index/estateparkreportlistdetail',
                  component:EstateParkReportListDetail
                },
                {
                  path:'/index/estatebanreportlistdetail',
                  component:EstateBanReportListDetail
                },
                {
                  path:'/index/estateindoorreportlistdetail',
                  component:EstateIndoorReportListDetail
                },
                {
                  path:'/index/estateprocessmonitoringuserdetail',
                  component:EstateProcessMonitoringUserDetail
                }
            ]
        }
    ]
})

