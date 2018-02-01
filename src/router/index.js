import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const NotFoundComponent = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/NotFoundComponent/NotFoundComponent'))
  })
}

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

const EstateParkReportListDetailUn=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateParkReportListDetailUn/EstateParkReportListDetailUn'))
    })
}  

const EstateBanReportListDetailUn=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateBanReportListDetailUn/EstateBanReportListDetailUn'))
    })
}  

const EstateIndoorReportListDetailUn=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateIndoorReportListDetailUn/EstateIndoorReportListDetailUn'))
    })
}

const EstatePMSExamine=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstatePMSExamine/EstatePMSExamine'))
    })
}  

const EstatePMSDetail=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstatePMSDetail/EstatePMSDetail'))
    })
}  

const EstateConstructionReportTab=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/EstateConstructionReportTab/EstateConstructionReportTab'))
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

const UserDetail=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/UserDetail/UserDetail'))
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


//任务管理

const CollectionManagement = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/CollectionManagement/CollectionManagement'))
  })
}  

const AuditManagement = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/AuditManagement/AuditManagement'))
  })
}

const AuditDetail = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/AuditDetail/AuditDetail'))
  })
}
  
const CollectionDetail = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/CollectionDetail/CollectionDetail'))
  })
}

//审核管理
const EstateOpenExamine = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/EstateOpenExamine/EstateOpenExamine'))
  })
}  

const EstateUnopenedExamine = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/EstateUnopenedExamine/EstateUnopenedExamine'))
  })
}

const UnopenedExamineList = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/UnopenedExamineList/UnopenedExamineList'))
  })
}  

const IntegralManagement = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/IntegralManagement/IntegralManagement'))
  })
}  

const IntegralChange = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/IntegralChange/IntegralChange'))
  })
}  

const IntegralDetail = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/IntegralDetail/IntegralDetail'))
  })
}

const IntegralRewardManagement = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/IntegralRewardManagement/IntegralRewardManagement'))
  })
}  

const IntegralRewardDetail = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/IntegralRewardDetail/IntegralRewardDetail'))
  })
} 

const EstateUnopenedManagement = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/EstateUnopenedManagement/EstateUnopenedManagement'))
  })
}  

const EstateUnopenedDetail = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/EstateUnopenedDetail/EstateUnopenedDetail'))
  })
} 

const UnopenedExamineEdit = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/UnopenedExamineEdit/UnopenedExamineEdit'))
  })
}  



export default new Router({
    mode: 'hash',
    base: __dirname,
    routes: [
        {
          path:'*',
          component:NotFoundComponent
        },
        { 
          path: '/', 
          redirect: '/login' 
        },
        {
          path: '/login',
          component: Login,
        },
        {
          path:'/estate',
          component:Index,
          children:[
            {
              path:'estatemanagement',
              component:EstateManagement
            },
            {  
              path:'estateadd',
              component:EstateAdd
            },  
            {
              path:'estateedit',
              component:EstateEdit
            },
            {
              path:'estatedetail',
              component:EstateDetail
            },
            {
              path:'rankinglist',
              component:RankingList
            },  
            {
              path:'rankinglistadd',
              component:RankingListAdd
            },  
            {
              path:'rankinglistedit',
              component:RankingListEdit
            },
            {
              path:'rankingdetail',
              component:RankingDetail
            },
          ]
        },
        {
          path:'/index',
          component:Index,
          children:[
            {
              path:'estateprocessmonitoringmanagement',
              component:EstateProcessMonitoringManagement
            },
            {
              path:'estateprocessmonitoringdetail',
              component:EstateProcessMonitoringDetail
            },
            {
              path:'estateprocessmonitoringservice',
              component:EstateProcessMonitoringService
            },
            {
              path:'estateprocessmonitoringuser',
              component:EstateProcessMonitoringUser
            },
            {
              path:'estateparkreportList',
              component:EstateParkReportList
            },
            {
              path:'estatebanreportlist',
              component:EstateBanReportList
            },
            {
              path:'estateindoorreportlist',
              component:EstateIndoorReportList
            },
            {
              path:'estateparkreportlistdetail',
              component:EstateParkReportListDetail
            },
            {
              path:'estatebanreportlistdetail',
              component:EstateBanReportListDetail
            },
            {
              path:'estateindoorreportlistdetail',
              component:EstateIndoorReportListDetail
            },
            {
              path:'estateprocessmonitoringuserdetail',
              component:EstateProcessMonitoringUserDetail
            },
            {
              path:'estateparkreportlistdetailun',
              component:EstateParkReportListDetailUn
            },
            {
              path:'estatebanreportlistdetailun',
              component:EstateBanReportListDetailUn
            },
            {
              path:'estateindoorreportlistdetailun',
              component:EstateIndoorReportListDetailUn
            },
            {
              path:'estatepmsexamine',
              component:EstatePMSExamine
            },
            {
              path:'estatepmsdetail',
              component:EstatePMSDetail
            },
            {
              path:'estateconstructionreporttab',
              component:EstateConstructionReportTab
            }
          ]
        },
        {
          path:'/article',
          component:Index,
          children:[
            {
              path:'articlemanagement',
              component:ArticleManagement
            },  
            {
              path:'articledetail',
              component:ArticleDetail
            },
            {
              path:'newarticle',
              component:NewArticle
            },
          ]
        },
        {
          path:'/subscribe',
          component:Index,
          children:[
            {
              path:'bulletinsubscription',
              component:BulletinSubscription
            },
            {
              path:'bulletinorder',
              component:BulletinOrder
            },
            {
              path:'detailbulletinOrder',
              component:DetailBulletinOrder
            },
            {
              path:'detailbulletinsubscription',
              component:DetailBulletinSubscription
            },
          ]
        },
        {
          path:'/task',
          component:Index,
          children:[
            {
              path:'collectionmanagement',
              component:CollectionManagement
            },
            {
              path:'auditmanagement',
              component:AuditManagement
            },
            {
              path:'auditdetail',
              component:AuditDetail
            },
            {
              path:'collectiondetail',
              component:CollectionDetail
            },
            {
              path:'estateopenexamine',
              component:EstateOpenExamine
            },
            {
              path:'estateunopenedmanagement',
              component:EstateUnopenedManagement
            },
            {
              path:'estateunopeneddetail',
              component:EstateUnopenedDetail
            },
          ]
        },
        {
          path:'/unopened',
          component:Index,
          children:[
            {
              path:'estateunopenedexamine',
              component:EstateUnopenedExamine
            },
            {
              path:'unopenedexaminelist',
              component:UnopenedExamineList
            },
            {
              path:'integralmanagement',
              component:IntegralManagement
            },
            {
              path:'integralchange',
              component:IntegralChange
            },
            {
              path:'integraldetail',
              component:IntegralDetail
            },
            {
              path:'integralrewardmanagement',
              component:IntegralRewardManagement
            },
            {
              path:'integralrewarddetail',
              component:IntegralRewardDetail
            },
            {
              path:'unopenedexamineedit',
              component:UnopenedExamineEdit
            }
          ]
        },
        {
          path:'/order',
          component:Index,
          children:[
            {
              path:'cooperorders',
              component:CooperOrders
            },
          ]
        },
        {
          path:'/activity',
          component:Index,
          children:[
            {
              path:'activitymanagement',
              component:ActivityManagement
            },
          ]
        },
        {
          path:'/consult',
          component:Index,
          children:[
            {
              path:'consultAdmin',
              component:ConsultAdmin
            },
          ]
        },
        {
          path:'/user',
          component:Index,
          children:[
            {
              path:'list',
              component:UserList
            },
            {
              path:'detail',
              component:UserDetail
            },
            {
              path:'intentuserlist',
              component:IntentUserList
            },
            {
              path:'messagemanagement',
              component:MessageManagement
            },
            {
              path:'expectingbuildings',
              component:ExpectingBuildings
            },
          ]
        },
        {
          path:'/account',
          component:Index,
          children:[
            {
              path:'rolemanagement',
              component:RoleManagement
            },
            {
              path:'accountmanagement',
              component:AccountManagement,
            },
            {
              path:'counsultParticulars',
              component:CounsultParticulars
            },
            {
              path:'createnewrole',
              component:CreateNewRole
            },
            {
              path:'createnewaccount',
              component:CreateNewAccount
            },
            {
              path: 'changePassword',
              component: ChangePassword,
            },
          ]
        }
    ]
})

